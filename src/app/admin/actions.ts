"use server";

/**
 * Admin mutations.
 *
 * Every one of them re-checks the session before it writes. The middleware
 * already redirected an unauthenticated visitor away from the page, but a
 * server action is a callable endpoint in its own right and is not protected by
 * whatever guarded the page that rendered the button.
 *
 * Writes go through moderate_review() and respond_to_review(), which set the
 * acting editor's address so the audit trigger records a person rather than
 * the connection pool.
 */

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { adminClient } from "@/lib/supabase/clients";
import { authClient, currentAdmin, isAllowedAdmin } from "@/lib/supabase/auth";
import { ok, problem, type FormResult } from "@/lib/security";

const NOT_SIGNED_IN = "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.";

/* ==========================================================================
   Session
   ========================================================================== */

export async function signInAction(formData: FormData): Promise<FormResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return problem("Bitte geben Sie E-Mail-Adresse und Passwort ein.");
  }

  // Checked before the credentials are even tried, so an address outside the
  // allowlist cannot be used to probe which passwords are valid.
  if (!isAllowedAdmin(email)) {
    return problem("Anmeldung nicht moeglich.");
  }

  const { error } = await (await authClient()).auth.signInWithPassword({ email, password });

  if (error) {
    // Deliberately one message for a wrong address and a wrong password.
    // Two messages would turn the form into a list of valid accounts.
    return problem("Anmeldung nicht moeglich. Bitte pruefen Sie Ihre Eingaben.");
  }

  return ok("Angemeldet.");
}

export async function signOutAction(): Promise<void> {
  await (await authClient()).auth.signOut();
  redirect("/admin/anmelden");
}

/* ==========================================================================
   Moderation
   ========================================================================== */

export async function moderateReviewAction(formData: FormData): Promise<FormResult> {
  const admin = await currentAdmin();
  if (!admin) return problem(NOT_SIGNED_IN);

  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  const note = String(formData.get("note") ?? "").trim().slice(0, 1000);

  if (!id) return problem("Es fehlt die Kennung der Bewertung.");
  if (!["published", "rejected", "pending"].includes(decision)) {
    return problem("Unbekannte Entscheidung.");
  }

  const { data, error } = await adminClient().rpc("moderate_review", {
    p_id: id,
    p_status: decision,
    p_note: note,
    p_actor: admin.email,
  });

  if (error) {
    console.error(`Moderation fehlgeschlagen: ${error.message}`);
    return problem("Die Entscheidung konnte nicht gespeichert werden.");
  }

  const row = (data as { software_slug: string }[] | null)?.[0];
  if (!row) {
    return problem("Diese Bewertung ist nicht mehr vorhanden oder ist eine Fixture-Zeile.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/bewertungen");
  revalidatePath(`/software/${row.software_slug}`);
  revalidatePath(`/software/${row.software_slug}/bewertungen`);
  revalidatePath("/");

  return ok(
    decision === "published"
      ? "Die Bewertung ist veroeffentlicht. Die Note des Produkts wurde neu berechnet."
      : decision === "rejected"
        ? "Die Bewertung ist abgelehnt und bleibt unveroeffentlicht."
        : "Die Bewertung liegt wieder in der Warteschlange.",
  );
}

export async function respondToReviewAction(formData: FormData): Promise<FormResult> {
  const admin = await currentAdmin();
  if (!admin) return problem(NOT_SIGNED_IN);

  const id = String(formData.get("id") ?? "");
  const response = String(formData.get("response") ?? "").trim().slice(0, 2000);
  if (!id) return problem("Es fehlt die Kennung der Bewertung.");

  const { data, error } = await adminClient().rpc("respond_to_review", {
    p_id: id,
    p_response: response,
    p_actor: admin.email,
  });

  if (error) {
    console.error(`Antwort fehlgeschlagen: ${error.message}`);
    return problem("Die Antwort konnte nicht gespeichert werden.");
  }

  const row = (data as { software_slug: string }[] | null)?.[0];
  if (row) {
    revalidatePath(`/software/${row.software_slug}`);
    revalidatePath(`/software/${row.software_slug}/bewertungen`);
  }
  revalidatePath("/admin/bewertungen");

  return ok(response ? "Die Antwort ist veroeffentlicht." : "Die Antwort wurde entfernt.");
}

/* ==========================================================================
   Contact messages
   ========================================================================== */

export async function setMessageStatusAction(formData: FormData): Promise<FormResult> {
  const admin = await currentAdmin();
  if (!admin) return problem(NOT_SIGNED_IN);

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "read", "answered"].includes(status)) {
    return problem("Unbekannter Status.");
  }

  const { error } = await adminClient().from("contact_messages").update({ status }).eq("id", id);
  if (error) {
    console.error(`Statuswechsel fehlgeschlagen: ${error.message}`);
    return problem("Der Status konnte nicht geaendert werden.");
  }

  // Contact messages carry no trigger of their own, so the trail is written
  // here. An editorial action on a person's message has to be traceable.
  await adminClient().from("audit_log").insert({
    table_name: "contact_messages",
    record_id: id,
    action: "update",
    actor: admin.email,
    diff: { status: { nach: status } },
  });

  revalidatePath("/admin");
  return ok("Status geaendert.");
}
