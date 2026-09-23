import type { Software } from "./types";

/**
 * Where a "zum Anbieter" button points.
 *
 * A product without a commission agreement gets a plain link straight to the
 * vendor: no intermediate server, no counting, no recognition feature. There is
 * nothing to disclose and nothing to measure, so adding a hop would cost the
 * visitor a redirect and buy nobody anything.
 *
 * A product with a commission agreement goes through /go/[slug], which records
 * the click and forwards. That measurement is disclosed in the privacy policy
 * and in the affiliate notice, and the row holds the product, the page the
 * visitor came from and a salted hash of the address, never the address.
 */
export function vendorHref(item: Software, sourcePath?: string): string {
  if (!item.affiliate_url) return item.vendor_website;
  const from = sourcePath ? `?von=${encodeURIComponent(sourcePath)}` : "";
  return `/go/${item.slug}${from}`;
}

/** True when this product's outbound link is a paid placement link. */
export function isPaidLink(item: Software): boolean {
  return item.affiliate_url !== null;
}
