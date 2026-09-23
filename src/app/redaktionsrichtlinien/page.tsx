import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { PageHeader } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Redaktionsrichtlinien",
  description:
    "Wie eine Prüfung abläuft, wie eine Note entsteht, wie Bewertungen moderiert werden und wie wir Provisionen von der Bewertung trennen.",
  alternates: { canonical: "/redaktionsrichtlinien" },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Redaktionsrichtlinien", href: "/redaktionsrichtlinien" }]}
        micro="Redaktionsrichtlinien"
        title="Wie wir arbeiten"
        lede="Diese Seite beschreibt den tatsächlichen Ablauf, nicht eine Absichtserklärung. Wo wir an eine Grenze stoßen, steht das hier ebenfalls."
        meta={
          <p className="text-[13px] text-[var(--color-ink-3)]">
            Fassung vom 01.09.2026. Verantwortlich nach § 18 Abs. 2 MStV:{" "}
            {siteSettings.editorialResponsible.name}, {siteSettings.editorialResponsible.street},{" "}
            {siteSettings.editorialResponsible.zip} {siteSettings.editorialResponsible.city}.
          </p>
        }
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
            <div className="prose-editorial">
              <h2 id="aufnahme">1. Wie ein Produkt in den Bestand kommt</h2>
              <p>
                Wir nehmen ein Produkt auf, wenn es in Deutschland vertrieben wird, sich an
                Unternehmen richtet und in eine unserer Kategorien passt. Anbieter können ein
                Produkt vorschlagen; ein Anspruch auf Aufnahme entsteht daraus nicht, und Geld
                verschafft ihn auch nicht.
              </p>
              <p>
                Ein Produkt erscheint erst, wenn eine Person aus der Redaktion Preis, Funktionsumfang
                und die Angaben zu deutschen Pflichten durchgesehen hat. Ein Eintrag, der nur aus
                Herstellerangaben besteht, wäre in einer Stunde erstellt und hätte keinen Wert.
              </p>

              <h2 id="pruefung">2. Wie eine Prüfung abläuft</h2>
              <p>Jede Prüfung folgt denselben vier Schritten.</p>
              <ol>
                <li>
                  <strong>Angaben aufnehmen.</strong> Preisliste, Funktionsbeschreibung und
                  Konformitätsangaben aus öffentlich zugänglichen Quellen, jeweils mit dem Datum
                  der Erhebung.
                </li>
                <li>
                  <strong>Gegenprüfen.</strong> Soweit möglich im Produkt selbst, sonst in der
                  technischen Dokumentation oder durch schriftliche Rückfrage beim Anbieter.
                </li>
                <li>
                  <strong>Eintragen.</strong> Bestätigt als „ja“, widerlegt als „nein“, alles
                  Übrige als „nicht geprüft“.
                </li>
                <li>
                  <strong>Nachprüfen.</strong> Preise sehen wir mindestens halbjährlich erneut
                  durch, Angaben zu gesetzlichen Pflichten bei jeder relevanten Rechtsänderung.
                </li>
              </ol>

              <h2 id="drei-zustaende">3. Die drei Zustände, und warum sie getrennt bleiben</h2>
              <p>
                In unseren Prüflisten bedeutet ein Häkchen: Wir haben bestätigt, dass das Produkt
                dies leistet. Ein Strich bedeutet: Wir haben bestätigt, dass es dies nicht leistet.
                Ein Fragezeichen bedeutet: Wir haben es nicht geprüft.
              </p>
              <p>
                Diese Unterscheidung ist kein Formalismus. Würden wir „nicht geprüft“ als „nein“
                darstellen, veröffentlichten wir eine unwahre Tatsachenbehauptung über ein benanntes
                Unternehmen. Das wäre wettbewerbsrechtlich angreifbar und wäre vor allem falsch.
              </p>

              <h2 id="noten">4. Wie eine Note entsteht</h2>
              <p>
                Die Note ist der auf eine Nachkommastelle gerundete Durchschnitt der
                veröffentlichten Bewertungen in vier Dimensionen: Bedienung,
                Preis-Leistungs-Verhältnis, Kundenbetreuung und Funktionsumfang.
              </p>
              <p>
                Sie wird von der Datenbank berechnet, sobald eine Bewertung freigeschaltet, geändert
                oder gelöscht wird. Es gibt kein Eingabefeld, in das eine Redakteurin eine Note
                eintragen könnte. Das ist keine Selbstverpflichtung, sondern eine Eigenschaft des
                Systems.
              </p>
              <p>
                Ein Produkt ohne veröffentlichte Bewertung trägt keine Note. In der Oberfläche steht
                dann ein Strich. Wir setzen weder einen Schätzwert noch einen Kategoriedurchschnitt
                ein.
              </p>

              <h2 id="bewertungen">5. Wie Bewertungen moderiert werden</h2>
              <p>
                Jede eingereichte Bewertung wird von einer Person gelesen, bevor sie erscheint. Eine
                automatische Veröffentlichung gibt es nicht. In der Regel dauert die Prüfung zwei
                bis fünf Werktage.
              </p>
              <p>Geprüft wird auf:</p>
              <ul>
                <li>
                  Nachvollziehbarkeit: Passen Rolle, Betriebsgröße und beschriebene Nutzung
                  zusammen? Werden konkrete Abläufe genannt?
                </li>
                <li>
                  Mehrfacheinreichung: Zu jeder Einreichung wird ein gesalzener Hashwert der
                  IP-Adresse gespeichert, niemals die Adresse selbst. Mehrere Einreichungen zum
                  selben Produkt aus derselben Quelle fallen dabei auf und werden der Moderation
                  angezeigt.
                </li>
                <li>
                  Interessenkonflikt: Beiträge von Mitarbeitenden, Vertriebspartnern oder
                  Wettbewerbern des Anbieters veröffentlichen wir nicht.
                </li>
                <li>Gegenleistung: Wer für eine Bewertung bezahlt wurde, wird nicht veröffentlicht.</li>
              </ul>
              <p>
                Wer den Einsatz belegen möchte, kann eine Rechnung oder einen Vertragsauszug des
                Anbieters vorlegen. Die Bewertung trägt dann den Hinweis „Rechnung des Anbieters
                geprüft“. Das ist freiwillig und kein Nachteil, wenn es unterbleibt.
              </p>
              <p>
                Diese Angaben erfüllen unsere Informationspflicht nach § 5b Abs. 3 UWG. Wir
                beschreiben hier bewusst den konkreten Ablauf, weil eine allgemein gehaltene Zusage
                schlechter ist als gar keine: Sie lässt sich widerlegen.
              </p>

              <h2 id="anbieterantworten">6. Antworten der Anbieter</h2>
              <p>
                Anbieter dürfen auf eine veröffentlichte Bewertung antworten. Die Antwort erscheint
                sichtbar als solche gekennzeichnet unter der Bewertung. Wir kürzen sie nicht und
                verändern sie nicht, und wir löschen die zugrunde liegende Bewertung nicht, weil
                eine Antwort vorliegt.
              </p>

              <h2 id="trennung">7. Trennung von Werbung und Redaktion</h2>
              <p>
                Derzeit bestehen keine aktiven Vermittlungsvereinbarungen. Künftige vergütete Links
                werden vor dem Klick mit dem Wort Werbung gekennzeichnet.
              </p>
              <p>
                Auf Note, Reihenfolge und Aufnahme in den Bestand hat eine solche Vereinbarung
                keinen Einfluss. Die Reihenfolge einer Rangliste ergibt sich aus der berechneten
                Note und bei Gleichstand aus der Zahl der Bewertungen. Einzelheiten stehen im{" "}
                <Link href="/affiliate-hinweis">Affiliate-Hinweis</Link>.
              </p>

              <h2 id="korrekturen">8. Korrekturen</h2>
              <p>
                Wenn wir etwas falsch dargestellt haben, korrigieren wir es und vermerken das Datum
                der Änderung am Eintrag. Bei wesentlichen inhaltlichen Korrekturen an einem
                Ratgeberbeitrag weisen wir zusätzlich im Text darauf hin.
              </p>
              <p>
                Korrekturwünsche von Anbietern behandeln wir wie alle anderen: Wer eine überprüfbare
                Quelle nennt, bekommt eine Korrektur. Wer eine günstigere Darstellung ohne neue
                Fakten wünscht, bekommt sie nicht.
              </p>

              <h2 id="grenzen">9. Wo unsere Prüfung endet</h2>
              <p>
                Wir sind eine kleine Redaktion und keine Prüfungsgesellschaft. Wir testieren keine
                GoBD-Konformität und führen keine technischen Sicherheitsprüfungen durch. Wenn wir
                ein GoBD-Testat nennen, geben wir wieder, was der Anbieter angegeben hat, und
                schreiben dazu, ob wir Prüfer und Jahr verifizieren konnten.
              </p>
              <p>
                Unsere Beiträge ersetzen keine steuerliche oder rechtliche Beratung. Für Ihren
                konkreten Fall fragen Sie Ihre Steuerkanzlei.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <nav aria-labelledby="richtlinien-inhalt">
                <h2
                  id="richtlinien-inhalt"
                  className="t-micro border-b border-[var(--color-rule)] pb-3 text-[var(--color-ink-3)]"
                >
                  Inhalt
                </h2>
                <ol className="mt-4 flex flex-col gap-2.5">
                  {[
                    ["aufnahme", "Aufnahme in den Bestand"],
                    ["pruefung", "Ablauf einer Prüfung"],
                    ["drei-zustaende", "Die drei Zustände"],
                    ["noten", "Wie eine Note entsteht"],
                    ["bewertungen", "Moderation der Bewertungen"],
                    ["anbieterantworten", "Antworten der Anbieter"],
                    ["trennung", "Werbung und Redaktion"],
                    ["korrekturen", "Korrekturen"],
                    ["grenzen", "Grenzen unserer Prüfung"],
                  ].map(([id, label], index) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="flex items-baseline gap-2.5 text-[14px] leading-[1.5] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-red)]"
                      >
                        <span data-numeric className="text-[12.5px] text-[var(--color-ink-4)]">
                          {index + 1}
                        </span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <Card className="mt-6 p-5">
                <h2 className="t-micro text-[var(--color-ink-3)]">Fehler gefunden?</h2>
                <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
                  Schreiben Sie uns mit Produktname, betroffener Angabe und möglichst einer Quelle.
                  Wir prüfen nach und korrigieren mit Datum.
                </p>
                <Link
                  href="/kontakt"
                  className="mt-3 inline-flex text-[13.5px] text-[var(--color-red)] underline underline-offset-[3px]"
                >
                  Korrektur melden
                </Link>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
