/**
 * Seed the Supabase project from the editorial data in src/data.
 *
 *   npm run seed
 *
 * Idempotent. Every row carries a deterministic UUID derived from its slug, so
 * a second run updates in place instead of duplicating, and cross references
 * (a review pointing at a product, an article pointing at a slug) resolve
 * without a lookup table.
 *
 * Software rows hold real public information: names, vendor sites, published
 * list prices with the date checked. Reviews are fixtures and every one of them
 * is written with is_seed = TRUE. That flag is not decoration: RLS hides those
 * rows from the anonymous key and the ratings trigger excludes them from every
 * average. Presenting invented text as a genuine customer review is a
 * misleading commercial practice under Paragraph 5 UWG, and this is the line.
 */

import { createHash, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

import { categories } from "../src/data/categories";
import { software } from "../src/data/software";
import { reviews } from "../src/data/reviews";
import { articles } from "../src/data/articles";
import { comparisonVerdicts, siteSettings } from "../src/data/site";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY muessen gesetzt sein.",
  );
  process.exit(1);
}

const db = createClient(url, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/* ==========================================================================
   Deterministic identifiers
   ========================================================================== */

/** A fixed namespace, so the same slug always yields the same UUID. */
const NAMESPACE = "8f2c0a9e-5c1b-4f77-9a3d-0b4e6d2f1a58";

function uuidFor(kind: string, key: string): string {
  const hash = createHash("sha1").update(`${NAMESPACE}:${kind}:${key}`).digest();
  const bytes = Buffer.from(hash.subarray(0, 16));
  bytes[6] = ((bytes[6] as number) & 0x0f) | 0x50; // version 5
  bytes[8] = ((bytes[8] as number) & 0x3f) | 0x80; // RFC 4122 variant
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

const softwareUuid = (slug: string) => uuidFor("software", slug);
const articleUuid = (slug: string) => uuidFor("article", slug);
const reviewUuid = (localId: string) => uuidFor("review", localId);

/* Categories carry their real primary key in src/data/categories.ts, so the
   identifiers the interface looks up are the identifiers the database holds.
   The product files still reference the legacy identifier; it is resolved here
   and nowhere else. */
const categoryUuidByLegacyId = new Map(categories.map((c) => [c.legacy_id, c.id]));
const softwareSlugByLocalId = new Map(software.map((s) => [s.id, s.slug]));
const publishedSlugs = new Set(software.filter((s) => s.status === "published").map((s) => s.slug));

function chunk<T>(rows: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += size) out.push(rows.slice(i, i + size));
  return out;
}

async function upsert(table: string, rows: unknown[], conflict = "id") {
  for (const batch of chunk(rows, 100)) {
    const { error } = await db.from(table).upsert(batch, { onConflict: conflict });
    if (error) {
      throw new Error(`${table}: ${error.message}${error.details ? ` (${error.details})` : ""}`);
    }
  }
  console.log(`  ${table}: ${rows.length}`);
}

/* ==========================================================================
   Seeding
   ========================================================================== */

async function seedCategories() {
  await upsert(
    "categories",
    categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      description: c.description,
      display_order: c.display_order,
      // software_count is left alone: the trigger owns it.
    })),
  );
}

async function seedSoftware() {
  await upsert(
    "software",
    software.map((s) => {
      const categoryId = categoryUuidByLegacyId.get(s.category_id) ?? null;
      return {
        id: softwareUuid(s.slug),
        name: s.name,
        slug: s.slug,
        tagline: s.tagline,
        description_short: s.description_short,
        // Paragraphs, one blank line apart. The mapper splits them back.
        description_full: s.description_full.join("\n\n"),
        verdict: s.verdict,
        logo_url: s.logo_url,
        screenshots: s.screenshots,
        category_id: categoryId,
        starting_price: s.starting_price,
        price_currency: s.price_currency,
        billing_period: s.billing_period,
        free_trial: s.free_trial,
        free_version: s.free_version,
        pricing_plans: s.pricing_plans,
        price_includes_vat: s.price_includes_vat,
        pricing_checked_at: s.pricing_checked_at,
        trial_days: s.trial_days ?? null,
        promotion: s.promotion ?? null,
        demo: s.demo ?? null,
        features: s.features,
        top_features: s.top_features,
        integrations: s.integrations,
        de_compliance: s.de_compliance,
        faq: s.faq,
        affiliate_url: s.affiliate_url,
        affiliate_network: s.affiliate_network,
        vendor_website: s.vendor_website,
        vendor_name: s.vendor_name,
        founded_year: s.founded_year,
        support_types: s.support_types,
        countries_available: s.countries_available,
        languages: s.languages,
        meta_title: s.meta_title,
        meta_description: s.meta_description,
        status: s.status,
        featured: s.featured,
        // Explicit, so the editorial date survives. set_updated_at() only
        // stamps NOW() when the value was not supplied by the writer.
        updated_at: `${s.updated_at}T12:00:00Z`,
        // Ratings are deliberately absent from this payload. They are written
        // by update_software_ratings() and by nothing else, not even a seed.
      };
    }),
  );
}

async function seedAlternatives() {
  const rows = software.flatMap((s) =>
    s.alternatives
      .filter((slug) => publishedSlugs.has(slug) && slug !== s.slug)
      .map((slug, index) => ({
        software_id: softwareUuid(s.slug),
        alternative_id: softwareUuid(slug),
        display_order: index,
      })),
  );
  await upsert("software_alternatives", rows, "software_id,alternative_id");
}

async function seedReviews() {
  const rows = reviews
    .filter((r) => softwareSlugByLocalId.has(r.software_id))
    .map((r) => {
      const slug = softwareSlugByLocalId.get(r.software_id) as string;
      return {
        id: reviewUuid(r.id),
        software_id: softwareUuid(slug),
        reviewer_name: r.reviewer_name,
        reviewer_job_title: r.reviewer_job_title,
        reviewer_company: r.reviewer_company,
        reviewer_industry: r.reviewer_industry,
        reviewer_company_size: r.reviewer_company_size,
        reviewer_country: r.reviewer_country,
        verified_badge: r.verified_badge,
        used_for_duration: r.used_for_duration,
        overall_rating: r.overall_rating,
        ease_of_use: r.ease_of_use,
        value_for_money: r.value_for_money,
        customer_service: r.customer_service,
        functionality: r.functionality,
        review_title: r.review_title,
        summary: r.summary,
        pros: r.pros,
        cons: r.cons,
        vendor_response: r.vendor_response,
        vendor_response_date: r.vendor_response_date,
        review_date: r.review_date,
        helpful_count: r.helpful_count,
        status: r.status,
        // Not negotiable. Every fixture is flagged.
        is_seed: true,
      };
    });

  const unflagged = rows.filter((r) => r.is_seed !== true);
  if (unflagged.length > 0) {
    throw new Error("Abbruch: eine Fixture-Bewertung ohne is_seed = true.");
  }

  await upsert("reviews", rows);
}

async function seedArticles() {
  await upsert(
    "articles",
    articles.map((a) => {
      const first = a.related_software_slugs.find((slug) => publishedSlugs.has(slug));
      return {
        id: articleUuid(a.slug),
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        // Structured blocks as JSON. Walked by the renderer, never injected
        // as HTML, so there is no sanitising surface to get wrong.
        content: JSON.stringify(a.content),
        featured_image_url: a.featured_image_url,
        featured_image_alt: a.featured_image_alt,
        category_tag: a.category_tag,
        related_software_id: first ? softwareUuid(first) : null,
        related_software_slugs: a.related_software_slugs,
        author_name: a.author_name,
        author_bio: a.author_bio,
        author_title: a.author_title,
        meta_title: a.meta_title,
        meta_description: a.meta_description,
        read_time_minutes: a.read_time_minutes,
        status: a.status,
        featured: a.featured,
        published_date: a.published_date,
        updated_date: a.updated_date,
        updated_at: `${a.updated_date}T12:00:00Z`,
      };
    }),
  );
}

async function seedComparisons() {
  const rows = comparisonVerdicts
    .filter((v) => publishedSlugs.has(v.software_a) && publishedSlugs.has(v.software_b))
    .map((v) => ({
      id: uuidFor("comparison", v.pair),
      software_a_id: softwareUuid(v.software_a),
      software_b_id: softwareUuid(v.software_b),
      headline: v.headline,
      differences: v.differences,
      take_a: v.take_a,
      take_b: v.take_b,
      status: v.status,
    }));
  await upsert("comparisons", rows);
}

async function seedSiteSettings() {
  const flat: Record<string, string> = {
    "site.name": siteSettings.name,
    "site.wordmark": siteSettings.wordmark,
    "site.wordmark_suffix": siteSettings.wordmarkSuffix,
    "site.domain": siteSettings.domain,
    "site.url": siteSettings.url,
    "site.claim": siteSettings.claim,
    "operator.company": siteSettings.operator.company,
    "operator.street": siteSettings.operator.street,
    "operator.zip": siteSettings.operator.zip,
    "operator.city": siteSettings.operator.city,
    "operator.country": siteSettings.operator.country,
    "operator.email": siteSettings.operator.email,
    "editorial.name": siteSettings.editorialResponsible.name,
    "editorial.street": siteSettings.editorialResponsible.street,
    "editorial.zip": siteSettings.editorialResponsible.zip,
    "editorial.city": siteSettings.editorialResponsible.city,
    "authority.name": siteSettings.supervisoryAuthority.name,
    "authority.address": siteSettings.supervisoryAuthority.address,
    "privacy.policy_version": siteSettings.privacyPolicyVersion,
  };

  await upsert(
    "site_settings",
    Object.entries(flat).map(([key, value]) => ({
      id: uuidFor("setting", key),
      key,
      value,
      updated_at: new Date().toISOString(),
    })),
    "key",
  );
}

/** Reconnect existing articles after their software FK was nulled by deletion. */
async function relinkArticles() {
  const { data, error } = await db
    .from("articles")
    .select("id,related_software_id,related_software_slugs")
    .is("related_software_id", null);
  if (error) throw new Error(`articles: ${error.message}`);

  let linked = 0;
  for (const article of data ?? []) {
    const slugs = article.related_software_slugs;
    if (!Array.isArray(slugs)) continue;
    const first = slugs.find((slug): slug is string =>
      typeof slug === "string" && publishedSlugs.has(slug),
    );
    if (!first) continue;
    const result = await db
      .from("articles")
      .update({ related_software_id: softwareUuid(first) })
      .eq("id", article.id)
      .is("related_software_id", null);
    if (result.error) throw new Error(`articles ${article.id}: ${result.error.message}`);
    linked++;
  }
  console.log(`  article links: ${linked}`);
}

/* ==========================================================================
   Run
   ========================================================================== */

async function main() {
  console.log(`Seeding ${url}`);
  console.log(`Lauf-Kennung ${randomUUID()}`);

  if (process.argv.includes("--restore-software")) {
    await seedSoftware();
    await seedAlternatives();
    await seedReviews();
    await seedComparisons();
    await relinkArticles();
    console.log("Software restoration complete.");
    return;
  }

  await seedCategories();
  await seedSoftware();
  await seedAlternatives();
  await seedReviews();
  await seedArticles();
  await seedComparisons();
  await seedSiteSettings();

  // Read the aggregates back rather than asserting them: they are written by
  // triggers, so this is the only honest way to report what actually landed.
  const [{ count: softwareCount }, { count: reviewCount }, { count: seedCount }] =
    await Promise.all([
      db.from("software").select("id", { count: "exact", head: true }),
      db.from("reviews").select("id", { count: "exact", head: true }),
      db.from("reviews").select("id", { count: "exact", head: true }).eq("is_seed", true),
    ]);

  console.log("");
  console.log(`Software:    ${softwareCount}`);
  console.log(`Bewertungen: ${reviewCount} (davon ${seedCount} Fixtures)`);

  if (reviewCount !== seedCount) {
    console.log("Hinweis: es liegen echte Bewertungen vor. Der Seed hat sie nicht angefasst.");
  }
  console.log("Fertig.");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
