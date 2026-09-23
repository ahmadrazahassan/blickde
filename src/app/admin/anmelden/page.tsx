import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { currentAdmin } from "@/lib/supabase/auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Anmeldung",
  robots: { index: false, follow: false, nocache: true },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  const admin = await currentAdmin();
  const { weiter } = await searchParams;

  // Only an internal path is ever followed, so the redirect after sign in
  // cannot be pointed at another site.
  const target = weiter && weiter.startsWith("/admin") ? weiter : "/admin";
  if (admin) redirect(target);

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-[26rem]">
        <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
          Redaktion
        </h1>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
          Interner Bereich. Zugänge werden von Hand angelegt; eine Registrierung gibt es nicht.
        </p>

        <div className="mt-8 rounded-[10px] border border-[var(--color-rule)] bg-white p-6 shadow-[var(--shadow-lift)]">
          <LoginForm target={target} />
        </div>
      </div>
    </div>
  );
}
