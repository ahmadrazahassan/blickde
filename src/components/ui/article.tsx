import Link from "next/link";
import { formatDate, formatReadTime, quote } from "@/lib/format";
import type { Article, ArticleBlock, Software } from "@/lib/types";
import { IconCalendar, IconChevronRight } from "@/components/icons";
import { Badge, Card, LinkCard, cx } from "./primitives";
import { SoftwareLogo, PriceLine } from "./software";
import { StarRating } from "./rating";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <LinkCard href={`/ratgeber-fuer-unternehmenssoftware/${article.slug}`} className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col p-5">
        <Badge tone="neutral" className="self-start">
          {article.category_tag}
        </Badge>

        <h3 className="mt-3.5 font-[var(--font-display)] text-[1.1rem] font-semibold leading-[1.3] tracking-[-0.018em] text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-red)]">
          {article.title}
        </h3>

        <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">{article.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-[12.5px] text-[var(--color-ink-3)]">
          <time data-numeric dateTime={article.published_date}>
            {formatDate(article.published_date)}
          </time>
          <span aria-hidden="true">·</span>
          <span data-numeric>{formatReadTime(article.read_time_minutes)}</span>
        </div>
      </div>
    </LinkCard>
  );
}

export function ArticleRow({ article }: { article: Article }) {
  return (
    <li className="border-b border-[var(--color-rule)]">
      <Link href={`/ratgeber-fuer-unternehmenssoftware/${article.slug}`} className="group block py-7">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="neutral">{article.category_tag}</Badge>
          <span className="text-[12.5px] text-[var(--color-ink-3)]">
            <time data-numeric dateTime={article.published_date}>
              {formatDate(article.published_date)}
            </time>{" "}
            · <span data-numeric>{formatReadTime(article.read_time_minutes)}</span>
          </span>
        </div>

        <h3 className="mt-3 max-w-[44rem] font-[var(--font-display)] text-[1.45rem] font-semibold leading-[1.22] tracking-[-0.022em] text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-red)]">
          {article.title}
        </h3>

        <p className="mt-2.5 max-w-[46rem] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
          {article.excerpt}
        </p>

        <p className="mt-3.5 text-[13px] text-[var(--color-ink-3)]">
          {article.author_name}, {article.author_title}
        </p>
      </Link>
    </li>
  );
}

export function AuthorBlock({ article }: { article: Article }) {
  return (
    <Card className="p-5">
      <p className="t-micro text-[var(--color-ink-3)]">Verfasst von</p>
      <div className="mt-3 flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] font-[var(--font-display)] text-[16px] font-semibold text-[var(--color-ink-3)]"
        >
          {article.author_name.charAt(0)}
        </span>
        <div>
          <p className="text-[15px] font-medium text-[var(--color-ink)]">{article.author_name}</p>
          <p className="text-[13px] text-[var(--color-ink-3)]">{article.author_title}</p>
          <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
            {article.author_bio}
          </p>
        </div>
      </div>
    </Card>
  );
}

/** Table of contents, shown for anything long enough to need one. */
export function TableOfContents({ blocks }: { blocks: ArticleBlock[] }) {
  const headings = blocks.filter(
    (b): b is Extract<ArticleBlock, { type: "heading" }> => b.type === "heading" && b.level === 2,
  );

  if (headings.length < 3) return null;

  return (
    <nav
      aria-labelledby="inhalt-heading"
      className="rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 md:p-7"
    >
      <h2
        id="inhalt-heading"
        className="t-micro border-b border-[var(--color-rule)] pb-3.5 text-center text-[var(--color-ink-3)]"
      >
        Inhalt
      </h2>

      {/* Zwei Spalten, sobald es Platz gibt. Ein langes Verzeichnis soll den
          Einstieg in den Text nicht nach unten schieben. */}
      <ol className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {headings.map((h, index) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="group flex items-baseline gap-2.5 text-[14.5px] leading-[1.45] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              <span
                data-numeric
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-medium text-[var(--color-ink-3)] ring-1 ring-[var(--color-rule)] transition-colors duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:ring-[var(--color-accent)]"
              >
                {index + 1}
              </span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * ArticleBody. Structured blocks, rendered as elements. No HTML string is
 * ever injected, so there is no sanitising surface at all.
 */
export function ArticleBody({
  blocks,
  softwareIndex,
}: {
  blocks: ArticleBlock[];
  softwareIndex: Record<string, Software>;
}) {
  return (
    <div className="prose-editorial">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2 key={index} id={block.id}>
                {block.text}
              </h2>
            ) : (
              <h3 key={index} id={block.id}>
                {block.text}
              </h3>
            );

          case "paragraph":
            return <p key={index}>{block.text}</p>;

          case "list":
            return block.ordered ? (
              <ol key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <figure key={index} className="my-8">
                <blockquote>{quote(block.text)}</blockquote>
                <figcaption className="mt-3 pl-[22px] text-[13.5px] text-[var(--color-ink-3)]">
                  {block.source}
                </figcaption>
              </figure>
            );

          case "note":
            return (
              <aside
                key={index}
                className="my-8 rounded-[8px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5"
              >
                <p className="t-micro text-[var(--color-ink-3)]">{block.title}</p>
                <p className="mt-2.5 text-[15px] leading-[1.62] text-[var(--color-ink-2)]">
                  {block.text}
                </p>
              </aside>
            );

          case "table":
            return (
              <div key={index} className="scroll-x my-8 border-t border-[var(--color-rule)]">
                <table>
                  <caption className="py-3 text-left text-[13px] text-[var(--color-ink-3)]">
                    {block.caption}
                  </caption>
                  <thead>
                    <tr>
                      {block.head.map((cell, i) => (
                        <th key={i} scope="col">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) =>
                          j === 0 ? (
                            <th key={j} scope="row" className="font-medium">
                              {cell}
                            </th>
                          ) : (
                            <td key={j}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "software": {
            const item = softwareIndex[block.slug];
            if (!item) return null;
            return <InArticleSoftware key={index} item={item} reason={block.reason} />;
          }
        }
      })}
    </div>
  );
}

/** In article product block. A bordered card, never an advertisement unit. */
function InArticleSoftware({ item, reason }: { item: Software; reason: string }) {
  return (
    <Card className="my-8 p-5">
      <p className="t-micro text-[var(--color-ink-3)]">Aus unserer Prüfung</p>
      <div className="mt-3.5 flex items-start gap-4">
        <SoftwareLogo item={item} size={48} />
        <div className="min-w-0 flex-1">
          <Link
            href={`/unternehmenssoftware-vergleichen/${item.slug}`}
            className="font-[var(--font-display)] text-[1.15rem] font-semibold tracking-[-0.018em] text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-red)]"
          >
            {item.name}
          </Link>
          <div className="mt-2">
            <StarRating value={item.overall_rating} reviewCount={item.review_count} />
          </div>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">{reason}</p>
          <div className="mt-3 border-t border-[var(--color-rule)] pt-3">
            <PriceLine item={item} />
          </div>
          <Link
            href={`/unternehmenssoftware-vergleichen/${item.slug}`}
            className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-ink)] no-underline transition-colors duration-200 hover:text-[var(--color-red)]"
          >
            Zum vollständigen Profil
            <IconChevronRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function ArticleMeta({ article, className }: { article: Article; className?: string }) {
  const updated = article.updated_date !== article.published_date;

  return (
    <p
      className={cx(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--color-ink-3)]",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <IconCalendar size={16} />
        <time data-numeric dateTime={article.published_date}>
          {formatDate(article.published_date)}
        </time>
      </span>
      {updated ? (
        <>
          <span aria-hidden="true">·</span>
          <span>
            zuletzt geprüft am{" "}
            <time data-numeric dateTime={article.updated_date}>
              {formatDate(article.updated_date)}
            </time>
          </span>
        </>
      ) : null}
      <span aria-hidden="true">·</span>
      <span data-numeric>{formatReadTime(article.read_time_minutes)}</span>
    </p>
  );
}
