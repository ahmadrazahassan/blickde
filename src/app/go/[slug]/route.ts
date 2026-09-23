/**
 * Outbound link to a vendor: record the click, then redirect.
 *
 * A GET rather than a POST, so the link degrades to an ordinary anchor and
 * works without JavaScript. The row holds the product, the page the visitor
 * came from and a salted hash of the address. It never holds the address, and
 * it is deleted after fourteen months by purge_expired_data().
 *
 * The redirect target is read from the database and never from the query
 * string, so this cannot be used as an open redirect.
 */

import { NextResponse, type NextRequest } from "next/server";

import { adminClient, publicClient } from "@/lib/supabase/clients";
import { hashClientIp } from "@/lib/security";
import { serverEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  const { slug } = await context.params;

  const { data: product } = await publicClient()
    .from("software")
    .select("id,affiliate_url,vendor_website")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!product) {
    return NextResponse.redirect(new URL("/software", serverEnv.siteUrl), 302);
  }

  const target: string | null = product.affiliate_url || product.vendor_website || null;
  if (!target || !/^https:\/\//i.test(target)) {
    return NextResponse.redirect(new URL(`/software/${slug}`, serverEnv.siteUrl), 302);
  }

  // Counting happens only for a product that actually has a commission
  // agreement. The privacy policy says a plain vendor link is not counted, and
  // that has to stay true even when someone calls this route by hand for a
  // product whose link the interface would never route through here.
  if (product.affiliate_url) {
    // Only the path of an internal referrer is kept, so a query string
    // carrying something personal never reaches the click log.
    const from = request.nextUrl.searchParams.get("von");
    const sourcePath = from && from.startsWith("/") ? from.split("?")[0]?.slice(0, 200) : null;

    try {
      await adminClient().from("affiliate_clicks").insert({
        software_id: product.id,
        source_path: sourcePath ?? null,
        ip_hash: await hashClientIp(),
      });
    } catch (error: unknown) {
      // A click that cannot be counted is still a click the visitor asked for.
      console.error(
        `Klick auf ${slug} nicht protokolliert: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  return NextResponse.redirect(target, 302);
}
