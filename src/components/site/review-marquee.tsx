import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Review, Software } from "@/lib/types";
import { IconCheck } from "@/components/icons";
import { SoftwareLogo } from "@/components/ui/software";
import { StarRating } from "@/components/ui/rating";
import { cx } from "@/components/ui/primitives";

type WallReview = Review & { software: Software };

/**
 * One card in the marquee. Deliberately compact: the vendor mark is the
 * largest element, because at a glance the column should read as a list of
 * named products rather than a wall of grey text.
 */
function MarqueeCard({ review, preview }: { review: WallReview; preview: boolean }) {
  return (
    <article className="review-glass flex min-h-[205px] w-full flex-col rounded-[24px] p-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/unternehmenssoftware-vergleichen/${review.software.slug}`}
          className="flex min-w-0 items-center gap-3 transition-opacity duration-200 hover:opacity-80"
        >
          <SoftwareLogo item={review.software} size={32} />
          <span className="truncate text-[14px] font-semibold text-[var(--color-ink)]">
            {review.software.name}
          </span>
        </Link>
        <span className="shrink-0"><StarRating value={review.overall_rating} reviewCount={1} size={16} showValue={false} /></span>
      </div>

      <blockquote className="mt-3 font-[var(--font-display)] text-[15px] font-semibold leading-[1.35] tracking-[-0.015em] text-[var(--color-ink)]">
        {review.review_title}
      </blockquote>

      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-[var(--color-ink-2)]">
        {review.summary}
      </p>

      <div className="mt-auto flex items-center gap-2.5 pt-3">
        <span
          aria-hidden="true"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1f3f5] font-[var(--font-display)] text-[13px] font-semibold text-[var(--color-ink-3)]"
        >
          {review.reviewer_name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-medium text-[var(--color-ink)]">
            {review.reviewer_name}
          </p>
          <p className="truncate text-[11.5px] leading-[1.35] text-[var(--color-ink-3)]">
            {review.reviewer_job_title} · {review.reviewer_company_size}
          </p>
        </div>
        {preview ? <span className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">Beispiel</span> : review.verified_badge ? (
          <IconCheck
            size={16}
            className="ml-auto shrink-0 text-[var(--color-positive)]"
            aria-label="Nachweis geprüft"
          />
        ) : (
          <time
            data-numeric
            dateTime={review.review_date}
            className="ml-auto shrink-0 text-[11.5px] text-[var(--color-ink-4)]"
          >
            {formatDate(review.review_date)}
          </time>
        )}
      </div>
    </article>
  );
}

/**
 * One vertical column. The list is rendered twice inside the track so the
 * loop is seamless; the duplicate is hidden from assistive technology so a
 * screen reader hears each review once.
 */
function MarqueeColumn({
  reviews,
  direction,
  duration,
  preview,
  className,
}: {
  reviews: WallReview[];
  direction: "up" | "down";
  duration: number;
  preview: boolean;
  className?: string;
}) {
  if (reviews.length === 0) return null;

  return (
    <div className={cx("marquee-mask h-full", className)}>
      <div
        className={cx("marquee-track", direction === "up" ? "marquee-up" : "marquee-down")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {reviews.map((review) => (
          <MarqueeCard key={review.id} review={review} preview={preview} />
        ))}
        <div aria-hidden="true" inert className="contents">
          {reviews.map((review) => (
            <MarqueeCard key={`${review.id}-loop`} review={review} preview={preview} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The review wall.
 *
 * The supplied photograph carries the flag on the left and clear paper on the
 * right, so the copy sits over the flag side and the moving columns sit over
 * the empty side. No overlay fades across the image; where text needs help,
 * a single flat panel sits behind it.
 */
export function ReviewMarquee({ reviews, software = [], preview = false }: { reviews: WallReview[]; software?: Software[]; preview?: boolean }) {
  if (reviews.length === 0) {
    return (
      <div>
        <div className="mx-auto max-w-[48rem] text-center">
          <p className="t-micro text-[#e4e1b3]">Erfahrungen aus der Praxis</p>
          <h2 className="t-display-2 mt-5 text-white">Die Perspektive, die im Datenblatt fehlt.</h2>
          <p className="t-lede mx-auto mt-5 max-w-[58ch] text-white/90">Was funktioniert im Alltag? Wählen Sie ein Programm und teilen Sie Ihre Erfahrung. Jede Bewertung wird vor der Veröffentlichung gelesen.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {software.map((item, index) => (
            <Link key={item.id} href={`/unternehmenssoftware-vergleichen/${item.slug}/erfahrungen-und-bewertungen/bewertung-verfassen`} className="group flex min-h-48 flex-col rounded-[10px] border border-white/75 bg-white/95 p-6 shadow-[0_18px_48px_-32px_rgba(23,44,60,.4)] transition-transform duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-4"><SoftwareLogo item={item} size={42} /><span data-numeric className="text-[12px] text-[var(--color-ink-4)]">0{index + 1}</span></div>
              <h3 className="mt-6 font-[var(--font-display)] text-[17px] font-semibold text-[var(--color-ink)]">{item.name}</h3>
              <p className="mt-1 text-[13px] text-[var(--color-ink-3)]">Ihre Erfahrung hilft bei der Auswahl.</p>
              <span className="mt-auto flex items-center justify-between border-t border-[var(--color-rule)] pt-4 text-[13px] font-semibold text-[var(--color-accent)]">Bewertung schreiben <span aria-hidden="true" className="text-[18px] transition-transform group-hover:translate-x-1">↗</span></span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-[13px] text-white/80">Noch keine veröffentlichten Bewertungen. Ihre Rückmeldung kann die erste sein.</p>
      </div>
    );
  }

  const columnA = reviews.filter((_, index) => index % 3 === 0);
  const columnB = reviews.filter((_, index) => index % 3 === 1);
  const columnC = reviews.filter((_, index) => index % 3 === 2);

  return (
    <div className="marquee-group">
      <div className="mx-auto max-w-[47rem] text-center">
        <p className="mx-auto inline-flex rounded-[6px] border border-white/30 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-2)]">Erfahrungsberichte</p>
        <h2 className="t-display-2 mt-4 text-white">Stimmen aus dem Softwarealltag.</h2>
        {preview ? <p className="mt-3 rounded-[6px] bg-white/90 px-4 py-2 text-[12px] leading-[1.5] text-[var(--color-ink-2)]">Designvorschau mit Beispieldaten. Keine Kundenstimmen; sie fließen in keine Note ein.</p> : null}
      </div>
      <div className="relative mt-7 h-[480px] overflow-hidden md:h-[540px]" role="region" aria-label={preview ? "Beispielbewertungen in Bewegung" : "Zuletzt veröffentlichte Bewertungen"}>
        <div className="grid h-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MarqueeColumn reviews={columnA} direction="up" duration={62} preview={preview} />
          <MarqueeColumn reviews={columnB} direction="down" duration={70} preview={preview} className="hidden sm:block" />
          <MarqueeColumn reviews={columnC} direction="up" duration={76} preview={preview} className="hidden lg:block" />
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center gap-2 text-center">
        <p className="text-[13px] text-white/90">{preview ? "Echte Bewertungen erscheinen hier, sobald sie geprüft und veröffentlicht sind." : "Erfahrungen von Nutzerinnen und Nutzern aus dem Softwarealltag."}</p>
        <Link href="/unternehmenssoftware-vergleichen" className="gloss gloss-light inline-flex min-h-11 items-center gap-2 rounded-[7px] bg-[var(--color-secondary)] px-5 py-2 text-[13px] font-semibold text-[#07316f] transition-colors hover:bg-[#bce7ff]">Programm entdecken <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  );
}
