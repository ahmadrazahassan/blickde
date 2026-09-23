/**
 * Supabase clients.
 *
 * Two of them, and the difference is the whole security model:
 *
 *   publicClient()   the anon key. Row Level Security applies. It can read
 *                    published content and nothing else. This is what serves
 *                    every page.
 *
 *   adminClient()    the service role key. RLS does not apply. It is used only
 *                    inside server actions and route handlers that have already
 *                    validated their input, and it never leaves the server.
 *
 * Reaching for adminClient() because a query "did not work" is how a review
 * site starts serving draft rows. If a read fails under the anon key, the
 * policy is wrong; fix the policy.
 */

import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env";

const noPersistence = {
  auth: { persistSession: false, autoRefreshToken: false },
} as const;

let publicSingleton: SupabaseClient | null = null;
let adminSingleton: SupabaseClient | null = null;

/** RLS constrained. Published content only. Safe for every page render. */
export function publicClient(): SupabaseClient {
  if (!publicSingleton) {
    publicSingleton = createClient(serverEnv.supabaseUrl, serverEnv.supabaseAnonKey, noPersistence);
  }
  return publicSingleton;
}

/** Bypasses RLS. Server side only, after validation, never in a component. */
export function adminClient(): SupabaseClient {
  if (!adminSingleton) {
    adminSingleton = createClient(
      serverEnv.supabaseUrl,
      serverEnv.supabaseServiceRoleKey,
      noPersistence,
    );
  }
  return adminSingleton;
}
