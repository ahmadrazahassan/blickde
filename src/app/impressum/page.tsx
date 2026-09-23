import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { PageHeader, DataRows } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG und Angabe der redaktionell verantwortlichen Person nach § 18 Abs. 2 MStV.",
  alternates: { canonical: "/impressum" },
};

const { operator, editorialResponsible } = siteSettings;

export default function ImprintPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Impressum", href: "/impressum" }]}
        micro="Anbieterkennzeichnung"
        title="Impressum"
        lede="Angaben nach § 5 Digitale-Dienste-Gesetz und § 18 Abs. 2 Medienstaatsvertrag."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="t-heading-3">Diensteanbieter</h2>
              <DataRows
                className="mt-5"
                rows={[
                  { label: "Diensteanbieter", value: operator.company },
                  {
                    label: "Anschrift",
                    value: (
                      <address className="not-italic">
                        {operator.street}
                        <br />
                        {operator.zip} {operator.city}
                        <br />
                        {operator.country}
                      </address>
                    ),
                  },
                ]}
              />

              <h2 className="t-heading-3 mt-12">Kontakt</h2>
              <DataRows
                className="mt-5"
                rows={[
                  {
                    label: "E-Mail",
                    value: (
                      <a href={`mailto:${operator.email}`} className="link-red">
                        {operator.email}
                      </a>
                    ),
                  },
                  {
                    label: "Kontaktformular",
                    value: (
                      <Link href="/kontakt" className="link-red">
                        Zum Formular
                      </Link>
                    ),
                  },
                ]}
              />

              <h2 className="t-heading-3 mt-12">Redaktionell verantwortlich</h2>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Nach § 18 Abs. 2 Medienstaatsvertrag verantwortlich für journalistisch-redaktionell
                gestaltete Inhalte:
              </p>
              <DataRows
                className="mt-5"
                rows={[
                  { label: "Name", value: editorialResponsible.name },
                  {
                    label: "Anschrift",
                    value: (
                      <address className="not-italic">
                        {editorialResponsible.street}
                        <br />
                        {editorialResponsible.zip} {editorialResponsible.city}
                      </address>
                    ),
                  },
                ]}
              />

              <h2 className="t-heading-3 mt-12">Kommerzieller Zweck</h2>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Dieses Angebot verfolgt einen kommerziellen Zweck im Sinne des § 5a Abs. 4 UWG.
                Besteht mit einem Anbieter eine Vermittlungsvereinbarung, kann bei einem Abschluss
                über einen gekennzeichneten Link eine Provision entstehen. Solche Links sind vor
                dem Klick als Werbung gekennzeichnet. Welche Anbieter betroffen sind und welche
                nicht, steht namentlich im{" "}
                <Link href="/affiliate-hinweis" className="link-red">
                  Affiliate-Hinweis
                </Link>
                .
              </p>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Wir sind weder Vermittler noch Vertragspartner der besprochenen Anbieter. Ein
                Vertrag über eine Software kommt ausschließlich zwischen Ihnen und dem jeweiligen
                Hersteller zustande.
              </p>

              <h2 className="t-heading-3 mt-12">Streitbeilegung</h2>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen. Die Europäische Kommission hat die
                Plattform zur Online-Streitbeilegung zum 20.07.2025 eingestellt; ein Verweis darauf
                entfällt daher.
              </p>

              <h2 className="t-heading-3 mt-12">Haftung für Inhalte</h2>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Wir erstellen die Inhalte dieser Seiten mit Sorgfalt und prüfen Angaben zu
                Drittprodukten nach dem in den{" "}
                <Link href="/redaktionsrichtlinien" className="link-red">
                  Redaktionsrichtlinien
                </Link>{" "}
                beschriebenen Verfahren. Für die Richtigkeit, Vollständigkeit und Aktualität der
                Angaben können wir dennoch keine Gewähr übernehmen. Preise und Funktionsumfänge
                ändern sich, und jede Angabe steht unter dem Vorbehalt des genannten Prüfdatums.
              </p>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Unsere Inhalte ersetzen keine steuerliche oder rechtliche Beratung. Für die
                Beurteilung Ihres konkreten Falls wenden Sie sich an Ihre Steuerkanzlei oder an eine
                Rechtsanwältin.
              </p>

              <h2 className="t-heading-3 mt-12">Haftung für Links</h2>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter
                verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
                Bei Bekanntwerden von Rechtsverletzungen entfernen wir den betreffenden Link
                umgehend.
              </p>

              <h2 className="t-heading-3 mt-12">Urheberrecht</h2>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Die von uns erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht.
                Produktnamen, Wortmarken und Logos der besprochenen Anbieter sind Eigentum der
                jeweiligen Rechteinhaber und werden hier ausschließlich zu Zwecken der
                Berichterstattung und Kennzeichnung verwendet.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <Card className="p-5">
                <h2 className="t-micro text-[var(--color-ink-3)]">Weitere Rechtstexte</h2>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {[
                    { label: "Datenschutzerklärung", href: "/datenschutz" },
                    { label: "Cookie-Richtlinie", href: "/cookie-richtlinie" },
                    { label: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
                    { label: "Barrierefreiheit", href: "/barrierefreiheit" },
                    { label: "Affiliate-Hinweis", href: "/affiliate-hinweis" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
