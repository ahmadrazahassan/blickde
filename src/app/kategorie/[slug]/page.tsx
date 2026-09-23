import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getCategory, getSoftwareList, getArticles } from "@/lib/queries";
import { siteSettings } from "@/data/site";
import { formatCount } from "@/lib/format";
import { PageHeader, EmptyState } from "@/components/ui/page";
import { SoftwareRow } from "@/components/ui/software";
import { ArticleCard } from "@/components/ui/article";
import { ButtonLink, SectionHead } from "@/components/ui/primitives";
import { IconArrowRight } from "@/components/icons";

export const revalidate = 3600;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Nicht gefunden" };

  return {
    title: `${category.name} im Test`,
    description: `Geprüfte ${category.name} für den deutschen Mittelstand, mit Preisen, Noten und den Angaben zu GoBD, ELSTER, DATEV und E-Rechnung.`,
    alternates: { canonical: `/kategorie/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const [rows, articles] = await Promise.all([
    getSoftwareList({ category: slug, sort: "rating" }),
    getArticles(),
  ]);

  const related = articles
    .filter((a) => a.related_software_slugs.some((s) => rows.some((r) => r.slug === s)))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} im Test`,
    url: `${siteSettings.url}/kategorie/${category.slug}`,
    description: category.description,
    inLanguage: "de-DE",
    ...(rows.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: rows.length,
            itemListElement: rows.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              url: `${siteSettings.url}/software/${item.slug}`,
            })),
          },
        }
      : {}),
  };

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Kategorien", href: "/kategorien" },
          { label: category.name, href: `/kategorie/${category.slug}` },
        ]}
        micro="Kategorie"
        title={`${category.name} im Test`}
        lede={category.description ?? undefined}
        meta={
          rows.length > 0 ? (
            <p data-numeric className="text-[14px] text-[var(--color-ink-2)]">
              {formatCount(rows.length)} geprüfte{" "}
              {rows.length === 1 ? "Programm" : "Programme"}, sortiert nach Note. Programme ohne
              Bewertung stehen am Ende, weil sie keine Note haben.
            </p>
          ) : undefined
        }
      />

      <section className="section">
        <div className="container-page">
          {rows.length === 0 ? (
            <EmptyState
              title="In dieser Kategorie haben wir noch nichts geprüft"
              action={
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/kategorien" variant="secondary">
                    Andere Kategorien ansehen
                  </ButtonLink>
                  <ButtonLink href="/software-eintragen" variant="quiet">
                    Software vorschlagen
                  </ButtonLink>
                </div>
              }
            >
              Wir nehmen ein Programm erst auf, wenn wir Preis, Funktionsumfang und die deutschen
              Pflichten selbst nachgesehen haben. Für {category.name} ist das noch nicht geschehen.
              Eine Liste aus Herstellerangaben ohne eigene Prüfung wäre schnell erstellt und
              wertlos.
            </EmptyState>
          ) : (
            <ul className="border-t border-[var(--color-rule)]">
              {rows.map((item, index) => (
                <SoftwareRow key={item.id} item={item} rank={index + 1} />
              ))}
            </ul>
          )}

          {rows.length > 0 ? (
            <p className="mt-6 max-w-[58ch] text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
              Die Note ist der Durchschnitt der veröffentlichten Bewertungen in vier Dimensionen.
              Ein Programm ohne Bewertung trägt keine Note, und wir setzen keine ersatzweise ein.
              Wie die Reihenfolge zustande kommt, steht in den{" "}
              <Link href="/redaktionsrichtlinien" className="link-red">
                Redaktionsrichtlinien
              </Link>
              .
            </p>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section border-t border-[var(--color-rule)]">
          <div className="container-page">
            <SectionHead
              micro="Ratgeber"
              title={`Was Sie vor dem Kauf klären sollten`}
              action={
                <ButtonLink href="/ratgeber" variant="secondary">
                  Alle Beiträge
                  <IconArrowRight size={18} />
                </ButtonLink>
              }
            />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
