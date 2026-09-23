import Link from "next/link";
import { formatGrade, formatPrice, reviewCountLabel } from "@/lib/format";
import type { Software } from "@/lib/types";
import { SoftwareLogo } from "@/components/ui/software";
import { StarRating } from "@/components/ui/rating";
import { categoryById } from "@/data/categories";
import { IconArrowRight, IconTrophy } from "@/components/icons";
import { cx } from "@/components/ui/primitives";

const DIMENSIONS = [
  { key: "ease_of_use_rating", label: "Bedienung" },
  { key: "value_for_money_rating", label: "Preis-Leistung" },
  { key: "customer_service_rating", label: "Betreuung" },
  { key: "functionality_rating", label: "Funktionsumfang" },
] as const;

/**
 * One diverging row. Two tracks grow outward from a shared centre line, so
 * the eye reads which product leads a dimension without comparing numbers.
 *
 * Colour never carries the verdict on its own: the leading side is also
 * announced to assistive technology and is set in a heavier weight.
 */
function DuelRow({
  label,
  valueA,
  valueB,
  countA,
  countB,
  nameA,
  nameB,
}: {
  label: string;
  valueA: number;
  valueB: number;
  countA: number;
  countB: number;
  nameA: string;
  nameB: string;
}) {
  const hasA = countA > 0 && valueA > 0;
  const hasB = countB > 0 && valueB > 0;
  const leadA = hasA && hasB && valueA > valueB;
  const leadB = hasA && hasB && valueB > valueA;

  const pctA = hasA ? Math.round((valueA / 5) * 100) : 0;
  const pctB = hasB ? Math.round((valueB / 5) * 100) : 0;

  return (
    <div className="py-3">
      <p className="mb-2 text-center text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink-3)]">
        {label}
      </p>

      <div className="flex items-center gap-2.5">
        <span
          data-numeric
          className={cx(
            "w-8 shrink-0 text-right text-[13px] tabular-nums",
            leadA ? "font-semibold text-[var(--color-ink)]" : "text-[var(--color-ink-3)]",
          )}
        >
          {formatGrade(valueA, countA)}
        </span>

        {/* Track A grows leftward from the centre */}
        <div className="flex h-2.5 flex-1 justify-end overflow-hidden rounded-l-[999px] bg-[var(--color-paper-3)]">
          <span
            className={cx(
              "block h-full rounded-l-[999px]",
              leadA ? "bg-[var(--color-red)]" : "bg-[var(--color-ink-4)]",
            )}
            style={{ width: `${pctA}%` }}
          />
        </div>

        <span aria-hidden="true" className="h-4 w-px shrink-0 bg-[var(--color-rule-strong)]" />

        {/* Track B grows rightward from the centre */}
        <div className="h-2.5 flex-1 overflow-hidden rounded-r-[999px] bg-[var(--color-paper-3)]">
          <span
            className={cx(
              "block h-full rounded-r-[999px]",
              leadB ? "bg-[var(--color-accent)]" : "bg-[var(--color-ink-4)]",
            )}
            style={{ width: `${pctB}%` }}
          />
        </div>

        <span
          data-numeric
          className={cx(
            "w-8 shrink-0 text-[13px] tabular-nums",
            leadB ? "font-semibold text-[var(--color-ink)]" : "text-[var(--color-ink-3)]",
          )}
        >
          {formatGrade(valueB, countB)}
        </span>
      </div>

      <p className="sr-only">
        {label}: {nameA} {formatGrade(valueA, countA)} von 5, {nameB} {formatGrade(valueB, countB)} von
        5.{" "}
        {leadA
          ? `${nameA} liegt in dieser Dimension vorn.`
          : leadB
            ? `${nameB} liegt in dieser Dimension vorn.`
            : "Beide liegen gleichauf."}
      </p>
    </div>
  );
}

/**
 * One side of the duel, as a proper product card: logo, name, category,
 * rating and entry price, the same facts a card in the directory carries.
 *
 * The trophy marks the side that leads on more dimensions. It never stands
 * alone: the same fact is written out underneath and in the tally below, so
 * a reader who cannot see the icon loses nothing.
 */
function DuelCard({
  item,
  wins,
  total,
  leads,
}: {
  item: Software;
  wins: number;
  total: number;
  leads: boolean;
}) {
  const category = categoryById(item.category_id);

  return (
    <article
      className={cx(
        "relative flex flex-col items-center rounded-[var(--radius-md)] border bg-white p-4 text-center transition-colors duration-200",
        leads
          ? "border-[var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent),0_14px_32px_-24px_rgba(6,70,200,.5)]"
          : "border-[var(--color-rule)]",
      )}
    >
      {leads ? (
        <span className="absolute -top-2.5 inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-2.5 py-[3px] text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white">
          <IconTrophy size={16} filled />
          Vorn
        </span>
      ) : null}

      <div className={cx(leads && "mt-2")}>
        <SoftwareLogo item={item} size={48} />
      </div>

      <h4 className="mt-2.5 line-clamp-2 font-[var(--font-display)] text-[14.5px] font-semibold leading-tight tracking-[-0.018em] text-[var(--color-ink)]">
        <Link
          href={`/software/${item.slug}`}
          className="transition-colors duration-200 hover:text-[var(--color-accent)]"
        >
          {item.name}
        </Link>
      </h4>

      {category ? (
        <p className="mt-1 line-clamp-1 text-[11.5px] text-[var(--color-ink-3)]">{category.name}</p>
      ) : null}

      <div className="mt-2.5 flex flex-col items-center gap-1">
        {/* Die Sterne ohne Zahl, weil die Note direkt darunter groß steht. */}
        <StarRating
          value={item.overall_rating}
          reviewCount={item.review_count}
          size={16}
          showValue={false}
        />
        <span
          data-numeric
          className="font-[var(--font-display)] text-[1.35rem] font-semibold leading-none tracking-[-0.03em] text-[var(--color-ink)]"
        >
          {formatGrade(item.overall_rating, item.review_count)}
        </span>
      </div>

      <p
        data-numeric
        className="mt-2.5 border-t border-[var(--color-rule)] pt-2.5 text-[12.5px] font-medium text-[var(--color-ink-2)]"
      >
        {item.starting_price === null
          ? "Auf Anfrage"
          : item.starting_price === 0
            ? "Kostenlos"
            : `ab ${formatPrice(item.starting_price)}`}
      </p>

      <p className="mt-1.5 text-[11.5px] leading-[1.4] text-[var(--color-ink-3)]">
        <span data-numeric>
          {wins} von {total}
        </span>{" "}
        Dimensionen vorn
      </p>
    </article>
  );
}

export function ComparisonDuel({
  pair,
  a,
  b,
  headline,
}: {
  pair: string;
  a: Software;
  b: Software;
  headline: string;
}) {
  const winsA = DIMENSIONS.filter((d) => a[d.key] > b[d.key]).length;
  const winsB = DIMENSIONS.filter((d) => b[d.key] > a[d.key]).length;

  /* A trophy only where there are published ratings to earn it with. With no
     reviews on either side the dimension scores are zero and a win would be
     an artefact, not a finding. */
  const rated = a.review_count > 0 && b.review_count > 0;
  const leadsA = rated && winsA > winsB;
  const leadsB = rated && winsB > winsA;

  return (
    <article className="card-soft card-hover flex h-full flex-col overflow-hidden">
      {/* Head: two product cards facing each other across a VS marker */}
      <div className="relative border-b border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 pt-7">
        <div className="grid grid-cols-2 gap-3">
          <DuelCard item={a} wins={winsA} total={DIMENSIONS.length} leads={leadsA} />
          <DuelCard item={b} wins={winsB} total={DIMENSIONS.length} leads={leadsB} />
        </div>

        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-10 inline-flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-rule)] bg-white text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-3)] shadow-[var(--shadow-lift)]"
        >
          vs
        </span>
      </div>

      {/* Diverging bars, one row per dimension */}
      <div className="divide-y divide-[var(--color-rule)] px-5 py-2">
        {DIMENSIONS.map((dimension) => (
          <DuelRow
            key={dimension.key}
            label={dimension.label}
            valueA={a[dimension.key]}
            valueB={b[dimension.key]}
            countA={a.review_count}
            countB={b.review_count}
            nameA={a.name}
            nameB={b.name}
          />
        ))}
      </div>

      {/* Tally and verdict line */}
      <div className="mt-auto border-t border-[var(--color-rule)] p-5">
        <p className="flex items-center justify-center gap-1.5 text-center text-[12.5px] leading-[1.5] text-[var(--color-ink-3)]">
          {leadsA || leadsB ? (
            <>
              <IconTrophy size={16} className="shrink-0 text-[var(--color-accent)]" />
              <span>
                <span className="font-semibold text-[var(--color-ink)]">
                  {leadsA ? a.name : b.name}
                </span>{" "}
                liegt in{" "}
                <span data-numeric>
                  {leadsA ? winsA : winsB} von {DIMENSIONS.length}
                </span>{" "}
                Dimensionen vorn
              </span>
            </>
          ) : rated ? (
            <span>Beide liegen über die vier Dimensionen gleichauf</span>
          ) : (
            <span>Noch keine veröffentlichten Bewertungen für einen Notenvergleich</span>
          )}
        </p>

        <p className="mt-3 line-clamp-3 text-center text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
          {headline}
        </p>

        <Link
          href={`/vergleich/${pair}`}
          className="gloss gloss-dark mt-5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-[7px] bg-[var(--color-primary)] px-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[var(--color-primary-hover)]"
        >
          Vollständigen Vergleich lesen
          <IconArrowRight size={16} />
        </Link>

        <p className="mt-3 text-center text-[11.5px] text-[var(--color-ink-4)]">
          Grundlage: {reviewCountLabel(a.review_count).toLowerCase()} und{" "}
          {reviewCountLabel(b.review_count).toLowerCase()}
        </p>
      </div>
    </article>
  );
}
