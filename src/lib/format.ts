/**
 * German formatting. Every number the interface renders passes through here.
 * Hand formatting a decimal separator is how a price ends up wrong by three
 * orders of magnitude.
 */

import type { BillingPeriod } from "./types";

const NBSP = " ";

const integer = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 0,
});

const reviewInteger = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const oneDecimal = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const money = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateNumeric = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateLong = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** 12.193 */
export function formatCount(value: number): string {
  return integer.format(value);
}

/** Review totals use a comma as the thousands separator across the site. */
export function formatReviewCount(value: number): string {
  return reviewInteger.format(value);
}

/** 4,6 */
export function formatRating(value: number): string {
  return oneDecimal.format(value);
}

/** 16,90 EUR with a non breaking space before the currency. */
export function formatPrice(value: number): string {
  return `${money.format(value)}${NBSP}EUR`;
}

/** 19 % with a space, because a percent is a unit. */
export function formatPercent(value: number): string {
  return `${integer.format(value)}${NBSP}%`;
}

/** 14.08.2026 */
export function formatDate(iso: string): string {
  return dateNumeric.format(new Date(`${iso}T12:00:00Z`));
}

/** 14. August 2026 */
export function formatDateLong(iso: string): string {
  return dateLong.format(new Date(`${iso}T12:00:00Z`));
}

const PERIOD_LABEL: Record<BillingPeriod, string> = {
  month: "pro Monat",
  year: "pro Jahr",
  user: "pro Nutzer und Monat",
  seat: "pro Arbeitsplatz und Monat",
};

export function billingPeriodLabel(period: BillingPeriod): string {
  return PERIOD_LABEL[period];
}

/**
 * The full price line a German B2B buyer expects: net amount, billing period
 * and the VAT note, because German B2B quotes net.
 */
export function formatPriceLine(
  value: number | null,
  period: BillingPeriod,
  includesVat: boolean,
): string {
  if (value === null) return "Preis auf Anfrage";
  const vat = includesVat ? "inkl. 19 % MwSt." : "zzgl. 19 % MwSt.";
  return `ab ${formatPrice(value)} ${billingPeriodLabel(period)}, ${vat}`;
}

/** Reading time in the form German magazines print it. */
export function formatReadTime(minutes: number): string {
  return `${integer.format(minutes)} Minuten Lesezeit`;
}

/** German low high quotation marks. */
export function quote(text: string): string {
  return `„${text}“`;
}

/**
 * A grade for a product with no published reviews is a dash, never a number.
 * Inventing one breaks the only promise the site makes.
 *
 * This is the one dash character in the codebase. It is a data placeholder
 * standing for "no value", not punctuation in running copy, which is what the
 * house rule against the en dash and the em dash actually bans.
 */
export function formatGrade(rating: number, reviewCount: number): string {
  if (reviewCount === 0 || rating <= 0) return "–";
  return formatRating(rating);
}

export function reviewCountLabel(count: number): string {
  if (count === 0) return "Noch keine Bewertung";
  if (count === 1) return "1 Bewertung";
  return `${formatReviewCount(count)} Bewertungen`;
}

export function softwareCountLabel(count: number): string {
  return count === 1 ? "1 Programm" : `${formatCount(count)} Programme`;
}
