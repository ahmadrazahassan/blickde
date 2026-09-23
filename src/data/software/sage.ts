import type { Software } from "@/lib/types";
import { compliance } from "./_shared";

/**
 * The Sage line up for Germany.
 *
 * Every price, every tier name, every trial length and the running offer in
 * this file was taken from Sage's own German product pages and checked on
 * 23.09.2026. Where Sage publishes no price, this file carries null and the
 * interface prints "Auf Anfrage" rather than a guess. Where Sage offers a
 * guided demo instead of a self service trial, that is what is recorded,
 * because printing a trial that does not exist would send a buyer to a page
 * that cannot deliver what we promised.
 *
 * Source pages:
 *   sage.com/de-de/sage-business-cloud/intacct/
 *   sage.com/de-de/produkte/sage-active/
 *   sage.com/de-de/produkte/sage-50connected/
 *   sage.com/de-de/produkte/sage-50-handwerk/
 *   sage.com/de-de/sage-business-cloud/sage-operations/
 *   sage.com/de-de/produkte/sage-100/
 *   sage.com/de-de/sage-business-cloud/sage-x3/
 *   sage.com/de-de/sage-business-cloud/lohnabrechnung/
 *   sage.com/de-de/sage-business-cloud/hr/
 */

const CHECKED = "2026-09-23";

const SAGE_VENDOR = {
  vendor_name: "Sage GmbH",
  founded_year: 1981,
  countries_available: ["Deutschland", "Österreich", "Schweiz"],
  price_currency: "EUR",
  price_includes_vat: false,
  pricing_checked_at: CHECKED,
  status: "published" as const,
  updated_at: CHECKED,
  screenshots: [],
  overall_rating: 0,
  ease_of_use_rating: 0,
  value_for_money_rating: 0,
  customer_service_rating: 0,
  functionality_rating: 0,
  review_count: 0,
  affiliate_url: null,
  affiliate_network: null,
};

export const sage: Software[] = [
  /* ==================================================== Sage Active ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-active",
    name: "Sage Active",
    slug: "sage-active",
    tagline: "Angebote, Buchhaltung, Lohn und Personal in einer Cloud",
    description_short:
      "Cloud-Lösung für kleine Unternehmen: Angebote und Rechnungen ab 12,50 EUR im Monat, doppelte Buchführung nach SKR03 und SKR04 im Tarif Essentials, 30 Tage kostenlos testen.",
    description_full: [
      "Sage Active ist die Cloud-Reihe, mit der Sage kleine Unternehmen anspricht, die bisher mit getrennten Programmen für Rechnungen, Buchhaltung und Lohn arbeiten. Beide Tarife laufen im Browser, es gibt eine mobile App, und der Funktionsumfang ist klar entlang zweier Stufen geschnitten.",
      "Der Tarif Starter deckt Angebote, Rechnungen und den Bankabgleich ab und enthält ein Unternehmen mit fünf Nutzern. Eingehende E-Rechnungen in den Formaten XRechnung und ZUGFeRD lassen sich einlesen. Eine eigene Buchführung findet hier nicht statt; die übernimmt bei Bedarf die Kanzlei.",
      "Der Tarif Essentials ist der eigentliche Schritt: doppelte Buchführung mit den Kontenrahmen SKR03 und SKR04, Anlagenbuchhaltung, Einnahmenüberschussrechnung, Umsatzsteuer-Voranmeldung, Jahresabschlüsse sowie Lohnabrechnung und Personalverwaltung. Enthalten sind ein Unternehmen, zehn Nutzer und zwei Mitarbeitende.",
      "Sage wirbt derzeit mit 50 Prozent Rabatt für drei Monate. Die Aktion gilt nach Angabe des Anbieters für Neukunden bis zum 30.09.2026, danach gilt der Listenpreis. Wer den Testzeitraum nicht rechtzeitig kündigt, zahlt automatisch für den Folgemonat. Beides steht im Kleingedruckten der Preisseite und beides sollten Sie vor dem Abschluss lesen.",
      "Die 30 Tage kostenlose Testphase läuft mit echten Daten, und Sie arbeiten nach dem Test nahtlos damit weiter. Für die Entscheidung zwischen Starter und Essentials bietet Sage zusätzlich einen kostenfreien Beratungstermin an.",
    ],
    verdict:
      "Für kleine Unternehmen, die Rechnungen, Buchhaltung und Lohn nicht länger in drei Programmen führen wollen. Der Tarif Essentials ist die eigentliche Komplettlösung, Starter ist reine Rechnungsstellung. Prüfen Sie die Nutzer- und Mitarbeitergrenzen, bevor Sie sich festlegen.",
    logo_url: "/logos/sage-active.png",
    category_id: "cat-buchhaltung",

    starting_price: 12.5,
    billing_period: "month",
    free_trial: true,
    free_version: false,
    trial_days: 30,
    promotion: {
      label: "50 % Rabatt für 3 Monate",
      detail:
        "Aktion für Neukunden. Nach drei Monaten gilt der Listenpreis von 25,00 EUR beziehungsweise 49,00 EUR pro Monat, zzgl. 19 % MwSt.",
      valid_until: "2026-09-30",
    },
    demo: {
      kind: "live-demo",
      label: "Kostenfreien Beratungstermin buchen",
      url: "https://www.sage.com/de-de/produkte/sage-active/",
    },
    pricing_plans: [
      {
        name: "Starter",
        price: 12.5,
        list_price: 25,
        billing_period: "month",
        included_seats: "1 Unternehmen und 5 Nutzer inklusive",
        description: "Die Cloud-Lösung für Angebote und Rechnungen.",
        includes: [
          "Angebote und Rechnungen",
          "Produkte, Leistungen, Preise und Rabatte",
          "KI für Belege und E-Rechnungen",
          "Überblick über unbezahlte Rechnungen",
          "Umsatzberichte in Echtzeit",
          "Einfacher Bankkontenabgleich",
          "Zusammenarbeit mit externem Buchhalter",
          "Offene API und Sage Copilot",
        ],
      },
      {
        name: "Essentials",
        price: 24.5,
        list_price: 49,
        billing_period: "month",
        included_seats: "1 Unternehmen, 10 Nutzer und 2 Mitarbeitende inklusive",
        description: "Die All-in-One-Cloud-Lösung für Buchhaltung und Lohnabrechnung.",
        includes: [
          "Alle Vorteile aus Starter",
          "Doppelte Buchführung nach SKR03 und SKR04",
          "Anlagenbuchhaltung",
          "Automatische Buchungssätze",
          "Echtzeitberichte aus GuV und Bilanz",
          "Einnahmenüberschussrechnung",
          "Umsatzsteuer-Voranmeldung",
          "Jahresabschlüsse sowie Lohnabrechnung und HR",
        ],
        highlighted: true,
      },
    ],

    features: [
      {
        group: "Aufträge und Rechnungen",
        items: [
          { name: "Angebote, Aufträge, Lieferscheine, Rechnungen", available: true },
          { name: "Individuelle Preise und Rabatte", available: true },
          { name: "Versand direkt per E-Mail", available: true },
          { name: "Offene-Posten-Übersicht", available: true },
          { name: "Bankkontenabgleich", available: true },
        ],
      },
      {
        group: "Buchhaltung, ab Tarif Essentials",
        items: [
          { name: "Doppelte Buchführung mit SKR03 und SKR04", available: true },
          { name: "Anlagenbuchhaltung", available: true },
          { name: "Einnahmenüberschussrechnung", available: true },
          { name: "Bilanz und GuV in Echtzeit", available: true },
          { name: "Umsatzsteuer-Voranmeldung", available: true },
          { name: "Jahresabschlüsse", available: true },
          { name: "E-Bilanz", available: false, note: "Über die Erweiterung eBilanz+" },
        ],
      },
      {
        group: "Personal und KI",
        items: [
          { name: "Lohnabrechnung und HR", available: true, note: "Im Tarif Essentials" },
          { name: "Sage Copilot", available: true },
          { name: "Mobile App", available: true },
          { name: "Offene API", available: true },
        ],
      },
    ],
    top_features: [
      "Doppelte Buchführung mit SKR03 und SKR04",
      "E-Rechnung in XRechnung und ZUGFeRD einlesen",
      "Lohnabrechnung und HR im Tarif Essentials",
      "30 Tage kostenlos testen, Kündigung im Testzeitraum möglich",
    ],
    integrations: [
      "eBilanz+",
      "N2F Reisekosten",
      "clockin Zeiterfassung",
      "paywise",
      "Craftboxx",
      "ePages",
      "Shopware 6",
      "DATEV",
    ],
    de_compliance: compliance({
      gobd_konform: true,
      elster_schnittstelle: true,
      datev_export: true,
      e_rechnung_empfang: true,
      e_rechnung_versand: null,
      zugferd_version: "ZUGFeRD, Version auf der Produktseite nicht beziffert",
      xrechnung: true,
      ust_voranmeldung: true,
      euer: true,
      bilanz: true,
      kleinunternehmer: null,
      lohnsteuer_anmeldung: true,
      sv_meldung: true,
      dsgvo_avv: true,
      hosting_standort: "Deutschland",
      support_sprache_de: true,
      support_zeiten: "Unbegrenzter Support laut Anbieter",
    }),
    vendor_website: "https://www.sage.com/de-de/produkte/sage-active/",
    support_types: ["Telefon 069 50007-5665", "Online-Hilfe", "Beratungstermin"],
    languages: ["Deutsch"],
    meta_title: "Sage Active im Test: Preise, 50 % Rabatt und 30 Tage Testphase",
    meta_description:
      "Sage Active geprüft am 23.09.2026: Starter ab 12,50 EUR statt 25,00 EUR, Essentials ab 24,50 EUR statt 49,00 EUR, 50 % Rabatt für 3 Monate bis 30.09.2026 und 30 Tage kostenlos testen.",
    faq: [
      {
        question: "Was kostet Sage Active aktuell?",
        answer:
          "Starter kostet regulär 25,00 EUR und aktuell 12,50 EUR pro Monat, Essentials regulär 49,00 EUR und aktuell 24,50 EUR pro Monat, jeweils zzgl. 19 % MwSt. Der Rabatt von 50 % gilt für Neukunden für drei Monate, nach Angabe von Sage bis zum 30.09.2026.",
      },
      {
        question: "Wie lange kann ich Sage Active kostenlos testen?",
        answer:
          "30 Tage. Sie arbeiten nach dem Test mit Ihren Daten weiter. Wichtig: Kündigen Sie nicht vor Ende des Testzeitraums, entstehen laut Sage automatisch Kosten für den Folgemonat.",
      },
      {
        question: "Welcher Tarif enthält die Buchhaltung?",
        answer:
          "Nur Essentials. Starter deckt Angebote, Rechnungen und den Bankabgleich ab. Doppelte Buchführung, Umsatzsteuer-Voranmeldung, Jahresabschluss sowie Lohn und Personal sind Essentials vorbehalten.",
      },
      {
        question: "Kann Sage Active E-Rechnungen verarbeiten?",
        answer:
          "Eingehende E-Rechnungen in den Formaten XRechnung und ZUGFeRD lassen sich laut Anbieter einlesen. Zum Versand und zur genauen ZUGFeRD-Version macht die deutsche Produktseite keine eindeutige Angabe; das haben wir daher nicht bestätigt.",
      },
    ],
    alternatives: ["lexware-office", "sevdesk", "sage-50", "collmex"],
    featured: true,
  },

  /* =============================================== Sage 50 Connected ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-50",
    name: "Sage 50 Connected",
    slug: "sage-50",
    tagline: "Buchhaltung, Warenwirtschaft und Auftragsbearbeitung in einem",
    description_short:
      "Kaufmännische Komplettlösung ab 30,00 EUR pro Arbeitsplatz und Monat, mit DATEV-Schnittstelle, EÜR oder Bilanz und 30 Tage kostenloser Testphase.",
    description_full: [
      "Sage 50 Connected richtet sich an kleine Unternehmen, die Buchhaltung, Warenwirtschaft und Auftragsbearbeitung in einem System führen wollen. Sage nennt für die Produktfamilie über 250.000 Kunden in Deutschland und über 200 zertifizierte Fachhändler.",
      "Die drei Tarife unterscheiden sich weniger im Grundgerüst als in der Tiefe. Standard bringt Angebote und Rechnungen, integriertes Onlinebanking, Warenwirtschaft, digitale Belegarchivierung, EÜR oder Bilanz, die DATEV-Schnittstelle und E-Rechnung. Comfort ergänzt Anlagenbuchhaltung und Bestellwesen, Professional zusätzlich Kosten- und Erlösrechnung, Variantenartikelverwaltung und anpassbare Chefübersichten.",
      "Wichtig für die Kalkulation: Der genannte Preis gilt pro Arbeitsplatz, bei jährlicher Rechnungsstellung und mit zwölf Monaten Mindestvertragslaufzeit, und er gilt nur für Neukunden. Comfort ist erst ab zwei Arbeitsplätzen verfügbar, Professional ab drei. Ein Betrieb mit vier Arbeitsplätzen im Tarif Professional liegt damit bei 160,00 EUR pro Monat, zzgl. 19 % MwSt.",
      "E-Rechnungen erzeugt das Programm nach Herstellerangabe ZUGFeRD-konform im Format PDF/A. Die Daten liegen in einem zertifizierten Microsoft-Azure-Rechenzentrum in Deutschland.",
      "Die Testphase läuft 30 Tage, verlangt keine Zahlungsangaben und endet automatisch. Das ist der ehrlichere Zuschnitt als eine Testphase, die sich stillschweigend in ein Abonnement verwandelt.",
    ],
    verdict:
      "Für kleine Betriebe mit Warenwirtschaft, die ihre Buchhaltung selbst führen und einen Fachhändler in der Nähe schätzen. Die DATEV-Schnittstelle und die Bilanzfähigkeit sind die Argumente. Rechnen Sie den Preis pro Arbeitsplatz hoch, bevor Sie vergleichen.",
    logo_url: "/logos/sage-50-connected.png",
    category_id: "cat-buchhaltung",

    starting_price: 30,
    billing_period: "seat",
    free_trial: true,
    free_version: false,
    trial_days: 30,
    demo: {
      kind: "live-demo",
      label: "Zehnminütige Bedarfsanalyse vereinbaren",
      url: "https://www.sage.com/de-de/produkte/sage-50connected/",
    },
    pricing_plans: [
      {
        name: "Standard",
        price: 30,
        billing_period: "seat",
        included_seats: "Ab 1 Arbeitsplatz",
        description: "Buchhaltung, Warenwirtschaft und Auftragsbearbeitung im Grundumfang.",
        includes: [
          "Angebote und Rechnungen schreiben",
          "Integriertes Onlinebanking",
          "Warenwirtschaft",
          "Digitale Belegarchivierung",
          "EÜR oder Bilanz",
          "DATEV-Schnittstelle",
          "E-Rechnung",
        ],
      },
      {
        name: "Comfort",
        price: 35,
        billing_period: "seat",
        included_seats: "Verfügbar ab 2 Arbeitsplätzen",
        description: "Zusätzlich Anlagenbuchhaltung und Bestellwesen.",
        includes: ["Alles aus Standard", "Anlagenbuchhaltung", "Bestellwesen"],
        highlighted: true,
      },
      {
        name: "Professional",
        price: 40,
        billing_period: "seat",
        included_seats: "Verfügbar ab 3 Arbeitsplätzen",
        description: "Zusätzlich Kostenrechnung, Varianten und eigene Übersichten.",
        includes: [
          "Alles aus Comfort",
          "Kosten- und Erlösrechnung",
          "Variantenartikelverwaltung",
          "Anpassbare Chefübersichten",
        ],
      },
    ],

    features: [
      {
        group: "Auftrag und Beleg",
        items: [
          { name: "Angebote, Lieferscheine, Rechnungen", available: true },
          { name: "Zentrales Belegarchiv", available: true },
          { name: "Offene-Posten-Verwaltung", available: true },
          { name: "Belegarchivierung über die App", available: true },
          { name: "Integriertes Onlinebanking", available: true },
        ],
      },
      {
        group: "Buchhaltung",
        items: [
          { name: "Einnahmenüberschussrechnung", available: true },
          { name: "Bilanz", available: true },
          { name: "Anlagenbuchhaltung", available: true, note: "Ab Tarif Comfort" },
          { name: "Kosten- und Erlösrechnung", available: true, note: "Ab Tarif Professional" },
          { name: "DATEV-Schnittstelle", available: true },
        ],
      },
      {
        group: "Warenwirtschaft",
        items: [
          { name: "Artikel-, Kunden- und Lieferantenstamm", available: true },
          { name: "Bestellwesen", available: true, note: "Ab Tarif Comfort" },
          { name: "Variantenartikel", available: true, note: "Ab Tarif Professional" },
          { name: "E-Commerce-Anbindung", available: true },
        ],
      },
    ],
    top_features: [
      "DATEV-Schnittstelle für die Kanzlei",
      "EÜR oder Bilanz im Grundumfang",
      "ZUGFeRD-konforme E-Rechnung im Format PDF/A",
      "30 Tage testen ohne Zahlungsangaben",
    ],
    integrations: ["DATEV", "Onlineshop", "Kassenmodul", "Versandmodul", "Sage Lohnabrechnung"],
    de_compliance: compliance({
      gobd_konform: true,
      elster_schnittstelle: true,
      datev_export: true,
      datev_schnittstelle: true,
      e_rechnung_empfang: true,
      e_rechnung_versand: true,
      zugferd_version: "ZUGFeRD-konform als PDF/A, Version nicht beziffert",
      xrechnung: null,
      ust_voranmeldung: true,
      euer: true,
      bilanz: true,
      kleinunternehmer: null,
      dsgvo_avv: true,
      hosting_standort: "Deutschland, zertifiziertes Microsoft-Azure-Rechenzentrum",
      support_sprache_de: true,
      support_zeiten: "Telefon- und Onlinesupport, Zeiten nicht veröffentlicht",
    }),
    vendor_website: "https://www.sage.com/de-de/produkte/sage-50connected/",
    support_types: ["Telefon 02161 3535-6333", "Onlinesupport", "Fachhändler", "Kundenportal"],
    languages: ["Deutsch"],
    meta_title: "Sage 50 Connected im Test: Preise ab 30 EUR und 30 Tage Testphase",
    meta_description:
      "Sage 50 Connected geprüft am 23.09.2026: Standard 30,00 EUR, Comfort 35,00 EUR, Professional 40,00 EUR pro Arbeitsplatz und Monat, DATEV-Schnittstelle und 30 Tage kostenlos testen.",
    faq: [
      {
        question: "Gilt der Preis pro Arbeitsplatz oder pro Unternehmen?",
        answer:
          "Pro Arbeitsplatz. Bei drei Arbeitsplätzen im Tarif Professional zahlen Sie 120,00 EUR pro Monat, zzgl. 19 % MwSt. Der Preis setzt jährliche Rechnungsstellung mit zwölf Monaten Mindestlaufzeit voraus und gilt für Neukunden.",
      },
      {
        question: "Was kostet die Testphase?",
        answer:
          "Nichts. Der Test läuft 30 Tage, verlangt keine Zahlungsangaben und endet automatisch. Eine Kündigung ist nicht erforderlich.",
      },
      {
        question: "Kann ich mit Sage 50 Connected bilanzieren?",
        answer:
          "Ja. EÜR oder Bilanz sind bereits im Tarif Standard enthalten. Das unterscheidet das Produkt von reinen Cloud-Rechnungsprogrammen.",
      },
    ],
    alternatives: ["sage-active", "collmex", "lexware-office", "buchhaltungsbutler"],
    featured: true,
  },

  /* ============================================== Sage 50 Handwerk ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-50-handwerk",
    name: "Sage 50 Handwerk",
    slug: "sage-50-handwerk",
    tagline: "Auftragsbearbeitung, Projektverwaltung und Aufmaß für Handwerksbetriebe",
    description_short:
      "Branchenlösung für Handwerksbetriebe ab 19,90 EUR pro Monat, mit E-Rechnung in ZUGFeRD 2.1 und XRechnung, Projektverwaltung und optionaler GAEB-Schnittstelle.",
    description_full: [
      "Sage 50 Handwerk ist keine allgemeine Buchhaltungssoftware, sondern eine Branchenlösung. Sage nennt über 40 Jahre Erfahrung mit Handwerkssoftware über alle Gewerke hinweg.",
      "Der Unterschied zu Standardprodukten liegt in den Funktionen, die ein Handwerksbetrieb tatsächlich braucht: Abschlags-, Teil- und Schlussrechnungen, Stammdaten für Leistungen, Material und Löhne, Express-Auftrag für spontane Kundenanfragen, Aufmaße, Termin- und Ressourcenplanung sowie Wartung und Service.",
      "Der Tarif Essential kostet 19,90 EUR pro Monat für einen Benutzer. Enterprise kostet 59,00 EUR pro Monat für unbegrenzt viele Benutzer und ergänzt Teil- und Schlussrechnungen sowie den Terminkalender. Beide Preise gelten bei jährlicher Rechnungsstellung mit zwölf Monaten Mindestvertragslaufzeit, zzgl. MwSt.",
      "Erweiterbar ist die Lösung unter anderem um Schnittstellen wie GAEB und IDS, ein Dokumenten-Management-System, Finanzbuchhaltung, Nachkalkulation und das Regiezentrum. Diese Module sind nicht im Grundpreis enthalten und gehören in jedes Angebot, das Sie einholen.",
      "Sage hebt hervor, dass Arbeitszeitnachweis nach dem Mindestlohngesetz, der Ausweis von Lohnkosten nach § 35a EStG sowie GoBD und Abgabenordnung mit einer Lösung abgedeckt sind. Die Produktseite verweist auf eine kostenlose Demo- beziehungsweise Testversion, beziffert deren Dauer jedoch nicht. Fragen Sie danach, bevor Sie planen.",
    ],
    verdict:
      "Die richtige Wahl für Handwerksbetriebe mit Aufmaß, Nachkalkulation und Abschlagsrechnungen, besonders bei öffentlichen Auftraggebern mit GAEB-Leistungsverzeichnissen. Der Grundpreis ist niedrig, die entscheidenden Module sind es nicht. Lassen Sie sich alles in einem Angebot ausweisen.",
    logo_url: "/logos/sage-50-handwerk.png",
    category_id: "cat-erp",

    starting_price: 19.9,
    billing_period: "month",
    free_trial: false,
    free_version: false,
    demo: {
      kind: "infopaket",
      label: "Kostenloses Infopaket herunterladen",
      url: "https://www.sage.com/de-de/produkte/sage-50-handwerk/",
    },
    pricing_plans: [
      {
        name: "Essential",
        price: 19.9,
        billing_period: "month",
        included_seats: "1 Benutzer",
        description: "Grundumfang für Angebote, Aufträge und Projektverwaltung.",
        includes: [
          "E-Rechnung in ZUGFeRD 2.1 und XRechnung",
          "Angebote, Aufträge, Rechnungen",
          "Stammdaten für Leistungen, Material und Löhne",
          "Projektverwaltung",
          "SmartFinder",
          "Express-Auftrag",
        ],
      },
      {
        name: "Enterprise",
        price: 59,
        billing_period: "month",
        included_seats: "Unbegrenzte Benutzer",
        description: "Zusätzlich Abschlagsrechnungen und Terminkalender.",
        includes: [
          "Alle Funktionen aus Essential",
          "Teil- und Schlussrechnungen",
          "Terminkalender",
        ],
        highlighted: true,
      },
    ],

    features: [
      {
        group: "Handwerk",
        items: [
          { name: "Aufmaße", available: true },
          { name: "Abschlags-, Teil- und Schlussrechnungen", available: true, note: "Ab Enterprise" },
          { name: "Termin- und Ressourcenplanung", available: true, note: "Optional erweiterbar" },
          { name: "Wartung und Service", available: true, note: "Optional erweiterbar" },
          { name: "Nachkalkulation", available: true, note: "Optional erweiterbar" },
          { name: "GAEB- und IDS-Schnittstelle", available: true, note: "Optional erweiterbar" },
        ],
      },
      {
        group: "Büro und Baustelle",
        items: [
          { name: "Mobiler Zugriff", available: true },
          { name: "Zeiterfassung", available: true },
          { name: "Dokumenten-Management-System", available: true, note: "Optional erweiterbar" },
          { name: "Lager- und Bestellwesen", available: true },
          { name: "Finanzbuchhaltung", available: true, note: "Optional erweiterbar" },
        ],
      },
    ],
    top_features: [
      "E-Rechnung in ZUGFeRD 2.1 und XRechnung",
      "Aufmaß und Nachkalkulation je Projekt",
      "Arbeitszeitnachweis nach dem Mindestlohngesetz",
      "Lohnkostenausweis nach § 35a EStG",
    ],
    integrations: ["GAEB", "IDS", "DATEV", "Loginfinity Cloud-Paket"],
    de_compliance: compliance({
      gobd_konform: true,
      e_rechnung_empfang: true,
      e_rechnung_versand: true,
      zugferd_version: "2.1",
      xrechnung: true,
      datev_export: null,
      elster_schnittstelle: null,
      ust_voranmeldung: null,
      bilanz: null,
      dsgvo_avv: true,
      hosting_standort: "Lokale Installation, Cloud-Paket über Partner",
      support_sprache_de: true,
      support_zeiten: "Telefon 069-50007-2020",
    }),
    vendor_website: "https://www.sage.com/de-de/produkte/sage-50-handwerk/",
    support_types: ["Telefon 069-50007-2020", "Fachhändler", "Webinare", "Support-Team"],
    languages: ["Deutsch"],
    meta_title: "Sage 50 Handwerk im Test: Preise ab 19,90 EUR und Funktionen",
    meta_description:
      "Sage 50 Handwerk geprüft am 23.09.2026: Essential 19,90 EUR, Enterprise 59,00 EUR pro Monat, E-Rechnung in ZUGFeRD 2.1 und XRechnung, Aufmaß und Projektverwaltung.",
    faq: [
      {
        question: "Was kostet Sage 50 Handwerk?",
        answer:
          "Essential kostet 19,90 EUR pro Monat für einen Benutzer, Enterprise 59,00 EUR pro Monat für unbegrenzt viele Benutzer, jeweils zzgl. MwSt. Die Preise gelten bei jährlicher Rechnungsstellung mit zwölf Monaten Mindestvertragslaufzeit.",
      },
      {
        question: "Ist die GAEB-Schnittstelle im Preis enthalten?",
        answer:
          "Nein. GAEB und IDS sind laut Produktseite optional erweiterbar, ebenso Dokumenten-Management, Finanzbuchhaltung und Nachkalkulation. Lassen Sie sich diese Module im Angebot gesondert ausweisen.",
      },
      {
        question: "Gibt es eine kostenlose Testversion?",
        answer:
          "Sage verweist auf eine kostenlose Demo- beziehungsweise Testversion, nennt auf der Produktseite aber keine Dauer. Wir haben deshalb keine Testphase mit fester Laufzeit eingetragen. Fragen Sie beim Anbieter nach, bevor Sie einen Zeitplan aufsetzen.",
      },
      {
        question: "Arbeitet Sage 50 Handwerk GoBD-konform?",
        answer:
          "Sage weist GoBD und Abgabenordnung als abgedeckt aus. Die Verfahrensdokumentation Ihres Betriebs bleibt davon unberührt und ist weiterhin Ihre Aufgabe.",
      },
    ],
    alternatives: ["sage-50", "collmex", "weclapp", "sage-100"],
    featured: false,
  },

  /* ================================================= Sage Operations ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-operations",
    name: "Sage Operations",
    slug: "sage-operations",
    tagline: "Cloud-ERP für Handel und diskrete Fertigung",
    description_short:
      "Cloud-ERP mit Beschaffung, Warenwirtschaft und Fertigung für kleine und mittlere Unternehmen. Preis auf Anfrage, kostenlose Live-Demo statt Testphase.",
    description_full: [
      "Sage Operations ist die Cloud-ERP-Reihe für Betriebe in Handel und diskreter Fertigung, denen eine Buchhaltungssoftware nicht mehr reicht. Die Lösung führt Beschaffung, Lager, Verkauf und Produktion auf einer Datenbasis zusammen.",
      "Sage bietet zwei Zuschnitte an. Distribution deckt Einkauf, Lager und Verkauf mit Echtzeit-Bestandsübersicht, rollenbasierten Dashboards und automatisierten Abläufen ab. Distribution plus Manufacturing ergänzt mehrstufige Stücklisten, Arbeitspläne, Fertigungsaufträge, Ist-Kosten-Nachverfolgung und mobile Fertigungsrückmeldungen.",
      "Einen Listenpreis veröffentlicht Sage für Sage Operations nicht. Der Preis wird individuell zugeschnitten, sodass nach Angabe des Anbieters nur bezahlt wird, was tatsächlich genutzt wird. Für einen belastbaren Vergleich brauchen Sie ein Angebot, das Lizenz, Einführung, Datenübernahme und laufende Betreuung getrennt ausweist.",
      "Anders als bei Sage Active oder Sage 50 gibt es hier keine Testphase zum Selbstausprobieren. Sage bietet stattdessen eine Produkttour, ein Infopaket mit Fact Sheet und ERP-Auswahlcheckliste sowie eine kostenlose persönliche Live-Demo an.",
      "Nutzen Sie die Demo für eigene Vorgänge: eine Bestellung mit Wareneingang, einen Auftrag mit Verfügbarkeitsprüfung und eine Fertigung mit Materialbedarf. Eine allgemeine Funktionsliste beantwortet nicht, ob Ihre Stammdaten, Chargen und Freigaben sauber abgebildet werden.",
    ],
    verdict:
      "Für Handels- und Fertigungsbetriebe mit mehrstufigen Abläufen, die getrennte Systeme zusammenführen wollen. Die Workflow-Automatisierung und die DATEV-Schnittstelle sind die Argumente. Ohne Demo mit eigenen Vorgängen sollten Sie nicht unterschreiben.",
    logo_url: "/logos/sage-operations.png",
    category_id: "cat-erp",

    starting_price: null,
    billing_period: "user",
    free_trial: false,
    free_version: false,
    demo: {
      kind: "live-demo",
      label: "Kostenlose Live-Demo anfordern",
      url: "https://www.sage.com/de-de/sage-business-cloud/sage-operations/",
    },
    pricing_plans: [
      {
        name: "Distribution",
        price: null,
        billing_period: "user",
        description:
          "Cloudnative Warenwirtschaft mit Echtzeit-Transparenz in Einkauf, Lager und Verkauf.",
        includes: [
          "Procure to Pay automatisiert",
          "Quote to Cash durchgängig",
          "Echtzeit-Bestandsübersicht",
          "Rollenbasierte Dashboards",
          "Automatisierte Workflows",
        ],
      },
      {
        name: "Distribution und Manufacturing",
        price: null,
        billing_period: "user",
        description: "Integriertes ERP für Handel und diskrete Fertigung.",
        includes: [
          "Alle Funktionen aus Distribution",
          "Mehrstufige Stücklisten",
          "Arbeitspläne und Ressourcen",
          "Fertigungsaufträge planen",
          "Ist-Kosten nachverfolgen",
          "Mobile Fertigungsrückmeldungen",
        ],
        highlighted: true,
      },
    ],

    features: [
      {
        group: "Beschaffung und Lager",
        items: [
          { name: "Automatische Bestellvorschläge", available: true },
          { name: "Echtzeitdaten zu Bestand und Bedarf", available: true },
          { name: "Lieferantenvorgänge zentral", available: true },
          { name: "Retouren und Gutschriften", available: true },
        ],
      },
      {
        group: "Fertigung",
        items: [
          { name: "Mehrstufige Stücklisten", available: true },
          { name: "Arbeitspläne und Ressourcen", available: true },
          { name: "Shop Floor Control", available: true },
          { name: "Mobile Fertigungsrückmeldung", available: true },
        ],
      },
      {
        group: "Plattform",
        items: [
          { name: "Workflow-Automatisierung", available: true },
          { name: "Automatisierung von Eingangsrechnungen", available: true },
          { name: "DATEV-Schnittstelle", available: true },
          { name: "Offene API", available: true },
          { name: "Sage Copilot", available: true },
          { name: "Selbst startbare Testphase", available: false, note: "Sage bietet eine Live-Demo an" },
        ],
      },
    ],
    top_features: [
      "Beschaffung, Lager, Verkauf und Fertigung auf einer Datenbasis",
      "Workflow-Automatisierung und Eingangsrechnungen",
      "DATEV-Schnittstelle",
      "Kostenlose persönliche Live-Demo",
    ],
    integrations: ["DATEV", "Webshops", "Versandlösungen", "Mobile Datenerfassung", "Offene API"],
    de_compliance: compliance({
      datev_schnittstelle: true,
      datev_export: true,
      e_rechnung_empfang: true,
      gobd_konform: null,
      elster_schnittstelle: null,
      ust_voranmeldung: null,
      bilanz: null,
      dsgvo_avv: true,
      hosting_standort: "Cloud, Standort auf der Produktseite nicht beziffert",
      support_sprache_de: true,
      support_zeiten: "Telefon 069 50007-6290",
    }),
    vendor_website: "https://www.sage.com/de-de/sage-business-cloud/sage-operations/",
    support_types: ["Telefon 069 50007-6290", "Live-Demo", "Webinare", "Implementierungspartner"],
    languages: ["Deutsch", "Englisch"],
    meta_title: "Sage Operations im Test: Funktionen, Demo und Kosten",
    meta_description:
      "Sage Operations geprüft am 23.09.2026: Cloud-ERP für Handel und Fertigung, zwei Zuschnitte, Preis auf Anfrage und kostenlose Live-Demo statt Testphase.",
    faq: [
      {
        question: "Was kostet Sage Operations?",
        answer:
          "Sage veröffentlicht keinen Listenpreis. Der Umfang wird individuell zugeschnitten. Fordern Sie ein Angebot an, das Lizenz, Einführung, Datenübernahme und laufende Betreuung getrennt ausweist.",
      },
      {
        question: "Kann ich Sage Operations 30 Tage kostenlos testen?",
        answer:
          "Nein. Eine selbst startbare Testphase bietet Sage für Sage Operations nicht an. Es gibt eine Produkttour, ein Infopaket und eine kostenlose persönliche Live-Demo. Eine Testphase mit 30 Tagen finden Sie dagegen bei Sage Active, Sage 50 Connected und Sage Lohnabrechnung.",
      },
      {
        question: "Worauf sollte ich in der Demo achten?",
        answer:
          "Auf eigene Vorgänge: eine Bestellung mit Wareneingang, einen Auftrag mit Verfügbarkeitsprüfung und eine Fertigung mit Materialbedarf. Fragen Sie außerdem nach Freigaben, Buchhaltungsübergabe und dem Aufwand für die Datenübernahme.",
      },
    ],
    alternatives: ["sage-100", "weclapp", "dynamics-365-business-central", "xentral"],
    featured: false,
  },

  /* ====================================================== Sage 100 ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-100",
    name: "Sage 100",
    slug: "sage-100",
    tagline: "Modulares ERP für den Mittelstand, lokal oder in der Cloud",
    description_short:
      "ERP mit Warenwirtschaft ab 56,00 EUR, Rechnungswesen ab 58,00 EUR und Produktion ab 90,00 EUR pro Nutzer und Monat, mit unbegrenzter Mandantenzahl.",
    description_full: [
      "Sage 100 ist das modulare ERP-System von Sage für mittelständische Unternehmen. Statt eines Gesamtpakets kaufen Sie die Module, die Sie brauchen, und ergänzen sie über die Zeit.",
      "Drei Kernmodule bilden das Gerüst. Warenwirtschaft ab 56,00 EUR pro Nutzer und Monat deckt Kunden- und Lieferantenverwaltung, Artikel und Preislisten, Auftragsverwaltung, Bestellwesen, Lagerverwaltung sowie Seriennummern und Chargen ab. Rechnungswesen ab 58,00 EUR ergänzt Finanz- und Anlagenbuchhaltung, Kassenbuch, Zahlungsverkehr, Bilanzierung, Kostenrechnung, DATEV-Export und -Import, Mahnwesen und die Umsatzsteuer-Voranmeldung über ELSTER. Produktion ab 90,00 EUR enthält das Warenwirtschaftspaket und ergänzt Fertigungssteuerung, CAD-Schnittstelle, Vor- und Nachkalkulation, Betriebsdatenerfassung und grafische Ressourcenplanung.",
      "Bemerkenswert an der Preisliste: Alle drei Module enthalten eine unbegrenzte Mandantenanzahl. Für Unternehmen mit mehreren Gesellschaften verändert das die Rechnung gegenüber Systemen, die pro Mandant abrechnen.",
      "Die Preise gelten bei jährlicher Rechnungsstellung mit zwölf Monaten Mindestvertragslaufzeit, zzgl. MwSt. Kürzere oder längere Laufzeiten sind laut Anbieter optional verfügbar.",
      "Erweiterbar ist das System über mehr als 200 Anwendungen im Sage AppCenter sowie über branchenspezifische Lösungen zertifizierter Partner. Der Betrieb ist lokal oder in der Cloud möglich. Eine selbst startbare Testphase gibt es nicht; Sage bietet eine interaktive Produkttour und ein Infopaket mit Praxisleitfaden zur ERP-Auswahl an.",
    ],
    verdict:
      "Für mittelständische Betriebe, die ihr ERP modular aufbauen und mehrere Mandanten führen. Die unbegrenzte Mandantenzahl und die Wahl zwischen lokal und Cloud sind die Argumente. Für die Einführung brauchen Sie einen Partner und ein Projektbudget.",
    logo_url: "/logos/sage-100.png",
    category_id: "cat-erp",

    starting_price: 56,
    billing_period: "user",
    free_trial: false,
    free_version: false,
    demo: {
      kind: "produkttour",
      label: "Interaktive Produkttour starten",
      url: "https://www.sage.com/de-de/produkte/sage-100/",
    },
    pricing_plans: [
      {
        name: "Modul Warenwirtschaft",
        price: 56,
        billing_period: "user",
        included_seats: "Unbegrenzte Mandantenanzahl",
        description: "Einkauf, Verkauf, Lager und Artikelstamm.",
        includes: [
          "Kunden- und Lieferantenverwaltung",
          "Artikel, Waren und Preislisten",
          "Auftragsverwaltung im Verkauf",
          "Bestellwesen und Kommissionierung",
          "Lagerverwaltung und Inventur",
          "Seriennummern und Chargen",
        ],
      },
      {
        name: "Modul Rechnungswesen",
        price: 58,
        billing_period: "user",
        included_seats: "Unbegrenzte Mandantenanzahl",
        description: "Finanzbuchhaltung, Bilanzierung und Kostenrechnung.",
        includes: [
          "Finanz- und Anlagenbuchhaltung",
          "Kassenbuch und digitale Belegverarbeitung",
          "Zahlungsverkehr und Bankanbindung",
          "Bilanzierung und Kostenrechnung",
          "DATEV-Export und -Import",
          "Umsatzsteuer-Voranmeldung über ELSTER",
        ],
        highlighted: true,
      },
      {
        name: "Modul Produktion",
        price: 90,
        billing_period: "user",
        included_seats: "Inklusive Warenwirtschaftspaket",
        description: "Für Einzel-, Projekt- und Serienfertiger.",
        includes: [
          "Fertigungssteuerung und Ressourcenliste",
          "CAD-Schnittstelle und Simulation",
          "Vor- und Nachkalkulation",
          "Betriebsdatenerfassung",
          "Grafische Ressourcenplanung",
          "Projektfertigung",
        ],
      },
    ],

    features: [
      {
        group: "Rechnungswesen",
        items: [
          { name: "Finanzbuchhaltung", available: true },
          { name: "Anlagenbuchhaltung", available: true },
          { name: "Bilanzierung", available: true },
          { name: "Kostenrechnung", available: true },
          { name: "Umsatzsteuer-Voranmeldung über ELSTER", available: true },
          { name: "DATEV-Export und -Import", available: true },
        ],
      },
      {
        group: "Warenwirtschaft und Produktion",
        items: [
          { name: "Lagerverwaltung und Inventur", available: true },
          { name: "Seriennummern und Chargen", available: true },
          { name: "Fertigungssteuerung", available: true, note: "Modul Produktion" },
          { name: "Grafische Ressourcenplanung", available: true, note: "Modul Produktion" },
        ],
      },
      {
        group: "Plattform",
        items: [
          { name: "Unbegrenzte Mandantenanzahl", available: true },
          { name: "Lokal oder in der Cloud", available: true },
          { name: "KI-Assistent", available: true },
          { name: "E-Rechnung", available: true },
          { name: "Selbst startbare Testphase", available: false, note: "Produkttour und Infopaket" },
        ],
      },
    ],
    top_features: [
      "Unbegrenzte Mandantenanzahl in allen Kernmodulen",
      "DATEV-Export und -Import",
      "Umsatzsteuer-Voranmeldung über ELSTER",
      "Über 200 Erweiterungen im AppCenter",
    ],
    integrations: ["DATEV", "AppCenter mit über 200 Anwendungen", "xRM", "DMS", "Sage Webshop"],
    de_compliance: compliance({
      gobd_konform: true,
      elster_schnittstelle: true,
      datev_export: true,
      datev_schnittstelle: true,
      e_rechnung_empfang: true,
      e_rechnung_versand: true,
      xrechnung: null,
      zugferd_version: null,
      ust_voranmeldung: true,
      bilanz: true,
      euer: null,
      lohnsteuer_anmeldung: null,
      dsgvo_avv: true,
      hosting_standort: "Lokal oder Cloud, nach Wahl des Betriebs",
      support_sprache_de: true,
      support_zeiten: "Telefon 069 50007-6300",
    }),
    vendor_website: "https://www.sage.com/de-de/produkte/sage-100/",
    support_types: ["Telefon 069 50007-6300", "Fachhändler", "Kundenportal", "Webinar-Mediathek"],
    languages: ["Deutsch"],
    meta_title: "Sage 100 im Test: Modulpreise, Mandanten und Funktionen",
    meta_description:
      "Sage 100 geprüft am 23.09.2026: Warenwirtschaft ab 56,00 EUR, Rechnungswesen ab 58,00 EUR, Produktion ab 90,00 EUR pro Nutzer und Monat, unbegrenzte Mandantenanzahl.",
    faq: [
      {
        question: "Was kostet Sage 100?",
        answer:
          "Die Kernmodule kosten pro Nutzer und Monat: Warenwirtschaft ab 56,00 EUR, Rechnungswesen ab 58,00 EUR, Produktion ab 90,00 EUR, jeweils zzgl. MwSt. bei jährlicher Rechnungsstellung und zwölf Monaten Mindestlaufzeit.",
      },
      {
        question: "Wie viele Mandanten sind enthalten?",
        answer:
          "Alle drei Kernmodule enthalten laut Preisliste eine unbegrenzte Mandantenanzahl. Bei mehreren Gesellschaften ist das ein erheblicher Unterschied zu Systemen, die pro Mandant abrechnen.",
      },
      {
        question: "Läuft Sage 100 in der Cloud oder lokal?",
        answer:
          "Beides ist möglich. Sage bietet die Implementierung lokal und in der Cloud an; die Entscheidung treffen Sie nach Ihren Anforderungen an Betrieb und Datenhaltung.",
      },
    ],
    alternatives: ["sage-operations", "sage-x3", "dynamics-365-business-central", "weclapp"],
    featured: false,
  },

  /* ======================================================= Sage X3 ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-x3",
    name: "Sage X3",
    slug: "sage-x3",
    tagline: "Cloud-ERP für international tätige Fertigung und Distribution",
    description_short:
      "ERP für wachsende produktorientierte Unternehmen mit Echtzeit-Konsolidierung über mehrere Gesellschaften und Betrieb in über 80 Ländern. Preis auf Anfrage.",
    description_full: [
      "Sage X3 ist das größte ERP-System der Sage-Reihe und richtet sich an produktorientierte Unternehmen, die aus einfacheren Systemen herausgewachsen sind. Finanzen, Lieferkette und Produktion laufen auf einer Plattform zusammen.",
      "Das Unterscheidungsmerkmal gegenüber Sage 100 und Sage Operations ist die internationale Ausrichtung. Sage nennt Konsolidierung mehrerer Unternehmenseinheiten, globales Steuermanagement und Währungsabwicklung in Echtzeit für den Betrieb in über 80 Ländern.",
      "Branchenseitig zielt das System auf Distribution, diskrete Fertigung, Verfahrensproduktion, Chemie sowie Lebensmittel und Getränke. Für Betriebe mit Chargenverfolgung und regulatorischen Anforderungen in der Produktion ist das der relevante Zuschnitt.",
      "Sage Copilot ist in die Arbeitsabläufe eingebettet und liefert nach Herstellerangabe Warnmeldungen, Auffälligkeiten und Hinweise in Echtzeit.",
      "Einen Preis veröffentlicht Sage nicht, und eine selbst startbare Testphase gibt es nicht. Angeboten werden eine interaktive Produkttour ohne Zeitdruck, ein Infopaket mit Produktbroschüre und Implementierungsleitfaden sowie ein Rückruf für einen Live-Demo-Termin.",
    ],
    verdict:
      "Für produzierende Unternehmen mit Gesellschaften im Ausland, die konsolidiert berichten müssen. Die internationale Abdeckung ist das Argument. Für einen rein deutschen Mittelständler ist Sage 100 oder Sage Operations der passendere Zuschnitt.",
    logo_url: "/logos/sage-x3.png",
    category_id: "cat-erp",

    starting_price: null,
    billing_period: "user",
    free_trial: false,
    free_version: false,
    demo: {
      kind: "produkttour",
      label: "Interaktive Produkttour starten",
      url: "https://www.sage.com/de-de/sage-business-cloud/sage-x3/",
    },
    pricing_plans: [],

    features: [
      {
        group: "International",
        items: [
          { name: "Konsolidierung mehrerer Unternehmenseinheiten", available: true },
          { name: "Globales Steuermanagement", available: true },
          { name: "Währungsabwicklung in Echtzeit", available: true },
          { name: "Betrieb in über 80 Ländern", available: true },
        ],
      },
      {
        group: "Betrieb",
        items: [
          { name: "Finanzen, Lieferkette und Produktion auf einer Plattform", available: true },
          { name: "Bestandsführung", available: true },
          { name: "Produktionssteuerung", available: true },
          { name: "Sage Copilot", available: true },
          { name: "Selbst startbare Testphase", available: false, note: "Produkttour und Live-Demo" },
        ],
      },
    ],
    top_features: [
      "Echtzeit-Konsolidierung über mehrere Gesellschaften",
      "Globales Steuermanagement",
      "Verfahrens- und diskrete Fertigung",
      "Interaktive Produkttour ohne Zeitdruck",
    ],
    integrations: ["Sage Copilot", "Sage Ai", "branchenspezifische Partnerlösungen"],
    de_compliance: compliance({
      gobd_konform: null,
      elster_schnittstelle: null,
      datev_export: null,
      datev_schnittstelle: null,
      e_rechnung_empfang: null,
      e_rechnung_versand: null,
      bilanz: null,
      dsgvo_avv: true,
      hosting_standort: "Cloud, Standort auf der Produktseite nicht beziffert",
      support_sprache_de: true,
      support_zeiten: "Telefon 069 50007-5100",
    }),
    vendor_website: "https://www.sage.com/de-de/sage-business-cloud/sage-x3/",
    support_types: ["Telefon 069 50007-5100", "Live-Demo", "Implementierungspartner"],
    languages: ["Deutsch", "Englisch", "weitere"],
    meta_title: "Sage X3 im Test: internationale Konsolidierung und Funktionen",
    meta_description:
      "Sage X3 geprüft am 23.09.2026: Cloud-ERP für Fertigung und Distribution, Konsolidierung über mehrere Gesellschaften, Betrieb in über 80 Ländern, Preis auf Anfrage.",
    faq: [
      {
        question: "Was kostet Sage X3?",
        answer:
          "Sage veröffentlicht keinen Listenpreis. Der Preis ergibt sich aus Modulen, Nutzerzahl und Zahl der Gesellschaften. Fordern Sie ein Angebot an, das die Einführung gesondert ausweist.",
      },
      {
        question: "Worin unterscheidet sich Sage X3 von Sage 100?",
        answer:
          "In der internationalen Ausrichtung. Sage X3 bringt Konsolidierung mehrerer Unternehmenseinheiten, globales Steuermanagement und Währungsabwicklung in Echtzeit mit. Für einen rein deutschen Betrieb ist Sage 100 meist passender.",
      },
      {
        question: "Wie können wir Sage X3 vorab ansehen?",
        answer:
          "Über eine interaktive Produkttour ohne Zeitdruck, ein Infopaket mit Produktbroschüre und Implementierungsleitfaden sowie einen Rückruf für einen Live-Demo-Termin. Eine selbst startbare Testphase gibt es nicht.",
      },
    ],
    alternatives: ["sage-100", "sage-operations", "netsuite", "sap-business-one"],
    featured: false,
  },

  /* ================================================= Sage Intacct ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-intacct",
    name: "Sage Intacct",
    slug: "sage-intacct",
    tagline: "Cloud-Finanzplattform für serviceorientierte Unternehmen",
    description_short:
      "Cloudbasierte Finanzmanagement-Plattform ab 1.390,00 EUR pro Monat, mit Multi-Entity-Konsolidierung, Abschluss-Assistent und Sage AI Copilot.",
    description_full: [
      "Sage Intacct ist die Finanzmanagement-Plattform am oberen Ende der Sage-Reihe. Sie richtet sich an serviceorientierte Unternehmen mit mehreren Einheiten, die ihren Monatsabschluss beschleunigen und konsolidiert berichten wollen. Sage nennt über 30.000 Finanzteams weltweit.",
      "Im Kernpaket enthalten sind Hauptbuch, Debitorenbuchhaltung einschließlich Rechnungsstellung, Kreditorenbuchhaltung, Reports und Dashboard-Visualisierung, Auftragsverwaltung und Cash-Management, Einkauf, eine Plattform für die Zusammenarbeit interner und externer Nutzer sowie der Sage AI Copilot.",
      "Die eigentliche Stärke liegt in den Multi-Entity-Insights: Standorte und Bereiche lassen sich in Echtzeit nebeneinander auswerten, und die Konsolidierung zahlreicher Einheiten läuft nach Herstellerangabe in Sekunden statt Tagen.",
      "Der Einstiegspreis liegt bei 1.390,00 EUR pro Monat, zzgl. MwSt. Die tatsächlichen Kosten hängen laut Sage von der Anzahl benötigter Nutzerlizenzen und den zusätzlich gebuchten Modulen ab. Zubuchbar sind unter anderem Vertragsmanagement, Lagerverwaltung, Zeit- und Kostenmanagement, Anlagenverwaltung, Projektmanagement, Ausgabenmanagement sowie Multi-Entity und globale Konsolidierung.",
      "Eine selbst startbare Testphase gibt es nicht. Sage bietet eine Produkttour, ein kostenfreies Infopaket mit Buyer's Guide und Produktdatenblatt sowie eine Live-Demo mit persönlichem Beratungstermin an.",
    ],
    verdict:
      "Für Unternehmen mit mehreren Einheiten, deren Monatsabschluss zu lange dauert und die konsolidiert berichten müssen. Der Einstiegspreis setzt eine Größenordnung, unterhalb derer sich die Plattform nicht rechnet. Verlangen Sie ein Angebot mit Lizenzen und Modulen im Einzelnen.",
    logo_url: "/logos/sage-intacct.png",
    category_id: "cat-buchhaltung",

    starting_price: 1390,
    billing_period: "month",
    free_trial: false,
    free_version: false,
    demo: {
      kind: "live-demo",
      label: "Live-Demo anfordern",
      url: "https://www.sage.com/de-de/sage-business-cloud/intacct/",
    },
    pricing_plans: [
      {
        name: "Kernfunktionen",
        price: 1390,
        billing_period: "month",
        included_seats: "Kosten abhängig von Nutzerlizenzen und Modulen",
        description: "Die cloudbasierte Finanzlösung im Grundumfang.",
        includes: [
          "Hauptbuch",
          "Debitorenbuchhaltung inklusive Rechnungsstellung",
          "Kreditorenbuchhaltung",
          "Reports und Dashboard-Visualisierung",
          "Auftragsverwaltung und Cash-Management",
          "Einkauf",
          "Plattform für interne und externe Nutzer",
          "Sage AI Copilot",
        ],
        highlighted: true,
      },
      {
        name: "Zusatzmodule",
        price: null,
        billing_period: "month",
        description: "Erweiterungen zur individuellen Finanzplattform.",
        includes: [
          "Vertragsmanagement",
          "Lagerverwaltung",
          "Lieferantenzahlungsservice",
          "Zeit- und Kostenmanagement",
          "Anlagenverwaltung",
          "Projektmanagement",
          "Ausgabenmanagement",
          "Multi-Entity und globale Konsolidierung",
        ],
      },
    ],

    features: [
      {
        group: "Finanzen",
        items: [
          { name: "Hauptbuch", available: true },
          { name: "Debitoren- und Kreditorenbuchhaltung", available: true },
          { name: "Cash-Management", available: true },
          { name: "Einkauf", available: true },
          { name: "Anlagenverwaltung", available: true, note: "Zusatzmodul" },
        ],
      },
      {
        group: "Konsolidierung und Auswertung",
        items: [
          { name: "Multi-Entity-Insights", available: true },
          { name: "Globale Konsolidierung", available: true, note: "Zusatzmodul" },
          { name: "Abschluss-Assistent", available: true },
          { name: "Dashboards und Berichte", available: true },
          { name: "Dynamische Buchungsaufteilung", available: true },
        ],
      },
      {
        group: "Deutsche Anforderungen",
        items: [
          { name: "ELSTER-Übermittlung", available: null, note: "Auf der Produktseite nicht ausgewiesen" },
          { name: "DATEV-Export", available: null, note: "Auf der Produktseite nicht ausgewiesen" },
          { name: "Selbst startbare Testphase", available: false, note: "Produkttour und Live-Demo" },
        ],
      },
    ],
    top_features: [
      "Multi-Entity-Konsolidierung in Echtzeit",
      "Abschluss-Assistent für den Monatsabschluss",
      "Sage AI Copilot im Kernpaket",
      "Kostenfreies Infopaket mit Buyer's Guide",
    ],
    integrations: ["Sage AI Copilot", "zahlreiche Drittsysteme über Schnittstellen"],
    de_compliance: compliance({
      gobd_konform: null,
      elster_schnittstelle: null,
      datev_export: null,
      datev_schnittstelle: null,
      e_rechnung_empfang: null,
      e_rechnung_versand: null,
      bilanz: null,
      dsgvo_avv: true,
      hosting_standort: "Cloud, Standort auf der deutschen Produktseite nicht beziffert",
      support_sprache_de: true,
      support_zeiten: "Telefon 069 50007 6297",
    }),
    vendor_website: "https://www.sage.com/de-de/sage-business-cloud/intacct/",
    support_types: ["Telefon 069 50007 6297", "Live-Demo", "Schulungen", "Consulting"],
    languages: ["Deutsch", "Englisch"],
    meta_title: "Sage Intacct im Test: Preis ab 1.390 EUR und Funktionen",
    meta_description:
      "Sage Intacct geprüft am 23.09.2026: Kernfunktionen ab 1.390,00 EUR pro Monat, Multi-Entity-Konsolidierung, Abschluss-Assistent und Sage AI Copilot.",
    faq: [
      {
        question: "Was kostet Sage Intacct?",
        answer:
          "Die Kernfunktionen beginnen bei 1.390,00 EUR pro Monat, zzgl. MwSt. Die tatsächlichen Kosten hängen laut Sage von der Anzahl der Nutzerlizenzen und den gebuchten Zusatzmodulen ab.",
      },
      {
        question: "Gibt es eine kostenlose Testphase?",
        answer:
          "Nein. Sage bietet für Intacct eine Produkttour, ein kostenfreies Infopaket und eine Live-Demo an. Eine Testphase zum Selbstausprobieren gehört nicht dazu.",
      },
      {
        question: "Worin unterscheidet sich Sage Intacct von Sage Active?",
        answer:
          "In Größenordnung und Zweck. Sage Active ist die Cloud-Lösung für kleine Unternehmen ab 12,50 EUR im Monat. Sage Intacct ist eine Finanzplattform für Unternehmen mit mehreren Einheiten und beginnt bei 1.390,00 EUR im Monat.",
      },
    ],
    alternatives: ["sage-100", "netsuite", "dynamics-365-business-central", "sage-active"],
    featured: false,
  },

  /* ========================================== Sage Lohnabrechnung ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-lohnabrechnung",
    name: "Sage Lohnabrechnung",
    slug: "sage-lohnabrechnung",
    tagline: "Cloud-Lohnabrechnung mit HR-Funktionen, entwickelt in Leipzig",
    description_short:
      "Lohn- und Gehaltsabrechnung ab 20,00 EUR pro Monat inklusive fünf Mitarbeitenden, mit gesetzlichen Meldungen, DATEV-Export und 30 Tage kostenloser Testphase.",
    description_full: [
      "Sage Lohnabrechnung, vom Hersteller auch als Sage Payroll geführt, ist die Cloud-Lösung für die Entgeltabrechnung kleiner und mittlerer Betriebe. Entwickelt wird sie nach Angabe von Sage seit 2009 in Leipzig.",
      "Die Abrechnung läuft in drei Schritten, einschließlich Versand der gesetzlichen Meldungen. Historische Abrechnungen bleiben einsehbar, und Beschäftigte greifen online auf ihre eigenen Abrechnungen zu. Abgerechnet werden können bis zu 150 Mitarbeitende.",
      "Die Preisstruktur verlangt genaues Rechnen. Alle drei Tarife nennen einen Monatspreis inklusive fünf Mitarbeitenden: Essentials 20,00 EUR, Standard 30,00 EUR, Premium 40,00 EUR, jeweils zzgl. MwSt. Jede weitere Person kostet zusätzlich 3,00 EUR in Essentials, 5,00 EUR in Standard und 7,00 EUR in Premium pro Monat. Ein Betrieb mit zwanzig Beschäftigten zahlt im Tarif Standard also 30,00 EUR plus fünfzehn mal 5,00 EUR, zusammen 105,00 EUR pro Monat, zzgl. 19 % MwSt.",
      "Die Tarife unterscheiden sich nicht in der Abrechnung, sondern in den HR-Funktionen. Essentials bringt mobile App, bis zu drei Abwesenheitsarten, Mitarbeiterdokumente sowie Benutzer- und Rechteverwaltung. Standard ergänzt Onboarding-Portal, Arbeitszeiten und Überstunden, Genehmigungs-Workflows, Arbeitszeittabellenberichte, Organigramm sowie Urlaub und Abwesenheiten. Premium fügt Schichtplanung, Einsatzpläne und Mitarbeiterausgaben über die App hinzu. Recruiting und Performance sind in Standard und Premium optional zubuchbar.",
      "Sage bietet 30 Tage kostenlose Testphase und eine kostenlose Webdemo an. Es gibt keine langfristigen Verträge; Upgrade und Kündigung sind laut Anbieter jederzeit möglich.",
    ],
    verdict:
      "Für Betriebe bis 150 Beschäftigte, die Lohn und Personal in einer Cloud führen wollen, ohne Vertragsbindung. Der Buchhaltungsexport nach Sage und DATEV hält die Kanzlei angebunden. Rechnen Sie den Preis mit Ihrer tatsächlichen Mitarbeiterzahl, nicht mit dem Grundpreis.",
    logo_url: "/logos/sage-lohnabrechnung.png",
    category_id: "cat-lohn",

    starting_price: 20,
    billing_period: "month",
    free_trial: true,
    free_version: false,
    trial_days: 30,
    demo: {
      kind: "webdemo",
      label: "Kostenlose Webdemo vereinbaren",
      url: "https://www.sage.com/de-de/sage-business-cloud/lohnabrechnung/",
    },
    pricing_plans: [
      {
        name: "Payroll Essentials",
        price: 20,
        billing_period: "month",
        included_seats: "Inklusive 5 Mitarbeitende, jede weitere Person 3,00 EUR",
        description: "Lohnabrechnung und elementare HR-Funktionen.",
        includes: [
          "Automatisierbare Lohnabrechnung inklusive gesetzlicher Meldungen",
          "Zugriff auf Gehaltsabrechnungen und Steuerdokumente",
          "Buchhaltungsexport nach Sage und DATEV",
          "Mobile App",
          "Bis zu drei Abwesenheitsarten",
          "Benutzer- und Rechteverwaltung",
        ],
      },
      {
        name: "Payroll Standard",
        price: 30,
        billing_period: "month",
        included_seats: "Inklusive 5 Mitarbeitende, jede weitere Person 5,00 EUR",
        description: "Empfohlen ab zehn Mitarbeitenden, mit erweiterten HR-Funktionen.",
        includes: [
          "Alles aus Essentials",
          "Personalisiertes Onboarding-Portal",
          "Arbeitszeiten und Überstunden",
          "Genehmigungs-Workflows",
          "Arbeitszeittabellenberichte",
          "Unternehmens-Organigramm",
          "Urlaub und Abwesenheiten",
        ],
        highlighted: true,
      },
      {
        name: "Payroll Premium",
        price: 40,
        billing_period: "month",
        included_seats: "Inklusive 5 Mitarbeitende, jede weitere Person 7,00 EUR",
        description: "Mit Schichtplanung und Ausgabenverwaltung über die App.",
        includes: [
          "Alles aus Standard",
          "Schichtplanung und Einsatzpläne",
          "Mitarbeiterausgaben einreichen und genehmigen",
          "Recruiting und Performance optional zubuchbar",
        ],
      },
    ],

    features: [
      {
        group: "Abrechnung",
        items: [
          { name: "Lohnabrechnung in drei Schritten", available: true },
          { name: "Gesetzliche Meldungen", available: true },
          { name: "Bis zu 150 Mitarbeitende", available: true },
          { name: "Historische Abrechnungen einsehbar", available: true },
          { name: "Buchhaltungsexport nach Sage und DATEV", available: true },
          { name: "Multi-Business-fähig", available: true },
        ],
      },
      {
        group: "HR",
        items: [
          { name: "Mobile App", available: true },
          { name: "Mitarbeiterdokumente", available: true },
          { name: "Urlaub und Abwesenheiten", available: true, note: "Ab Standard" },
          { name: "Genehmigungs-Workflows", available: true, note: "Ab Standard" },
          { name: "Schichtplanung", available: true, note: "Ab Premium" },
          { name: "Recruiting und Performance", available: true, note: "Optional zubuchbar" },
        ],
      },
    ],
    top_features: [
      "Gesetzliche Meldungen aus der Abrechnung heraus",
      "Buchhaltungsexport nach Sage und DATEV",
      "Keine langfristigen Verträge, Kündigung jederzeit",
      "30 Tage kostenlos testen",
    ],
    integrations: ["DATEV", "Sage Buchhaltung", "Sage HR"],
    de_compliance: compliance({
      lohnsteuer_anmeldung: true,
      sv_meldung: true,
      deuev: true,
      eau: null,
      elster_schnittstelle: true,
      datev_export: true,
      dsgvo_avv: true,
      hosting_standort: "Deutschland, Entwicklung in Leipzig",
      support_sprache_de: true,
      support_zeiten: "Telefon 0341 48440-3550, Online-Support",
    }),
    vendor_website: "https://www.sage.com/de-de/sage-business-cloud/lohnabrechnung/",
    support_types: ["Telefon 0341 48440-3550", "Online-Support", "Webdemo"],
    languages: ["Deutsch"],
    meta_title: "Sage Lohnabrechnung im Test: Preise ab 20 EUR und 30 Tage Testphase",
    meta_description:
      "Sage Lohnabrechnung geprüft am 23.09.2026: Essentials 20,00 EUR, Standard 30,00 EUR, Premium 40,00 EUR pro Monat inklusive fünf Mitarbeitenden, DATEV-Export und 30 Tage kostenlos testen.",
    faq: [
      {
        question: "Was kostet Sage Lohnabrechnung für zwanzig Mitarbeitende?",
        answer:
          "Im Tarif Standard 30,00 EUR Grundpreis für fünf Personen plus fünfzehn weitere Personen zu je 5,00 EUR, zusammen 105,00 EUR pro Monat, zzgl. 19 % MwSt. Rechnen Sie immer mit Ihrer tatsächlichen Kopfzahl.",
      },
      {
        question: "Wie lange läuft die Testphase?",
        answer:
          "30 Tage. Danach kosten die Tarife 20,00 EUR, 30,00 EUR beziehungsweise 40,00 EUR pro Monat inklusive fünf Mitarbeitenden, zzgl. MwSt. Es gelten die Nutzungsbedingungen von Sage Payroll.",
      },
      {
        question: "Wie viele Mitarbeitende kann ich abrechnen?",
        answer:
          "Bis zu 150. Fünf sind im Grundpreis enthalten, weitere werden pro Person und Monat berechnet.",
      },
      {
        question: "Gibt es eine Vertragsbindung?",
        answer:
          "Nach Angabe von Sage nicht. Upgrade und Kündigung sind jederzeit möglich, ohne langfristige Verträge oder versteckte Gebühren.",
      },
    ],
    alternatives: ["sage-hr-payroll", "datev-lohn-und-gehalt", "lexware-lohn-gehalt", "sage-hr"],
    featured: true,
  },

  /* ======================================================= Sage HR ==== */
  {
    ...SAGE_VENDOR,
    id: "sw-sage-hr",
    name: "Sage HR",
    slug: "sage-hr",
    tagline: "Modulare Cloud-HR-Software mit App",
    description_short:
      "Personalverwaltung ab 4,50 EUR pro Mitarbeitendem und Monat, modular erweiterbar um Zeiterfassung, Schichtplanung, Performance und Recruiting. 30 Tage kostenlos testen, ohne Zahlungsdetails.",
    description_full: [
      "Sage HR ist die browserbasierte Personalsoftware von Sage, mit mobiler App und einem Aufbau aus einem Basispaket und frei wählbaren Modulen. Das Grundpaket bringt Abwesenheitsmanagement, die digitale Mitarbeiterakte und die App.",
      "Das Preismodell rechnet pro Mitarbeitendem und Monat. Sage HR Basis kostet 4,50 EUR. Das Zeit-Paket mit Arbeitszeittabellen liegt bei 7,00 EUR, das Schicht-Paket mit Arbeitszeittabellen und Schichtplanung bei 9,50 EUR, jeweils zzgl. MwSt.",
      "Einzeln zubuchbar sind Arbeitszeittabellen, Performance und Schichtplanung zu je 2,50 EUR sowie Ausgaben zu 1,50 EUR pro Mitarbeitendem und Monat. Recruiting wird abweichend als Festpreis berechnet: 175,00 EUR pro Monat, zzgl. MwSt., unabhängig von der Kopfzahl. Für kleine Teams ist dieser Posten damit der teuerste Einzelbaustein.",
      "Wichtig für die Abgrenzung: Sage HR ist eine Personalplattform ohne enthaltene Entgeltabrechnung. Wer Lohn und Personal in einer Lösung führen möchte, vergleicht Sage Lohnabrechnung oder Sage HR & Payroll. Die Produktnamen ähneln sich, die Leistung nicht.",
      "Der Test läuft 30 Tage und verlangt keine Zahlungsdetails. Er endet automatisch, eine Kündigung ist nicht erforderlich. Im Anmeldeverlauf wählen Sie die Module aus, die Sie ausprobieren möchten; Sage HR Basis und das Abwesenheitsmanagement sind standardmäßig enthalten. Testen lässt sich wahlweise mit den Demodaten von Sage oder mit eigenen Daten.",
    ],
    verdict:
      "Gut für Teams, die Abwesenheiten, Akten und Zeiterfassung schrittweise digitalisieren wollen und nur für genutzte Module zahlen möchten. Rechnen Sie die Module mit Ihrer Kopfzahl durch, besonders Recruiting mit seinem Festpreis. Lohnabrechnung ist nicht enthalten.",
    logo_url: "/logos/sage-hr.png",
    category_id: "cat-hr",

    starting_price: 4.5,
    billing_period: "user",
    free_trial: true,
    free_version: false,
    trial_days: 30,
    demo: {
      kind: "webdemo",
      label: "Kostenlose Webdemo vereinbaren",
      url: "https://www.sage.com/de-de/sage-business-cloud/hr/",
    },
    pricing_plans: [
      {
        name: "Sage HR Basis",
        price: 4.5,
        billing_period: "user",
        included_seats: "Pro Mitarbeitendem und Monat",
        description: "Der Grundumfang für Abwesenheiten und Personalakte.",
        includes: ["Abwesenheitsmanagement", "Digitale Mitarbeiterakte", "Mobile App"],
      },
      {
        name: "Sage HR Zeit-Paket",
        price: 7,
        billing_period: "user",
        included_seats: "Pro Mitarbeitendem und Monat",
        description: "Basis mit Arbeitszeittabellen. Das meistgewählte Paket.",
        includes: [
          "Abwesenheitsmanagement",
          "Digitale Mitarbeiterakte",
          "Mobile App",
          "Arbeitszeittabellen",
        ],
        highlighted: true,
      },
      {
        name: "Sage HR Schicht-Paket",
        price: 9.5,
        billing_period: "user",
        included_seats: "Pro Mitarbeitendem und Monat",
        description: "Basis mit Arbeitszeittabellen und Schichtplanung.",
        includes: [
          "Abwesenheitsmanagement",
          "Digitale Mitarbeiterakte",
          "Mobile App",
          "Arbeitszeittabellen",
          "Schichtplanung",
        ],
      },
    ],

    features: [
      {
        group: "Grundpaket",
        items: [
          { name: "Abwesenheiten beantragen und genehmigen", available: true },
          { name: "Digitale Mitarbeiterakte", available: true },
          { name: "Interaktives Organigramm", available: true },
          { name: "Mobile App mit Self-Service", available: true },
        ],
      },
      {
        group: "Zubuchbare Module",
        items: [
          { name: "Arbeitszeittabellen, 2,50 EUR je Person", available: true },
          { name: "Performance, 2,50 EUR je Person", available: true },
          { name: "Schichtplanung, 2,50 EUR je Person", available: true },
          { name: "Ausgaben, 1,50 EUR je Person", available: true },
          { name: "Recruiting, 175,00 EUR pro Monat", available: true },
        ],
      },
      {
        group: "Abgrenzung",
        items: [
          { name: "Lohn- und Gehaltsabrechnung", available: false, note: "Über Sage Lohnabrechnung" },
          { name: "SV-Meldung nach DEÜV", available: false },
          { name: "30 Tage Test ohne Zahlungsdetails", available: true },
        ],
      },
    ],
    top_features: [
      "Modularer Aufbau, nur genutzte Module zahlen",
      "Digitale Personalakte mit Organigramm",
      "Mobile App mit Mitarbeiter-Self-Service",
      "30 Tage testen ohne Zahlungsdetails",
    ],
    integrations: ["Sage Lohnabrechnung", "Sage HR Preisrechner"],
    de_compliance: compliance({
      lohnsteuer_anmeldung: false,
      sv_meldung: false,
      deuev: false,
      datev_export: null,
      dsgvo_avv: true,
      hosting_standort: "Cloud, Standort auf der Produktseite nicht beziffert",
      support_sprache_de: true,
      support_zeiten: "Telefon 0341 48440-3550",
    }),
    vendor_website: "https://www.sage.com/de-de/sage-business-cloud/hr/",
    support_types: ["Telefon 0341 48440-3550", "Webdemo", "Produkttour"],
    languages: ["Deutsch", "Englisch"],
    meta_title: "Sage HR im Test: Preise ab 4,50 EUR und Module",
    meta_description:
      "Sage HR geprüft am 23.09.2026: Basis 4,50 EUR, Zeit-Paket 7,00 EUR, Schicht-Paket 9,50 EUR pro Mitarbeitendem und Monat, Module ab 1,50 EUR, Test ohne Zahlungsangaben.",
    faq: [
      {
        question: "Was kostet Sage HR für fünfzehn Mitarbeitende?",
        answer:
          "Im Zeit-Paket 15 mal 7,00 EUR, also 105,00 EUR pro Monat, zzgl. 19 % MwSt. Kommt Recruiting hinzu, zahlen Sie zusätzlich 175,00 EUR pro Monat als Festpreis, unabhängig von der Kopfzahl.",
      },
      {
        question: "Ist die Lohnabrechnung in Sage HR enthalten?",
        answer:
          "Nein. Sage HR ist eine Personalplattform. Für die Entgeltabrechnung brauchen Sie Sage Lohnabrechnung oder Sage HR & Payroll. Die Namen ähneln sich, die Leistung unterscheidet sich erheblich.",
      },
      {
        question: "Wie lange läuft die kostenlose Testphase?",
        answer:
          "30 Tage. Zahlungsdetails sind nicht erforderlich, und der Test endet automatisch, ohne dass Sie kündigen müssen. Sie können dabei die Module auswählen, die Sie ausprobieren möchten, und wahlweise mit Demodaten oder mit eigenen Daten arbeiten.",
      },
    ],
    alternatives: ["sage-hr-payroll", "personio", "factorial", "sage-lohnabrechnung"],
    featured: false,
  },
];
