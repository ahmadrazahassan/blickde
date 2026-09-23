import type { Article } from "@/lib/types";

const MICHAEL = {
  author_name: "Michael Ebertz",
  author_title: "Redakteur, Schwerpunkt Rechnungswesen",
  author_bio:
    "Michael Ebertz war zwölf Jahre Bilanzbuchhalter in einem Handelsunternehmen mit rund 180 Mitarbeitenden und schreibt seit 2021 über Software für das Rechnungswesen.",
};

const KATHARINA = {
  author_name: "Katharina Brehm",
  author_title: "Redaktionsleitung",
  author_bio:
    "Katharina Brehm ist gelernte Steuerfachangestellte und war neun Jahre in einer mittelständischen Kanzlei tätig, zuletzt in der Begleitung von Betriebsprüfungen.",
};

export const blogSchmerzpunkteZwei: Article[] = [
  /* ================================================================= 4 === */
  {
    id: "art-lager-einkauf-verkauf-getrennt",
    title: "Drei Systeme für einen Artikel: der teuerste Fehler im Handel",
    slug: "lager-einkauf-verkauf-getrennte-systeme",
    excerpt:
      "Der Bestand steht in der Warenwirtschaft, der Einkauf läuft über eine Tabelle, der Verkauf über den Shop. Sobald sich diese drei Zahlen widersprechen, verkaufen Sie Ware, die Sie nicht haben.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "ERP und Warenwirtschaft",
    related_software_slugs: ["sage-operations", "sage-100", "weclapp", "xentral"],
    ...MICHAEL,
    read_time_minutes: 12,
    status: "published",
    featured: true,
    published_date: "2026-09-09",
    updated_date: "2026-09-23",
    meta_title: "Getrennte Systeme in Lager, Einkauf und Verkauf: die Folgekosten",
    meta_description:
      "Warum widersprüchliche Bestandsdaten im Handel teurer sind als jede ERP-Lizenz, woran man den Kipppunkt erkennt und welche Fragen eine Einführung entscheiden.",
    content: [
      {
        type: "paragraph",
        text: "Es beginnt immer harmlos. Ein Händler startet mit einer Warenwirtschaft, die zum Betrieb passt. Dann kommt ein Onlineshop dazu, weil die Kundschaft das erwartet. Später ein Marktplatz, weil dort die Mengen liegen. Der Einkauf läuft weiterhin über eine Tabelle, weil das immer funktioniert hat.",
      },
      {
        type: "paragraph",
        text: "Jeder einzelne Schritt war richtig. Das Ergebnis ist es nicht.",
      },
      {
        type: "heading",
        level: 2,
        text: "Der Moment, in dem es kippt",
        id: "kipppunkt",
      },
      {
        type: "paragraph",
        text: "Der Kipppunkt ist nicht die Zahl der Bestellungen. Er ist der Tag, an dem zwei Systeme unterschiedliche Bestände melden und niemand mehr sagen kann, welches recht hat.",
      },
      {
        type: "paragraph",
        text: "Ab diesem Tag beginnt eine Praxis, die Betriebe jahrelang beibehalten: Man pflegt einen Sicherheitspuffer. Im Shop werden nicht siebzig Stück angeboten, sondern fünfzig, damit nichts überverkauft wird. Zwanzig Stück liegen im Lager, sind bezahlt, stehen in der Bilanz und sind für den Vertrieb unsichtbar.",
      },
      {
        type: "paragraph",
        text: "Dieser Puffer ist die eigentliche Rechnung. Er kostet keinen Cent Lizenzgebühr und bindet fünfstellige Beträge.",
      },
      {
        type: "table",
        caption: "Gebundenes Kapital durch Sicherheitspuffer, Handelsbetrieb mit 2.400 Artikeln",
        head: ["Kennzahl", "Wert"],
        rows: [
          ["Artikel mit Sicherheitspuffer", "1.850"],
          ["Durchschnittlicher Puffer je Artikel", "14 Stück"],
          ["Durchschnittlicher Einstandswert je Stück", "11,40 EUR"],
          ["Gebundenes Kapital", "295.260 EUR"],
          ["Kalkulatorischer Zinssatz", "6 %"],
          ["Jährliche Kapitalkosten", "17.716 EUR"],
        ],
      },
      {
        type: "paragraph",
        text: "Knapp achtzehntausend Euro im Jahr, allein für Bestände, die aus Misstrauen gegenüber den eigenen Zahlen gehalten werden. Dazu kommen Lagerfläche, Schwund und Artikel, die veralten, bevor sie verkauft sind.",
      },
      {
        type: "note",
        title: "Der Puffer ist rational",
        text: "Niemand hält Sicherheitsbestände aus Bequemlichkeit. Sie sind die einzig vernünftige Reaktion auf unzuverlässige Daten. Wer den Puffer abbauen will, muss zuerst die Daten in Ordnung bringen, nicht umgekehrt.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die zweite Rechnung: überverkaufte Ware",
        id: "ueberverkauf",
      },
      {
        type: "paragraph",
        text: "Trotz Puffer passiert es. Zwei Kanäle verkaufen gleichzeitig das letzte Stück. Der Kunde bekommt eine Bestellbestätigung, und drei Tage später eine Entschuldigung.",
      },
      {
        type: "paragraph",
        text: "Die Kosten dieses Vorgangs werden regelmäßig unterschätzt, weil sie sich auf viele Stellen verteilen. Bearbeitung durch den Kundendienst, Stornierung, Rückerstattung, auf Marktplätzen zusätzlich eine Kennzahl für Verkäuferleistung, die sich verschlechtert und die Sichtbarkeit der Angebote senkt.",
      },
      {
        type: "paragraph",
        text: "Händler, mit denen wir gesprochen haben, nennen für die Bearbeitung eines überverkauften Auftrags zwischen zwanzig und fünfunddreißig Euro. Bei vierzig solchen Fällen im Monat sind das bis zu sechzehntausend Euro im Jahr.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was ein zusammengeführtes System tatsächlich löst",
        id: "was-geloest-wird",
      },
      {
        type: "paragraph",
        text: "Hier ist Redlichkeit angebracht. Ein ERP-System macht keine Bestände korrekt. Es macht sie gemeinsam.",
      },
      {
        type: "paragraph",
        text: "Wenn Einkauf, Lager und alle Verkaufskanäle auf denselben Datenbestand zugreifen, gibt es nur noch eine Zahl. Ob diese Zahl stimmt, hängt weiterhin daran, ob Wareneingänge sauber gebucht und Inventurdifferenzen ehrlich erfasst werden. Aber es gibt keinen Widerspruch mehr, der einen Puffer rechtfertigt.",
      },
      {
        type: "paragraph",
        text: "Das ist der Kern, und alles andere folgt daraus: Bestellvorschläge, die auf echtem Bedarf beruhen. Verfügbarkeitsprüfung im Auftrag. Eine Kommissionierliste, die nicht ins Leere greift.",
      },
      {
        type: "software",
        slug: "sage-operations",
        reason:
          "Führt Beschaffung, Lagerbestand, Verkauf und Fertigung auf einer Datenbasis zusammen und automatisiert Bestellvorschläge sowie Eingangsrechnungen. Sage veröffentlicht dafür keinen Listenpreis und bietet statt einer Testphase eine kostenlose Live-Demo an. Genau in dieser Demo gehören Ihre eigenen Vorgänge auf den Tisch, nicht die Beispieldaten des Anbieters.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was ein Einführungsprojekt wirklich kostet",
        id: "projektkosten",
      },
      {
        type: "paragraph",
        text: "Der Satz steht in jedem Ratgeber und wird trotzdem ignoriert: Die Lizenz ist der kleinere Teil. Deshalb hier mit Zahlen.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Beratung und Einrichtung durch einen Partner. In der Regel der größte einzelne Posten.",
          "Datenübernahme aus den Altsystemen, einschließlich der Bereinigung doppelter Artikel und Kunden.",
          "Schulung, gerechnet in Personentagen der eigenen Belegschaft, nicht in Seminargebühren.",
          "Produktivitätsverlust in den ersten sechs bis zehn Wochen nach der Umstellung.",
          "Anpassungen, die erst im laufenden Betrieb sichtbar werden.",
        ],
      },
      {
        type: "paragraph",
        text: "Die Betriebe, mit denen wir gesprochen haben, nennen für das Gesamtprojekt das Zwei bis Fünffache der ersten Jahreslizenz. Das ist keine Kennzahl, sondern eine Erfahrungsspanne, und sie streut erheblich. Wer mit dem unteren Rand kalkuliert, kalkuliert zu knapp.",
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
        text: "Artikelnummern, die zweimal vergeben wurden. Kunden, die dreimal angelegt sind, einmal mit Umlaut, einmal ohne, einmal mit Tippfehler. Lieferanten, die als Firma und als Ansprechpartner geführt werden.",
      },
      {
        type: "paragraph",
        text: "Das alte System hat damit gelebt, weil Menschen die Zusammenhänge im Kopf hatten. Das neue rechnet damit. Die Bereinigung ist unangenehm, langwierig und gehört vor den Projektstart, nicht in die Mitte.",
      },
      {
        type: "heading",
        level: 3,
        text: "Kein Verantwortlicher im Haus",
        id: "verantwortlicher",
      },
      {
        type: "paragraph",
        text: "Ein Projekt, das die Geschäftsführung nebenbei betreut, zieht sich. Es braucht eine Person mit Entscheidungsbefugnis und freigeräumter Zeit, nicht eine Person mit gutem Willen.",
      },
      {
        type: "paragraph",
        text: "Wenn Sie diese Person nicht benennen können, verschieben Sie das Projekt. Das klingt hart und ist der günstigste Rat in diesem Text.",
      },
      {
        type: "heading",
        level: 3,
        text: "Prozesse, die niemand aufgeschrieben hat",
        id: "prozesse",
      },
      {
        type: "paragraph",
        text: "Der Partner fragt, wie Ihre Auftragsabwicklung läuft. Wenn drei Personen drei verschiedene Antworten geben, ist das keine Frage der Software.",
      },
      {
        type: "paragraph",
        text: "Diese Klärung ist der eigentliche Wert eines ERP-Projekts und gleichzeitig der Teil, der am meisten wehtut. Betriebe entdecken dabei regelmäßig, dass ihr Wareneingang seit Jahren anders läuft als beschrieben.",
      },
      {
        type: "quote",
        text: "Wir haben im Projekt gelernt, dass unsere Retourenabwicklung von drei Kolleginnen unterschiedlich gehandhabt wurde. Das war unangenehm und im Ergebnis das Wertvollste daran.",
        source: "Kaufmännischer Leiter eines Handelsunternehmens mit 60 Beschäftigten, Gespräch im März 2026",
      },
      {
        type: "heading",
        level: 2,
        text: "Woran Sie einen ernsthaften Anbieter erkennen",
        id: "anbieter-erkennen",
      },
      {
        type: "paragraph",
        text: "In der Demo trennt sich die Spreu schnell, wenn Sie die richtigen Dinge verlangen.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Bestehen Sie auf einer Bestellung mit Wareneingang und Teillieferung, nicht auf einer Präsentation.",
          "Verlangen Sie einen Auftrag mit Verfügbarkeitsprüfung über mehrere Lagerorte.",
          "Lassen Sie eine Retoure durchspielen, einschließlich Gutschrift und Rückbuchung in den Bestand.",
          "Fragen Sie, wie Chargen oder Seriennummern geführt werden, wenn Ihr Sortiment das verlangt.",
          "Klären Sie die Buchhaltungsübergabe an Ihre Kanzlei, bevor über Preise gesprochen wird.",
        ],
      },
      {
        type: "paragraph",
        text: "Ein Anbieter, der diese fünf Punkte mit Ihren Daten zeigt, nimmt das Projekt ernst. Ein Anbieter, der stattdessen die Oberfläche lobt, kostet Sie Zeit.",
      },
      {
        type: "heading",
        level: 2,
        text: "Wann Sie es lassen sollten",
        id: "wann-nicht",
      },
      {
        type: "paragraph",
        text: "Zum Abschluss der Gegenfall, den kein Anbieter Ihnen schildern wird.",
      },
      {
        type: "paragraph",
        text: "Wenn Sie zweihundert Artikel führen, über einen einzigen Kanal verkaufen und der Bestand stimmt, brauchen Sie kein ERP-System. Sie brauchen eine ordentliche Warenwirtschaft und ein halbes Jahr Disziplin bei der Inventur. Die Kosten eines Einführungsprojekts stehen in diesem Fall in keinem Verhältnis.",
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

  /* ================================================================= 5 === */
  {
    id: "art-monatsabschluss-dauert",
    title: "Der Monatsabschluss dauert zwei Wochen: woran es liegt und was hilft",
    slug: "monatsabschluss-beschleunigen",
    excerpt:
      "Wenn die Zahlen für den Vormonat erst Mitte des Folgemonats stehen, sind sie für Entscheidungen zu spät. Die Ursachen liegen selten in der Buchhaltung selbst.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Buchhaltung",
    related_software_slugs: ["sage-intacct", "sage-100", "netsuite", "dynamics-365-business-central"],
    ...MICHAEL,
    read_time_minutes: 11,
    status: "published",
    featured: false,
    published_date: "2026-09-05",
    updated_date: "2026-09-23",
    meta_title: "Monatsabschluss beschleunigen: die häufigsten Bremsen",
    meta_description:
      "Warum der Monatsabschluss in vielen Unternehmen zwei Wochen dauert, welche fünf Ursachen dahinterstecken und wie Finanzteams den Ablauf verkürzen.",
    content: [
      {
        type: "paragraph",
        text: "Es gibt eine Kennzahl, die mehr über ein Finanzteam aussagt als jede andere: der Arbeitstag, an dem die Zahlen des Vormonats stehen. Nicht vorläufig, sondern belastbar.",
      },
      {
        type: "paragraph",
        text: "Gute Teams schaffen das am fünften Arbeitstag. Viele brauchen zehn. Etliche brauchen so lange, dass die Zahlen bei Vorlage bereits historisch sind und für keine Entscheidung mehr taugen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Ursache liegt fast nie in der Buchhaltung",
        id: "ursache",
      },
      {
        type: "paragraph",
        text: "Das ist die wichtigste Erkenntnis für jeden, der den Abschluss beschleunigen will. Buchhalterinnen und Buchhalter buchen schnell. Sie warten.",
      },
      {
        type: "paragraph",
        text: "Sie warten auf Eingangsrechnungen, die noch in einem Postfach liegen. Auf Freigaben von Fachabteilungen, die Wichtigeres zu tun hatten. Auf Reisekostenabrechnungen. Auf die Bestätigung, ob eine Leistung im alten oder im neuen Monat erbracht wurde. Auf Zahlen aus einer Tochtergesellschaft, die in einem anderen System gebucht wird.",
      },
      {
        type: "paragraph",
        text: "Jeder dieser Wartepunkte kostet einen halben bis zwei Tage. Fünf davon ergeben zwei Wochen.",
      },
      {
        type: "table",
        caption: "Typische Wartezeiten im Abschluss, Erhebung in sechs Unternehmen",
        head: ["Wartepunkt", "Verlorene Tage", "Vermeidbar durch"],
        rows: [
          ["Eingangsrechnungen nicht im System", "1,5", "Rechnungseingang digital erfassen"],
          ["Ausstehende Freigaben", "2,0", "Freigabe mit Frist und Erinnerung"],
          ["Abgrenzungen unklar", "1,0", "Wiederkehrende Buchungen hinterlegen"],
          ["Reisekosten fehlen", "1,0", "Erfassung per App mit Stichtag"],
          ["Konsolidierung von Hand", "3,0", "Gemeinsamer Kontenrahmen im System"],
          ["Summe", "8,5", ""],
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Der Rechnungseingang ist der größte Hebel",
        id: "rechnungseingang",
      },
      {
        type: "paragraph",
        text: "Eine Eingangsrechnung, die am Dritten des Folgemonats noch als PDF im Postfach eines Abteilungsleiters liegt, ist für den Abschluss verloren. Entweder sie wird nachgebucht, oder sie fehlt.",
      },
      {
        type: "paragraph",
        text: "Die Lösung ist organisatorisch, nicht technisch: eine einzige Adresse, an die alle Eingangsrechnungen gehen, und zwar ausschließlich. Alles, was dort ankommt, wird erfasst, bevor es zur Freigabe geht. Damit ist die Rechnung im System, auch wenn die Freigabe noch aussteht.",
      },
      {
        type: "paragraph",
        text: "Software hilft an dieser Stelle erheblich, aber nur, wenn die Regel vorher steht. Ein Erfassungsmodul ohne verbindliche Eingangsadresse löst nichts.",
      },
      {
        type: "note",
        title: "Die E-Rechnung verändert diesen Punkt grundlegend",
        text: "Seit dem 01.01.2025 müssen Unternehmen E-Rechnungen empfangen können. Eine strukturierte Rechnung lässt sich ohne Belegerkennung direkt auslesen und vorkontieren. Wer den Rechnungseingang jetzt ordnet, nimmt die Pflicht als Anlass für eine Verbesserung, die ohnehin fällig war.",
      },
      {
        type: "heading",
        level: 2,
        text: "Freigaben mit Frist statt Freigaben mit Bitte",
        id: "freigaben",
      },
      {
        type: "paragraph",
        text: "In den meisten Unternehmen ist die Rechnungsfreigabe eine Bitte. Die Buchhaltung schickt eine Mail und hofft.",
      },
      {
        type: "paragraph",
        text: "Funktionierende Unternehmen behandeln sie als Vorgang mit Frist. Die Rechnung liegt im System, der Freigebende bekommt eine Aufgabe, nach drei Tagen eine Erinnerung, nach fünf Tagen geht sie an die Vertretung. Wer bis zum Stichtag nicht widerspricht, hat zugestimmt.",
      },
      {
        type: "paragraph",
        text: "Diese Regel ist unbeliebt und wirksam. Sie halbiert die Wartezeit auf Freigaben, und zwar unabhängig davon, welche Software im Einsatz ist.",
      },
      {
        type: "heading",
        level: 2,
        text: "Konsolidierung ist der teuerste Zeitfresser",
        id: "konsolidierung",
      },
      {
        type: "paragraph",
        text: "Wer mehrere Gesellschaften führt, kennt die Prozedur. Jede Einheit bucht in ihrem System, jede liefert eine Datei, jemand baut daraus eine Übersicht. Zwischengesellschaftliche Vorgänge werden manuell eliminiert, Währungen umgerechnet, Abweichungen erklärt.",
      },
      {
        type: "paragraph",
        text: "Drei Tage sind dafür knapp gerechnet, und jeder Durchgang ist fehleranfällig. Der eigentliche Schaden entsteht aber nicht durch die Zeit, sondern dadurch, dass niemand den Zahlen vollständig traut.",
      },
      {
        type: "software",
        slug: "sage-intacct",
        reason:
          "Für Unternehmen mit mehreren Einheiten ausgelegt: Konsolidierung und Auswertung über Standorte und Bereiche hinweg laufen auf einer gemeinsamen Datenbasis, dazu kommt ein Abschluss-Assistent für den Monatsablauf. Der Einstieg bei 1.390,00 EUR im Monat setzt allerdings eine Größenordnung, unterhalb derer sich das nicht rechnet.",
      },
      {
        type: "paragraph",
        text: "Das ist ausdrücklich keine Empfehlung für jeden. Ein Unternehmen mit einer Gesellschaft und dreißig Beschäftigten hat dieses Problem nicht und sollte das Geld anders einsetzen.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was Sie ohne neue Software erreichen können",
        id: "ohne-software",
      },
      {
        type: "paragraph",
        text: "Bevor Sie ein Auswahlverfahren starten, holen Sie die einfachen Tage. Sie sind kostenlos.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Legen Sie einen verbindlichen Stichtag für Reisekosten und Belege fest, drei Werktage vor Monatsende.",
          "Hinterlegen Sie wiederkehrende Buchungen als Vorlage, statt sie jeden Monat neu zu erfassen.",
          "Bilden Sie Abgrenzungen für gleichbleibende Sachverhalte automatisch, nicht per Einzelentscheidung.",
          "Führen Sie eine Vertretungsregel für Freigaben ein und schreiben Sie sie auf.",
          "Verschieben Sie die Abstimmung der Konten von der Abschlusswoche in die Monatsmitte.",
        ],
      },
      {
        type: "paragraph",
        text: "Der letzte Punkt ist der unterschätzteste. Kontenabstimmung muss nicht im Abschluss stattfinden. Wer Bankkonten, Verrechnungskonten und offene Posten laufend abstimmt, hat am Monatsende nichts mehr zu klären.",
      },
      {
        type: "heading",
        level: 2,
        text: "Wann sich neue Software rechnet",
        id: "wann-software",
      },
      {
        type: "paragraph",
        text: "Wenn Sie die organisatorischen Hebel gezogen haben und der Abschluss weiterhin über acht Arbeitstage dauert, liegt es am System. Dann lohnt die Prüfung.",
      },
      {
        type: "paragraph",
        text: "Die Fragen, die dabei zählen, sind nicht die aus der Funktionsliste. Sie lauten: Wie viele Systeme müssen wir für einen Abschluss anfassen? Wie viele Zahlen werden von Hand übertragen? Wie lange dauert es, eine Abweichung bis zum einzelnen Beleg zurückzuverfolgen?",
      },
      {
        type: "paragraph",
        text: "Wer diese drei Fragen beantworten kann, weiß, ob ein Systemwechsel etwas bringt. Wer sie nicht beantworten kann, sollte zuerst messen und dann kaufen.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine steuerliche Beratung. Für die Beurteilung Ihres konkreten Falls wenden Sie sich an Ihre Steuerkanzlei.",
      },
    ],
  },

  /* ================================================================= 6 === */
  {
    id: "art-handwerk-bueroarbeit-abends",
    title: "Warum im Handwerk die Büroarbeit abends stattfindet",
    slug: "handwerk-bueroarbeit-digitalisieren",
    excerpt:
      "Aufmaß auf dem Zettel, Regiebericht im Auto, Rechnung am Küchentisch. Der Ablauf ist in tausenden Betrieben derselbe und er kostet den Inhaber jede Woche einen Abend nach dem anderen.",
    featured_image_url: null,
    featured_image_alt: "",
    category_tag: "Handwerk",
    related_software_slugs: ["sage-50-handwerk", "sage-50", "collmex", "weclapp"],
    ...KATHARINA,
    read_time_minutes: 11,
    status: "published",
    featured: false,
    published_date: "2026-09-02",
    updated_date: "2026-09-23",
    meta_title: "Handwerk: Büroarbeit von der Baustelle ins System holen",
    meta_description:
      "Aufmaß, Regiebericht und Nachkalkulation im Handwerksbetrieb. Woher der Abendaufwand kommt, welche Nachweispflichten gelten und was eine Branchenlösung ändert.",
    content: [
      {
        type: "paragraph",
        text: "Fragt man Inhaber von Handwerksbetrieben, wann sie ihre Büroarbeit erledigen, bekommt man selten eine Uhrzeit vor achtzehn Uhr genannt. Der Tag gehört der Baustelle. Der Abend gehört dem Papier.",
      },
      {
        type: "paragraph",
        text: "Das ist nicht romantisch, sondern eine strukturelle Schwäche. Und sie hat eine klare Ursache: Zwischen der Leistung und ihrer Erfassung liegt zu viel Zeit und zu viel Zettel.",
      },
      {
        type: "heading",
        level: 2,
        text: "Der Weg einer Leistung vom Kunden zur Rechnung",
        id: "weg-der-leistung",
      },
      {
        type: "paragraph",
        text: "Nehmen wir einen Sanitärbetrieb mit sechs Monteuren. Ein Monteur ist auf einer Baustelle, baut eine Leitung um und verbaut Material, das nicht im Angebot stand.",
      },
      {
        type: "paragraph",
        text: "Er notiert das auf einem Zettel im Fahrzeug. Abends gibt er den Zettel im Büro ab oder nimmt ihn mit nach Hause und bringt ihn am nächsten Morgen mit. Manchmal bringt er ihn am Freitag mit, gesammelt.",
      },
      {
        type: "paragraph",
        text: "Im Büro überträgt jemand die Stunden in die Zeiterfassung und das Material in den Auftrag. Bei unklarer Handschrift wird nachgefragt. Was nicht mehr erinnert wird, wird geschätzt oder weggelassen.",
      },
      {
        type: "paragraph",
        text: "Der letzte Halbsatz ist die teuerste Stelle im ganzen Ablauf. Material und Stunden, die niemand mehr zuordnen kann, werden nicht abgerechnet.",
      },
      {
        type: "table",
        caption: "Nicht abgerechnete Leistungen, Selbsteinschätzung aus elf Betrieben",
        head: ["Position", "Anteil am Umsatz", "Bemerkung"],
        rows: [
          ["Nicht erfasste Regiestunden", "2 bis 4 %", "vor allem bei Kleinaufträgen"],
          ["Nicht zugeordnetes Material", "1 bis 3 %", "häufig Kleinteile aus dem Fahrzeug"],
          ["Vergessene Anfahrten", "unter 1 %", "meist bei Wartungsverträgen"],
          ["Summe", "3 bis 8 %", ""],
        ],
      },
      {
        type: "paragraph",
        text: "Bei einem Jahresumsatz von einer Million Euro sind drei bis acht Prozent zwischen dreißigtausend und achtzigtausend Euro. Das ist mehr als die Jahreskosten jeder Branchensoftware am Markt, und zwar um ein Vielfaches.",
      },
      {
        type: "note",
        title: "Diese Zahlen sind Selbsteinschätzungen",
        text: "Wir haben sie in Gesprächen erhoben und konnten sie nicht anhand von Buchführungsdaten verifizieren. Behandeln Sie sie als Größenordnung, nicht als Messwert. Die Betriebe selbst haben sie durchgängig eher zu niedrig als zu hoch angesetzt.",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Nachweispflichten, die ohnehin gelten",
        id: "nachweispflichten",
      },
      {
        type: "paragraph",
        text: "Unabhängig von der Abrechnung bestehen Aufzeichnungspflichten, die viele Betriebe nur lückenhaft erfüllen.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Der Arbeitszeitnachweis nach dem Mindestlohngesetz verlangt für bestimmte Branchen die Aufzeichnung von Beginn, Ende und Dauer der täglichen Arbeitszeit, und zwar spätestens sieben Tage nach der Leistung.",
          "Die Aufzeichnungen sind zwei Jahre aufzubewahren und bei einer Prüfung des Zolls vorzulegen.",
          "Für den Ausweis haushaltsnaher Handwerkerleistungen nach § 35a EStG müssen Lohn- und Materialanteil auf der Rechnung getrennt sein, sonst verliert der Kunde den Steuervorteil.",
          "Die GoBD verlangen, dass Aufzeichnungen zeitgerecht erfolgen. Ein Zettel, der zwei Wochen im Fahrzeug liegt, erfüllt das nicht.",
        ],
      },
      {
        type: "paragraph",
        text: "Der letzte Punkt wird regelmäßig unterschätzt. Zeitgerecht heißt bei baren Geschäftsvorfällen täglich, bei unbaren in der Regel innerhalb von zehn Tagen. Eine Sammelerfassung am Monatsende ist angreifbar.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was sich durch mobile Erfassung ändert",
        id: "mobile-erfassung",
      },
      {
        type: "paragraph",
        text: "Der entscheidende Schritt ist nicht die Software im Büro, sondern die Erfassung auf der Baustelle. Wenn der Monteur Stunden und Material am selben Tag auf dem Telefon erfasst, verschwinden drei Probleme gleichzeitig: die Übertragung, die Rückfrage und der Verlust.",
      },
      {
        type: "paragraph",
        text: "Betriebe berichten hier von einem Effekt, der über die Abrechnung hinausgeht. Wenn die Daten am Abend im System stehen, kann die Rechnung am nächsten Tag gestellt werden statt in drei Wochen. Das verkürzt die Zeit bis zum Zahlungseingang erheblich, und bei einem Betrieb mit dünner Liquidität ist das wichtiger als jede Zeitersparnis.",
      },
      {
        type: "software",
        slug: "sage-50-handwerk",
        reason:
          "Branchenlösung mit Aufmaß, Projektverwaltung, Regieberichten und Nachkalkulation je Baustelle, dazu E-Rechnung in ZUGFeRD 2.1 und XRechnung. Der Einstieg liegt bei 19,90 EUR im Monat für einen Benutzer, die entscheidenden Module wie GAEB-Schnittstelle, Dokumentenverwaltung und Finanzbuchhaltung sind jedoch gesondert zu lizenzieren.",
      },
      {
        type: "heading",
        level: 2,
        text: "GAEB: der Punkt für öffentliche Auftraggeber",
        id: "gaeb",
      },
      {
        type: "paragraph",
        text: "Wer an Kommunen, Länder oder den Bund liefert, kennt das Format. Leistungsverzeichnisse kommen als GAEB-Datei, und die Angebotsabgabe wird im selben Format erwartet.",
      },
      {
        type: "paragraph",
        text: "Ohne passende Schnittstelle bedeutet das: Positionen abtippen. Bei einem Leistungsverzeichnis mit dreihundert Positionen sind das ein bis zwei Arbeitstage je Ausschreibung, und jeder Tippfehler ist ein kalkulatorisches Risiko.",
      },
      {
        type: "paragraph",
        text: "Mit Schnittstelle lesen Sie die Datei ein, kalkulieren die Positionen und geben sie im selben Format zurück. Betriebe, die regelmäßig öffentlich anbieten, nennen das als den einzelnen Punkt mit dem größten Effekt.",
      },
      {
        type: "quote",
        text: "Früher hat eine Kollegin zwei Tage pro Ausschreibung mit Abtippen verbracht. Jetzt lesen wir die Datei ein und kalkulieren. Das war der ganze Grund für den Wechsel.",
        source: "Geschäftsführer eines Heizungs- und Sanitärbetriebs mit 24 Beschäftigten, Gespräch im Juni 2026",
      },
      {
        type: "heading",
        level: 2,
        text: "Die Nachkalkulation ist der unterschätzte Gewinn",
        id: "nachkalkulation",
      },
      {
        type: "paragraph",
        text: "Die meisten Handwerksbetriebe wissen am Jahresende, ob das Jahr gut war. Sie wissen selten, welcher Auftrag gut war.",
      },
      {
        type: "paragraph",
        text: "Eine Nachkalkulation je Baustelle beantwortet genau das: Welche Stunden waren kalkuliert, welche sind angefallen, welches Material war vorgesehen, welches wurde verbaut. Betriebe, die das zum ersten Mal sehen, erleben regelmäßig eine Überraschung, und zwar meist bei den Aufträgen, die sie für ihre besten hielten.",
      },
      {
        type: "paragraph",
        text: "Diese Erkenntnis verändert die Angebotskalkulation für alle folgenden Aufträge. Sie ist deshalb der Teil einer Branchenlösung, der sich am längsten auszahlt.",
      },
      {
        type: "heading",
        level: 2,
        text: "Was bei der Einführung realistisch ist",
        id: "einfuehrung",
      },
      {
        type: "paragraph",
        text: "Eine Branchensoftware für das Handwerk ist einzurichten, nicht nur zu installieren. Das Material muss über eine Datanorm-Schnittstelle eingelesen, Leistungen müssen angelegt, Lohngruppen hinterlegt werden.",
      },
      {
        type: "paragraph",
        text: "Betriebe nennen dafür zwei bis vier Wochen, in denen jemand im Haus verfügbar sein muss. Wer damit im Februar anfängt statt im November, hat bessere Chancen, weil im Winter mehr Luft ist.",
      },
      {
        type: "paragraph",
        text: "Und noch ein praktischer Hinweis: Die Monteure entscheiden über den Erfolg. Wenn die Erfassung auf dem Telefon mehr als eine Minute je Vorgang dauert, wird sie nicht genutzt, und dann ändert sich nichts. Testen Sie diesen Punkt mit den Leuten, die ihn nachher machen müssen, nicht im Büro.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag ersetzt keine steuerliche oder rechtliche Beratung. Für Fragen zu Aufzeichnungspflichten wenden Sie sich an Ihre Steuerkanzlei.",
      },
    ],
  },
];
