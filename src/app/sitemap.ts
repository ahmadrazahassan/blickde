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
    { url: `${base}/unternehmenssoftware-vergleichen`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/software-kategorien`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/software-im-direktvergleich`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/ratgeber-fuer-unternehmenssoftware`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/e-rechnung-fuer-unternehmen`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/software-fachbegriffe-erklaert`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/ueber-softwareblick-und-unsere-mission`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/redaktionelle-richtlinien-und-pruefprozess`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/bewertungsmethodik-fuer-software`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/transparenz-zu-affiliate-links`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/kontakt-zur-redaktion`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/presse-und-medieninformationen`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/softwareprodukt-zur-pruefung-einreichen`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/software-newsletter-anmelden`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/anbieterkennzeichnung-und-impressum`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/datenschutzerklaerung-und-privatsphaere`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-richtlinie-und-einstellungen`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/nutzungsbedingungen-der-website`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/erklaerung-zur-barrierefreiheit`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const softwareRoutes: MetadataRoute.Sitemap = software.flatMap((item) => [
    {
      url: `${base}/unternehmenssoftware-vergleichen/${item.slug}`,
      lastModified: item.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}/unternehmenssoftware-vergleichen/${item.slug}/erfahrungen-und-bewertungen`,
      lastModified: item.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${base}/unternehmenssoftware-vergleichen/${item.slug}/vergleichbare-alternativen`,
      lastModified: item.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/software-kategorien/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/ratgeber-fuer-unternehmenssoftware/${article.slug}`,
    lastModified: article.updated_date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((v) => ({
    url: `${base}/software-im-direktvergleich/${v.pair}`,
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
