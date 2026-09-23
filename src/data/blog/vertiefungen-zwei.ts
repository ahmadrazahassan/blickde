import type { ArticleBlock } from "@/lib/types";

/**
 * Zweiter Block vertiefender Abschnitte. Er ergänzt die Beiträge, die nach
 * dem ersten Durchgang noch knapp waren, um Themen, die in der Praxis
 * regelmäßig aufkommen und in keinem Anbietermaterial stehen.
 */
export const vertiefungenZwei: Record<string, ArticleBlock[]> = {
  /* ------------------------------------------ Rangliste Buchhaltung ---- */
  "art-top-buchhaltung-klein": [
    {
      type: "heading",
      level: 2,
      text: "Die Kassenführung als eigener Prüfungsschwerpunkt",
      id: "kasse",
    },
    {
      type: "paragraph",
      text: "Betriebe mit Bargeschäft haben eine Anforderung, die in keiner Softwareübersicht auftaucht und bei jeder Kassennachschau geprüft wird: die Kassenführung nach § 146a AO.",
    },
    {
      type: "paragraph",
      text: "Elektronische Aufzeichnungssysteme brauchen eine zertifizierte technische Sicherheitseinrichtung. Jeder Geschäftsvorfall wird damit protokolliert und ist nachträglich nicht veränderbar. Dazu kommt die Belegausgabepflicht und die Meldepflicht für das eingesetzte System.",
    },
    {
      type: "paragraph",
      text: "Wer ein offenes Ladenkassenbuch führt, braucht keine solche Einrichtung, muss die Kasse aber täglich zählen und das Ergebnis in einem Zählprotokoll festhalten. Eine Buchhaltungssoftware mit Kassenbuchfunktion ersetzt das nicht automatisch. Klären Sie diesen Punkt gesondert, wenn Bargeld eine Rolle spielt.",
    },
    {
      type: "heading",
      level: 2,
      text: "Zwei Fehler beim Vergleich von Preisseiten",
      id: "preisvergleich",
    },
    {
      type: "paragraph",
      text: "Der erste Fehler ist der Vergleich von Monatspreisen bei unterschiedlicher Zahlungsweise. Viele Anbieter nennen den Monatspreis bei jährlicher Vorauszahlung, andere den bei monatlicher Zahlung. Zwischen beiden liegen regelmäßig fünfzehn bis zwanzig Prozent.",
    },
    {
      type: "paragraph",
      text: "Der zweite Fehler ist der Vergleich ohne Mindestlaufzeit. Ein Angebot mit zwölf Monaten Bindung ist nicht dasselbe wie eines mit monatlicher Kündigungsfrist, auch wenn die Zahl identisch ist. Bei einem Produkt, das Sie noch nicht kennen, ist die kürzere Bindung bares Geld wert.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Rechnen Sie alle Angebote auf denselben Zahlungsrhythmus um, bevor Sie vergleichen.",
        "Notieren Sie die Mindestlaufzeit und die Kündigungsfrist neben jedem Preis.",
        "Prüfen Sie, ob der genannte Preis für Neukunden gilt und was nach dem ersten Jahr passiert.",
        "Fragen Sie, wie eine Preiserhöhung angekündigt wird und ob ein Sonderkündigungsrecht besteht.",
      ],
    },
    {
      type: "paragraph",
      text: "Der letzte Punkt wird fast nie gestellt und ist der wichtigste. Preiserhöhungen kommen, und die Frage ist nur, ob Sie darauf reagieren können.",
    },
  ],

  /* ------------------------------------------ Rangliste Lohn ----------- */
  "art-top-lohnabrechnung": [
    {
      type: "heading",
      level: 2,
      text: "Was bei einem Fehler in der Abrechnung tatsächlich passiert",
      id: "fehlerfolgen",
    },
    {
      type: "paragraph",
      text: "Die Haftungslage in der Entgeltabrechnung wird von Betrieben regelmäßig unterschätzt, und sie ist der eigentliche Grund, warum bei der Auswahl Sorgfalt angebracht ist.",
    },
    {
      type: "paragraph",
      text: "Bei zu wenig einbehaltener Lohnsteuer haftet der Arbeitgeber. Das Finanzamt wendet sich an ihn, nicht an die Beschäftigten. Bei zu wenig abgeführten Sozialversicherungsbeiträgen gilt dasselbe, und hier kommt hinzu, dass Nachforderungen bis zu vier Jahre zurückreichen können, bei Vorsatz deutlich länger.",
    },
    {
      type: "paragraph",
      text: "Der Rückgriff auf die Beschäftigten ist beim Arbeitnehmeranteil zur Sozialversicherung praktisch auf drei Monate begrenzt. Was darüber hinausgeht, bleibt beim Arbeitgeber hängen. Bei zwanzig Beschäftigten und einem systematischen Fehler über zwei Jahre sind das schnell fünfstellige Beträge.",
    },
    {
      type: "note",
      title: "Deshalb ist die Korrekturfähigkeit ein Auswahlkriterium",
      text: "Ein Programm, das Korrekturabrechnungen und berichtigte Meldungen selbst erzeugt, senkt genau dieses Risiko. Eines, das Handarbeit verlangt, erhöht es. Nehmen Sie eine Korrektur deshalb in jede Testphase auf.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Übergabe an die Buchhaltung",
      id: "buchhaltungsuebergabe",
    },
    {
      type: "paragraph",
      text: "Die Lohnabrechnung endet nicht mit der Überweisung. Die Buchungssätze müssen in die Finanzbuchhaltung, und zwar aufgeteilt auf Lohnaufwand, Sozialversicherung, Lohnsteuer und Verbindlichkeiten.",
    },
    {
      type: "paragraph",
      text: "Wenn dieser Export fehlt oder nicht zum Kontenrahmen passt, bucht jemand jeden Monat von Hand. Das sind zwei bis vier Stunden, die in keiner Wirtschaftlichkeitsrechnung auftauchen, weil sie in der Buchhaltung anfallen und nicht in der Personalabteilung.",
    },
    {
      type: "paragraph",
      text: "Lassen Sie sich den Export deshalb vor dem Abschluss zeigen, und zwar mit Ihrem Kontenrahmen, nicht mit dem Standardkontenrahmen des Anbieters.",
    },
  ],

  /* ------------------------------------------ Rangliste HR ------------- */
  "art-top-hr-software": [
    {
      type: "heading",
      level: 2,
      text: "Die Einführung braucht eine Reihenfolge",
      id: "reihenfolge",
    },
    {
      type: "paragraph",
      text: "Personalsoftware wird selten an einem Tag eingeführt. Sinnvoll ist eine Reihenfolge, die mit dem beginnt, was den größten Nutzen bei geringstem Widerstand bringt.",
    },
    {
      type: "paragraph",
      text: "Beginnen Sie mit den Abwesenheiten. Urlaub und Krankmeldungen betreffen alle, sind unstrittig und erzeugen sofort spürbare Entlastung. Danach folgt die digitale Akte, in die Dokumente nach und nach hineinwandern. Erst dann die Zeiterfassung, die den meisten Erklärungsbedarf und das höchste Mitbestimmungsgewicht hat. Recruiting und Leistungsbeurteilung kommen zuletzt, sofern Sie sie überhaupt brauchen.",
    },
    {
      type: "paragraph",
      text: "Wer umgekehrt vorgeht und mit der Zeiterfassung beginnt, sammelt Widerstand ein, bevor irgendjemand einen Nutzen gesehen hat. Das ist der häufigste Grund, warum Einführungen stecken bleiben.",
    },
    {
      type: "heading",
      level: 2,
      text: "Was beim Wechsel des Anbieters mit den Daten geschieht",
      id: "datenexport",
    },
    {
      type: "paragraph",
      text: "Personaldaten sind die Daten, die Sie am wenigsten verlieren wollen, und gleichzeitig die, nach deren Export am seltensten gefragt wird.",
    },
    {
      type: "paragraph",
      text: "Prüfen Sie vor dem Abschluss, in welcher Form Sie Ihre Daten wiederbekommen, wenn Sie den Anbieter wechseln. Ein Export der Stammdaten als Tabelle genügt nicht. Sie brauchen auch die Dokumente aus den Personalakten, und zwar mit der Zuordnung zur jeweiligen Person.",
    },
    {
      type: "paragraph",
      text: "Regeln Sie außerdem, was nach Vertragsende mit den Daten beim Anbieter geschieht. Der Auftragsverarbeitungsvertrag nach Art. 28 DSGVO muss dazu eine Aussage treffen: Löschung oder Rückgabe, und innerhalb welcher Frist. Ein Vertrag, der diesen Punkt offenlässt, ist unvollständig.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Datenübernahme aus der Tabelle",
      id: "datenuebernahme",
    },
    {
      type: "paragraph",
      text: "Der Umzug von einer Tabelle in ein Personalsystem ist einfacher als bei Buchhaltungssoftware, hat aber eine Tücke: Urlaubsansprüche und Resttage.",
    },
    {
      type: "paragraph",
      text: "Der Urlaubsanspruch setzt sich zusammen aus dem gesetzlichen Mindesturlaub, dem vertraglich vereinbarten Mehrurlaub, Resttagen aus dem Vorjahr und gegebenenfalls Ansprüchen aus Schwerbehinderung. Diese Bestandteile werden rechtlich unterschiedlich behandelt, insbesondere beim Verfall.",
    },
    {
      type: "paragraph",
      text: "Ein System, das nur eine Gesamtzahl kennt, verliert diese Unterscheidung. Im Streitfall können Sie dann nicht mehr belegen, welcher Anspruch wann entstanden ist. Prüfen Sie deshalb, ob sich Urlaubsarten getrennt führen lassen.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Erfassen Sie den Stand zu einem festen Stichtag, am besten zum Jahresbeginn.",
        "Lassen Sie sich die Stände von den Beschäftigten bestätigen, bevor Sie migrieren.",
        "Führen Sie Resturlaub aus dem Vorjahr getrennt, damit Verfallsfristen greifen.",
        "Heben Sie die alte Tabelle als Nachweis auf, mindestens drei Jahre.",
      ],
    },
    {
      type: "paragraph",
      text: "Der zweite Punkt erspart die häufigste Auseinandersetzung nach einer Umstellung. Wer den Stand einmal schriftlich bestätigt hat, diskutiert ihn später nicht mehr.",
    },
    {
      type: "heading",
      level: 2,
      text: "Mobile Nutzung ist kein Zusatz",
      id: "mobil",
    },
    {
      type: "paragraph",
      text: "In Betrieben mit Schichtbetrieb, Außendienst oder Baustellen entscheidet die mobile Nutzung darüber, ob ein System angenommen wird. Wer keinen Schreibtisch hat, füllt kein Formular im Browser aus.",
    },
    {
      type: "paragraph",
      text: "Prüfen Sie deshalb die App mit den Personen, die sie später nutzen sollen, und nicht in der Verwaltung. Die Fragen sind schlicht: Wie viele Schritte braucht ein Urlaubsantrag? Funktioniert die Anmeldung ohne Firmen-E-Mail-Adresse? Sieht man die Abrechnung, ohne sich durch drei Ebenen zu klicken?",
    },
  ],

  /* ------------------------------------------ Rangliste ERP ------------ */
  "art-top-erp-mittelstand": [
    {
      type: "heading",
      level: 2,
      text: "Lizenzarten verstehen, bevor Sie zählen",
      id: "lizenzarten",
    },
    {
      type: "paragraph",
      text: "Fast alle Hersteller unterscheiden zwischen Vollzugriff und eingeschränktem Zugriff. Eine Person, die nur Zeiten erfasst oder Berichte liest, braucht keine Volllizenz, und der Preisunterschied ist erheblich.",
    },
    {
      type: "paragraph",
      text: "Gehen Sie deshalb Ihre Belegschaft durch und ordnen Sie jeder Person eine Rolle zu, bevor Sie ein Angebot einholen. Bei dreißig Beschäftigten sind häufig nur acht bis zwölf Personen auf Vollzugriff angewiesen. Wer pauschal dreißig Volllizenzen anfragt, bekommt ein Angebot, das doppelt so teuer ist wie nötig, und vergleicht es dann mit einem anderen, das ebenso überhöht ist.",
    },
    {
      type: "paragraph",
      text: "Klären Sie außerdem, ob Lizenzen benannt oder gleichzeitig genutzt werden. Bei gleichzeitiger Nutzung reichen in Betrieben mit Schichtbetrieb deutlich weniger Lizenzen als Personen.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Schnittstellen zu bestehenden Systemen",
      id: "schnittstellen",
    },
    {
      type: "paragraph",
      text: "Kein ERP-System steht allein. Es muss mit dem Shop sprechen, mit dem Versanddienstleister, mit der Kanzlei und häufig mit einer Branchenlösung, die niemand ersetzen will.",
    },
    {
      type: "paragraph",
      text: "Die Frage lautet deshalb nicht, ob ein System eine Schnittstelle hat, sondern welcher Art sie ist. Eine offene Programmierschnittstelle ist etwas anderes als ein fertiger Konnektor, und ein Konnektor eines Drittanbieters ist etwas anderes als einer vom Hersteller.",
    },
    {
      type: "table",
      caption: "Arten der Anbindung und was sie bedeuten",
      head: ["Art", "Aufwand", "Risiko bei Updates"],
      rows: [
        ["Konnektor des Herstellers", "gering", "gering"],
        ["Zertifizierter Partnerkonnektor", "gering bis mittel", "mittel"],
        ["Offene Schnittstelle, selbst gebaut", "hoch", "hoch"],
        ["Dateiaustausch, etwa als CSV", "gering", "gering, aber manuell"],
      ],
    },
    {
      type: "paragraph",
      text: "Die letzte Zeile wird oft belächelt und ist in der Praxis stabil. Ein nächtlicher Dateiaustausch, der seit fünf Jahren läuft, ist einer Echtzeitanbindung überlegen, die bei jedem Update bricht.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wie Sie den Erfolg nach der Einführung messen",
      id: "erfolg-messen",
    },
    {
      type: "paragraph",
      text: "Ein ERP-Projekt gilt in vielen Betrieben als erfolgreich, wenn es irgendwann läuft. Das ist ein niedriger Maßstab. Sinnvoller sind wenige Kennzahlen, die Sie vor dem Start erheben und ein Jahr später erneut.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Zeit vom Auftragseingang bis zum Versand, im Durchschnitt und im schlechtesten Fall.",
        "Zahl der überverkauften Positionen im Monat.",
        "Gebundenes Kapital im Lager, gemessen als Reichweite in Tagen.",
        "Arbeitstag, an dem die Zahlen des Vormonats stehen.",
        "Zahl der Vorgänge, die außerhalb des Systems bearbeitet werden.",
      ],
    },
    {
      type: "paragraph",
      text: "Die letzte Kennzahl ist die ehrlichste. Wenn ein Jahr nach der Einführung noch Tabellen im Umlauf sind, hat das System einen Ablauf nicht abgebildet, und dann lohnt es, genau dort nachzusehen statt es hinzunehmen.",
    },
  ],

  /* ---------------------------------------------------- Monatsabschluss */
  "art-monatsabschluss-dauert": [
    {
      type: "heading",
      level: 2,
      text: "Wer die Zahlen bekommt und in welcher Form",
      id: "berichtsempfaenger",
    },
    {
      type: "paragraph",
      text: "Ein schneller Abschluss nützt nichts, wenn das Ergebnis in einer Datei landet, die niemand öffnet. Klären Sie deshalb gleichzeitig mit der Geschwindigkeit die Form der Berichterstattung.",
    },
    {
      type: "paragraph",
      text: "Die Geschäftsführung braucht selten die vollständige Summen- und Saldenliste. Sie braucht wenige Kennzahlen im Vergleich zum Vormonat und zum Vorjahr, dazu eine kurze Erläuterung der Abweichungen. Bereichsleitungen brauchen ihren eigenen Ausschnitt, nicht das Gesamtbild.",
    },
    {
      type: "paragraph",
      text: "Systeme mit rollenbasierten Auswertungen liefern das automatisch. Ohne sie baut jemand im Controlling jeden Monat dieselbe Darstellung neu, und dieser Aufwand fällt genau dann an, wenn der Abschluss ohnehin drückt.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Bankbuchung als tägliche Aufgabe",
      id: "bankbuchung",
    },
    {
      type: "paragraph",
      text: "Wenn Kontoauszüge erst im Abschluss gebucht werden, staut sich ein Monat Arbeit auf einen Tag. Und weil die Zuordnung dann aus dem Gedächtnis erfolgt, steigt die Fehlerquote genau dann, wenn die Zeit knapp ist.",
    },
    {
      type: "paragraph",
      text: "Der Ausweg ist unspektakulär: Bankumsätze werden täglich oder mindestens wöchentlich zugeordnet, nicht monatlich. Mit einer automatischen Zuordnung offener Posten dauert das je Durchgang wenige Minuten.",
    },
    {
      type: "paragraph",
      text: "Der Nebeneffekt ist wertvoller als die Zeitersparnis: Sie sehen den Stand der Außenstände laufend statt einmal im Monat. Für die Liquiditätsplanung ist das der eigentliche Gewinn.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Rolle der Fachabteilungen",
      id: "fachabteilungen",
    },
    {
      type: "paragraph",
      text: "Ein Abschluss ist kein Vorgang der Buchhaltung, sondern des ganzen Unternehmens. Solange das nicht so verstanden wird, bleibt jede Verbesserung Stückwerk.",
    },
    {
      type: "paragraph",
      text: "Der Einkauf entscheidet, ob Bestellungen sauber erfasst sind und damit Rückstellungen geschätzt werden können. Der Vertrieb entscheidet, ob Leistungen zeitrichtig abgegrenzt werden. Das Lager entscheidet über den Bestandswert. Die Buchhaltung führt zusammen, was andere geliefert haben.",
    },
    {
      type: "paragraph",
      text: "Praktisch bewährt hat sich ein Abschlusskalender, der allen Beteiligten je Aufgabe einen Termin zuweist und der von der Geschäftsführung getragen wird. Ohne diese Rückendeckung setzt die Buchhaltung Termine, die niemand einhalten muss.",
    },
    {
      type: "heading",
      level: 2,
      text: "Umsatzsteuer-Voranmeldung als Taktgeber",
      id: "ustva",
    },
    {
      type: "paragraph",
      text: "Die Umsatzsteuer-Voranmeldung ist bis zum zehnten Tag nach Ablauf des Anmeldungszeitraums zu übermitteln, verlängerbar um einen Monat durch Dauerfristverlängerung gegen Sondervorauszahlung.",
    },
    {
      type: "paragraph",
      text: "Viele Unternehmen nutzen die Dauerfristverlängerung und verschieben damit auch den Abschluss. Das ist bequem und hat einen Preis: Die Zahlen kommen einen Monat später, und Entscheidungen werden auf älterer Grundlage getroffen.",
    },
    {
      type: "paragraph",
      text: "Wer den Abschluss beschleunigen will, sollte prüfen, ob die Verlängerung noch nötig ist. Oft ist sie vor Jahren beantragt worden, als die Abläufe andere waren.",
    },
    {
      type: "heading",
      level: 2,
      text: "Was Sie von Ihrer Kanzlei erwarten dürfen",
      id: "kanzlei",
    },
    {
      type: "paragraph",
      text: "Wenn die laufende Buchführung in der Kanzlei liegt, hängt Ihre Abschlussgeschwindigkeit an deren Ablauf. Das ist verhandelbar, wird aber selten verhandelt.",
    },
    {
      type: "paragraph",
      text: "Fragen Sie nach einem festen Termin für die betriebswirtschaftliche Auswertung, nicht nach einem ungefähren. Fragen Sie, was Sie liefern müssen, damit dieser Termin hält. Und fragen Sie, ob eine frühere Übergabe der Belege den Termin nach vorn verschiebt oder ob die Kanzlei ohnehin in Blöcken arbeitet.",
    },
    {
      type: "paragraph",
      text: "Die letzte Frage bringt oft die überraschendste Antwort. Manche Kanzleien bearbeiten Mandate in fester Reihenfolge, und dann hilft frühere Zulieferung überhaupt nichts. Das zu wissen, erspart Ihnen vergebliche Mühe.",
    },
  ],

  /* --------------------------------------------------- Handwerk, abends */
  "art-handwerk-bueroarbeit-abends": [
    {
      type: "heading",
      level: 2,
      text: "Zahlungseingang beschleunigen statt Kredite aufnehmen",
      id: "zahlungseingang",
    },
    {
      type: "paragraph",
      text: "Viele Handwerksbetriebe haben kein Ertragsproblem, sondern ein Zeitproblem zwischen Leistung und Zahlungseingang. Zwischen der Montage und dem Geldeingang liegen häufig sechs bis zehn Wochen, und ein Großteil davon entsteht im eigenen Büro.",
    },
    {
      type: "paragraph",
      text: "Die Rechnung wird nicht gestellt, weil der Regiebericht fehlt. Der Regiebericht fehlt, weil der Zettel noch im Fahrzeug liegt. Wer diese Kette verkürzt, verkürzt den Zahlungseingang, und zwar ohne mit Kunden über Zahlungsziele zu verhandeln.",
    },
    {
      type: "paragraph",
      text: "Rechnen Sie das einmal für Ihren Betrieb durch. Bei einem Jahresumsatz von einer Million Euro entspricht eine Verkürzung um zwei Wochen einem Liquiditätseffekt von rund achtunddreißigtausend Euro. Das ist mehr, als jede Kontokorrentlinie kostet.",
    },
    {
      type: "heading",
      level: 2,
      text: "Materialwirtschaft im Fahrzeug",
      id: "fahrzeuglager",
    },
    {
      type: "paragraph",
      text: "In vielen Handwerksbetrieben ist das größte Lager nicht die Halle, sondern die Summe der Fahrzeuge. Und dieses Lager ist in keinem System erfasst.",
    },
    {
      type: "paragraph",
      text: "Das hat zwei Folgen. Erstens wird Material doppelt bestellt, weil niemand weiß, dass drei Stück im Wagen von Kollege B liegen. Zweitens taucht Material, das im Fahrzeug verbraucht wurde, in keiner Nachkalkulation auf.",
    },
    {
      type: "paragraph",
      text: "Branchenlösungen bieten dafür Fahrzeuglager an. Der Nutzen hängt vollständig daran, ob die Monteure die Entnahme erfassen. Erfahrungsgemäß funktioniert das nur, wenn die Erfassung weniger als zwanzig Sekunden dauert und ohne Artikelnummer auskommt.",
    },
    {
      type: "paragraph",
      text: "Ein pragmatischer Zwischenschritt, den einige Betriebe gehen: Nur die zwanzig teuersten Artikel im Fahrzeuglager führen und den Rest als Gemeinkosten behandeln. Das erfasst achtzig Prozent des Werts bei einem Bruchteil des Aufwands.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Übergabe an die Buchhaltung",
      id: "buchhaltung",
    },
    {
      type: "paragraph",
      text: "Eine Handwerkslösung erzeugt Rechnungen und erfasst Kosten. Ob daraus eine Buchführung wird, hängt davon ab, wie die Daten weitergehen.",
    },
    {
      type: "paragraph",
      text: "Drei Wege sind üblich. Die Branchenlösung enthält eine eigene Finanzbuchhaltung. Sie exportiert an eine separate Buchhaltungssoftware. Oder sie exportiert an die Kanzlei.",
    },
    {
      type: "paragraph",
      text: "Der dritte Weg ist für die meisten Handwerksbetriebe der richtige, weil die Kanzlei ohnehin den Abschluss macht. Entscheidend ist dann, dass der Export das Format trifft, mit dem die Kanzlei arbeitet, und dass Belegbilder mitgehen. Klären Sie das, bevor Sie kaufen, nicht im Januar darauf.",
    },
  ],

  /* -------------------------------------------- Excel Personalverwaltung */
  "art-excel-personalverwaltung": [
    {
      type: "heading",
      level: 2,
      text: "Auskunftsersuchen nach Art. 15 DSGVO",
      id: "auskunft",
    },
    {
      type: "paragraph",
      text: "Jede beschäftigte Person kann verlangen, zu erfahren, welche Daten der Arbeitgeber über sie verarbeitet, und eine Kopie davon bekommen. Die Frist beträgt einen Monat.",
    },
    {
      type: "paragraph",
      text: "In einem Betrieb mit Aktenschrank, drei Tabellen und einem gewachsenen Postfach ist diese Frist kaum zu halten. Jemand muss sämtliche Ablagen durchsuchen, und am Ende bleibt die Unsicherheit, ob etwas übersehen wurde.",
    },
    {
      type: "paragraph",
      text: "Solche Ersuchen kommen selten aus heiterem Himmel. Sie kommen meist im Zusammenhang mit einer Kündigung oder einem Konflikt, und dann ist eine unvollständige Auskunft besonders unangenehm.",
    },
    {
      type: "paragraph",
      text: "Ein System mit vollständiger Personalakte beantwortet die Anfrage per Export. Das ist einer der Punkte, die vor der Einführung niemand nennt und nach der ersten Anfrage jeder schätzt.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wenn Beschäftigte den Betrieb verlassen",
      id: "austritt",
    },
    {
      type: "paragraph",
      text: "Der Austritt ist der Vorgang, bei dem in Tabellenlösungen am meisten liegen bleibt. Zugänge werden nicht gesperrt, Unterlagen bleiben in Postfächern, und der Urlaubsanspruch wird nachträglich neu gerechnet.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Anteiliger Urlaubsanspruch bis zum Austrittstag, mit korrekter Rundung nach § 5 BUrlG.",
        "Abgeltung nicht genommenen Urlaubs, sofern er nicht verfallen ist.",
        "Rückgabe von Arbeitsmitteln, dokumentiert.",
        "Sperrung sämtlicher Zugänge zum Austrittstag.",
        "Arbeitszeugnis, mit Frist und Verantwortlichem.",
        "Aufbewahrung der Unterlagen nach Fristen statt auf unbestimmte Zeit.",
      ],
    },
    {
      type: "paragraph",
      text: "Ein System mit hinterlegtem Austrittsprozess arbeitet diese Liste ab. Eine Tabelle kann das nicht, und deshalb wird sie bei jedem Austritt neu aus dem Gedächtnis zusammengesetzt.",
    },
  ],

  /* ------------------------------------------------ Lager, drei Systeme */
  "art-lager-einkauf-verkauf-getrennt": [
    {
      type: "heading",
      level: 2,
      text: "Artikelstammdaten sind eine Daueraufgabe",
      id: "artikelstamm",
    },
    {
      type: "paragraph",
      text: "Die Bereinigung vor dem Projekt ist notwendig und nicht ausreichend. Ohne Regeln für die Neuanlage ist der Stamm nach zwei Jahren wieder im alten Zustand.",
    },
    {
      type: "paragraph",
      text: "Legen Sie deshalb fest, wer Artikel anlegen darf, welche Felder Pflicht sind und wie die Bezeichnung aufgebaut ist. Eine Bezeichnung, die mit dem Herstellernamen beginnt, sortiert sich anders als eine, die mit der Warengruppe beginnt, und beides gleichzeitig führt in die Unbrauchbarkeit.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Eine Person oder Rolle hat die Freigabe für neue Artikel, nicht jede Sachbearbeitung.",
        "Pflichtfelder sind definiert: Warengruppe, Einheit, Steuersatz, Lieferant, Einstandspreis.",
        "Die Bezeichnung folgt einem festen Aufbau, schriftlich hinterlegt.",
        "Auslaufartikel werden gekennzeichnet, nicht gelöscht.",
        "Einmal im Quartal prüft jemand die Neuanlagen des Zeitraums.",
      ],
    },
    {
      type: "paragraph",
      text: "Der letzte Punkt kostet eine Stunde im Quartal und verhindert den Rückfall. Betriebe, die ihn auslassen, stehen nach drei Jahren wieder vor demselben Bereinigungsprojekt.",
    },
    {
      type: "heading",
      level: 2,
      text: "Retouren sind kein Randthema",
      id: "retouren",
    },
    {
      type: "paragraph",
      text: "Im Onlinehandel sind Rücksendungen ein Hauptprozess, und sie werden bei der Systemauswahl regelmäßig als Nebensache behandelt.",
    },
    {
      type: "paragraph",
      text: "Eine Retoure berührt den Bestand, die Buchhaltung, die Zahlungsabwicklung und häufig den Marktplatz, über den verkauft wurde. Wenn einer dieser vier Punkte nicht automatisch läuft, entsteht Handarbeit bei jedem einzelnen Vorgang.",
    },
    {
      type: "paragraph",
      text: "Lassen Sie sich deshalb in der Demo eine vollständige Retoure zeigen: Wareneingang mit Prüfung, Entscheidung über Wiederverkaufsfähigkeit, Gutschrift, Rückzahlung und Rückmeldung an den Kanal. Wer das nicht zeigen kann, hat es nicht.",
    },
  ],
};
