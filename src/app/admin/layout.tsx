import type { Metadata } from "next";
import Link from "next/link";

import { currentAdmin } from "@/lib/supabase/auth";
import { SignOutButton } from "./sign-out-button";

export const metadata: Metadata = {
  title: "Redaktion",
  // The back office is never indexed and never followed, whatever a stray
  // link from somewhere else might suggest.
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await currentAdmin();

  return (
    <div className="min-h-dvh bg-[var(--color-paper-2)]">
      {admin ? (
        <header className="border-b border-[var(--color-rule)] bg-white">
          <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="text-[15px] font-semibold text-[var(--color-ink)]"
              >
                Redaktion
              </Link>
              <nav aria-label="Redaktion">
                <ul className="flex items-center gap-5 text-[14px]">
                  <li>
                    <Link href="/admin" className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)]">
                      Übersicht
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/bewertungen"
                      className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                    >
                      Bewertungen
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-[var(--color-ink-3)] hover:text-[var(--color-ink)]">
                      Zur Website ↗
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[var(--color-ink-3)]">{admin.email}</span>
              <SignOutButton />
            </div>
          </div>
        </header>
      ) : null}

      {children}
    </div>
  );
}
