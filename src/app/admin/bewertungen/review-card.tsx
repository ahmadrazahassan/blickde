"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button, Textarea } from "@/components/ui/primitives";
import type { PendingReview } from "@/lib/admin-queries";
import { moderateReviewAction, respondToReviewAction } from "../actions";

const DATE = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function Score({ label, value }: { label: string; value: number | null }) {
  return (
    <div>
      <dt className="text-[12px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">{label}</dt>
      <dd data-numeric className="mt-0.5 text-[15px] font-medium text-[var(--color-ink)]">
        {value === null ? "—" : value.toFixed(1).replace(".", ",")}
      </dd>
    </div>
  );
}

export function ReviewCard({ review }: { review: PendingReview }) {
  const router = useRouter();
  const [note, setNote] = useState(review.moderation_note ?? "");
  const [response, setResponse] = useState(review.vendor_response ?? "");
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [pending, start] = useTransition();

  function decide(decision: "published" | "rejected" | "pending") {
    start(async () => {
      const data = new FormData();
      data.set("id", review.id);
      data.set("decision", decision);
      data.set("note", note);

      const result = await moderateReviewAction(data);
      setMessage(result.message);
      setFailed(!result.ok);
      if (result.ok) router.refresh();
    });
  }

  function saveResponse() {
    start(async () => {
      const data = new FormData();
      data.set("id", review.id);
      data.set("response", response);

      const result = await respondToReviewAction(data);
      setMessage(result.message);
      setFailed(!result.ok);
      if (result.ok) router.refresh();
    });
  }

  return (
    <li className="rounded-[10px] border border-[var(--color-rule)] bg-white p-6">
      {/* ------------------------------------------------------- header */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[17px] font-semibold text-[var(--color-ink)]">{review.review_title}</h2>
        <p className="text-[13px] text-[var(--color-ink-3)]" data-numeric>
          eingegangen {DATE.format(new Date(review.created_at))}
        </p>
      </div>

      <p className="mt-1 text-[13.5px] text-[var(--color-ink-3)]">
        <Link href={`/software/${review.software_slug}`} className="link-red">
          {review.software_name}
        </Link>{" "}
        · {review.reviewer_name}
        {review.reviewer_job_title ? `, ${review.reviewer_job_title}` : ""}
        {review.reviewer_company ? `, ${review.reviewer_company}` : ""}
      </p>

      <p className="mt-1 text-[13px] text-[var(--color-ink-3)]">
        {[review.reviewer_industry, review.reviewer_company_size, review.used_for_duration]
          .filter(Boolean)
          .join(" · ")}
      </p>

      {review.duplicate_from_same_ip ? (
        <p className="mt-3 rounded-[6px] border border-[var(--color-red)] bg-[var(--color-red-tint)] px-3 py-2 text-[13px] text-[var(--color-ink)]">
          Zu diesem Produkt liegt mindestens eine weitere Einsendung mit demselben IP-Hash vor. Das
          ist kein Beweis für einen Missbrauch, sondern ein Grund, genauer hinzusehen.
        </p>
      ) : null}

      {/* ------------------------------------------------------- scores */}
      <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-[var(--color-rule)] py-4 sm:grid-cols-5">
        <Score label="Gesamt" value={review.overall_rating} />
        <Score label="Bedienung" value={review.ease_of_use} />
        <Score label="Preis-Leistung" value={review.value_for_money} />
        <Score label="Betreuung" value={review.customer_service} />
        <Score label="Funktionen" value={review.functionality} />
      </dl>

      {/* ------------------------------------------------------- content */}
      <div className="mt-5 flex flex-col gap-4 text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
        {review.summary ? <p className="whitespace-pre-line">{review.summary}</p> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="t-micro text-[var(--color-positive)]">Vorteile</p>
            <p className="mt-1 whitespace-pre-line">{review.pros ?? "—"}</p>
          </div>
          <div>
            <p className="t-micro text-[var(--color-negative)]">Nachteile</p>
            <p className="mt-1 whitespace-pre-line">{review.cons ?? "—"}</p>
          </div>
        </div>
      </div>

      {review.submitter_email ? (
        <p className="mt-4 text-[13px] text-[var(--color-ink-3)]">
          Rückfragen an{" "}
          <a href={`mailto:${review.submitter_email}`} className="link-red">
            {review.submitter_email}
          </a>
          . Die Adresse wird nicht veröffentlicht.
        </p>
      ) : null}

      {review.moderated_by ? (
        <p className="mt-2 text-[13px] text-[var(--color-ink-3)]">
          Zuletzt bearbeitet von {review.moderated_by}
          {review.moderation_note ? ` · Notiz: ${review.moderation_note}` : ""}
        </p>
      ) : null}

      {/* ------------------------------------------------------- decision */}
      <div className="mt-6 border-t border-[var(--color-rule)] pt-5">
        <label
          htmlFor={`note-${review.id}`}
          className="text-[13.5px] font-medium text-[var(--color-ink)]"
        >
          Interne Notiz zur Entscheidung
        </label>
        <p className="mt-1 text-[12.5px] text-[var(--color-ink-3)]">
          Wird nicht veröffentlicht. Sie steht im Protokoll und begründet die Entscheidung später.
        </p>
        <Textarea
          id={`note-${review.id}`}
          rows={2}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="mt-2"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {review.status !== "published" ? (
            <Button type="button" variant="primary" disabled={pending} onClick={() => decide("published")}>
              Veröffentlichen
            </Button>
          ) : null}
          {review.status !== "rejected" ? (
            <Button
              type="button"
              variant="destructive"
              disabled={pending}
              onClick={() => decide("rejected")}
            >
              Ablehnen
            </Button>
          ) : null}
          {review.status !== "pending" ? (
            <Button type="button" variant="secondary" disabled={pending} onClick={() => decide("pending")}>
              Zurück in die Prüfung
            </Button>
          ) : null}
        </div>

        {/* Editorial reply, only once the statement is actually public. */}
        {review.status === "published" ? (
          <div className="mt-6 border-t border-[var(--color-rule)] pt-5">
            <label
              htmlFor={`response-${review.id}`}
              className="text-[13.5px] font-medium text-[var(--color-ink)]"
            >
              Öffentliche Antwort
            </label>
            <p className="mt-1 text-[12.5px] text-[var(--color-ink-3)]">
              Erscheint unter der Bewertung. Ein leeres Feld entfernt eine vorhandene Antwort.
            </p>
            <Textarea
              id={`response-${review.id}`}
              rows={3}
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              className="mt-2"
            />
            <div className="mt-3">
              <Button type="button" variant="secondary" disabled={pending} onClick={saveResponse}>
                Antwort speichern
              </Button>
            </div>
          </div>
        ) : null}

        {message ? (
          <p
            role="status"
            className={`mt-4 text-[13.5px] ${failed ? "text-[var(--color-negative)]" : "text-[var(--color-positive)]"}`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </li>
  );
}
