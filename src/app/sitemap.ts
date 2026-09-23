import type { MetadataRoute } from "next";
import { siteSettings } from "@/data/site";
import {
  getArticles,
  getCategories,
  getEditorialComparisons,
  getSoftwareList,
} from "@/lib/queries";

/**
 * Generated from the data layer, never hand written. A hand written sitemap
 * is wrong the day after someone adds a product.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteSettings.url;
  const [software, articles, categories, comparisons] = await Promise.all([
    getSoftwareList({ sort: "name" }),
    getArticles(),
    getCategories(),
    getEditorialComparisons(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/software`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/kategorien`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/vergleich`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/ratgeber`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/e-rechnung`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/glossar`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/ueber-uns`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/redaktionsrichtlinien`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/affiliate-hinweis`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/kontakt`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/presse`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/software-eintragen`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/newsletter`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/impressum`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/datenschutz`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-richtlinie`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/nutzungsbedingungen`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/barrierefreiheit`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const softwareRoutes: MetadataRoute.Sitemap = software.flatMap((item) => [
    {
      url: `${base}/software/${item.slug}`,
      lastModified: item.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}/software/${item.slug}/bewertungen`,
      lastModified: item.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${base}/software/${item.slug}/alternativen`,
      lastModified: item.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/kategorie/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/ratgeber/${article.slug}`,
    lastModified: article.updated_date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((v) => ({
    url: `${base}/vergleich/${v.pair}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...softwareRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...comparisonRoutes,
  ];
}
