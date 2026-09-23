/**
 * Pseudonymisation, rate limiting and the shared shape of a form result.
 *
 * The raw IP address is never written to the database and never leaves this
 * module. What is stored is a SHA-256 over the address and a pepper held in the
 * environment. An unsalted SHA-256 of an IPv4 address is brute forceable in
 * seconds, which would make the hash a gesture rather than a measure; the
 * pepper is what makes it real, and it is rotated yearly.
 */

import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";

import { serverEnv } from "@/lib/env";
import { adminClient } from "@/lib/supabase/clients";

/* ==========================================================================
   Client address
   ========================================================================== */

/**
 * The address, for hashing only. Nothing may persist the return value.
 * The first entry of X-Forwarded-For is the client as the edge saw it; later
 * entries are proxies and are attacker controlled in equal measure, so only
 * the first is used.
 */
async function clientAddress(): Promise<string> {
  const head = await headers();
  const forwarded = head.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return head.get("x-real-ip")?.trim() || "unbekannt";
}

/** Salted SHA-256 of the caller's address. The only form that is ever stored. */
export async function hashClientIp(): Promise<string> {
  return createHash("sha256")
    .update(`${serverEnv.ipHashSalt}:${await clientAddress()}`)
    .digest("hex");
}

/** User agent, truncated. Kept for abuse handling on contact messages only. */
export async function userAgent(): Promise<string | null> {
  const head = await headers();
  return head.get("user-agent")?.slice(0, 300) ?? null;
}

/* ==========================================================================
   Tokens
   ========================================================================== */

/** URL safe, 256 bits. Used for double opt in and one click unsubscribe. */
export function newToken(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64url");
}

/** Constant time comparison, so a token cannot be guessed byte by byte. */
export function tokensMatch(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/* ==========================================================================
   Rate limiting
   ========================================================================== */

/**
 * A short in process window that absorbs a burst, backed by a durable count
 * over the rows that were actually written. The in process half is per
 * instance and deliberately small; the durable half is what holds across
 * restarts and across instances.
 */
const burst = new Map<string, number[]>();

function burstExceeded(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (burst.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  burst.set(key, hits);

  // Opportunistic cleanup, so the map cannot grow without bound.
  if (burst.size > 5000) {
    for (const [k, v] of burst) {
      if (v.every((t) => now - t > windowMs)) burst.delete(k);
    }
  }
  return hits.length > limit;
}

interface DurableLimit {
  table: string;
  column: string;
  ipHash: string;
  windowHours: number;
  limit: number;
}

async function durableExceeded({
  table,
  column,
  ipHash,
  windowHours,
  limit,
}: DurableLimit): Promise<boolean> {
  const since = new Date(Date.now() - windowHours * 3600_000).toISOString();
  const { count, error } = await adminClient()
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq(column, ipHash)
    .gte("created_at", since);

  // A failed count must not become an open door, but it must not lock out a
  // legitimate visitor either. The burst window above still applies.
  if (error) return false;
  return (count ?? 0) >= limit;
}

export type RateLimitKind = "review" | "contact" | "newsletter" | "consent";

const RULES: Record<
  RateLimitKind,
  { burst: number; burstMs: number; durable?: Omit<DurableLimit, "ipHash"> }
> = {
  review: {
    burst: 3,
    burstMs: 10 * 60_000,
    durable: { table: "reviews", column: "submitter_ip_hash", windowHours: 24, limit: 3 },
  },
  contact: {
    burst: 3,
    burstMs: 10 * 60_000,
    durable: { table: "contact_messages", column: "ip_hash", windowHours: 1, limit: 5 },
  },
  newsletter: {
    burst: 3,
    burstMs: 10 * 60_000,
    durable: { table: "newsletter_subscribers", column: "ip_hash", windowHours: 1, limit: 5 },
  },
  consent: { burst: 20, burstMs: 60_000 },
};

/** True when the caller has gone past what this endpoint allows. */
export async function rateLimited(kind: RateLimitKind, ipHash: string): Promise<boolean> {
  const rule = RULES[kind];
  if (burstExceeded(`${kind}:${ipHash}`, rule.burst, rule.burstMs)) return true;
  if (rule.durable && (await durableExceeded({ ...rule.durable, ipHash }))) return true;
  return false;
}

/* ==========================================================================
   Form results
   ========================================================================== */

export interface FormResult {
  ok: boolean;
  /** German, and shown to the visitor exactly as it arrives. */
  message: string;
  /** Field name to error message, for inline display. */
  errors?: Record<string, string>;
}

export const ok = (message: string): FormResult => ({ ok: true, message });

export const problem = (message: string, errors?: Record<string, string>): FormResult => ({
  ok: false,
  message,
  ...(errors ? { errors } : {}),
});

/**
 * A filled honeypot means a bot. The response is deliberately the success
 * response: telling a bot it was detected only teaches it to try again without
 * the field.
 */
export function isHoneypotFilled(value: FormDataEntryValue | null): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export const RATE_LIMIT_MESSAGE =
  "Es sind in kurzer Zeit zu viele Einsendungen von Ihrem Anschluss eingegangen. " +
  "Bitte versuchen Sie es in einer Stunde noch einmal.";

export const SERVER_ERROR_MESSAGE =
  "Das hat auf unserer Seite nicht funktioniert. Bitte versuchen Sie es spaeter noch einmal " +
  "oder schreiben Sie uns an redaktion@softwareblick.de.";
