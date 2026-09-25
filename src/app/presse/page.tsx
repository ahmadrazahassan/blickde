import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { PageHeader, ProseSection } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Presse",
  description:
    "Kurzprofil und Ansprechpartner für Redaktionen. Angaben zur Methode und zur Finanzierung für die Zitierung.",
  alternates: { canonical: "/presse" },
};

export default function PressPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Presse", href: "/presse" }]}
        micro="Presse"
        title="Angaben für Redaktionen"
        lede="Kurzprofil und die Angaben, die Sie für eine Quellenangabe brauchen. Für Rückfragen erreichen Sie uns unter der unten genannten Adresse."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
            <div className="prose-editorial">
              <h2>Kurzprofil</h2>
              <p>
                {siteSettings.name} prüft Unternehmenssoftware für den deutschen Mittelstand:
                Buchhaltung, Lohnabrechnung, Personalverwaltung, CRM, ERP und Warenwirtschaft. Die
                Seite wird von Daniel Hoffmann betrieben und redaktionell verantwortet.
              </p>
              <p>
                Der Schwerpunkt liegt auf den Anforderungen, die sich aus deutschem Recht ergeben:
                GoBD, ELSTER-Übermittlung, DATEV-Anbindung, die E-Rechnungspflicht nach § 14 UStG
                und das Meldeverfahren zur Sozialversicherung.
              </p>

              <h2>Zur Methode</h2>
              <p>
                Jede Angabe in einer Prüfliste trägt einen von drei Zuständen: bestätigt, widerlegt
                oder nicht geprüft. Der dritte Zustand wird ausdrücklich ausgewiesen und nie als
                Verneinung dargestellt.
              </p>
              <p>
                Noten werden nicht vergeben, sondern aus veröffentlichten Bewertungen berechnet. Ein
                Produkt ohne Bewertung trägt keine Note. Der vollständige Ablauf steht in den{" "}
                <Link href="/redaktionsrichtlinien">Redaktionsrichtlinien</Link>.
              </p>

              <h2>Zur Finanzierung</h2>
              <p>
                Derzeit bestehen keine aktiven Vermittlungsvereinbarungen für die gelisteten Produkte.
                Wie künftige Partnerlinks kenntlich gemacht werden, steht im{" "}
                <Link href="/affiliate-hinweis">Affiliate-Hinweis</Link>. Provisionen haben keinen
                Einfluss auf Noten, Reihenfolge oder die Aufnahme in den Bestand.
              </p>

              <h2>Zitierung</h2>
              <p>
                Wir freuen uns über die Nennung als Quelle. Bitte geben Sie den Seitennamen und das
                Datum des Abrufs an, weil sich geprüfte Preise ändern. Eine Verlinkung auf die
                zitierte Seite ist willkommen, aber keine Bedingung.
              </p>
              <p>
                Für Interviews, Hintergrundgespräche und Datenauswertungen wenden Sie sich bitte an
                die Redaktionsleitung. Wir stellen auf Anfrage auch anonymisierte Auswertungen aus
                unserem Bestand zur Verfügung, etwa zur Verbreitung bestimmter Schnittstellen.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <div className="flex flex-col gap-5">
                <Card className="p-5">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Presseanfragen</h2>
                  <address className="mt-3 not-italic text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
                    <span className="block font-medium text-[var(--color-ink)]">
                      {siteSettings.editorialResponsible.name}
                    </span>
                    Redaktionsleitung
                    <br />
                    {siteSettings.operator.company}
                    <br />
                    {siteSettings.operator.street}
                    <br />
                    {siteSettings.operator.zip} {siteSettings.operator.city}
                    <br />
                    <a href={`mailto:${siteSettings.operator.email}`} className="link-red">
                      {siteSettings.operator.email}
                    </a>
                  </address>
                </Card>

                <Card className="p-5">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Wortmarke</h2>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
                    Der Seitenname lautet {siteSettings.name}, geschrieben als ein Wort
                    mit großem S. Die Domain lautet {siteSettings.domain}.
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
