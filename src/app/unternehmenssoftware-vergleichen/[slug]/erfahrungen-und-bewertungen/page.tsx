import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSoftware,
  getSoftwareSlugs,
  getReviews,
  getRatingDistribution,
  SHOW_SEED_REVIEWS,
  type ReviewFilter,
} from "@/lib/queries";
import { categoryById } from "@/data/categories";
import { formatReviewCount, reviewCountLabel } from "@/lib/format";
import { PageHeader, EmptyState } from "@/components/ui/page";
import { ButtonLink, cx } from "@/components/ui/primitives";
import { RatingDashboard } from "@/components/site/rating-dashboard";
import { ReviewFull, SeedDataNotice } from "@/components/ui/review";
import { Pagination } from "@/components/ui/navigation";
import { SoftwareLogo } from "@/components/ui/software";
import { CountryFlags } from "@/components/site/country-flags";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getSoftwareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getSoftware(slug);
  if (!item) return { title: "Nicht gefunden" };

  return {
    title: `${item.name}: alle Bewertungen`,
    description: `Alle geprüften Bewertungen zu ${item.name}, mit Rolle, Betriebsgröße und Nutzungsdauer der schreibenden Person.`,
    alternates: { canonical: `/unternehmenssoftware-vergleichen/${item.slug}/erfahrungen-und-bewertungen` },
  };
}

const PER_PAGE = 8;

const COMPANY_SIZES = [
  "1 Person",
  "2 bis 9 Mitarbeitende",
  "10 bis 49 Mitarbeitende",
  "50 bis 249 Mitarbeitende",
  "250 und mehr Mitarbeitende",
];

const SORTS: { param: string; label: string; value: NonNullable<ReviewFilter["sort"]> }[] = [
  { param: "aktuell", label: "Neueste zuerst", value: "recent" },
  { param: "hilfreich", label: "Hilfreichste zuerst", value: "helpful" },
  { param: "note-hoch", label: "Beste Note zuerst", value: "rating-desc" },
  { param: "note-niedrig", label: "Schlechteste Note zuerst", value: "rating-asc" },
];

export default async function ReviewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sterne?: string; groesse?: string; sortierung?: string; seite?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const item = await getSoftware(slug);
  if (!item) notFound();

  const stars = Number(query.sterne) || undefined;
  const size = COMPANY_SIZES.includes(query.groesse ?? "") ? query.groesse : undefined;
  const sort = SORTS.find((s) => s.param === query.sortierung)?.value ?? "recent";

  const [all, filtered, distribution] = await Promise.all([
    getReviews(slug),
    getReviews(slug, { rating: stars, companySize: size, sort }),
    getRatingDistribution(slug),
  ]);

  const page = Math.max(1, Number(query.seite) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const category = categoryById(item.category_id);

  function href(changes: Record<string, string | undefined>) {
    const next = new URLSearchParams();
    const merged = { ...query, ...changes };
    delete merged.seite;
    for (const [key, value] of Object.entries(merged)) if (value) next.set(key, value);
    const qs = next.toString();
    return qs ? `/unternehmenssoftware-vergleichen/${slug}/erfahrungen-und-bewertungen?${qs}` : `/unternehmenssoftware-vergleichen/${slug}/erfahrungen-und-bewertungen`;
  }

  return (
    <>
      <PageHeader
        wide
        crumbs={[
          { label: "Software", href: "/unternehmenssoftware-vergleichen" },
          ...(category ? [{ label: category.name, href: `/software-kategorien/${category.slug}` }] : []),
          { label: item.name, href: `/unternehmenssoftware-vergleichen/${item.slug}` },
          { label: "Bewertungen", href: `/unternehmenssoftware-vergleichen/${item.slug}/erfahrungen-und-bewertungen` },
        ]}
        micro="Bewertungen"
        title={`${item.name}: alle Bewertungen`}
        meta={<CountryFlags countries={item.countries_available} />}
        lede={
          <>
            Jede Bewertung nennt Rolle, Betriebsgröße, Branche und Nutzungsdauer. Vor der
            Veröffentlichung liest eine Person jede Einreichung. Wie wir dabei vorgehen, steht in
            den{" "}
            <Link href="/redaktionelle-richtlinien-und-pruefprozess" className="link-red">
              Redaktionsrichtlinien
            </Link>
            .
          </>
        }
      />

      <section className="py-12 md:py-16">
        <div className="container-wide">
          {SHOW_SEED_REVIEWS && all.length > 0 ? <SeedDataNotice className="mb-10" /> : null}

          <div className="mx-auto max-w-[70rem] text-center"><span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">Bewertungsbild</span><h2 className="t-display-2 mt-4">Die Noten im Einzelnen</h2><p className="mx-auto mt-4 max-w-[54ch] text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Sterne, Kriterien und Betriebsgrößen aus veröffentlichten Bewertungen.</p><RatingDashboard item={item} reviews={all} distribution={distribution} /></div>

          <div className={cx("mt-14 grid gap-10", all.length > 0 ? "lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12" : "mx-auto max-w-[60rem]")}>
            <aside aria-labelledby="bewertungsfilter" className={all.length === 0 ? "hidden" : ""}>
              <h2
                id="bewertungsfilter"
                className="border-b border-[var(--color-rule)] pb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-3)]"
              >
                Filter
              </h2>

              <div className="border-b border-[var(--color-rule)] py-5">
                <h3 className="text-[13px] font-medium text-[var(--color-ink)]">Sterne</h3>
                <ul className="mt-2.5">
                  <FacetLink href={href({ sterne: undefined })} active={!stars}>
                    Alle Bewertungen
                  </FacetLink>
                  {[5, 4, 3, 2, 1].map((value) => {
                    const row = distribution.find((d) => d.stars === value);
                    return (
                      <FacetLink
                        key={value}
                        href={href({ sterne: stars === value ? undefined : String(value) })}
                        active={stars === value}
                        count={row?.count ?? 0}
                      >
                        {value} Sterne
                      </FacetLink>
                    );
                  })}
                </ul>
              </div>

              <div className="border-b border-[var(--color-rule)] py-5">
                <h3 className="text-[13px] font-medium text-[var(--color-ink)]">Betriebsgröße</h3>
                <ul className="mt-2.5">
                  <FacetLink href={href({ groesse: undefined })} active={!size}>
                    Alle Größen
                  </FacetLink>
                  {COMPANY_SIZES.map((value) => (
                    <FacetLink
                      key={value}
                      href={href({ groesse: size === value ? undefined : value })}
                      active={size === value}
                      count={all.filter((r) => r.reviewer_company_size === value).length}
                    >
                      {value}
                    </FacetLink>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="min-w-0">
              {all.length > 0 ? <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-[#dce6f1] bg-[#f8faff] px-4 py-3.5">
                <p data-numeric className="text-[14px] text-[var(--color-ink-2)]">
                  {formatReviewCount(filtered.length)}{" "}
                  {filtered.length === 1 ? "Bewertung" : "Bewertungen"}
                  {filtered.length !== all.length ? (
                    <span className="text-[var(--color-ink-3)]">
                      {" "}
                      von {reviewCountLabel(all.length)}
                    </span>
                  ) : null}
                </p>

                <nav aria-label="Sortierung" className="flex flex-wrap items-center gap-1.5">
                  {SORTS.map((option) => {
                    const active = option.value === sort;
                    return (
                      <Link
                        key={option.param}
                        href={href({ sortierung: option.param })}
                        aria-current={active ? "true" : undefined}
                        className={cx(
                          "inline-flex min-h-9 items-center rounded-[6px] border px-3 text-[12px] font-medium transition-colors duration-200",
                          active
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                            : "border-[#dce6f1] bg-white text-[var(--color-ink-2)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
                        )}
                      >
                        {option.label}
                      </Link>
                    );
                  })}
                </nav>
              </div> : null}

              {visible.length === 0 ? (
                <div>
                  {all.length === 0 ? <div className="rounded-[18px] border border-[#dce6f1] bg-[#f8faff] p-7 md:p-10">
                    <div className="flex items-center gap-4"><SoftwareLogo item={item} size={56} /><div><p className="t-micro text-[var(--color-primary)]">Ihre Perspektive zählt</p><h2 className="mt-1 font-[var(--font-display)] text-[25px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">Die erste Erfahrung zu {item.name} teilen.</h2></div></div>
                    <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">Für dieses Programm liegt noch keine veröffentlichte Bewertung vor. Eine konkrete Beschreibung Ihrer täglichen Arbeit hilft anderen Betrieben bei der Auswahl. Nach Prüfung erscheint Ihre Bewertung hier.</p>
                    <div className="mt-6"><ButtonLink href={`/unternehmenssoftware-vergleichen/${item.slug}/erfahrungen-und-bewertungen/bewertung-verfassen`} variant="primary">Bewertung schreiben ↗</ButtonLink></div>
                    <p className="mt-5 text-[12px] text-[var(--color-ink-3)]">Es gibt noch keine Nutzerwertung. Wir zeigen keine erfundene Note an.</p>
                  </div> : <EmptyState
                    title={
                      all.length === 0
                        ? "Noch keine veröffentlichte Bewertung"
                        : "Keine Bewertung passt zu dieser Auswahl"
                    }
                    action={
                      <ButtonLink
                        href={`/unternehmenssoftware-vergleichen/${item.slug}/erfahrungen-und-bewertungen/bewertung-verfassen`}
                        variant="secondary"
                      >
                        Bewertung schreiben
                      </ButtonLink>
                    }
                  >
                    {all.length === 0
                      ? `Für ${item.name} liegt bisher keine geprüfte Bewertung vor. Deshalb trägt das Programm auch keine Note.`
                      : "Setzen Sie einen Filter zurück, um mehr Bewertungen zu sehen."}
                  </EmptyState>}
                </div>
              ) : (
                <div>
                  {visible.map((review) => (
                    <ReviewFull key={review.id} review={review} />
                  ))}
                </div>
              )}

              <Pagination
                page={page}
                totalPages={totalPages}
                basePath={`/unternehmenssoftware-vergleichen/${slug}/erfahrungen-und-bewertungen`}
                query={{
                  sterne: query.sterne,
                  groesse: query.groesse,
                  sortierung: query.sortierung,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FacetLink({
  href,
  active,
  count,
  children,
}: {
  href: string;
  active: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "true" : undefined}
        className={cx(
          "flex min-h-[44px] items-center justify-between gap-3 text-[13.5px] transition-colors duration-200",
          active
            ? "font-medium text-[var(--color-ink)]"
            : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]",
        )}
      >
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cx(
              "inline-block size-[14px] shrink-0 rounded-[4px] border",
              active
                ? "border-[var(--color-ink)] bg-[var(--color-ink)]"
                : "border-[var(--color-rule)] bg-white",
            )}
          />
          {children}
        </span>
        {typeof count === "number" ? (
          <span data-numeric className="text-[12.5px] text-[var(--color-ink-4)]">
            {count}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
