import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, getArticleTags } from "@/lib/queries";
import { formatCount, formatDate, formatReadTime } from "@/lib/format";
import type { Article } from "@/lib/types";
import { Breadcrumb } from "@/components/ui/navigation";
import { EmptyState } from "@/components/ui/page";
import { ButtonLink, cx } from "@/components/ui/primitives";
import { IconArrowRight } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ratgeber",
  description: "Pflichten, Fristen und Auswahlkriterien: E-Rechnung, GoBD, DATEV, Arbeitszeiterfassung und was ein Softwarewechsel tatsächlich kostet.",
  alternates: { canonical: "/ratgeber-fuer-unternehmenssoftware" },
};

function ArticleMeta({ article }: { article: Article }) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[var(--color-ink-3)]">
      <time data-numeric dateTime={article.published_date}>{formatDate(article.published_date)}</time>
      <span aria-hidden="true">·</span>
      <span data-numeric>{formatReadTime(article.read_time_minutes)}</span>
    </span>
  );
}

function FeaturedStory({ article, lead = false, number }: { article: Article; lead?: boolean; number?: number }) {
  return (
    <Link href={`/ratgeber-fuer-unternehmenssoftware/${article.slug}`} className={cx(
      "group flex h-full flex-col rounded-[16px] border p-6 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)] md:p-8",
      lead ? "min-h-[410px] border-[#e4e2d2] bg-[#f8f7ed]" : "min-h-[195px] border-[var(--color-rule)] bg-white",
    )}>
      <div className="flex items-center justify-between gap-3">
        <span className="t-micro text-[var(--color-accent)]">{lead ? "Im Fokus · " : ""}{article.category_tag}</span>
        <span aria-hidden="true" className="text-[19px] text-[var(--color-accent)] transition-transform group-hover:translate-x-1">{number ? `0${number}` : "↗"}</span>
      </div>
      <div className={lead ? "my-auto py-9" : "my-auto py-5"}>
        <h3 className={cx(
          "font-[var(--font-display)] font-semibold leading-[1.18] tracking-[-0.03em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]",
          lead ? "max-w-[22ch] text-[clamp(1.8rem,3vw,2.6rem)]" : "max-w-[30ch] text-[clamp(1.25rem,2vw,1.6rem)]",
        )}>{article.title}</h3>
        <p className={cx("mt-3 text-[14px] leading-[1.6] text-[var(--color-ink-2)]", lead ? "max-w-[55ch]" : "line-clamp-2")}>{article.excerpt}</p>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[var(--color-rule)] pt-4">
        <ArticleMeta article={article} />
        <span className="shrink-0 text-[13px] font-semibold text-[var(--color-accent)]">{lead ? "Beitrag lesen" : "↗"}</span>
      </div>
    </Link>
  );
}

function GuideCard({ article }: { article: Article }) {
  return (
    <Link href={`/ratgeber-fuer-unternehmenssoftware/${article.slug}`} className="group flex h-full min-h-[285px] flex-col rounded-[14px] border border-[var(--color-rule)] bg-white p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-lift)]">
      <span className="t-micro text-[var(--color-accent)]">{article.category_tag}</span>
      <h3 className="mt-5 font-[var(--font-display)] text-[1.3rem] font-semibold leading-[1.25] tracking-[-0.025em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">{article.title}</h3>
      <p className="mt-3 line-clamp-3 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">{article.excerpt}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-rule)] pt-4">
        <ArticleMeta article={article} />
        <span aria-hidden="true" className="shrink-0 text-[19px] text-[var(--color-accent)] transition-transform group-hover:translate-x-1">↗</span>
      </div>
    </Link>
  );
}

export default async function GuidesPage({ searchParams }: { searchParams: Promise<{ thema?: string }> }) {
  const query = await searchParams;
  const [all, tags] = await Promise.all([getArticles(), getArticleTags()]);
  const activeTag = tags.includes(query.thema ?? "") ? query.thema : undefined;
  const rows = activeTag ? all.filter((article) => article.category_tag === activeTag) : all;
  const featured = activeTag ? [] : rows.filter((article) => article.featured).slice(0, 3);
  const leadArticle = featured[0];
  const rest = activeTag ? rows : rows.filter((article) => !featured.some((item) => item.id === article.id));

  return (
    <>
      <header className="border-b border-[var(--color-rule)] bg-[#fbfaf6]">
        <div className="container-page pb-14 pt-6 md:pb-20">
          <Breadcrumb items={[{ label: "Ratgeber", href: "/ratgeber-fuer-unternehmenssoftware" }]} />
          <div className="mt-12 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-end lg:gap-14">
            <div>
              <p className="t-micro text-[var(--color-accent)]">Wissen & Orientierung</p>
              <h1 className="t-display-1 mt-5 max-w-[16ch]">Wissen, das Entscheidungen leichter macht.</h1>
            </div>
            <div className="border-l-2 border-[var(--color-red)] pl-5">
              <p className="text-[16px] leading-[1.7] text-[var(--color-ink-2)]">Klare Antworten zu Software, Pflichten und Wechsel. Mit konkreten Kriterien für Ihren Betrieb.</p>
              <p data-numeric className="mt-5 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink-3)]">{formatCount(all.length)} Beiträge · {formatCount(tags.length)} Themen</p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-[var(--color-rule)] bg-white py-5" aria-label="Themenfilter">
        <div className="container-page">
          <nav aria-label="Themen">
            <ul className="flex flex-wrap items-center gap-2">
              <li><Link href="/ratgeber-fuer-unternehmenssoftware" aria-current={!activeTag ? "page" : undefined} className={cx("inline-flex min-h-10 items-center rounded-full border px-4 text-[13px] font-medium transition-colors", !activeTag ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]")}>Alle Themen</Link></li>
              {tags.map((tag) => (
                <li key={tag}><Link href={`/ratgeber-fuer-unternehmenssoftware?thema=${encodeURIComponent(tag)}`} aria-current={activeTag === tag ? "page" : undefined} className={cx("inline-flex min-h-10 items-center rounded-full border px-4 text-[13px] font-medium transition-colors", activeTag === tag ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]")}>{tag}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {leadArticle ? (
        <section className="bg-white py-14 md:py-20" aria-labelledby="fokus-heading">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div><p className="t-micro text-[var(--color-red)]">Aus der Redaktion</p><h2 id="fokus-heading" className="t-display-2 mt-3">Im Fokus</h2></div>
              <p className="max-w-[34ch] text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Die wichtigsten Fragen für Auswahl und Alltag.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-5">
              <FeaturedStory article={leadArticle} lead />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
                {featured.slice(1).map((article, index) => <FeaturedStory key={article.id} article={article} number={index + 2} />)}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[var(--color-rule)] bg-[#fbfaf6] py-14 md:py-20" aria-labelledby="beitraege-heading">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="t-micro text-[var(--color-red)]">{activeTag ? "Gewähltes Thema" : "Alle Themen"}</p><h2 id="beitraege-heading" className="t-display-2 mt-3">{activeTag ?? "Weitere Beiträge"}</h2></div>
            <p data-numeric className="text-[13px] text-[var(--color-ink-3)]">{formatCount(rest.length)} {rest.length === 1 ? "Beitrag" : "Beiträge"}</p>
          </div>
          {rest.length === 0 ? (
            <EmptyState title="Zu diesem Thema liegt noch nichts vor" action={<ButtonLink href="/ratgeber-fuer-unternehmenssoftware" variant="secondary">Alle Beiträge ansehen</ButtonLink>}>Wir schreiben zu einem Thema erst, wenn wir es selbst durchgearbeitet haben.</EmptyState>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{rest.map((article) => <li key={article.id}><GuideCard article={article} /></li>)}</ul>
          )}
        </div>
      </section>

      <section className="border-t border-[var(--color-rule)] bg-white py-12 md:py-16">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div><p className="t-micro text-[var(--color-red)]">Nächster Schritt</p><h2 className="mt-3 font-[var(--font-display)] text-[clamp(1.45rem,2.5vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--color-ink)]">Das Wissen direkt anwenden.</h2><p className="mt-2 text-[14px] text-[var(--color-ink-2)]">Vergleichen Sie Programme anhand von Preisen, Funktionen und Nutzerbewertungen.</p></div>
          <ButtonLink href="/unternehmenssoftware-vergleichen" variant="secondary" size="lg">Software entdecken <IconArrowRight size={18} /></ButtonLink>
        </div>
      </section>
    </>
  );
}
