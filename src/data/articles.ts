import type { Article } from "@/lib/types";
import { blogSchmerzpunkte } from "./blog/schmerzpunkte";
import { blogSchmerzpunkteZwei } from "./blog/schmerzpunkte-zwei";
import { blogRanglisten } from "./blog/ranglisten";
import { vertiefungen } from "./blog/vertiefungen";
import { vertiefungenZwei } from "./blog/vertiefungen-zwei";

/**
 * Ratgeberbestand. Die längeren Beiträge liegen nach Themenblöcken getrennt
 * unter src/data/blog, damit eine einzelne Datei überschaubar bleibt.
 * Sortiert wird ohnehin erst in der Abfrageschicht, nach Datum.
 */
const basisBeitraege: Article[] = [
  {
    id: "art-e-rechnung-pflicht",
    title: "E-Rechnungspflicht: was 2026 für Ihren Betrieb gilt",
    slug: "e-rechnungspflicht-2026",
    excerpt:
      "Seit dem 01.01.2025 muss jedes Unternehmen in Deutschland E-Rechnungen empfangen können. Für den Versand laufen Übergangsfristen, die vom Vorjahresumsatz abhängen. Was das konkret bedeutet.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Recht und Pflichten",
    related_software_slugs: ["lexware-office", "sevdesk", "collmex"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 9,
    status: "published",
    featured: true,
    published_date: "2026-08-19",
    updated_date: "2026-09-08",
    meta_title: "E-Rechnungspflicht 2026: Fristen, Formate und Software",
    meta_description:
      "Empfangspflicht seit 01.01.2025, Versandpflicht gestaffelt nach Umsatz. Welche Formate zählen, was ZUGFeRD und XRechnung unterscheidet und worauf Sie bei der Software achten.",
    content: [
      {
        type: "paragraph",
        text: "Die Umstellung läuft seit dem 01.01.2025 und viele Betriebe haben den ersten Teil bereits hinter sich, ohne es zu merken. Die Pflicht zum Empfang gilt seit diesem Datum ausnahmslos. Sie gilt auch für den Handwerksbetrieb mit drei Angestellten und für den Kleinunternehmer nach § 19 UStG.",
      },
      {
        type: "paragraph",
        text: "Praktisch heißt das: Ein Lieferant darf Ihnen seit Anfang 2025 eine strukturierte elektronische Rechnung schicken, und Sie müssen sie annehmen und verarbeiten können. Eine E-Mail-Adresse reicht dafür formal aus. Ob Sie mit der Datei etwas anfangen können, ist eine andere Frage.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was eine E-Rechnung ist und was nicht",
        id: "was-ist-eine-e-rechnung",
      },
      {
        type: "paragraph",
        text: "Eine PDF-Datei ist keine E-Rechnung. Das ist der Punkt, an dem die meisten Missverständnisse entstehen. Maßgeblich ist § 14 UStG in Verbindung mit der Norm EN 16931: Die Rechnung muss in einem strukturierten elektronischen Format ausgestellt, übermittelt und empfangen werden, das eine automatische Verarbeitung ermöglicht.",
      },
      {
        type: "paragraph",
        text: "Ein gescanntes Papierdokument erfüllt das nicht. Eine PDF-Datei aus einem Textprogramm erfüllt das nicht. Beides sind nach der neuen Systematik sonstige Rechnungen.",
      },
      {
        type: "table",
        caption: "Die beiden in Deutschland maßgeblichen Formate",
        head: ["Format", "Aufbau", "Typischer Einsatz"],
        rows: [
          [
            "XRechnung",
            "Reine XML-Datei ohne Sichtkomponente",
            "Rechnungen an öffentliche Auftraggeber, seit 2020 dort verpflichtend",
          ],
          [
            "ZUGFeRD ab Version 2.1",
            "PDF mit eingebetteter XML-Datei, beide Teile müssen übereinstimmen",
            "Rechnungen zwischen Unternehmen, weil ein Mensch das PDF lesen kann",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "Für den Alltag im Mittelstand ist ZUGFeRD in der Regel die pragmatischere Wahl. Der Empfänger sieht ein gewohntes Rechnungsdokument, seine Software liest die eingebetteten Daten aus. Wer an Behörden liefert, braucht zusätzlich XRechnung.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Fristen für den Versand",
        id: "fristen-versand",
      },
      {
        type: "paragraph",
        text: "Hier wird gestaffelt, und zwar nach dem Gesamtumsatz des Vorjahres.",
      },
      {
        type: "table",
        caption: "Übergangsfristen für den Versand von E-Rechnungen im Inland",
        head: ["Zeitraum", "Wer darf noch anders abrechnen"],
        rows: [
          ["bis 31.12.2026", "alle Unternehmen, mit Zustimmung des Empfängers"],
          [
            "bis 31.12.2027",
            "Unternehmen mit einem Gesamtumsatz bis 800.000 EUR im Jahr 2026",
          ],
          ["ab 01.01.2028", "niemand mehr, die Pflicht gilt vollständig"],
        ],
      },
      {
        type: "note",
        title: "Zustimmung des Empfängers",
        text: "Die Übergangsregelung setzt voraus, dass der Empfänger mit einer anderen Rechnungsform einverstanden ist. Diese Zustimmung kann auch stillschweigend erfolgen, etwa durch vorbehaltlose Bezahlung. Verlassen Sie sich im Zweifel nicht darauf, sondern klären Sie es schriftlich.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was das für die Softwareauswahl bedeutet",
        id: "software",
      },
      {
        type: "paragraph",
        text: "Empfang und Versand sind zwei verschiedene Funktionen mit zwei verschiedenen Fristen. Prüfen Sie beide getrennt. Ein Anbieter, der auf seiner Website nur E-Rechnung schreibt, hat die Frage nicht beantwortet.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Kann die Software eine eingehende ZUGFeRD-Datei auslesen und die Daten in die Buchung übernehmen, oder legt sie nur das PDF ab?",
          "Welche ZUGFeRD-Version wird beim Versand erzeugt? Unter Version 2.1 erfüllt die Datei die Norm nicht.",
          "Wird XRechnung unterstützt? Das brauchen Sie, sobald ein öffentlicher Auftraggeber dabei ist.",
          "Wie werden die Dateien archiviert? Die Aufbewahrungspflicht trifft die strukturierte Datei, nicht den Ausdruck.",
        ],
      },
      {
        type: "software",
        slug: "lexware-office",
        reason:
          "Erzeugt ZUGFeRD 2.3 und XRechnung und liest eingehende Dateien in die Buchung ein. Für Betriebe ohne Bilanzierungspflicht der kürzeste Weg zur Erfüllung beider Anforderungen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Aufbewahrung ist der Teil, den viele übersehen",
        id: "aufbewahrung",
      },
      {
        type: "paragraph",
        text: "Aufbewahrungspflichtig ist die strukturierte Datei im Original. Ein Ausdruck genügt nicht, und ein PDF, das aus der XML-Datei erzeugt wurde, genügt ebenfalls nicht. Die Aufbewahrungsfrist für Rechnungen wurde mit dem Vierten Bürokratieentlastungsgesetz von zehn auf acht Jahre verkürzt.",
      },
      {
        type: "paragraph",
        text: "Wer eingehende E-Rechnungen im E-Mail-Postfach liegen lässt, erfüllt die GoBD-Anforderungen an Unveränderbarkeit und Auffindbarkeit nicht. Das ist der häufigste Fehler in den Betrieben, mit denen wir gesprochen haben.",
      },
      {
        type: "quote",
        text: "Die Empfangspflicht ist technisch trivial und organisatorisch anspruchsvoll. Die meisten Betriebe scheitern nicht am Format, sondern an der Ablage.",
        source: "Aus einem Gespräch mit einer Steuerberaterin aus Dortmund, geführt im Juli 2026",
      },
      {
        type: "heading",
        level: 2,
        text: "Was wir nicht beantworten können",
        id: "offene-fragen",
      },
      {
        type: "paragraph",
        text: "Ob die Finanzverwaltung in der Übergangszeit bei formalen Mängeln des strukturierten Datensatzes den Vorsteuerabzug versagt, ist nicht abschließend geklärt. Das BMF-Schreiben vom 15.10.2024 äußert sich dazu zurückhaltend. Wir tragen das nach, sobald belastbare Verwaltungspraxis erkennbar ist.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine steuerliche Beratung. Für Ihren konkreten Fall fragen Sie Ihre Steuerkanzlei.",
      },
    ],
  },

  {
    id: "art-gobd-verstehen",
    title: "GoBD in der Praxis: was Ihre Software können muss",
    slug: "gobd-anforderungen-software",
    excerpt:
      "Unveränderbarkeit, Nachvollziehbarkeit und Verfahrensdokumentation. Die drei Anforderungen, an denen eine Betriebsprüfung tatsächlich ansetzt, und was davon die Software leisten kann.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Recht und Pflichten",
    related_software_slugs: ["datev-unternehmen-online", "buchhaltungsbutler"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 8,
    status: "published",
    featured: true,
    published_date: "2026-07-30",
    updated_date: "2026-07-30",
    meta_title: "GoBD: Anforderungen an Buchhaltungssoftware",
    meta_description:
      "Was GoBD-Konformität konkret verlangt, warum ein Testat kein Freibrief ist und welche Pflicht bei Ihnen bleibt, egal welche Software Sie einsetzen.",
    content: [
      {
        type: "paragraph",
        text: "Die Abkürzung steht für Grundsätze zur ordnungsmäßigen Führung und Aufbewahrung von Büchern, Aufzeichnungen und Unterlagen in elektronischer Form sowie zum Datenzugriff. Dahinter steht ein BMF-Schreiben, zuletzt umfassend überarbeitet 2019 und seither mehrfach ergänzt.",
      },
      {
        type: "paragraph",
        text: "Für die Softwareauswahl sind drei Anforderungen entscheidend.",
      },
      {
        type: "heading",
        level: 2,
        text: "Unveränderbarkeit",
        id: "unveraenderbarkeit",
      },
      {
        type: "paragraph",
        text: "Eine einmal erfasste Buchung darf nicht spurlos geändert werden können. Wird sie korrigiert, muss der ursprüngliche Inhalt weiterhin erkennbar bleiben. Praktisch heißt das: Stornobuchung statt Überschreiben, und ein Protokoll, das festhält, wer wann was geändert hat.",
      },
      {
        type: "paragraph",
        text: "Eine Tabellenkalkulation erfüllt das nicht und kann es nicht erfüllen. Das ist der Grund, warum eine Excel-Datei als Grundaufzeichnung in einer Prüfung regelmäßig beanstandet wird.",
      },
      {
        type: "heading",
        level: 2,
        text: "Nachvollziehbarkeit und Belegprinzip",
        id: "nachvollziehbarkeit",
      },
      {
        type: "paragraph",
        text: "Zu jeder Buchung gehört ein Beleg, und der Weg vom Beleg zur Buchung und zurück muss ohne Zwischenschritt gangbar sein. Ein Prüfer, der eine Zahl in der Summen- und Saldenliste anklickt, will den zugehörigen Beleg sehen.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Progressive Prüfung: vom Beleg über die Buchung bis in die Auswertung",
          "Retrograde Prüfung: von der Auswertung zurück bis zum einzelnen Beleg",
          "Beides muss in vertretbarer Zeit möglich sein, ohne dass jemand Ordner heraussucht",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Verfahrensdokumentation, und die bleibt bei Ihnen",
        id: "verfahrensdokumentation",
      },
      {
        type: "paragraph",
        text: "Dies ist der Punkt, an dem die meisten Betriebe eine Lücke haben. Verlangt wird eine Beschreibung Ihres tatsächlichen Ablaufs: Wie kommt ein Beleg ins Haus, wer erfasst ihn, wie wird er abgelegt, wie lange, wer darf was ändern.",
      },
      {
        type: "note",
        title: "Kein Anbieter kann Ihnen das abnehmen",
        text: "Die Verfahrensdokumentation beschreibt Ihre Organisation, nicht die Software. Vorlagen der Anbieter sind ein Anfang, aber eine Vorlage, die den tatsächlichen Ablauf nicht abbildet, hilft in einer Prüfung nicht. Wer keine hat, sollte einen halben Tag investieren und die eigenen Abläufe aufschreiben.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was ein GoBD-Testat wert ist",
        id: "testat",
      },
      {
        type: "paragraph",
        text: "Ein Testat ist die Bescheinigung eines Wirtschaftsprüfers, dass eine bestimmte Programmversion die Anforderungen bei bestimmungsgemäßer Nutzung erfüllen kann. Zwei Einschränkungen stecken in diesem Satz.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Es bezieht sich auf eine Version zu einem Zeitpunkt. Ein Testat von 2021 sagt über den Stand von 2026 wenig aus.",
          "Es sagt nichts über Ihre Nutzung. Wer Belege außerhalb des Systems sammelt, macht das Testat wertlos.",
        ],
      },
      {
        type: "paragraph",
        text: "Wir tragen deshalb in unserer Prüfliste Prüfer und Jahr ein, nicht nur ein Häkchen. Wo wir beides nicht verifizieren konnten, steht das dort ausdrücklich.",
      },
    ],
  },

  {
    id: "art-datev-export",
    title: "DATEV-Export, DATEV-Schnittstelle: der Unterschied kostet Sie Zeit",
    slug: "datev-export-schnittstelle-unterschied",
    excerpt:
      "Fast jeder Anbieter wirbt mit DATEV. Gemeint sind zwei sehr verschiedene Dinge, und nur eines davon macht Ihre Kanzlei wirklich zufrieden.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Auswahl und Wechsel",
    related_software_slugs: ["sevdesk", "buchhaltungsbutler", "datev-unternehmen-online"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 6,
    status: "published",
    featured: false,
    published_date: "2026-07-11",
    updated_date: "2026-07-11",
    meta_title: "DATEV-Export und DATEV-Schnittstelle im Vergleich",
    meta_description:
      "Was der DATEV-Export leistet, was eine echte Schnittstelle zusätzlich kann und welche Fragen Sie dem Anbieter vor dem Kauf stellen sollten.",
    content: [
      {
        type: "paragraph",
        text: "Auf der Produktseite steht DATEV. Ihre Kanzlei erwartet daraufhin etwas Bestimmtes. Ob beide dasselbe meinen, stellt sich in der Regel erst im ersten Monatsabschluss heraus.",
      },
      {
        type: "heading",
        level: 2,
        text: "Der Export",
        id: "export",
      },
      {
        type: "paragraph",
        text: "Die Software erzeugt eine Datei im DATEV-Format, meistens als CSV nach dem Aufbau der DATEV-Schnittstellenbeschreibung. Sie laden die Datei herunter und schicken sie an Ihre Kanzlei, die sie dort einliest.",
      },
      {
        type: "paragraph",
        text: "Das funktioniert und ist für viele Betriebe ausreichend. Es bleibt aber ein manueller Schritt pro Monat, und die Belegbilder gehen getrennt auf die Reise oder gar nicht.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Schnittstelle",
        id: "schnittstelle",
      },
      {
        type: "paragraph",
        text: "Hier wandern Buchungssätze und Belegbilder gemeinsam und ohne manuellen Zwischenschritt in den DATEV-Bestand der Kanzlei. Für den Berater ist das der entscheidende Unterschied, weil er den Beleg am Buchungssatz sieht und nicht in einem zweiten Ordner suchen muss.",
      },
      {
        type: "table",
        caption: "Was die beiden Wege unterscheidet",
        head: ["Merkmal", "Export", "Schnittstelle"],
        rows: [
          ["Buchungssätze", "ja", "ja"],
          ["Belegbilder", "getrennt oder gar nicht", "gemeinsam mit dem Buchungssatz"],
          ["Manueller Schritt pro Monat", "ja", "nein"],
          ["Rückmeldung von Korrekturen der Kanzlei", "nein", "je nach Produkt"],
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Drei Fragen an den Anbieter",
        id: "fragen",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Werden Belegbilder mit übertragen oder nur Buchungssätze?",
          "In welcher Fassung der DATEV-Schnittstellenbeschreibung wird exportiert?",
          "Kommen Korrekturen, die die Kanzlei vornimmt, in mein System zurück?",
        ],
      },
      {
        type: "paragraph",
        text: "Stellen Sie diese Fragen schriftlich und lassen Sie sich die Antwort schriftlich geben. Eine mündliche Zusage im Vertriebsgespräch hilft im Februar nicht weiter.",
      },
    ],
  },

  {
    id: "art-wechsel-buchhaltung",
    title: "Buchhaltungssoftware wechseln, ohne den Jahresabschluss zu gefährden",
    slug: "buchhaltungssoftware-wechseln",
    excerpt:
      "Der richtige Zeitpunkt ist der Jahreswechsel, und die Vorbereitung beginnt im Oktober. Was mitgenommen werden muss und was erfahrungsgemäß liegen bleibt.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Auswahl und Wechsel",
    related_software_slugs: ["lexware-office", "sevdesk", "collmex"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 7,
    status: "published",
    featured: true,
    published_date: "2026-09-02",
    updated_date: "2026-09-02",
    meta_title: "Buchhaltungssoftware wechseln: Ablauf und Zeitplan",
    meta_description:
      "Wann der Wechsel sinnvoll ist, welche Daten übernommen werden müssen und welche Aufbewahrungspflicht für das alte System bestehen bleibt.",
    content: [
      {
        type: "paragraph",
        text: "Ein Wechsel mitten im Geschäftsjahr ist möglich und fast immer eine schlechte Idee. Die Summen- und Saldenliste wird auf zwei Systeme verteilt, die Umsatzsteuer-Voranmeldung muss aus zwei Quellen zusammengesetzt werden und der Jahresabschluss kostet Ihre Kanzlei zusätzliche Stunden.",
      },
      {
        type: "paragraph",
        text: "Der Stichtag ist der 1. Januar. Damit er hält, beginnt die Vorbereitung im Oktober.",
      },
      {
        type: "heading",
        level: 2,
        text: "Zeitplan",
        id: "zeitplan",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Oktober: Auswahl treffen, Testzugang einrichten, mit der Kanzlei abstimmen",
          "November: Stammdaten übernehmen und prüfen, Kontenrahmen abgleichen",
          "Dezember: Parallelbetrieb mit wenigen echten Belegen, Abläufe einüben",
          "Januar: produktiv im neuen System, altes System nur noch lesend",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Was übernommen werden muss",
        id: "daten",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Kunden- und Lieferantenstammdaten mit Zahlungsbedingungen und Steuerschlüsseln",
          "Kontenrahmen, in der Regel SKR03 oder SKR04, in derselben Fassung wie bisher",
          "Offene Posten zum Stichtag, auf beiden Seiten",
          "Eröffnungsbilanzwerte oder die Salden der Einnahmenüberschussrechnung",
          "Artikelstamm, sofern Sie Warenwirtschaft nutzen",
        ],
      },
      {
        type: "note",
        title: "Das alte System bleibt aufbewahrungspflichtig",
        text: "Die Buchführungsdaten des alten Systems müssen weiterhin maschinell auswertbar vorgehalten werden, und zwar über die gesamte Aufbewahrungsfrist. Ein Ausdruck reicht nicht. Klären Sie vor der Kündigung, ob der alte Anbieter einen lesenden Zugang anbietet oder ob Sie einen GDPdU-Datenträger brauchen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was erfahrungsgemäß liegen bleibt",
        id: "liegen-bleibt",
      },
      {
        type: "paragraph",
        text: "Wiederkehrende Buchungen, Zahlungsbedingungen einzelner Kunden und individuelle Auswertungen werden bei Migrationen regelmäßig vergessen. Sie fallen erst im Februar auf, wenn eine Rechnung mit falschem Skonto herausgeht.",
      },
      {
        type: "paragraph",
        text: "Legen Sie eine Liste an, bevor Sie den Zugang zum alten System verlieren. Das ist die eine halbe Stunde, die sich am sichersten auszahlt.",
      },
    ],
  },

  {
    id: "art-kleinunternehmer",
    title: "Kleinunternehmerregelung: welche Software dafür genügt",
    slug: "kleinunternehmerregelung-software",
    excerpt:
      "Wer nach § 19 UStG abrechnet, braucht keine Umsatzsteuerfunktion, aber sehr wohl eine saubere Belegablage. Worauf es ankommt und wo die Grenze liegt.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Für Selbstständige",
    related_software_slugs: ["papierkram", "collmex", "lexware-office"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 5,
    status: "published",
    featured: false,
    published_date: "2026-06-17",
    updated_date: "2026-06-17",
    meta_title: "Software für Kleinunternehmer nach § 19 UStG",
    meta_description:
      "Welche Funktionen ein Kleinunternehmer wirklich braucht, welcher Hinweis auf die Rechnung gehört und wann der Wechsel zur Regelbesteuerung ansteht.",
    content: [
      {
        type: "paragraph",
        text: "Die Kleinunternehmerregelung nach § 19 UStG befreit Sie davon, Umsatzsteuer auszuweisen und abzuführen. Im Gegenzug entfällt der Vorsteuerabzug. Seit 2025 liegen die Grenzen bei 25.000 EUR im Vorjahr und 100.000 EUR im laufenden Jahr.",
      },
      {
        type: "paragraph",
        text: "Für die Software heißt das zunächst: weniger ist nötig. Keine Umsatzsteuer-Voranmeldung, keine Steuerschlüssel, keine Vorsteuerkonten.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was trotzdem gebraucht wird",
        id: "trotzdem",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Der Pflichthinweis auf der Rechnung, dass nach § 19 UStG keine Umsatzsteuer ausgewiesen wird",
          "Eine saubere Einnahmenüberschussrechnung für die Anlage EÜR",
          "Belegablage, die den GoBD-Anforderungen an Unveränderbarkeit standhält",
          "Empfang von E-Rechnungen, denn davon befreit die Kleinunternehmerregelung nicht",
        ],
      },
      {
        type: "note",
        title: "Die Empfangspflicht gilt auch für Sie",
        text: "Die Pflicht, E-Rechnungen empfangen zu können, gilt seit dem 01.01.2025 unabhängig vom Umsatz. Ein Kleinunternehmer ist davon nicht ausgenommen. Beim Versand genießen Kleinunternehmer dagegen eine dauerhafte Erleichterung.",
      },
      {
        type: "heading",
        level: 2,
        text: "Wann Sie umstellen müssen",
        id: "umstellung",
      },
      {
        type: "paragraph",
        text: "Wird die Grenze von 100.000 EUR im laufenden Jahr überschritten, endet die Kleinunternehmereigenschaft sofort mit diesem Umsatz, nicht erst zum Jahreswechsel. Ihre Software muss dann im laufenden Jahr auf Regelbesteuerung umschalten können.",
      },
      {
        type: "paragraph",
        text: "Fragen Sie das vor dem Kauf ab, wenn Ihr Umsatz in diese Nähe wächst. Nicht jedes einfache Rechnungsprogramm kann das sauber.",
      },
    ],
  },

  {
    id: "art-zeiterfassung-pflicht",
    title: "Arbeitszeiterfassung: was gilt und was Software daraus macht",
    slug: "arbeitszeiterfassung-pflicht",
    excerpt:
      "Seit dem Beschluss des Bundesarbeitsgerichts vom 13.09.2022 besteht eine Aufzeichnungspflicht. Ein neues Arbeitszeitgesetz gibt es weiterhin nicht. Was Betriebe in dieser Lage tun.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Personal",
    related_software_slugs: ["personio", "factorial", "awork"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 6,
    status: "published",
    featured: false,
    published_date: "2026-05-27",
    updated_date: "2026-08-11",
    meta_title: "Arbeitszeiterfassung: Pflicht, Rechtslage und Software",
    meta_description:
      "Der BAG-Beschluss von 2022, der ausstehende Gesetzentwurf und was eine Zeiterfassung praktisch leisten muss.",
    content: [
      {
        type: "paragraph",
        text: "Das Bundesarbeitsgericht hat am 13.09.2022 entschieden, dass Arbeitgeber schon nach geltendem Arbeitsschutzrecht verpflichtet sind, ein System zur Erfassung der Arbeitszeit einzuführen. Der Beschluss trägt das Aktenzeichen 1 ABR 22/21.",
      },
      {
        type: "paragraph",
        text: "Seitdem liegt ein Referentenentwurf zur Änderung des Arbeitszeitgesetzes vor, der bis heute nicht verabschiedet wurde. Betriebe befinden sich damit in einer Lage, in der die Pflicht besteht, die Ausgestaltung aber nicht abschließend geregelt ist.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was unstrittig ist",
        id: "unstrittig",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Beginn, Ende und Dauer der täglichen Arbeitszeit sind aufzuzeichnen",
          "Die Aufzeichnung muss objektiv, verlässlich und zugänglich sein",
          "Die Aufzeichnung kann an die Beschäftigten delegiert werden, die Verantwortung bleibt beim Arbeitgeber",
          "Ein Betriebsrat hat bei der Ausgestaltung des Systems ein Mitbestimmungsrecht",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Was offen ist",
        id: "offen",
      },
      {
        type: "paragraph",
        text: "Ob die Aufzeichnung elektronisch erfolgen muss, ob es Ausnahmen für kleine Betriebe gibt und wie lange aufzubewahren ist, hängt vom künftigen Gesetz ab. Wer heute ein System auswählt, sollte es so wählen, dass eine Verschärfung keine erneute Umstellung erzwingt.",
      },
      {
        type: "note",
        title: "Vorsicht bei Werbeaussagen",
        text: "Anbieter, die ihr Produkt als gesetzeskonform bewerben, beziehen sich auf eine Rechtslage, die in Teilen noch nicht existiert. Wir haben in unseren Prüfungen keine Aussage dieser Art als belastbar bewerten können und tragen das bei jedem Produkt entsprechend ein.",
      },
      {
        type: "heading",
        level: 2,
        text: "Praktische Anforderungen an das System",
        id: "anforderungen",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Erfassung von Beginn, Ende und Pausen, nicht nur der Tagessumme",
          "Nachträgliche Korrekturen mit Protokoll, wer wann was geändert hat",
          "Export in ein lesbares Format, unabhängig vom Anbieter",
          "Rechtekonzept, das der Betriebsrat mittragen kann",
        ],
      },
    ],
  },

  {
    id: "art-erp-einfuehrung",
    title: "ERP-Einführung im Mittelstand: warum die Rechnung selten aufgeht",
    slug: "erp-einfuehrung-mittelstand",
    excerpt:
      "Die Lizenzkosten sind der kleinere Teil. Was ein Einführungsprojekt tatsächlich verbraucht und an welchen drei Stellen Projekte in der Praxis scheitern.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Auswahl und Wechsel",
    related_software_slugs: ["weclapp", "dynamics-365-business-central", "odoo"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 8,
    status: "published",
    featured: false,
    published_date: "2026-04-24",
    updated_date: "2026-04-24",
    meta_title: "ERP-Einführung: Kosten, Dauer und typische Fehler",
    meta_description:
      "Was ein ERP-Projekt neben der Lizenz kostet, wie lange es dauert und woran Einführungen im Mittelstand regelmäßig scheitern.",
    content: [
      {
        type: "paragraph",
        text: "Ein ERP-System ist kein Kauf, sondern ein Projekt. Dieser Satz steht in jedem Ratgeber, und trotzdem kalkulieren Betriebe regelmäßig nur die Lizenz.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was neben der Lizenz anfällt",
        id: "kosten",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Beratung und Einrichtung durch einen Partner, häufig der größte Posten",
          "Datenübernahme aus den Altsystemen, inklusive Bereinigung der Stammdaten",
          "Schulung, gerechnet in Personentagen der eigenen Belegschaft",
          "Produktivitätsverlust in den ersten Wochen nach der Umstellung",
          "Anpassungen, die erst im Betrieb sichtbar werden",
        ],
      },
      {
        type: "paragraph",
        text: "Die Betriebe, mit denen wir gesprochen haben, nennen für das Gesamtprojekt das Zwei- bis Fünffache der ersten Jahreslizenz. Das ist keine Kennzahl, sondern eine Erfahrungsspanne, und sie streut erheblich.",
      },
      {
        type: "heading",
        level: 2,
        text: "Drei Stellen, an denen Projekte scheitern",
        id: "scheitern",
      },
      {
        type: "heading",
        level: 3,
        text: "Verschmutzte Stammdaten",
        id: "stammdaten",
      },
      {
        type: "paragraph",
        text: "Artikelnummern, die zweimal vergeben wurden. Kunden, die dreimal angelegt sind. Das alte System hat damit gelebt, das neue rechnet damit. Die Bereinigung ist unangenehm und gehört vor den Projektstart, nicht mittendrin.",
      },
      {
        type: "heading",
        level: 3,
        text: "Kein Verantwortlicher im Haus",
        id: "verantwortlicher",
      },
      {
        type: "paragraph",
        text: "Ein Projekt, das nebenbei von der Geschäftsführung betreut wird, zieht sich. Es braucht eine Person mit Entscheidungsbefugnis und freigeräumter Zeit. Wer diese Person nicht benennen kann, sollte das Projekt verschieben.",
      },
      {
        type: "heading",
        level: 3,
        text: "Prozesse, die niemand aufgeschrieben hat",
        id: "prozesse",
      },
      {
        type: "paragraph",
        text: "Der Partner fragt, wie Ihre Auftragsabwicklung läuft. Wenn drei Personen drei verschiedene Antworten geben, ist das keine Frage der Software. Diese Klärung ist der eigentliche Wert eines ERP-Projekts und der Teil, der am meisten weh tut.",
      },
      {
        type: "quote",
        text: "Wir haben in dem Projekt gelernt, dass unser Wareneingang seit Jahren anders lief als beschrieben. Das war unangenehm und im Ergebnis das Wertvollste daran.",
        source: "Kaufmännischer Leiter eines Handelsunternehmens mit 60 Mitarbeitenden, Gespräch im März 2026",
      },
    ],
  },

  {
    id: "art-hosting-standort",
    title: "Hosting-Standort und AVV: worauf Sie bei Cloud-Software achten",
    slug: "hosting-standort-avv-cloud",
    excerpt:
      "Ein Auftragsverarbeitungsvertrag ist Pflicht, sobald ein Dienstleister personenbezogene Daten für Sie verarbeitet. Was darin stehen muss und warum der Serverstandort allein nichts entscheidet.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Recht und Pflichten",
    related_software_slugs: ["centralstationcrm", "stackfield", "hubspot-crm"],
    author_name: "Daniel Hoffmann",
    author_title: "Gründer und redaktionell verantwortlich",
    author_bio:
      "Daniel Hoffmann betreibt Softwareblick und ist für redaktionelle Fragen und Korrekturen erreichbar.",
    read_time_minutes: 6,
    status: "published",
    featured: false,
    published_date: "2026-03-19",
    updated_date: "2026-03-19",
    meta_title: "Auftragsverarbeitungsvertrag und Hosting-Standort",
    meta_description:
      "Wann Sie einen AVV nach Art. 28 DSGVO brauchen, was hineingehört und warum EU-Hosting bei amerikanischen Anbietern die Frage nicht vollständig beantwortet.",
    content: [
      {
        type: "paragraph",
        text: "Sobald ein Softwareanbieter personenbezogene Daten in Ihrem Auftrag verarbeitet, und das tut er, sobald Kundennamen oder Mitarbeitendendaten in seinem System liegen, brauchen Sie einen Vertrag nach Art. 28 DSGVO.",
      },
      {
        type: "paragraph",
        text: "Verantwortlich bleiben Sie. Der Anbieter ist Auftragsverarbeiter. Fehlt der Vertrag, ist das ein eigenständiger Verstoß, unabhängig davon, ob etwas passiert ist.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was im Vertrag stehen muss",
        id: "inhalt",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Gegenstand, Dauer, Art und Zweck der Verarbeitung",
          "Die Kategorien betroffener Personen und der Daten",
          "Technische und organisatorische Maßnahmen, konkret und nicht als Schlagwortliste",
          "Regelungen zu Unterauftragsverarbeitern, mit Namen und Sitz",
          "Löschung oder Rückgabe nach Vertragsende",
          "Unterstützungspflichten bei Auskunftsersuchen und Datenpannen",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Warum der Serverstandort nicht alles beantwortet",
        id: "standort",
      },
      {
        type: "paragraph",
        text: "Ein amerikanischer Anbieter kann Server in Frankfurt betreiben. Der Konzern unterliegt trotzdem amerikanischem Recht, und der Zugriff auf Daten durch Mutterunternehmen oder Behörden ist damit eine eigene Frage.",
      },
      {
        type: "paragraph",
        text: "Der Angemessenheitsbeschluss für das EU-US Data Privacy Framework von 2023 hat die Lage entspannt. Ob er dauerhaft Bestand hat, ist offen; die beiden Vorgängerregelungen wurden vom Europäischen Gerichtshof aufgehoben.",
      },
      {
        type: "note",
        title: "Praktischer Rat",
        text: "Prüfen Sie die Liste der Unterauftragsverarbeiter. Dort steht häufiger als im Hauptvertrag, wo Daten tatsächlich hinfließen. Ein Anbieter, der diese Liste nicht öffentlich führt, sollte sie Ihnen auf Anfrage geben.",
      },
    ],
  },
];

/**
 * Hängt die vertiefenden Abschnitte an einen Beitrag an, und zwar vor dem
 * letzten Block. Der letzte Block ist durchgängig der Haftungshinweis, und
 * der gehört ans Ende des Textes, nicht in die Mitte.
 */
function mitVertiefung(beitrag: Article): Article {
  const zusatz = [...(vertiefungen[beitrag.id] ?? []), ...(vertiefungenZwei[beitrag.id] ?? [])];
  if (zusatz.length === 0) return beitrag;

  const kopf = beitrag.content.slice(0, -1);
  const schluss = beitrag.content.slice(-1);
  return { ...beitrag, content: [...kopf, ...zusatz, ...schluss] };
}

export const articles: Article[] = [
  ...blogSchmerzpunkte,
  ...blogSchmerzpunkteZwei,
  ...blogRanglisten,
  ...basisBeitraege,
].map(mitVertiefung);
