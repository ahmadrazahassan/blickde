import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getSoftwareList } from "@/lib/queries";
import { softwareCountLabel } from "@/lib/format";
import { PageHeader } from "@/components/ui/page";
import { CATEGORY_ICONS, IconArrowRight, type CategoryIconName } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Alle Kategorien",
  description:
    "Buchhaltung, Lohnabrechnung, HR, CRM, ERP, Projektmanagement, Warenwirtschaft und Kassensysteme, jeweils mit dem aktuellen Bestand geprüfter Programme.",
  alternates: { canonical: "/kategorien" },
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const allSoftware = await getSoftwareList({ sort: "rating" });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Kategorien", href: "/kategorien" }]}
        micro="Kategorien"
        title="Acht Kategorien, nach denen deutsche Betriebe suchen"
        lede="Die Zahl neben jeder Kategorie ist der aktuelle Bestand geprüfter Programme. Wo noch nichts steht, haben wir noch nichts geprüft, und das sagen wir dann auch."
      />

      <section className="section">
        <div className="container-page">
          <ul className="flex flex-col border-t border-[var(--color-rule)]">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[(category.icon ?? "blocks") as CategoryIconName];
              const top = allSoftware.filter((s) => s.category_id === category.id).slice(0, 4);

              return (
                <li key={category.id} className="border-b border-[var(--color-rule)]">
                  <div className="grid gap-6 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
                    <div>
                      <div className="flex items-start gap-4">
                        <span className="mt-1 shrink-0 text-[var(--color-ink-3)]">
                          <Icon size={24} />
                        </span>
                        <div>
                          <h2 className="t-heading-3">
                            <Link
                              href={`/kategorie/${category.slug}`}
                              className="transition-colors duration-200 hover:text-[var(--color-red)]"
                            >
                              {category.name}
                            </Link>
                          </h2>
                          <p
                            data-numeric
                            className="mt-1 text-[13px] text-[var(--color-ink-4)]"
                          >
                            {softwareCountLabel(category.software_count)}
                          </p>
                          <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                            {category.description}
                          </p>
                          <Link
                            href={`/kategorie/${category.slug}`}
                            className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-red)]"
                          >
                            Rangliste ansehen
                            <IconArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div>
                      {top.length === 0 ? (
                        <p className="rounded-[8px] bg-[var(--color-paper-2)] p-4 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
                          In dieser Kategorie haben wir bisher kein Programm vollständig geprüft.
                          Wir nehmen erst auf, was wir selbst nachgesehen haben.
                        </p>
                      ) : (
                        <>
                          <p className="t-micro text-[var(--color-ink-3)]">Geprüfte Programme</p>
                          <ul className="mt-3 flex flex-col">
                            {top.map((item) => (
                              <li key={item.id} className="border-b border-[var(--color-rule)] last:border-b-0">
                                <Link
                                  href={`/software/${item.slug}`}
                                  className="flex min-h-[44px] items-center justify-between gap-4 py-2.5 text-[14px] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                                >
                                  <span className="font-medium text-[var(--color-ink)]">
                                    {item.name}
                                  </span>
                                  <span className="truncate text-[13px] text-[var(--color-ink-3)]">
                                    {item.vendor_name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
