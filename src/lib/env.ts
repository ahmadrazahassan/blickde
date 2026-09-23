/**
 * Environment access, in one place.
 *
 * Anything read through `serverEnv` is server side only. The module is marked
 * `server-only`, so an accidental import from a client component is a build
 * error rather than a service role key in a JavaScript bundle.
 */

import "server-only";

import { siteSettings } from "@/data/site";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Die Umgebungsvariable ${name} fehlt. Ohne sie kann der Server nicht starten. ` +
        `Siehe .env.local.example.`,
    );
  }
  return value;
}

function optional(name: string): string | null {
  const value = process.env[name];
  return value && value.length > 0 ? value : null;
}

export const serverEnv = {
  get supabaseUrl() {
    return required("NEXT_PUBLIC_SUPABASE_URL");
  },
  get supabaseAnonKey() {
    return required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
  /** Never prefixed with NEXT_PUBLIC_. Never sent to a browser. */
  get supabaseServiceRoleKey() {
    return required("SUPABASE_SERVICE_ROLE_KEY");
  },
  /**
   * The pepper for IP hashing. An unsalted SHA-256 of an IPv4 address is
   * brute forceable in seconds, so this is what makes the hash a genuine
   * pseudonymisation measure rather than a gesture. Rotate yearly.
   */
  get ipHashSalt() {
    return required("IP_HASH_SALT");
  },
  get siteUrl() {
    const fallback = process.env.NODE_ENV === "production" ? siteSettings.url : "http://localhost:3000";
    return (process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/+$/, "");
  },
  get resendApiKey() {
    return optional("RESEND_API_KEY");
  },
  get adminNotifyEmail() {
    return optional("ADMIN_NOTIFY_EMAIL");
  },
  /** From address for transactional mail. */
  get mailFrom() {
    return process.env.MAIL_FROM || "Softwareblick <noreply@softwareblick.de>";
  },
} as const;

/**
 * Seed reviews are development fixtures, not customer statements.
 *
 * Three independent layers keep them out of a published grade: this flag, the
 * RLS policy that refuses to serve them to the anonymous key, and the rating
 * trigger that excludes them from every average. The flag is forced off in
 * production and no environment variable can turn it back on there.
 */
export const SHOW_SEED_REVIEWS =
  process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_DEMO_CONTENT === "true";
