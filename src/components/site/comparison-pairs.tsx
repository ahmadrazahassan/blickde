import Link from "next/link";
import type { Software } from "@/lib/types";
import { formatPrice, reviewCountLabel } from "@/lib/format";
import { SoftwareLogo } from "@/components/ui/software";
import { StarRating } from "@/components/ui/rating";
import { categoryById } from "@/data/categories";
import { cx } from "@/components/ui/primitives";
import { IconArrowRight, IconTrophy } from "@/components/icons";

const pairs = [
  ["sage-active", "lexware-office"],
  ["sage-hr-payroll", "personio"],
  ["lexware-office", "sevdesk"],
] as const;

/** Die fünf deutschen Pflichten, die auf dieser Karte gezählt werden. */
function confirmedChecks(item: Software) {
  const c = item.de_compliance;
  return [
    c.gobd_konform,
    c.elster_schnittstelle,
    c.datev_schnittstelle === true || c.datev_export === true,
    c.e_rechnung_versand,
    c.dsgvo_avv,
  ].filter((value) => value === true).length;
}

function price(item: Software) {
  return item.starting_price === null
    ? "Auf Anfrage"
    : item.starting_price === 0
      ? "Kostenlos"
      : `ab ${formatPrice(item.starting_price)}`;
}

function trialLabel(item: Software) {
  if (item.trial_days) return `${item.trial_days} Tage testen`;
  if (item.free_trial) return "Testphase";
  return item.demo ? item.demo.label : "Keine Testphase";
}

/**
 * Eine Seite des Paars, als vollwertige Produktkarte.
 *
 * Der Pokal steht für genau eine überprüfbare Sache: mehr bestätigte
 * Prüfpunkte. Er wird deshalb auch beschriftet, damit niemand ihn für ein
 * allgemeines Urteil über das bessere Programm hält.
 */
function ProductSide({ item, leads }: { item: Software; leads: boolean }) {
  const category = categoryById(item.category_id);
  const checks = confirmedChecks(item);

  return (
    <article
      className={cx(
        "relative flex min-w-0 flex-1 flex-col items-center rounded-[var(--radius-md)] border bg-white px-3 pb-4 pt-5 text-center transition-colors duration-200",
        leads
          ? "border-[var(--color-primary)] shadow-[0_0_0_1px_var(--color-primary),0_14px_32px_-24px_rgba(6,70,200,.5)]"
          : "border-[var(--color-rule)]",
      )}
    >
      {leads ? (
        <span className="absolute -top-2.5 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[var(--color-primary)] px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.07em] text-white">
          <IconTrophy size={16} filled />
          Mehr Prüfpunkte
        </span>
      ) : null}

      <div className={cx(leads && "mt-2")}>
        <SoftwareLogo item={item} size={44} />
      </div>

      <h4 className="mt-2.5 line-clamp-2 font-[var(--font-display)] text-[14px] font-semibold leading-tight tracking-[-0.018em] text-[var(--color-ink)]">
        <Link
          href={`/software/${item.slug}`}
          className="transition-colors duration-200 hover:text-[var(--color-primary)]"
        >
          {item.name}
        </Link>
      </h4>

      {category ? (
        <p className="mt-0.5 line-clamp-1 text-[11px] text-[var(--color-ink-3)]">{category.name}</p>
      ) : null}

      {/* Nutzerwertung nur, wo veröffentlichte Bewertungen vorliegen. */}
      <div className="mt-2.5 flex min-h-[38px] flex-col items-center justify-center gap-1">
        {item.review_count > 0 ? (
          <>
            <StarRating value={item.overall_rating} reviewCount={item.review_count} size={16} />
            <span className="text-[11px] text-[var(--color-ink-3)]">
              {reviewCountLabel(item.review_count)}
            </span>
          </>
        ) : (
          <span className="text-[11px] leading-[1.4] text-[var(--color-ink-4)]">
            Noch keine
            <br />
            Bewertung
          </span>
        )}
      </div>

      <p className="mt-2.5 w-full border-t border-[var(--color-rule)] pt-2.5 text-[12px] font-semibold text-[var(--color-primary)]">
        <span data-numeric>{checks} / 5</span>{" "}
        <span className="font-normal text-[var(--color-ink-3)]">Prüfpunkte</span>
      </p>

      <p data-numeric className="mt-1.5 text-[12.5px] font-semibold text-[var(--color-ink)]">
        {price(item)}
      </p>
      <p className="mt-0.5 line-clamp-1 text-[11px] text-[var(--color-ink-3)]">{trialLabel(item)}</p>
    </article>
  );
}

export function ComparisonPairs({ software }: { software: Software[] }) {
  const cards = pairs
    .map(
      ([a, b]) =>
        [
          software.find((item) => item.slug === a),
          software.find((item) => item.slug === b),
        ] as const,
    )
    .filter((pair): pair is readonly [Software, Software] => Boolean(pair[0] && pair[1]));

  return (
    <div className="mx-auto mt-7 max-w-[70rem]">
      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-3)]">
        Häufig verglichen
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(([a, b]) => {
          const checksA = confirmedChecks(a);
          const checksB = confirmedChecks(b);

          return (
            <article
              key={`${a.slug}-${b.slug}`}
              className="flex flex-col rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 shadow-[0_12px_28px_-23px_rgba(23,44,60,.35)]"
            >
              <div className="relative flex items-stretch gap-2.5">
                <ProductSide item={a} leads={checksA > checksB} />
                <ProductSide item={b} leads={checksB > checksA} />

                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 z-10 inline-flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-rule)] bg-white text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-3)] shadow-[var(--shadow-lift)]"
                >
                  vs
                </span>
              </div>

              <Link
                href={`/vergleich/${a.slug}-vs-${b.slug}`}
                className="gloss gloss-dark mt-4 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[7px] bg-[var(--color-primary)] px-4 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-primary-hover)]"
              >
                Vergleich ansehen
                <IconArrowRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11.5px] leading-[1.5] text-[var(--color-ink-3)]">
        Der Pokal steht für mehr bestätigte Prüfpunkte zu deutschen Pflichten, nicht für ein
        Gesamturteil. Nutzerwertungen erscheinen nur, wo veröffentlichte Bewertungen vorliegen.
      </p>
    </div>
  );
}
