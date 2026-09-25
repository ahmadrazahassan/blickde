import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, DataRows } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";
import { NewsletterForm } from "@/components/site/forms";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Einmal im Monat: geänderte Preise, neu geprüfte Programme und die nächste Frist, die läuft. Anmeldung im Double-Opt-in-Verfahren.",
  alternates: { canonical: "/software-newsletter-anmelden" },
};

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Newsletter", href: "/software-newsletter-anmelden" }]}
        micro="Newsletter"
        title="Wenn sich ein Preis oder eine Pflicht ändert"
        lede="Etwa einmal im Monat, und nur dann, wenn es etwas zu berichten gibt. Kein Weiterverkauf Ihrer Adresse, keine Werbung Dritter, Abmeldung mit einem Klick."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="t-heading-3">Was im Newsletter steht</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "Welche Preise sich seit der letzten Ausgabe geändert haben, mit altem und neuem Betrag",
                  "Welche Programme wir neu aufgenommen oder nachgeprüft haben",
                  "Welche gesetzliche Frist als Nächstes läuft und wen sie betrifft",
                  "Neue Ratgeberbeiträge, mit einem Satz dazu, für wen sie relevant sind",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[15px] leading-[1.65] text-[var(--color-ink-2)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                    />
                    {line}
                  </li>
                ))}
              </ul>

              <h2 className="t-heading-3 mt-10">Was nicht drinsteht</h2>
              <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                Keine Werbung für einzelne Anbieter, keine bezahlten Platzierungen und keine
                Weitergabe Ihrer Adresse an Dritte. Wenn ein Anbieter uns bezahlt, steht das im{" "}
                <Link href="/transparenz-zu-affiliate-links" className="link-red">
                  Affiliate-Hinweis
                </Link>{" "}
                und nicht in Ihrem Postfach.
              </p>

              <div className="mt-10 border-t border-[var(--color-rule)] pt-8">
                <NewsletterForm />
              </div>
            </div>

            <aside>
              <Card className="p-5">
                <h2 className="t-micro text-[var(--color-ink-3)]">Wie die Anmeldung abläuft</h2>
                <ol className="mt-4 flex flex-col gap-4">
                  {[
                    {
                      title: "Sie tragen Ihre Adresse ein",
                      text: "Wir speichern sie zunächst als unbestätigt. Ein Versand erfolgt in diesem Zustand nicht.",
                    },
                    {
                      title: "Sie erhalten eine Bestätigungsmail",
                      text: "Darin steht ein Link mit einem einmaligen Token. Ohne Klick auf diesen Link geschieht nichts weiter.",
                    },
                    {
                      title: "Sie bestätigen",
                      text: "Wir vermerken den Zeitpunkt der Bestätigung. Dieser Nachweis ist die Grundlage dafür, dass wir Ihnen schreiben dürfen.",
                    },
                    {
                      title: "Ohne Bestätigung wird gelöscht",
                      text: "Eine Adresse, die nach 30 Tagen nicht bestätigt wurde, löschen wir vollständig. Eine unbestätigte Adresse hat keine Rechtsgrundlage für eine Speicherung.",
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
                  Dieses Verfahren nennt sich Double Opt-in und ist in Deutschland für
                  Werbe-E-Mails der einzig sichere Weg. Rechtsgrundlage der Verarbeitung ist
                  Art. 6 Abs. 1 lit. a DSGVO.
                </p>
              </Card>

              <Card className="mt-5 p-5">
                <h2 className="t-micro text-[var(--color-ink-3)]">Abmeldung</h2>
                <DataRows
                  className="mt-4"
                  rows={[
                    { label: "Wo", value: "Link am Ende jeder Ausgabe" },
                    { label: "Anmeldung nötig", value: "nein" },
                    { label: "Bestätigung nötig", value: "nein, ein Klick genügt" },
                    { label: "Wirksam ab", value: "sofort" },
                  ]}
                />
                <p className="mt-4 text-[13px] leading-[1.6] text-[var(--color-ink-2)]">
                  Sie können sich auch{" "}
                  <Link href="/software-newsletter-anmelden/newsletter-abmelden" className="link-red">
                    hier direkt abmelden
                  </Link>
                  .
                </p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
