import type { Software } from "@/lib/types";
import { buchhaltung } from "./buchhaltung";
import { lohnHr } from "./lohn-hr";
import { crmErp } from "./crm-erp";
import { projektWawi } from "./projekt-wawi";
import { weitere } from "./weitere";
import { sageNeu } from "./sage-neu";
import { sage } from "./sage";

/**
 * src/data/software/sage.ts is the single source of truth for every Sage
 * product: prices, tiers, trial lengths and the running offer all come from
 * Sage's own German pages and carry one check date.
 *
 * Earlier files still hold older Sage entries. Rather than editing them by
 * hand and risking two versions of one price, the Sage file wins on any slug
 * collision and the stale duplicate is dropped here.
 */
const canonical = [...sage];
const canonicalSlugs = new Set(canonical.map((item) => item.slug));

const rest = [...buchhaltung, ...lohnHr, ...crmErp, ...projektWawi, ...weitere, ...sageNeu].filter(
  (item) => !canonicalSlugs.has(item.slug),
);

export const software: Software[] = [...canonical, ...rest];

export { COMPLIANCE_ROWS, COMPLIANCE_CHIPS } from "./_shared";
