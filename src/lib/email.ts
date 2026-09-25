/**
 * Transactional email.
 *
 * Two kinds, and they are not equally important:
 *
 *   Confirmation mail is load bearing. A double opt in newsletter without a
 *   delivered confirmation is not a double opt in, so if the provider is not
 *   configured the subscription is refused rather than stored in the hope that
 *   someone sets a key later. An address that can never confirm has no legal
 *   basis for storage.
 *
 *   Notification mail to the editors is best effort. A contact message is
 *   already safely in the database when the notification is attempted, so a
 *   failed send is logged and the visitor is still told the truth.
 */

import "server-only";

import { Resend } from "resend";
import { serverEnv } from "@/lib/env";

let client: Resend | null = null;

function resend(): Resend | null {
  const key = serverEnv.resendApiKey;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

/** Whether mail can actually be delivered right now. */
export function mailConfigured(): boolean {
  return serverEnv.resendApiKey !== null;
}

/**
 * In development, an unconfigured provider prints what would have been sent so
 * the double opt in flow can be walked end to end. This never happens in
 * production: there, an unconfigured provider is a refusal, not a console log.
 */
export const MAIL_FALLBACK_TO_CONSOLE = process.env.NODE_ENV !== "production";

interface Mail {
  to: string;
  subject: string;
  text: string;
}

async function send(mail: Mail): Promise<boolean> {
  const api = resend();

  if (!api) {
    if (MAIL_FALLBACK_TO_CONSOLE) {
      console.info(
        `\n[E-Mail, nicht versendet: RESEND_API_KEY fehlt]\nAn: ${mail.to}\nBetreff: ${mail.subject}\n\n${mail.text}\n`,
      );
      return true;
    }
    return false;
  }

  try {
    const { error } = await api.emails.send({
      from: serverEnv.mailFrom,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    });
    if (error) {
      console.error(`E-Mail an ${mail.to} fehlgeschlagen: ${error.message}`);
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error(
      `E-Mail an ${mail.to} fehlgeschlagen: ${error instanceof Error ? error.message : error}`,
    );
    return false;
  }
}

/* ==========================================================================
   Newsletter double opt in
   ========================================================================== */

export async function sendNewsletterConfirmation(
  to: string,
  confirmToken: string,
): Promise<boolean> {
  const link = `${serverEnv.siteUrl}/software-newsletter-anmelden/anmeldung-bestaetigen?token=${encodeURIComponent(confirmToken)}`;

  return send({
    to,
    subject: "Bitte bestaetigen Sie Ihre Newsletter-Anmeldung",
    text: [
      "Guten Tag,",
      "",
      "Sie haben sich fuer den Newsletter von Softwareblick angemeldet.",
      "Erst nach Ihrer Bestaetigung tragen wir Sie ein. Bis dahin senden wir nichts.",
      "",
      "Anmeldung bestaetigen:",
      link,
      "",
      "Der Link gilt 30 Tage. Wenn Sie sich nicht angemeldet haben, ignorieren Sie",
      "diese Nachricht bitte einfach. Wir loeschen den Eintrag dann automatisch.",
      "",
      "Softwareblick",
      `${serverEnv.siteUrl}/anbieterkennzeichnung-und-impressum`,
    ].join("\n"),
  });
}

export async function sendNewsletterWelcome(
  to: string,
  unsubscribeToken: string,
): Promise<boolean> {
  const link = `${serverEnv.siteUrl}/software-newsletter-anmelden/newsletter-abmelden?token=${encodeURIComponent(unsubscribeToken)}`;

  return send({
    to,
    subject: "Ihre Newsletter-Anmeldung ist bestaetigt",
    text: [
      "Guten Tag,",
      "",
      "Ihre Anmeldung ist bestaetigt. Wir haben Datum und Uhrzeit Ihrer Bestaetigung",
      "gespeichert, weil wir sie im Streitfall nachweisen muessen.",
      "",
      "Sie koennen sich jederzeit mit einem Klick abmelden, ohne Anmeldung und ohne",
      "Begruendung:",
      link,
      "",
      "Softwareblick",
      `${serverEnv.siteUrl}/anbieterkennzeichnung-und-impressum`,
    ].join("\n"),
  });
}

/* ==========================================================================
   Editorial notifications
   ========================================================================== */

export async function notifyEditors(subject: string, body: string): Promise<boolean> {
  const to = serverEnv.adminNotifyEmail;
  if (!to) return false;
  return send({ to, subject, text: body });
}

export async function notifyNewReview(input: {
  productName: string;
  reviewerName: string;
  title: string;
  rating: number;
  duplicateFromSameIp: boolean;
}): Promise<boolean> {
  return notifyEditors(
    `Neue Bewertung zur Pruefung: ${input.productName}`,
    [
      "Eine Bewertung wartet auf Pruefung.",
      "",
      `Produkt:      ${input.productName}`,
      `Verfasser:    ${input.reviewerName}`,
      `Ueberschrift: ${input.title}`,
      `Gesamtnote:   ${input.rating}`,
      input.duplicateFromSameIp
        ? "Hinweis:      Zu diesem Produkt liegt bereits eine Einsendung mit demselben IP-Hash vor."
        : "",
      "",
      `Moderation: ${serverEnv.siteUrl}/admin/bewertungen`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

export async function notifyNewContactMessage(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Promise<boolean> {
  return notifyEditors(
    `Kontaktanfrage: ${input.topic}`,
    [
      `Von:   ${input.name} <${input.email}>`,
      `Thema: ${input.topic}`,
      "",
      input.message,
      "",
      `Uebersicht: ${serverEnv.siteUrl}/admin`,
    ].join("\n"),
  );
}
