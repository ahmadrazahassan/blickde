import type { ComparisonVerdict } from "@/lib/types";

/**
 * Operator details. In the Supabase build these come from site_settings and
 * drive the Impressum, so the legal identification lives in exactly one place.
 *
 * Operator details supplied by the site owner. Do not invent a corporate
 * registration, tax number, phone number or founding date.
 */
export const siteSettings = {
  name: "Softwareblick",
  wordmark: "Softwareblick",
  wordmarkSuffix: "",
  domain: "softwareblick.de",
  url: "https://softwareblick.de",
  claim: "Unabhängige Prüfung von Unternehmenssoftware",
  operator: {
    company: "Daniel Hoffmann",
    street: "Bahnhofstr. 17",
    zip: "39104",
    city: "Magdeburg",
    country: "Deutschland",
    email: "redaktion@softwareblick.de",
  },

  /** § 18 Abs. 2 MStV: named person responsible for editorial content. */
  editorialResponsible: {
    name: "Daniel Hoffmann",
    street: "Bahnhofstr. 17",
    zip: "39104",
    city: "Magdeburg",
  },

  supervisoryAuthority: {
    name: "Landesbeauftragte für den Datenschutz Sachsen-Anhalt",
    address: "Otto-von-Guericke-Straße 34a, 39104 Magdeburg",
  },

  privacyPolicyVersion: "2026-09-01",
} as const;

/** Numbers printed in the trust rail. Derived at query time where possible. */
export const comparisonVerdicts: ComparisonVerdict[] = [
  {
    pair: "sage-active-vs-sevdesk",
    software_a: "sage-active",
    software_b: "sevdesk",
    headline:
      "Beide zielen auf kleine Betriebe. Der Unterschied liegt bei der Bilanz und beim Lohn, nicht bei der Belegerfassung.",
    differences: [
      {
        title: "Doppelte Buchführung",
        text: "Sage Active führt im Tarif Essentials die doppelte Buchführung mit SKR03 und SKR04 und erstellt Jahresabschlüsse. sevDesk führt die Einnahmenüberschussrechnung. Wer bilanzieren muss, hat damit bereits entschieden.",
      },
      {
        title: "Lohn und Personal",
        text: "Sage Active enthält im Tarif Essentials Lohnabrechnung und Personalverwaltung. Bei sevDesk brauchen Sie dafür ein zweites Produkt.",
      },
      {
        title: "Belegerkennung",
        text: "sevDesk ist bei der automatischen Belegerkennung und beim Bankabgleich stärker. Wenn viele kleine Eingangsbelege anfallen, ist das der spürbarere Alltagsvorteil.",
      },
    ],
    take_a: [
      "Sie müssen bilanzieren oder wollen den Jahresabschluss im System erstellen",
      "Lohn und Personal sollen ohne Zusatzprodukt laufen",
      "Zehn Nutzer im Tarifpreis sind Ihnen wichtiger als die beste Belegerkennung",
    ],
    take_b: [
      "Bei Ihnen fallen viele kleine Eingangsbelege an",
      "Die Einnahmenüberschussrechnung genügt",
      "Sie wollen nach Kostenstellen auswerten",
    ],
    status: "published",
  },
  {
    pair: "sage-hr-vs-factorial",
    software_a: "sage-hr",
    software_b: "factorial",
    headline:
      "Zwei Personalplattformen für kleinere Betriebe. Die eine rechnet modular ab, die andere als Paket.",
    differences: [
      {
        title: "Preismodell",
        text: "Sage HR beginnt bei 4,50 EUR je Person und Monat für das Grundpaket; Zeiterfassung, Schichtplanung und Leistungsbeurteilung kosten je 2,50 EUR zusätzlich, Recruiting 175,00 EUR pauschal. Factorial bündelt mehr im Paketpreis.",
      },
      {
        title: "Testphase",
        text: "Sage HR lässt sich 30 Tage ohne Zahlungsdetails testen, der Test endet automatisch. Das senkt die Hürde für einen ernsthaften Praxistest erheblich.",
      },
      {
        title: "Tiefe im deutschen Recht",
        text: "Bei Factorial haben uns Betriebe von Nacharbeit bei der DATEV-Übergabe berichtet. Prüfen Sie diesen Punkt mit Ihrer Kanzlei, bevor Sie sich festlegen.",
      },
    ],
    take_a: [
      "Sie wollen schrittweise digitalisieren und nur genutzte Module zahlen",
      "Ein Test ohne Zahlungsdetails ist Ihnen wichtig",
      "Sie setzen ohnehin weitere Sage-Produkte ein",
    ],
    take_b: [
      "Sie brauchen Schichtplanung im Grundumfang",
      "Ein Paketpreis ist Ihnen lieber als eine Modulrechnung",
      "Ihr Betrieb liegt zwischen zehn und achtzig Beschäftigten",
    ],
    status: "published",
  },
  {
    pair: "sage-100-vs-weclapp",
    software_a: "sage-100",
    software_b: "weclapp",
    headline:
      "Modulares ERP mit unbegrenzten Mandanten gegen ein zugängliches Cloudsystem mit veröffentlichten Nutzerpreisen.",
    differences: [
      {
        title: "Mandanten",
        text: "Sage 100 enthält in allen drei Kernmodulen eine unbegrenzte Mandantenanzahl. Für Betriebe mit mehreren Gesellschaften verändert das die Rechnung gegenüber Systemen, die pro Mandant abrechnen, grundlegend.",
      },
      {
        title: "Betrieb",
        text: "Sage 100 läuft lokal oder in der Cloud, nach Ihrer Wahl. weclapp ist ausschließlich browserbasiert und in Deutschland gehostet.",
      },
      {
        title: "Einführung",
        text: "weclapp lässt sich mit eigenem Personal einrichten und bietet eine Testphase. Sage 100 wird über Fachhändler eingeführt und bietet stattdessen eine interaktive Produkttour und ein Infopaket.",
      },
    ],
    take_a: [
      "Sie führen mehrere Mandanten oder Gesellschaften",
      "Sie brauchen Fertigung mit Ressourcenplanung",
      "Der Betrieb soll lokal möglich bleiben",
    ],
    take_b: [
      "Sie wollen ohne Partner einrichten und vorher testen",
      "CRM, Projekte und Warenwirtschaft sollen in einem System liegen",
      "Ein veröffentlichter Preis pro Nutzer ist Ihnen wichtig",
    ],
    status: "published",
  },
  {
    pair: "sage-operations-vs-xentral",
    software_a: "sage-operations",
    software_b: "xentral",
    headline:
      "Zwei Cloud-Systeme für Handel und Fertigung, mit unterschiedlichem Schwerpunkt und unterschiedlicher Preistransparenz.",
    differences: [
      {
        title: "Schwerpunkt",
        text: "Xentral ist auf den automatisierten Versandprozess im Onlinehandel zugeschnitten und spielt seine Stärke ab hohem Paketaufkommen aus. Sage Operations zielt breiter auf Beschaffung, Lager, Verkauf und diskrete Fertigung.",
      },
      {
        title: "Vorab ansehen",
        text: "Für Sage Operations gibt es keine selbst startbare Testphase, sondern eine Produkttour, ein Infopaket und eine kostenlose persönliche Live-Demo. Xentral bietet eine Testphase an.",
      },
      {
        title: "Preis",
        text: "Beide veröffentlichen keinen allgemeinen Listenpreis. Verlangen Sie in beiden Fällen ein Angebot, das Lizenz, Einführung, Datenübernahme und laufende Betreuung getrennt ausweist.",
      },
    ],
    take_a: [
      "Fertigung und Beschaffung sind wichtiger als der Versand",
      "Sie wollen Eingangsrechnungen und Workflows automatisieren",
      "Eine DATEV-Schnittstelle ist gesetzt",
    ],
    take_b: [
      "Sie versenden sehr viele Pakete über mehrere Marktplätze",
      "Die Versandautomatisierung ist Ihr Engpass",
      "Ein Fulfillment-Dienstleister soll angebunden werden",
    ],
    status: "published",
  },
  {
    pair: "sage-intacct-vs-netsuite",
    software_a: "sage-intacct",
    software_b: "netsuite",
    headline:
      "Zwei Cloud-Finanzplattformen für Unternehmen mit mehreren Einheiten. Die Unterschiede liegen im Zuschnitt und in der deutschen Anbindung.",
    differences: [
      {
        title: "Zuschnitt",
        text: "Sage Intacct ist auf serviceorientierte Unternehmen und den Finanzbereich fokussiert, mit Abschluss-Assistent und Multi-Entity-Auswertung. NetSuite deckt zusätzlich Warenwirtschaft und Fertigung breiter ab.",
      },
      {
        title: "Preis",
        text: "Sage Intacct nennt einen Einstieg von 1.390,00 EUR pro Monat, zzgl. MwSt. NetSuite veröffentlicht keinen Listenpreis. Bei beiden hängen die tatsächlichen Kosten an Nutzerlizenzen und Modulen.",
      },
      {
        title: "Deutsche Pflichten",
        text: "Bei beiden Produkten konnten wir ELSTER-Übermittlung und DATEV-Export auf den deutschen Seiten nicht bestätigt finden. Lassen Sie sich das für Ihre konkrete Konfiguration schriftlich geben.",
      },
    ],
    take_a: [
      "Ihr Schwerpunkt liegt im Finanzbereich und im Monatsabschluss",
      "Ein veröffentlichter Einstiegspreis ist Ihnen wichtig",
      "Sie brauchen Konsolidierung über mehrere Einheiten",
    ],
    take_b: [
      "Sie brauchen zusätzlich Warenwirtschaft und Fertigung",
      "Sie führen Gesellschaften in mehreren Ländern und Währungen",
      "Ein sehr breiter Modulkatalog ist wichtiger als Preistransparenz",
    ],
    status: "published",
  },
  {
    pair: "lexware-office-vs-sevdesk",
    software_a: "lexware-office",
    software_b: "sevdesk",
    headline:
      "Zwei Produkte für dieselbe Zielgruppe, die sich in der Belegverarbeitung und im Tarifzuschnitt unterscheiden.",
    differences: [
      {
        title: "Belegerkennung gegen Kanzleianbindung",
        text: "sevDesk erkennt Belege zuverlässiger und schlägt die Buchung häufiger richtig vor. Lexware Office hat den etwas geradlinigeren DATEV-Weg und die längere Historie bei deutschen Kanzleien.",
      },
      {
        title: "Kostenstellen",
        text: "sevDesk kennt Kostenstellen, Lexware Office nicht. Wer nach Baustelle, Projekt oder Standort auswerten will, hat damit bereits entschieden.",
      },
      {
        title: "Einstiegstarif",
        text: "Beide verkaufen einen günstigen Einstiegstarif ohne Buchhaltung. Bei beiden führt dieser Tarif regelmäßig zu einem Wechsel nach wenigen Monaten. Rechnen Sie von vornherein mit der mittleren Stufe.",
      },
    ],
    take_a: [
      "Ihre Steuerkanzlei arbeitet seit Jahren mit Lexware-Daten",
      "Sie brauchen Lohnabrechnung für bis zu zehn Personen im selben Produkt",
      "Kostenstellen spielen in Ihrem Betrieb keine Rolle",
    ],
    take_b: [
      "Bei Ihnen fallen viele kleine Eingangsbelege an",
      "Sie wollen nach Kostenstellen auswerten",
      "Sie verkaufen über einen Onlineshop und brauchen eine einfache Warenwirtschaft",
    ],
    status: "published",
  },
  {
    pair: "personio-vs-factorial",
    software_a: "personio",
    software_b: "factorial",
    headline:
      "Der Unterschied liegt weniger im Funktionsumfang als in Betriebsgröße, Preis und Tiefe im deutschen Recht.",
    differences: [
      {
        title: "Betriebsgröße",
        text: "Beide Anbieter richten sich an wachsende Teams. Personio bietet ein breites HR System mit optionaler eigener Payroll; Factorial staffelt Personalprozesse in einer anderen Produktstruktur. Lassen Sie beide Angebote für dieselbe Zahl an Mitarbeitenden erstellen.",
      },
      {
        title: "Schichtplanung",
        text: "Schicht und Zeiterfassung müssen zu den tatsächlichen Arbeitsplänen passen. Eine allgemeine Funktionsliste ersetzt keine Demo mit den eigenen Dienstplänen und Freigaben.",
      },
      {
        title: "Tiefe im deutschen Recht",
        text: "Personio nennt DATEV Integrationen und bietet Personio Payroll. Prüfen Sie bei beiden Anbietern, wie Stammdaten, Zeiten und fertige Abrechnungen an die Kanzlei übergeben werden.",
      },
    ],
    take_a: [
      "Sie haben mehr als fünfzig Mitarbeitende",
      "Recruiting und Onboarding sollen im selben System laufen",
      "Ihre Kanzlei erwartet eine erprobte DATEV-Übergabe",
    ],
    take_b: [
      "Sie haben zwischen zehn und achtzig Mitarbeitende",
      "Sie brauchen Schichtplanung",
      "Der Preis pro Kopf ist ein entscheidendes Kriterium",
    ],
    status: "published",
  },
  {
    pair: "weclapp-vs-xentral",
    software_a: "weclapp",
    software_b: "xentral",
    headline:
      "Beide sind deutsche Cloud-ERP-Systeme. Der Zuschnitt ist unterschiedlich genug, dass die Wahl meist klar ausfällt.",
    differences: [
      {
        title: "Versand gegen Breite",
        text: "Xentral ist auf den automatisierten Versandprozess optimiert und spielt seine Stärke ab etwa hundert Paketen am Tag aus. weclapp deckt CRM, Projekte und Ticketsystem breiter ab.",
      },
      {
        title: "Einrichtung",
        text: "weclapp lässt sich mit eigenem Personal einrichten. Bei Xentral berichten Betriebe fast durchgängig von externer Begleitung.",
      },
      {
        title: "Preismodell",
        text: "weclapp rechnet pro Nutzer und Monat mit veröffentlichten Preisen. Xentral nennt den Preis auf Anfrage, abhängig vom Auftragsvolumen.",
      },
    ],
    take_a: [
      "Sie brauchen CRM, Projekte und Warenwirtschaft in einem System",
      "Sie wollen mit eigenem Personal einrichten",
      "Ein veröffentlichter Preis ist Ihnen wichtig",
    ],
    take_b: [
      "Sie versenden mehr als hundert Pakete am Tag",
      "Sie verkaufen über mehrere Marktplätze parallel",
      "Ein Fulfillment-Dienstleister soll angebunden werden",
    ],
    status: "published",
  },
  {
    pair: "sage-50-vs-lexware-office",
    software_a: "sage-50",
    software_b: "lexware-office",
    headline: "Die Wahl beginnt mit einer Grundsatzfrage: eigene Buchhaltung auf einem lokalen System oder laufende Buchhaltung im Browser mit Abschluss durch die Kanzlei.",
    differences: [
      { title: "Buchführung und Abschluss", text: "Sage 50 führt die doppelte Buchführung mit Bilanz. Lexware Office richtet sich an Betriebe, die laufende Vorgänge selbst erfassen und den Abschluss an die Steuerkanzlei geben." },
      { title: "Arbeitsort und Einführung", text: "Sage 50 wird lokal installiert und in der Regel durch einen Fachhändler eingeführt. Lexware Office läuft im Browser und braucht für den Einstieg keine lokale Installation." },
      { title: "Kosten richtig vergleichen", text: "Bei Sage 50 wird pro Arbeitsplatz abgerechnet. Lexware Office bietet monatliche Tarife mit verschiedenem Funktionsumfang. Vergleichen Sie jeweils die Stufe, die Ihre Buchführung wirklich abdeckt." },
    ],
    take_a: ["Sie führen die doppelte Buchführung im eigenen Betrieb", "Sie möchten eine lokale Installation mit Betreuung durch einen Fachhändler", "Warenwirtschaft und Buchhaltung sollen zusammenarbeiten"],
    take_b: ["Sie bearbeiten Belege an mehreren Orten im Browser", "Ihre Kanzlei erstellt die Bilanz", "Sie möchten mit einem klar beschriebenen Monatstarif beginnen"],
    status: "published",
  },
  {
    pair: "sage-50-vs-collmex",
    software_a: "sage-50",
    software_b: "collmex",
    headline: "Beide decken Buchhaltung und Warenwirtschaft ab. Der Unterschied liegt vor allem in der Art der Einführung und Betreuung.",
    differences: [
      { title: "Betreuung", text: "Sage 50 wird über Fachhändler eingeführt. Collmex setzt stärker auf einen festen, direkt veröffentlichten Softwarepreis und eine eigenständige Einrichtung." },
      { title: "Buchführung", text: "Doppelte Buchführung mit Bilanz ist bei beiden Produkten genannt. Entscheidend ist daher, welche Abläufe daneben gebraucht werden und wie viel Begleitung Ihr Team bei der Einrichtung benötigt." },
      { title: "Warenwirtschaft", text: "Prüfen Sie Lager, Artikelstamm und Auftragsweg mit echten Geschäftsvorfällen. Die reine Zahl der Funktionen sagt wenig darüber aus, ob Ihr bestehender Ablauf abgebildet wird." },
    ],
    take_a: ["Sie wünschen einen festen Ansprechpartner für Einrichtung und Anpassung", "Die Anwendung soll lokal betrieben werden"],
    take_b: ["Sie möchten einen veröffentlichten Tarif prüfen", "Ihr Team kann die Einrichtung selbst übernehmen"],
    status: "published",
  },
  {
    pair: "sage-50-vs-datev-unternehmen-online",
    software_a: "sage-50",
    software_b: "datev-unternehmen-online",
    headline: "Hier stehen keine gleichartigen Vollprodukte nebeneinander: Sage 50 dient der eigenen Buchführung, DATEV Unternehmen online der Zusammenarbeit mit der Kanzlei.",
    differences: [
      { title: "Wer bucht?", text: "Mit Sage 50 kann der Betrieb die Buchhaltung selbst führen. Bei DATEV Unternehmen online stellt der Betrieb vor allem Belege und Kasseninformationen bereit; gebucht wird typischerweise in der Kanzlei." },
      { title: "Abschluss", text: "Sage 50 nennt doppelte Buchführung mit Bilanz. DATEV Unternehmen online ist keine vollständige Buchhaltungsanwendung für den Betrieb und sollte nicht als solche kalkuliert werden." },
      { title: "Zusammenarbeit", text: "Wenn die Kanzlei sämtliche Buchungen übernimmt, kann der direkte DATEV Weg einfacher sein. Für eine eigene Buchhaltungsabteilung ist Sage 50 die passendere Produktart." },
    ],
    take_a: ["Ihre Mitarbeitenden buchen selbst", "Sie benötigen Bilanz und Warenwirtschaft im eigenen System"],
    take_b: ["Die Kanzlei übernimmt die laufende Buchführung", "Sie möchten Belege ohne zusätzlichen Export bereitstellen"],
    status: "published",
  },
  {
    pair: "sage-50-handwerk-vs-weclapp",
    software_a: "sage-50-handwerk",
    software_b: "weclapp",
    headline: "Sage 50 Handwerk ist auf Baustellen und Leistungsverzeichnisse zugeschnitten. weclapp verbindet Handel, Projekte und Warenwirtschaft im Browser.",
    differences: [
      { title: "Aufmaß und Ausschreibung", text: "Sage 50 Handwerk nennt Aufmaß nach VOB, GAEB und Nachkalkulation je Baustelle. Diese Fachfunktionen sollten bei Handwerksbetrieben zuerst geprüft werden." },
      { title: "Verkauf und Warenfluss", text: "weclapp legt den Schwerpunkt auf den Weg vom Angebot über Lager und Lieferung bis zur Rechnung. Das ist für Handel und Dienstleistung ein anderer Ausgangspunkt als die Baustellenkalkulation." },
      { title: "Einführung", text: "Sage 50 Handwerk wird mit Fachhändlerbetreuung angeboten. weclapp läuft im Browser, verlangt für einen sauberen Start aber ebenfalls eine geplante Datenübernahme." },
    ],
    take_a: ["Aufmaß und Nachkalkulation gehören zum Tagesgeschäft", "Sie verarbeiten Leistungsverzeichnisse über GAEB"],
    take_b: ["Vertrieb, Lager und Projekte sollen im selben Browserprogramm laufen", "Baustellenspezifisches Aufmaß steht nicht im Mittelpunkt"],
    status: "published",
  },
  {
    pair: "sage-lohnabrechnung-vs-lexware-lohn-gehalt",
    software_a: "sage-lohnabrechnung",
    software_b: "lexware-lohn-gehalt",
    headline: "Beide Produkte unterstützen die Abrechnung im eigenen Betrieb. Sage setzt auf Betreuung durch einen Fachhändler, Lexware auf ein lokal installiertes Standardprodukt.",
    differences: [
      { title: "Betreuung bei Sonderfällen", text: "Sage nennt die Einführung und Betreuung durch Fachhändler. Das kann bei Tarifverträgen und besonderen Zuschlägen wichtig sein. Bei Lexware muss der Betrieb die fachliche Arbeit stärker selbst organisieren." },
      { title: "Preisgrundlage", text: "Für Sage Lohnabrechnung ist kein allgemeiner Listenpreis hinterlegt. Bei Lexware sind Tarife genannt. Holen Sie für denselben Abrechnungsumfang ein vollständiges Sage Angebot ein." },
      { title: "Rechtsänderungen", text: "Beide Lösungen müssen laufende Änderungen im Lohnrecht abbilden. Klären Sie bei Lexware den Wartungsvertrag und bei Sage die Leistungen des betreuenden Partners." },
    ],
    take_a: ["Sie haben tarifliche Besonderheiten und wünschen persönliche Betreuung", "Ein Fachhändler soll Einführung und Rückfragen übernehmen"],
    take_b: ["Ihre Lohnabrechnung bleibt im eigenen Haus", "Sie möchten einen veröffentlichten Tarif als Ausgangspunkt"],
    status: "published",
  },
  {
    pair: "sage-lohnabrechnung-vs-datev-lohn-und-gehalt",
    software_a: "sage-lohnabrechnung",
    software_b: "datev-lohn-und-gehalt",
    headline: "Die Produkte decken die Entgeltabrechnung ab, werden aber häufig von unterschiedlichen Teams bedient: Sage im Betrieb mit Fachhändler, DATEV in der Kanzlei.",
    differences: [
      { title: "Ort der Abrechnung", text: "Sage Lohnabrechnung kann durch den Betrieb mit Unterstützung eines Fachhändlers betrieben werden. DATEV Lohn und Gehalt wird häufig von Steuerkanzleien eingesetzt." },
      { title: "Meldungen", text: "DEÜV Meldungen, Lohnsteueranmeldung und der Abruf von Arbeitsunfähigkeitsdaten sind in beiden Profilen dokumentiert. Prüfen Sie zusätzliche Sonderfälle mit der Person, die später abrechnet." },
      { title: "Verantwortung", text: "Vor der Produktauswahl sollte feststehen, ob Ihr Betrieb die Entgeltabrechnung fachlich selbst übernimmt oder vollständig an eine Kanzlei gibt." },
    ],
    take_a: ["Ihre eigene Lohnabteilung rechnet ab", "Sie möchten Fachhändlerbetreuung für besondere Tarifregeln"],
    take_b: ["Ihre Kanzlei übernimmt die Abrechnung", "Sie arbeiten bereits im DATEV Verbund"],
    status: "published",
  },
  {
    pair: "sage-50-vs-buchhaltungsbutler",
    software_a: "sage-50",
    software_b: "buchhaltungsbutler",
    headline: "Beide können doppelte Buchführung abbilden. Sage 50 verbindet sie mit lokaler Warenwirtschaft, BuchhaltungsButler mit automatisierter Belegerfassung im Browser.",
    differences: [
      { title: "Belege oder Warenfluss", text: "BuchhaltungsButler richtet sich an Betriebe mit vielen wiederkehrenden Belegen und automatischer Vorkontierung. Sage 50 verbindet Buchhaltung stärker mit Aufträgen, Artikeln und Lager." },
      { title: "Betriebsmodell", text: "Sage 50 läuft lokal und wird häufig durch einen Fachhändler begleitet. BuchhaltungsButler wird im Browser genutzt und bietet einen eigenen Zugang für die Steuerkanzlei." },
      { title: "Bilanz", text: "Doppelte Buchführung mit Bilanz ist in beiden Profilen genannt. Dieser Punkt allein entscheidet die Auswahl daher nicht." },
    ],
    take_a: ["Sie führen Artikel, Aufträge und Buchhaltung in einem lokalen System", "Sie wünschen Betreuung durch einen Fachhändler"],
    take_b: ["Viele Eingangsbelege sollen vorkontiert werden", "Ihre Kanzlei soll Buchungen direkt im System prüfen"],
    status: "published",
  },
  {
    pair: "sage-50-handwerk-vs-xentral",
    software_a: "sage-50-handwerk",
    software_b: "xentral",
    headline: "Die Entscheidung hängt am Geschäftsmodell: Baustellen und Aufmaß auf der einen Seite, Shopbestellungen und Versand auf der anderen.",
    differences: [
      { title: "Fachliche Tiefe", text: "Sage 50 Handwerk nennt Aufmaß nach VOB, GAEB und Nachkalkulation je Baustelle. Xentral ist auf Bestellungen, Lager und Versand im Onlinehandel zugeschnitten." },
      { title: "Warenbewegung", text: "Für einen Betrieb mit hohem Versandaufkommen sind Marktplatzanbindungen und Fulfillment wichtiger als Aufmaß. Im Handwerk gilt meist das Gegenteil." },
      { title: "Angebot", text: "Sage 50 Handwerk nennt Einstiegstarife je Arbeitsplatz. Xentral nennt den Preis abhängig vom Umfang auf Anfrage. Vergleichen Sie nur Angebote für Ihren tatsächlichen Prozess." },
    ],
    take_a: ["Sie kalkulieren Leistungen nach Baustelle", "Sie verarbeiten Leistungsverzeichnisse und Aufmaße"],
    take_b: ["Sie verkaufen über Shops und Marktplätze", "Lager und Versand verursachen den größten manuellen Aufwand"],
    status: "published",
  },
  {
    pair: "sage-lohnabrechnung-vs-personio",
    software_a: "sage-lohnabrechnung",
    software_b: "personio",
    headline: "Beide Anbieter können Lohn abrechnen. Der Unterschied liegt in den Paketen, den Personalprozessen und der Einführung.",
    differences: [
      { title: "Entgeltabrechnung", text: "Sage Lohnabrechnung führt die Abrechnung und die zugehörigen Meldungen aus. Personio bietet neben der vorbereitenden Entgeltabrechnung auch Personio Payroll für eine Abrechnung im eigenen System an. Fragen Sie nach dem konkret angebotenen Paket." },
      { title: "Personalverwaltung", text: "Personio bietet digitale Akten, Abwesenheiten und Bewerbermanagement. Das ist ein anderer Funktionsschwerpunkt als die Lohnabrechnung mit tariflichen Sonderregeln bei Sage." },
      { title: "Mögliche Zusammenarbeit", text: "Wenn beide Aufgaben wichtig sind, prüfen Sie die Übergabe der Daten zwischen Personalverwaltung und Abrechnungsstelle. Ein Vergleich der Einstiegspreise allein wäre hier irreführend." },
    ],
    take_a: ["Sie suchen ein System für die tatsächliche Entgeltabrechnung", "Besondere Tarifregeln sollen mit Fachhändlerbetreuung abgebildet werden"],
    take_b: ["Digitale Personalakten, Abwesenheiten und Bewerbungen stehen im Mittelpunkt", "Die Lohnabrechnung erfolgt bereits in einem anderen System"],
    status: "published",
  },
  {
    pair: "sage-active-vs-lexware-office",
    software_a: "sage-active",
    software_b: "lexware-office",
    headline: "Beide Lösungen laufen im Browser. Entscheidend sind der benötigte Buchhaltungsumfang, Lohn und die Kosten zusätzlicher Nutzer.",
    differences: [
      { title: "Tarifgrenze bei der Buchhaltung", text: "Sage Active Starter übernimmt Angebote und Rechnungen, während die eigene doppelte Buchführung im Tarif Essentials liegt. Vergleichen Sie Essentials mit dem passenden Lexware Office Tarif und nicht nur die jeweils günstigste Stufe." },
      { title: "Lohn im selben System", text: "Sage Active Essentials führt laut Hersteller Lohn und Personal für zwei Mitarbeitende mit. Lexware bietet Lohn und Gehalt als gesondertes Produkt an. Die Gesamtkosten hängen daher von der Zahl der abzurechnenden Personen ab." },
      { title: "Elektronische Rechnungen", text: "Sage bestätigt den Empfang von XRechnung und ZUGFeRD. Auf der aktuellen Produktseite sind Aussagen zum Versand nicht einheitlich. Fragen Sie den Anbieter nach Ihrem konkreten Versandformat, bevor Sie einen Tarif wählen." },
    ],
    take_a: ["Sie möchten Angebote, Buchhaltung und Lohn für ein kleines Team bündeln", "Sie benötigen den DATEV Export und eine integrierte Umsatzsteuervoranmeldung"],
    take_b: ["Sie suchen einen klar abgegrenzten Buchhaltungstarif", "Sie möchten Lohn nur bei Bedarf als getrenntes Produkt ergänzen"],
    status: "published",
  },
  {
    pair: "sage-hr-payroll-vs-personio",
    software_a: "sage-hr-payroll",
    software_b: "personio",
    headline: "Zwei Wege zu Personalverwaltung und Lohn im selben System. Der passende Zuschnitt hängt von Teamgröße und Abrechnungspraxis ab.",
    differences: [
      { title: "Einstieg und Zielgruppe", text: "Sage nennt für Essentials einen öffentlichen Einstiegspreis für fünf Mitarbeitende. Personio erstellt Angebote nach Umfang und Teamgröße. Lassen Sie dieselben Personalprozesse und die gleiche Zahl an Mitarbeitenden kalkulieren." },
      { title: "Lohnabrechnung", text: "Sage HR & Payroll verbindet HR und Payroll je nach Tarif. Personio bietet sowohl vorbereitende Entgeltabrechnung als auch Personio Payroll. Bei beiden Anbietern muss der konkret angebotene Abrechnungsweg im Vertrag stehen." },
      { title: "Personalprozesse", text: "Sage staffelt erweiterte Funktionen wie Bewerbermanagement und Leistungsbeurteilung nach Tarif. Personio setzt einen starken Schwerpunkt auf Personalakten, Recruiting und Freigaben. Vergleichen Sie Ihre tatsächlichen Abläufe in einer Demo." },
    ],
    take_a: ["Sie möchten einen veröffentlichten Einstiegspreis für ein kleines Team", "HR und Lohn sollen im ausgewählten Sage Tarif gemeinsam laufen"],
    take_b: ["Sie benötigen ein breit ausgebautes HR System", "Sie möchten zwischen Personio Payroll und externer Abrechnung wählen"],
    status: "published",
  },
];

export function verdictForPair(pair: string): ComparisonVerdict | undefined {
  return comparisonVerdicts.find((v) => v.pair === pair && v.status === "published");
}
