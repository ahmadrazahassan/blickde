import Link from "next/link";
import { formatDate, quote } from "@/lib/format";
import type { Review, Software } from "@/lib/types";
import { IconCheck } from "@/components/icons";
import { Badge, Card, cx } from "./primitives";
import { StarRating } from "./rating";
import { SoftwareLogo } from "./software";

/** Reviews never carry an uploaded avatar. An initial in a circle instead. */
function Initial({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] font-[var(--font-display)] text-[15px] font-semibold text-[var(--color-ink-3)]"
    >
      {name.charAt(0)}
    </span>
  );
}

function ReviewerLine({ review }: { review: Review }) {
  const parts = [review.reviewer_job_title, review.reviewer_company, review.reviewer_company_size]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="min-w-0">
      <p className="text-[14px] font-medium text-[var(--color-ink)]">{review.reviewer_name}</p>
      <p className="mt-0.5 text-[12.5px] leading-[1.5] text-[var(--color-ink-3)]">{parts}</p>
    </div>
  );
}

export function ReviewCard({
  review,
  software,
  className,
}: {
  review: Review;
  software?: Software;
  className?: string;
}) {
  return (
    <Card as="article" className={cx("flex h-full flex-col p-5", className)}>
      {software ? (
        <Link
          href={`/unternehmenssoftware-vergleichen/${software.slug}`}
          className="mb-4 flex items-center gap-2.5 border-b border-[var(--color-rule)] pb-4 transition-colors duration-200 hover:text-[var(--color-red)]"
        >
          <SoftwareLogo item={software} size={28} />
          <span className="text-[13.5px] font-medium text-[var(--color-ink)]">{software.name}</span>
        </Link>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <StarRating value={review.overall_rating} reviewCount={1} />
        <time
          data-numeric
          dateTime={review.review_date}
          className="shrink-0 text-[12.5px] text-[var(--color-ink-4)]"
        >
          {formatDate(review.review_date)}
        </time>
      </div>

      <h3 className="mt-3 font-[var(--font-display)] text-[1.05rem] font-semibold leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)]">
        {review.review_title}
      </h3>

      <p className="mt-2.5 text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">{review.summary}</p>

      <div className="mt-auto flex items-center gap-3 pt-5">
        <Initial name={review.reviewer_name} />
        <ReviewerLine review={review} />
      </div>

      {review.verified_badge ? (
        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-[var(--color-ink-3)]">
          <IconCheck size={16} className="text-[var(--color-positive)]" />
          {review.verified_badge}
        </p>
      ) : null}
    </Card>
  );
}

/** The long form used on a product's review page, with pros and cons. */
export function ReviewFull({ review }: { review: Review }) {
  return (
    <article className="mb-5 rounded-[16px] border border-[var(--color-rule)] bg-white p-6 shadow-[0_12px_30px_-25px_rgba(23,44,60,.35)] md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Initial name={review.reviewer_name} />
          <ReviewerLine review={review} />
        </div>
        <div className="flex flex-col items-start gap-1.5 md:items-end">
          <StarRating value={review.overall_rating} reviewCount={1} />
          <p className="text-[12.5px] text-[var(--color-ink-4)]">
            Nutzungsdauer: {review.used_for_duration} ·{" "}
            <time data-numeric dateTime={review.review_date}>
              {formatDate(review.review_date)}
            </time>
          </p>
        </div>
      </div>

      <h3 className="mt-6 font-[var(--font-display)] text-[1.3rem] font-semibold leading-[1.28] tracking-[-0.025em] text-[var(--color-ink)]">
        {review.review_title}
      </h3>

      <p className="mt-3 max-w-[48rem] text-[15.5px] leading-[1.68] text-[var(--color-ink-2)]">
        {review.summary}
      </p>

      <dl className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-[10px] border border-[#dbece3] bg-[#f8fcf9] p-4">
          <dt className="t-micro text-[var(--color-ink-3)]">Dafür spricht</dt>
          <dd className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">{review.pros}</dd>
        </div>
        <div className="rounded-[10px] border border-[#dce6f1] bg-[#f8faff] p-4">
          <dt className="t-micro text-[var(--color-ink-3)]">Dagegen spricht</dt>
          <dd className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">{review.cons}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[var(--color-ink-3)]">
        <span>Branche: {review.reviewer_industry}</span>
        <span data-numeric>{review.helpful_count} Personen fanden das hilfreich</span>
        {review.verified_badge ? (
          <span className="inline-flex items-center gap-1.5">
            <IconCheck size={16} className="text-[var(--color-positive)]" />
            {review.verified_badge}
          </span>
        ) : null}
      </div>

      {review.vendor_response ? (
        <div className="mt-6 rounded-[8px] bg-[var(--color-paper-2)] p-5">
          <p className="t-micro text-[var(--color-ink-3)]">
            Antwort des Anbieters
            {review.vendor_response_date ? (
              <>
                {" "}
                ·{" "}
                <time data-numeric dateTime={review.vendor_response_date}>
                  {formatDate(review.vendor_response_date)}
                </time>
              </>
            ) : null}
          </p>
          <p className="mt-2.5 text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
            {review.vendor_response}
          </p>
        </div>
      ) : null}
    </article>
  );
}

/** The short quote form used on the homepage wall. */
export function ReviewQuote({ review, software }: { review: Review; software: Software }) {
  return (
    <Card as="article" className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/unternehmenssoftware-vergleichen/${software.slug}`}
          className="flex min-w-0 items-center gap-2.5 transition-colors duration-200 hover:text-[var(--color-red)]"
        >
          <SoftwareLogo item={software} size={26} />
          <span className="truncate text-[13px] font-medium text-[var(--color-ink)]">
            {software.name}
          </span>
        </Link>
        <StarRating value={review.overall_rating} reviewCount={1} size={16} showValue={false} />
      </div>

      <blockquote className="mt-4 font-[var(--font-display)] text-[1.02rem] font-normal leading-[1.45] tracking-[-0.01em] text-[var(--color-ink)]">
        {quote(review.review_title)}
      </blockquote>

      <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">{review.summary}</p>

      <div className="mt-auto flex items-center gap-3 border-t border-[var(--color-rule)] pt-4 mt-5">
        <Initial name={review.reviewer_name} />
        <ReviewerLine review={review} />
      </div>
    </Card>
  );
}

/**
 * Shown wherever development fixtures are rendered. The flag that gates them
 * lives in src/lib/queries.ts; this is the visible half of the same rule.
 */
export function SeedDataNotice({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "rounded-[8px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4",
        className,
      )}
    >
      <Badge tone="ink">Beispieldaten</Badge>
      <p className="mt-2.5 max-w-[52rem] text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
        Die hier gezeigten Bewertungen sind Beispieldaten aus dem Aufbau dieser Seite und stammen
        nicht von Kundinnen und Kunden der genannten Anbieter. Sie fließen in keine veröffentlichte
        Note ein. Sobald echte, geprüfte Bewertungen vorliegen, ersetzen sie diese Beispiele.
      </p>
    </div>
  );
}
