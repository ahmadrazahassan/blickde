import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSoftware, getSoftwareSlugs, getAlternatives } from "@/lib/queries";
import { categoryById } from "@/data/categories";
import { COMPLIANCE_CHIPS } from "@/data/software";
import { formatGrade, formatPrice, billingPeriodLabel } from "@/lib/format";
import { PageHeader } from "@/components/ui/page";
import { ButtonLink, Card } from "@/components/ui/primitives";
import { SoftwareLogo, SoftwareRow } from "@/components/ui/software";
import { VerifiedCell } from "@/components/ui/rating";
import { IconCompare } from "@/components/icons";

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
    title: `Alternativen zu ${item.name}`,
    description: `Geprüfte Alternativen zu ${item.name} mit Preisen, Noten und den deutschen Pflichten im direkten Vergleich.`,
    alternates: { canonical: `/software/${item.slug}/alternativen` },
  };
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getSoftware(slug);
  if (!item) notFound();

  const alternatives = await getAlternatives(slug, 6);
  const category = categoryById(item.category_id);
  const all = [item, ...alternatives];

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Software", href: "/software" },
          ...(category ? [{ label: category.name, href: `/kategorie/${category.slug}` }] : []),
          { label: item.name, href: `/software/${item.slug}` },
          { label: "Alternativen", href: `/software/${item.slug}/alternativen` },
        ]}
        micro="Alternativen"
        title={`Was statt ${item.name} infrage kommt`}
        lede={
          <>
            Programme mit vergleichbarem Zuschnitt, jeweils mit geprüftem Einstiegspreis und den
            deutschen Pflichten, die wir bestätigen konnten. Eine Alternative ist nicht automatisch
            besser, sie passt nur anders.
          </>
        }
      />

      {/* Side by side ledger */}
      <section className="section-tight border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-heading-3">Gegenüberstellung</h2>
          <p className="mt-2.5 max-w-[58ch] text-[14.5px] leading-[1.6] text-[var(--color-ink-3)]">
            Ein leeres Feld heißt „nicht geprüft“, nicht „kann das Programm nicht“.
          </p>

          <div className="scroll-x mt-6">
            <table className="w-full min-w-[46rem]">
              <caption className="sr-only">
                {item.name} und Alternativen im Vergleich der Kernangaben
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-rule-strong)]">
                  <th scope="col" className="w-[13rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Programm
                  </th>
                  <th scope="col" className="w-[6rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Note
                  </th>
                  <th scope="col" className="w-[11rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    ab
                  </th>
                  {COMPLIANCE_CHIPS.map((chip) => (
                    <th
                      key={String(chip.key)}
                      scope="col"
                      className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]"
                    >
                      {chip.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {all.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      row.id === item.id
                        ? "border-b border-[var(--color-rule)] bg-[var(--color-paper-2)]"
                        : "border-b border-[var(--color-rule)]"
                    }
                  >
                    <th scope="row" className="py-3.5 pr-4 text-left font-normal">
                      <Link
                        href={`/software/${row.slug}`}
                        className="flex items-center gap-2.5 transition-colors duration-200 hover:text-[var(--color-red)]"
                      >
                        <SoftwareLogo item={row} size={28} />
                        <span className="text-[14px] font-medium text-[var(--color-ink)]">
                          {row.name}
                        </span>
                      </Link>
                    </th>
                    <td data-numeric className="py-3.5 pr-4 text-[14px] text-[var(--color-ink)]">
                      {formatGrade(row.overall_rating, row.review_count)}
                    </td>
                    <td className="py-3.5 pr-4 text-[13.5px] text-[var(--color-ink-2)]">
                      {row.starting_price === null ? (
                        "auf Anfrage"
                      ) : row.starting_price === 0 ? (
                        "kostenloser Tarif"
                      ) : (
                        <span data-numeric>
                          {formatPrice(row.starting_price)}{" "}
                          <span className="text-[var(--color-ink-4)]">
                            {billingPeriodLabel(row.billing_period)}
                          </span>
                        </span>
                      )}
                    </td>
                    {COMPLIANCE_CHIPS.map((chip) => (
                      <td key={String(chip.key)} className="py-3.5 pr-4">
                        <VerifiedCell
                          state={row.de_compliance[chip.key] as boolean | null}
                          label={`${row.name}, ${chip.label}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-[13px] text-[var(--color-ink-3)]">
            Alle Preise netto, zzgl. 19&nbsp;% MwSt. Ein Einstiegstarif deckt bei verschiedenen
            Anbietern unterschiedlich viel ab; die Zeile vergleicht den Preis, nicht den Umfang.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="t-heading-3">Die Alternativen im Einzelnen</h2>
          <ul className="mt-8 border-t border-[var(--color-rule)]">
            {alternatives.map((alternative) => (
              <SoftwareRow key={alternative.id} item={alternative} />
            ))}
          </ul>

          <Card className="mt-10 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="t-heading-3 text-[1.15rem]">Zwei davon direkt gegenüberstellen</h2>
                <p className="mt-2 max-w-[50ch] text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
                  Der Direktvergleich zeigt Funktionen, Preise und deutsche Pflichten Zeile für
                  Zeile, mit einem Urteil am Ende.
                </p>
              </div>
              <ButtonLink href={`/vergleich?a=${item.slug}`} variant="secondary" className="shrink-0">
                <IconCompare size={18} />
                Vergleich starten
              </ButtonLink>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
