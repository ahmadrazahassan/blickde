/**
 * GET /api/suche?q=...
 *
 * The same search the pages use, exposed for anything that cannot call a
 * server action. It reads through search_all() with the anonymous key, so it
 * can only ever return published rows.
 */

import { NextResponse, type NextRequest } from "next/server";

import { search } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limitParam = Number.parseInt(request.nextUrl.searchParams.get("limit") ?? "", 10);
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 50) : 20;

  if (q.length < 2) {
    return NextResponse.json(
      { treffer: [], hinweis: "Bitte geben Sie mindestens zwei Zeichen ein." },
      { status: 400 },
    );
  }

  try {
    const hits = await search(q, limit);
    return NextResponse.json(
      { treffer: hits },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
    );
  } catch (error: unknown) {
    console.error(`Suche fehlgeschlagen: ${error instanceof Error ? error.message : error}`);
    return NextResponse.json(
      { treffer: [], hinweis: "Die Suche ist derzeit nicht erreichbar." },
      { status: 503 },
    );
  }
}
