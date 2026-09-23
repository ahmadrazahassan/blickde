/**
 * Domain types. These mirror the Supabase schema in 02_BACKEND_PROMPT.md
 * column for column, so swapping the local data module for PostgREST calls
 * touches src/lib/queries.ts and nothing else.
 */

export type PublishStatus = "published" | "draft";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  software_count: number;
  display_order: number;
}

/**
 * Three states, and the distinction is load bearing:
 *   true   we confirmed the product does this
 *   false  we confirmed the product does NOT do this
 *   null   we have not verified it
 * A null never renders as "no".
 */
export type Verified = boolean | null;

export interface DeCompliance {
  gobd_konform: Verified;
  gobd_testat: string | null;
  elster_schnittstelle: Verified;
  datev_export: Verified;
  datev_schnittstelle: Verified;
  e_rechnung_empfang: Verified;
  e_rechnung_versand: Verified;
  zugferd_version: string | null;
  xrechnung: Verified;
  ust_voranmeldung: Verified;
  euer: Verified;
  bilanz: Verified;
  kleinunternehmer: Verified;
  lohnsteuer_anmeldung: Verified;
  sv_meldung: Verified;
  deuev: Verified;
  eau: Verified;
  dsgvo_avv: Verified;
  hosting_standort: string | null;
  support_sprache_de: Verified;
  support_zeiten: string | null;
}

export interface PricingPlan {
  name: string;
  price: number | null;
  billing_period: BillingPeriod;
  description: string;
  includes: string[];
  highlighted?: boolean;
  /** List price before a running offer, exactly as the vendor prints it. */
  list_price?: number | null;
  /** Seats, companies or employees the tier includes, as the vendor states. */
  included_seats?: string;
}

/**
 * A running vendor offer.
 *
 * Only entered when the vendor advertises it on its own German product page,
 * and only with the end date the vendor itself names. An offer without a
 * stated end date is a price, not an offer, and does not belong here.
 */
export interface Promotion {
  /** Exactly as the vendor words it, e.g. "50 % Rabatt für 3 Monate". */
  label: string;
  /** Who it applies to and what happens when it ends. */
  detail: string;
  /** ISO date the vendor names, or null when none is published. */
  valid_until: string | null;
}

/**
 * What a buyer can get hands on before signing.
 *
 * "trial" is a self service trial the buyer starts alone. "demo" is a guided
 * session with a salesperson. The two are not interchangeable and a site that
 * prints one where the vendor offers the other is simply wrong.
 */
export type DemoKind = "live-demo" | "produkttour" | "webdemo" | "infopaket";

export interface DemoOffer {
  kind: DemoKind;
  /** The vendor's own wording for the call to action. */
  label: string;
  url: string;
}

export type BillingPeriod = "month" | "year" | "user" | "seat";

export interface FeatureGroup {
  group: string;
  items: { name: string; available: Verified; note?: string }[];
}

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface Software {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description_short: string;
  /** Editorial long form, written in house. Never vendor copy. */
  description_full: string[];
  /** Three sentences on who the product is for. */
  verdict: string;
  logo_url: string | null;
  screenshots: Screenshot[];
  category_id: string;

  starting_price: number | null;
  price_currency: string;
  billing_period: BillingPeriod;
  free_trial: boolean;
  free_version: boolean;
  pricing_plans: PricingPlan[];
  price_includes_vat: boolean;
  /** ISO date. When a person last verified the price. */
  pricing_checked_at: string | null;

  /**
   * Length of the self service trial in days, as the vendor publishes it.
   * Absent means no trial length is published, which is not the same as
   * "no trial exists". The interface words it that way.
   */
  trial_days?: number;
  /** Running offer on the vendor's own German page. */
  promotion?: Promotion;
  /** Guided demo, product tour or information pack offered instead of, or
   *  alongside, a trial. */
  demo?: DemoOffer;

  features: FeatureGroup[];
  top_features: string[];
  integrations: string[];
  de_compliance: DeCompliance;

  affiliate_url: string | null;
  affiliate_network: "awin" | "impact" | "direct" | null;
  vendor_website: string;

  vendor_name: string;
  founded_year: number | null;
  support_types: string[];
  countries_available: string[];
  languages: string[];

  /** Written only by computeRatings(). Never set by hand. */
  overall_rating: number;
  ease_of_use_rating: number;
  value_for_money_rating: number;
  customer_service_rating: number;
  functionality_rating: number;
  review_count: number;

  meta_title: string;
  meta_description: string;

  faq: { question: string; answer: string }[];
  alternatives: string[];

  status: PublishStatus;
  featured: boolean;
  updated_at: string;
}

export type ReviewStatus = "pending" | "published" | "rejected";

export interface Review {
  id: string;
  software_id: string;

  reviewer_name: string;
  reviewer_job_title: string;
  reviewer_company: string | null;
  reviewer_industry: string;
  reviewer_company_size: CompanySize;
  reviewer_country: string;
  verified_badge: string | null;
  used_for_duration: string;

  overall_rating: number;
  ease_of_use: number;
  value_for_money: number;
  customer_service: number;
  functionality: number;

  review_title: string;
  summary: string;
  pros: string;
  cons: string;

  vendor_response: string | null;
  vendor_response_date: string | null;

  review_date: string;
  helpful_count: number;

  status: ReviewStatus;
  /** Fixture flag. Excluded from published grades, never shown as genuine. */
  is_seed: boolean;
}

export type CompanySize =
  | "1 Person"
  | "2 bis 9 Mitarbeitende"
  | "10 bis 49 Mitarbeitende"
  | "50 bis 249 Mitarbeitende"
  | "250 und mehr Mitarbeitende";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Structured blocks. Rendered by ArticleBody, never dangerouslySetInnerHTML. */
  content: ArticleBlock[];
  featured_image_url: string | null;
  featured_image_alt: string;
  category_tag: string;
  related_software_slugs: string[];

  author_name: string;
  author_bio: string;
  author_title: string;

  meta_title: string;
  meta_description: string;

  read_time_minutes: number;
  status: PublishStatus;
  featured: boolean;
  published_date: string;
  updated_date: string;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string; source: string }
  | { type: "note"; title: string; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "software"; slug: string; reason: string };

export interface GlossaryEntry {
  term: string;
  slug: string;
  letter: string;
  short: string;
  body: string;
  related: string[];
  legal_basis: string | null;
}

export interface ComparisonVerdict {
  pair: string;
  software_a: string;
  software_b: string;
  headline: string;
  differences: { title: string; text: string }[];
  take_a: string[];
  take_b: string[];
  status: PublishStatus;
}

export interface SearchHit {
  kind: "software" | "article" | "category" | "glossar";
  id: string;
  title: string;
  href: string;
  snippet: string;
  rank: number;
}
