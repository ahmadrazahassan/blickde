import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSoftware, getSoftwareSlugs } from "@/lib/queries";
import { categoryById } from "@/data/categories";
import { PageHeader } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";
import { SoftwareLogo } from "@/components/ui/software";
import { ReviewForm } from "@/components/site/review-form";

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
    title: `Bewertung zu ${item.name} schreiben`,
    description: `Teilen Sie Ihre Erfahrung mit ${item.name}. Jede Einreichung wird von einer Person geprüft, bevor sie erscheint.`,
    alternates: { canonical: `/software/${item.slug}/bewertungen/neu` },
    robots: { index: false, follow: true },
  };
}

export default async function NewReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getSoftware(slug);
  if (!item) notFound();

  const category = categoryById(item.category_id);

  return (
    <>
      <PageHeader
        wide
        crumbs={[
          { label: "Software", href: "/software" },
          ...(category ? [{ label: category.name, href: `/kategorie/${category.slug}` }] : []),
          { label: item.name, href: `/software/${item.slug}` },
          { label: "Bewertungen", href: `/software/${item.slug}/bewertungen` },
          { label: "Schreiben", href: `/software/${item.slug}/bewertungen/neu` },
        ]}
        micro="Bewertung schreiben"
        title={`Ihre Erfahrung mit ${item.name}`}
        lede="Andere Betriebe stehen vor derselben Entscheidung wie Sie damals. Was Sie konkret berichten, hilft ihnen mehr als jede Produktseite."
        meta={
          <div className="flex items-center gap-3">
            <SoftwareLogo item={item} size={44} />
            <div>
              <p className="text-[14.5px] font-medium text-[var(--color-ink)]">{item.name}</p>
              <p className="text-[13px] text-[var(--color-ink-3)]">{item.vendor_name}</p>
            </div>
          </div>
        }
      />

      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="grid max-w-[82rem] gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
            <div className="min-w-0">
              {/* Was mit der Einsendung geschieht, steht vor dem Ausfüllen und
                  nicht erst danach. */}
              <p
                role="status"
                className="mb-8 rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-5 py-4 text-[14px] leading-[1.6] text-[var(--color-ink-2)]"
              >
                <strong className="font-semibold text-[var(--color-ink)]">
                  Keine Bewertung erscheint automatisch.
                </strong>{" "}
                Ihre Einsendung geht in die Prüfung und wird von einer Person gelesen, bevor sie
                veröffentlicht wird. So verlangt es § 5b Abs. 3 UWG. Für Rückfragen erreichen Sie
                uns jederzeit über die{" "}
                <Link href="/kontakt" className="link-red">
                  Redaktionsadresse
                </Link>
                .
              </p>

              <ReviewForm softwareName={item.name} softwareSlug={item.slug} />
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <div className="flex flex-col gap-5">
                {/* § 5b Abs. 3 UWG: what we actually do to make sure a review
                    comes from someone who used the product. Described
                    concretely, because a vague claim can be disproved. */}
                <Card className="p-5">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Wie wir prüfen</h2>
                  <ol className="mt-4 flex flex-col gap-4">
                    {[
                      {
                        title: "Eine Person liest jede Einreichung",
                        text: "Es gibt keine automatische Veröffentlichung. Jede Bewertung wird vor der Freischaltung gelesen.",
                      },
                      {
                        title: "Wir prüfen auf Nachvollziehbarkeit",
                        text: "Passen Rolle, Betriebsgröße und beschriebene Nutzung zusammen? Werden konkrete Abläufe genannt oder nur Adjektive?",
                      },
                      {
                        title: "Wir erkennen Mehrfacheinreichungen",
                        text: "Zu jeder Einreichung wird ein gesalzener Hashwert der IP-Adresse gespeichert, niemals die Adresse selbst. Mehrere Bewertungen zum selben Produkt aus derselben Quelle fallen dabei auf und werden der Moderation angezeigt.",
                      },
                      {
                        title: "Auf Wunsch belegen Sie den Einsatz",
                        text: "Wer eine Rechnung oder einen Vertragsauszug des Anbieters vorlegt, erhält den Hinweis „Rechnung des Anbieters geprüft“ an der Bewertung. Das ist freiwillig.",
                      },
                      {
                        title: "Was wir ablehnen",
                        text: "Bewertungen ohne erkennbaren eigenen Einsatz, Beiträge von Mitarbeitenden oder Wettbewerbern des Anbieters, und alles, wofür eine Gegenleistung geflossen ist.",
                      },
                    ].map((step, index) => (
                      <li key={step.title} className="grid grid-cols-[1.75rem_1fr] gap-3">
                        <span
                          aria-hidden="true"
                          data-numeric
                          className="inline-flex size-7 items-center justify-center rounded-full border border-[var(--color-rule)] text-[12px] font-medium text-[var(--color-ink-3)]"
                        >
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-[14px] font-medium leading-[1.4] text-[var(--color-ink)]">
                            {step.title}
                          </p>
                          <p className="mt-1 text-[13px] leading-[1.55] text-[var(--color-ink-2)]">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 border-t border-[var(--color-rule)] pt-4 text-[12.5px] leading-[1.55] text-[var(--color-ink-3)]">
                    Diese Angaben erfüllen unsere Informationspflicht nach § 5b Abs. 3 UWG. Der
                    vollständige Ablauf steht in den{" "}
                    <Link href="/redaktionsrichtlinien" className="link-red">
                      Redaktionsrichtlinien
                    </Link>
                    .
                  </p>
                </Card>

                <Card className="p-5">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Was veröffentlicht wird</h2>
                  <ul className="mt-3.5 flex flex-col gap-2 text-[13.5px] leading-[1.55] text-[var(--color-ink-2)]">
                    {[
                      "Name, Rolle und Betriebsname",
                      "Betriebsgröße, Branche und Nutzungsdauer",
                      "Noten, Überschrift, Text, Vorteile und Nachteile",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[8px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-[var(--color-rule)] pt-3.5 text-[13px] leading-[1.55] text-[var(--color-ink-2)]">
                    Nicht veröffentlicht werden Ihre E-Mail-Adresse und der Hashwert Ihrer
                    IP-Adresse. Wenn Sie Ihren Betriebsnamen nicht nennen möchten, lassen Sie das
                    Feld leer.
                  </p>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
