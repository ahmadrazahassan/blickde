import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { PageHeader, ProseSection } from "@/components/ui/page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nutzungsbedingungen",
  description:
    "Regeln für die Nutzung dieser Website, für das Einreichen von Bewertungen und die Grenzen unserer Haftung.",
  alternates: { canonical: "/nutzungsbedingungen-der-website" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Nutzungsbedingungen", href: "/nutzungsbedingungen-der-website" }]}
        micro="Nutzungsbedingungen"
        title="Regeln für die Nutzung"
        lede="Kurz gefasst: Lesen kostet nichts und verlangt nichts. Wer eine Bewertung einreicht, sagt die Wahrheit. Und unsere Angaben ersetzen keine Beratung."
        meta={
          <p className="text-[13px] text-[var(--color-ink-3)]">
            Fassung vom{" "}
            <time data-numeric dateTime="2026-09-01">
              01.09.2026
            </time>
            . Betreiber: {siteSettings.operator.company}.
          </p>
        }
      />

      <ProseSection>
        <h2>1. Geltungsbereich</h2>
        <p>
          Diese Bedingungen gelten für die Nutzung der Website {siteSettings.domain} und aller
          darüber angebotenen Funktionen. Mit dem Aufruf der Seite erkennen Sie sie an.
        </p>

        <h2>2. Leistung</h2>
        <p>
          Wir stellen redaktionell erstellte Informationen über Unternehmenssoftware bereit sowie
          Bewertungen, die von Nutzerinnen und Nutzern eingereicht und von uns geprüft wurden. Die
          Nutzung ist kostenlos. Ein Anspruch auf ständige Verfügbarkeit besteht nicht; wir dürfen
          den Betrieb für Wartungsarbeiten unterbrechen und einzelne Funktionen ändern oder
          einstellen.
        </p>

        <h2>3. Keine Beratung</h2>
        <p>
          Unsere Inhalte sind redaktionelle Information und keine steuerliche, rechtliche oder
          betriebswirtschaftliche Beratung. Sie ersetzen weder die Auskunft Ihrer Steuerkanzlei
          noch eine anwaltliche Prüfung. Entscheidungen über den Einsatz einer Software treffen Sie
          in eigener Verantwortung.
        </p>

        <h2>4. Richtigkeit der Angaben</h2>
        <p>
          Wir prüfen Angaben nach dem in den{" "}
          <Link href="/redaktionelle-richtlinien-und-pruefprozess">Redaktionsrichtlinien</Link> beschriebenen Verfahren
          und versehen sie mit dem Datum der Prüfung. Preise, Funktionsumfänge und
          Konformitätsangaben ändern sich, ohne dass wir davon erfahren. Maßgeblich sind stets die
          Angaben des Anbieters zum Zeitpunkt Ihres Vertragsschlusses.
        </p>
        <p>
          Wenn Ihnen ein Fehler auffällt, <Link href="/kontakt-zur-redaktion">melden Sie ihn uns</Link>. Wir
          prüfen nach und korrigieren mit Datum.
        </p>

        <h2>5. Bewertungen</h2>
        <p>Wer eine Bewertung einreicht, sichert zu:</p>
        <ul>
          <li>die bewertete Software selbst eingesetzt zu haben,</li>
          <li>weder beim Anbieter noch bei einem Wettbewerber beschäftigt oder als Vertriebspartner tätig zu sein,</li>
          <li>für die Bewertung keine Gegenleistung erhalten zu haben,</li>
          <li>keine Rechte Dritter zu verletzen, insbesondere keine Geschäftsgeheimnisse preiszugeben.</li>
        </ul>
        <p>
          Mit der Einreichung räumen Sie uns das einfache, zeitlich und räumlich unbeschränkte
          Recht ein, den Text auf dieser Website zu veröffentlichen, zu kürzen, wenn er gegen diese
          Regeln verstößt, und in Auszügen zu zitieren. Sie bleiben Urheber Ihres Textes.
        </p>
        <p>
          Wir dürfen eine Bewertung ablehnen oder nachträglich entfernen, wenn sie gegen diese
          Regeln verstößt, offensichtlich unwahre Tatsachenbehauptungen enthält, Beleidigungen
          enthält oder sich nicht auf die bewertete Software bezieht. Eine Begründung schulden wir
          nicht, geben sie aber auf Nachfrage.
        </p>
        <p>
          Sie können die Löschung Ihrer Bewertung jederzeit formlos verlangen. Wir löschen sie dann
          ohne Rückfrage.
        </p>

        <h2>6. Unzulässige Nutzung</h2>
        <p>Nicht gestattet sind insbesondere:</p>
        <ul>
          <li>automatisierte Abrufe in einem Umfang, der den Betrieb beeinträchtigt,</li>
          <li>das systematische Auslesen und Weiterverwenden unserer Datenbank,</li>
          <li>Versuche, Sicherheitsvorkehrungen zu umgehen,</li>
          <li>das Einreichen von Bewertungen unter falschem Namen oder in fremdem Auftrag.</li>
        </ul>

        <h2>7. Rechte an Inhalten</h2>
        <p>
          Die von uns erstellten Texte, Prüflisten, Zusammenstellungen und Grafiken sind
          urheberrechtlich geschützt. Eine Übernahme über das nach § 51 UrhG zulässige Zitat hinaus
          bedarf unserer Zustimmung. Für eine Quellenangabe mit Link brauchen Sie keine Zustimmung
          und wir freuen uns darüber.
        </p>
        <p>
          Produktnamen, Wortmarken und Logos der besprochenen Anbieter sind Eigentum der jeweiligen
          Rechteinhaber. Wir verwenden sie ausschließlich zur Kennzeichnung im Rahmen der
          Berichterstattung.
        </p>

        <h2>8. Links und Vermittlungsprovisionen</h2>
        <p>
          Unsere Seiten enthalten Links zu Websites von Anbietern. Für deren Inhalte ist der
          jeweilige Betreiber verantwortlich. Besteht mit einem Anbieter eine
          Vermittlungsvereinbarung, kann für uns eine Provision entstehen, wenn über einen
          entsprechend gekennzeichneten Link ein Vertrag zustande kommt. Für Sie ändert sich am
          Preis dadurch nichts. Welche Anbieter das betrifft und welche nicht, steht namentlich im{" "}
          <Link href="/transparenz-zu-affiliate-links">Affiliate-Hinweis</Link>. Auf Noten und Reihenfolge hat
          eine Provision keinen Einfluss.
        </p>

        <h2>9. Haftung</h2>
        <p>
          Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung von
          Leben, Körper und Gesundheit. Bei leicht fahrlässiger Verletzung einer Pflicht, deren
          Erfüllung die ordnungsgemäße Nutzung überhaupt erst ermöglicht und auf deren Einhaltung
          Sie vertrauen durften, haften wir der Höhe nach begrenzt auf den vorhersehbaren,
          vertragstypischen Schaden. Im Übrigen ist die Haftung ausgeschlossen.
        </p>
        <p>Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.</p>

        <h2>10. Änderungen dieser Bedingungen</h2>
        <p>
          Wir dürfen diese Bedingungen ändern, wenn sich die angebotenen Funktionen oder die
          Rechtslage ändern. Die jeweils geltende Fassung ist oben mit Datum gekennzeichnet und
          gilt ab dem Zeitpunkt der Veröffentlichung.
        </p>

        <h2>11. Anwendbares Recht und Gerichtsstand</h2>
        <p>
          Es gilt deutsches Recht. Ist der Nutzer Kaufmann, juristische Person des öffentlichen
          Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand{" "}
          {siteSettings.operator.city}. Gegenüber Verbrauchern gilt die gesetzliche Regelung.
        </p>

        <h2>12. Salvatorische Klausel</h2>
        <p>
          Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen
          unberührt.
        </p>
      </ProseSection>
    </>
  );
}
