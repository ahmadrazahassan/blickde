import type { ArticleBlock } from "@/lib/types";

/**
 * Vertiefende Abschnitte je Beitrag.
 *
 * Sie stehen getrennt von den Grundtexten, weil die Beitragsdateien sonst
 * unübersichtlich werden. Beim Zusammenbau in src/data/articles.ts werden sie
 * vor dem abschließenden Haftungshinweis eingefügt, damit der Hinweis dort
 * bleibt, wo er hingehört: ganz am Ende.
 */
export const vertiefungen: Record<string, ArticleBlock[]> = {
  /* ------------------------------------------------ Buchhaltung, 3 Systeme */
  "art-buchhaltung-drei-programme": [
    {
      type: "heading",
      level: 2,
      text: "Die Stammdaten entscheiden über den Erfolg der Umstellung",
      id: "stammdaten",
    },
    {
      type: "paragraph",
      text: "Wenn eine Umstellung schiefgeht, liegt es in den seltensten Fällen an der Software. Es liegt an den Daten, die hineinwandern. Wer zwanzig Jahre lang Kunden angelegt hat, hat Karteileichen, Dubletten und Schreibweisen, die sich widersprechen.",
    },
    {
      type: "paragraph",
      text: "Ein typischer Befund aus einem Betrieb mit achthundert Kundenadressen: sechzig Dubletten, weil dieselbe Firma einmal mit und einmal ohne Rechtsform angelegt wurde. Vierzig Adressen ohne Umsatzsteuer-Identifikationsnummer, obwohl es sich um Kunden im EU-Ausland handelt. Zwölf Kunden, die es seit Jahren nicht mehr gibt und die trotzdem im Mahnlauf auftauchen.",
    },
    {
      type: "paragraph",
      text: "Das alte System hat damit gelebt, weil die Bürokraft wusste, welcher Eintrag der richtige ist. Das neue System weiß es nicht. Es rechnet mit dem, was dasteht.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Exportieren Sie die Kundenliste und sortieren Sie nach Name. Dubletten fallen sofort auf.",
        "Prüfen Sie alle Kunden im EU-Ausland auf eine hinterlegte Umsatzsteuer-Identifikationsnummer. Ohne sie ist die innergemeinschaftliche Lieferung nicht sauber abzurechnen.",
        "Markieren Sie Kunden ohne Umsatz in den letzten drei Jahren. Sie müssen nicht gelöscht werden, aber sie gehören nicht in die aktive Liste.",
        "Gleichen Sie Zahlungsbedingungen ab. Skontovereinbarungen, die nur im Kopf existieren, gehen bei der Migration verloren.",
        "Prüfen Sie den Kontenrahmen. Selbst angelegte Konten müssen im neuen System dieselbe Nummer behalten, sonst stimmen die Vorjahresvergleiche nicht.",
      ],
    },
    {
      type: "paragraph",
      text: "Dieser Durchgang kostet je nach Datenbestand einen halben bis zwei Tage. Er ist die beste investierte Zeit im ganzen Projekt, und er lässt sich nicht nachholen. Wer verschmutzte Daten migriert, hat sie danach in zwei Systemen.",
    },
    {
      type: "heading",
      level: 2,
      text: "Was die Kanzlei zu der Entscheidung sagen sollte",
      id: "kanzlei-einbinden",
    },
    {
      type: "paragraph",
      text: "Erstaunlich viele Betriebe entscheiden über ihre Buchhaltungssoftware, ohne mit ihrer Steuerkanzlei gesprochen zu haben. Das ist ungefähr so, als würde man ein Auto kaufen, ohne zu prüfen, ob es in die Garage passt.",
    },
    {
      type: "paragraph",
      text: "Die Kanzlei arbeitet mit Ihren Daten weiter. Sie kennt die Formate, die funktionieren, und die, bei denen sie jedes Jahr nacharbeitet. Diese Erfahrung bekommen Sie in einem Telefonat von zehn Minuten.",
    },
    {
      type: "paragraph",
      text: "Stellen Sie drei Fragen. Erstens: Mit welchem Format arbeiten Sie am liebsten? Zweitens: Haben Sie mit einem der Produkte, die ich in die engere Wahl genommen habe, bereits Mandanten? Drittens: Was kostet es mich, wenn das Format nicht passt?",
    },
    {
      type: "paragraph",
      text: "Die dritte Frage bringt die klarste Antwort. Nacharbeit in der Kanzlei wird nach Zeit abgerechnet, und zwar zu Kanzleisätzen. Ein Format, das jedes Jahr zwei Stunden Nacharbeit kostet, ist teurer als der Preisunterschied zwischen zwei Programmen.",
    },
    {
      type: "note",
      title: "Ein Hinweis zur Unabhängigkeit",
      text: "Manche Kanzleien empfehlen genau ein Produkt, weil sie dafür eine Vertriebsvereinbarung haben. Das ist nicht anrüchig, aber Sie sollten es wissen. Fragen Sie ruhig direkt, ob eine solche Vereinbarung besteht. Eine seriöse Kanzlei beantwortet das ohne Zögern.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Kosten, die im Angebot nicht stehen",
      id: "versteckte-kosten",
    },
    {
      type: "paragraph",
      text: "Der Monatspreis auf der Produktseite ist selten der Betrag, den Sie am Jahresende gezahlt haben. Das liegt nicht an unlauteren Absichten, sondern daran, dass Zusatzleistungen getrennt berechnet werden.",
    },
    {
      type: "table",
      caption: "Posten, die regelmäßig hinzukommen",
      head: ["Position", "Häufigkeit", "Größenordnung"],
      rows: [
        ["Zusätzliche Benutzer über die Tarifgrenze hinaus", "sehr häufig", "je Person und Monat"],
        ["Bankkonten über die enthaltene Zahl hinaus", "häufig", "je Konto und Monat"],
        ["Datenübernahme aus dem Altsystem", "einmalig", "Pauschale oder nach Aufwand"],
        ["Schulung", "einmalig", "je Termin"],
        ["Zusatzmodule wie Anlagenbuchhaltung oder Kostenstellen", "häufig", "monatlich"],
        ["Höherer Tarif wegen Belegmenge", "gelegentlich", "monatlich"],
      ],
    },
    {
      type: "paragraph",
      text: "Verlangen Sie deshalb ein Angebot, das Ihre tatsächliche Konstellation abbildet: Ihre Zahl an Benutzern, Ihre Zahl an Bankkonten, Ihr Belegaufkommen. Ein Anbieter, der das nicht liefern kann oder will, ist für eine mehrjährige Zusammenarbeit der falsche.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wie Sie den Wechsel intern verkaufen",
      id: "intern",
    },
    {
      type: "paragraph",
      text: "Der Widerstand kommt selten von der Geschäftsführung. Er kommt von der Person, die das alte System beherrscht und im neuen wieder Anfängerin ist. Dieser Widerstand ist berechtigt und wird regelmäßig unterschätzt.",
    },
    {
      type: "paragraph",
      text: "Wer zwanzig Jahre lang die schnellste Person im Betrieb war und plötzlich für jeden Vorgang doppelt so lange braucht, erlebt das als Rückschritt. Dass es nach sechs Wochen besser läuft, hilft in der zweiten Woche nicht.",
    },
    {
      type: "paragraph",
      text: "Drei Dinge helfen. Erstens: Beziehen Sie die Person in die Auswahl ein, nicht erst in die Einführung. Zweitens: Planen Sie eine Schulung ein, nicht ein Einarbeiten durch Ausprobieren. Drittens: Rechnen Sie in den ersten beiden Monaten mit weniger Leistung und sagen Sie das offen, statt es als Problem zu behandeln.",
    },
    {
      type: "quote",
      text: "Unsere Buchhalterin war anfangs strikt dagegen. Wir haben sie zu den drei Anbietergesprächen mitgenommen und sie hat am Ende die Entscheidung getroffen. Danach lief die Einführung von selbst.",
      source: "Geschäftsführer eines Handelsbetriebs mit 22 Beschäftigten, Gespräch im April 2026",
    },
  ],

  /* ---------------------------------------------------- Lohn, drei Tage */
  "art-lohnabrechnung-drei-tage": [
    {
      type: "heading",
      level: 2,
      text: "Die Sonderfälle, an denen Systeme scheitern",
      id: "sonderfaelle",
    },
    {
      type: "paragraph",
      text: "Jedes Abrechnungsprogramm bewältigt den Normalfall. Die Unterschiede zeigen sich an den Fällen, die einmal im Quartal vorkommen und dann drei Stunden kosten.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Der Minijob, der im laufenden Monat in eine sozialversicherungspflichtige Beschäftigung übergeht.",
        "Die Aushilfe, die in zwei Betrieben desselben Inhabers arbeitet und deren Entgelte zusammenzurechnen sind.",
        "Die Pfändung, bei der der pfändbare Betrag monatlich neu zu ermitteln ist.",
        "Die Entgeltumwandlung zur betrieblichen Altersvorsorge mit Arbeitgeberzuschuss.",
        "Der Mitarbeiter im Ausland, für den eine A1-Bescheinigung vor Reiseantritt vorliegen muss.",
        "Die Korrekturabrechnung für einen bereits abgeschlossenen Monat, einschließlich der Meldungskorrektur.",
      ],
    },
    {
      type: "paragraph",
      text: "Der letzte Punkt verdient besondere Aufmerksamkeit. Korrekturen sind der Lackmustest für Abrechnungssoftware. Ein gutes Programm erzeugt die Korrekturabrechnung, berechnet die Differenz und setzt die berichtigte Meldung ab, ohne dass jemand rechnet. Ein schwaches Programm verlangt Handarbeit, und Handarbeit bei Sozialversicherungsmeldungen ist eine Fehlerquelle mit Haftungsfolgen.",
    },
    {
      type: "paragraph",
      text: "Nehmen Sie deshalb in jede Testphase eine Korrektur auf. Rechnen Sie einen Monat ab, ändern Sie danach eine Entgeltangabe und sehen Sie zu, was das Programm tut.",
    },
    {
      type: "heading",
      level: 2,
      text: "Was der Wechsel des Abrechnungssystems wirklich bedeutet",
      id: "wechsel",
    },
    {
      type: "paragraph",
      text: "Ein Wechsel in der Entgeltabrechnung ist anspruchsvoller als jeder andere Softwarewechsel im Betrieb, und der Grund ist die Historie.",
    },
    {
      type: "paragraph",
      text: "Sie brauchen im neuen System nicht nur die aktuellen Stammdaten, sondern die Jahreswerte: aufgelaufene Bruttobeträge, einbehaltene Lohnsteuer, Sozialversicherungsbeiträge, Urlaubsansprüche und Resturlaub, Beiträge zur betrieblichen Altersvorsorge. Ohne diese Werte rechnet das System falsch, und zwar sofort.",
    },
    {
      type: "paragraph",
      text: "Deshalb gibt es für einen Wechsel genau einen sinnvollen Zeitpunkt: den Jahreswechsel. Zum ersten Januar beginnt alles bei null, die Jahreswerte sind abgeschlossen, und die Lohnsteuerbescheinigungen des Vorjahres kommen noch aus dem alten System.",
    },
    {
      type: "note",
      title: "Das alte System bleibt länger, als Sie denken",
      text: "Auch nach dem Wechsel müssen die Daten des Altsystems zugänglich bleiben. Rückfragen der Sozialversicherungsprüfung beziehen sich auf zurückliegende Jahre, und die Prüfung kommt in der Regel alle vier Jahre. Klären Sie vor der Kündigung, wie Sie an diese Daten kommen.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Betriebsprüfung der Rentenversicherung",
      id: "sv-pruefung",
    },
    {
      type: "paragraph",
      text: "Alle vier Jahre prüft die Deutsche Rentenversicherung die Beitragsabrechnung. Das ist kein Ausnahmefall, sondern der Normalfall, und Betriebe unterschätzen regelmäßig, was dabei verlangt wird.",
    },
    {
      type: "paragraph",
      text: "Geprüft werden unter anderem die richtige Beurteilung der Versicherungspflicht, die Beitragsberechnung, die Behandlung von Sachbezügen und die Aufzeichnungen zur Arbeitszeit bei geringfügig Beschäftigten. Der Prüfer verlangt die Daten in maschinell auswertbarer Form.",
    },
    {
      type: "paragraph",
      text: "Ein Abrechnungsprogramm, das diesen Export nicht liefert, verursacht Handarbeit in erheblichem Umfang. Fragen Sie deshalb konkret nach dem Prüfdatenexport, bevor Sie sich entscheiden. Der Begriff, unter dem Anbieter das führen, lautet meist Datenexport für die Sozialversicherungsprüfung.",
    },
    {
      type: "heading",
      level: 2,
      text: "Zeiterfassung und Abrechnung zusammendenken",
      id: "zeiterfassung",
    },
    {
      type: "paragraph",
      text: "Der größte einzelne Zeitfresser in der Abrechnung ist das Einsammeln der Stunden. Er lässt sich nur lösen, wenn Zeiterfassung und Abrechnung zusammenhängen, und zwar ohne dass jemand Zahlen überträgt.",
    },
    {
      type: "paragraph",
      text: "Dabei gibt es zwei Wege. Entweder das Abrechnungssystem bringt die Zeiterfassung mit, oder ein getrenntes Zeitsystem übergibt die Daten über eine Schnittstelle. Beides funktioniert, aber der zweite Weg verlangt eine belastbare Antwort auf eine Frage: Wer prüft die übergebenen Daten und wann?",
    },
    {
      type: "paragraph",
      text: "In der Praxis scheitert es meist daran, dass die Zeitdaten am Tag der Abrechnung noch nicht freigegeben sind. Eine Schnittstelle löst das nicht. Was es löst, ist ein fester Stichtag für die Freigabe, drei Werktage vor dem Abrechnungslauf, verbindlich für alle Führungskräfte.",
    },
    {
      type: "paragraph",
      text: "Diese Regel kostet nichts und wirkt sofort. Sie durchzusetzen ist allerdings Aufgabe der Geschäftsführung, nicht der Personalabteilung.",
    },
  ],

  /* -------------------------------------------- Excel Personalverwaltung */
  "art-excel-personalverwaltung": [
    {
      type: "heading",
      level: 2,
      text: "Aufbewahrungsfristen in der Personalakte",
      id: "aufbewahrung",
    },
    {
      type: "paragraph",
      text: "Eine digitale Personalakte löst ein Problem, das viele Betriebe gar nicht auf dem Schirm haben: Unterlagen, die zu lange aufbewahrt werden. Denn der Datenschutz verlangt nicht nur, dass Daten sicher liegen, sondern auch, dass sie verschwinden, wenn der Zweck entfallen ist.",
    },
    {
      type: "table",
      caption: "Orientierungswerte für Unterlagen aus dem Beschäftigungsverhältnis",
      head: ["Unterlage", "Frist", "Grundlage"],
      rows: [
        ["Lohnkonten und Belege", "6 Jahre", "steuerliche Aufbewahrung"],
        ["Unterlagen zur Sozialversicherung", "bis zur nächsten Prüfung", "Beitragsverfahrensverordnung"],
        ["Arbeitszeitnachweise nach dem Mindestlohngesetz", "2 Jahre", "MiLoG"],
        ["Bewerbungsunterlagen abgelehnter Bewerber", "in der Regel 6 Monate", "Frist nach dem AGG"],
        ["Arbeitsvertrag und Zeugnisse", "über das Ende hinaus", "berechtigtes Interesse"],
      ],
    },
    {
      type: "paragraph",
      text: "Die Zeile zu den Bewerbungsunterlagen ist die, an der es in der Praxis am häufigsten hakt. Nach einer Absage besteht ein berechtigtes Interesse an der Aufbewahrung nur so lange, wie Ansprüche nach dem Allgemeinen Gleichbehandlungsgesetz geltend gemacht werden können. Danach ist zu löschen.",
    },
    {
      type: "paragraph",
      text: "In einem Aktenschrank passiert das nie. In einem System mit hinterlegten Fristen passiert es automatisch, und genau das ist einer der unterschätzten Gründe für die Umstellung.",
    },
    {
      type: "heading",
      level: 2,
      text: "Das Rechtekonzept ist der schwierigste Teil",
      id: "rechte",
    },
    {
      type: "paragraph",
      text: "Sobald Personaldaten in einem System liegen, auf das mehrere Personen zugreifen, brauchen Sie eine Antwort auf die Frage, wer was sehen darf. Diese Antwort ist anspruchsvoller, als sie klingt.",
    },
    {
      type: "paragraph",
      text: "Eine Führungskraft muss den Urlaub ihres Teams sehen, um planen zu können. Sie muss nicht das Gehalt sehen. Sie muss die Krankheitstage sehen, um Ausfälle zu organisieren, aber nicht die Diagnose, die ohnehin nirgends stehen darf. Die Personalabteilung sieht mehr, aber auch nicht alles: Gesundheitsdaten unterliegen als besondere Kategorie nach Art. 9 DSGVO strengeren Anforderungen.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Legen Sie zuerst die Rollen fest, nicht die Personen: Beschäftigte, Führungskraft, Personalverwaltung, Geschäftsführung.",
        "Ordnen Sie jeder Rolle die Datenarten zu, die sie für ihre Aufgabe braucht, nicht die, die interessant wären.",
        "Klären Sie die Vertretung. Wer sieht die Daten, wenn die Personalverwaltung im Urlaub ist?",
        "Dokumentieren Sie das Ergebnis schriftlich. Es gehört in das Verzeichnis von Verarbeitungstätigkeiten.",
        "Prüfen Sie jährlich, ob die Rollen noch stimmen. Beförderungen ändern Zugriffe.",
      ],
    },
    {
      type: "paragraph",
      text: "Ein System, das nur zwei Rollen kennt, nämlich Administrator und Benutzer, erfüllt diese Anforderungen nicht. Das ist eines der härtesten Ausschlusskriterien bei der Auswahl und wird regelmäßig übersehen, weil in der Demo alles offen ist.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Auftragsverarbeitung mit dem Anbieter",
      id: "avv",
    },
    {
      type: "paragraph",
      text: "Sobald Personaldaten in einem fremden System liegen, verarbeitet der Anbieter sie in Ihrem Auftrag. Damit brauchen Sie einen Vertrag nach Art. 28 DSGVO, und zwar bevor die ersten Daten übertragen werden.",
    },
    {
      type: "paragraph",
      text: "Verantwortlich bleiben Sie. Der Anbieter ist Auftragsverarbeiter. Fehlt der Vertrag, ist das ein eigenständiger Verstoß, unabhängig davon, ob etwas passiert ist.",
    },
    {
      type: "paragraph",
      text: "Prüfen Sie dabei besonders die Liste der Unterauftragsverarbeiter. Dort steht häufiger als im Hauptvertrag, wohin Daten tatsächlich fließen. Ein Anbieter, der diese Liste nicht öffentlich führt, sollte sie Ihnen auf Anfrage geben.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wie Sie die Einführung planen",
      id: "einfuehrung",
    },
    {
      type: "paragraph",
      text: "Personalsoftware wird selten an einem Tag eingeführt. Sinnvoll ist eine Reihenfolge, die mit dem beginnt, was den größten Nutzen bei geringstem Widerstand bringt.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Abwesenheiten zuerst. Urlaub und Krankmeldungen betreffen alle, sind unstrittig und erzeugen sofort spürbare Entlastung.",
        "Danach die digitale Akte. Dokumente wandern nach und nach hinein, beginnend mit den laufenden Verträgen.",
        "Dann die Zeiterfassung. Sie ist der Teil mit dem meisten Erklärungsbedarf und dem höchsten Mitbestimmungsgewicht.",
        "Zuletzt Recruiting und Leistungsbeurteilung, sofern Sie sie brauchen.",
      ],
    },
    {
      type: "paragraph",
      text: "Wer umgekehrt vorgeht und mit der Zeiterfassung beginnt, sammelt Widerstand ein, bevor irgendjemand einen Nutzen gesehen hat. Das ist der häufigste Grund, warum Einführungen stecken bleiben.",
    },
  ],

  /* ------------------------------------------------ Lager, drei Systeme */
  "art-lager-einkauf-verkauf-getrennt": [
    {
      type: "heading",
      level: 2,
      text: "Inventurdifferenzen ehrlich behandeln",
      id: "inventur",
    },
    {
      type: "paragraph",
      text: "Ein ERP-System führt einen Bestand. Ob dieser Bestand stimmt, entscheidet sich nicht in der Software, sondern bei der Inventur und im Umgang mit Differenzen.",
    },
    {
      type: "paragraph",
      text: "In vielen Betrieben ist der Umgang mit Differenzen informell. Fehlt Ware, wird der Bestand korrigiert und weitergearbeitet. Damit geht die wichtigste Information verloren: warum sie gefehlt hat.",
    },
    {
      type: "paragraph",
      text: "Sinnvoll ist eine Erfassung mit Grund. Bruch, Schwund, Fehlbuchung beim Wareneingang, Entnahme ohne Beleg. Erst wenn diese Gründe über ein Jahr gesammelt vorliegen, sehen Sie, wo das Problem tatsächlich sitzt, und in den meisten Fällen sitzt es im Wareneingang und nicht im Lager.",
    },
    {
      type: "note",
      title: "Permanente Inventur statt Stichtagsinventur",
      text: "Wer ein System mit verlässlicher Bestandsführung hat, kann auf die permanente Inventur umstellen und zählt dann über das Jahr verteilt statt an einem Stichtag. Das erspart die Betriebsunterbrechung zwischen den Jahren. Voraussetzung sind ordnungsgemäße Aufzeichnungen über alle Bestandsveränderungen. Sprechen Sie das mit Ihrer Kanzlei ab, bevor Sie umstellen.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Anbindung der Verkaufskanäle",
      id: "kanaele",
    },
    {
      type: "paragraph",
      text: "Die Zusammenführung des Bestands nützt nichts, wenn die Verkaufskanäle ihn nicht in Echtzeit lesen. Genau hier liegt der technisch heikelste Teil eines solchen Projekts.",
    },
    {
      type: "paragraph",
      text: "Fragen Sie deshalb konkret nach der Aktualisierungsfrequenz. Ein Abgleich alle vier Stunden klingt nach viel und reicht bei schnelldrehenden Artikeln nicht. Ein Abgleich alle fünf Minuten ist in der Regel ausreichend. Ein echter Zugriff in Echtzeit ist der beste Fall und nicht bei jedem Marktplatz möglich.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Wie häufig werden Bestände an den Shop und an die Marktplätze übertragen?",
        "Was passiert bei einer Störung der Verbindung? Wird der Bestand eingefroren oder weiter verkauft?",
        "Werden Reservierungen berücksichtigt, also Ware, die im Auftrag steht, aber noch nicht versandt ist?",
        "Wie werden Artikel mit Varianten übertragen, etwa Größen und Farben?",
        "Wer pflegt Artikelbeschreibungen und Bilder, das System oder der Kanal?",
      ],
    },
    {
      type: "paragraph",
      text: "Die zweite Frage ist die, deren Antwort am meisten über die Reife eines Systems verrät. Ein durchdachtes System setzt bei Verbindungsverlust den Bestand auf null oder friert ihn ein. Ein unausgereiftes verkauft munter weiter.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Rolle der Buchhaltung im ERP-Projekt",
      id: "buchhaltung",
    },
    {
      type: "paragraph",
      text: "Ein häufiger Fehler in ERP-Projekten besteht darin, die Buchhaltung erst am Ende einzubeziehen. Dabei entscheidet sie über Kontenrahmen, Steuerschlüssel und die Frage, wie Warenbewegungen bewertet werden.",
    },
    {
      type: "paragraph",
      text: "Besonders wichtig ist die Bewertungsmethode für den Lagerbestand. Gleitender Durchschnitt, Verbrauchsfolgeverfahren oder Standardpreise führen zu unterschiedlichen Beständen in der Bilanz. Wer diese Frage dem Projektpartner überlässt, bekommt die Voreinstellung, und die passt nicht immer zur bisherigen Praxis.",
    },
    {
      type: "paragraph",
      text: "Sprechen Sie das mit Ihrer Kanzlei durch, bevor die Einrichtung beginnt. Ein Wechsel der Bewertungsmethode im laufenden Jahr ist nicht ohne Weiteres zulässig und erzeugt Erklärungsbedarf gegenüber dem Finanzamt.",
    },
    {
      type: "heading",
      level: 2,
      text: "Nach dem Start beginnt die eigentliche Arbeit",
      id: "nach-dem-start",
    },
    {
      type: "paragraph",
      text: "Der Tag, an dem das System produktiv geht, ist nicht das Ende des Projekts. Er ist der Beginn der Phase, in der sich zeigt, was in der Einrichtung übersehen wurde.",
    },
    {
      type: "paragraph",
      text: "Planen Sie für die ersten acht Wochen eine wöchentliche Runde mit allen beteiligten Bereichen ein, dreißig Minuten, mit einer offenen Liste. Was nicht funktioniert, kommt auf die Liste. Was auf der Liste steht, bekommt einen Verantwortlichen und ein Datum.",
    },
    {
      type: "paragraph",
      text: "Betriebe, die diese Runde durchhalten, sind nach zwei Monaten im Normalbetrieb. Betriebe, die sie ausfallen lassen, arbeiten nach einem Jahr immer noch mit Umgehungen, die niemand dokumentiert hat.",
    },
  ],

  /* ---------------------------------------------------- Monatsabschluss */
  "art-monatsabschluss-dauert": [
    {
      type: "heading",
      level: 2,
      text: "Abgrenzungen systematisch statt fallweise",
      id: "abgrenzungen",
    },
    {
      type: "paragraph",
      text: "Ein Großteil der Diskussionen im Abschluss dreht sich um dieselben Sachverhalte: Versicherungen, Wartungsverträge, Mieten, Boni, Urlaubsrückstellungen. Jeden Monat wird neu überlegt, jeden Monat kommt dasselbe heraus.",
    },
    {
      type: "paragraph",
      text: "Der Ausweg ist eine Abgrenzungsrichtlinie. Sie legt fest, welche Sachverhalte grundsätzlich abgegrenzt werden, ab welcher Betragsgrenze und nach welchem Schlüssel. Danach entscheidet niemand mehr im Einzelfall, sondern wendet die Regel an.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Legen Sie eine Wesentlichkeitsgrenze fest. Beträge darunter werden nicht abgegrenzt.",
        "Definieren Sie für wiederkehrende Sachverhalte einen festen Schlüssel, etwa zeitanteilig nach Kalendertagen.",
        "Hinterlegen Sie die Abgrenzung als wiederkehrende Buchung, damit sie automatisch entsteht.",
        "Prüfen Sie die Richtlinie einmal jährlich, nicht monatlich.",
      ],
    },
    {
      type: "paragraph",
      text: "Diese Richtlinie hat einen zweiten Nutzen, der oft wichtiger ist als die Zeitersparnis: Sie macht die Zahlen zwischen den Monaten vergleichbar. Wenn jeden Monat anders abgegrenzt wird, ist jeder Monatsvergleich wertlos.",
    },
    {
      type: "heading",
      level: 2,
      text: "Der Fast Close und was er kostet",
      id: "fast-close",
    },
    {
      type: "paragraph",
      text: "In größeren Unternehmen heißt das Ziel Fast Close: der Abschluss innerhalb weniger Arbeitstage. Erreichbar ist das, aber der Preis wird selten genannt.",
    },
    {
      type: "paragraph",
      text: "Er besteht aus Schätzungen. Wer am dritten Arbeitstag abschließt, hat nicht alle Eingangsrechnungen. Er bildet Rückstellungen auf Basis von Bestellungen und korrigiert später. Das ist zulässig und üblich, verlangt aber ein belastbares Bestellwesen.",
    },
    {
      type: "paragraph",
      text: "Wer kein System hat, in dem offene Bestellungen sauber geführt werden, kann nicht schätzen. Er kann nur warten. Deshalb ist die Beschaffung der eigentliche Hebel für einen schnellen Abschluss, nicht die Buchhaltung.",
    },
    {
      type: "note",
      title: "Vorläufig ist besser als spät",
      text: "Viele Finanzteams zögern, vorläufige Zahlen zu veröffentlichen, aus Sorge vor Korrekturen. Für Entscheidungen sind vorläufige Zahlen am fünften Arbeitstag jedoch weit nützlicher als endgültige am fünfzehnten. Kennzeichnen Sie sie als vorläufig und liefern Sie sie trotzdem.",
    },
    {
      type: "heading",
      level: 2,
      text: "Kennzahlen, an denen Sie Fortschritt messen",
      id: "kennzahlen",
    },
    {
      type: "paragraph",
      text: "Wer den Abschluss verkürzen will, braucht Messwerte. Ohne sie diskutiert man über Eindrücke.",
    },
    {
      type: "table",
      caption: "Messgrößen für den Monatsabschluss",
      head: ["Kennzahl", "Zielrichtung", "Erhebung"],
      rows: [
        ["Arbeitstag der Fertigstellung", "sinkend", "je Monat notieren"],
        ["Anteil Eingangsrechnungen am Monatsletzten erfasst", "steigend", "aus dem System"],
        ["Zahl offener Freigaben am ersten Arbeitstag", "sinkend", "aus dem Workflow"],
        ["Zahl manueller Umbuchungen im Abschluss", "sinkend", "aus dem Journal"],
        ["Zahl nachträglicher Korrekturen", "sinkend", "je Monat notieren"],
      ],
    },
    {
      type: "paragraph",
      text: "Die vorletzte Zeile ist die aussagekräftigste. Manuelle Umbuchungen im Abschluss sind fast immer ein Zeichen dafür, dass etwas im laufenden Monat falsch gebucht wurde. Wer sie senkt, senkt automatisch die Abschlussdauer.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wenn mehrere Gesellschaften im Spiel sind",
      id: "mehrere-gesellschaften",
    },
    {
      type: "paragraph",
      text: "Sobald ein Konzernabschluss erstellt wird, kommen Anforderungen hinzu, die mit der Geschwindigkeit der einzelnen Gesellschaft wenig zu tun haben.",
    },
    {
      type: "paragraph",
      text: "Der wichtigste Punkt ist ein einheitlicher Kontenrahmen. Solange jede Gesellschaft eigene Konten führt und die Zuordnung in einer Tabelle gepflegt wird, ist jede Konsolidierung Handarbeit mit Fehlerrisiko.",
    },
    {
      type: "paragraph",
      text: "Der zweite Punkt sind zwischengesellschaftliche Vorgänge. Sie müssen eliminiert werden, und dafür müssen beide Seiten denselben Vorgang gleich bezeichnen. In der Praxis scheitert es meist daran, dass die eine Gesellschaft im Januar bucht und die andere im Februar.",
    },
    {
      type: "paragraph",
      text: "Ein System mit gemeinsamer Datenbasis löst beides, weil die Zuordnung nicht nachträglich hergestellt werden muss. Wer bei getrennten Systemen bleibt, braucht stattdessen eine verbindliche Buchungsrichtlinie und einen festen Stichtag für konzerninterne Belege.",
    },
  ],

  /* --------------------------------------------------- Handwerk, abends */
  "art-handwerk-bueroarbeit-abends": [
    {
      type: "heading",
      level: 2,
      text: "Abschlagsrechnungen richtig stellen",
      id: "abschlagsrechnungen",
    },
    {
      type: "paragraph",
      text: "Für Handwerksbetriebe mit längeren Bauvorhaben ist die Abschlagsrechnung das wichtigste Instrument der Liquiditätssicherung. Und sie ist gleichzeitig die Rechnungsart, an der einfache Programme scheitern.",
    },
    {
      type: "paragraph",
      text: "Eine korrekte Schlussrechnung muss alle vorangegangenen Abschläge ausweisen und abziehen. Sie muss erkennen lassen, welche Leistung insgesamt erbracht wurde und was davon bereits bezahlt ist. Wird das falsch gemacht, entsteht ein Umsatzsteuerproblem, denn die Steuer ist auf den vereinnahmten Betrag abzuführen.",
    },
    {
      type: "paragraph",
      text: "Prüfen Sie deshalb in jeder Testphase eine vollständige Kette: Angebot, zwei Abschlagsrechnungen, Schlussrechnung mit Abzug. Wenn das Programm die Abschläge nicht automatisch berücksichtigt, rechnen Sie jeden Monat von Hand nach, und irgendwann geht es schief.",
    },
    {
      type: "note",
      title: "Bauleistungen und die Steuerschuldnerschaft",
      text: "Bei Bauleistungen an andere Bauunternehmer geht die Steuerschuldnerschaft nach § 13b UStG auf den Leistungsempfänger über. Die Rechnung wird dann ohne Umsatzsteuer gestellt, mit einem entsprechenden Hinweis. Ein Programm, das diesen Fall nicht kennt, ist für einen Handwerksbetrieb im Nachunternehmergeschäft unbrauchbar.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wartungsverträge als planbarer Umsatz",
      id: "wartungsvertraege",
    },
    {
      type: "paragraph",
      text: "Der wirtschaftlich stabilste Teil eines Handwerksbetriebs ist selten das Projektgeschäft. Es sind die Wartungsverträge, weil sie planbaren Umsatz und planbare Auslastung bringen.",
    },
    {
      type: "paragraph",
      text: "Genau dieser Bereich wird in vielen Betrieben am schlechtesten verwaltet. Die Verträge liegen im Ordner, die Termine im Kopf, und die Abrechnung erfolgt, wenn jemand daran denkt.",
    },
    {
      type: "paragraph",
      text: "Eine Branchenlösung mit Wartungsverwaltung erzeugt die fälligen Termine automatisch, plant sie in den Kalender und stellt die Rechnung. Der Effekt ist doppelt: Es geht kein Termin mehr verloren, und die Auslastung in den ruhigen Monaten lässt sich steuern.",
    },
    {
      type: "paragraph",
      text: "Betriebe, die diesen Bereich zuerst digitalisieren, berichten regelmäßig von einem Umsatzeffekt, der die Softwarekosten in wenigen Monaten übersteigt. Das ist der Teil, bei dem sich die Investition am schnellsten zeigt.",
    },
    {
      type: "heading",
      level: 2,
      text: "Was die Monteure tatsächlich akzeptieren",
      id: "monteure",
    },
    {
      type: "paragraph",
      text: "Die beste Software scheitert, wenn sie auf der Baustelle nicht benutzt wird. Und der Grund dafür ist fast immer derselbe: Sie verlangt zu viel.",
    },
    {
      type: "paragraph",
      text: "Ein Monteur mit schmutzigen Händen, im Stehen, bei Gegenlicht, will nicht durch sieben Bildschirme. Er will die Baustelle auswählen, Stunden eintragen, Material antippen und fertig sein. Wenn das länger als eine Minute dauert, wird es abends nachgeholt, und dann sind wir wieder beim Zettel.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Testen Sie die App mit einem Monteur, nicht im Büro und nicht mit dem Chef.",
        "Messen Sie die Zeit für eine typische Erfassung mit der Stoppuhr.",
        "Prüfen Sie, ob die App ohne Netz funktioniert. Im Keller und im Neubau gibt es keines.",
        "Sehen Sie sich die Schriftgröße bei Sonnenlicht an, nicht am Schreibtisch.",
        "Fragen Sie nach der Materialsuche. Wenn der Monteur eine Artikelnummer kennen muss, wird es nicht genutzt.",
      ],
    },
    {
      type: "paragraph",
      text: "Der vorletzte Punkt wird fast immer vergessen und ist im Sommer auf dem Dach entscheidend.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Einführung in die ruhige Jahreszeit legen",
      id: "zeitpunkt",
    },
    {
      type: "paragraph",
      text: "Anders als bei der Buchhaltung gibt es im Handwerk keinen steuerlichen Zwangstermin für die Umstellung. Es gibt aber einen praktischen.",
    },
    {
      type: "paragraph",
      text: "Die Stammdatenpflege für Material, Leistungen und Lohngruppen kostet zwei bis vier Wochen, in denen jemand im Betrieb verfügbar sein muss. Diese Person ist im Sommer auf der Baustelle. Im Januar und Februar ist sie es seltener.",
    },
    {
      type: "paragraph",
      text: "Betriebe, die im Winter einrichten und im Frühjahr produktiv gehen, berichten durchgängig von einem ruhigeren Verlauf als Betriebe, die im Mai beginnen. Das ist kein Naturgesetz, aber es ist ein Muster.",
    },
  ],

  /* ------------------------------------------ Rangliste Buchhaltung ---- */
  "art-top-buchhaltung-klein": [
    {
      type: "heading",
      level: 2,
      text: "Wer in dieser Liste bewusst fehlt",
      id: "wer-fehlt",
    },
    {
      type: "paragraph",
      text: "Eine Rangliste sagt auch etwas darüber aus, was nicht darin steht. Drei Gruppen von Produkten haben wir bewusst ausgelassen.",
    },
    {
      type: "paragraph",
      text: "Erstens internationale Programme ohne belastbare deutsche Anbindung. Sie sind funktional oft hervorragend, scheitern aber an ELSTER, am DATEV-Format oder an den Kontenrahmen SKR03 und SKR04. Ein Betrieb, dessen Kanzlei nacharbeiten muss, zahlt den vermeintlich günstigeren Preis mehrfach.",
    },
    {
      type: "paragraph",
      text: "Zweitens reine Rechnungsprogramme. Sie schreiben Rechnungen und verwalten Kunden, führen aber keine Buchhaltung. Für Kleinstunternehmen kann das genügen, gehört aber nicht in einen Vergleich von Buchhaltungssoftware.",
    },
    {
      type: "paragraph",
      text: "Drittens Systeme, die ausschließlich über Partner vertrieben werden und für die kein Preis veröffentlicht ist. Sie können hervorragend passen, lassen sich aber nicht vergleichen, und ein Vergleich ohne Preis ist wertlos.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wie sich der Bedarf mit der Betriebsgröße ändert",
      id: "betriebsgroesse",
    },
    {
      type: "table",
      caption: "Anforderungen nach Betriebsgröße",
      head: ["Größe", "Kritische Anforderung", "Typischer Zuschnitt"],
      rows: [
        ["1 Person", "EÜR, einfache Belegerfassung", "Cloudprogramm, ein Nutzer"],
        ["2 bis 9", "Bankabgleich, Kanzleiübergabe", "Cloudprogramm, Tarif je Unternehmen"],
        ["10 bis 49", "Bilanz, Kostenstellen, mehrere Nutzer", "Cloud oder lokal, Mehrnutzerfähigkeit"],
        ["50 bis 249", "Anlagenbuchhaltung, Auswertungen, Rechte", "ERP-nahes System"],
      ],
    },
    {
      type: "paragraph",
      text: "Die Zeile mit zehn bis neunundvierzig Beschäftigten ist die kritischste, weil dort der Übergang stattfindet. Betriebe in dieser Größe wählen häufig ein Produkt, das für die vorherige Stufe gedacht war, und wachsen innerhalb von achtzehn Monaten heraus.",
    },
    {
      type: "paragraph",
      text: "Rechnen Sie deshalb nicht mit der heutigen Zahl, sondern mit der in drei Jahren. Ein Wechsel kostet mehr als der Preisunterschied zwischen zwei Tarifen.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die E-Rechnung als Auswahlkriterium",
      id: "e-rechnung",
    },
    {
      type: "paragraph",
      text: "Seit dem 01.01.2025 muss jedes Unternehmen in Deutschland E-Rechnungen empfangen können, ausnahmslos, auch Kleinunternehmer nach § 19 UStG. Für den Versand laufen Übergangsfristen, gestaffelt nach Vorjahresumsatz.",
    },
    {
      type: "paragraph",
      text: "Für die Softwareauswahl heißt das: Empfang und Versand sind zwei getrennte Funktionen mit zwei getrennten Fristen, und sie sind getrennt zu prüfen. Ein Anbieter, der auf seiner Website nur E-Rechnung schreibt, hat die Frage nicht beantwortet.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Kann die Software eine eingehende ZUGFeRD-Datei auslesen und die Daten in die Buchung übernehmen, oder legt sie nur das PDF ab?",
        "Welche ZUGFeRD-Version wird beim Versand erzeugt? Unter Version 2.1 erfüllt die Datei die Norm EN 16931 nicht.",
        "Wird XRechnung unterstützt? Das brauchen Sie, sobald ein öffentlicher Auftraggeber dabei ist.",
        "Wie wird archiviert? Aufbewahrungspflichtig ist die strukturierte Datei, nicht der Ausdruck.",
      ],
    },
    {
      type: "paragraph",
      text: "Der letzte Punkt ist der, an dem die meisten Betriebe scheitern, und zwar organisatorisch, nicht technisch. Wer eingehende E-Rechnungen im Postfach liegen lässt, erfüllt die GoBD-Anforderungen an Unveränderbarkeit und Auffindbarkeit nicht.",
    },
  ],

  /* ------------------------------------------ Rangliste Lohn ----------- */
  "art-top-lohnabrechnung": [
    {
      type: "heading",
      level: 2,
      text: "Selbst abrechnen oder abrechnen lassen",
      id: "selbst-oder-kanzlei",
    },
    {
      type: "paragraph",
      text: "Bevor Sie ein Programm auswählen, sollten Sie die Frage davor beantworten: Wollen Sie überhaupt selbst abrechnen?",
    },
    {
      type: "paragraph",
      text: "Die Entgeltabrechnung ist ein Bereich mit hohem Haftungsrisiko und laufenden Rechtsänderungen. Wer sie selbst übernimmt, braucht jemanden im Haus, der sich fortlaufend damit befasst. Ein Nebenbei geht selten gut.",
    },
    {
      type: "table",
      caption: "Grobe Orientierung, wann sich die eigene Abrechnung rechnet",
      head: ["Beschäftigte", "Tendenz", "Begründung"],
      rows: [
        ["bis 10", "abrechnen lassen", "Fixaufwand je Lauf zu hoch"],
        ["10 bis 30", "beides vertretbar", "hängt an vorhandener Fachkenntnis"],
        ["30 bis 100", "eher selbst", "Kanzleikosten steigen linear"],
        ["über 100", "selbst mit Fachpersonal", "Kontrolle und Reaktionszeit"],
      ],
    },
    {
      type: "paragraph",
      text: "Diese Tabelle ist eine Orientierung, kein Rechenmodell. Entscheidend ist ein anderer Faktor: Haben Sie eine Person, die Lohnabrechnung kann und die auch in sechs Monaten noch da ist? Wenn nicht, ist die Kanzlei der stabilere Weg, unabhängig von der Kopfzahl.",
    },
    {
      type: "heading",
      level: 2,
      text: "Die Vertretungsfrage",
      id: "vertretung",
    },
    {
      type: "paragraph",
      text: "Sie ist der am häufigsten übersehene Punkt in der ganzen Auswahl. Die Abrechnung muss auch stattfinden, wenn die zuständige Person krank ist oder kündigt.",
    },
    {
      type: "paragraph",
      text: "In vielen Betrieben gibt es dafür keinen Plan. Die Abrechnung liegt bei einer Person, die Zugangsdaten liegen bei derselben Person, und das Wissen über Sonderfälle liegt in ihrem Kopf.",
    },
    {
      type: "paragraph",
      text: "Prüfen Sie deshalb, ob das System mehrere Benutzer mit getrennten Rechten erlaubt und ob eine zweite Person eingearbeitet werden kann, ohne Vollzugriff zu erhalten. Und dokumentieren Sie die Sonderfälle schriftlich, und zwar bevor Sie sie brauchen.",
    },
    {
      type: "heading",
      level: 2,
      text: "Rechtsänderungen und wie Anbieter damit umgehen",
      id: "rechtsaenderungen",
    },
    {
      type: "paragraph",
      text: "Im Lohnbereich ändert sich jedes Jahr etwas, und manchmal mitten im Jahr. Beitragsbemessungsgrenzen, Sachbezugswerte, Mindestlohn, Meldeverfahren.",
    },
    {
      type: "paragraph",
      text: "Bei Cloudlösungen erfolgt die Anpassung zentral, und der Anwender merkt davon im besten Fall nichts. Bei lokal installierten Programmen hängt alles am Wartungsvertrag. Ohne ihn bekommen Sie das Update nicht.",
    },
    {
      type: "paragraph",
      text: "Fragen Sie außerdem nach der Geschwindigkeit. Wenn eine Änderung im Dezember beschlossen wird und im Januar gilt, wann ist sie im Programm? Anbieter mit eigener Entwicklung in Deutschland sind hier in der Regel schneller als Anbieter, die eine internationale Codebasis lokalisieren.",
    },
    {
      type: "heading",
      level: 2,
      text: "Was die Beschäftigten von der Umstellung haben",
      id: "beschaeftigte",
    },
    {
      type: "paragraph",
      text: "Eine Umstellung in der Entgeltabrechnung wird meist mit Effizienz begründet. Für die Belegschaft ist das kein Argument. Für sie zählt etwas anderes.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Die Abrechnung liegt digital vor und ist auch nach drei Jahren noch auffindbar, ohne Nachfrage in der Personalabteilung.",
        "Der Urlaubsstand ist jederzeit einsehbar und nicht Gegenstand von Diskussionen.",
        "Anträge lassen sich stellen, ohne jemanden persönlich anzusprechen, was besonders bei Schichtbetrieb zählt.",
        "Bescheinigungen für Bank oder Behörde sind selbst abrufbar.",
      ],
    },
    {
      type: "paragraph",
      text: "Diese Punkte gehören in die Kommunikation zur Einführung. Eine Umstellung, die als Sparmaßnahme angekündigt wird, erzeugt Widerstand. Eine, die den Beschäftigten etwas gibt, läuft leichter.",
    },
  ],

  /* ------------------------------------------ Rangliste HR ------------- */
  "art-top-hr-software": [
    {
      type: "heading",
      level: 2,
      text: "Die Integration mit der Abrechnung prüfen",
      id: "integration",
    },
    {
      type: "paragraph",
      text: "Wenn Sie Personalsystem und Abrechnung getrennt betreiben, entscheidet die Schnittstelle über den Nutzen. Eine schlechte Schnittstelle macht aus zwei guten Systemen einen schlechten Ablauf.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Welche Daten werden übergeben: nur Stammdaten oder auch variable Entgeltbestandteile wie Zuschläge und Überstunden?",
        "In welcher Richtung läuft die Übergabe? Kommen Änderungen aus der Abrechnung zurück ins Personalsystem?",
        "Wie oft wird übertragen, und wer stößt die Übertragung an?",
        "Was passiert bei einem Fehler in der Übergabe? Gibt es ein Protokoll, das jemand liest?",
        "Wer ist verantwortlich, wenn die Schnittstelle nach einem Update nicht mehr funktioniert?",
      ],
    },
    {
      type: "paragraph",
      text: "Die letzte Frage ist unangenehm und wichtig. Bei zwei Anbietern mit einer Schnittstelle dazwischen verweist im Störungsfall gern jeder auf den anderen. Lassen Sie sich die Zuständigkeit schriftlich geben.",
    },
    {
      type: "heading",
      level: 2,
      text: "Bewerbermanagement und seine rechtlichen Fallstricke",
      id: "recruiting-recht",
    },
    {
      type: "paragraph",
      text: "Recruiting-Module sind beliebt und rechtlich anspruchsvoller als die meisten anderen Bereiche einer Personalsoftware.",
    },
    {
      type: "paragraph",
      text: "Bewerbungsunterlagen abgelehnter Bewerber dürfen nur so lange aufbewahrt werden, wie Ansprüche nach dem Allgemeinen Gleichbehandlungsgesetz geltend gemacht werden können. Danach ist zu löschen, es sei denn, die Bewerberin hat in eine längere Speicherung eingewilligt.",
    },
    {
      type: "paragraph",
      text: "Ein System, das keine Löschfristen kennt, verursacht damit einen laufenden Verstoß. Prüfen Sie deshalb, ob Fristen hinterlegt werden können und ob die Löschung automatisch erfolgt oder jemand sie auslösen muss.",
    },
    {
      type: "note",
      title: "Vorsicht bei automatisierter Vorauswahl",
      text: "Systeme, die Bewerbungen automatisch bewerten oder vorsortieren, berühren Art. 22 DSGVO zur automatisierten Entscheidung im Einzelfall. Wenn eine Absage allein aufgrund einer maschinellen Bewertung erfolgt, ist das heikel. Lassen Sie diesen Punkt prüfen, bevor Sie eine solche Funktion einschalten.",
    },
    {
      type: "heading",
      level: 2,
      text: "Wie Sie Angebote vergleichbar machen",
      id: "angebote-vergleichen",
    },
    {
      type: "paragraph",
      text: "HR-Anbieter kalkulieren unterschiedlich, und das macht Angebote schwer vergleichbar. Der eine rechnet pro Person, der nächste pro Modul, der dritte staffelt nach Größenklassen.",
    },
    {
      type: "paragraph",
      text: "Der einzige Weg zu einem belastbaren Vergleich führt über ein eigenes Anforderungsblatt. Schreiben Sie auf, was Sie brauchen, und lassen Sie jeden Anbieter genau darauf ein Angebot machen.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Zahl der Beschäftigten heute und in drei Jahren.",
        "Benötigte Funktionen, getrennt nach unverzichtbar und wünschenswert.",
        "Zahl der Personen mit erweiterten Rechten.",
        "Gewünschte Schnittstellen, namentlich benannt.",
        "Erwarteter Aufwand für Einrichtung und Datenübernahme.",
      ],
    },
    {
      type: "paragraph",
      text: "Mit diesem Blatt bekommen Sie fünf Angebote, die sich gegenüberstellen lassen. Ohne es bekommen Sie fünf Preise für fünf verschiedene Leistungen.",
    },
  ],

  /* ------------------------------------------ Rangliste ERP ------------ */
  "art-top-erp-mittelstand": [
    {
      type: "heading",
      level: 2,
      text: "Standard oder Anpassung: die teuerste Weggabelung",
      id: "standard-oder-anpassung",
    },
    {
      type: "paragraph",
      text: "In jedem ERP-Projekt kommt der Moment, in dem ein Ablauf im Standard nicht abgebildet ist. Dann gibt es zwei Wege: den Ablauf ändern oder das System anpassen.",
    },
    {
      type: "paragraph",
      text: "Anpassungen sind verführerisch, weil sie den Widerstand im Betrieb vermeiden. Sie haben aber Folgekosten, die in der Projektphase niemand nennt: Jede Anpassung muss bei jedem Update geprüft werden, und jede Anpassung bindet Sie an den Partner, der sie gebaut hat.",
    },
    {
      type: "paragraph",
      text: "Die Faustregel erfahrener Projektleiter lautet: Anpassen Sie nur dort, wo der Ablauf Ihr Alleinstellungsmerkmal ist. Alles andere im Standard. Ein Betrieb, der seine Rechnungsnummern seit dreißig Jahren in einem besonderen Format vergibt, hat dafür kein Alleinstellungsmerkmal, sondern eine Gewohnheit.",
    },
    {
      type: "table",
      caption: "Einordnung typischer Anpassungswünsche",
      head: ["Wunsch", "Empfehlung", "Grund"],
      rows: [
        ["Eigene Belegnummernformate", "Standard übernehmen", "reine Gewohnheit"],
        ["Branchenspezifische Kalkulation", "anpassen", "wettbewerbsrelevant"],
        ["Zusätzliche Freigabestufe", "im Standard konfigurieren", "meist vorgesehen"],
        ["Eigene Auswertungen", "anpassen", "geringe Update-Last"],
        ["Abweichende Lagerlogik", "gründlich prüfen", "hohe Folgekosten"],
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Den Partner auswählen, nicht nur das System",
      id: "partner",
    },
    {
      type: "paragraph",
      text: "Bei ERP-Systemen, die über Partner eingeführt werden, ist der Partner wichtiger als das Produkt. Dasselbe System kann mit einem guten Partner in vier Monaten laufen und mit einem schlechten nach zwei Jahren immer noch nicht.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Verlangen Sie zwei Referenzen aus Ihrer Branche und in Ihrer Größenordnung, und rufen Sie dort an.",
        "Fragen Sie nach der Person, die das Projekt tatsächlich leiten wird, nicht nach dem Unternehmen.",
        "Klären Sie, was nach dem Produktivstart passiert und was der laufende Support kostet.",
        "Lassen Sie sich Festpreise für klar abgegrenzte Pakete geben, nicht nur Tagessätze.",
        "Prüfen Sie, wie viele Beratende der Partner für dieses Produkt beschäftigt. Bei zwei Personen sind Sie bei Krankheit blockiert.",
      ],
    },
    {
      type: "paragraph",
      text: "Der Anruf bei den Referenzen ist der wertvollste Teil dieser Liste. Fragen Sie dort nicht, ob sie zufrieden sind, sondern was schiefgelaufen ist und wie der Partner damit umgegangen ist. Die Antwort auf die zweite Frage sagt alles.",
    },
    {
      type: "heading",
      level: 2,
      text: "Der Datenschutz bei international geführten Systemen",
      id: "datenschutz",
    },
    {
      type: "paragraph",
      text: "Mehrere Systeme in dieser Liste stammen von Anbietern mit Konzernsitz außerhalb der Europäischen Union. Das schließt sie nicht aus, verlangt aber eine eigene Prüfung.",
    },
    {
      type: "paragraph",
      text: "EU-Hosting ist bei den meisten wählbar. Der Konzern unterliegt dennoch dem Recht seines Sitzstaates. Ob der Angemessenheitsbeschluss für das EU-US Data Privacy Framework dauerhaft trägt, ist rechtlich nicht abschließend geklärt; die beiden Vorgängerregelungen wurden vom Europäischen Gerichtshof aufgehoben.",
    },
    {
      type: "paragraph",
      text: "Praktischer Rat: Prüfen Sie die Liste der Unterauftragsverarbeiter. Dort steht häufiger als im Hauptvertrag, wohin Daten tatsächlich fließen. Und besprechen Sie das Ergebnis mit Ihrer Datenschutzbeauftragten, bevor Sie unterschreiben, nicht danach.",
    },
    {
      type: "heading",
      level: 2,
      text: "Ein realistischer Zeitplan",
      id: "zeitplan",
    },
    {
      type: "paragraph",
      text: "Zum Abschluss ein Zeitplan, wie er sich in Projekten bewährt hat, die gut gelaufen sind. Er ist konservativer als das, was in Angeboten steht.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Monat eins und zwei: Abläufe aufschreiben, Anforderungen festlegen, Stammdaten bereinigen.",
        "Monat drei: Anbieter und Partner auswählen, Demos mit eigenen Vorgängen.",
        "Monat vier und fünf: Einrichtung, Datenübernahme, erste Tests mit echten Belegen.",
        "Monat sechs: Parallelbetrieb in einem Teilbereich, Schulung der Belegschaft.",
        "Monat sieben: Produktivstart, am besten zu einem Monatsbeginn.",
        "Monat acht und neun: wöchentliche Nachsteuerung mit offener Liste.",
      ],
    },
    {
      type: "paragraph",
      text: "Neun Monate klingen lang. Projekte, die in vier Monaten versprochen werden, dauern erfahrungsgemäß trotzdem neun, nur mit mehr Ärger unterwegs.",
    },
  ],
};
