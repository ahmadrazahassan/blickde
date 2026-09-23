/**
 * Route protection for /admin, and session refresh for everything under it.
 *
 * This is the outer lock. It is not the only one: every admin page checks the
 * session again on the server and every admin mutation checks it a third time
 * before it writes. A proxy that is the only guard is one misconfigured
 * matcher away from a public moderation queue.
 */

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const LOGIN_PATH = "/admin/anmelden";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Without configuration there is no way to verify a session, so the admin
  // area stays shut rather than opening by default.
  if (!url || !key) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(list) {
        for (const { name, value } of list) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowed = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",")
        .map((entry) => entry.trim().toLowerCase())
        .filter(Boolean)
    : null;

  const isEditor =
    Boolean(user?.email) && (!allowed || allowed.includes((user?.email ?? "").toLowerCase()));

  if (!isEditor) {
    const target = new URL(LOGIN_PATH, request.url);
    target.searchParams.set("weiter", request.nextUrl.pathname);
    return NextResponse.redirect(target);
  }

  return response;
}

export const config = {
  // Everything under /admin except the login page itself.
  matcher: ["/admin", "/admin/((?!anmelden).*)"],
};
