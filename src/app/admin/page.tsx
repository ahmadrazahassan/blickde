import Link from "next/link";
import { redirect } from "next/navigation";

import { currentAdmin } from "@/lib/supabase/auth";
import {
  getAdminFigures,
  getContactMessages,
  getRecentAudit,
  getReviewQueue,
} from "@/lib/admin-queries";
import { MessageRow } from "./message-row";

export const dynamic = "force-dynamic";

function Figure({
  label,
  value,
  hint,
  href,
  alert = false,
}: {
  label: string;
  value: number;
  hint?: string;
  href?: string;
  alert?: boolean;
}) {
  const body = (
    <>
      <p className="t-micro text-[var(--color-ink-3)]">{label}</p>
      <p
        data-numeric
        className={`mt-2 text-[28px] font-semibold tabular-nums ${
          alert && value > 0 ? "text-[var(--color-red)]" : "text-[var(--color-ink)]"
        }`}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-[12.5px] text-[var(--color-ink-3)]">{hint}</p> : null}
    </>
  );

  const className =
    "block rounded-[10px] border border-[var(--color-rule)] bg-white p-5" +
    (href ? " transition-colors hover:border-[var(--color-accent)]" : "");

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

const DATE = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function AdminDashboard() {
  // The middleware already refused an unauthenticated request. This is the
  // second of three checks, because a page is not protected by the fact that
  // some other layer usually protects it.
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/anmelden");

  const [figures, queue, messages, audit] = await Promise.all([
    getAdminFigures(),
    getReviewQueue("pending", 5),
    getContactMessages(6),
    getRecentAudit(12),
  ]);

  return (
    <div className="container-page py-10">
      <h1 className="text-[24px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
        Übersicht
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Figure
          label="Bewertungen in Prüfung"
          value={figures.pendingReviews}
          hint="warten auf eine Entscheidung"
          href="/admin/bewertungen"
          alert
        />
        <Figure
          label="Neue Nachrichten"
          value={figures.newMessages}
          hint="ungelesene Kontaktanfragen"
          alert
        />
        <Figure
          label="Veröffentlichte Bewertungen"
          value={figures.publishedReviews}
          hint={`${figures.rejectedReviews} abgelehnt`}
        />
        <Figure
          label="Produkte"
          value={figures.publishedSoftware}
          hint={`${figures.draftSoftware} im Entwurf`}
        />
        <Figure
          label="Newsletter bestätigt"
          value={figures.confirmedSubscribers}
          hint={`${figures.pendingSubscribers} unbestätigt, Löschung nach 30 Tagen`}
        />
        <Figure
          label="Partnerklicks, 30 Tage"
          value={figures.clicksLast30Days}
          hint="Löschung nach 14 Monaten"
        />
      </div>

      {/* ------------------------------------------------ moderation queue */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[18px] font-semibold text-[var(--color-ink)]">
            Nächste Einsendungen
          </h2>
          <Link href="/admin/bewertungen" className="text-[14px] link-red">
            Alle Bewertungen
          </Link>
        </div>

        {queue.length === 0 ? (
          <p className="mt-4 rounded-[10px] border border-[var(--color-rule)] bg-white p-5 text-[14.5px] text-[var(--color-ink-2)]">
            Keine Bewertung wartet auf Prüfung.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {queue.map((review) => (
              <li
                key={review.id}
                className="rounded-[10px] border border-[var(--color-rule)] bg-white p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-[15px] font-medium text-[var(--color-ink)]">
                    {review.review_title}
                  </p>
                  <p className="text-[13px] text-[var(--color-ink-3)]">
                    {DATE.format(new Date(review.created_at))}
                  </p>
                </div>
                <p className="mt-1 text-[13.5px] text-[var(--color-ink-3)]">
                  {review.software_name} · {review.reviewer_name} · Gesamtnote{" "}
                  <span data-numeric>{review.overall_rating}</span>
                  {review.duplicate_from_same_ip
                    ? " · weitere Einsendung mit demselben IP-Hash"
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* --------------------------------------------------- messages */}
      <section className="mt-12">
        <h2 className="text-[18px] font-semibold text-[var(--color-ink)]">Nachrichten</h2>

        {messages.length === 0 ? (
          <p className="mt-4 rounded-[10px] border border-[var(--color-rule)] bg-white p-5 text-[14.5px] text-[var(--color-ink-2)]">
            Keine Nachrichten.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {messages.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
          </ul>
        )}

        <p className="mt-4 text-[12.5px] leading-[1.6] text-[var(--color-ink-3)]">
          Kontaktnachrichten werden 24 Monate nach Eingang automatisch gelöscht. Die IP-Adresse
          liegt ausschließlich als gesalzener Hashwert vor und wird hier nicht angezeigt, weil sie
          für die Bearbeitung nicht gebraucht wird.
        </p>
      </section>

      {/* --------------------------------------------------- audit trail */}
      <section className="mt-12">
        <h2 className="text-[18px] font-semibold text-[var(--color-ink)]">Letzte Änderungen</h2>
        <p className="mt-1 text-[13px] text-[var(--color-ink-3)]">
          Wer wann was geändert hat. Wenn eine Korrektur einen Preis oder eine Note betrifft, muss
          die Redaktion das belegen können.
        </p>

        <div className="mt-4 overflow-x-auto rounded-[10px] border border-[var(--color-rule)] bg-white">
          <table className="w-full text-left text-[13.5px]">
            <thead className="border-b border-[var(--color-rule)] text-[var(--color-ink-3)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Zeitpunkt</th>
                <th scope="col" className="px-4 py-3 font-medium">Tabelle</th>
                <th scope="col" className="px-4 py-3 font-medium">Vorgang</th>
                <th scope="col" className="px-4 py-3 font-medium">Bearbeitung</th>
              </tr>
            </thead>
            <tbody>
              {audit.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-[var(--color-ink-3)]">
                    Noch keine Einträge.
                  </td>
                </tr>
              ) : (
                audit.map((entry) => (
                  <tr key={entry.id} className="border-t border-[var(--color-rule)]">
                    <td className="px-4 py-3 text-[var(--color-ink-2)]" data-numeric>
                      {DATE.format(new Date(entry.created_at))}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-ink-2)]">{entry.table_name}</td>
                    <td className="px-4 py-3 text-[var(--color-ink-2)]">{entry.action}</td>
                    <td className="px-4 py-3 text-[var(--color-ink-3)]">{entry.actor ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
