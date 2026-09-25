import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { PageHeader, DataRows, ProseSection } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Erklärung zur Barrierefreiheit",
  description:
    "Stand der Barrierefreiheit dieser Website, bekannte Einschränkungen und wie Sie eine Barriere melden.",
  alternates: { canonical: "/erklaerung-zur-barrierefreiheit" },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Barrierefreiheit", href: "/erklaerung-zur-barrierefreiheit" }]}
        micro="Barrierefreiheit"
        title="Erklärung zur Barrierefreiheit"
        lede="Wir wollen, dass diese Seite für alle nutzbar ist. Was wir dafür umgesetzt haben, wo wir noch nicht fertig sind und wie Sie uns eine Barriere melden."
        meta={
          <p className="text-[13px] text-[var(--color-ink-3)]">
            Erstellt am{" "}
            <time data-numeric dateTime="2026-09-01">
              01.09.2026
            </time>{" "}
            auf Grundlage einer Selbstbewertung.
          </p>
        }
      />

      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
            <div className="prose-editorial">
              <h2>Stand der Vereinbarkeit</h2>
              <p>
                Diese Website ist nach unserer Einschätzung weitgehend mit den Web Content
                Accessibility Guidelines 2.2 auf Stufe AA vereinbar. Grundlage ist eine
                Selbstbewertung durch die Redaktion, keine Prüfung durch eine externe Stelle.
              </p>
              <p>
                Die Erklärung bezieht sich auf das Barrierefreiheitsstärkungsgesetz, das für
                Dienstleistungen im elektronischen Geschäftsverkehr seit dem 28.06.2025 gilt.
              </p>

              <h2>Was umgesetzt ist</h2>
              <ul>
                <li>
                  Jede Funktion ist mit der Tastatur erreichbar und bedienbar. Der Fokus ist
                  jederzeit sichtbar und wird nicht unterdrückt.
                </li>
                <li>
                  Ein Sprunglink am Seitenanfang führt unmittelbar zum Hauptinhalt.
                </li>
                <li>
                  Überschriften folgen einer durchgehenden Ebenenstruktur ohne Sprünge, und jede
                  Seite hat genau eine Hauptüberschrift.
                </li>
                <li>
                  Farbe trägt nirgends eine Bedeutung allein. Eine Note wird als Sternzahl und als
                  Zahl ausgegeben, eine Balkengrafik nennt zusätzlich den Prozentwert, und ein
                  Häkchen wird von einem Wort für Bildschirmleseprogramme begleitet.
                </li>
                <li>
                  Fließtext und Links erreichen mindestens 4,5 zu 1. Die Textfarbe der Links,
                  ein tiefes Blau, kommt auf Weiß auf 7,7 zu 1. Die Sterne der Bewertung werden
                  nie als Text und nie als Link eingesetzt, weil ihr Farbton diesen Wert nicht
                  erreicht.
                </li>
                <li>
                  Jedes Eingabefeld hat eine sichtbare Beschriftung. Ein Platzhaltertext ersetzt
                  keine Beschriftung.
                </li>
                <li>
                  Bedienelemente sind mindestens 44 mal 44 Pixel groß.
                </li>
                <li>
                  Tabellen haben Spalten- und Zeilenüberschriften sowie eine Beschriftung.
                </li>
                <li>
                  Bewegung findet nur statt, wenn das Betriebssystem keine reduzierte Bewegung
                  verlangt. Es gibt kein automatisches Abspielen, kein Parallaxenbild und keine
                  Übernahme des Bildlaufs.
                </li>
                <li>
                  Die Seite bleibt bis zu einer Vergrößerung von 200 Prozent nutzbar, ohne dass
                  waagerecht gescrollt werden muss.
                </li>
                <li>
                  Die Sprache ist im Dokument als Deutsch ausgezeichnet, damit
                  Bildschirmleseprogramme die richtige Aussprache wählen.
                </li>
              </ul>

              <h2>Bekannte Einschränkungen</h2>
              <p>
                Wir nennen hier, was wir selbst gefunden haben. Eine Liste ohne Eintrag wäre
                unglaubwürdig.
              </p>
              <ul>
                <li>
                  <strong>Der Korallton der Akzentfarbe.</strong> Er erreicht auf Weiß 3,3 zu 1
                  und bleibt damit unter dem Zielwert von 4,5 zu 1 für kleine Schrift. Wir setzen
                  ihn deshalb nur für Auszeichnungen ein, deren Inhalt daneben noch einmal im
                  Fließtext steht, etwa für die Nummer eines Abschnitts. Eine Information geht
                  nicht verloren, wenn dieser Ton schlecht lesbar ist. Wir prüfen derzeit einen
                  dunkleren Ton für dieselben Stellen.
                </li>
                <li>
                  <strong>Breite Vergleichstabellen.</strong> Die Gegenüberstellung zweier Produkte
                  und die Prüfliste zu deutschen Pflichten sind auf schmalen Bildschirmen waagerecht
                  scrollbar. Inhaltlich ist alles erreichbar, die Bedienung ist auf einem Telefon
                  aber unbequem. Wir arbeiten an einer gestapelten Darstellung.
                </li>
                <li>
                  <strong>Logos der Anbieter.</strong> Diese Bilddateien stammen von den
                  Herstellern. Sie sind als schmückend ausgezeichnet, weil der Produktname
                  unmittelbar daneben steht. In einzelnen Fällen kann der Kontrast eines fremden
                  Logos unter dem Zielwert liegen; darauf haben wir keinen Einfluss.
                </li>
                <li>
                  <strong>Keine externe Prüfung.</strong> Diese Erklärung beruht auf einer
                  Selbstbewertung. Eine Prüfung durch eine unabhängige Stelle ist für 2027
                  vorgesehen.
                </li>
              </ul>

              <h2>Womit wir getestet haben</h2>
              <p>
                Tastaturbedienung ohne Maus, Bildschirmvergrößerung auf 200 und 400 Prozent, die
                Bildschirmleseprogramme NVDA unter Windows und VoiceOver unter macOS, sowie die
                Darstellung bei abgeschalteten Farben. Geprüft wurde in Firefox, Chrome und Safari.
              </p>

              <h2>Barriere melden</h2>
              <p>
                Wenn Ihnen etwas auffällt, das Sie an der Nutzung hindert, schreiben Sie uns. Bitte
                nennen Sie die betroffene Seite, was Sie tun wollten und womit Sie die Seite
                bedienen. Wir antworten innerhalb von zwei Wochen und nennen, bis wann wir die
                Barriere beseitigen.
              </p>
              <p>
                Wenn Sie mit unserer Antwort nicht zufrieden sind oder keine erhalten, können Sie
                sich an die zuständige Marktüberwachungsbehörde wenden. Zuständig ist die
                Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und
                Dienstleistungen bei der Landschaftsverband Rheinland, Zentrum für Barrierefreiheit.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <div className="flex flex-col gap-5">
                <Card className="p-5">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Auf einen Blick</h2>
                  <DataRows
                    className="mt-4"
                    rows={[
                      { label: "Zielniveau", value: "WCAG 2.2, Stufe AA" },
                      { label: "Bewertung", value: "Selbstbewertung" },
                      {
                        label: "Erstellt am",
                        value: (
                          <time data-numeric dateTime="2026-09-01">
                            01.09.2026
                          </time>
                        ),
                      },
                      {
                        label: "Zuletzt geprüft",
                        value: (
                          <time data-numeric dateTime="2026-09-01">
                            01.09.2026
                          </time>
                        ),
                      },
                      { label: "Externe Prüfung", value: "für 2027 vorgesehen" },
                    ]}
                  />
                </Card>

                <Card className="p-5">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Rückmeldung</h2>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
                    Am schnellsten erreichen Sie uns per E-Mail:
                  </p>
                  <p className="mt-2 text-[14px]">
                    <a href={`mailto:${siteSettings.operator.email}`} className="link-red">
                      {siteSettings.operator.email}
                    </a>
                  </p>
                  <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
                    Oder über das{" "}
                    <Link href="/kontakt-zur-redaktion" className="link-red">
                      Kontaktformular
                    </Link>
                    .
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
