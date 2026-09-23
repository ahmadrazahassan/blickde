import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticleSlugs, getRelatedArticles, getSoftware } from "@/lib/queries";
import { siteSettings } from "@/data/site";
import { Breadcrumb } from "@/components/ui/navigation";
import { Badge, ButtonLink } from "@/components/ui/primitives";
import { ArticleBody, ArticleMeta, AuthorBlock, TableOfContents, ArticleCard } from "@/components/ui/article";
import { IconArrowRight, IconDisclosure } from "@/components/icons";
import type { Software } from "@/lib/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Nicht gefunden" };

  return {
    title: article.meta_title,
    description: article.meta_description,
    alternates: { canonical: `/ratgeber/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.meta_title,
      description: article.meta_description,
      url: `${siteSettings.url}/ratgeber/${article.slug}`,
      publishedTime: article.published_date,
      modifiedTime: article.updated_date,
      authors: [article.author_name],
      images: [{ url: `/api/og?titel=${encodeURIComponent(article.meta_title)}&bereich=Ratgeber`, width: 1200, height: 630, alt: article.meta_title }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug, 3);

  /* Resolve only the products actually referenced in the body. */
  const referenced = article.content
    .filter((block): block is Extract<typeof block, { type: "software" }> => block.type === "software")
    .map((block) => block.slug);

  const resolved = await Promise.all([...new Set(referenced)].map((s) => getSoftware(s)));
  const softwareIndex: Record<string, Software> = {};
  for (const item of resolved) if (item) softwareIndex[item.slug] = item;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    inLanguage: "de-DE",
    datePublished: article.published_date,
    dateModified: article.updated_date,
    author: {
      "@type": "Person",
      name: article.author_name,
      jobTitle: article.author_title,
    },
    publisher: {
      "@type": "Person",
      name: siteSettings.operator.company,
      url: siteSettings.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteSettings.url}/ratgeber/${article.slug}`,
    },
  };

  return (
    <>
      <article>
        {/* ------------------------------------------------------------ head
            Eine einzige zentrierte Spalte. Der Fließtext selbst bleibt
            linksbündig, weil zentrierter Mengentext auf Deutsch mit seinen
            langen Komposita kaum noch zu lesen ist. */}
        <header className="border-b border-[var(--color-rule)]">
          <div className="container-page pb-12 pt-6 md:pb-14">
            <div className="flex justify-center">
              <Breadcrumb
                items={[
                  { label: "Ratgeber", href: "/ratgeber" },
                  { label: article.title, href: `/ratgeber/${article.slug}` },
                ]}
              />
            </div>

            <div className="mx-auto mt-8 max-w-[46rem] text-center">
              <Badge tone="accent">{article.category_tag}</Badge>

              <h1 className="t-display-2 mt-5 text-balance">{article.title}</h1>

              <p className="t-lede mx-auto mt-5 max-w-[60ch]">{article.excerpt}</p>

              {/* Verfasser und Prüfdatum stehen zusammen in einer Zeile, weil
                  beides dieselbe Frage beantwortet: wer sagt das, und wann. */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] py-1.5 pl-1.5 pr-4">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--color-ink)] font-[family-name:var(--font-display)] text-[13px] font-semibold text-white"
                  >
                    {article.author_name.charAt(0)}
                  </span>
                  <span className="text-left text-[13px] leading-[1.3]">
                    <span className="block font-medium text-[var(--color-ink)]">
                      {article.author_name}
                    </span>
                    <span className="block text-[12px] text-[var(--color-ink-3)]">
                      {article.author_title}
                    </span>
                  </span>
                </span>

                <ArticleMeta article={article} className="justify-center" />
              </div>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------------ body */}
        <div className="section">
          <div className="container-page">
            <div className="mx-auto max-w-[44rem]">
              <TableOfContents blocks={article.content} />

              <div className="mt-12">
                <ArticleBody blocks={article.content} softwareIndex={softwareIndex} />
              </div>

              <div className="mt-16 border-t border-[var(--color-rule)] pt-9">
                <AuthorBlock article={article} />
              </div>

              <aside className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6">
                <p className="t-micro flex items-center gap-2 text-[var(--color-ink-3)]">
                  <IconDisclosure size={16} />
                  Hinweis
                </p>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-[var(--color-ink-2)]">
                  Dieser Beitrag gibt den Stand zum genannten Prüfdatum wieder und ersetzt keine
                  steuerliche oder rechtliche Beratung. Für Ihren konkreten Fall fragen Sie Ihre
                  Steuerkanzlei oder eine Rechtsanwältin. Wenn Ihnen ein Fehler auffällt,{" "}
                  <Link href="/kontakt" className="link-red">
                    schreiben Sie uns
                  </Link>
                  ; wir korrigieren mit Datum.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* ------------------------------------------------------- weiterlesen */}
      {related.length > 0 ? (
        <section className="section border-t border-[var(--color-rule)] bg-[var(--color-paper-2)]">
          <div className="container-page">
            <div className="text-center">
              <p className="t-micro text-[var(--color-ink-3)]">Weiterlesen</p>
              <h2 className="t-display-2 mt-4 text-[1.9rem]">Passend zu diesem Beitrag</h2>
            </div>

            <ul className="mx-auto mt-12 grid max-w-[72rem] gap-5 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>

            <div className="mt-12 flex justify-center">
              <ButtonLink href="/ratgeber" variant="secondary">
                Alle Beiträge
                <IconArrowRight size={18} />
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
