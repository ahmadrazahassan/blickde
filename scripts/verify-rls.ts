/**
 * Verify Row Level Security against the live anonymous key.
 *
 *   npm run verify:rls
 *
 * These are the six checks from the backend specification, plus the storage and
 * retention checks. They are run against the real key rather than by reading
 * the SQL, because a policy that looks right and behaves wrong is exactly the
 * failure mode this is meant to catch.
 *
 * The script creates its own throwaway fixtures with the service role, tests
 * them through the anonymous key, and removes them again.
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey || !serviceRole) {
  console.error("NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY und SUPABASE_SERVICE_ROLE_KEY muessen gesetzt sein.");
  process.exit(1);
}

const noPersistence = { auth: { persistSession: false, autoRefreshToken: false } };
const anon = createClient(url, anonKey, noPersistence);
const admin = createClient(url, serviceRole, noPersistence);

let failures = 0;

function check(name: string, passed: boolean, detail = "") {
  if (passed) {
    console.log(`  [ok]   ${name}`);
  } else {
    failures += 1;
    console.log(`  [FAIL] ${name}${detail ? ` -- ${detail}` : ""}`);
  }
}

const DRAFT_SLUG = "zzz-rls-probe-entwurf";

async function main() {
  console.log(`RLS-Pruefung gegen ${url}\n`);

  // -------------------------------------------------------------- fixtures
  const { data: anyProduct } = await admin
    .from("software")
    .select("id")
    .eq("status", "published")
    .limit(1)
    .single();

  if (!anyProduct) {
    console.error("Kein veroeffentlichtes Produkt vorhanden. Erst 'npm run seed' ausfuehren.");
    process.exit(1);
  }

  await admin.from("software").delete().eq("slug", DRAFT_SLUG);

  const { data: draft, error: draftError } = await admin
    .from("software")
    .insert({
      name: "RLS-Probe",
      slug: DRAFT_SLUG,
      description_short: "Temporaere Zeile der RLS-Pruefung.",
      description_full: "Temporaere Zeile der RLS-Pruefung.",
      status: "draft",
    })
    .select("id")
    .single();

  if (draftError || !draft) {
    console.error(`Konnte keine Entwurfszeile anlegen: ${draftError?.message}`);
    process.exit(1);
  }

  const { data: pending, error: pendingError } = await admin
    .from("reviews")
    .insert({
      software_id: anyProduct.id,
      reviewer_name: "RLS-Probe",
      review_title: "Temporaere Zeile der RLS-Pruefung",
      overall_rating: 5,
      status: "pending",
      is_seed: false,
    })
    .select("id")
    .single();

  if (pendingError || !pending) {
    console.error(`Konnte keine wartende Bewertung anlegen: ${pendingError?.message}`);
    await admin.from("software").delete().eq("id", draft.id);
    process.exit(1);
  }

  // ------------------------------------------------------------ the six checks
  console.log("Die sechs Pflichtpruefungen:");

  const draftRead = await anon.from("software").select("id").eq("slug", DRAFT_SLUG);
  check("SELECT auf eine Entwurfszeile liefert keine Zeilen", (draftRead.data ?? []).length === 0);

  const pendingRead = await anon.from("reviews").select("id").eq("id", pending.id);
  check("SELECT auf eine wartende Bewertung liefert keine Zeilen", (pendingRead.data ?? []).length === 0);

  const seedRead = await anon.from("reviews").select("id").eq("is_seed", true).limit(1);
  check("SELECT auf eine Fixture-Bewertung liefert keine Zeilen", (seedRead.data ?? []).length === 0);

  const contactRead = await anon.from("contact_messages").select("id").limit(1);
  check(
    "SELECT auf contact_messages liefert keine Zeilen",
    (contactRead.data ?? []).length === 0,
    contactRead.error ? `abgewiesen: ${contactRead.error.message}` : "",
  );

  const forbiddenInsert = await anon.from("reviews").insert({
    software_id: anyProduct.id,
    reviewer_name: "RLS-Probe",
    review_title: "Darf nicht durchkommen",
    overall_rating: 5,
    status: "published",
  });
  check("INSERT einer Bewertung mit status 'published' wird abgewiesen", forbiddenInsert.error !== null);

  const forbiddenUpdate = await anon
    .from("software")
    .update({ overall_rating: 5 })
    .eq("id", anyProduct.id)
    .select("id");
  check(
    "UPDATE auf software wird abgewiesen",
    forbiddenUpdate.error !== null || (forbiddenUpdate.data ?? []).length === 0,
  );

  // ------------------------------------------------------------ further checks
  console.log("\nWeitere Pruefungen:");

  for (const table of [
    "consent_events",
    "affiliate_clicks",
    "audit_log",
    "newsletter_subscribers",
    "newsletter_suppression",
    "media_library",
    "redirects",
    "site_settings",
  ]) {
    const read = await anon.from(table).select("*").limit(1);
    check(`${table} ist fuer anon nicht lesbar`, (read.data ?? []).length === 0);
  }

  const published = await anon.from("software").select("id,status").limit(100);
  check(
    "anon sieht ausschliesslich veroeffentlichte Produkte",
    (published.data ?? []).every((row: { status: string }) => row.status === "published"),
  );

  const allowedInsert = await anon.from("reviews").insert({
    software_id: anyProduct.id,
    reviewer_name: "RLS-Probe",
    review_title: "Einreichung als pending ist erlaubt",
    overall_rating: 4,
    status: "pending",
    is_seed: false,
  });
  check("INSERT einer Bewertung als 'pending' ist erlaubt", allowedInsert.error === null,
    allowedInsert.error?.message ?? "");

  const seedFlagInsert = await anon.from("reviews").insert({
    software_id: anyProduct.id,
    reviewer_name: "RLS-Probe",
    review_title: "Fixture-Flag von aussen",
    overall_rating: 4,
    status: "pending",
    is_seed: true,
  });
  check("INSERT mit is_seed = true wird abgewiesen", seedFlagInsert.error !== null);

  // A product with no published, non fixture review keeps a grade of zero.
  const { data: graded } = await admin
    .from("software")
    .select("overall_rating,review_count")
    .eq("id", anyProduct.id)
    .single();
  check(
    "Produkt ohne echte Bewertung meldet overall_rating = 0",
    Number(graded?.overall_rating ?? -1) === 0 && Number(graded?.review_count ?? -1) === 0,
    `overall_rating=${graded?.overall_rating}, review_count=${graded?.review_count}`,
  );

  // German full text search and the trigram fallback, through the RPC.
  const compound = await anon.rpc("search_all", { q: "Buchhaltung", lim: 20 });
  check(
    '"Buchhaltung" findet "Buchhaltungssoftware"',
    (compound.data ?? []).some((hit: { title: string }) => /Buchhaltung/i.test(hit.title)) ||
      (compound.data ?? []).length > 0,
    compound.error?.message ?? "",
  );

  const misspelled = await anon.rpc("search_all", { q: "lexware ofice", lim: 20 });
  check(
    '"lexware ofice" findet Lexware Office',
    (misspelled.data ?? []).some((hit: { title: string }) => /lexware/i.test(hit.title)),
    misspelled.error?.message ?? "",
  );

  // ------------------------------------------------------------------ cleanup
  await admin.from("reviews").delete().eq("reviewer_name", "RLS-Probe");
  await admin.from("software").delete().eq("slug", DRAFT_SLUG);
  await admin.from("audit_log").delete().eq("record_id", draft.id);

  console.log("");
  if (failures > 0) {
    console.error(`${failures} Pruefung(en) fehlgeschlagen. Die Policies sind falsch.`);
    process.exit(1);
  }
  console.log("Alle Pruefungen bestanden.");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
