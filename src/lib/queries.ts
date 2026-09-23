/**
 * The one query module.
 *
 * Every page reads its data through these functions and nothing else touches
 * the data source. The signatures are unchanged from the local data build: the
 * bodies are now PostgREST calls and no page had to change.
 *
 * Two rules hold throughout:
 *
 *   1. Reads go through the anonymous key, so Row Level Security decides what
 *      is visible. A page cannot accidentally serve a draft product or a
 *      pending review, because the database will not hand them over.
 *
 *   2. Grades are read, never computed. update_software_ratings() owns the
 *      rating columns. The one exception is the development seed preview
 *      below, which is labelled in the interface and forced off in production.
 */

import "server-only";

import { cache } from "react";

import { glossary } from "@/data/glossary";
import { publicClient, adminClient } from "@/lib/supabase/clients";
import { SHOW_SEED_REVIEWS } from "@/lib/env";
import {
  ARTICLE_COLUMNS,
  REVIEW_COLUMNS,
  SOFTWARE_COLUMNS,
  toArticle,
  toCategory,
  toReview,
  toSoftware,
  toVerdict,
  type ArticleRow,
  type CategoryRow,
  type ComparisonRow,
  type ReviewRow,
  type SoftwareRow,
} from "@/lib/mappers";
import type {
  Article,
  Category,
  ComparisonVerdict,
  GlossaryEntry,
  Review,
  SearchHit,
  Software,
} from "./types";

export { SHOW_SEED_REVIEWS };

function fail(context: string, error: { message: string } | null): never | void {
  if (error) {
    throw new Error(`Datenbankfehler bei ${context}: ${error.message}`);
  }
}

/* ==========================================================================
   Review visibility
   ========================================================================== */

/**
 * In production this reads through the anonymous key, and RLS guarantees the
 * result contains only published, non fixture rows. In development the seed
 * fixtures are additionally read through the service role so the interface can
 * be worked on, and every screen that shows them says so.
 */
const visibleReviews = cache(async (): Promise<Review[]> => {
  const db = SHOW_SEED_REVIEWS ? adminClient() : publicClient();
  const pageSize = 1000;
  const reviews: Review[] = [];

  for (let offset = 0; ; offset += pageSize) {
    let query = db
      .from("reviews")
      .select(REVIEW_COLUMNS)
      .eq("status", "published")
      .order("id", { ascending: true })
      .range(offset, offset + pageSize - 1);
    if (!SHOW_SEED_REVIEWS) query = query.eq("is_seed", false);

    const { data, error } = await query;
    fail("reviews", error);
    const page = (data ?? []) as unknown as ReviewRow[];
    reviews.push(...page.map(toReview));
    if (page.length < pageSize) break;
  }

  return reviews;
});

const reviewsBySoftware = cache(async (): Promise<Map<string, Review[]>> => {
  const grouped = new Map<string, Review[]>();
  for (const review of await visibleReviews()) {
    const bucket = grouped.get(review.software_id);
    if (bucket) bucket.push(review);
    else grouped.set(review.software_id, [review]);
  }
  return grouped;
});

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return round1(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/**
 * Development only. The stored grades exclude fixtures by design, so with seed
 * data alone every product would report a dash. This recomputes the display
 * values from the visible set so the interface can be built and reviewed.
 *
 * It never runs in production: SHOW_SEED_REVIEWS is false there and no
 * environment variable can turn it on.
 */
async function withSeedRatings(items: Software[]): Promise<Software[]> {
  if (!SHOW_SEED_REVIEWS) return items;
  const grouped = await reviewsBySoftware();
  return items.map((item) => {
    const rows = grouped.get(item.id) ?? [];
    if (rows.length === 0) return item;
    return {
      ...item,
      overall_rating: average(rows.map((r) => r.overall_rating)),
      ease_of_use_rating: average(rows.map((r) => r.ease_of_use)),
      value_for_money_rating: average(rows.map((r) => r.value_for_money)),
      customer_service_rating: average(rows.map((r) => r.customer_service)),
      functionality_rating: average(rows.map((r) => r.functionality)),
      review_count: rows.length,
    };
  });
}

/* ==========================================================================
   Software
   ========================================================================== */

/**
 * Alternatives are a join table, and the catalogue is small enough that one
 * read of the whole edge list per request beats a per product round trip.
 */
const alternativeSlugs = cache(async (): Promise<Map<string, string[]>> => {
  const { data, error } = await publicClient()
    .from("software_alternatives")
    .select("software_id, display_order, alternative:software!software_alternatives_alternative_id_fkey(slug)")
    .order("display_order", { ascending: true });
  fail("software_alternatives", error);

  const grouped = new Map<string, string[]>();
  for (const row of (data ?? []) as unknown as {
    software_id: string;
    alternative: { slug: string } | { slug: string }[] | null;
  }[]) {
    const related = Array.isArray(row.alternative) ? row.alternative[0] : row.alternative;
    if (!related) continue;
    const bucket = grouped.get(row.software_id);
    if (bucket) bucket.push(related.slug);
    else grouped.set(row.software_id, [related.slug]);
  }
  return grouped;
});

/**
 * The published catalogue, once per request.
 *
 * Compliance filtering happens in application code and never in SQL. A missing
 * key and a stored `false` compare identically through the ->> operator, and
 * that distinction is the entire point of the column.
 */
const publishedSoftware = cache(async (): Promise<Software[]> => {
  const [{ data, error }, alternatives] = await Promise.all([
    publicClient().from("software").select(SOFTWARE_COLUMNS).eq("status", "published"),
    alternativeSlugs(),
  ]);
  fail("software", error);

  const items = ((data ?? []) as unknown as SoftwareRow[]).map((row) =>
    toSoftware(row, alternatives.get(row.id) ?? []),
  );
  return withSeedRatings(items);
});

/* ==========================================================================
   Categories
   ========================================================================== */

export const getCategories = cache(async (): Promise<Category[]> => {
  const { data, error } = await publicClient()
    .from("categories")
    .select("id,name,slug,icon,description,software_count,display_order")
    .order("display_order", { ascending: true });
  fail("categories", error);
  return ((data ?? []) as unknown as CategoryRow[]).map(toCategory);
});

export async function getCategory(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

/* ==========================================================================
   Software queries
   ========================================================================== */

export type SortKey = "rating" | "reviews" | "price-asc" | "price-desc" | "name";

export interface SoftwareFilter {
  category?: string;
  freeTrial?: boolean;
  freeVersion?: boolean;
  /** Compliance keys that must be confirmed true, not merely unverified. */
  requires?: ("gobd" | "elster" | "datev" | "erechnung" | "hosting-de")[];
  maxPrice?: number;
  query?: string;
  sort?: SortKey;
}

export async function getSoftwareList(filter: SoftwareFilter = {}): Promise<Software[]> {
  let rows = await publishedSoftware();

  if (filter.category) {
    const category = (await getCategories()).find((c) => c.slug === filter.category);
    rows = category ? rows.filter((s) => s.category_id === category.id) : [];
  }

  if (filter.freeTrial) rows = rows.filter((s) => s.free_trial);
  if (filter.freeVersion) rows = rows.filter((s) => s.free_version);

  if (typeof filter.maxPrice === "number") {
    const limit = filter.maxPrice;
    rows = rows.filter((s) => s.starting_price !== null && s.starting_price <= limit);
  }

  // Only a confirmed true qualifies. An unverified key is not a yes.
  for (const requirement of filter.requires ?? []) {
    rows = rows.filter((s) => {
      const c = s.de_compliance;
      switch (requirement) {
        case "gobd":
          return c.gobd_konform === true;
        case "elster":
          return c.elster_schnittstelle === true;
        case "datev":
          return c.datev_schnittstelle === true || c.datev_export === true;
        case "erechnung":
          return c.e_rechnung_versand === true;
        case "hosting-de":
          return (c.hosting_standort ?? "").includes("Deutschland");
      }
    });
  }

  if (filter.query) {
    const needle = normalise(filter.query);
    rows = rows.filter((s) =>
      normalise(`${s.name} ${s.tagline} ${s.description_short} ${s.vendor_name}`).includes(needle),
    );
  }

  return sortSoftware(rows, filter.sort ?? "rating");
}

function sortSoftware(rows: Software[], sort: SortKey): Software[] {
  const copy = [...rows];
  switch (sort) {
    case "reviews":
      return copy.sort((a, b) => b.review_count - a.review_count);
    case "price-asc":
      return copy.sort(
        (a, b) => (a.starting_price ?? Infinity) - (b.starting_price ?? Infinity),
      );
    case "price-desc":
      return copy.sort(
        (a, b) => (b.starting_price ?? -Infinity) - (a.starting_price ?? -Infinity),
      );
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name, "de-DE"));
    case "rating":
    default:
      return copy.sort(
        (a, b) => b.overall_rating - a.overall_rating || b.review_count - a.review_count,
      );
  }
}

export async function getSoftware(slug: string): Promise<Software | null> {
  const { data, error } = await publicClient()
    .from("software")
    .select(SOFTWARE_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  fail("software", error);
  if (!data) return null;

  const row = data as unknown as SoftwareRow;
  const alternatives = (await alternativeSlugs()).get(row.id) ?? [];
  const [item] = await withSeedRatings([toSoftware(row, alternatives)]);
  return item ?? null;
}

export async function getSoftwareSlugs(): Promise<string[]> {
  const { data, error } = await publicClient()
    .from("software")
    .select("slug")
    .eq("status", "published");
  fail("software slugs", error);
  return ((data ?? []) as { slug: string }[]).map((row) => row.slug);
}

export async function getTopRated(limit = 4): Promise<Software[]> {
  const rows = await publishedSoftware();
  return rows
    .filter((s) => s.review_count > 0)
    .sort((a, b) => b.overall_rating - a.overall_rating || b.review_count - a.review_count)
    .slice(0, limit);
}

/** Products whose price was verified most recently. */
export async function getRecentlyChecked(limit = 4): Promise<Software[]> {
  const rows = await publishedSoftware();
  return rows
    .filter((s) => s.pricing_checked_at !== null)
    .sort((a, b) => (b.pricing_checked_at ?? "").localeCompare(a.pricing_checked_at ?? ""))
    .slice(0, limit);
}

export async function getAlternatives(slug: string, limit = 4): Promise<Software[]> {
  const item = await getSoftware(slug);
  if (!item) return [];

  const rows = await publishedSoftware();
  const named = item.alternatives
    .map((s) => rows.find((p) => p.slug === s))
    .filter((s): s is Software => Boolean(s));

  if (named.length >= limit) return named.slice(0, limit);

  const sameCategory = rows
    .filter((s) => s.category_id === item.category_id && s.slug !== item.slug)
    .filter((s) => !named.some((n) => n.slug === s.slug))
    .sort((a, b) => b.overall_rating - a.overall_rating);

  return [...named, ...sameCategory].slice(0, limit);
}

/* ==========================================================================
   Reviews
   ========================================================================== */

export interface ReviewFilter {
  rating?: number;
  companySize?: string;
  sort?: "recent" | "helpful" | "rating-desc" | "rating-asc";
}

export async function getReviews(
  softwareSlug: string,
  filter: ReviewFilter = {},
  limit?: number,
): Promise<Review[]> {
  const item = await getSoftware(softwareSlug);
  if (!item) return [];

  let rows = (await reviewsBySoftware()).get(item.id) ?? [];

  if (filter.rating) rows = rows.filter((r) => Math.floor(r.overall_rating) === filter.rating);
  if (filter.companySize) rows = rows.filter((r) => r.reviewer_company_size === filter.companySize);

  rows = [...rows];
  switch (filter.sort ?? "recent") {
    case "helpful":
      rows.sort((a, b) => b.helpful_count - a.helpful_count);
      break;
    case "rating-desc":
      rows.sort((a, b) => b.overall_rating - a.overall_rating);
      break;
    case "rating-asc":
      rows.sort((a, b) => a.overall_rating - b.overall_rating);
      break;
    default:
      rows.sort((a, b) => b.review_date.localeCompare(a.review_date));
  }

  return limit ? rows.slice(0, limit) : rows;
}

/** The homepage review wall. Cross product, most helpful first. */
export async function getFeaturedReviews(limit = 6): Promise<(Review & { software: Software })[]> {
  const rows = await publishedSoftware();
  const reviews = await visibleReviews();
  return reviews
    .map((r) => {
      const item = rows.find((s) => s.id === r.software_id);
      return item ? { ...r, software: item } : null;
    })
    .filter((r): r is Review & { software: Software } => r !== null)
    .sort((a, b) => b.helpful_count - a.helpful_count)
    .slice(0, limit);
}

/**
 * A clearly labelled visual preview for the homepage until genuine reviews
 * exist. It reads the fixtures deliberately and through the service role, and
 * the component that renders it prints a notice saying exactly that.
 */
export async function getReviewDesignPreview(
  limit = 12,
): Promise<(Review & { software: Software })[]> {
  const rows = await publishedSoftware();
  const { data, error } = await adminClient()
    .from("reviews")
    .select(REVIEW_COLUMNS)
    .eq("is_seed", true)
    .eq("status", "published")
    .order("helpful_count", { ascending: false });
  fail("seed reviews", error);

  const seen = new Set<string>();
  const out: (Review & { software: Software })[] = [];

  for (const row of (data ?? []) as unknown as ReviewRow[]) {
    const review = toReview(row);
    if (seen.has(review.software_id)) continue;
    const item = rows.find((s) => s.id === review.software_id);
    if (!item) continue;
    seen.add(review.software_id);
    out.push({ ...review, software: item });
    if (out.length >= limit) break;
  }
  return out;
}

export async function getTotalReviewCount(): Promise<number> {
  return (await visibleReviews()).length;
}

export async function getRatingDistribution(
  softwareSlug: string,
): Promise<{ stars: number; count: number; share: number }[]> {
  const rows = await getReviews(softwareSlug);
  const total = rows.length;
  return [5, 4, 3, 2, 1].map((stars) => {
    const count = rows.filter((r) => Math.floor(r.overall_rating) === stars).length;
    return { stars, count, share: total === 0 ? 0 : count / total };
  });
}

/* ==========================================================================
   Articles
   ========================================================================== */

const publishedArticles = cache(async (): Promise<Article[]> => {
  const { data, error } = await publicClient()
    .from("articles")
    .select(ARTICLE_COLUMNS)
    .eq("status", "published")
    .order("published_date", { ascending: false });
  fail("articles", error);
  return ((data ?? []) as unknown as ArticleRow[]).map(toArticle);
});

export async function getArticles(limit?: number): Promise<Article[]> {
  const rows = await publishedArticles();
  return limit ? rows.slice(0, limit) : rows;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await publicClient()
    .from("articles")
    .select(ARTICLE_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  fail("article", error);
  return data ? toArticle(data as unknown as ArticleRow) : null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const { data, error } = await publicClient()
    .from("articles")
    .select("slug")
    .eq("status", "published");
  fail("article slugs", error);
  return ((data ?? []) as { slug: string }[]).map((row) => row.slug);
}

export async function getArticleTags(): Promise<string[]> {
  const rows = await getArticles();
  return [...new Set(rows.map((a) => a.category_tag))].sort((a, b) => a.localeCompare(b, "de-DE"));
}

export async function getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
  const current = await getArticle(slug);
  if (!current) return [];
  const rows = await getArticles();
  const sameTag = rows.filter((a) => a.slug !== slug && a.category_tag === current.category_tag);
  const rest = rows.filter((a) => a.slug !== slug && a.category_tag !== current.category_tag);
  return [...sameTag, ...rest].slice(0, limit);
}

/* ==========================================================================
   Comparisons
   ========================================================================== */

const publishedComparisons = cache(
  async (): Promise<{ row: ComparisonRow; slugA: string; slugB: string }[]> => {
    const [{ data, error }, rows] = await Promise.all([
      publicClient()
        .from("comparisons")
        .select("id,software_a_id,software_b_id,custom_verdict,headline,differences,take_a,take_b,status")
        .eq("status", "published"),
      publishedSoftware(),
    ]);
    fail("comparisons", error);

    const slugById = new Map(rows.map((s) => [s.id, s.slug]));
    return ((data ?? []) as unknown as ComparisonRow[])
      .map((row) => {
        const slugA = slugById.get(row.software_a_id);
        const slugB = slugById.get(row.software_b_id);
        return slugA && slugB ? { row, slugA, slugB } : null;
      })
      .filter((v): v is { row: ComparisonRow; slugA: string; slugB: string } => v !== null);
  },
);

export async function getComparison(
  slugA: string,
  slugB: string,
): Promise<{ a: Software; b: Software; verdict: ComparisonVerdict | null } | null> {
  const [a, b] = await Promise.all([getSoftware(slugA), getSoftware(slugB)]);
  if (!a || !b || a.slug === b.slug) return null;

  // The verdict is stored for one ordering; a visitor may arrive from either.
  const match = (await publishedComparisons()).find(
    (v) =>
      (v.slugA === a.slug && v.slugB === b.slug) || (v.slugA === b.slug && v.slugB === a.slug),
  );

  return {
    a,
    b,
    verdict: match ? toVerdict(match.row, match.slugA, match.slugB) : null,
  };
}

export async function getEditorialComparisons(): Promise<
  { pair: string; a: Software; b: Software; headline: string }[]
> {
  const rows = await publishedSoftware();
  return (await publishedComparisons())
    .map((v) => {
      const a = rows.find((s) => s.slug === v.slugA);
      const b = rows.find((s) => s.slug === v.slugB);
      return a && b
        ? { pair: `${v.slugA}-vs-${v.slugB}`, a, b, headline: v.row.headline ?? "" }
        : null;
    })
    .filter((v): v is { pair: string; a: Software; b: Software; headline: string } => v !== null);
}

/* ==========================================================================
   Glossary
   ========================================================================== */

/**
 * The glossary is editorial reference text with no personal data, no
 * moderation queue and no aggregate to maintain. It stays in the repository
 * where it can be reviewed in a diff, rather than becoming a seventeenth table
 * that only ever holds what a migration put there.
 */
export async function getGlossary(): Promise<GlossaryEntry[]> {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term, "de-DE"));
}

export async function getGlossaryEntry(slug: string): Promise<GlossaryEntry | null> {
  return glossary.find((g) => g.slug === slug) ?? null;
}

/* ==========================================================================
   Search
   ========================================================================== */

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface SearchRow {
  kind: string;
  id: string;
  title: string;
  slug: string;
  snippet: string | null;
  rank: number;
}

const HREF: Record<string, (slug: string) => string> = {
  software: (slug) => `/software/${slug}`,
  article: (slug) => `/ratgeber/${slug}`,
  category: (slug) => `/kategorie/${slug}`,
};

/**
 * Software, articles and categories come from the search_all() RPC, which does
 * German stemming, compound prefix matching and a trigram fallback for
 * misspelled product names. Glossary entries are matched here because they live
 * in the repository rather than in the database.
 */
export async function search(query: string, limit = 20): Promise<SearchHit[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const { data, error } = await publicClient().rpc("search_all", { q: trimmed, lim: limit });
  fail("search_all", error);

  const hits: SearchHit[] = ((data ?? []) as SearchRow[])
    .filter((row) => row.kind in HREF)
    .map((row) => ({
      kind: row.kind as SearchHit["kind"],
      id: row.id,
      title: row.title,
      href: (HREF[row.kind] as (slug: string) => string)(row.slug),
      snippet: row.snippet ?? "",
      rank: row.rank,
    }));

  const terms = normalise(trimmed).split(" ").filter(Boolean);
  for (const entry of glossary) {
    const title = normalise(entry.term);
    const short = normalise(entry.short);
    let rank = 0;
    for (const term of terms) {
      if (title.includes(term) || term.includes(title)) rank += 2;
      else if (short.includes(term)) rank += 0.5;
    }
    if (rank > 0) {
      hits.push({
        kind: "glossar",
        id: entry.slug,
        title: entry.term,
        href: `/glossar#${entry.slug}`,
        snippet: entry.short,
        rank,
      });
    }
  }

  return hits.sort((a, b) => b.rank - a.rank).slice(0, limit);
}

/* ==========================================================================
   Site wide figures for the trust rail
   ========================================================================== */

export async function getSiteFigures(): Promise<{
  reviewCount: number;
  softwareCount: number;
  categoryCount: number;
  lastCheckedAt: string;
}> {
  const [rows, reviews, categories] = await Promise.all([
    publishedSoftware(),
    visibleReviews(),
    getCategories(),
  ]);
  const dates = rows.map((s) => s.pricing_checked_at).filter((d): d is string => Boolean(d));
  return {
    reviewCount: reviews.length,
    softwareCount: rows.length,
    categoryCount: categories.length,
    lastCheckedAt: dates.sort().at(-1) ?? "",
  };
}
