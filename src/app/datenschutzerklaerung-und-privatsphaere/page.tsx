import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { PageHeader, DataRows } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Welche Daten wir verarbeiten, auf welcher Rechtsgrundlage, wie lange wir sie speichern und welche Rechte Sie haben. Ohne Analysewerkzeug, ohne Werbenetzwerk, ohne Drittlandübermittlung.",
  alternates: { canonical: "/datenschutzerklaerung-und-privatsphaere" },
};

const { operator, supervisoryAuthority, privacyPolicyVersion } = siteSettings;

const SECTIONS = [
  ["verantwortlicher", "Verantwortlicher"],
  ["ueberblick", "Überblick"],
  ["aufruf", "Aufruf dieser Website"],
  ["einwilligung", "Einwilligungsbanner"],
  ["suche", "Suchfunktion"],
  ["kontakt", "Kontaktaufnahme"],
  ["newsletter", "Newsletter"],
  ["bewertungen", "Bewertungen"],
  ["weiterleitung", "Links zu Anbietern"],
  ["schriften", "Schriften und externe Inhalte"],
  ["hosting", "Hosting und Empfänger"],
  ["pflicht", "Bereitstellung und automatisierte Entscheidungen"],
  ["rechte", "Ihre Rechte"],
  ["aenderungen", "Änderungen"],
] as const;

/* Eine Verarbeitung, die es noch nicht gibt, wird als solche gekennzeichnet.
   Eine Erklärung, die mehr beschreibt als tatsächlich geschieht, ist nach
   Art. 5 Abs. 1 lit. a DSGVO genauso fehlerhaft wie eine, die zu wenig nennt. */
function NochNicht({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 mr-2 inline-flex items-center rounded-[6px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-2 py-[3px] align-middle text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
      {children}
    </span>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Datenschutz", href: "/datenschutzerklaerung-und-privatsphaere" }]}
        micro="Datenschutz"
        title="Datenschutzerklärung"
        lede="Informationen nach Art. 13 DSGVO. Wir nennen zu jeder Verarbeitung den Zweck, die Rechtsgrundlage und die Speicherdauer. Verarbeitungen, die wir noch nicht aufgenommen haben, sind ausdrücklich als solche gekennzeichnet."
        meta={
          <p className="text-[13px] text-[var(--color-ink-3)]">
            Fassung vom{" "}
            <time data-numeric dateTime={privacyPolicyVersion}>
              01.09.2026
            </time>
            .
          </p>
        }
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
            <div className="prose-editorial">
              <h2 id="verantwortlicher">Verantwortlicher</h2>
              <p>
                Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im
                Sinne des Art. 4 Nr. 7 DSGVO ist:
              </p>
              <p>
                {operator.company}
                <br />
                {operator.street}
                <br />
                {operator.zip} {operator.city}
                <br />
                {operator.country}
                <br />
                E-Mail: <a href={`mailto:${operator.email}`}>{operator.email}</a>
              </p>
              <p>
                Einen Datenschutzbeauftragten haben wir nicht bestellt, weil die Voraussetzungen des
                § 38 BDSG bei uns nicht vorliegen. Anfragen zum Datenschutz richten Sie an die oben
                genannte Adresse.
              </p>

              <h2 id="ueberblick">Überblick</h2>
              <p>
                Wir verarbeiten so wenige Daten wie möglich. Diese Website bindet kein
                Analysewerkzeug ein, kein Werbenetzwerk, keine Schriftarten von fremden Servern,
                keine Karten, keine eingebetteten Videos und keine Schaltflächen sozialer
                Netzwerke. Für Besucherinnen und Besucher gibt es weder ein Nutzerkonto noch eine
                Anmeldung; die Zugänge zum internen Redaktionsbereich werden von Hand angelegt und
                stehen nicht zur Registrierung offen.
              </p>
              <p>
                Daraus folgt: Wir bilden kein Nutzerprofil, wir setzen keine Wiedererkennungsmerkmale
                über Seitenaufrufe hinweg und wir geben keine Daten zu Werbezwecken an Dritte weiter.
                Eine Übermittlung in ein Land außerhalb der Europäischen Union findet nicht statt.
              </p>
              <p>
                Die Daten, die uns erreichen, sind die Serverprotokolle beim Seitenaufruf, Ihre
                Eingabe in der Suchfunktion und das, was Sie uns von sich aus über ein Formular
                mitteilen: eine Kontaktnachricht, eine Newsletter-Anmeldung oder eine Bewertung.
                Alles Weitere steht im Einzelnen unten.
              </p>
              <p>
                Wo wir zur Abwehr von Missbrauch erkennen müssen, ob mehrere Einsendungen vom
                selben Anschluss stammen, speichern wir nicht Ihre IP-Adresse, sondern einen mit
                einem geheimen Zusatzwert gesalzenen Hashwert. Ein reiner Hashwert einer
                IPv4-Adresse wäre in Sekunden zurückzurechnen; erst der geheime Zusatz macht daraus
                eine wirksame Pseudonymisierung. Ihre IP-Adresse selbst wird an keiner Stelle
                dieser Anwendung gespeichert.
              </p>

              <h2 id="aufruf">Aufruf dieser Website</h2>
              <p>
                Beim Aufruf einer Seite überträgt Ihr Browser technisch notwendige Daten an den
                Server, auf dem diese Website liegt. Unser Hosting-Dienstleister speichert diese in
                einer Protokolldatei: abgerufene Adresse, Zeitpunkt, übertragene Datenmenge,
                Statusmeldung, verweisende Seite, Browsertyp und Betriebssystem sowie die
                IP-Adresse.
              </p>
              <p>
                <strong>Zweck:</strong> Auslieferung der Seite, Erkennung und Abwehr von Angriffen,
                Fehlersuche.
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
                Interesse ist der sichere und stabile Betrieb dieser Website.
                <br />
                <strong>Speicherdauer:</strong> Die Protokolle werden nach den Vorgaben unseres
                Hosting-Dienstleisters kurzfristig gelöscht, spätestens nach 30 Tagen.
              </p>
              <p>
                Wir werten diese Protokolle nicht aus, um einzelne Personen wiederzuerkennen, und
                führen sie mit keiner anderen Datenquelle zusammen.
              </p>

              <h2 id="einwilligung">Einwilligungsbanner</h2>
              <p>
                Wenn Sie im Einwilligungsbanner entscheiden, legt die Website Ihre Entscheidung im
                lokalen Speicher Ihres Browsers ab, unter der Bezeichnung <code>pm-consent</code>.
                Gespeichert werden Ihre Auswahl, die Fassung dieser Erklärung und der Zeitpunkt.
              </p>
              <p>
                Dieser Eintrag steuert allein Ihren Browser: Er verhindert, dass Sie bei jedem
                Aufruf erneut gefragt werden. Er wird nicht ausgelesen und zu keinem anderen Zweck
                verwendet.
              </p>
              <p>
                Zusätzlich vermerken wir Ihre Entscheidung auf unserem Server, weil § 25 TDDDG von
                uns verlangt, eine erteilte Einwilligung nachweisen zu können. Gespeichert werden
                eine zufällige, in Ihrem Browser erzeugte Kennung dieser Entscheidung, Ihre
                Auswahl, ob Sie erteilt, abgelehnt, geändert oder widerrufen haben, die Fassung
                dieser Erklärung, der Zeitpunkt und ein gesalzener Hashwert Ihrer IP-Adresse. Die
                Kennung bezeichnet eine Entscheidung, keine Person, und wird für nichts anderes
                verwendet. Ein Widerruf wird genauso festgehalten wie eine Erteilung, weil ein
                Widerruf, den niemand protokolliert, ebenso wenig belegbar wäre.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG für den Speicherzugriff,
                da er für den von Ihnen gewünschten Dienst unbedingt erforderlich ist; für den
                Nachweis Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit Art. 7 Abs. 1 DSGVO.
                <br />
                <strong>Speicherdauer:</strong> Der Eintrag in Ihrem Browser, bis Sie ihn löschen
                oder eine neue Fassung dieser Erklärung erscheint. Der Nachweis auf unserem Server
                36 Monate, danach automatische Löschung.
              </p>
              <p>
                Ihre Entscheidung ändern Sie jederzeit über den Link „Cookie-Einstellungen“ im
                Fußbereich. Der Widerruf ist so einfach wie die Erteilung, wie es Art. 7 Abs. 3
                DSGVO verlangt. Die vollständige Liste der Speicherzugriffe steht in der{" "}
                <Link href="/cookie-richtlinie-und-einstellungen">Cookie-Richtlinie</Link>.
              </p>

              <h2 id="suche">Suchfunktion</h2>
              <p>
                Wenn Sie die Suche benutzen, wird Ihr Suchbegriff an unseren Server übertragen und
                dort gegen den Bestand abgeglichen. Der Begriff wird ausschließlich für die Dauer
                der Anfrage verarbeitet, um Ihnen die Treffer zurückzugeben.
              </p>
              <p>
                <strong>Zweck:</strong> Beantwortung Ihrer Suchanfrage.
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse
                an einer benutzbaren Website.
                <br />
                <strong>Speicherdauer:</strong> Keine gesonderte Speicherung. Der Begriff erscheint
                allenfalls in der oben genannten Protokolldatei und wird mit dieser gelöscht.
              </p>

              <h2 id="kontakt">Kontaktaufnahme</h2>
              <p>
                Wenn Sie das Formular auf der Seite <Link href="/kontakt-zur-redaktion">Kontakt</Link> absenden,
                übertragen Sie uns Ihren Namen, Ihre E-Mail-Adresse, das gewählte Thema und den
                Text Ihrer Nachricht. Diese Angaben speichern wir in unserer Datenbank in
                Frankfurt am Main, damit die Redaktion Ihr Anliegen bearbeiten kann.
              </p>
              <p>
                Zusätzlich speichern wir zu jeder Einsendung einen mit einem geheimen Zusatzwert
                gesalzenen Hashwert Ihrer IP-Adresse sowie Ihre Browserkennung. Der Hashwert dient
                ausschließlich dazu, massenhafte automatisierte Einsendungen zu erkennen und
                abzuwehren. Ihre IP-Adresse selbst wird zu keinem Zeitpunkt gespeichert, und aus
                dem Hashwert lässt sie sich ohne den geheimen Zusatzwert nicht zurückrechnen.
              </p>
              <p>
                <strong>Zweck:</strong> Bearbeitung und Beantwortung Ihres Anliegens sowie Abwehr
                missbräuchlicher Einsendungen.
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen
                Anfragen, im Übrigen Art. 6 Abs. 1 lit. f DSGVO mit dem berechtigten Interesse an
                der Beantwortung einer an uns gerichteten Anfrage und am Schutz unserer Systeme.
                <br />
                <strong>Speicherdauer:</strong> Spätestens 24 Monate nach Eingang. Die Löschung
                erfolgt automatisch durch einen täglich laufenden Vorgang in der Datenbank.
                Gesetzliche Aufbewahrungspflichten, etwa aus § 257 HGB oder § 147 AO, bleiben
                unberührt.
              </p>

              <h2 id="newsletter">Newsletter</h2>
              <p>
                Die Anmeldung erfolgt im Double-Opt-in-Verfahren: Sie tragen Ihre Adresse ein,
                erhalten eine E-Mail mit einem Bestätigungslink und werden erst nach Ihrem Klick
                eingetragen. Ohne diese Bestätigung versenden wir nichts.
              </p>
              <p>
                Gespeichert werden Ihre E-Mail-Adresse, die Zeitpunkte von Anmeldung und
                Bestätigung sowie ein gesalzener Hashwert Ihrer IP-Adresse. Der
                Bestätigungszeitpunkt ist der Nachweis Ihrer Einwilligung nach Art. 7 Abs. 1 DSGVO;
                ohne ihn könnten wir die Einwilligung im Streitfall nicht belegen.
              </p>
              <p>
                <strong>Zweck:</strong> Versand des Newsletters und Nachweis der Einwilligung.
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO.
                <br />
                <strong>Widerruf:</strong> Jederzeit mit einem Klick über den Abmeldelink in jeder
                E-Mail oder über die Seite{" "}
                <Link href="/software-newsletter-anmelden/newsletter-abmelden">Newsletter abbestellen</Link>. Eine Anmeldung
                oder Begründung ist dafür nicht erforderlich.
                <br />
                <strong>Speicherdauer:</strong> Bis zum Widerruf. Eine Anmeldung, die Sie nicht
                bestätigen, löschen wir automatisch nach 30 Tagen, weil für ihre weitere
                Speicherung keine Rechtsgrundlage bestünde. Nach einer Abmeldung führen wir Ihre
                Adresse in einer Sperrliste, damit sie nicht versehentlich erneut eingetragen wird;
                diese Liste enthält ausschließlich die Adresse und das Datum.
              </p>

              <h2 id="bewertungen">Bewertungen</h2>
              <p>
                Wenn Sie eine Bewertung einreichen, verarbeiten wir die von Ihnen gemachten
                Angaben. <strong>Veröffentlicht</strong> werden nach der Prüfung Ihr Name, Ihre
                Rolle, Betrieb, Branche und Betriebsgröße, die Nutzungsdauer, Ihre Noten und Ihre
                Texte. <strong>Nicht veröffentlicht</strong> werden Ihre E-Mail-Adresse, die wir
                ausschließlich für Rückfragen im Prüfverfahren verwenden, und der gesalzene
                Hashwert Ihrer IP-Adresse, an dem wir Mehrfacheinreichungen erkennen. Ihre
                IP-Adresse selbst speichern wir nicht.
              </p>
              <p>
                <strong>Zweck:</strong> Prüfung und Veröffentlichung der Bewertung, Rückfragen zum
                Inhalt und Erkennung von Mehrfacheinreichungen.
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO für die
                Veröffentlichung der von Ihnen zu diesem Zweck eingereichten Angaben, im Übrigen
                Art. 6 Abs. 1 lit. f DSGVO mit dem berechtigten Interesse an der Echtheit
                veröffentlichter Bewertungen.
                <br />
                <strong>Speicherdauer:</strong> Solange die Bewertung veröffentlicht ist. Sie
                können Änderung oder Löschung jederzeit über die{" "}
                <Link href="/kontakt-zur-redaktion">Redaktionsadresse</Link> verlangen. Wie eine Bewertung
                geprüft und gekennzeichnet wird, steht in den{" "}
                <Link href="/redaktionelle-richtlinien-und-pruefprozess">Redaktionsrichtlinien</Link>.
              </p>

              <h2 id="weiterleitung">Links zu Anbietern</h2>
              <p>
                Für ein Produkt, zu dem keine Provisionsvereinbarung besteht, ist der Link zur
                Herstellerseite ein gewöhnlicher Verweis. Wir zählen den Klick nicht, wir leiten
                nicht über einen Zwischenserver um, und wir setzen kein Wiedererkennungsmerkmal.
                Ein solcher Klick löst bei uns keine Verarbeitung aus. Derzeit trifft das auf alle
                im Bestand geführten Produkte zu.
              </p>
              <p>
                Für ein Produkt mit Provisionsvereinbarung führt der als Werbung gekennzeichnete
                Link über unseren eigenen Server, damit wir zählen können, wie oft er benutzt wird.
                Gespeichert werden dabei das Produkt, der Pfad der Seite, von der Sie kamen, und
                ein gesalzener Hashwert Ihrer IP-Adresse. Es wird kein Cookie gesetzt und kein
                Wiedererkennungsmerkmal vergeben, und Ihre IP-Adresse selbst wird nicht
                gespeichert.
              </p>
              <p>
                <strong>Zweck:</strong> Messung der Nutzung von Werbelinks zur Prüfung der
                Wirtschaftlichkeit des Angebots.
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO mit dem berechtigten
                Interesse an einer Reichweitenmessung der eigenen Werbelinks.
                <br />
                <strong>Speicherdauer:</strong> 14 Monate, danach automatische Löschung.
              </p>
              <p>
                Auf der Zielseite gilt ausschließlich die Datenschutzerklärung des jeweiligen
                Anbieters. Manche Anbieter setzen unmittelbar nach dem Aufruf eigene Kennungen.
                Darauf haben wir keinen Einfluss.
              </p>
              <p>
                <NochNicht>Künftig möglich</NochNicht>
                Nehmen wir später ein Vermittlungsprogramm auf, kann der Aufruf eines
                gekennzeichneten Links eine Kennung des jeweiligen Partnerprogramms auslösen. Wir
                würden das vorher an dieser Stelle beschreiben und den betreffenden Anbieter im{" "}
                <Link href="/transparenz-zu-affiliate-links">Affiliate-Hinweis</Link> namentlich nennen.
              </p>

              <h2 id="schriften">Schriften und externe Inhalte</h2>
              <p>
                Die verwendeten Schriften Inter und Inter Tight werden beim Erstellen der Seiten
                mitgeliefert und von demselben Server ausgeliefert wie die Website. Es besteht keine
                Verbindung zu Servern von Google, und es werden keine Daten dorthin übertragen.
              </p>
              <p>
                Wir binden keine Videos, keine Kartendienste, keine Schriftdienste und keine
                Schaltflächen sozialer Netzwerke ein.
              </p>

              <h2 id="hosting">Hosting und Empfänger</h2>
              <p>
                Diese Website wird bei einem Dienstleister innerhalb der Europäischen Union
                gehostet. Der Dienstleister verarbeitet die oben genannten Protokolldaten
                ausschließlich in unserem Auftrag und nach unseren Weisungen. Mit ihm besteht ein
                Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO.
              </p>
              <p>
                Die Datenbank, in der Kontaktnachrichten, Newsletter-Anmeldungen, Bewertungen und
                Einwilligungsnachweise liegen, wird von Supabase betrieben. Der Serverstandort ist
                Frankfurt am Main. Auch hier besteht ein Vertrag über die Auftragsverarbeitung nach
                Art. 28 DSGVO. Die Wahl des Standorts ist bewusst: Ein Server außerhalb der
                Europäischen Union wäre eine Übermittlung in ein Drittland und müsste an dieser
                Stelle offengelegt und gerechtfertigt werden.
              </p>
              <p>
                Für den Versand der Bestätigungs-E-Mail zum Newsletter setzen wir einen
                Versanddienstleister ein, der zu diesem Zweck Ihre E-Mail-Adresse erhält.
              </p>
              <p>
                Weitere Empfänger gibt es nicht. Insbesondere geben wir keine Daten an
                Werbetreibende, an Analysedienste oder an Softwareanbieter weiter. Eine Übermittlung
                in ein Drittland nach Kapitel V der DSGVO findet nicht statt.
              </p>

              <h2 id="pflicht">Bereitstellung und automatisierte Entscheidungen</h2>
              <p>
                Sie sind weder gesetzlich noch vertraglich verpflichtet, uns personenbezogene Daten
                bereitzustellen. Die Website lässt sich vollständig lesen, ohne dass Sie etwas von
                sich preisgeben. Verzichten Sie auf eine Kontaktaufnahme, entsteht Ihnen allein der
                Nachteil, dass wir Ihr Anliegen nicht beantworten können.
              </p>
              <p>
                Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22 Abs.
                1 und 4 DSGVO findet nicht statt.
              </p>

              <h2 id="rechte">Ihre Rechte</h2>
              <p>Ihnen stehen gegenüber uns die folgenden Rechte zu:</p>
              <ul>
                <li>
                  <strong>Auskunft</strong> nach Art. 15 DSGVO darüber, ob und welche Daten wir zu
                  Ihnen verarbeiten
                </li>
                <li>
                  <strong>Berichtigung</strong> unrichtiger Daten nach Art. 16 DSGVO
                </li>
                <li>
                  <strong>Löschung</strong> nach Art. 17 DSGVO, soweit keine gesetzliche
                  Aufbewahrungspflicht entgegensteht
                </li>
                <li>
                  <strong>Einschränkung der Verarbeitung</strong> nach Art. 18 DSGVO
                </li>
                <li>
                  <strong>Datenübertragbarkeit</strong> nach Art. 20 DSGVO
                </li>
                <li>
                  <strong>Widerspruch</strong> nach Art. 21 DSGVO gegen Verarbeitungen, die auf
                  einem berechtigten Interesse beruhen
                </li>
                <li>
                  <strong>Widerruf einer Einwilligung</strong> nach Art. 7 Abs. 3 DSGVO mit Wirkung
                  für die Zukunft
                </li>
              </ul>
              <p>
                Wenden Sie sich dafür formlos an{" "}
                <a href={`mailto:${operator.email}`}>{operator.email}</a> oder nutzen Sie das{" "}
                <Link href="/kontakt-zur-redaktion">Kontaktformular</Link>. Wir antworten innerhalb der Frist des
                Art. 12 Abs. 3 DSGVO, also innerhalb eines Monats nach Eingang.
              </p>
              <p>
                Unabhängig davon steht Ihnen nach Art. 77 DSGVO ein Beschwerderecht bei einer
                Aufsichtsbehörde zu. Sie können sich an die Behörde Ihres Aufenthaltsorts wenden
                oder an die für uns zuständige:
              </p>
              <p>
                {supervisoryAuthority.name}
                <br />
                {supervisoryAuthority.address}
              </p>

              <h2 id="aenderungen">Änderungen dieser Erklärung</h2>
              <p>
                Wir passen diese Erklärung an, wenn sich unsere Verarbeitung ändert oder die
                Rechtslage es erfordert. Das betrifft insbesondere die oben als noch nicht in
                Betrieb gekennzeichneten Abschnitte: Sie werden fortgeschrieben, bevor die jeweilige
                Verarbeitung aufgenommen wird, nicht danach.
              </p>
              <p>
                Die jeweils geltende Fassung ist oben mit Datum gekennzeichnet. Bei wesentlichen
                Änderungen holen wir eine neue Einwilligung ein, soweit die Verarbeitung darauf
                beruht.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <nav aria-labelledby="ds-inhalt">
                <h2
                  id="ds-inhalt"
                  className="t-micro border-b border-[var(--color-rule)] pb-3 text-[var(--color-ink-3)]"
                >
                  Inhalt
                </h2>
                <ol className="mt-4 flex flex-col gap-2">
                  {SECTIONS.map(([id, label]) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block text-[13.5px] leading-[1.5] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-red)]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <Card className="mt-6 p-5">
                <h2 className="t-micro text-[var(--color-ink-3)]">Was uns erreicht</h2>
                <DataRows
                  className="mt-4"
                  rows={[
                    { label: "Serverprotokolle", value: "max. 30 Tage" },
                    { label: "Suchbegriff", value: "nur zur Laufzeit" },
                    { label: "Kontaktnachricht", value: "24 Monate" },
                    { label: "Einwilligung", value: "36 Monate" },
                    { label: "Newsletter", value: "bis zum Widerruf" },
                    { label: "Werbelink-Klick", value: "14 Monate" },
                    { label: "IP-Adresse", value: "nur als Hashwert" },
                    { label: "Analysewerkzeug", value: "keines" },
                    { label: "Serverstandort", value: "Frankfurt am Main" },
                    { label: "Drittlandtransfer", value: "keiner" },
                  ]}
                />
                <p className="mt-4 text-[12.5px] leading-[1.6] text-[var(--color-ink-3)]">
                  Die Löschfristen sind keine Absichtserklärung: Ein täglich laufender Vorgang in
                  der Datenbank löscht die betroffenen Zeilen automatisch.
                </p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
