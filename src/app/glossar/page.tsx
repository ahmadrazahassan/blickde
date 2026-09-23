import type { Metadata } from "next";
import Link from "next/link";
import { getGlossary } from "@/lib/queries";
import { PageHeader } from "@/components/ui/page";
import { Badge } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Glossar",
  description:
    "Fachbegriffe aus Buchhaltung, Lohn und Datenschutz, kurz erklärt: GoBD, DEÜV, ZUGFeRD, EÜR, AVV und was sie für die Softwareauswahl bedeuten.",
  alternates: { canonical: "/glossar" },
};

export default async function GlossaryPage() {
  const entries = await getGlossary();
  const letters = [...new Set(entries.map((e) => e.letter))].sort((a, b) => a.localeCompare(b, "de-DE"));

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Glossar", href: "/glossar" }]}
        micro="Glossar"
        title="Die Begriffe, die in jeder Softwareauswahl vorkommen"
        lede="Kurz erklärt, mit der Fundstelle im Gesetz, wo es eine gibt. Geschrieben für Menschen, die eine Software auswählen müssen, nicht für Steuerfachleute."
      />

      <section className="section">
        <div className="container-page">
          <nav aria-label="Nach Anfangsbuchstabe springen" className="scroll-x border-b border-[var(--color-rule)] pb-4">
            <ul className="flex items-center gap-1 whitespace-nowrap">
              {letters.map((letter) => (
                <li key={letter}>
                  <a
                    href={`#buchstabe-${letter}`}
                    className="inline-flex size-10 items-center justify-center rounded-[4px] text-[14px] font-medium text-[var(--color-ink-2)] transition-colors duration-200 hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
                  >
                    {letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              {letters.map((letter) => (
                <section key={letter} id={`buchstabe-${letter}`} className="scroll-mt-24">
                  <h2
                    data-numeric
                    className="border-b border-[var(--color-rule-strong)] pb-2 font-[var(--font-display)] text-[1.6rem] font-semibold tracking-[-0.025em] text-[var(--color-ink)]"
                  >
                    {letter}
                  </h2>

                  <dl>
                    {entries
                      .filter((entry) => entry.letter === letter)
                      .map((entry) => (
                        <div
                          key={entry.slug}
                          id={entry.slug}
                          className="scroll-mt-24 border-b border-[var(--color-rule)] py-7"
                        >
                          <dt className="flex flex-wrap items-baseline gap-3">
                            <h3 className="font-[var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.018em] text-[var(--color-ink)]">
                              {entry.term}
                            </h3>
                            {entry.legal_basis ? (
                              <Badge tone="neutral">{entry.legal_basis}</Badge>
                            ) : null}
                          </dt>
                          <dd className="mt-3">
                            <p className="text-[15.5px] font-medium leading-[1.6] text-[var(--color-ink)]">
                              {entry.short}
                            </p>
                            <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.68] text-[var(--color-ink-2)]">
                              {entry.body}
                            </p>

                            {entry.related.length > 0 ? (
                              <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[var(--color-ink-3)]">
                                <span>Siehe auch:</span>
                                {entry.related.map((slug, index) => {
                                  const target = entries.find((e) => e.slug === slug);
                                  if (!target) return null;
                                  return (
                                    <span key={slug}>
                                      <a href={`#${slug}`} className="link-red">
                                        {target.term}
                                      </a>
                                      {index < entry.related.length - 1 ? "," : ""}
                                    </span>
                                  );
                                })}
                              </p>
                            ) : null}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </section>
              ))}
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <h2 className="t-micro border-b border-[var(--color-rule)] pb-3 text-[var(--color-ink-3)]">
                Alle Begriffe
              </h2>
              <ul className="mt-4 flex flex-col">
                {entries.map((entry) => (
                  <li key={entry.slug}>
                    <a
                      href={`#${entry.slug}`}
                      className="flex min-h-[40px] items-center text-[13.5px] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                    >
                      {entry.term}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-[var(--color-rule)] pt-4 text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
                Fehlt ein Begriff?{" "}
                <Link href="/kontakt" className="link-red">
                  Schreiben Sie uns
                </Link>
                , wir nehmen ihn auf.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
