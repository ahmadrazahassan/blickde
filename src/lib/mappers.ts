/**
 * PostgREST rows to domain objects.
 *
 * One direction only. Nothing here reads the network and nothing here writes.
 * The domain types in src/lib/types.ts are what every page consumes, so this
 * file is the only place that knows a column is called `description_full` and
 * holds paragraphs separated by a blank line.
 */

import { unverified } from "@/data/software/_shared";
import type {
  Article,
  ArticleBlock,
  Category,
  ComparisonVerdict,
  DeCompliance,
  DemoOffer,
  FeatureGroup,
  PricingPlan,
  Promotion,
  Review,
  Screenshot,
  Software,
} from "./types";

/* ==========================================================================
   Row shapes, as PostgREST returns them
   ========================================================================== */

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  software_count: number | null;
  display_order: number | null;
}

export interface SoftwareRow {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description_short: string;
  description_full: string;
  verdict: string | null;
  logo_url: string | null;
  screenshots: unknown;
  category_id: string | null;
  starting_price: number | string | null;
  price_currency: string | null;
  billing_period: string | null;
  free_trial: boolean | null;
  free_version: boolean | null;
  pricing_plans: unknown;
  price_includes_vat: boolean | null;
  pricing_checked_at: string | null;
  trial_days: number | null;
  promotion: unknown;
  demo: unknown;
  features: unknown;
  top_features: unknown;
  integrations: unknown;
  de_compliance: unknown;
  faq: unknown;
  affiliate_url: string | null;
  affiliate_network: string | null;
  vendor_website: string | null;
  vendor_name: string | null;
  founded_year: number | null;
  support_types: unknown;
  countries_available: unknown;
  languages: unknown;
  overall_rating: number | string | null;
  ease_of_use_rating: number | string | null;
  value_for_money_rating: number | string | null;
  customer_service_rating: number | string | null;
  functionality_rating: number | string | null;
  review_count: number | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  featured: boolean | null;
  updated_at: string | null;
}

export interface ReviewRow {
  id: string;
  software_id: string;
  reviewer_name: string;
  reviewer_job_title: string | null;
  reviewer_company: string | null;
  reviewer_industry: string | null;
  reviewer_company_size: string | null;
  reviewer_country: string | null;
  verified_badge: string | null;
  used_for_duration: string | null;
  overall_rating: number | string;
  ease_of_use: number | string | null;
  value_for_money: number | string | null;
  customer_service: number | string | null;
  functionality: number | string | null;
  review_title: string;
  summary: string | null;
  pros: string | null;
  cons: string | null;
  vendor_response: string | null;
  vendor_response_date: string | null;
  review_date: string | null;
  helpful_count: number | null;
  status: string;
  is_seed: boolean | null;
}

export interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  category_tag: string | null;
  related_software_slugs: unknown;
  author_name: string;
  author_bio: string | null;
  author_title: string | null;
  meta_title: string | null;
  meta_description: string | null;
  read_time_minutes: number | null;
  status: string;
  featured: boolean | null;
  published_date: string | null;
  updated_date: string | null;
}

export interface ComparisonRow {
  id: string;
  software_a_id: string;
  software_b_id: string;
  custom_verdict: string | null;
  headline: string | null;
  differences: unknown;
  take_a: unknown;
  take_b: unknown;
  status: string;
}

/* ==========================================================================
   Coercion helpers
   ========================================================================== */

/** PostgREST returns NUMERIC as a string to avoid a float rounding surprise. */
function num(value: number | string | null | undefined, fallback = 0): number {
  if (value === null || value === undefined) return fallback;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function numOrNull(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/** TIMESTAMPTZ or DATE to the plain YYYY-MM-DD the interface formats. */
function dateOnly(value: string | null | undefined, fallback = ""): string {
  if (!value) return fallback;
  return value.slice(0, 10);
}

/* ==========================================================================
   Software
   ========================================================================== */

/**
 * A missing compliance key means "not checked", which is not the same as "no".
 * Merging over the all-null baseline is what guarantees the interface can tell
 * the two apart: an absent key arrives as null and is rendered as unverified,
 * never as a denial about a named company.
 */
function toCompliance(value: unknown): DeCompliance {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...unverified };
  }
  const stored = value as Record<string, unknown>;
  const merged: Record<string, unknown> = { ...unverified };
  for (const key of Object.keys(unverified)) {
    if (key in stored && stored[key] !== undefined) {
      merged[key] = stored[key];
    }
  }
  return merged as unknown as DeCompliance;
}

export function toSoftware(row: SoftwareRow, alternatives: string[] = []): Software {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline ?? "",
    description_short: row.description_short,
    // Stored as one text column with a blank line between paragraphs.
    description_full: row.description_full
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    verdict: row.verdict ?? "",
    logo_url: row.logo_url,
    screenshots: list<Screenshot>(row.screenshots),
    category_id: row.category_id ?? "",

    starting_price: numOrNull(row.starting_price),
    price_currency: row.price_currency ?? "EUR",
    billing_period: (row.billing_period ?? "month") as Software["billing_period"],
    free_trial: row.free_trial ?? false,
    free_version: row.free_version ?? false,
    pricing_plans: list<PricingPlan>(row.pricing_plans),
    price_includes_vat: row.price_includes_vat ?? false,
    pricing_checked_at: row.pricing_checked_at ? dateOnly(row.pricing_checked_at) : null,
    ...(row.trial_days !== null ? { trial_days: row.trial_days } : {}),
    ...(row.promotion ? { promotion: row.promotion as Promotion } : {}),
    ...(row.demo ? { demo: row.demo as DemoOffer } : {}),

    features: list<FeatureGroup>(row.features),
    top_features: strings(row.top_features),
    integrations: strings(row.integrations),
    de_compliance: toCompliance(row.de_compliance),

    affiliate_url: row.affiliate_url,
    affiliate_network: row.affiliate_network as Software["affiliate_network"],
    vendor_website: row.vendor_website ?? "",

    vendor_name: row.vendor_name ?? "",
    founded_year: row.founded_year,
    support_types: strings(row.support_types),
    countries_available: strings(row.countries_available),
    languages: strings(row.languages),

    // Written by update_software_ratings() and read back here. Never computed
    // in the application, because an application that can compute a grade is an
    // application that can fake one.
    overall_rating: num(row.overall_rating),
    ease_of_use_rating: num(row.ease_of_use_rating),
    value_for_money_rating: num(row.value_for_money_rating),
    customer_service_rating: num(row.customer_service_rating),
    functionality_rating: num(row.functionality_rating),
    review_count: row.review_count ?? 0,

    meta_title: row.meta_title ?? row.name,
    meta_description: row.meta_description ?? row.description_short,

    faq: list<{ question: string; answer: string }>(row.faq),
    alternatives,

    status: row.status as Software["status"],
    featured: row.featured ?? false,
    updated_at: dateOnly(row.updated_at),
  };
}

/* ==========================================================================
   Reviews
   ========================================================================== */

export function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    software_id: row.software_id,
    reviewer_name: row.reviewer_name,
    reviewer_job_title: row.reviewer_job_title ?? "",
    reviewer_company: row.reviewer_company,
    reviewer_industry: row.reviewer_industry ?? "",
    reviewer_company_size: (row.reviewer_company_size ??
      "1 Person") as Review["reviewer_company_size"],
    reviewer_country: row.reviewer_country ?? "DE",
    verified_badge: row.verified_badge,
    used_for_duration: row.used_for_duration ?? "",

    overall_rating: num(row.overall_rating),
    ease_of_use: num(row.ease_of_use),
    value_for_money: num(row.value_for_money),
    customer_service: num(row.customer_service),
    functionality: num(row.functionality),

    review_title: row.review_title,
    summary: row.summary ?? "",
    pros: row.pros ?? "",
    cons: row.cons ?? "",

    vendor_response: row.vendor_response,
    vendor_response_date: row.vendor_response_date ? dateOnly(row.vendor_response_date) : null,

    review_date: dateOnly(row.review_date),
    helpful_count: row.helpful_count ?? 0,

    status: row.status as Review["status"],
    is_seed: row.is_seed ?? false,
  };
}

/* ==========================================================================
   Articles
   ========================================================================== */

/**
 * `content` holds a JSON array of structured blocks. It is walked by
 * ArticleBody and never handed to dangerouslySetInnerHTML, so a malformed or
 * hostile document renders as nothing rather than as markup.
 */
function toBlocks(value: string): ArticleBlock[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as ArticleBlock[]) : [];
  } catch {
    return [];
  }
}

export function toArticle(row: ArticleRow): Article {
  const published = dateOnly(row.published_date);
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? "",
    content: toBlocks(row.content),
    featured_image_url: row.featured_image_url,
    featured_image_alt: row.featured_image_alt ?? "",
    category_tag: row.category_tag ?? "",
    related_software_slugs: strings(row.related_software_slugs),
    author_name: row.author_name,
    author_bio: row.author_bio ?? "",
    author_title: row.author_title ?? "",
    meta_title: row.meta_title ?? row.title,
    meta_description: row.meta_description ?? row.excerpt ?? "",
    read_time_minutes: row.read_time_minutes ?? 0,
    status: row.status as Article["status"],
    featured: row.featured ?? false,
    published_date: published,
    updated_date: dateOnly(row.updated_date, published),
  };
}

/* ==========================================================================
   Categories and comparisons
   ========================================================================== */

export function toCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    icon: row.icon,
    description: row.description,
    software_count: row.software_count ?? 0,
    display_order: row.display_order ?? 0,
  };
}

export function toVerdict(row: ComparisonRow, slugA: string, slugB: string): ComparisonVerdict {
  return {
    pair: `${slugA}-vs-${slugB}`,
    software_a: slugA,
    software_b: slugB,
    headline: row.headline ?? row.custom_verdict ?? "",
    differences: list<{ title: string; text: string }>(row.differences),
    take_a: strings(row.take_a),
    take_b: strings(row.take_b),
    status: row.status as ComparisonVerdict["status"],
  };
}

/** The column list every software read uses. `select('*')` would ship the
 *  tsvector over the wire on every request for no benefit. */
export const SOFTWARE_COLUMNS = [
  "id",
  "name",
  "slug",
  "tagline",
  "description_short",
  "description_full",
  "verdict",
  "logo_url",
  "screenshots",
  "category_id",
  "starting_price",
  "price_currency",
  "billing_period",
  "free_trial",
  "free_version",
  "pricing_plans",
  "price_includes_vat",
  "pricing_checked_at",
  "trial_days",
  "promotion",
  "demo",
  "features",
  "top_features",
  "integrations",
  "de_compliance",
  "faq",
  "affiliate_url",
  "affiliate_network",
  "vendor_website",
  "vendor_name",
  "founded_year",
  "support_types",
  "countries_available",
  "languages",
  "overall_rating",
  "ease_of_use_rating",
  "value_for_money_rating",
  "customer_service_rating",
  "functionality_rating",
  "review_count",
  "meta_title",
  "meta_description",
  "status",
  "featured",
  "updated_at",
].join(",");

export const REVIEW_COLUMNS = [
  "id",
  "software_id",
  "reviewer_name",
  "reviewer_job_title",
  "reviewer_company",
  "reviewer_industry",
  "reviewer_company_size",
  "reviewer_country",
  "verified_badge",
  "used_for_duration",
  "overall_rating",
  "ease_of_use",
  "value_for_money",
  "customer_service",
  "functionality",
  "review_title",
  "summary",
  "pros",
  "cons",
  "vendor_response",
  "vendor_response_date",
  "review_date",
  "helpful_count",
  "status",
  "is_seed",
].join(",");

export const ARTICLE_COLUMNS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "content",
  "featured_image_url",
  "featured_image_alt",
  "category_tag",
  "related_software_slugs",
  "author_name",
  "author_bio",
  "author_title",
  "meta_title",
  "meta_description",
  "read_time_minutes",
  "status",
  "featured",
  "published_date",
  "updated_date",
].join(",");
