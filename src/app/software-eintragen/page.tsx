import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page";
import { Card, ButtonLink } from "@/components/ui/primitives";
import { IconCheck, IconDash, IconArrowRight } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Software eintragen",
  description:
    "Aufnahmekriterien für Anbieter, welche Angaben wir brauchen und was eine Aufnahme ausdrücklich nicht kostet.",
  alternates: { canonical: "/software-eintragen" },
};

const CRITERIA_YES = [
  "Das Produkt wird in Deutschland vertrieben und richtet sich an Unternehmen.",
  "Es gibt eine deutschsprachige Oberfläche oder zumindest deutschsprachigen Support.",
  "Das Produkt passt in eine unserer acht Kategorien.",
  "Es existiert eine öffentlich zugängliche Produktdokumentation, an der wir Angaben prüfen können.",
  "Ein Testzugang oder eine Demonstration lässt sich einrichten.",
];

const CRITERIA_NO = [
  "Reine Dienstleistungen ohne eigenes Softwareprodukt.",
  "Produkte, die ausschließlich im Ausland vertrieben werden und deutsche Pflichten nicht abbilden.",
  "Angebote, zu denen sich außer der Marketingseite nichts prüfen lässt.",
  "Produkte, die nicht mehr weiterentwickelt oder verkauft werden.",
];

const NEEDED = [
  {
    title: "Produkt und Anbieter",
    items: [
      "Produktname in der Schreibweise, die Sie selbst verwenden",
      "Rechtsform und Sitz des anbietenden Unternehmens",
      "Gründungsjahr",
      "Adresse der Produktseite",
    ],
  },
  {
    title: "Preise",
    items: [
      "Alle Tarife mit Nettopreis und Abrechnungszeitraum",
      "Ob der Preis pro Mandant, pro Nutzer oder pro Arbeitsplatz gilt",
      "Ob es eine Testphase gibt und wie lange sie läuft",
      "Ob ein dauerhaft kostenloser Tarif existiert und wo seine Grenzen liegen",
    ],
  },
  {
    title: "Deutsche Pflichten",
    items: [
      "GoBD-Testat mit Prüfer und Jahr, sofern vorhanden",
      "ELSTER-Übermittlung, DATEV-Export und DATEV-Schnittstelle, jeweils getrennt",
      "E-Rechnung: Empfang und Versand getrennt, mit erzeugter ZUGFeRD-Version",
      "Bei Lohnprodukten: DEÜV-Meldungen, Lohnsteueranmeldung und eAU-Abruf",
      "Hosting-Standort und Muster des Auftragsverarbeitungsvertrags",
    ],
  },
];

export default function SubmitSoftwarePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Software eintragen", href: "/software-eintragen" }]}
        micro="Für Anbieter"
        title="Ihr Produkt in den Bestand aufnehmen"
        lede="Eine Aufnahme kostet nichts und ist nicht käuflich. Was sie voraussetzt, ist, dass wir Ihre Angaben nachprüfen können. Auf dieser Seite steht, was wir dafür brauchen."
      />

      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="t-heading-3 text-[1.2rem]">Was wir aufnehmen</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {CRITERIA_YES.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]"
                  >
                    <IconCheck size={18} className="mt-1 shrink-0 text-[var(--color-positive)]" />
                    {line}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="t-heading-3 text-[1.2rem]">Was wir nicht aufnehmen</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {CRITERIA_NO.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]"
                  >
                    <IconDash size={18} className="mt-1 shrink-0 text-[var(--color-ink-4)]" />
                    {line}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-display-2 text-[1.9rem]">Welche Angaben wir brauchen</h2>
          <p className="t-lede mt-4 max-w-[58ch]">
            Je vollständiger diese Liste bei der ersten Anfrage ausgefüllt ist, desto schneller
            steht Ihr Profil. Angaben, die wir nicht prüfen können, tragen wir als nicht geprüft
            ein.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {NEEDED.map((group) => (
              <div key={group.title}>
                <h3 className="border-b border-[var(--color-rule-strong)] pb-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-[var(--color-ink-2)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
            <div className="prose-editorial">
              <h2>Was eine Aufnahme nicht bedeutet</h2>
              <p>
                Ein Profil ist keine Empfehlung. Es ist eine Zusammenstellung geprüfter Angaben mit
                unserer Einschätzung, für welchen Betrieb das Produkt passt und für welchen nicht.
                Diese Einschätzung nennt regelmäßig auch Grenzen.
              </p>
              <p>
                Sie können den Text nicht gegenlesen, bevor er erscheint, und Sie können ihn nicht
                ändern lassen. Was Sie können: uns auf eine falsche Tatsache hinweisen. Wenn Sie
                eine überprüfbare Quelle nennen, korrigieren wir und vermerken das Datum.
              </p>

              <h2>Zur Note</h2>
              <p>
                Ihr Produkt erhält keine Note, solange keine veröffentlichte Bewertung vorliegt. In
                der Oberfläche steht dann ein Strich. Wir setzen keinen Schätzwert ein, und Sie
                können keinen kaufen.
              </p>
              <p>
                Bewertungen kommen von Anwenderinnen und Anwendern. Sie dürfen Ihre Kundschaft
                darauf hinweisen, dass es diese Seite gibt. Sie dürfen dafür keine Gegenleistung
                gewähren; solche Bewertungen veröffentlichen wir nicht, und das ist nach § 5 UWG
                auch für Sie ein Risiko.
              </p>

              <h2>Zur Provisionsfrage</h2>
              <p>
                Eine Vermittlungsvereinbarung ist möglich, aber unabhängig von der Aufnahme. Sie
                wird getrennt verhandelt, im{" "}
                <Link href="/affiliate-hinweis">Affiliate-Hinweis</Link> namentlich offengelegt und
                hat keinen Einfluss auf Note, Reihenfolge oder Textinhalt. Mehrere Produkte ohne
                Vereinbarung stehen in ihrer Kategorie vorn.
              </p>

              <h2>Ablauf</h2>
              <ol>
                <li>Sie schicken uns die Angaben über das Kontaktformular.</li>
                <li>Wir melden uns mit Rückfragen und bitten um einen Testzugang.</li>
                <li>Eine Person prüft das Produkt und trägt die Prüfliste ein.</li>
                <li>Das Profil erscheint. Sie bekommen den Link und können Fehler melden.</li>
              </ol>
              <p>
                Von der vollständigen Anfrage bis zur Veröffentlichung vergehen je nach Auslastung
                zwei bis sechs Wochen. Eine Beschleunigung gegen Zahlung bieten wir nicht an.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <Card className="p-5">
                <h2 className="t-heading-3 text-[1.1rem]">Anfrage senden</h2>
                <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
                  Wählen Sie im Kontaktformular das Thema „Anfrage als Anbieter“ und fügen Sie die
                  oben genannten Angaben bei.
                </p>
                <div className="mt-5">
                  <ButtonLink href="/kontakt" variant="primary" block>
                    Zum Kontaktformular
                    <IconArrowRight size={18} />
                  </ButtonLink>
                </div>
                <p className="mt-4 border-t border-[var(--color-rule)] pt-3.5 text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
                  Wie wir prüfen und wie Noten entstehen, steht in den{" "}
                  <Link href="/redaktionsrichtlinien" className="link-red">
                    Redaktionsrichtlinien
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
