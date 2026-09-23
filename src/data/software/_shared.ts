import type { DeCompliance } from "@/lib/types";

/**
 * Every compliance key starts unverified. A row is only set to true or false
 * once a person has checked it, because null and false mean different things
 * and only one of them may be printed as "nein".
 */
export const unverified: DeCompliance = {
  gobd_konform: null,
  gobd_testat: null,
  elster_schnittstelle: null,
  datev_export: null,
  datev_schnittstelle: null,
  e_rechnung_empfang: null,
  e_rechnung_versand: null,
  zugferd_version: null,
  xrechnung: null,
  ust_voranmeldung: null,
  euer: null,
  bilanz: null,
  kleinunternehmer: null,
  lohnsteuer_anmeldung: null,
  sv_meldung: null,
  deuev: null,
  eau: null,
  dsgvo_avv: null,
  hosting_standort: null,
  support_sprache_de: null,
  support_zeiten: null,
};

export function compliance(overrides: Partial<DeCompliance>): DeCompliance {
  return { ...unverified, ...overrides };
}

/** Labels for the compliance ledger, in the order the table prints them. */
export const COMPLIANCE_ROWS: {
  key: keyof DeCompliance;
  label: string;
  hint?: string;
  kind: "boolean" | "text";
}[] = [
  { key: "gobd_konform", label: "GoBD-konform", kind: "boolean" },
  {
    key: "gobd_testat",
    label: "GoBD-Testat",
    hint: "Prüfer und Jahr, sofern ein Testat vorliegt",
    kind: "text",
  },
  { key: "elster_schnittstelle", label: "ELSTER-Übermittlung", kind: "boolean" },
  { key: "ust_voranmeldung", label: "Umsatzsteuer-Voranmeldung", kind: "boolean" },
  { key: "euer", label: "Einnahmenüberschussrechnung", kind: "boolean" },
  { key: "bilanz", label: "Bilanz und GuV", kind: "boolean" },
  { key: "kleinunternehmer", label: "Kleinunternehmerregelung", kind: "boolean" },
  { key: "datev_export", label: "DATEV-Export", kind: "boolean" },
  { key: "datev_schnittstelle", label: "DATEV-Schnittstelle", kind: "boolean" },
  { key: "e_rechnung_empfang", label: "E-Rechnung empfangen", kind: "boolean" },
  { key: "e_rechnung_versand", label: "E-Rechnung versenden", kind: "boolean" },
  { key: "zugferd_version", label: "ZUGFeRD-Version", kind: "text" },
  { key: "xrechnung", label: "XRechnung", kind: "boolean" },
  { key: "lohnsteuer_anmeldung", label: "Lohnsteueranmeldung", kind: "boolean" },
  { key: "sv_meldung", label: "SV-Meldung", kind: "boolean" },
  { key: "deuev", label: "DEÜV-Meldeverfahren", kind: "boolean" },
  { key: "eau", label: "eAU-Abruf", kind: "boolean" },
  { key: "dsgvo_avv", label: "AVV nach Art. 28 DSGVO", kind: "boolean" },
  { key: "hosting_standort", label: "Hosting-Standort", kind: "text" },
  { key: "support_sprache_de", label: "Support auf Deutsch", kind: "boolean" },
  { key: "support_zeiten", label: "Support-Zeiten", kind: "text" },
];

/** The subset shown as chips in the sticky rail and on cards. */
export const COMPLIANCE_CHIPS: { key: keyof DeCompliance; label: string }[] = [
  { key: "gobd_konform", label: "GoBD" },
  { key: "elster_schnittstelle", label: "ELSTER" },
  { key: "datev_schnittstelle", label: "DATEV" },
  { key: "e_rechnung_versand", label: "E-Rechnung" },
  { key: "dsgvo_avv", label: "AVV" },
];
