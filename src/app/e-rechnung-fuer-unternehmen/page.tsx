import type { Metadata } from "next";
import Link from "next/link";
import { getSoftwareList, getArticles } from "@/lib/queries";
import { siteSettings } from "@/data/site";
import { PageHeader } from "@/components/ui/page";
import { ButtonLink, Card, SectionHead, Badge } from "@/components/ui/primitives";
import { SoftwareRow } from "@/components/ui/software";
import { ArticleCard } from "@/components/ui/article";
import { FaqAccordion } from "@/components/ui/navigation";
import { VerifiedCell } from "@/components/ui/rating";
import { SoftwareLogo } from "@/components/ui/software";
import { IconArrowRight } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "E-Rechnungspflicht: Fristen, Formate und geprüfte Software",
  description:
    "Empfangspflicht seit 01.01.2025, Versandpflicht gestaffelt bis 2028. Welche Formate gelten, was ZUGFeRD von XRechnung unterscheidet und welche Programme beides können.",
  alternates: { canonical: "/e-rechnung-fuer-unternehmen" },
};

const DEADLINES = [
  {
    period: "seit 01.01.2025",
    who: "Alle Unternehmen im Inland",
    duty: "Empfang von E-Rechnungen",
    note: "Ausnahmslos, auch für Kleinunternehmer nach § 19 UStG.",
  },
  {
    period: "bis 31.12.2026",
    who: "Alle Unternehmen",
    duty: "Versand noch in anderer Form zulässig",
    note: "Setzt die Zustimmung des Empfängers voraus.",
  },
  {
    period: "bis 31.12.2027",
    who: "Unternehmen mit bis zu 800.000 EUR Gesamtumsatz im Jahr 2026",
    duty: "Versand noch in anderer Form zulässig",
    note: "Maßgeblich ist der Gesamtumsatz des Vorjahres.",
  },
  {
    period: "ab 01.01.2028",
    who: "Alle Unternehmen",
    duty: "Versand nur noch als E-Rechnung",
    note: "Keine Übergangsregelung mehr.",
  },
];

const FAQ = [
  {
    question: "Ist eine PDF-Rechnung eine E-Rechnung?",
    answer:
      "Nein. Eine reine PDF-Datei gilt als sonstige Rechnung. Eine E-Rechnung ist ein strukturierter Datensatz nach der Norm EN 16931, in Deutschland üblicherweise XRechnung oder ZUGFeRD ab Version 2.1. Bei ZUGFeRD steckt die strukturierte Datei im PDF, deshalb sieht es aus wie ein PDF und ist trotzdem eine E-Rechnung.",
  },
  {
    question: "Muss ich als Kleinunternehmer E-Rechnungen empfangen können?",
    answer:
      "Ja. Die Empfangspflicht gilt seit dem 01.01.2025 unabhängig vom Umsatz. Beim Versand genießen Kleinunternehmer dagegen eine dauerhafte Erleichterung.",
  },
  {
    question: "Reicht ein E-Mail-Postfach für den Empfang?",
    answer:
      "Formal ja. Praktisch nein: Wer die strukturierte Datei nur im Postfach liegen lässt, erfüllt die GoBD-Anforderungen an Unveränderbarkeit und Auffindbarkeit nicht. Die Datei gehört in ein System, das sie revisionssicher ablegt.",
  },
  {
    question: "Wie lange muss ich E-Rechnungen aufbewahren?",
    answer:
      "Aufbewahrungspflichtig ist die strukturierte Datei im Original, nicht der Ausdruck und nicht ein daraus erzeugtes PDF. Die Aufbewahrungsfrist für Rechnungen beträgt seit dem Vierten Bürokratieentlastungsgesetz acht Jahre.",
  },
  {
    question: "Was ist der Unterschied zwischen XRechnung und ZUGFeRD?",
    answer:
      "XRechnung ist eine reine XML-Datei ohne Sichtkomponente und der Standard für Rechnungen an öffentliche Auftraggeber. ZUGFeRD ist hybrid: ein PDF mit eingebetteter XML-Datei. Zwischen Unternehmen ist ZUGFeRD meist die praktischere Wahl, weil ein Mensch das PDF lesen kann.",
  },
  {
    question: "Welche ZUGFeRD-Version brauche ich?",
    answer:
      "Mindestens Version 2.1. Ältere Fassungen erfüllen die Norm EN 16931 nicht und gelten damit nicht als E-Rechnung. Prüfen Sie, welche Version Ihre Software tatsächlich erzeugt.",
  },
];

export default async function ERechnungPage() {
  const [ready, receiveOnly, articles] = await Promise.all([
    getSoftwareList({ requires: ["erechnung"], sort: "rating" }),
    getSoftwareList({ sort: "name" }),
    getArticles(),
  ]);

  const relatedArticles = articles
    .filter((a) => a.category_tag === "Recht und Pflichten")
    .slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };

  return (
    <>
      <PageHeader
        crumbs={[{ label: "E-Rechnung", href: "/e-rechnung-fuer-unternehmen" }]}
        micro="Themenseite"
        title="E-Rechnungspflicht: was für Ihren Betrieb gilt"
        lede={
          <>
            Der Empfang ist seit dem 01.01.2025 Pflicht, ausnahmslos. Für den Versand laufen
            Fristen, die vom Vorjahresumsatz abhängen. Hier stehen die Termine, die Formate und die
            Programme, bei denen wir beide Richtungen bestätigt haben.
          </>
        }
        size="lg"
      />

      {/* ------------------------------------------------------- deadlines */}
      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-display-2 text-[1.9rem]">Die Fristen</h2>

          <div className="scroll-x mt-8">
            <table className="w-full min-w-[42rem]">
              <caption className="sr-only">
                Übergangsfristen für Empfang und Versand elektronischer Rechnungen im Inland
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-rule-strong)]">
                  <th scope="col" className="w-[11rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Zeitraum
                  </th>
                  <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Wen es betrifft
                  </th>
                  <th scope="col" className="py-3 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Was gilt
                  </th>
                </tr>
              </thead>
              <tbody>
                {DEADLINES.map((row) => (
                  <tr key={row.period} className="border-b border-[var(--color-rule)]">
                    <th
                      scope="row"
                      data-numeric
                      className="py-4 pr-4 text-left text-[14px] font-medium text-[var(--color-ink)]"
                    >
                      {row.period}
                    </th>
                    <td className="py-4 pr-4 text-[14px] leading-[1.55] text-[var(--color-ink-2)]">
                      {row.who}
                    </td>
                    <td className="py-4 text-[14px] leading-[1.55] text-[var(--color-ink-2)]">
                      <span className="font-medium text-[var(--color-ink)]">{row.duty}</span>
                      <span className="mt-0.5 block text-[13px] text-[var(--color-ink-3)]">
                        {row.note}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-[62ch] text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
            Rechtsgrundlage ist § 14 UStG in der Fassung des Wachstumschancengesetzes. Stand der
            Darstellung: September 2026. Diese Seite ersetzt keine steuerliche Beratung.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- formats */}
      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-display-2 text-[1.9rem]">Die beiden Formate</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card className="p-6">
              <Badge tone="neutral">Reine XML-Datei</Badge>
              <h3 className="t-heading-3 mt-4">XRechnung</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                Ein strukturierter Datensatz ohne Sichtkomponente. Für Menschen ohne Hilfsprogramm
                nicht lesbar, für Software umso besser. Für Rechnungen an Bundesbehörden seit 2020
                verpflichtend, die Länder haben eigene Regelungen mit abweichenden Terminen.
              </p>
              <p className="mt-4 border-t border-[var(--color-rule)] pt-4 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
                <span className="font-medium text-[var(--color-ink)]">Brauchen Sie, wenn:</span> Sie
                an öffentliche Auftraggeber liefern.
              </p>
            </Card>

            <Card className="p-6">
              <Badge tone="neutral">PDF mit eingebetteter XML-Datei</Badge>
              <h3 className="t-heading-3 mt-4">ZUGFeRD ab Version 2.1</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                Hybrid: Der Empfänger sieht ein gewohntes Rechnungsdokument, seine Software liest
                die eingebetteten Daten. Beide Teile müssen inhaltlich übereinstimmen. Erst ab
                Version 2.1 erfüllt das Format die Norm EN 16931.
              </p>
              <p className="mt-4 border-t border-[var(--color-rule)] pt-4 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
                <span className="font-medium text-[var(--color-ink)]">Brauchen Sie, wenn:</span> Sie
                zwischen Unternehmen abrechnen, also im Normalfall.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- software */}
      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <SectionHead
            micro="Geprüfte Programme"
            title="Software, bei der wir den Versand bestätigt haben"
            lede="Empfang und Versand sind zwei getrennte Funktionen mit zwei getrennten Fristen. Diese Liste enthält nur Programme, bei denen wir den Versand ausdrücklich bestätigt haben."
            action={
              <ButtonLink href="/unternehmenssoftware-vergleichen?anforderung=erechnung" variant="secondary">
                Im Bestand filtern
                <IconArrowRight size={18} />
              </ButtonLink>
            }
          />

          <ul className="mt-10 border-t border-[var(--color-rule)]">
            {ready.slice(0, 6).map((item) => (
              <SoftwareRow key={item.id} item={item} />
            ))}
          </ul>

          {/* Format ledger across the whole catalogue */}
          <h3 className="t-heading-3 mt-14">Formate im Bestand</h3>
          <div className="scroll-x mt-6">
            <table className="w-full min-w-[40rem]">
              <caption className="sr-only">
                Unterstützte E-Rechnungsformate aller geprüften Programme
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-rule-strong)]">
                  <th scope="col" className="w-[15rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Programm
                  </th>
                  <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Empfang
                  </th>
                  <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Versand
                  </th>
                  <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    ZUGFeRD
                  </th>
                  <th scope="col" className="py-3 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    XRechnung
                  </th>
                </tr>
              </thead>
              <tbody>
                {receiveOnly.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--color-rule)]">
                    <th scope="row" className="py-3 pr-4 text-left font-normal">
                      <Link
                        href={`/unternehmenssoftware-vergleichen/${item.slug}`}
                        className="flex items-center gap-2.5 transition-colors duration-200 hover:text-[var(--color-red)]"
                      >
                        <SoftwareLogo item={item} size={26} />
                        <span className="text-[14px] font-medium text-[var(--color-ink)]">
                          {item.name}
                        </span>
                      </Link>
                    </th>
                    <td className="py-3 pr-4">
                      <VerifiedCell
                        state={item.de_compliance.e_rechnung_empfang}
                        label={`${item.name}, E-Rechnung empfangen`}
                      />
                    </td>
                    <td className="py-3 pr-4">
                      <VerifiedCell
                        state={item.de_compliance.e_rechnung_versand}
                        label={`${item.name}, E-Rechnung versenden`}
                      />
                    </td>
                    <td className="py-3 pr-4 text-[13.5px] text-[var(--color-ink-2)]">
                      {item.de_compliance.zugferd_version ? (
                        <span data-numeric>Version {item.de_compliance.zugferd_version}</span>
                      ) : (
                        <span className="text-[var(--color-ink-3)]">nicht geprüft</span>
                      )}
                    </td>
                    <td className="py-3">
                      <VerifiedCell
                        state={item.de_compliance.xrechnung}
                        label={`${item.name}, XRechnung`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 max-w-[62ch] rounded-[8px] bg-[var(--color-paper-2)] p-4 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
            „nicht geprüft“ heißt, dass wir die Angabe nicht bestätigen konnten, nicht dass das
            Programm die Funktion nicht hat. Fragen Sie den Anbieter schriftlich und lassen Sie sich
            die erzeugte ZUGFeRD-Version nennen.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <div className="max-w-[48rem]">
            <h2 className="t-display-2 text-[1.9rem]">Häufige Fragen</h2>
            <FaqAccordion items={FAQ} className="mt-8" />
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="section">
          <div className="container-page">
            <SectionHead micro="Vertiefung" title="Weiterlesen" />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
