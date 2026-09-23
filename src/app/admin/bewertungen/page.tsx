import Link from "next/link";
import { redirect } from "next/navigation";

import { currentAdmin } from "@/lib/supabase/auth";
import { getReviewQueue } from "@/lib/admin-queries";
import { ReviewCard } from "./review-card";

export const dynamic = "force-dynamic";

const TABS = [
  { key: "pending", label: "In Prüfung" },
  { key: "published", label: "Veröffentlicht" },
  { key: "rejected", label: "Abgelehnt" },
] as const;

type Tab = (typeof TABS)[number]["key"];

export default async function ModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/anmelden");

  const { status } = await searchParams;
  const active: Tab = TABS.some((t) => t.key === status) ? (status as Tab) : "pending";

  const reviews = await getReviewQueue(active, 50);

  return (
    <div className="container-page py-10">
      <h1 className="text-[24px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
        Bewertungen
      </h1>
      <p className="mt-2 max-w-[68ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
        Nichts erscheint automatisch. Eine Bewertung darf nach § 5b Abs. 3 UWG nur veröffentlicht
        werden, wenn geprüft wurde, dass sie von einer Person stammt, die das Produkt tatsächlich
        eingesetzt hat. Entwicklungsdaten erscheinen in dieser Liste nicht und sind auch nicht
        veröffentlichbar.
      </p>

      <nav aria-label="Filter" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <li key={tab.key}>
              <Link
                href={`/admin/bewertungen?status=${tab.key}`}
                aria-current={active === tab.key ? "page" : undefined}
                className={`inline-flex h-9 items-center rounded-[6px] border px-4 text-[13.5px] transition-colors ${
                  active === tab.key
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                    : "border-[var(--color-rule)] bg-white text-[var(--color-ink-2)] hover:border-[var(--color-accent)]"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {reviews.length === 0 ? (
        <p className="mt-8 rounded-[10px] border border-[var(--color-rule)] bg-white p-6 text-[14.5px] text-[var(--color-ink-2)]">
          Keine Bewertung in dieser Ansicht.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      )}
    </div>
  );
}
