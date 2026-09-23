import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getSoftwareList, type SortKey } from "@/lib/queries";
import { formatCount } from "@/lib/format";
import { PageHeader, EmptyState } from "@/components/ui/page";
import { SoftwareCard } from "@/components/ui/software";
import { Pagination } from "@/components/ui/navigation";
import { ButtonLink, cx } from "@/components/ui/primitives";
import { IconFilter } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Alle geprüften Programme",
  description:
    "Der vollständige Bestand: Buchhaltung, Lohn, HR, CRM, ERP und Warenwirtschaft, filterbar nach GoBD, ELSTER, DATEV, E-Rechnung und Hosting in Deutschland.",
  alternates: { canonical: "/software" },
};

const PER_PAGE = 9;

const SORTS: { key: SortKey; param: string; label: string }[] = [
  { key: "rating", param: "note", label: "Note" },
  { key: "reviews", param: "bewertungen", label: "Anzahl Bewertungen" },
  { key: "price-asc", param: "preis-aufsteigend", label: "Preis aufsteigend" },
  { key: "price-desc", param: "preis-absteigend", label: "Preis absteigend" },
  { key: "name", param: "name", label: "Name" },
];

const REQUIREMENTS = [
  { param: "gobd", label: "GoBD bestätigt" },
  { param: "elster", label: "ELSTER-Übermittlung" },
  { param: "datev", label: "DATEV-Anbindung" },
  { param: "erechnung", label: "E-Rechnung versenden" },
  { param: "hosting-de", label: "Hosting in Deutschland" },
] as const;

type Requirement = (typeof REQUIREMENTS)[number]["param"];

interface SearchParams {
  kategorie?: string;
  sortierung?: string;
  anforderung?: string | string[];
  test?: string;
  kostenlos?: string;
  seite?: string;
}

export default async function SoftwareIndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const sort = SORTS.find((s) => s.param === params.sortierung)?.key ?? "rating";
  const requires = (
    Array.isArray(params.anforderung)
      ? params.anforderung
      : params.anforderung
        ? [params.anforderung]
        : []
  ).filter((r): r is Requirement => REQUIREMENTS.some((req) => req.param === r));

  const freeTrial = params.test === "ja";
  const freeVersion = params.kostenlos === "ja";

  const [categories, rows] = await Promise.all([
    getCategories(),
    getSoftwareList({
      category: params.kategorie,
      sort,
      requires,
      freeTrial,
      freeVersion,
    }),
  ]);

  const page = Math.max(1, Number(params.seite) || 1);
  const totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const visible = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /** Builds a URL with one facet toggled, keeping everything else intact. */
  function facetHref(changes: Record<string, string | string[] | undefined>) {
    const next = new URLSearchParams();
    const merged: Record<string, string | string[] | undefined> = { ...params, ...changes };
    delete merged.seite;
    for (const [key, value] of Object.entries(merged)) {
      if (!value) continue;
      if (Array.isArray(value)) value.forEach((v) => next.append(key, v));
      else next.set(key, value);
    }
    const qs = next.toString();
    return qs ? `/software?${qs}` : "/software";
  }

  function toggleRequirement(req: Requirement) {
    const active = requires.includes(req);
    const next = active ? requires.filter((r) => r !== req) : [...requires, req];
    return facetHref({ anforderung: next.length > 0 ? next : undefined });
  }

  const activeCategory = categories.find((c) => c.slug === params.kategorie);
  const filterCount = requires.length + (freeTrial ? 1 : 0) + (freeVersion ? 1 : 0) + (activeCategory ? 1 : 0);

  return (
    <>
      <PageHeader
        wide
        crumbs={[{ label: "Software", href: "/software" }]}
        micro="Softwareverzeichnis"
        title="Die passende Software finden."
        lede={
          <>
            Jeder Eintrag nennt den geprüften Einstiegspreis mit Datum und die deutschen Pflichten,
            die wir bestätigen konnten. Ein Feld ohne Häkchen bedeutet nicht „kann das Programm
            nicht“, sondern „haben wir nicht geprüft“.
          </>
        }
      />

      <section className="py-8 md:py-11">
        <div className="container-wide">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10">
            {/* ------------------------------------------------- filters */}
            <aside aria-labelledby="filter-heading" className="lg:sticky lg:top-[89px] lg:self-start">
              <div className="flex items-center justify-between gap-3 pb-3">
                <h2
                  id="filter-heading"
                  className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-3)]"
                >
                  <IconFilter size={16} />
                  Filter
                </h2>
                {filterCount > 0 ? (
                  <Link href="/software" className="text-[13px] text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                    Zurücksetzen
                  </Link>
                ) : null}
              </div>

              <FilterGroup title="Kategorie">
                <FilterLink href={facetHref({ kategorie: undefined })} active={!activeCategory}>
                  Alle Kategorien
                </FilterLink>
                {categories.map((category) => (
                  <FilterLink
                    key={category.id}
                    href={facetHref({ kategorie: category.slug })}
                    active={activeCategory?.slug === category.slug}
                    count={category.software_count}
                  >
                    {category.name}
                  </FilterLink>
                ))}
              </FilterGroup>

              <FilterGroup title="Bestätigte Anforderungen">
                {REQUIREMENTS.map((req) => (
                  <FilterLink
                    key={req.param}
                    href={toggleRequirement(req.param)}
                    active={requires.includes(req.param)}
                  >
                    {req.label}
                  </FilterLink>
                ))}
              </FilterGroup>

              <FilterGroup title="Konditionen">
                <FilterLink href={facetHref({ test: freeTrial ? undefined : "ja" })} active={freeTrial}>
                  Testphase verfügbar
                </FilterLink>
                <FilterLink
                  href={facetHref({ kostenlos: freeVersion ? undefined : "ja" })}
                  active={freeVersion}
                >
                  Dauerhaft kostenloser Tarif
                </FilterLink>
              </FilterGroup>
            </aside>

            {/* --------------------------------------------------- results */}
            <div className="min-w-0">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-[#dce6f1] bg-[#f8faff] px-4 py-3.5">
                <p data-numeric className="text-[14px] text-[var(--color-ink-2)]">
                  {formatCount(rows.length)}{" "}
                  {rows.length === 1 ? "Programm gefunden" : "Programme gefunden"}
                  {activeCategory ? (
                    <span className="text-[var(--color-ink-3)]"> in {activeCategory.name}</span>
                  ) : null}
                </p>

                <nav aria-label="Sortierung" className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">Sortieren nach</span>
                  {SORTS.map((option) => {
                    const active = option.key === sort;
                    return (
                      <Link
                        key={option.param}
                        href={facetHref({ sortierung: option.param })}
                        aria-current={active ? "true" : undefined}
                        className={cx(
                          "inline-flex min-h-9 items-center rounded-[6px] border px-3 text-[12px] font-medium transition-colors duration-200",
                          active
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_5px_15px_-10px_rgba(6,70,200,.8)]"
                            : "border-[#dce6f1] bg-white text-[var(--color-ink-2)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
                        )}
                      >
                        {option.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {visible.length === 0 ? (
                <div className="pt-8">
                  <EmptyState
                    title="Kein Programm erfüllt diese Kombination"
                    action={
                      <ButtonLink href="/software" variant="secondary">
                        Filter zurücksetzen
                      </ButtonLink>
                    }
                  >
                    Wir zeigen hier nur Programme, bei denen wir die gewählte Anforderung
                    ausdrücklich bestätigt haben. Ein Programm, das die Anforderung erfüllt, das wir
                    aber noch nicht geprüft haben, fehlt deshalb in dieser Liste.
                  </EmptyState>
                </div>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((item, index) => (
                    <li key={item.id}>
                    <SoftwareCard
                      item={item}
                      rank={(page - 1) * PER_PAGE + index + 1}
                    />
                    </li>
                  ))}
                </ul>
              )}

              <Pagination
                page={page}
                totalPages={totalPages}
                basePath="/software"
                query={{
                  kategorie: params.kategorie,
                  sortierung: params.sortierung,
                  test: params.test,
                  kostenlos: params.kostenlos,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4">
      <h3 className="text-[13px] font-medium text-[var(--color-ink)]">{title}</h3>
      <ul className="mt-2.5 flex flex-col">{children}</ul>
    </div>
  );
}

function FilterLink({
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
          "flex min-h-[38px] items-center justify-between gap-3 rounded-[6px] px-2 py-1 text-[12.5px] transition-colors duration-200",
          active
            ? "bg-[var(--color-accent-tint)] font-semibold text-[var(--color-primary)]"
            : "text-[var(--color-ink-2)] hover:bg-[#f7faff] hover:text-[var(--color-primary)]",
        )}
      >
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cx(
              "inline-block size-[14px] shrink-0 rounded-[4px] border",
              active
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                : "border-[#ced7e3] bg-white",
            )}
          />
          {children}
        </span>
        {typeof count === "number" ? (
          <span data-numeric className="text-[12.5px] text-[var(--color-ink-4)]">
            {formatCount(count)}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
