import type { Metadata } from "next";
import Link from "next/link";
import { search } from "@/lib/queries";
import { formatCount } from "@/lib/format";
import { PageHeader, EmptyState } from "@/components/ui/page";
import { Button, ButtonLink, cx } from "@/components/ui/primitives";
import { IconSearch } from "@/components/icons";
import type { SearchHit } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Suche",
  description: "Software, Ratgeber, Kategorien und Fachbegriffe auf dieser Seite durchsuchen.",
  alternates: { canonical: "/software-und-wissen-durchsuchen" },
  robots: { index: false, follow: true },
};

const KIND_LABEL: Record<SearchHit["kind"], string> = {
  software: "Software",
  article: "Ratgeber",
  category: "Kategorie",
  glossar: "Glossar",
};

const KIND_ORDER: SearchHit["kind"][] = ["software", "category", "article", "glossar"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; art?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const kind = KIND_ORDER.find((k) => k === params.art);

  const hits = query.length >= 2 ? await search(query, 60) : [];
  const filtered = kind ? hits.filter((h) => h.kind === kind) : hits;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Suche", href: "/software-und-wissen-durchsuchen" }]}
        micro="Suche"
        title={query ? `Treffer zu „${query}“` : "Suche"}
        lede={
          query
            ? undefined
            : "Durchsuchen Sie Softwareprofile, Ratgeberbeiträge, Kategorien und das Glossar."
        }
        meta={
          <form action="/software-und-wissen-durchsuchen" method="get" role="search" className="flex max-w-[36rem] gap-2.5">
            <div className="relative flex-1">
              <label htmlFor="page-q" className="sr-only">
                Suchbegriff
              </label>
              <IconSearch
                size={20}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-3)]"
              />
              <input
                id="page-q"
                name="q"
                type="search"
                defaultValue={query}
                autoComplete="off"
                placeholder="Software, Ratgeber oder Fachbegriff"
                className="h-11 w-full rounded-[6px] border border-[var(--color-rule)] bg-white pl-11 pr-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors duration-200 placeholder:text-[var(--color-ink-4)] hover:border-[var(--color-ink-4)] focus:border-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-red)]"
              />
            </div>
            <Button type="submit" variant="primary">
              Suchen
            </Button>
          </form>
        }
      />

      <section className="section">
        <div className="container-page">
          {query.length < 2 ? (
            <EmptyState title="Bitte geben Sie mindestens zwei Zeichen ein">
              Die Suche berücksichtigt Produktnamen, Anbieter, Beitragstitel und Fachbegriffe.
              Umlaute und Schreibvarianten werden dabei zusammengeführt, sodass etwa
              „Buchhaltung“ auch „Buchhaltungssoftware“ findet.
            </EmptyState>
          ) : hits.length === 0 ? (
            <EmptyState
              title={`Nichts gefunden zu „${query}“`}
              action={
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/unternehmenssoftware-vergleichen" variant="secondary">
                    Alle Programme ansehen
                  </ButtonLink>
                  <ButtonLink href="/software-kategorien" variant="quiet">
                    Nach Kategorie suchen
                  </ButtonLink>
                </div>
              }
            >
              Prüfen Sie die Schreibweise, oder versuchen Sie einen allgemeineren Begriff. Wenn Sie
              ein Programm suchen, das wir noch nicht führen,{" "}
              <Link href="/softwareprodukt-zur-pruefung-einreichen" className="link-red">
                schlagen Sie es uns vor
              </Link>
              .
            </EmptyState>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-rule)] pb-4">
                <p data-numeric className="text-[14px] text-[var(--color-ink-2)]">
                  {formatCount(filtered.length)} {filtered.length === 1 ? "Treffer" : "Treffer"}
                </p>

                <nav aria-label="Trefferart" className="flex flex-wrap items-center gap-1">
                  <Link
                    href={`/software-und-wissen-durchsuchen?q=${encodeURIComponent(query)}`}
                    aria-current={!kind ? "true" : undefined}
                    className={cx(
                      "inline-flex h-9 items-center rounded-[4px] px-2.5 text-[13px] transition-colors duration-200",
                      !kind
                        ? "bg-[var(--color-ink)] text-white"
                        : "text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]",
                    )}
                  >
                    Alle
                  </Link>
                  {KIND_ORDER.filter((k) => hits.some((h) => h.kind === k)).map((k) => (
                    <Link
                      key={k}
                      href={`/software-und-wissen-durchsuchen?q=${encodeURIComponent(query)}&art=${k}`}
                      aria-current={kind === k ? "true" : undefined}
                      className={cx(
                        "inline-flex h-9 items-center gap-1.5 rounded-[4px] px-2.5 text-[13px] transition-colors duration-200",
                        kind === k
                          ? "bg-[var(--color-ink)] text-white"
                          : "text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]",
                      )}
                    >
                      {KIND_LABEL[k]}
                      <span data-numeric className="opacity-70">
                        {hits.filter((h) => h.kind === k).length}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              <ul className="border-t border-[var(--color-rule)]">
                {filtered.map((hit) => (
                  <li key={`${hit.kind}-${hit.id}`} className="border-b border-[var(--color-rule)]">
                    <Link href={hit.href} className="group block py-6">
                      <p className="t-micro text-[var(--color-ink-4)]">{KIND_LABEL[hit.kind]}</p>
                      <h2 className="mt-2 max-w-[44rem] font-[var(--font-display)] text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.02em] text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-red)]">
                        {hit.title}
                      </h2>
                      <p className="mt-2 max-w-[48rem] text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
                        {hit.snippet}
                      </p>
                      <p className="mt-2 text-[12.5px] text-[var(--color-ink-4)]">
                        {hit.href}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
