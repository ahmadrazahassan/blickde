import Image from "next/image";
import Link from "next/link";
import { COMPLIANCE_CHIPS } from "@/data/software";
import { categoryById } from "@/data/categories";
import {
  formatDate,
  formatGrade,
  formatPrice,
  billingPeriodLabel,
  reviewCountLabel,
} from "@/lib/format";
import { vendorHref } from "@/lib/links";
import type { Software } from "@/lib/types";
import {
  IconCalendar,
  IconCheck,
  IconExternal,
  IconArrowRight,
  IconTag,
  IconDemo,
} from "@/components/icons";
import { Badge, Chip, Card, LinkCard, cx } from "./primitives";
import { StarRating } from "./rating";

/* ==========================================================================
   SoftwareLogo.

   The mark sits on the page with no plate, no border and no tinted square
   behind it, which is what the client asked for. Marks are multiplied into
   the paper so a white bounding box in a supplied PNG disappears.
   ========================================================================== */

export function SoftwareLogo({
  item,
  size = 48,
  className,
}: {
  item: Pick<Software, "name" | "logo_url">;
  size?: number;
  className?: string;
}) {
  if (!item.logo_url) {
    return (
      <span
        aria-hidden="true"
        className={cx(
          "inline-flex shrink-0 items-center justify-center font-[var(--font-display)] font-semibold text-[var(--color-ink-3)]",
          className,
        )}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
      >
        {item.name.charAt(0)}
      </span>
    );
  }

  return (
    <Image
      src={item.logo_url}
      alt=""
      width={size}
      height={size}
      className={cx("logo-bare shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}

/* ==========================================================================
   Price block. Two columns, the way the client's reference sets it.
   ========================================================================== */

const DEMO_LABEL: Record<NonNullable<Software["demo"]>["kind"], string> = {
  "live-demo": "Live-Demo",
  produkttour: "Produkttour",
  webdemo: "Webdemo",
  infopaket: "Infopaket",
};

/**
 * What a buyer can actually get hands on, in one line.
 *
 * A trial with a published length is the strongest thing a vendor offers, so
 * it is named in days. Where a vendor offers a guided demo instead, that is
 * what is printed: sending someone to a "30 Tage testen" button that does not
 * exist on the vendor's page wastes their time and costs us the referral.
 */
export function trialSummary(item: Software): { headline: string; detail: string | null } {
  if (item.trial_days) {
    return {
      headline: `${item.trial_days} Tage kostenlos`,
      detail: item.free_version ? "Zusätzlich Gratis-Tarif" : null,
    };
  }
  if (item.free_version) {
    return { headline: "Gratis-Tarif", detail: "Dauerhaft kostenlos nutzbar" };
  }
  if (item.free_trial) {
    return { headline: "Testphase", detail: "Dauer nicht veröffentlicht" };
  }
  if (item.demo) {
    return { headline: DEMO_LABEL[item.demo.kind], detail: "Keine Testphase" };
  }
  return { headline: "Nur kostenpflichtig", detail: null };
}

/**
 * A running vendor offer. Only ever rendered from Software.promotion, which
 * carries the vendor's own wording, and only while the end date the vendor
 * named is still in the future.
 *
 * The end date is no longer printed. A date on our page is a statement about
 * the vendor's terms that only the vendor can keep current, so the offer is
 * marked with an asterisk instead and the conditions are left where they
 * belong: with the provider. The stored date still governs whether the offer
 * is shown at all, because advertising an offer that has already ended would
 * be a misleading commercial practice.
 */
export function activePromotion(item: Software) {
  const promo = item.promotion;
  if (!promo) return null;
  if (promo.valid_until && new Date(`${promo.valid_until}T23:59:59Z`).getTime() < Date.now()) {
    return null;
  }
  return promo;
}

/** The line the asterisk on a promotion points at. */
export const PROMOTION_FOOTNOTE =
  "* Laufzeit, Bedingungen und Verfügbarkeit nach Angaben des Anbieters. Maßgeblich sind die Konditionen auf der Anbieterseite zum Zeitpunkt Ihres Vertragsschlusses.";

export function PromotionBanner({ item, className }: { item: Software; className?: string }) {
  const promo = activePromotion(item);
  if (!promo) return null;

  return (
    <p
      className={cx(
        "flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-[10px] bg-[var(--color-red-tint)] px-3 py-2 text-[12.5px] font-medium text-[var(--color-red)]",
        className,
      )}
    >
      <IconTag size={16} />
      <span>
        {promo.label}
        <span aria-hidden="true">*</span>
        <span className="sr-only"> {PROMOTION_FOOTNOTE}</span>
      </span>
      <span className="font-normal text-[var(--color-ink-3)]">
        Bedingungen beim Anbieter
      </span>
    </p>
  );
}

/**
 * The wording on the outbound button.
 *
 * It names the strongest thing waiting on the vendor's page, because a button
 * that promises what the landing page actually offers converts better and,
 * more importantly, does not mislead anyone into a click they did not want.
 */
export function vendorCtaLabel(item: Software): string {
  if (item.trial_days) return `${item.trial_days} Tage gratis testen`;
  if (activePromotion(item)) return "Angebot beim Anbieter ansehen";
  if (item.free_version) return "Gratis-Tarif ansehen";
  if (item.demo) return item.demo.label;
  return "Zum Anbieter";
}

/**
 * Preis- und Konditionshinweis.
 *
 * Preise, Aktionen und Testphasen ändern sich, und zwar ohne dass ein
 * Vergleichsportal davon erfährt. Dieser Hinweis steht überall dort, wo wir
 * einen Preis nennen. Er schützt die Leserin vor einer veralteten Zahl und
 * uns vor der Behauptung, wir hätten einen Preis zugesichert.
 */
export function PriceDisclaimer({
  checkedAt,
  className,
}: {
  checkedAt?: string | null;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "flex items-start gap-2 text-[12px] leading-[1.55] text-[var(--color-ink-3)]",
        className,
      )}
    >
      <IconCalendar size={16} className="mt-0.5 shrink-0 text-[var(--color-ink-4)]" />
      <span>
        {checkedAt ? (
          <>
            Preise und Konditionen von uns geprüft am{" "}
            <time data-numeric dateTime={checkedAt} className="font-medium text-[var(--color-ink)]">
              {formatDate(checkedAt)}
            </time>
            .{" "}
          </>
        ) : null}
        Anbieter ändern Preise, Aktionen und Testphasen laufend. Maßgeblich sind die Angaben auf der
        Website des Anbieters zum Zeitpunkt Ihres Vertragsschlusses. Alle Beträge netto, zzgl. 19 %
        MwSt., sofern nicht anders angegeben.
      </span>
    </p>
  );
}

export function PriceBlock({ item }: { item: Software }) {
  const price =
    item.starting_price === null
      ? "Auf Anfrage"
      : item.starting_price === 0
        ? "Kostenlos"
        : formatPrice(item.starting_price);

  const period =
    item.starting_price === null
      ? "Preis nicht veröffentlicht"
      : item.starting_price === 0
        ? "Dauerhaft kostenloser Tarif"
        : `${billingPeriodLabel(item.billing_period)}, zzgl. 19 % MwSt.`;

  const promo = activePromotion(item);
  /* The list price struck through next to the offer price, so the reader can
     see what the offer is actually worth and what it reverts to. */
  const listPrice = promo ? (item.pricing_plans.find((p) => p.list_price)?.list_price ?? null) : null;

  const trial = trialSummary(item);

  /* Priority ladder for the right hand column. */
  const secondary: { label: string; headline: string; detail: React.ReactNode } = promo
    ? {
        label: "Aktion",
        headline: `${promo.label}*`,
        detail: "* Laufzeit und Bedingungen laut Anbieter",
      }
    : item.trial_days
      ? {
          label: "Testphase",
          headline: `${item.trial_days} Tage kostenlos`,
          detail: item.pricing_checked_at ? (
            <>
              Preis geprüft{" "}
              <time data-numeric dateTime={item.pricing_checked_at}>
                {formatDate(item.pricing_checked_at)}
              </time>
            </>
          ) : (
            "Prüfdatum offen"
          ),
        }
      : {
          label: "Preis geprüft",
          headline: item.pricing_checked_at ? formatDate(item.pricing_checked_at) : "offen",
          detail: trial.headline === "Nur kostenpflichtig" ? "Keine Testphase" : trial.headline,
        };

  return (
    <div className="grid grid-cols-[1.35fr_1fr] gap-3 rounded-[12px] bg-[var(--color-paper-2)] p-3.5">
      <div>
        <p className="t-micro text-[var(--color-ink-4)]">Ab</p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span
            data-numeric
            className="font-[var(--font-display)] text-[1.25rem] font-semibold leading-tight tracking-[-0.02em] text-[var(--color-ink)]"
          >
            {price}
          </span>
          {listPrice ? (
            <span data-numeric className="text-[12.5px] text-[var(--color-ink-4)] line-through">
              {formatPrice(listPrice)}
            </span>
          ) : null}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[1.4] text-[var(--color-ink-3)]">{period}</p>
      </div>

      {/* The second column shows the strongest fact we hold, in this order:
          a running offer, then a trial with a named length, then the date a
          person last verified the price. A bare label like "Testphase" tells
          a reader nothing they can act on. */}
      <div className="border-l border-[var(--color-rule)] pl-3.5">
        <p className="t-micro text-[var(--color-ink-4)]">{secondary.label}</p>
        <p className="mt-1 text-[14px] font-medium leading-tight text-[var(--color-ink)]">
          {secondary.headline}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[1.4] text-[var(--color-ink-3)]">
          {secondary.detail}
        </p>
      </div>
    </div>
  );
}

/** The single line form, used in dense lists and rails. */
export function PriceLine({ item, withDate = true }: { item: Software; withDate?: boolean }) {
  if (item.starting_price === null) {
    return (
      <span className="text-[14px] text-[var(--color-ink-2)]">
        Preis auf Anfrage
        {withDate && item.pricing_checked_at ? (
          <span className="text-[var(--color-ink-4)]">
            {" "}
            · geprüft am{" "}
            <time dateTime={item.pricing_checked_at}>{formatDate(item.pricing_checked_at)}</time>
          </span>
        ) : null}
      </span>
    );
  }

  if (item.starting_price === 0) {
    return (
      <span className="text-[14px] text-[var(--color-ink-2)]">
        <span className="font-medium text-[var(--color-ink)]">Kostenloser Tarif verfügbar</span>
        {withDate && item.pricing_checked_at ? (
          <span className="text-[var(--color-ink-4)]">
            {" "}
            · geprüft am{" "}
            <time dateTime={item.pricing_checked_at}>{formatDate(item.pricing_checked_at)}</time>
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span className="text-[14px] text-[var(--color-ink-2)]">
      <span data-numeric className="font-medium text-[var(--color-ink)]">
        ab {formatPrice(item.starting_price)}
      </span>{" "}
      {billingPeriodLabel(item.billing_period)}, {item.price_includes_vat ? "inkl." : "zzgl."}{" "}
      19&nbsp;% MwSt.
      {withDate && item.pricing_checked_at ? (
        <span className="text-[var(--color-ink-4)]">
          {" "}
          · geprüft am{" "}
          <time dateTime={item.pricing_checked_at}>{formatDate(item.pricing_checked_at)}</time>
        </span>
      ) : null}
    </span>
  );
}

/* ==========================================================================
   Compliance chips. Only confirmed rows appear, so a chip always means
   "we checked this and it is there".
   ========================================================================== */

export function ComplianceChips({ item, max = 5 }: { item: Software; max?: number }) {
  const confirmed = COMPLIANCE_CHIPS.filter((chip) => item.de_compliance[chip.key] === true).slice(0, max);

  if (confirmed.length === 0) {
    return (
      <p className="text-[12.5px] text-[var(--color-ink-4)]">
        Noch keine bestätigten Angaben zur deutschen Konformität.
      </p>
    );
  }

  return (
    <ul className="flex flex-wrap gap-1.5">
      {confirmed.map((chip) => (
        <li key={String(chip.key)}>
          <span className="inline-flex items-center gap-1 rounded-[8px] border border-[var(--color-rule)] bg-white px-2 py-[3px] text-[11.5px] font-medium text-[var(--color-ink-2)]">
            <IconCheck size={16} className="text-[var(--color-positive)]" />
            {chip.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ==========================================================================
   SoftwareCard.

   Not a link wrapper any more: the card carries two real actions, one to the
   profile and one out to the vendor, so both need to be reachable.
   ========================================================================== */

export function SoftwareCard({ item, rank }: { item: Software; rank?: number }) {
  const category = categoryById(item.category_id);

  return (
    <Card as="article" className="card-hover group flex h-full flex-col p-5 text-left shadow-[0_10px_30px_-24px_rgba(23,44,60,.35)]">
      <div className="flex items-start gap-4">
        <SoftwareLogo item={item} size={56} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-[var(--font-display)] text-[1.1rem] font-semibold leading-tight tracking-[-0.018em] text-[var(--color-ink)]">
              <Link
                href={`/unternehmenssoftware-vergleichen/${item.slug}`}
                className="transition-colors duration-200 hover:text-[var(--color-accent)]"
              >
                {item.name}
              </Link>
            </h3>
            {typeof rank === "number" ? (
              <span
                data-numeric
                aria-label={`Platz ${rank}`}
                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-[11px] font-semibold text-white"
              >
                {rank}
              </span>
            ) : null}
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <StarRating value={item.overall_rating} reviewCount={item.review_count} size={16} />
            <span className="text-[12px] text-[var(--color-ink-3)]">
              ({reviewCountLabel(item.review_count)})
            </span>
          </div>
        </div>
      </div>

      {category ? (
        <div className="mt-4">
          <Chip tone="neutral">{category.name}</Chip>
        </div>
      ) : null}

      <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
        {item.description_short}
      </p>

      {/* A running offer, from the vendor's own page and only while it runs. */}
      <PromotionBanner item={item} className="mt-3" />

      <div className="mt-4">
        <PriceBlock item={item} />
      </div>

      {/* Where a vendor offers a guided look instead of a trial, name it. */}
      {item.demo && !item.trial_days ? (
        <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-[var(--color-ink-3)]">
          <IconDemo size={16} className="shrink-0 text-[var(--color-ink-4)]" />
          {item.demo.label}
        </p>
      ) : null}

      {/* Two prominent actions, always visible, never on hover only. */}
      <div className="mt-auto flex flex-col gap-2 pt-5">
        <Link
          href={`/unternehmenssoftware-vergleichen/${item.slug}`}
          className="gloss gloss-dark inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-[7px] bg-[var(--color-accent)] px-3 py-2 text-center text-[14px] font-medium leading-tight text-white transition-colors duration-200 hover:bg-[var(--color-accent-hover)]"
        >
          Profil ansehen
          <IconArrowRight size={16} />
        </Link>

        <a
          href={vendorHref(item)}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="gloss gloss-light inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-[7px] bg-[var(--color-secondary)] px-3 py-2 text-center text-[14px] font-medium leading-tight text-[#07316f] transition-colors duration-200 hover:bg-[#bce7ff]"
        >
          {vendorCtaLabel(item)}
          <IconExternal size={16} />
        </a>
      </div>
    </Card>
  );
}

/* ==========================================================================
   SoftwareRow. The directory list form.
   ========================================================================== */

export function SoftwareRow({ item, rank }: { item: Software; rank?: number }) {
  const category = categoryById(item.category_id);

  return (
    <li className="border-b border-[var(--color-rule)] last:border-b-0">
      <div className="grid grid-cols-1 gap-5 py-7 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-7">
        <div className="flex items-center gap-4">
          {typeof rank === "number" ? (
            <span
              data-numeric
              aria-label={`Platz ${rank}`}
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-paper-2)] text-[12px] font-semibold text-[var(--color-ink-3)]"
            >
              {rank}
            </span>
          ) : null}
          <SoftwareLogo item={item} size={64} />
        </div>

        <div className="min-w-0">
          <h3 className="font-[var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            <Link
              href={`/unternehmenssoftware-vergleichen/${item.slug}`}
              className="transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              {item.name}
            </Link>
          </h3>
          <p className="mt-1 text-[13px] text-[var(--color-ink-3)]">
            {category?.name}
            {item.vendor_name ? <span> · {item.vendor_name}</span> : null}
          </p>
          <p className="mt-2.5 max-w-[46rem] text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
            {item.description_short}
          </p>
          <div className="mt-3.5">
            <ComplianceChips item={item} max={4} />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:w-60">
          <div className="flex items-center gap-2 md:justify-end">
            <StarRating value={item.overall_rating} reviewCount={item.review_count} />
            <span className="text-[12.5px] text-[var(--color-ink-3)]">
              ({reviewCountLabel(item.review_count)})
            </span>
          </div>

          <PriceBlock item={item} />

          <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
            <Link
              href={`/unternehmenssoftware-vergleichen/${item.slug}`}
              className="gloss gloss-dark inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-[var(--color-accent)] px-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[var(--color-accent-hover)]"
            >
              Profil ansehen
              <IconArrowRight size={16} />
            </Link>
            <a
              href={vendorHref(item)}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="gloss gloss-light inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-[7px] bg-[var(--color-secondary)] px-4 text-[14px] font-medium text-[#07316f] transition-colors duration-200 hover:bg-[#bce7ff]"
            >
              Zum Anbieter
              <IconExternal size={16} />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ==========================================================================
   The "recently checked" card carries its verification date, because that
   date is the whole point of the section.
   ========================================================================== */

export function CheckedCard({ item }: { item: Software }) {
  return (
    <LinkCard href={`/unternehmenssoftware-vergleichen/${item.slug}`} className="flex h-full flex-col p-5 text-left">
      <div className="flex items-center gap-3.5">
        <SoftwareLogo item={item} size={44} />
        <h3 className="font-[var(--font-display)] text-[1.05rem] font-semibold tracking-[-0.018em] text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
          {item.name}
        </h3>
      </div>

      <p className="mt-4 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">{item.tagline}</p>

      <div className="mt-auto pt-5">
        <p className="flex items-center gap-2 border-t border-[var(--color-rule)] pt-3 text-[12.5px] text-[var(--color-ink-3)]">
          <IconCalendar size={16} />
          Preis geprüft am{" "}
          {item.pricing_checked_at ? (
            <time data-numeric dateTime={item.pricing_checked_at} className="text-[var(--color-ink)]">
              {formatDate(item.pricing_checked_at)}
            </time>
          ) : (
            "unbekannt"
          )}
        </p>
      </div>
    </LinkCard>
  );
}

/* ==========================================================================
   TopRatedCard. The podium form used in the Top Rated section.
   ========================================================================== */

export function TopRatedCard({ item, rank }: { item: Software; rank: number }) {
  const category = categoryById(item.category_id);
  const isFirst = rank === 1;

  return (
    <Card
      as="article"
      className={cx(
        "card-hover relative flex h-full flex-col items-start rounded-[10px] p-6 text-left",
        isFirst ? "border-[var(--color-red)]" : "",
      )}
    >
      <span
        data-numeric
        aria-label={`Platz ${rank}`}
        className={cx(
          "inline-flex h-7 min-w-10 items-center justify-center rounded-[4px] px-3 text-[12px] font-semibold",
          isFirst
            ? "bg-[var(--color-red)] text-white"
            : "bg-[var(--color-paper-2)] text-[var(--color-ink)]",
        )}
      >
        {`Platz ${rank}`}
      </span>

      <div className="mt-7 flex h-16 items-center justify-start">
        <SoftwareLogo item={item} size={64} />
      </div>

      <h3 className="mt-4 font-[var(--font-display)] text-[1.15rem] font-semibold tracking-[-0.018em] text-[var(--color-ink)]">
        <Link
          href={`/unternehmenssoftware-vergleichen/${item.slug}`}
          className="transition-colors duration-200 hover:text-[var(--color-accent)]"
        >
          {item.name}
        </Link>
      </h3>

      {category ? (
        <p className="mt-1 text-[12.5px] text-[var(--color-ink-3)]">{category.name}</p>
      ) : null}

      <p
        data-numeric
        className="mt-4 font-[var(--font-display)] text-[2.6rem] font-semibold leading-none tracking-[-0.035em] text-[var(--color-ink)]"
      >
        {formatGrade(item.overall_rating, item.review_count)}
        <span className="text-[1rem] font-normal text-[var(--color-ink-4)]"> / 5</span>
      </p>

      <div className="mt-3">
        <StarRating value={item.overall_rating} reviewCount={item.review_count} showValue={false} size={18} />
      </div>

      <p className="mt-2 text-[12.5px] text-[var(--color-ink-3)]">
        {reviewCountLabel(item.review_count)}
      </p>

      <p className="mt-4 line-clamp-2 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
        {item.tagline}
      </p>

      <div className="mt-auto w-full pt-5">
        <Link
          href={`/unternehmenssoftware-vergleichen/${item.slug}`}
          className="gloss gloss-dark inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-[7px] bg-[var(--color-accent)] px-4 py-2 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[var(--color-accent-hover)]"
        >
          Zum Profil
          <IconArrowRight size={16} />
        </Link>
      </div>
    </Card>
  );
}
