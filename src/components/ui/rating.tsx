import { IconStar, IconCheck, IconDash, IconUnverified } from "@/components/icons";
import { formatGrade, formatPercent, formatRating, reviewCountLabel } from "@/lib/format";
import type { Verified } from "@/lib/types";
import { cx } from "./primitives";

/* ==========================================================================
   StarRating. Gold, and the numeric value always travels with it, because
   colour alone never carries meaning.
   ========================================================================== */

export function StarRating({
  value,
  reviewCount,
  size = 16,
  showValue = true,
  className,
}: {
  value: number;
  reviewCount: number;
  size?: 16 | 18 | 20;
  showValue?: boolean;
  className?: string;
}) {
  const hasGrade = reviewCount > 0 && value > 0;
  const rounded = Math.round(value);

  return (
    <span
      className={cx("inline-flex items-center gap-2", className)}
      role="img"
      aria-label={
        hasGrade
          ? `Note ${formatRating(value)} von 5, aus ${reviewCountLabel(reviewCount)}`
          : "Noch keine Bewertung vorhanden"
      }
    >
      <span className="inline-flex items-center gap-[2px] text-[var(--color-gold)]" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <IconStar
            key={i}
            size={size}
            filled={hasGrade && i <= rounded}
            className={hasGrade ? undefined : "text-[var(--color-ink-4)]"}
          />
        ))}
      </span>
      {showValue ? (
        <span
          data-numeric
          aria-hidden="true"
          className="text-[14px] font-medium text-[var(--color-ink)]"
        >
          {formatGrade(value, reviewCount)}
        </span>
      ) : null}
    </span>
  );
}

/* ==========================================================================
   RatingBar. One dimension of the breakdown. Colour plus a written number.
   ========================================================================== */

export function RatingBar({
  label,
  value,
  reviewCount,
}: {
  label: string;
  value: number;
  reviewCount: number;
}) {
  const share = reviewCount > 0 && value > 0 ? value / 5 : 0;

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-3.5">
      <span className="text-[14px] text-[var(--color-ink-2)]">{label}</span>
      <span data-numeric className="text-[14px] font-medium text-[var(--color-ink)]">
        {formatGrade(value, reviewCount)}
        <span className="text-[var(--color-ink-4)]"> / 5</span>
      </span>
      <div
        className="col-span-2 h-[6px] w-full rounded-[4px] bg-[var(--color-paper-3)]"
        role="img"
        aria-label={`${label}: ${formatGrade(value, reviewCount)} von 5`}
      >
        <div
          className="h-full rounded-[4px] bg-[var(--color-ink)]"
          style={{ width: `${Math.round(share * 100)}%` }}
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   SentimentBar. Distribution of grades. Each row carries a written share.
   ========================================================================== */

export function SentimentBar({
  distribution,
}: {
  distribution: { stars: number; count: number; share: number }[];
}) {
  return (
    <table className="w-full">
      <caption className="sr-only">Verteilung der Bewertungen nach Sternen</caption>
      <tbody>
        {distribution.map((row) => (
          <tr key={row.stars}>
            <th
              scope="row"
              className="whitespace-nowrap py-1.5 pr-3 text-left text-[13px] font-normal text-[var(--color-ink-3)]"
            >
              {row.stars} Sterne
            </th>
            <td className="w-full py-1.5">
              <div className="h-[6px] w-full rounded-[4px] bg-[var(--color-paper-3)]">
                <div
                  className="h-full rounded-[4px] bg-[var(--color-gold)]"
                  style={{ width: `${Math.round(row.share * 100)}%` }}
                />
              </div>
            </td>
            <td
              data-numeric
              className="whitespace-nowrap py-1.5 pl-3 text-right text-[13px] text-[var(--color-ink-2)]"
            >
              {formatPercent(Math.round(row.share * 100))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ==========================================================================
   ScorePlate. The grade block in the sticky rail.
   ========================================================================== */

export function ScorePlate({
  value,
  reviewCount,
}: {
  value: number;
  reviewCount: number;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex min-w-[5.5rem] flex-col">
        <span
          data-numeric
          className="font-[var(--font-display)] text-[3.25rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-ink)]"
        >
          {formatGrade(value, reviewCount)}
        </span>
        <span className="mt-1 text-[13px] text-[var(--color-ink-3)]">von 5 Punkten</span>
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <StarRating value={value} reviewCount={reviewCount} size={18} showValue={false} />
        <span className="text-[13.5px] text-[var(--color-ink-2)]">{reviewCountLabel(reviewCount)}</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   VerifiedMark. The three state cell used throughout the compliance ledger.
   A blank cell would read as "no", so it never stays blank.
   ========================================================================== */

export function VerifiedMark({ state, label }: { state: Verified; label: string }) {
  if (state === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[var(--color-positive)]">
        <IconCheck size={18} />
        <span className="sr-only">{label}: ja, von uns bestätigt</span>
        <span aria-hidden="true" className="text-[13.5px] text-[var(--color-ink-2)]">
          ja
        </span>
      </span>
    );
  }

  if (state === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[var(--color-ink-4)]">
        <IconDash size={18} />
        <span className="sr-only">{label}: nein, von uns bestätigt</span>
        <span aria-hidden="true" className="text-[13.5px] text-[var(--color-ink-2)]">
          nein
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[var(--color-ink-4)]">
      <IconUnverified size={18} />
      <span className="sr-only">{label}: nicht geprüft</span>
      <span aria-hidden="true" className="text-[13.5px] text-[var(--color-ink-3)]">
        nicht geprüft
      </span>
    </span>
  );
}

/** The short form used inside dense comparison tables. */
export function VerifiedCell({ state, label }: { state: Verified; label: string }) {
  if (state === true) {
    return (
      <span className="inline-flex text-[var(--color-positive)]">
        <IconCheck size={18} />
        <span className="sr-only">{label}: ja</span>
      </span>
    );
  }
  if (state === false) {
    return (
      <span className="inline-flex text-[var(--color-ink-4)]">
        <IconDash size={18} />
        <span className="sr-only">{label}: nein</span>
      </span>
    );
  }
  return (
    <span className="inline-flex text-[var(--color-ink-4)]">
      <IconUnverified size={18} />
      <span className="sr-only">{label}: nicht geprüft</span>
    </span>
  );
}
