import type { Article } from "@/lib/types";

const KATHARINA = {
  author_name: "Katharina Brehm",
  author_title: "Redaktionsleitung",
  author_bio:
    "Katharina Brehm ist gelernte Steuerfachangestellte und war neun Jahre in einer mittelständischen Kanzlei tätig, zuletzt in der Begleitung von Betriebsprüfungen.",
};

const MICHAEL = {
  author_name: "Michael Ebertz",
  author_title: "Redakteur, Schwerpunkt Rechnungswesen",
  author_bio:
    "Michael Ebertz war zwölf Jahre Bilanzbuchhalter in einem Handelsunternehmen mit rund 180 Mitarbeitenden und schreibt seit 2021 über Software für das Rechnungswesen.",
};

const SARAH = {
  author_name: "Sarah Untermann",
  author_title: "Redakteurin, Schwerpunkt Personal",
  author_bio:
    "Sarah Untermann hat Arbeitsrecht studiert und war fünf Jahre in der Personalabteilung eines Zulieferbetriebs mit 340 Mitarbeitenden tätig.",
};

export const blogSchmerzpunkte: Article[] = [
  /* ================================================================= 1 === */
  {
    id: "art-buchhaltung-drei-programme",
    title: "Drei Programme für eine Buchhaltung: warum kleine Betriebe im Papier ersticken",
    slug: "buchhaltung-drei-programme-problem",
    excerpt:
      "Rechnungsprogramm, Excel für die Belege, Onlinebanking im Browser. Was nach Ordnung aussieht, kostet einen Betrieb mit zehn Beschäftigten regelmäßig mehr als zwei Arbeitstage im Monat. Eine Rechnung.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Buchhaltung",
    related_software_slugs: ["sage-active", "lexware-office", "sevdesk", "sage-50"],
    ...KATHARINA,
    read_time_minutes: 11,
    status: "published",
    featured: true,
    published_date: "2026-09-18",
    updated_date: "2026-09-23",
    meta_title: "Buchhaltung in drei Programmen: die versteckten Kosten",
    meta_description:
      "Rechnungsprogramm, Tabelle und Onlinebanking getrennt zu führen kostet kleine Betriebe über zwei Arbeitstage im Monat. Woher der Aufwand kommt und was dagegen hilft.",
    content: [
      {
        type: "paragraph",
        text: "Der Satz fällt in fast jedem Gespräch, das wir mit Inhabern kleiner Betriebe führen. Er lautet sinngemäß: Eigentlich läuft es ja. Die Rechnungen gehen raus, die Belege liegen im Ordner, der Steuerberater bekommt im Januar seinen Karton. Eigentlich läuft es.",
      },
      {
        type: "paragraph",
        text: "Dann fragt man nach, wie lange der zehnte eines Monats dauert. Und plötzlich wird gerechnet.",
      },
      {
        type: "heading",
        level: 2,
        text: "Wo die Zeit tatsächlich hingeht",
        id: "wo-die-zeit-hingeht",
      },
      {
        type: "paragraph",
        text: "Nehmen wir einen Betrieb, wie es ihn zehntausendfach gibt: ein Elektroinstallateur mit acht Monteuren, einer Bürokraft in Teilzeit und dem Chef, der abends noch die Post durchgeht. Der Jahresumsatz liegt bei knapp zwei Millionen Euro. Die Buchhaltung läuft mit einem Rechnungsprogramm, einer gewachsenen Tabelle und dem Onlinebanking der Hausbank.",
      },
      {
        type: "paragraph",
        text: "Der Ablauf sieht so aus. Eine Ausgangsrechnung entsteht im Rechnungsprogramm. Der Betrag wandert per Hand in die Tabelle, damit die Bürokraft den Überblick über offene Posten behält. Kommt die Zahlung, wird sie im Onlinebanking gesehen, in der Tabelle abgehakt und im Rechnungsprogramm auf bezahlt gesetzt. Drei Systeme, dreimal dieselbe Information.",
      },
      {
        type: "paragraph",
        text: "Bei den Eingangsrechnungen ist es schlimmer. Lieferantenrechnungen kommen per Post, per E-Mail und inzwischen auch als strukturierte Datei. Die Bürokraft druckt aus, was digital kam, heftet ab, was gedruckt kam, und schreibt auf einen Zettel, was noch zu zahlen ist. Am Monatsende geht der Ordner zur Kanzlei.",
      },
      {
        type: "table",
        caption: "Zeitaufwand im Monat, erhoben in Gesprächen mit acht Handwerksbetrieben",
        head: ["Tätigkeit", "Stunden", "Davon doppelte Erfassung"],
        rows: [
          ["Ausgangsrechnungen erstellen und nachhalten", "6,5", "2,0"],
          ["Eingangsrechnungen erfassen und ablegen", "5,0", "1,5"],
          ["Zahlungen abgleichen", "4,0", "3,0"],
          ["Offene Posten prüfen und mahnen", "2,5", "1,0"],
          ["Unterlagen für die Kanzlei aufbereiten", "3,0", "2,5"],
          ["Summe", "21,0", "10,0"],
        ],
      },
      {
        type: "paragraph",
        text: "Einundzwanzig Stunden. Davon sind zehn Stunden nichts anderes als das Übertragen von Daten, die bereits im Haus sind. Bei einem kalkulatorischen Stundensatz von fünfunddreißig Euro sind das dreihundertfünfzig Euro im Monat, die niemand in Rechnung stellt und die kein Kunde bezahlt.",
      },
      {
        type: "note",
        title: "Der Denkfehler",
        text: "Die zehn Stunden fallen niemandem auf, weil sie nicht als Posten in der Gewinn und Verlustrechnung stehen. Sie stecken im Gehalt der Bürokraft und im Feierabend des Inhabers. Genau deshalb hält sich der Zustand über Jahre.",
      },
      {
        type: "heading",
        level: 2,
        text: "Warum es trotzdem so bleibt",
        id: "warum-es-bleibt",
      },
      {
        type: "paragraph",
        text: "Für das Festhalten am Bestehenden gibt es gute und schlechte Gründe. Die guten zuerst.",
      },
      {
        type: "paragraph",
        text: "Das bestehende System funktioniert. Es hat nie Daten verloren, die Bürokraft kennt jede Eigenart, und der Steuerberater hat sich daran gewöhnt. Ein Wechsel bedeutet Risiko, und Risiko kostet in einem Betrieb mit dünner Personaldecke mehr als Geld.",
      },
      {
        type: "paragraph",
        text: "Dazu kommt eine berechtigte Skepsis. Wer einmal eine Softwareeinführung erlebt hat, die vier Monate statt vier Wochen gedauert hat, geht die nächste vorsichtiger an. Diese Vorsicht ist Erfahrung, nicht Sturheit.",
      },
      {
        type: "paragraph",
        text: "Die schlechten Gründe sind weniger schmeichelhaft. Der häufigste lautet: Man weiß nicht, wo man anfangen soll. Der Markt ist unübersichtlich, jeder Anbieter verspricht dasselbe, und die Preisseiten vergleichen sich nicht, weil der eine pro Arbeitsplatz rechnet, der nächste pro Mandant und der dritte gar nichts nennt.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was eine Zusammenführung wirklich bringt",
        id: "was-es-bringt",
      },
      {
        type: "paragraph",
        text: "Hier ist Vorsicht geboten, denn an dieser Stelle wird in der Regel übertrieben. Eine Software spart keine zehn Stunden. Sie spart den Teil der zehn Stunden, der aus doppelter Erfassung besteht, und auch den nicht vollständig.",
      },
      {
        type: "paragraph",
        text: "Realistisch ist Folgendes. Der Zahlungsabgleich fällt fast vollständig weg, wenn das Bankkonto angebunden ist und die Zuordnung zu offenen Posten automatisch vorgeschlagen wird. Das sind bei unserem Betrieb drei Stunden. Die Aufbereitung für die Kanzlei fällt weg, wenn der Export im richtigen Format erfolgt und Belegbilder mitgehen. Das sind zweieinhalb Stunden. Die Pflege der Tabelle entfällt, weil die offenen Posten im System stehen. Das ist eine weitere Stunde.",
      },
      {
        type: "paragraph",
        text: "Bleiben rund fünfzehn Stunden statt einundzwanzig. Sechs Stunden im Monat, zweiundsiebzig im Jahr. Das ist kein revolutionärer Sprung, sondern eine ordentliche, belastbare Verbesserung. Und sie hat einen zweiten Effekt, der in keiner Rechnung auftaucht: Die Zahlen stimmen. Wer den Stand der offenen Posten nicht schätzen muss, trifft andere Entscheidungen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die drei Fragen vor der Auswahl",
        id: "drei-fragen",
      },
      {
        type: "paragraph",
        text: "Bevor Sie eine einzige Produktseite öffnen, beantworten Sie diese drei Fragen. Sie schneiden den Markt schneller zurecht als jede Funktionsliste.",
      },
      {
        type: "heading",
        level: 3,
        text: "Erstens: Bilanz oder Einnahmenüberschussrechnung?",
        id: "frage-bilanz",
      },
      {
        type: "paragraph",
        text: "Diese Frage halbiert den Markt. Eine ganze Reihe günstiger Cloudprogramme kann ausschließlich die Einnahmenüberschussrechnung nach § 4 Abs. 3 EStG. Wenn Sie als GmbH bilanzieren müssen oder als Gewerbetreibender die Grenzen des § 141 AO überschreiten, scheiden diese Produkte aus. Nicht später, sondern sofort.",
      },
      {
        type: "paragraph",
        text: "Erstaunlich viele Betriebe wissen die Antwort nicht sicher. Wenn Sie zu ihnen gehören, rufen Sie Ihre Kanzlei an, bevor Sie weiterlesen. Es ist ein Anruf von zwei Minuten und er erspart Ihnen unter Umständen einen Fehlkauf mit zwölf Monaten Mindestlaufzeit.",
      },
      {
        type: "heading",
        level: 3,
        text: "Zweitens: Wie arbeitet Ihre Kanzlei?",
        id: "frage-kanzlei",
      },
      {
        type: "paragraph",
        text: "Die meisten deutschen Steuerkanzleien arbeiten mit DATEV. Das ist keine Kleinigkeit, sondern bestimmt, wie Ihre Daten am Jahresende ankommen. Fragen Sie konkret: Reicht ein Export als Datei, oder soll eine Schnittstelle Buchungssätze und Belegbilder gemeinsam übergeben?",
      },
      {
        type: "paragraph",
        text: "Zwischen beiden liegt ein Arbeitstag im Jahr, und zwar auf Ihrer Seite. Wer nur exportiert, lädt zwölfmal eine Datei herunter und verschickt sie. Wer eine Schnittstelle nutzt, tut nichts.",
      },
      {
        type: "heading",
        level: 3,
        text: "Drittens: Wie viele Personen arbeiten damit?",
        id: "frage-nutzer",
      },
      {
        type: "paragraph",
        text: "Diese Frage entscheidet über den Preis, und zwar drastisch. Ein Anbieter mit Festpreis pro Mandant kostet bei fünf Nutzern dasselbe wie bei einem. Ein Anbieter, der pro Arbeitsplatz rechnet, kostet das Fünffache.",
      },
      {
        type: "paragraph",
        text: "Rechnen Sie das aus, bevor Sie Preise vergleichen. Ein Programm für dreißig Euro pro Arbeitsplatz ist bei vier Arbeitsplätzen teurer als eines für hundert Euro pro Mandant, und auf den Preisseiten sieht es umgekehrt aus.",
      },
      {
        type: "heading",
        level: 2,
        text: "Ein Beispiel aus dem Markt",
        id: "beispiel",
      },
      {
        type: "paragraph",
        text: "Um die Rechnung greifbar zu machen, ein Produkt aus unserem Bestand, das genau diesen Zuschnitt bedient. Wir nennen es hier nicht, weil es das beste wäre, sondern weil es die Logik gut zeigt.",
      },
      {
        type: "software",
        slug: "sage-active",
        reason:
          "Führt Angebote, Rechnungen, Bankabgleich und im Tarif Essentials die doppelte Buchführung nach SKR03 und SKR04 in einer Oberfläche. Der Tarifpreis gilt für das Unternehmen, nicht pro Arbeitsplatz, und deckt zehn Nutzer ab. Für den Betrieb aus unserem Beispiel ist das der Unterschied zwischen vierundzwanzig Euro und hundertzwanzig Euro im Monat.",
      },
      {
        type: "paragraph",
        text: "Entscheidend ist an diesem Beispiel nicht der Name, sondern die Struktur: Ein Tarif für das Unternehmen, eine feste Zahl enthaltener Nutzer, und die Buchhaltung erst in der zweiten Stufe. Wer nur Rechnungen schreiben will, zahlt weniger. Wer bucht, zahlt mehr. Das ist ehrlich kalkuliert und leicht nachzurechnen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Der Umstellungstermin ist kein Detail",
        id: "umstellungstermin",
      },
      {
        type: "paragraph",
        text: "Wenn Sie sich entscheiden, entscheiden Sie auch über den Zeitpunkt. Und hier machen Betriebe regelmäßig denselben Fehler: Sie stellen um, wenn die neue Software gekauft ist.",
      },
      {
        type: "paragraph",
        text: "Der richtige Stichtag ist der erste Januar. Eine Umstellung mitten im Jahr teilt die Summen und Saldenliste auf zwei Systeme, zwingt Sie zur Umsatzsteuer-Voranmeldung aus zwei Quellen und kostet Ihre Kanzlei zusätzliche Stunden, die Ihnen in Rechnung gestellt werden.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Oktober: Auswahl treffen, Testzugang einrichten, mit der Kanzlei sprechen.",
          "November: Stammdaten übernehmen, Kontenrahmen abgleichen, Zahlungsbedingungen prüfen.",
          "Dezember: Parallelbetrieb mit wenigen echten Belegen, Abläufe einüben.",
          "Januar: produktiv im neuen System, das alte nur noch lesend.",
        ],
      },
      {
        type: "note",
        title: "Das alte System bleibt aufbewahrungspflichtig",
        text: "Die Buchführungsdaten müssen über die gesamte Aufbewahrungsfrist maschinell auswertbar bleiben. Ein Ausdruck genügt nicht. Klären Sie vor der Kündigung, ob der bisherige Anbieter einen lesenden Zugang bereitstellt oder ob Sie einen Datenträger benötigen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was in der Testphase wirklich zählt",
        id: "testphase",
      },
      {
        type: "paragraph",
        text: "Fast jeder Anbieter gewährt eine Testphase. Die meisten Betriebe nutzen sie falsch. Sie klicken durch die Beispieldaten des Anbieters, finden alles übersichtlich und schließen ab.",
      },
      {
        type: "paragraph",
        text: "Beispieldaten sind so gebaut, dass alles funktioniert. Ihre Daten sind es nicht. Nehmen Sie deshalb drei echte Vorgänge und spielen Sie sie durch.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Die komplizierteste Ausgangsrechnung des letzten Quartals, mit allen Rabatten, Teilleistungen und Sonderkonditionen, die Sie tatsächlich vergeben.",
          "Eine Eingangsrechnung eines Lieferanten, von dem Sie regelmäßig kaufen, samt Skontovereinbarung.",
          "Einen kompletten Monatsabschluss mit Umsatzsteuer-Voranmeldung, vom Beleg bis zur Übermittlung.",
        ],
      },
      {
        type: "paragraph",
        text: "Wenn diese drei Vorgänge sauber durchlaufen, haben Sie eine belastbare Grundlage. Wenn einer hakt, wissen Sie es jetzt und nicht im Februar.",
      },
      {
        type: "quote",
        text: "Wir hatten die Testphase mit den Musterdaten gemacht und waren begeistert. Im ersten echten Monat hat sich gezeigt, dass unsere Abschlagsrechnungen im Bauhandwerk gar nicht abgebildet waren. Das hat uns ein halbes Jahr gekostet.",
        source: "Inhaber eines Sanitärbetriebs mit 14 Beschäftigten, Gespräch im Mai 2026",
      },
      {
        type: "heading",
        level: 2,
        text: "Was Sie realistisch erwarten dürfen",
        id: "erwartung",
      },
      {
        type: "paragraph",
        text: "Zum Schluss der nüchterne Teil. Eine zusammengeführte Buchhaltung macht Ihren Betrieb nicht profitabler. Sie macht ihn übersichtlicher, und übersichtlich ist die Voraussetzung dafür, überhaupt zu sehen, wo Geld liegen bleibt.",
      },
      {
        type: "paragraph",
        text: "Die Betriebe, die nach einer Umstellung am meisten gewonnen haben, berichten selten von Zeitersparnis als erstem Punkt. Sie berichten davon, dass sie zum ersten Mal am fünfzehnten eines Monats wussten, wie der Vormonat gelaufen ist. Nicht im März. Im Folgemonat.",
      },
      {
        type: "paragraph",
        text: "Das ist der eigentliche Gewinn, und er lässt sich nicht in Stunden ausdrücken.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine steuerliche Beratung. Für die Beurteilung Ihres konkreten Falls wenden Sie sich an Ihre Steuerkanzlei.",
      },
    ],
  },

  /* ================================================================= 2 === */
  {
    id: "art-lohnabrechnung-drei-tage",
    title: "Wenn die Lohnabrechnung jeden Monat drei Tage kostet",
    slug: "lohnabrechnung-zeitaufwand-reduzieren",
    excerpt:
      "Stundenzettel sammeln, Abwesenheiten nachhalten, Meldungen absetzen, Fragen beantworten. Die Entgeltabrechnung ist in vielen Betrieben der am schlechtesten organisierte Vorgang überhaupt. Das lässt sich ändern.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Lohn und Personal",
    related_software_slugs: ["sage-lohnabrechnung", "datev-lohn-und-gehalt", "lexware-lohn-gehalt", "sage-hr-payroll"],
    ...SARAH,
    read_time_minutes: 12,
    status: "published",
    featured: true,
    published_date: "2026-09-16",
    updated_date: "2026-09-23",
    meta_title: "Lohnabrechnung beschleunigen: wo die Zeit verloren geht",
    meta_description:
      "Drei Tage im Monat für die Entgeltabrechnung sind in kleinen Betrieben normal und vermeidbar. Woher der Aufwand kommt, welche Meldungen Pflicht sind und was Software daran ändert.",
    content: [
      {
        type: "paragraph",
        text: "Die Lohnabrechnung hat eine Eigenschaft, die sie von jedem anderen Vorgang im Betrieb unterscheidet: Sie duldet keinen Aufschub. Eine Ausgangsrechnung kann einen Tag liegen bleiben. Eine Bestellung kann warten. Das Gehalt muss am Fünfundzwanzigsten auf dem Konto sein, und die Meldung an die Krankenkasse muss zum drittletzten Bankarbeitstag stehen.",
      },
      {
        type: "paragraph",
        text: "Genau deshalb ist die Entgeltabrechnung in vielen Betrieben der Vorgang mit dem höchsten Stresspegel und der geringsten Organisation. Man kommt nie dazu, ihn zu verbessern, weil er immer gerade dringend ist.",
      },
      {
        type: "heading",
        level: 2,
        text: "Der Ablauf, wie er tatsächlich aussieht",
        id: "ablauf",
      },
      {
        type: "paragraph",
        text: "Wir haben mit vierzehn Betrieben zwischen zehn und achtzig Beschäftigten gesprochen und den Ablauf Schritt für Schritt aufgenommen. Das Muster ist bemerkenswert einheitlich.",
      },
      {
        type: "paragraph",
        text: "Es beginnt um den Fünfzehnten mit dem Einsammeln. Stundenzettel kommen auf Papier, per Foto über den Nachrichtendienst, manchmal mündlich. Die Personalverantwortliche überträgt sie in eine Tabelle. Wer keine abgegeben hat, wird erinnert. Zwei Personen geben grundsätzlich zu spät ab, das weiß jeder, und jeden Monat fragt man trotzdem.",
      },
      {
        type: "paragraph",
        text: "Dann folgen die Abwesenheiten. Urlaub steht im Kalender an der Wand oder in einer zweiten Tabelle. Krankheitstage kommen aus dem Postfach, aus Nachrichten und aus dem Gedächtnis. Die elektronische Arbeitsunfähigkeitsbescheinigung muss bei der Krankenkasse abgerufen werden, und wer das nicht aus dem Abrechnungsprogramm heraus kann, meldet sich einzeln bei jeder Kasse an.",
      },
      {
        type: "paragraph",
        text: "Erst danach beginnt die eigentliche Abrechnung. Sie ist der kürzeste Teil des Vorgangs.",
      },
      {
        type: "table",
        caption: "Aufwand je Abrechnungslauf, Betrieb mit 32 Beschäftigten",
        head: ["Schritt", "Stunden", "Automatisierbar"],
        rows: [
          ["Stundenzettel einsammeln und nachfassen", "4,5", "weitgehend"],
          ["Abwesenheiten zusammentragen", "3,0", "weitgehend"],
          ["eAU abrufen und zuordnen", "1,5", "vollständig"],
          ["Abrechnung durchführen", "2,0", "teilweise"],
          ["Meldungen prüfen und absetzen", "1,5", "weitgehend"],
          ["Rückfragen der Beschäftigten beantworten", "3,5", "weitgehend"],
          ["Buchhaltungsübergabe vorbereiten", "2,0", "vollständig"],
          ["Summe", "18,0", ""],
        ],
      },
      {
        type: "paragraph",
        text: "Achtzehn Stunden. Die Abrechnung selbst macht davon zwei aus. Alles andere ist Zuarbeit, Nachfassen und Erklären.",
      },
      {
        type: "note",
        title: "Die Rückfragen sind kein Nebenschauplatz",
        text: "Dreieinhalb Stunden gehen für Fragen drauf, die Beschäftigte stellen: Wie viel Urlaub habe ich noch? Warum ist der Nettobetrag anders als letzten Monat? Wo ist meine Abrechnung vom März? Jede einzelne Frage ist berechtigt. Keine einzige müsste an die Personalabteilung gehen, wenn die Antwort in einer App stünde.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Pflichten, die nicht verhandelbar sind",
        id: "pflichten",
      },
      {
        type: "paragraph",
        text: "Bevor es um Werkzeuge geht, lohnt ein nüchterner Blick auf das, was der Gesetzgeber verlangt. Viele Betriebe unterschätzen, wie eng das Korsett ist.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Die Lohnsteueranmeldung nach § 41a EStG geht elektronisch über ELSTER an das Betriebsstättenfinanzamt, bis zum zehnten Tag nach Ablauf des Anmeldungszeitraums.",
          "Die Meldungen nach dem DEÜV-Verfahren gehen an die Krankenkasse als Einzugsstelle, aus einem systemgeprüften Programm heraus, elektronisch.",
          "Der Beitragsnachweis ist zum drittletzten Bankarbeitstag des Monats fällig, und zwar geschätzt, wenn die endgültige Abrechnung noch nicht steht.",
          "Die elektronische Arbeitsunfähigkeitsbescheinigung ruft der Arbeitgeber seit 2023 bei der Krankenkasse ab. Der gelbe Schein ist kein zulässiger Nachweis mehr.",
          "Bei Entsendungen ins EU-Ausland kommt die A1-Bescheinigung hinzu, und zwar vor Antritt der Reise.",
        ],
      },
      {
        type: "paragraph",
        text: "Ein Punkt verdient besondere Aufmerksamkeit, weil er regelmäßig falsch verstanden wird: Ein Lohnprogramm ohne DEÜV-Fähigkeit ist in Deutschland nicht einsetzbar. Nicht umständlich, nicht eingeschränkt, sondern schlicht nicht einsetzbar. Wenn ein internationales Personalsystem damit wirbt, Gehälter abzurechnen, prüfen Sie diesen Punkt zuerst.",
      },
      {
        type: "heading",
        level: 2,
        text: "Vorbereitende Abrechnung ist nicht Abrechnung",
        id: "vorbereitend",
      },
      {
        type: "paragraph",
        text: "Hier liegt die teuerste Verwechslung im ganzen Marktsegment, und sie kostet Betriebe regelmäßig ein vollständiges Auswahlverfahren.",
      },
      {
        type: "paragraph",
        text: "Zahlreiche Personalsysteme bieten eine sogenannte vorbereitende Lohnabrechnung. Das bedeutet: Das System sammelt die abrechnungsrelevanten Daten und übergibt sie an einen Abrechner, in der Regel die Steuerkanzlei. Die eigentliche Abrechnung findet dort statt, die Meldungen setzt die Kanzlei ab.",
      },
      {
        type: "paragraph",
        text: "Das kann genau richtig sein. Wenn Sie ohnehin abrechnen lassen und nur die Zuarbeit verbessern wollen, ist ein solches System die passende Wahl. Wenn Sie aber erwarten, die Kanzleikosten einzusparen, werden Sie enttäuscht. Sie zahlen dann für das Personalsystem und weiterhin für die Abrechnung.",
      },
      {
        type: "quote",
        text: "Im Vertriebsgespräch war viel von Lohnabrechnung die Rede. Gemeint war die Vorbereitung. Wir hatten mit einer Einsparung gerechnet, die es nicht gibt.",
        source: "Geschäftsführer einer Beratungsgesellschaft mit 18 Beschäftigten, Gespräch im März 2026",
      },
      {
        type: "paragraph",
        text: "Stellen Sie deshalb eine einzige Frage, und zwar schriftlich: Setzt das System die DEÜV-Meldungen selbst ab, oder übergibt es Daten an einen Abrechner? Die Antwort entscheidet, ob Sie über dasselbe Produkt sprechen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was eine Cloudlösung tatsächlich verändert",
        id: "cloud",
      },
      {
        type: "paragraph",
        text: "Die Betriebe, die den Aufwand spürbar gesenkt haben, haben nicht an der Abrechnung geschraubt. Sie haben die Zuarbeit umgestellt.",
      },
      {
        type: "paragraph",
        text: "Konkret heißt das: Beschäftigte erfassen ihre Arbeitszeit selbst, mobil, am selben Tag. Urlaub wird im System beantragt und dort genehmigt, nicht per Zuruf. Die Abrechnung liegt im Selbstbedienungsbereich, sodass die Frage nach der Märzabrechnung gar nicht erst gestellt wird. Der eAU-Abruf läuft aus dem Programm heraus.",
      },
      {
        type: "paragraph",
        text: "Damit verschwinden nicht achtzehn Stunden, aber die vier Blöcke, die zusammen elfeinhalb Stunden ausmachen, schrumpfen erheblich. Realistisch berichten Betriebe von sieben bis neun Stunden je Lauf statt achtzehn.",
      },
      {
        type: "software",
        slug: "sage-lohnabrechnung",
        reason:
          "Rechnet selbst ab und setzt die gesetzlichen Meldungen ab, also keine bloße Vorbereitung. Die Tarife enthalten fünf Beschäftigte, jede weitere Person wird einzeln berechnet. Der Selbstbedienungsbereich für Beschäftigte und die mobile App zielen genau auf die Rückfragen, die sonst in der Personalabteilung landen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Preise richtig durchrechnen",
        id: "preise",
      },
      {
        type: "paragraph",
        text: "Bei Lohnsoftware ist die Preisangabe auf der Startseite fast immer irreführend, und zwar ohne böse Absicht. Der genannte Betrag enthält meist eine kleine Zahl von Beschäftigten, und jede weitere Person kostet extra.",
      },
      {
        type: "paragraph",
        text: "Rechnen Sie deshalb immer mit Ihrer tatsächlichen Kopfzahl. Ein Beispiel: Ein Tarif für dreißig Euro im Monat enthält fünf Beschäftigte, jede weitere kostet fünf Euro. Bei zweiunddreißig Beschäftigten zahlen Sie dreißig Euro plus siebenundzwanzig mal fünf Euro, also hundertfünfundsechzig Euro im Monat, zuzüglich Umsatzsteuer.",
      },
      {
        type: "paragraph",
        text: "Das ist immer noch ein vertretbarer Betrag für achtzehn eingesparte Stunden. Aber es ist eben nicht der Betrag von der Startseite, und wer damit kalkuliert hat, erlebt bei der ersten Rechnung eine Überraschung.",
      },
      {
        type: "note",
        title: "Fragen Sie nach der Obergrenze",
        text: "Viele Cloudlösungen für die Entgeltabrechnung haben eine Obergrenze bei der Beschäftigtenzahl, häufig bei hundertfünfzig. Wenn Ihr Betrieb wächst, klären Sie, was bei Überschreitung passiert. Ein Wechsel des Abrechnungssystems mitten im Jahr ist besonders unerfreulich.",
      },
      {
        type: "heading",
        level: 2,
        text: "Der Jahreswechsel ist die eigentliche Prüfung",
        id: "jahreswechsel",
      },
      {
        type: "paragraph",
        text: "Jede Lohnsoftware sieht im Juni gut aus. Die Unterschiede zeigen sich im Januar.",
      },
      {
        type: "paragraph",
        text: "Zum Jahreswechsel ändern sich Beitragsbemessungsgrenzen, Steuertabellen, Sachbezugswerte und regelmäßig auch Meldeverfahren. Ein Programm, das diese Anpassungen nicht rechtzeitig und vollständig einspielt, rechnet ab Januar falsch. Und falsch gerechnete Lohnsteuer holt sich das Finanzamt beim Arbeitgeber.",
      },
      {
        type: "paragraph",
        text: "Bei Cloudlösungen ist das in der Regel unproblematisch, weil die Aktualisierung zentral erfolgt. Bei lokal installierten Programmen hängt es am Wartungsvertrag. Wer den nicht abgeschlossen hat, bekommt das Update nicht, und das Programm ist ab Januar unbrauchbar.",
      },
      {
        type: "paragraph",
        text: "Das ist kein theoretisches Risiko. Es ist einer der häufigsten Beschwerdegründe, die uns zu lokal installierter Lohnsoftware erreichen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was zuerst zu tun ist",
        id: "erste-schritte",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Messen Sie einen Abrechnungslauf ehrlich mit. Nicht schätzen, sondern die Stunden notieren, verteilt auf die Schritte aus der Tabelle oben.",
          "Klären Sie schriftlich, ob ein infrage kommendes System die DEÜV-Meldungen selbst absetzt.",
          "Rechnen Sie den Preis mit Ihrer tatsächlichen Kopfzahl, nicht mit dem Grundpreis.",
          "Fragen Sie nach dem eAU-Abruf aus dem Programm heraus.",
          "Prüfen Sie den Buchhaltungsexport mit Ihrer Kanzlei, bevor Sie unterschreiben.",
        ],
      },
      {
        type: "paragraph",
        text: "Wer diese fünf Punkte abarbeitet, hat den Markt auf eine Handvoll Kandidaten reduziert und die teuren Missverständnisse hinter sich.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine Rechtsberatung. Für arbeits- und sozialversicherungsrechtliche Fragen wenden Sie sich an Ihre Steuerkanzlei oder an eine Fachanwältin für Arbeitsrecht.",
      },
    ],
  },

  /* ================================================================= 3 === */
  {
    id: "art-excel-personalverwaltung",
    title: "Die Personalakte im Aktenschrank: was Excel in der Personalverwaltung wirklich kostet",
    slug: "excel-personalverwaltung-kosten",
    excerpt:
      "Urlaubsanträge per E-Mail, Krankmeldungen in einer Tabelle, Arbeitsverträge im Ordner. Für zwanzig Beschäftigte funktioniert das noch. Bei sechzig wird es zum Haftungsrisiko.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Lohn und Personal",
    related_software_slugs: ["sage-hr", "personio", "factorial", "sage-hr-payroll"],
    ...SARAH,
    read_time_minutes: 11,
    status: "published",
    featured: false,
    published_date: "2026-09-11",
    updated_date: "2026-09-23",
    meta_title: "Personalverwaltung mit Excel: Grenzen und Risiken",
    meta_description:
      "Ab wann Tabellen in der Personalverwaltung zum Problem werden, welche Aufzeichnungspflichten gelten und worauf es bei der Auswahl einer HR-Software wirklich ankommt.",
    content: [
      {
        type: "paragraph",
        text: "Es gibt einen Punkt, an dem die Tabelle kippt. Er lässt sich erstaunlich genau bestimmen, und er liegt nicht dort, wo die meisten ihn vermuten.",
      },
      {
        type: "paragraph",
        text: "Nicht die Zahl der Beschäftigten entscheidet, sondern die Zahl der Personen, die auf die Daten zugreifen müssen. Solange eine Person die Personalverwaltung allein führt, ist eine gut gepflegte Tabelle ein vollwertiges Werkzeug. Sobald eine zweite Person Urlaub genehmigen, Stunden prüfen oder eine Akte einsehen muss, beginnt das Problem.",
      },
      {
        type: "heading",
        level: 2,
        text: "Woran es im Alltag scheitert",
        id: "alltag",
      },
      {
        type: "paragraph",
        text: "Die Symptome sind überall dieselben, unabhängig von der Branche.",
      },
      {
        type: "paragraph",
        text: "Der Urlaubsantrag geht per E-Mail an die Vorgesetzte. Die leitet ihn weiter an die Personalverwaltung. Dort wird er in die Tabelle eingetragen. Kommt es später zum Streit über den Resturlaub, muss jemand das Postfach durchsuchen. Die Tabelle allein beweist nichts, weil niemand nachvollziehen kann, wer wann was eingetragen hat.",
      },
      {
        type: "paragraph",
        text: "Die Krankmeldung kommt telefonisch. Jemand notiert sie. Ob die elektronische Arbeitsunfähigkeitsbescheinigung abgerufen wurde, steht in einem anderen System oder gar nicht. Bei der nächsten Betriebsprüfung fehlt der Nachweis.",
      },
      {
        type: "paragraph",
        text: "Der Arbeitsvertrag liegt im Aktenschrank. Wer ihn braucht, geht hin. Wer ihn im Homeoffice braucht, fotografiert ihn vorher ab und speichert ihn auf dem privaten Gerät. Spätestens hier verlassen Sie das, was die Datenschutz-Grundverordnung erlaubt.",
      },
      {
        type: "note",
        title: "Der stille Verstoß",
        text: "Personaldaten auf privaten Geräten, in Postfächern ohne Zugriffsbeschränkung und in Tabellen ohne Rechtekonzept sind der häufigste Datenschutzverstoß in kleinen Betrieben. Er fällt selten auf, weil niemand ihn meldet. Meldepflichtig wird er, sobald ein Gerät verloren geht.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Aufzeichnungspflicht bei der Arbeitszeit",
        id: "arbeitszeit",
      },
      {
        type: "paragraph",
        text: "Seit dem Beschluss des Bundesarbeitsgerichts vom 13. September 2022 steht fest, dass Arbeitgeber schon nach geltendem Arbeitsschutzrecht verpflichtet sind, ein System zur Erfassung der Arbeitszeit einzuführen. Das Aktenzeichen lautet 1 ABR 22/21.",
      },
      {
        type: "paragraph",
        text: "Was seither nicht geschehen ist: Ein novelliertes Arbeitszeitgesetz, das die Einzelheiten regelt. Ein Referentenentwurf liegt seit Jahren vor und wurde nicht verabschiedet. Betriebe befinden sich damit in einer unangenehmen Lage. Die Pflicht besteht, die Ausgestaltung ist offen.",
      },
      {
        type: "paragraph",
        text: "Unstrittig ist dennoch einiges.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Beginn, Ende und Dauer der täglichen Arbeitszeit sind aufzuzeichnen, nicht nur die Tagessumme.",
          "Die Aufzeichnung muss objektiv, verlässlich und zugänglich sein.",
          "Die Erfassung darf an die Beschäftigten delegiert werden, die Verantwortung bleibt beim Arbeitgeber.",
          "Ein Betriebsrat hat bei der Ausgestaltung des Systems ein Mitbestimmungsrecht.",
        ],
      },
      {
        type: "paragraph",
        text: "Eine handschriftliche Liste erfüllt das formal. Ob sie in einem Streitfall als verlässlich gilt, ist eine andere Frage, und zwar eine, die Sie nicht vor Gericht beantwortet bekommen wollen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Vorsicht bei Werbeaussagen",
        id: "werbeaussagen",
      },
      {
        type: "paragraph",
        text: "An dieser Stelle ein deutliches Wort zum Marketing mancher Anbieter. Wer sein Zeiterfassungsmodul als gesetzeskonform bewirbt, bezieht sich auf eine Rechtslage, die in Teilen noch gar nicht existiert.",
      },
      {
        type: "paragraph",
        text: "Wir haben in unseren Prüfungen keine einzige solche Aussage als belastbar bewerten können und tragen sie deshalb bei keinem Produkt als bestätigt ein. Das ist keine Kritik an den Funktionen, sondern an der Formulierung. Ein System, das Beginn, Ende und Pausen erfasst, Korrekturen protokolliert und exportierbar ist, erfüllt aller Voraussicht nach auch künftige Anforderungen. Versprechen kann das heute niemand seriös.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was eine Personalsoftware konkret ändert",
        id: "was-sich-aendert",
      },
      {
        type: "paragraph",
        text: "Der größte Effekt entsteht nicht in der Personalabteilung, sondern bei den Beschäftigten und den Führungskräften. Das überrascht viele Betriebe.",
      },
      {
        type: "paragraph",
        text: "Ein Urlaubsantrag, der in einer App gestellt und dort genehmigt wird, erzeugt drei Dinge gleichzeitig: den Eintrag im Kalender, den Abzug vom Kontingent und einen nachvollziehbaren Vorgang mit Zeitstempel. Die Personalverwaltung tut dabei nichts. Sie sieht das Ergebnis.",
      },
      {
        type: "paragraph",
        text: "Dasselbe gilt für die Abrechnung, die im Selbstbedienungsbereich liegt, für das Organigramm, das sich niemand mehr erklären lassen muss, und für die Dokumentablage, die den Aktenschrank ersetzt.",
      },
      {
        type: "software",
        slug: "sage-hr",
        reason:
          "Modular aufgebaut: das Grundpaket deckt Abwesenheiten, digitale Personalakte und die mobile App ab, Zeiterfassung, Schichtplanung und Leistungsbeurteilung kommen einzeln hinzu. Für Betriebe, die schrittweise digitalisieren wollen, ist das die passendere Struktur als ein Gesamtpaket, von dem die Hälfte ungenutzt bleibt.",
      },
      {
        type: "heading",
        level: 2,
        text: "Modulpreise richtig rechnen",
        id: "modulpreise",
      },
      {
        type: "paragraph",
        text: "Der modulare Aufbau hat eine Tücke, die beim Vergleich auffällt und beim Abschluss gern vergessen wird: Die meisten Module werden pro Person und Monat berechnet, einzelne aber als Festpreis.",
      },
      {
        type: "paragraph",
        text: "Bei fünfzehn Beschäftigten ist ein Modul für zweifünfzig je Person eine Position von siebenunddreißig Euro fünfzig. Ein Modul mit einem Festpreis von hundertfünfundsiebzig Euro im Monat ist dagegen unabhängig von der Kopfzahl und für einen kleinen Betrieb der mit Abstand teuerste Baustein.",
      },
      {
        type: "table",
        caption: "Beispielrechnung für einen Betrieb mit 15 Beschäftigten, Preise zzgl. MwSt.",
        head: ["Baustein", "Abrechnung", "Monatlich"],
        rows: [
          ["Grundpaket, 4,50 EUR je Person", "pro Kopf", "67,50 EUR"],
          ["Arbeitszeittabellen, 2,50 EUR je Person", "pro Kopf", "37,50 EUR"],
          ["Schichtplanung, 2,50 EUR je Person", "pro Kopf", "37,50 EUR"],
          ["Recruiting, Festpreis", "pauschal", "175,00 EUR"],
          ["Summe", "", "317,50 EUR"],
        ],
      },
      {
        type: "paragraph",
        text: "Das Recruiting macht in diesem Beispiel mehr als die Hälfte der Kosten aus. Wenn Sie im Jahr sechs Stellen besetzen, ist das teuer. Wenn Sie sechzig besetzen, ist es günstig. Diese Rechnung müssen Sie selbst aufmachen, kein Anbieter macht sie für Sie.",
      },
      {
        type: "heading",
        level: 2,
        text: "Den Betriebsrat früh einbinden",
        id: "betriebsrat",
      },
      {
        type: "paragraph",
        text: "Wo ein Betriebsrat besteht, ist die Einführung eines Personalsystems mitbestimmungspflichtig. Das betrifft insbesondere alles, was geeignet ist, Verhalten oder Leistung zu überwachen, und dazu gehören Zeiterfassung und Leistungsbeurteilung ohne Weiteres.",
      },
      {
        type: "paragraph",
        text: "Betriebe, die den Betriebsrat erst nach der Kaufentscheidung informieren, verlieren regelmäßig Monate. Betriebe, die ihn in die Auswahl einbeziehen, berichten fast durchgängig von einem schnelleren Verfahren, weil die kritischen Fragen dann in der Anbieterauswahl geklärt werden und nicht danach.",
      },
      {
        type: "quote",
        text: "Wir haben den Betriebsrat von Anfang an in die Auswahl geholt. Das hat vier Wochen gekostet und uns vermutlich ein halbes Jahr erspart.",
        source: "Leiterin Personal, Maschinenbaubetrieb mit 190 Beschäftigten, Gespräch im Juni 2026",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Abgrenzung, die vor dem Kauf zu klären ist",
        id: "abgrenzung",
      },
      {
        type: "paragraph",
        text: "Zum Schluss der Punkt, an dem die meisten Fehlkäufe entstehen. Personalsoftware und Entgeltabrechnung sind zwei verschiedene Dinge, und die Produktnamen im Markt verschleiern das eher, als dass sie es klären.",
      },
      {
        type: "paragraph",
        text: "Eine reine Personalplattform verwaltet Akten, Abwesenheiten, Zeiten und Bewerbungen. Sie rechnet keine Gehälter ab und setzt keine Meldungen ab. Wer beides in einem System will, braucht ein Produkt, das ausdrücklich beides enthält, und die gibt es.",
      },
      {
        type: "paragraph",
        text: "Fragen Sie deshalb schriftlich nach: Werden Lohnsteueranmeldung und die Meldungen nach dem DEÜV-Verfahren aus diesem System abgesetzt? Ein Ja oder Nein reicht. Es erspart Ihnen unter Umständen ein zweites Auswahlverfahren.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine Rechtsberatung. Für arbeits- und datenschutzrechtliche Fragen wenden Sie sich an eine Fachanwältin oder an Ihre Datenschutzbeauftragte.",
      },
    ],
  },
];
