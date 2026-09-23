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

/** Wie wir in diesen Ranglisten vorgehen, steht in jedem Beitrag gleich. */
const METHODIK = {
  type: "note" as const,
  title: "Wie diese Rangliste entsteht",
  text: "Wir prüfen Preise, Funktionsumfang und die deutschen Pflichten selbst und tragen jede Angabe mit dem Datum der Prüfung ein. Die Reihenfolge ergibt sich aus der Eignung für den jeweils beschriebenen Betriebstyp, nicht aus Provisionen. Mit einzelnen Anbietern bestehen Vermittlungsvereinbarungen; welche das sind, steht namentlich im Affiliate-Hinweis. Auf Reihenfolge und Bewertung hat das keinen Einfluss.",
};

export const blogRanglisten: Article[] = [
  /* ================================================================= 7 === */
  {
    id: "art-top-buchhaltung-klein",
    title: "Die 5 besten Buchhaltungsprogramme für kleine Unternehmen in Deutschland",
    slug: "beste-buchhaltungssoftware-kleine-unternehmen",
    excerpt:
      "Fünf Programme, die für Betriebe bis etwa fünfzig Beschäftigte tatsächlich infrage kommen, mit geprüften Preisen, der Frage nach Bilanz oder EÜR und der Kanzleianbindung als entscheidendem Kriterium.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Rangliste",
    related_software_slugs: ["sage-active", "lexware-office", "sevdesk", "sage-50", "collmex"],
    ...KATHARINA,
    read_time_minutes: 13,
    status: "published",
    featured: true,
    published_date: "2026-09-21",
    updated_date: "2026-09-23",
    meta_title: "Beste Buchhaltungssoftware für kleine Unternehmen 2026",
    meta_description:
      "Fünf geprüfte Buchhaltungsprogramme für kleine Betriebe in Deutschland: Preise mit Prüfdatum, Bilanz oder EÜR, DATEV-Anbindung und E-Rechnung im direkten Vergleich.",
    content: [
      {
        type: "paragraph",
        text: "Wer in Deutschland nach einer Buchhaltungssoftware sucht, findet innerhalb von zehn Minuten dreißig Namen und keine Entscheidungsgrundlage. Jeder Anbieter verspricht dasselbe, und die Preisseiten lassen sich nicht vergleichen, weil der eine pro Arbeitsplatz rechnet, der nächste pro Mandant und der dritte gar keine Zahl nennt.",
      },
      {
        type: "paragraph",
        text: "Diese Rangliste macht es umgekehrt. Sie beginnt nicht mit Produkten, sondern mit den drei Fragen, die den Markt für Ihren Betrieb halbieren, und ordnet die Programme dann danach ein.",
      },
      METHODIK,
      {
        type: "heading",
        level: 2,
        text: "Die drei Fragen vor jedem Vergleich",
        id: "drei-fragen",
      },
      {
        type: "paragraph",
        text: "Erstens: Müssen Sie bilanzieren? Eine ganze Reihe günstiger Cloudprogramme kann ausschließlich die Einnahmenüberschussrechnung nach § 4 Abs. 3 EStG. Wenn Sie als GmbH bilanzieren oder als Gewerbetreibender die Grenzen des § 141 AO überschreiten, fallen diese Produkte sofort heraus.",
      },
      {
        type: "paragraph",
        text: "Zweitens: Wie arbeitet Ihre Kanzlei? Die meisten deutschen Steuerkanzleien arbeiten mit DATEV. Klären Sie, ob ein Export als Datei reicht oder ob eine Schnittstelle Buchungssätze und Belegbilder gemeinsam übergeben soll. Zwischen beiden liegt ein Arbeitstag im Jahr, auf Ihrer Seite.",
      },
      {
        type: "paragraph",
        text: "Drittens: Wie viele Personen arbeiten mit dem Programm? Diese Frage entscheidet den Preis drastisch. Ein Programm für dreißig Euro pro Arbeitsplatz ist bei vier Arbeitsplätzen teurer als eines für hundert Euro pro Mandant, und auf den Preisseiten sieht es umgekehrt aus.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 1: Sage Active",
        id: "platz-1",
      },
      {
        type: "paragraph",
        text: "Sage Active steht hier vorn, weil es die Frage nach Bilanz und die Frage nach der Nutzerzahl gleichzeitig beantwortet, und zwar zugunsten des Betriebs.",
      },
      {
        type: "paragraph",
        text: "Der Tarif Essentials bringt doppelte Buchführung mit den Kontenrahmen SKR03 und SKR04, Anlagenbuchhaltung, Einnahmenüberschussrechnung, Umsatzsteuer-Voranmeldung und Jahresabschlüsse. Dazu kommen Lohnabrechnung und Personalverwaltung im selben Tarif. Enthalten sind ein Unternehmen, zehn Nutzer und zwei Mitarbeitende.",
      },
      {
        type: "paragraph",
        text: "Der Preis ist ein Tarifpreis für das Unternehmen, nicht ein Preis pro Arbeitsplatz. Für einen Betrieb, in dem drei oder vier Personen buchen, ist das der Unterschied zwischen einer zweistelligen und einer dreistelligen Monatsrechnung.",
      },
      {
        type: "software",
        slug: "sage-active",
        reason:
          "Doppelte Buchführung nach SKR03 und SKR04 im Tarif Essentials, zehn Nutzer im Tarifpreis enthalten, Lohn und Personal ohne Zusatzprodukt. Derzeit gilt ein Rabatt von 50 Prozent für die ersten drei Monate, dazu eine Testphase von 30 Tagen.",
      },
      {
        type: "paragraph",
        text: "Was Sie wissen sollten: Der Tarif Starter enthält keine Buchhaltung. Er deckt Angebote, Rechnungen und den Bankabgleich ab. Wer bucht, braucht Essentials, und mit diesem Tarif sollten Sie auch rechnen.",
      },
      {
        type: "paragraph",
        text: "Beim Versand von E-Rechnungen macht die deutsche Produktseite keine eindeutige Angabe zur erzeugten ZUGFeRD-Version. Wir haben das deshalb nicht als bestätigt eingetragen. Fragen Sie danach, wenn Sie an öffentliche Auftraggeber liefern.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 2: Lexware Office",
        id: "platz-2",
      },
      {
        type: "paragraph",
        text: "Lexware Office ist das Produkt mit der längsten Historie bei deutschen Steuerkanzleien und dem geradlinigsten Weg dorthin. Wenn Ihre Kanzlei seit Jahren Lexware-Daten verarbeitet, ist das ein Argument, das keine Funktionsliste aufwiegt.",
      },
      {
        type: "paragraph",
        text: "Der Ablauf ist auf Betriebe zugeschnitten, die ihre laufende Buchhaltung selbst erledigen und den Abschluss der Kanzlei überlassen. Belege kommen per Foto oder Upload ins System, werden einem Buchungsvorschlag zugeordnet und gegen den Kontoumsatz gehalten. Die Umsatzsteuer-Voranmeldung geht direkt an ELSTER.",
      },
      {
        type: "software",
        slug: "lexware-office",
        reason:
          "Der kürzeste Weg zur DATEV-Kanzlei, Umsatzsteuer-Voranmeldung direkt an ELSTER und Belegerfassung per Smartphone. Für Einzelunternehmen und kleine GmbHs ohne Bilanzierungspflicht der naheliegende Einstieg.",
      },
      {
        type: "paragraph",
        text: "Die Grenze ist klar und sie verläuft genau dort, wo auch die handelsrechtliche Buchführungspflicht verläuft: Lexware Office führt die Einnahmenüberschussrechnung. Wer bilanzieren muss, braucht ein anderes Produkt aus derselben Reihe oder einen anderen Anbieter.",
      },
      {
        type: "paragraph",
        text: "Zweiter Punkt, der regelmäßig zu Ärger führt: Kostenstellen fehlen. Wenn Sie nach Baustelle, Projekt oder Standort auswerten wollen, scheidet das Produkt aus.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 3: sevDesk",
        id: "platz-3",
      },
      {
        type: "paragraph",
        text: "sevDesk gehört hierher, wenn der Engpass in Ihrem Betrieb die Belegerfassung ist. Das ist bei Handwerksbetrieben und im Handel häufiger der Fall als bei Dienstleistern.",
      },
      {
        type: "paragraph",
        text: "Ein fotografierter Beleg wird ausgelesen, Lieferant, Betrag und Steuersatz werden vorgeschlagen und gegen den passenden Bankumsatz gehalten. Bei wiederkehrenden Lieferanten funktioniert das gut. Bei Kassenbons mit Thermodruck und handschriftlichen Quittungen müssen Sie nacharbeiten, und das gilt für jeden Anbieter in dieser Klasse.",
      },
      {
        type: "software",
        slug: "sevdesk",
        reason:
          "Der beste Bankabgleich in dieser Preisklasse, Kostenstellen sind enthalten, und der Tarif Pro bringt eine schlanke Warenwirtschaft mit Artikelstamm und Lagerbestand mit.",
      },
      {
        type: "paragraph",
        text: "Auch hier gilt die Bilanzgrenze: sevDesk führt die Einnahmenüberschussrechnung, nicht die doppelte Buchführung. Und aus Kanzleisicht fehlt ein echter Beraterzugang mit Leserechten, sodass Rückfragen weiterhin per E-Mail laufen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 4: Sage 50 Connected",
        id: "platz-4",
      },
      {
        type: "paragraph",
        text: "Sage 50 Connected ist die Wahl für Betriebe, die Buchhaltung und Warenwirtschaft in einem System führen und dabei bilanzieren wollen. EÜR oder Bilanz sind bereits im Grundtarif enthalten, ebenso die DATEV-Schnittstelle.",
      },
      {
        type: "paragraph",
        text: "Die Tarife unterscheiden sich weniger im Grundgerüst als in der Tiefe. Standard bringt Angebote und Rechnungen, Onlinebanking, Warenwirtschaft, Belegarchivierung und E-Rechnung. Comfort ergänzt Anlagenbuchhaltung und Bestellwesen, Professional zusätzlich Kosten- und Erlösrechnung sowie Variantenartikel.",
      },
      {
        type: "software",
        slug: "sage-50",
        reason:
          "Bilanzfähig im Grundtarif, DATEV-Schnittstelle enthalten, ZUGFeRD-konforme E-Rechnung im Format PDF/A und 30 Tage Testphase ohne Zahlungsangaben. Die Daten liegen in einem zertifizierten Rechenzentrum in Deutschland.",
      },
      {
        type: "note",
        title: "Rechnen Sie hier besonders genau",
        text: "Der Preis gilt pro Arbeitsplatz, bei jährlicher Rechnungsstellung und mit zwölf Monaten Mindestvertragslaufzeit. Comfort ist erst ab zwei Arbeitsplätzen verfügbar, Professional ab drei. Bei vier Arbeitsplätzen im Tarif Professional liegen Sie bei 160,00 EUR pro Monat, zzgl. 19 % MwSt.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 5: Collmex",
        id: "platz-5",
      },
      {
        type: "paragraph",
        text: "Collmex ist der unauffälligste Anbieter in dieser Liste und für preisbewusste Betriebe der interessanteste. Warenwirtschaft, doppelte Buchführung mit Bilanz und Lohnabrechnung mit DEÜV-Meldungen in einem Produkt, zum Festpreis für den Mandanten statt pro Nutzer.",
      },
      {
        type: "software",
        slug: "collmex",
        reason:
          "Warenwirtschaft, Bilanz und Lohn in einem Produkt, abgerechnet pro Mandant statt pro Benutzer. Für Betriebe mit mehreren Personen im Büro ist das der günstigste vollständige Zuschnitt in dieser Liste.",
      },
      {
        type: "paragraph",
        text: "Der Preis dafür ist die Oberfläche. Sie stammt erkennbar aus einer anderen Softwaregeneration und ist nicht selbsterklärend. Neue Mitarbeitende brauchen eine Einweisung, keine Einarbeitung durch Ausprobieren.",
      },
      {
        type: "paragraph",
        text: "Wer damit leben kann, bekommt einen Funktionsumfang, für den andere Anbieter drei getrennte Produkte verkaufen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die fünf im Überblick",
        id: "uebersicht",
      },
      {
        type: "table",
        caption: "Kernunterschiede der fünf Programme, geprüft im September 2026",
        head: ["Programm", "Bilanz", "Abrechnung", "Testphase"],
        rows: [
          ["Sage Active", "ja, im Tarif Essentials", "pro Unternehmen", "30 Tage"],
          ["Lexware Office", "nein, nur EÜR", "pro Unternehmen", "vorhanden"],
          ["sevDesk", "nein, nur EÜR", "pro Unternehmen", "vorhanden"],
          ["Sage 50 Connected", "ja, ab Standard", "pro Arbeitsplatz", "30 Tage"],
          ["Collmex", "ja", "pro Mandant", "kostenloser Tarif"],
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Wie Sie die Testphase richtig nutzen",
        id: "testphase",
      },
      {
        type: "paragraph",
        text: "Fast alle Anbieter gewähren eine Testphase, und fast alle Betriebe nutzen sie falsch. Sie klicken durch die Beispieldaten des Anbieters, finden alles übersichtlich und schließen ab.",
      },
      {
        type: "paragraph",
        text: "Beispieldaten sind so gebaut, dass alles funktioniert. Nehmen Sie stattdessen drei echte Vorgänge.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Die komplizierteste Ausgangsrechnung des letzten Quartals, mit allen Rabatten, Teilleistungen und Sonderkonditionen.",
          "Eine Eingangsrechnung eines Stammlieferanten samt Skontovereinbarung.",
          "Einen vollständigen Monatsabschluss mit Umsatzsteuer-Voranmeldung, vom Beleg bis zur Übermittlung.",
        ],
      },
      {
        type: "paragraph",
        text: "Wenn diese drei sauber durchlaufen, haben Sie eine belastbare Grundlage. Wenn einer hakt, wissen Sie es jetzt und nicht im Februar.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine steuerliche Beratung. Preise und Konditionen ändern sich; maßgeblich sind die Angaben des Anbieters zum Zeitpunkt Ihres Vertragsschlusses.",
      },
    ],
  },

  /* ================================================================= 8 === */
  {
    id: "art-top-lohnabrechnung",
    title: "Die 5 besten Programme für die Lohnabrechnung in Deutschland",
    slug: "beste-lohnabrechnung-software-deutschland",
    excerpt:
      "Entgeltabrechnung ist kein Feld für Kompromisse: ohne DEÜV-Meldungen, Lohnsteueranmeldung und eAU-Abruf ist ein Programm hierzulande nicht einsetzbar. Fünf, die es können.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Rangliste",
    related_software_slugs: [
      "sage-lohnabrechnung",
      "datev-lohn-und-gehalt",
      "lexware-lohn-gehalt",
      "sage-hr-payroll",
      "collmex",
    ],
    ...SARAH,
    read_time_minutes: 12,
    status: "published",
    featured: true,
    published_date: "2026-09-19",
    updated_date: "2026-09-23",
    meta_title: "Beste Lohnabrechnung Software Deutschland 2026",
    meta_description:
      "Fünf geprüfte Programme für die Entgeltabrechnung: DEÜV-Meldungen, Lohnsteueranmeldung, eAU-Abruf und die tatsächlichen Kosten pro Beschäftigtem im Vergleich.",
    content: [
      {
        type: "paragraph",
        text: "Bei der Entgeltabrechnung gibt es eine Eintrittshürde, die kein Marketing überspringt. Ein Programm, das die Meldungen nach dem DEÜV-Verfahren nicht selbst absetzt, ist in Deutschland nicht einsetzbar. Nicht eingeschränkt, nicht umständlich, sondern nicht einsetzbar.",
      },
      {
        type: "paragraph",
        text: "Diese eine Frage räumt den Markt schneller auf als jeder Funktionsvergleich, und sie ist der Grund, warum in dieser Liste keine internationalen Personalplattformen stehen.",
      },
      METHODIK,
      {
        type: "heading",
        level: 2,
        text: "Die Pflichtprüfung vor jeder Auswahl",
        id: "pflichtpruefung",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Werden die Meldungen nach dem DEÜV-Verfahren aus dem Programm heraus abgesetzt, oder werden Daten an einen Abrechner übergeben?",
          "Geht die Lohnsteueranmeldung nach § 41a EStG elektronisch über ELSTER?",
          "Lässt sich die elektronische Arbeitsunfähigkeitsbescheinigung aus dem Programm abrufen?",
          "Wie erfolgt die jährliche Anpassung an Steuertabellen und Beitragsbemessungsgrenzen?",
          "Welcher Buchhaltungsexport ist vorgesehen und arbeitet Ihre Kanzlei damit?",
        ],
      },
      {
        type: "paragraph",
        text: "Der vorletzte Punkt ist bei lokal installierten Programmen der kritische. Ohne laufenden Wartungsvertrag bekommen Sie die Anpassung für das Folgejahr nicht, und dann rechnet das Programm ab Januar falsch. Falsch gerechnete Lohnsteuer holt sich das Finanzamt beim Arbeitgeber.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 1: Sage Lohnabrechnung",
        id: "platz-1",
      },
      {
        type: "paragraph",
        text: "Sage Lohnabrechnung steht vorn, weil es die Abrechnung selbst durchführt, die Meldungen selbst absetzt und dabei ohne Vertragsbindung auskommt. Entwickelt wird die Lösung nach Angabe des Herstellers seit 2009 in Leipzig.",
      },
      {
        type: "paragraph",
        text: "Die drei Tarife unterscheiden sich nicht in der Abrechnung, sondern in den Personalfunktionen. Essentials bringt die Abrechnung samt Meldungen, den Zugriff der Beschäftigten auf ihre Abrechnungen, eine mobile App und den Buchhaltungsexport nach Sage und DATEV. Standard ergänzt Onboarding, Arbeitszeiten, Genehmigungswege und Abwesenheitsverwaltung. Premium fügt Schichtplanung und Ausgabenverwaltung hinzu.",
      },
      {
        type: "software",
        slug: "sage-lohnabrechnung",
        reason:
          "Rechnet selbst ab und setzt die gesetzlichen Meldungen ab, kein bloßes Zuarbeiten. Keine langfristigen Verträge, Kündigung jederzeit möglich, 30 Tage kostenlose Testphase und ein Selbstbedienungsbereich, der die Rückfragen aus der Personalabteilung heraushält.",
      },
      {
        type: "note",
        title: "Rechnen Sie mit Ihrer Kopfzahl, nicht mit dem Grundpreis",
        text: "Alle Tarife enthalten fünf Beschäftigte. Jede weitere Person kostet zusätzlich 3,00 EUR in Essentials, 5,00 EUR in Standard und 7,00 EUR in Premium pro Monat. Bei zwanzig Beschäftigten im Tarif Standard zahlen Sie 30,00 EUR plus fünfzehn mal 5,00 EUR, zusammen 105,00 EUR pro Monat, zzgl. 19 % MwSt. Die Obergrenze liegt bei 150 Beschäftigten.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 2: DATEV Lohn und Gehalt",
        id: "platz-2",
      },
      {
        type: "paragraph",
        text: "Fachlich ist dieses Programm das vollständigste in der Liste, und für Betriebe mit Sonderfällen gibt es keine Alternative. Baulohn mit SOKA-BAU-Meldungen, Kurzarbeitergeld, Altersteilzeit, Pfändungen, A1-Bescheinigungen: es gibt praktisch keinen Fall, den es nicht abbildet.",
      },
      {
        type: "software",
        slug: "datev-lohn-und-gehalt",
        reason:
          "Vollständiges DEÜV-Meldeverfahren, eAU-Abruf, Baulohn und Kurzarbeitergeld. Wenn Ihre Kanzlei abrechnet, läuft sie mit hoher Wahrscheinlichkeit hier, und die Zusammenarbeit ist dann reibungsärmer als bei jeder anderen Wahl.",
      },
      {
        type: "paragraph",
        text: "Der Preis dafür ist die Bedienung. Das Programm setzt Fachwissen voraus und verzeiht wenig. Ein Betrieb ohne ausgebildete Lohnbuchhaltung wird damit nicht glücklich und sollte die Abrechnung an eine Kanzlei geben, was ohnehin der übliche Weg ist.",
      },
      {
        type: "paragraph",
        text: "Der Preis wird über die betreuende Kanzlei abgerechnet und nicht öffentlich als Liste geführt. Wir nennen deshalb keine Zahl.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 3: Sage HR & Payroll",
        id: "platz-3",
      },
      {
        type: "paragraph",
        text: "Dieses Produkt gehört in die Liste, wenn Sie Personalverwaltung und Entgeltabrechnung in einem System führen wollen und beides gleich wichtig ist.",
      },
      {
        type: "software",
        slug: "sage-hr-payroll",
        reason:
          "Verbindet Cloud-Personalverwaltung mit der Abrechnung einschließlich Meldungen. Die Tarife enthalten fünf Beschäftigte; für Betriebe, die Abwesenheiten, Zeiten und Lohn gemeinsam führen, entfällt damit die Schnittstelle zwischen zwei Systemen.",
      },
      {
        type: "paragraph",
        text: "Achten Sie bei diesem Produkttyp besonders auf die Namensähnlichkeit im Markt. Sage HR ohne Zusatz ist eine reine Personalplattform ohne Abrechnung. Die Produktnamen ähneln sich, die Leistung unterscheidet sich erheblich.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 4: Lexware lohn+gehalt",
        id: "platz-4",
      },
      {
        type: "paragraph",
        text: "Für Betriebe zwischen zehn und etwa zweihundert Abrechnungen im Monat, die selbst abrechnen und mit einer lokalen Installation leben können, ist dieses Programm eine solide Wahl.",
      },
      {
        type: "software",
        slug: "lexware-lohn-gehalt",
        reason:
          "Vollständiges DEÜV-Meldeverfahren, Lohnsteueranmeldung an ELSTER und eAU-Abruf, mit einem Monatsablauf, der den Anwender durch die Schritte führt und meldet, wenn etwas fehlt.",
      },
      {
        type: "note",
        title: "Der Wartungsvertrag ist keine Option",
        text: "Ohne ihn erhalten Sie die jährliche Anpassung an Steuertabellen und Beitragsbemessungsgrenzen nicht, und das Programm rechnet ab Januar falsch. Rechnen Sie den Vertrag von Anfang an in die Kosten ein, nicht als mögliche Erweiterung.",
      },
      {
        type: "paragraph",
        text: "Zweite Einschränkung: Die Installation ist lokal und läuft unter Windows. Aus dem Homeoffice kommen Sie nicht an die Abrechnung, es sei denn über eine Terminalserverlösung.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 5: Collmex",
        id: "platz-5",
      },
      {
        type: "paragraph",
        text: "Collmex steht hier, weil es die Lohnabrechnung mit DEÜV-Meldungen im selben Produkt wie Warenwirtschaft und Bilanzbuchhaltung führt, und zwar zum Festpreis für den Mandanten.",
      },
      {
        type: "software",
        slug: "collmex",
        reason:
          "Entgeltabrechnung mit Lohnsteueranmeldung und DEÜV-Meldungen als Teil eines Gesamtpakets, abgerechnet pro Mandant statt pro Benutzer. Für kleine Betriebe, die ohnehin alles in einem System führen wollen, der günstigste Weg.",
      },
      {
        type: "paragraph",
        text: "Den eAU-Abruf konnten wir für dieses Produkt nicht bestätigen. Das ist kein Hinweis darauf, dass er fehlt, sondern dass wir ihn nicht geprüft haben. Fragen Sie nach, bevor Sie sich festlegen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die fünf im Überblick",
        id: "uebersicht",
      },
      {
        type: "table",
        caption: "Vergleich der fünf Programme, geprüft im September 2026",
        head: ["Programm", "Betrieb", "Abrechnung nach", "Testphase"],
        rows: [
          ["Sage Lohnabrechnung", "Cloud", "Kopfzahl, 5 inklusive", "30 Tage"],
          ["DATEV Lohn und Gehalt", "Kanzlei oder lokal", "über die Kanzlei", "nicht veröffentlicht"],
          ["Sage HR & Payroll", "Cloud", "Kopfzahl, 5 inklusive", "vorhanden"],
          ["Lexware lohn+gehalt", "lokal, Windows", "Tarifstufe", "vorhanden"],
          ["Collmex", "Cloud", "Festpreis je Mandant", "kostenloser Tarif"],
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Der häufigste Fehlkauf in diesem Segment",
        id: "fehlkauf",
      },
      {
        type: "paragraph",
        text: "Er besteht darin, eine Personalplattform mit vorbereitender Lohnabrechnung für eine Abrechnungssoftware zu halten. Die Systeme sammeln abrechnungsrelevante Daten und übergeben sie an einen Abrechner. Die Meldungen setzen sie nicht ab.",
      },
      {
        type: "paragraph",
        text: "Das kann genau richtig sein, wenn Sie ohnehin abrechnen lassen. Es ist falsch, wenn Sie damit die Kanzleikosten einsparen wollten. Dann zahlen Sie für das Personalsystem und weiterhin für die Abrechnung.",
      },
      {
        type: "paragraph",
        text: "Stellen Sie deshalb eine einzige Frage schriftlich: Setzt das System die DEÜV-Meldungen selbst ab? Ein Ja oder Nein genügt.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine Rechtsberatung. Für sozialversicherungs- und lohnsteuerrechtliche Fragen wenden Sie sich an Ihre Steuerkanzlei.",
      },
    ],
  },

  /* ================================================================= 9 === */
  {
    id: "art-top-hr-software",
    title: "Die 5 besten HR-Programme für den deutschen Mittelstand",
    slug: "beste-hr-software-mittelstand",
    excerpt:
      "Digitale Personalakte, Abwesenheiten, Zeiterfassung und Bewerbermanagement. Fünf Systeme im Vergleich, mit der entscheidenden Abgrenzung zur Entgeltabrechnung.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Rangliste",
    related_software_slugs: ["sage-hr", "personio", "factorial", "rexx-systems", "sage-hr-payroll"],
    ...SARAH,
    read_time_minutes: 12,
    status: "published",
    featured: false,
    published_date: "2026-09-14",
    updated_date: "2026-09-23",
    meta_title: "Beste HR-Software für den Mittelstand 2026",
    meta_description:
      "Fünf HR-Systeme für deutsche Betriebe im Vergleich: Personalakte, Abwesenheiten, Zeiterfassung, Recruiting und die Abgrenzung zur Lohnabrechnung.",
    content: [
      {
        type: "paragraph",
        text: "HR-Software wird in Deutschland fast immer aus demselben Anlass gekauft: Die Tabelle reicht nicht mehr. Meist ist der Auslöser ein Streit über Resturlaub, eine verlorene Krankmeldung oder eine Betriebsprüfung, bei der die Arbeitszeitnachweise nicht vollständig waren.",
      },
      {
        type: "paragraph",
        text: "Die entscheidende Frage lautet deshalb nicht, welches System die meisten Funktionen hat, sondern welches die Zuarbeit von der Personalabteilung zu den Beschäftigten verlagert. Genau darin unterscheiden sich die fünf hier vorgestellten Produkte.",
      },
      METHODIK,
      {
        type: "heading",
        level: 2,
        text: "Die Abgrenzung, die alles entscheidet",
        id: "abgrenzung",
      },
      {
        type: "paragraph",
        text: "Eine reine Personalplattform verwaltet Akten, Abwesenheiten, Zeiten und Bewerbungen. Sie rechnet keine Gehälter ab und setzt keine Meldungen nach dem DEÜV-Verfahren ab.",
      },
      {
        type: "paragraph",
        text: "Wer beides in einem System will, braucht ein Produkt, das ausdrücklich beides enthält. Klären Sie das vor dem ersten Vertriebsgespräch, sonst vergleichen Sie Produkte, die verschiedene Aufgaben lösen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 1: Personio",
        id: "platz-1",
      },
      {
        type: "paragraph",
        text: "Für wachsende Betriebe ab etwa fünfzig Beschäftigten ist Personio das reifste System am deutschsprachigen Markt. Die digitale Personalakte hat ein Rechtekonzept, das Betriebsräte in der Regel mittragen, und die Genehmigungswege bilden auch mehrstufige Strukturen ab.",
      },
      {
        type: "software",
        slug: "personio",
        reason:
          "Digitale Personalakte mit belastbarem Rechtekonzept, Abwesenheiten mit Genehmigungskette, Zeiterfassung und ein Recruiting, das von der Bewerbung bis zum ersten Arbeitstag durchläuft, ohne dass Daten neu erfasst werden.",
      },
      {
        type: "paragraph",
        text: "Zwei Punkte, die vor dem Abschluss geklärt gehören. Erstens: Die Lohnabrechnung ist vorbereitend. Personio sammelt die Daten und übergibt sie an DATEV oder einen anderen Abrechner; die SV-Meldungen setzt es nicht ab. Zweitens: Die Einführung dauert nach den Berichten, die uns erreichen, regelmäßig länger als im Angebot veranschlagt.",
      },
      {
        type: "paragraph",
        text: "Der Preis hängt von Kopfzahl und Modulen ab und wird auf Anfrage genannt. Für Betriebe unter zwanzig Personen ist er schwer zu rechtfertigen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 2: Sage HR",
        id: "platz-2",
      },
      {
        type: "paragraph",
        text: "Sage HR ist der modulare Gegenentwurf. Das Grundpaket deckt Abwesenheiten, die digitale Personalakte und die mobile App ab. Alles Weitere kommt einzeln hinzu, und zwar erst, wenn Sie es brauchen.",
      },
      {
        type: "software",
        slug: "sage-hr",
        reason:
          "Modularer Aufbau, bei dem nur genutzte Bausteine bezahlt werden, mit digitaler Personalakte, interaktivem Organigramm und einer App, über die Beschäftigte Anträge selbst stellen. Der Test verlangt keine Zahlungsangaben.",
      },
      {
        type: "note",
        title: "Ein Modul fällt aus dem Preisschema",
        text: "Arbeitszeittabellen, Performance und Schichtplanung kosten je 2,50 EUR pro Person und Monat, Ausgaben 1,50 EUR. Recruiting wird dagegen als Festpreis von 175,00 EUR pro Monat berechnet, unabhängig von der Kopfzahl. Für einen Betrieb mit fünfzehn Beschäftigten ist das der mit Abstand teuerste Einzelbaustein.",
      },
      {
        type: "paragraph",
        text: "Für Betriebe, die schrittweise digitalisieren und nicht am ersten Tag alles brauchen, ist diese Struktur die ehrlichere. Für Betriebe, die ohnehin das Gesamtpaket wollen, wird sie gegenüber einem Komplettpreis schnell teurer.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 3: Factorial",
        id: "platz-3",
      },
      {
        type: "paragraph",
        text: "Factorial bedient den Bereich unterhalb von Personio: Betriebe zwischen etwa zehn und achtzig Beschäftigten, denen die großen Systeme zu teuer sind.",
      },
      {
        type: "software",
        slug: "factorial",
        reason:
          "Personalakte, Abwesenheiten, Zeiterfassung und Schichtplanung zu einem Preis, der für kleinere Betriebe darstellbar ist. Die Schichtplanung ist enthalten, was für Gastronomie, Pflege und Einzelhandel der entscheidende Punkt sein kann.",
      },
      {
        type: "paragraph",
        text: "Beim deutschen Recht ist Factorial weniger tief als die hiesigen Anbieter. Die DATEV-Anbindung existiert, aber wir konnten nicht klären, ob sie den vollen Umfang der Lohnschnittstelle abdeckt. Betriebe haben uns von Nacharbeit mit der Kanzlei berichtet. Prüfen Sie diesen Punkt vor einer Entscheidung.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 4: Sage HR & Payroll",
        id: "platz-4",
      },
      {
        type: "paragraph",
        text: "Wenn die Abgrenzung aus dem Anfang dieses Beitrags für Sie so ausfällt, dass Sie beides brauchen, steht dieses Produkt vorn.",
      },
      {
        type: "software",
        slug: "sage-hr-payroll",
        reason:
          "Personalverwaltung und Entgeltabrechnung einschließlich Meldungen in einem System. Für Betriebe, die die Schnittstelle zwischen Personalakte und Abrechnung vermeiden wollen, ist das die konsequentere Lösung als zwei Produkte.",
      },
      {
        type: "paragraph",
        text: "Der Preis folgt derselben Logik wie bei der reinen Abrechnung: Die Tarife enthalten fünf Beschäftigte, weitere werden je Person berechnet. Rechnen Sie auch hier mit Ihrer echten Kopfzahl.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 5: rexx systems",
        id: "platz-5",
      },
      {
        type: "paragraph",
        text: "rexx systems steht am anderen Ende des Spektrums: größere Betriebe und öffentliche Arbeitgeber mit formalisierten Auswahlverfahren.",
      },
      {
        type: "software",
        slug: "rexx-systems",
        reason:
          "Bewerbermanagement mit mehrstufigen Auswahlverfahren, Gremienbeteiligung und einer Dokumentation, die einer Prüfung standhält. Für öffentliche Arbeitgeber mit formalen Anforderungen gibt es dafür wenige Alternativen.",
      },
      {
        type: "paragraph",
        text: "Der Preis dieser Tiefe ist der Einrichtungsaufwand. Eine Einführung ohne Projektbegleitung ist nicht realistisch, und für Betriebe unter zweihundert Beschäftigten steht der Aufwand meist in keinem Verhältnis.",
      },
      {
        type: "heading",
        level: 2,
        text: "Der Betriebsrat gehört in die Auswahl",
        id: "betriebsrat",
      },
      {
        type: "paragraph",
        text: "Wo ein Betriebsrat besteht, ist die Einführung mitbestimmungspflichtig, insbesondere bei allem, was geeignet ist, Verhalten oder Leistung zu überwachen. Zeiterfassung und Leistungsbeurteilung fallen ohne Weiteres darunter.",
      },
      {
        type: "paragraph",
        text: "Betriebe, die den Betriebsrat erst nach der Kaufentscheidung informieren, verlieren regelmäßig Monate. Betriebe, die ihn in die Auswahl einbeziehen, berichten von einem schnelleren Verfahren, weil die kritischen Fragen dann bei der Anbieterauswahl geklärt werden und nicht danach.",
      },
      {
        type: "quote",
        text: "Wir haben den Betriebsrat von Anfang an in die Auswahl geholt. Das hat vier Wochen gekostet und uns vermutlich ein halbes Jahr erspart.",
        source: "Leiterin Personal, Maschinenbaubetrieb mit 190 Beschäftigten, Gespräch im Juni 2026",
      },
      {
        type: "heading",
        level: 2,
        text: "Zur Arbeitszeiterfassung",
        id: "arbeitszeit",
      },
      {
        type: "paragraph",
        text: "Seit dem Beschluss des Bundesarbeitsgerichts vom 13.09.2022 besteht eine Aufzeichnungspflicht. Ein novelliertes Arbeitszeitgesetz, das die Einzelheiten regelt, gibt es bis heute nicht.",
      },
      {
        type: "paragraph",
        text: "Anbieter, die ihr Modul deshalb als gesetzeskonform bewerben, beziehen sich auf eine Rechtslage, die in Teilen noch nicht existiert. Wir haben keine solche Aussage als belastbar bewerten können und tragen sie bei keinem Produkt als bestätigt ein. Wählen Sie ein System, das Beginn, Ende und Pausen erfasst, Korrekturen protokolliert und exportierbar ist. Damit sind Sie auf eine Verschärfung vorbereitet.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine Rechtsberatung. Für arbeits- und datenschutzrechtliche Fragen wenden Sie sich an eine Fachanwältin.",
      },
    ],
  },

  /* ================================================================ 10 === */
  {
    id: "art-top-erp-mittelstand",
    title: "Die 5 besten ERP-Systeme für den deutschen Mittelstand",
    slug: "beste-erp-systeme-mittelstand",
    excerpt:
      "Warenwirtschaft, Fertigung und Finanzen auf einer Datenbasis. Fünf Systeme, die in Deutschland tatsächlich eingeführt werden, mit ehrlichen Angaben zu Kosten und Projektdauer.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Rangliste",
    related_software_slugs: [
      "sage-100",
      "sage-operations",
      "weclapp",
      "dynamics-365-business-central",
      "sap-business-one",
    ],
    ...MICHAEL,
    read_time_minutes: 13,
    status: "published",
    featured: false,
    published_date: "2026-09-12",
    updated_date: "2026-09-23",
    meta_title: "Beste ERP-Systeme für den Mittelstand in Deutschland 2026",
    meta_description:
      "Fünf ERP-Systeme im Vergleich: Modulpreise, Mandantenfähigkeit, Fertigung, DATEV-Anbindung und was ein Einführungsprojekt tatsächlich kostet.",
    content: [
      {
        type: "paragraph",
        text: "Bei ERP-Systemen ist die Softwareauswahl der kleinere Teil der Entscheidung. Der größere ist die Frage, ob Ihr Betrieb bereit ist, seine Abläufe aufzuschreiben und dort zu ändern, wo sie nicht zusammenpassen.",
      },
      {
        type: "paragraph",
        text: "Wer diese Bereitschaft nicht mitbringt, scheitert mit jedem System in dieser Liste. Wer sie mitbringt, hat die Wahl zwischen fünf ernst zu nehmenden Kandidaten.",
      },
      METHODIK,
      {
        type: "heading",
        level: 2,
        text: "Was ein Projekt tatsächlich kostet",
        id: "projektkosten",
      },
      {
        type: "paragraph",
        text: "Vorab die Zahl, die in keinem Angebot steht. Die Betriebe, mit denen wir gesprochen haben, nennen für das Gesamtprojekt das Zwei bis Fünffache der ersten Jahreslizenz.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Beratung und Einrichtung durch einen Partner, in der Regel der größte Einzelposten.",
          "Datenübernahme einschließlich der Bereinigung doppelter Artikel, Kunden und Lieferanten.",
          "Schulung, gerechnet in Personentagen der eigenen Belegschaft.",
          "Produktivitätsverlust in den ersten sechs bis zehn Wochen.",
          "Anpassungen, die erst im laufenden Betrieb sichtbar werden.",
        ],
      },
      {
        type: "paragraph",
        text: "Wer mit dem unteren Rand dieser Spanne kalkuliert, kalkuliert zu knapp.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 1: Sage 100",
        id: "platz-1",
      },
      {
        type: "paragraph",
        text: "Sage 100 steht vorn, weil es zwei Dinge bietet, die im Mittelstand selten zusammenkommen: einen modularen Aufbau mit veröffentlichten Preisen und eine unbegrenzte Mandantenanzahl in allen Kernmodulen.",
      },
      {
        type: "paragraph",
        text: "Der zweite Punkt verändert die Rechnung für jeden Betrieb mit mehreren Gesellschaften grundlegend. Systeme, die pro Mandant abrechnen, werden bei drei Gesellschaften dreimal so teuer. Hier nicht.",
      },
      {
        type: "software",
        slug: "sage-100",
        reason:
          "Warenwirtschaft ab 56,00 EUR, Rechnungswesen ab 58,00 EUR und Produktion ab 90,00 EUR pro Nutzer und Monat, jeweils mit unbegrenzter Mandantenanzahl. DATEV-Export und -Import sowie die Umsatzsteuer-Voranmeldung über ELSTER sind im Rechnungswesen enthalten.",
      },
      {
        type: "paragraph",
        text: "Die Preise gelten bei jährlicher Rechnungsstellung mit zwölf Monaten Mindestvertragslaufzeit. Der Betrieb ist lokal oder in der Cloud möglich, und über das AppCenter stehen mehr als zweihundert Erweiterungen bereit.",
      },
      {
        type: "paragraph",
        text: "Eine selbst startbare Testphase gibt es nicht. Sage bietet eine interaktive Produkttour und ein Infopaket mit Praxisleitfaden zur ERP-Auswahl an.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 2: weclapp",
        id: "platz-2",
      },
      {
        type: "paragraph",
        text: "weclapp ist das zugänglichste System in dieser Liste und für Handels- und Dienstleistungsbetriebe zwischen zehn und zweihundert Beschäftigten oft die pragmatischste Wahl.",
      },
      {
        type: "software",
        slug: "weclapp",
        reason:
          "CRM, Warenwirtschaft, Einkauf, Buchhaltung und Projektverwaltung in einem browserbasierten System mit veröffentlichten Preisen pro Nutzer, gehostet in Deutschland. Der Beleglauf vom Angebot bis zur Buchung ist durchgängig.",
      },
      {
        type: "paragraph",
        text: "Der Buchhaltungsteil ist funktionsfähig, aber schlanker als ein spezialisiertes Produkt. Die meisten Anwender exportieren nach DATEV und lassen den Jahresabschluss in der Kanzlei erstellen. Das ist der übliche und aus unserer Sicht sinnvolle Weg.",
      },
      {
        type: "paragraph",
        text: "Realistisch ist eine Einführungsdauer von mehreren Wochen mit einem Verantwortlichen im Haus. Wer glaubt, das sei in zwei Wochen erledigt, wird enttäuscht.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 3: Sage Operations",
        id: "platz-3",
      },
      {
        type: "paragraph",
        text: "Sage Operations zielt enger als Sage 100: auf Handel und diskrete Fertigung, mit Schwerpunkt auf dem automatisierten Warenfluss.",
      },
      {
        type: "software",
        slug: "sage-operations",
        reason:
          "Beschaffung, Lager, Verkauf und Fertigung auf einer Datenbasis, mit automatisierten Bestellvorschlägen, Workflow-Automatisierung, Automatisierung von Eingangsrechnungen und DATEV-Schnittstelle.",
      },
      {
        type: "note",
        title: "Keine Testphase, dafür eine Live-Demo",
        text: "Für Sage Operations veröffentlicht Sage weder einen Listenpreis noch eine selbst startbare Testphase. Angeboten werden eine Produkttour, ein Infopaket und eine kostenlose persönliche Live-Demo. Verlangen Sie in dieser Demo eigene Vorgänge: eine Bestellung mit Wareneingang, einen Auftrag mit Verfügbarkeitsprüfung und eine Fertigung mit Materialbedarf.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 4: Dynamics 365 Business Central",
        id: "platz-4",
      },
      {
        type: "paragraph",
        text: "Für Betriebe, die ohnehin vollständig in der Microsoft-Welt arbeiten, ist die Einbindung in Outlook, Excel und Teams das entscheidende Argument. Eine Rechnung lässt sich direkt aus Outlook erzeugen, Auswertungen ziehen unmittelbar aus den Daten.",
      },
      {
        type: "software",
        slug: "dynamics-365-business-central",
        reason:
          "Finanzbuchhaltung mit Bilanz, Warenwirtschaft und im Premium-Tarif Fertigung, dazu die tiefste Microsoft-365-Integration in dieser Liste und ein großes Partnernetz in Deutschland.",
      },
      {
        type: "paragraph",
        text: "Zwei Punkte gehören in jede Kalkulation. Erstens wird das System über Implementierungspartner verkauft, und das Einführungsprojekt kostet regelmäßig ein Vielfaches der ersten Jahreslizenz. Zweitens ist die deutsche Entgeltabrechnung nicht enthalten und läuft über ein Zusatzprodukt aus dem Partnernetz.",
      },
      {
        type: "heading",
        level: 2,
        text: "Platz 5: SAP Business One",
        id: "platz-5",
      },
      {
        type: "paragraph",
        text: "SAP Business One ist nicht die kleine Ausgabe von S/4HANA, sondern ein eigenes Produkt mit eigener Codebasis für Betriebe zwischen etwa fünfzig und fünfhundert Beschäftigten.",
      },
      {
        type: "software",
        slug: "sap-business-one",
        reason:
          "Produktionsplanung mit mehrstufigen Stücklisten, Arbeitsplänen und Kapazitätsplanung, dazu eine deutsche Lokalisierung, die vom Hersteller gepflegt wird. Für produzierende Betriebe mit Chargenverfolgung der passendste Zuschnitt in dieser Liste.",
      },
      {
        type: "paragraph",
        text: "Der Vertrieb läuft ausschließlich über Partner, und ein Listenpreis wird nicht veröffentlicht. Die deutsche Entgeltabrechnung ist nicht enthalten.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die fünf im Überblick",
        id: "uebersicht",
      },
      {
        type: "table",
        caption: "Vergleich der fünf Systeme, geprüft im September 2026",
        head: ["System", "Preis veröffentlicht", "Mandanten", "Vorab ansehen"],
        rows: [
          ["Sage 100", "ja, ab 56,00 EUR je Nutzer", "unbegrenzt", "Produkttour"],
          ["weclapp", "ja, pro Nutzer", "je nach Tarif", "Testphase"],
          ["Sage Operations", "nein", "nicht beziffert", "Live-Demo"],
          ["Business Central", "ja, pro Nutzer", "je nach Lizenz", "Testphase"],
          ["SAP Business One", "nein", "je nach Lizenz", "über Partner"],
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Wann Sie kein ERP brauchen",
        id: "wann-nicht",
      },
      {
        type: "paragraph",
        text: "Zum Schluss der Gegenfall, den kein Anbieter schildert. Wenn Sie zweihundert Artikel führen, über einen Kanal verkaufen und Ihr Bestand stimmt, brauchen Sie kein ERP-System. Sie brauchen eine ordentliche Warenwirtschaft und Disziplin bei der Inventur.",
      },
      {
        type: "paragraph",
        text: "Der Nutzen entsteht dort, wo mehrere Kanäle, mehrere Lagerorte oder eine Fertigung zusammenkommen. Wer das nicht hat, spart Geld, indem er wartet.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine betriebswirtschaftliche Beratung. Die genannten Erfahrungswerte stammen aus Gesprächen und sind keine belastbaren Marktzahlen.",
      },
    ],
  },
];
