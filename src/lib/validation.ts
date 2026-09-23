/**
 * Server side validation.
 *
 * The browser validates too, but that is a courtesy to the visitor. This is the
 * validation that counts, because a form post is just an HTTP request and the
 * client half can be skipped entirely.
 *
 * Every message is German and written to be shown to the visitor unchanged.
 */

import { z } from "zod";

const trimmed = z.string().trim();

const email = trimmed
  .min(1, "Bitte geben Sie eine E-Mail-Adresse an.")
  .max(254, "Diese E-Mail-Adresse ist zu lang.")
  .regex(/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/, "Bitte geben Sie eine gueltige E-Mail-Adresse an.");

const rating = z.coerce
  .number({ message: "Bitte vergeben Sie eine Note." })
  .min(1, "Die Note liegt zwischen 1 und 5.")
  .max(5, "Die Note liegt zwischen 1 und 5.");

export const COMPANY_SIZES = [
  "1 Person",
  "2 bis 9 Mitarbeitende",
  "10 bis 49 Mitarbeitende",
  "50 bis 249 Mitarbeitende",
  "250 und mehr Mitarbeitende",
] as const;

export const DURATIONS = [
  "Weniger als sechs Monate",
  "Sechs bis zwoelf Monate",
  "Sechs bis zwölf Monate",
  "Ein bis zwei Jahre",
  "Ueber zwei Jahre",
  "Über zwei Jahre",
] as const;

/* ==========================================================================
   Review submission
   ========================================================================== */

export const reviewSchema = z.object({
  software_slug: trimmed.min(1, "Es fehlt die Angabe, welches Produkt bewertet wird."),

  overall_rating: rating,
  ease_of_use: rating,
  value_for_money: rating,
  customer_service: rating,
  functionality: rating,

  review_title: trimmed
    .min(10, "Die Ueberschrift sollte mindestens 10 Zeichen haben.")
    .max(90, "Die Ueberschrift darf hoechstens 90 Zeichen haben."),
  summary: trimmed
    .min(80, "Bitte beschreiben Sie Ihre Erfahrung in mindestens 80 Zeichen.")
    .max(4000, "Bitte fassen Sie sich etwas kuerzer, hoechstens 4000 Zeichen."),
  pros: trimmed
    .min(15, "Bitte nennen Sie mindestens einen konkreten Vorteil.")
    .max(2000, "Hoechstens 2000 Zeichen."),
  cons: trimmed
    .min(15, "Bitte nennen Sie mindestens einen konkreten Nachteil.")
    .max(2000, "Hoechstens 2000 Zeichen."),

  used_for_duration: trimmed.max(80).optional().default(""),

  reviewer_name: trimmed
    .min(2, "Bitte nennen Sie Ihren Namen.")
    .max(120, "Dieser Name ist zu lang."),
  email,
  reviewer_job_title: trimmed.max(120, "Diese Angabe ist zu lang.").optional().default(""),
  reviewer_company: trimmed.max(160, "Diese Angabe ist zu lang.").optional().default(""),
  reviewer_company_size: trimmed.max(80).optional().default(""),
  reviewer_industry: trimmed.max(120).optional().default(""),

  // Not stored. It is the declaration the visitor makes, and without it there
  // is no basis for publishing the statement at all.
  truthful: z.literal("on", {
    message: "Ohne diese Bestaetigung koennen wir die Bewertung nicht pruefen.",
  }),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

/* ==========================================================================
   Newsletter
   ========================================================================== */

export const newsletterSchema = z.object({
  email,
  // Double opt in is mandatory in Germany, and the consent is the legal basis
  // for storing the address at all. No box, no row.
  consent: z.literal("on", {
    message: "Ohne Ihre Einwilligung duerfen wir Ihnen keinen Newsletter senden.",
  }),
  source: trimmed.max(120).optional().default("website"),
});

/* ==========================================================================
   Contact
   ========================================================================== */

export const CONTACT_TOPICS = [
  "Korrektur zu einem Softwareprofil",
  "Frage zu einer Bewertung",
  "Anfrage als Anbieter",
  "Presseanfrage",
  "Datenschutzauskunft nach Art. 15 DSGVO",
  "Sonstiges",
] as const;

export const contactSchema = z.object({
  name: trimmed.min(2, "Bitte nennen Sie uns Ihren Namen.").max(120, "Dieser Name ist zu lang."),
  email,
  topic: trimmed.min(1, "Bitte waehlen Sie ein Thema.").max(120),
  message: trimmed
    .min(20, "Bitte beschreiben Sie Ihr Anliegen in mindestens 20 Zeichen.")
    .max(5000, "Bitte fassen Sie sich etwas kuerzer, hoechstens 5000 Zeichen."),
});

/* ==========================================================================
   Consent
   ========================================================================== */

export const consentSchema = z.object({
  consent_id: trimmed.min(8, "Ungueltige Kennung.").max(64),
  analytics: z.boolean(),
  marketing: z.boolean(),
  action: z.enum(["grant", "deny", "withdraw", "update"]),
  policy_version: trimmed.min(1).max(40),
});

/* ==========================================================================
   Shared helper
   ========================================================================== */

/**
 * Flattens a Zod failure into the { field: message } shape the forms render.
 * Only the first message per field is kept: a visitor fixes one thing at a
 * time and a stack of messages under one input helps nobody.
 */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
