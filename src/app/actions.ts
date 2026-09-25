"use server";

/**
 * Every mutation the public site performs.
 *
 * The browser never holds a write credential. Each action below validates its
 * input against a schema on the server, checks the honeypot, rate limits by
 * hashed IP, stores no raw address, and returns a German message the interface
 * shows to the visitor unchanged.
 */

import { revalidatePath } from "next/cache";

import { search } from "@/lib/queries";
import { adminClient } from "@/lib/supabase/clients";
import {
  MAIL_FALLBACK_TO_CONSOLE,
  mailConfigured,
  notifyNewContactMessage,
  notifyNewReview,
  sendNewsletterConfirmation,
  sendNewsletterWelcome,
} from "@/lib/email";
import {
  hashClientIp,
  isHoneypotFilled,
  newToken,
  ok,
  problem,
  rateLimited,
  userAgent,
  RATE_LIMIT_MESSAGE,
  SERVER_ERROR_MESSAGE,
  type FormResult,
} from "@/lib/security";
import {
  consentSchema,
  contactSchema,
  fieldErrors,
  newsletterSchema,
  reviewSchema,
} from "@/lib/validation";
import type { SearchHit } from "@/lib/types";

/* ==========================================================================
   Search
   ========================================================================== */

/** The header search dialog calls this. Nothing is fetched from the client. */
export async function searchAction(query: string): Promise<SearchHit[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];
  return search(trimmed, 12);
}

/* ==========================================================================
   Review submission
   ========================================================================== */

/**
 * Writes the review with status 'pending' and nothing else.
 *
 * There is no path from this function to a published review. Publication is a
 * human decision taken in the moderation queue, which is the technical half of
 * the Paragraph 5b Abs. 3 UWG disclosure the interface makes to every reader.
 */
export async function submitReviewAction(formData: FormData): Promise<FormResult> {
  // A bot that fills the honeypot is told the same thing a person is told.
  // Saying "you were detected" only teaches it to omit the field next time.
  if (isHoneypotFilled(formData.get("website"))) {
    return ok("Vielen Dank. Ihre Bewertung liegt jetzt zur Pruefung vor.");
  }

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return problem(
      "Bitte pruefen Sie die markierten Felder.",
      fieldErrors(parsed.error),
    );
  }
  const input = parsed.data;

  const ipHash = await hashClientIp();
  if (await rateLimited("review", ipHash)) {
    return problem(RATE_LIMIT_MESSAGE);
  }

  const db = adminClient();

  const { data: product, error: productError } = await db
    .from("software")
    .select("id,name")
    .eq("slug", input.software_slug)
    .eq("status", "published")
    .maybeSingle();

  if (productError) {
    console.error(`Bewertung: Produktabfrage fehlgeschlagen: ${productError.message}`);
    return problem(SERVER_ERROR_MESSAGE);
  }
  if (!product) {
    return problem("Zu diesem Produkt koennen wir derzeit keine Bewertung annehmen.");
  }

  // Not a block. A second opinion on the same product from one office is
  // plausible; the moderator is simply told, and decides.
  const { count: sameProductCount } = await db
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .eq("software_id", product.id)
    .eq("submitter_ip_hash", ipHash);

  const { error } = await db.from("reviews").insert({
    software_id: product.id,
    reviewer_name: input.reviewer_name,
    reviewer_job_title: input.reviewer_job_title || null,
    reviewer_company: input.reviewer_company || null,
    reviewer_industry: input.reviewer_industry || null,
    reviewer_company_size: input.reviewer_company_size || null,
    reviewer_country: "DE",
    used_for_duration: input.used_for_duration || null,

    overall_rating: input.overall_rating,
    ease_of_use: input.ease_of_use,
    value_for_money: input.value_for_money,
    customer_service: input.customer_service,
    functionality: input.functionality,

    review_title: input.review_title,
    summary: input.summary,
    pros: input.pros,
    cons: input.cons,

    // Both are fixed here rather than taken from the request. The RLS policy
    // enforces the same two values independently, which is the point.
    status: "pending",
    is_seed: false,

    submitter_email: input.email,
    submitter_ip_hash: ipHash,
  });

  if (error) {
    console.error(`Bewertung konnte nicht gespeichert werden: ${error.message}`);
    return problem(SERVER_ERROR_MESSAGE);
  }

  await notifyNewReview({
    productName: product.name,
    reviewerName: input.reviewer_name,
    title: input.review_title,
    rating: input.overall_rating,
    duplicateFromSameIp: (sameProductCount ?? 0) > 0,
  });

  return ok(
    "Vielen Dank. Ihre Bewertung liegt jetzt zur Pruefung vor. Wir lesen jede Einsendung " +
      "und veroeffentlichen sie erst danach. Das dauert in der Regel wenige Werktage.",
  );
}

/* ==========================================================================
   Newsletter, double opt in
   ========================================================================== */

export async function subscribeNewsletterAction(formData: FormData): Promise<FormResult> {
  if (isHoneypotFilled(formData.get("website"))) {
    return ok("Fast geschafft. Bitte bestaetigen Sie den Link in unserer E-Mail.");
  }

  const parsed = newsletterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return problem("Bitte pruefen Sie Ihre Eingabe.", fieldErrors(parsed.error));
  }

  // Without a working mail provider there is no confirmation, and without a
  // confirmation there is no double opt in. Storing the address anyway would
  // be storing personal data on a legal basis that does not exist yet.
  if (!mailConfigured() && !MAIL_FALLBACK_TO_CONSOLE) {
    return problem(
      "Die Newsletter-Anmeldung ist derzeit nicht freigeschaltet. Wir nehmen noch keine " +
        "Adressen an, weil wir Ihnen die Bestaetigungs-E-Mail nicht zustellen koennten.",
    );
  }

  const email = parsed.data.email.toLowerCase();
  const ipHash = await hashClientIp();

  if (await rateLimited("newsletter", ipHash)) {
    return problem(RATE_LIMIT_MESSAGE);
  }

  const db = adminClient();

  // The suppression list outranks a new form submission. Someone who asked to
  // be left alone stays left alone, and the response says nothing about
  // whether the address is on the list.
  const { data: suppressed } = await db
    .from("newsletter_suppression")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (suppressed) {
    return ok(
      "Fast geschafft. Wenn fuer diese Adresse eine Anmeldung moeglich ist, finden Sie " +
        "gleich eine E-Mail mit einem Bestaetigungslink im Postfach.",
    );
  }

  const { data: existing } = await db
    .from("newsletter_subscribers")
    .select("id,status")
    .eq("email", email)
    .maybeSingle();

  if (existing?.status === "confirmed") {
    // The same answer as every other branch. A different answer here would
    // turn the form into an address checker.
    return ok(
      "Fast geschafft. Wenn fuer diese Adresse eine Anmeldung moeglich ist, finden Sie " +
        "gleich eine E-Mail mit einem Bestaetigungslink im Postfach.",
    );
  }

  const confirmToken = newToken();

  const { error } = await db.from("newsletter_subscribers").upsert(
    {
      email,
      status: "pending",
      confirm_token: confirmToken,
      unsubscribe_token: null,
      confirmed_at: null,
      unsubscribed_at: null,
      source: parsed.data.source || "website",
      ip_hash: ipHash,
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error(`Newsletter-Anmeldung fehlgeschlagen: ${error.message}`);
    return problem(SERVER_ERROR_MESSAGE);
  }

  const sent = await sendNewsletterConfirmation(email, confirmToken);
  if (!sent) {
    // The row exists but the confirmation did not go out. Saying "check your
    // inbox" would be a lie, so it is removed again and the visitor is told.
    await db.from("newsletter_subscribers").delete().eq("email", email).eq("status", "pending");
    return problem(
      "Die Bestaetigungs-E-Mail konnte nicht zugestellt werden. Bitte versuchen Sie es " +
        "spaeter noch einmal.",
    );
  }

  return ok(
    "Fast geschafft. Wir haben Ihnen eine E-Mail mit einem Bestaetigungslink geschickt. " +
      "Erst nach Ihrer Bestaetigung tragen wir Sie ein.",
  );
}

/** Consumes a confirmation token. Called from /software-newsletter-anmelden/anmeldung-bestaetigen. */
export async function confirmNewsletterAction(token: string): Promise<FormResult> {
  const clean = token.trim();
  if (clean.length < 10) {
    return problem("Dieser Bestaetigungslink ist unvollstaendig.");
  }

  const db = adminClient();
  const { data: row } = await db
    .from("newsletter_subscribers")
    .select("id,email,status,unsubscribe_token")
    .eq("confirm_token", clean)
    .maybeSingle();

  if (!row) {
    return problem(
      "Dieser Bestaetigungslink ist nicht mehr gueltig. Unbestaetigte Anmeldungen loeschen " +
        "wir nach 30 Tagen automatisch. Bitte melden Sie sich gegebenenfalls erneut an.",
    );
  }

  if (row.status === "confirmed") {
    return ok("Ihre Anmeldung war bereits bestaetigt. Es ist nichts weiter zu tun.");
  }

  const unsubscribeToken = row.unsubscribe_token ?? newToken();

  const { error } = await db
    .from("newsletter_subscribers")
    .update({
      status: "confirmed",
      // The timestamp is the evidence if a subscriber later disputes the
      // signup. Without it a double opt in proves nothing.
      confirmed_at: new Date().toISOString(),
      confirm_token: null,
      unsubscribe_token: unsubscribeToken,
    })
    .eq("id", row.id);

  if (error) {
    console.error(`Newsletter-Bestaetigung fehlgeschlagen: ${error.message}`);
    return problem(SERVER_ERROR_MESSAGE);
  }

  await sendNewsletterWelcome(row.email, unsubscribeToken);

  return ok(
    "Ihre Anmeldung ist bestaetigt. Wir haben Datum und Uhrzeit gespeichert, weil wir die " +
      "Einwilligung im Streitfall nachweisen muessen.",
  );
}

/**
 * One click, no login, no reason given.
 *
 * Either a token from the mail footer or the address typed into the form. Both
 * answer identically whatever the outcome, so the form cannot be used to find
 * out whether an address is subscribed.
 */
export async function unsubscribeNewsletterAction(input: {
  token?: string;
  email?: string;
}): Promise<FormResult> {
  const db = adminClient();
  const settled = ok(
    "Sie sind abgemeldet. Der Versand ist beendet. Eine bereits versandte Ausgabe kann Sie " +
      "noch erreichen.",
  );

  let email: string | null = null;

  if (input.token && input.token.trim().length >= 10) {
    const { data } = await db
      .from("newsletter_subscribers")
      .select("email")
      .eq("unsubscribe_token", input.token.trim())
      .maybeSingle();
    email = data?.email ?? null;
  } else if (input.email) {
    const parsed = newsletterSchema.shape.email.safeParse(input.email);
    if (!parsed.success) {
      return problem("Bitte geben Sie eine gueltige E-Mail-Adresse an.", {
        email: "Bitte geben Sie eine gueltige E-Mail-Adresse an.",
      });
    }
    email = parsed.data.toLowerCase();
  }

  if (!email) return settled;

  await db
    .from("newsletter_subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
      confirm_token: null,
    })
    .eq("email", email);

  // The suppression row survives a later resubscribe attempt, which is the
  // whole reason it is a separate table rather than a status value.
  await db
    .from("newsletter_suppression")
    .upsert({ email, reason: "Abmeldung durch die betroffene Person" }, { onConflict: "email" });

  return settled;
}

/* ==========================================================================
   Contact
   ========================================================================== */

export async function sendContactAction(formData: FormData): Promise<FormResult> {
  if (isHoneypotFilled(formData.get("website"))) {
    return ok("Vielen Dank. Ihre Nachricht ist bei uns eingegangen.");
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return problem("Bitte pruefen Sie die markierten Felder.", fieldErrors(parsed.error));
  }

  const ipHash = await hashClientIp();
  if (await rateLimited("contact", ipHash)) {
    return problem(RATE_LIMIT_MESSAGE);
  }

  const { error } = await adminClient().from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    topic: parsed.data.topic,
    message: parsed.data.message,
    ip_hash: ipHash,
    user_agent: await userAgent(),
    status: "new",
  });

  if (error) {
    console.error(`Kontaktnachricht konnte nicht gespeichert werden: ${error.message}`);
    return problem(SERVER_ERROR_MESSAGE);
  }

  // The message is already safe in the database. A failed notification is a
  // logged inconvenience for us, not a failure to report to the visitor.
  await notifyNewContactMessage(parsed.data);

  return ok(
    "Vielen Dank. Ihre Nachricht ist bei uns eingegangen. Wir antworten in der Regel " +
      "innerhalb von zwei Werktagen an die angegebene Adresse.",
  );
}

/* ==========================================================================
   Consent
   ========================================================================== */

/**
 * Paragraph 25 TDDDG asks the operator to be able to prove a consent. This
 * writes the proof: what was decided, against which policy version, and when.
 * A withdrawal is recorded the same way, because a withdrawal that leaves no
 * trace is no easier to demonstrate than a grant that leaves none.
 */
export async function recordConsentAction(input: {
  consent_id: string;
  analytics: boolean;
  marketing: boolean;
  action: "grant" | "deny" | "withdraw" | "update";
  policy_version: string;
}): Promise<{ ok: boolean }> {
  const parsed = consentSchema.safeParse(input);
  if (!parsed.success) return { ok: false };

  const ipHash = await hashClientIp();
  if (await rateLimited("consent", ipHash)) return { ok: false };

  const { error } = await adminClient().from("consent_events").insert({
    consent_id: parsed.data.consent_id,
    analytics: parsed.data.analytics,
    marketing: parsed.data.marketing,
    action: parsed.data.action,
    policy_version: parsed.data.policy_version,
    ip_hash: ipHash,
  });

  if (error) {
    console.error(`Einwilligung konnte nicht protokolliert werden: ${error.message}`);
    return { ok: false };
  }
  return { ok: true };
}

/* ==========================================================================
   Cache
   ========================================================================== */

/** Called after a moderation decision so the public pages pick it up. */
export async function revalidateProduct(slug: string): Promise<void> {
  revalidatePath(`/unternehmenssoftware-vergleichen/${slug}`);
  revalidatePath(`/unternehmenssoftware-vergleichen/${slug}/erfahrungen-und-bewertungen`);
  revalidatePath("/");
}
