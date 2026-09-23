import type { Category } from "@/lib/types";

/**
 * The category table, mirrored in the repository.
 *
 * `id` is the row's real primary key in Supabase. It is a UUID derived once
 * from the slug and written here so that a component holding a product can put
 * a category name next to it without a second database read.
 *
 * `legacy_id` is the identifier the editorial product files under
 * src/data/software still use. The seed resolves it; nothing else should.
 *
 * `software_count` is recomputed by the database trigger and by the query
 * layer. The value stored here is only a fallback for a component that renders
 * before a count is available.
 */
export interface CategoryFixture extends Category {
  legacy_id: string;
}

export const categories: CategoryFixture[] = [
  {
    id: "fbba6536-f856-59ee-b6b2-b664f4dd29bd",
    legacy_id: "cat-buchhaltung",
    name: "Buchhaltungssoftware",
    slug: "buchhaltungssoftware",
    icon: "ledger",
    description:
      "Belege erfassen, Umsatzsteuer-Voranmeldung an ELSTER senden, EÜR oder Bilanz erstellen und an den Steuerberater übergeben.",
    software_count: 0,
    display_order: 1,
  },
  {
    id: "16aff900-9847-5d1e-a4ca-216934d3d30f",
    legacy_id: "cat-lohn",
    name: "Lohnabrechnung",
    slug: "lohnabrechnung",
    icon: "payslip",
    description:
      "Entgeltabrechnung mit Lohnsteueranmeldung, SV-Meldung nach DEÜV und elektronischer Arbeitsunfähigkeitsbescheinigung.",
    software_count: 0,
    display_order: 2,
  },
  {
    id: "60ae0399-dbf7-577c-ba7c-ca3ed5874d7c",
    legacy_id: "cat-hr",
    name: "HR-Software",
    slug: "hr-software",
    icon: "people",
    description:
      "Digitale Personalakte, Urlaubsanträge, Zeiterfassung nach dem Urteil des BAG und Bewerbermanagement.",
    software_count: 0,
    display_order: 3,
  },
  {
    id: "01bff682-ceb1-5d5c-b2b4-b5da80a073f4",
    legacy_id: "cat-crm",
    name: "CRM-Software",
    slug: "crm-software",
    icon: "contact",
    description:
      "Kontakte, Angebote und Vertriebspipeline an einer Stelle, mit Dokumentation der Kundenkommunikation.",
    software_count: 0,
    display_order: 4,
  },
  {
    id: "a0265230-84f0-513f-ac1d-2d79cf78f5e0",
    legacy_id: "cat-erp",
    name: "ERP-Software",
    slug: "erp-software",
    icon: "blocks",
    description:
      "Warenwirtschaft, Buchhaltung, Produktion und Vertrieb in einem System, mit einem gemeinsamen Datenbestand.",
    software_count: 0,
    display_order: 5,
  },
  {
    id: "6622227b-bd24-52a5-a6f2-d1fbcd595303",
    legacy_id: "cat-projekt",
    name: "Projektmanagement",
    slug: "projektmanagement",
    icon: "board",
    description:
      "Aufgaben, Termine und Auslastung planen, Projektzeiten erfassen und nach Aufwand abrechnen.",
    software_count: 0,
    display_order: 6,
  },
  {
    id: "ac6df7b6-67d3-50aa-bd42-c13bd10368ed",
    legacy_id: "cat-warenwirtschaft",
    name: "Warenwirtschaft",
    slug: "warenwirtschaft",
    icon: "package",
    description:
      "Artikelstamm, Lagerbestand, Bestellwesen und Versand, angebunden an Shop und Marktplatz.",
    software_count: 0,
    display_order: 7,
  },
  {
    id: "6bb67d54-9be4-5ba5-b84b-b68ce49148f0",
    legacy_id: "cat-kasse",
    name: "Kassensysteme",
    slug: "kassensysteme",
    icon: "receipt",
    description:
      "Kassensysteme mit technischer Sicherheitseinrichtung nach § 146a AO und Belegausgabepflicht.",
    software_count: 0,
    display_order: 8,
  },
];

export function categoryBySlug(slug: string): CategoryFixture | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * Accepts the database identifier a product carries, and also the legacy
 * identifier used by the editorial product files, so a lookup works whichever
 * of the two a caller happens to be holding.
 */
export function categoryById(id: string): CategoryFixture | undefined {
  return categories.find((c) => c.id === id || c.legacy_id === id);
}
