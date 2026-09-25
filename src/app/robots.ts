import type { MetadataRoute } from "next";
import { siteSettings } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* Search result pages and the review form carry no indexable content
           and would otherwise produce endless parameter variants. */
        disallow: ["/software-und-wissen-durchsuchen", "/api/", "/software-newsletter-anmelden/newsletter-abmelden"],
      },
    ],
    sitemap: `${siteSettings.url}/sitemap.xml`,
    host: siteSettings.url,
  };
}
