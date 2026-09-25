import type { Metadata } from "next";
import Link from "next/link";

import { getReviewCorpusFacts } from "@/lib/queries";
import { formatDate, formatReviewCount } from "@/lib/format";
import { PageHeader, DataRows } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bewertungsmethodik",
  description:
    "Woher die Bewertungen auf Softwareblick stammen, über welchen Zeitraum sie erhoben wurden, wie sie geprüft werden und wie sich die Note berechnet.",
  alternates: { canonical: "/bewertungsmethodik-fuer-software" },
  /*
   * Bis der Herkunftsabschnitt geschrieben ist, steht die Seite nicht im
   * Index, nicht in der Sitemap und nicht im Fußbereich. Sie ist über die
   * Adresse erreichbar, damit sie fertiggestellt werden kann.
   *
   * Eine halbfertige Methodikseite ist schlechter als keine: sie lenkt die
   * Aufmerksamkeit genau auf die Frage, die sie noch nicht beantwortet.
   *
   * ZUM FREISCHALTEN: Herkunftsabschnitt unten ausfüllen, dann robots hier
   * entfernen, den Eintrag in src/app/sitemap.ts und den Link in
   * src/components/site/footer.tsx wieder aufnehmen.
   */
  robots: { index: false, follow: false },
};

/*
 * Diese Seite beschreibt das Verfahren hinter den Nutzerbewertungen.
 *
 * Die Zahlen darin werden zur Laufzeit aus der Datenbank gelesen und nicht
 * gepflegt. Eine Methodikseite, auf der eine veraltete Zahl steht, beschädigt
 * genau das Vertrauen, das sie herstellen soll.
 *
 * ACHTUNG, VOR DER VERÖFFENTLICHUNG AUSZUFÜLLEN: Die beiden mit TODO
 * markierten Absätze beschreiben die Herkunft des Bestands. Diese Angaben
 * kann nur der Betreiber machen. Sie müssen der Wahrheit entsprechen; eine
 * erfundene Erhebungsgeschichte wäre eine irreführende geschäftliche Handlung
 * nach § 5 UWG und schlimmer als gar keine Methodikseite.
 */

export default async function MethodologyPage() {
  const facts = await getReviewCorpusFacts();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Bewertungsmethodik", href: "/bewertungsmethodik-fuer-software" }]}
        micro="Verfahren"
        title="Wie die Bewertungen zustande kommen"
        lede="Woher die Erfahrungsberichte stammen, über welchen Zeitraum sie erhoben wurden, was wir prüfen und wie sich daraus eine Note ergibt. Vollständig, damit sich jede Zahl auf dieser Seite nachrechnen lässt."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
            <div className="prose-editorial">
              <h2 id="bestand">Der Bestand in Zahlen</h2>
              <p>
                Derzeit sind{" "}
                <strong>{formatReviewCount(facts.published)} Bewertungen</strong> zu{" "}
                <strong>{facts.products} Programmen</strong> veröffentlicht. Die älteste stammt vom{" "}
                {facts.oldest ? formatDate(facts.oldest) : "unbekannten Datum"}, die jüngste vom{" "}
                {facts.newest ? formatDate(facts.newest) : "unbekannten Datum"}.
              </p>
              <p>
                Die Bewertungen sind sehr ungleich über die Programme verteilt: auf das am
                häufigsten bewertete Programm kommen {facts.max} Berichte, auf das am seltensten
                bewertete {facts.min}. Das ist kein Mangel, sondern die erwartbare Form. Ein
                Buchhaltungsprogramm für Selbstständige wird von vielen Tausend Betrieben
                eingesetzt, eine ERP-Suite für den oberen Mittelstand von einigen Hundert. Ein
                Bestand, in dem jedes Programm gleich viele Bewertungen hätte, wäre ein Hinweis
                darauf, dass er nicht organisch entstanden ist.
              </p>

              <h2 id="herkunft">Woher die Bewertungen stammen</h2>
              {/* TODO(Betreiber): Diesen Absatz durch die tatsächliche
                  Erhebungsgeschichte ersetzen. Wenn der Bestand über ein
                  früheres Angebot erhoben wurde, gehören Name und Zeitraum
                  dieses Angebots hierher. Das erklärt sowohl den Umfang als
                  auch die Datumsspanne und die Angabe "4 Jahre". */}
              <p className="not-prose rounded-[8px] border border-dashed border-[var(--color-red)] bg-[var(--color-red-tint)] p-4 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
                <strong className="text-[var(--color-ink)]">Noch auszufüllen.</strong> Hier gehört
                die tatsächliche Erhebungsgeschichte hin: über welches Angebot und in welchem
                Zeitraum die Berichte gesammelt wurden, ob sie aus einem früheren Projekt
                übernommen wurden, und wie die Verfasserinnen und Verfasser gewonnen wurden. Diese
                Angabe kann nur der Betreiber machen. Ohne sie bleibt die Seite unvollständig, und
                eine erfundene Angabe wäre schlimmer als keine.
              </p>
              <p>
                Neue Bewertungen kommen seit der Umstellung ausschließlich über das Formular auf den
                Produktseiten herein. Jede Einsendung geht mit dem Status „in Prüfung“ in die
                Datenbank. Es gibt keinen technischen Weg, auf dem eine Bewertung ohne menschliche
                Entscheidung öffentlich wird.
              </p>

              <h2 id="pruefung">Was wir prüfen</h2>
              <p>
                Eine Bewertung darf nach § 5b Abs. 3 UWG nur erscheinen, wenn geprüft wurde, dass
                sie von einer Person stammt, die das Produkt tatsächlich eingesetzt hat. Wir prüfen
                dazu:
              </p>
              <ul>
                <li>
                  <strong>Nachvollziehbarkeit.</strong> Passen Rolle, Betriebsgröße, Branche und
                  beschriebene Nutzung zusammen? Werden konkrete Abläufe genannt oder nur
                  Adjektive?
                </li>
                <li>
                  <strong>Mehrfacheinsendung.</strong> Zu jeder über das Formular eingegangenen
                  Bewertung speichern wir einen gesalzenen Hashwert der IP-Adresse, niemals die
                  Adresse selbst. Mehrere Einsendungen zum selben Produkt aus derselben Quelle
                  werden der Moderation angezeigt.
                </li>
                <li>
                  <strong>Interessenkonflikt.</strong> Beiträge von Mitarbeitenden,
                  Vertriebspartnern oder Wettbewerbern des Anbieters veröffentlichen wir nicht.
                </li>
                <li>
                  <strong>Gegenleistung.</strong> Wer für eine Bewertung bezahlt wurde, wird nicht
                  veröffentlicht. Wir gewähren selbst keine Gegenleistung für Bewertungen.
                </li>
              </ul>

              <h2 id="nachweis">Belegte Nutzung</h2>
              <p>
                Wer den Einsatz freiwillig belegt, etwa mit einer Rechnung oder einem
                Vertragsauszug des Anbieters, erhält den Hinweis „Rechnung des Anbieters geprüft“ an
                der Bewertung.
              </p>
              <p>
                <strong>
                  Derzeit trägt keine der veröffentlichten Bewertungen diesen Hinweis.
                </strong>{" "}
                Das sagen wir ausdrücklich, weil es einen Unterschied macht: Der Hinweis wird nur
                gesetzt, wenn ein Beleg vorliegt, und nicht rückwirkend auf Bewertungen, für die
                kein Beleg da ist. Solange die Spalte leer ist, steht hier, dass sie leer ist.
              </p>

              <h2 id="note">Wie sich die Note berechnet</h2>
              <p>
                Die Note ist das arithmetische Mittel der Gesamtnoten aller veröffentlichten
                Bewertungen zu einem Programm, gerundet auf eine Dezimalstelle. Dasselbe gilt für
                die vier Teilnoten Bedienung, Preis-Leistung, Kundenbetreuung und Funktionsumfang.
              </p>
              <p>
                Die Berechnung läuft in der Datenbank, in einem Trigger, und nicht in der
                Anwendung. Es gibt kein Eingabefeld, über das jemand eine Note setzen könnte, und
                auch kein Administrationsformular dafür. Wird eine Bewertung freigegeben, abgelehnt
                oder gelöscht, rechnet die Datenbank die betroffenen Noten unmittelbar neu.
              </p>
              <p>
                Ein Programm ohne veröffentlichte Bewertung erhält keine geschätzte Note, sondern
                einen Strich. Entwicklungsdaten aus dem Aufbau der Seite sind als solche markiert,
                werden der Öffentlichkeit nicht ausgeliefert und fließen in keine Note ein.
              </p>

              <h2 id="reihenfolge">Reihenfolge und Finanzierung</h2>
              <p>
                Ranglisten sortieren nach Note und bei Gleichstand nach der Zahl der Bewertungen.
                Eine Provision verschiebt keine Position, verschafft keinen Eintrag und beeinflusst
                keine Note. Was das im Einzelnen bedeutet, steht im{" "}
                <Link href="/transparenz-zu-affiliate-links">Affiliate-Hinweis</Link>, die redaktionellen Regeln
                stehen in den <Link href="/redaktionelle-richtlinien-und-pruefprozess">Redaktionsrichtlinien</Link>.
              </p>

              <h2 id="korrektur">Korrekturen</h2>
              <p>
                Wenn Ihnen an einer Bewertung oder an einer Angabe etwas falsch erscheint, schreiben
                Sie uns über das <Link href="/kontakt-zur-redaktion">Kontaktformular</Link>. Wir prüfen jeden
                Hinweis nach und ändern einen Eintrag mit Änderungsdatum. Verfasserinnen und
                Verfasser können Änderung oder Löschung ihrer Bewertung jederzeit verlangen.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <Card className="p-5">
                <h2 className="t-micro text-[var(--color-ink-3)]">Der Bestand</h2>
                <DataRows
                  className="mt-4"
                  compact
                  rows={[
                    { label: "Bewertungen", value: formatReviewCount(facts.published) },
                    { label: "Programme", value: String(facts.products) },
                    {
                      label: "Zeitraum",
                      value:
                        facts.oldest && facts.newest
                          ? `${formatDate(facts.oldest)} bis ${formatDate(facts.newest)}`
                          : "offen",
                    },
                    { label: "Meiste je Programm", value: String(facts.max) },
                    { label: "Wenigste je Programm", value: String(facts.min) },
                    { label: "Mit Nutzungsbeleg", value: String(facts.verified) },
                    { label: "In Prüfung", value: String(facts.pending) },
                  ]}
                />
                <p className="mt-4 border-t border-[var(--color-rule)] pt-4 text-[12.5px] leading-[1.6] text-[var(--color-ink-3)]">
                  Diese Zahlen werden bei jedem Seitenaufruf aus der Datenbank gelesen. Sie sind
                  nicht von Hand gepflegt und können daher nicht veralten.
                </p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
