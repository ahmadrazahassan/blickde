/**
 * Admin authentication.
 *
 * Supabase Auth with email and password. There is no public sign up: accounts
 * are created by hand in the Supabase dashboard, and sign ups must be switched
 * off there. ADMIN_EMAILS is a second lock in front of that setting, so a
 * mistakenly enabled sign up does not hand anyone the moderation queue.
 */

import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { serverEnv } from "@/lib/env";

/** A client bound to the visitor's session cookies. RLS applies to it. */
export async function authClient(): Promise<SupabaseClient> {
  const store = await cookies();

  return createServerClient(serverEnv.supabaseUrl, serverEnv.supabaseAnonKey, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(list) {
        try {
          for (const { name, value, options } of list) {
            store.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies cannot be written.
          // The middleware refreshes the session, so this is safe to ignore.
        }
      },
    },
  });
}

/** The allowlist, or null when none is configured. */
function allowlist(): string[] | null {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) return null;
  const list = raw
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return list.length > 0 ? list : null;
}

export function isAllowedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = allowlist();
  if (!list) return true; // No allowlist: any account that exists is an editor.
  return list.includes(email.toLowerCase());
}

export interface AdminUser {
  id: string;
  email: string;
}

/**
 * The signed in editor, or null. Uses getUser() rather than getSession(),
 * because getUser() verifies the token with the auth server and a session read
 * from a cookie is only as trustworthy as the cookie.
 */
export async function currentAdmin(): Promise<AdminUser | null> {
  const {
    data: { user },
  } = await (await authClient()).auth.getUser();

  if (!user?.email || !isAllowedAdmin(user.email)) return null;
  return { id: user.id, email: user.email };
}
