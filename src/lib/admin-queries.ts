/**
 * Reads for the editorial back office.
 *
 * These use the service role, because the moderation queue exists precisely to
 * show what the public may not see: pending reviews, rejected reviews and
 * contact messages. Every caller is behind the middleware and re-checks the
 * session itself.
 */

import "server-only";

import { adminClient } from "@/lib/supabase/clients";

export interface PendingReview {
  id: string;
  software_name: string;
  software_slug: string;
  reviewer_name: string;
  reviewer_job_title: string | null;
  reviewer_company: string | null;
  reviewer_industry: string | null;
  reviewer_company_size: string | null;
  used_for_duration: string | null;
  overall_rating: number;
  ease_of_use: number | null;
  value_for_money: number | null;
  customer_service: number | null;
  functionality: number | null;
  review_title: string;
  summary: string | null;
  pros: string | null;
  cons: string | null;
  vendor_response: string | null;
  status: string;
  created_at: string;
  submitter_email: string | null;
  moderation_note: string | null;
  moderated_by: string | null;
  /** Another submission for the same product from the same hashed address. */
  duplicate_from_same_ip: boolean;
}

interface RawReview {
  id: string;
  software_id: string;
  reviewer_name: string;
  reviewer_job_title: string | null;
  reviewer_company: string | null;
  reviewer_industry: string | null;
  reviewer_company_size: string | null;
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
  status: string;
  created_at: string;
  submitter_email: string | null;
  submitter_ip_hash: string | null;
  moderation_note: string | null;
  moderated_by: string | null;
  software: { name: string; slug: string } | { name: string; slug: string }[] | null;
}

const nnum = (v: number | string | null): number | null =>
  v === null ? null : typeof v === "number" ? v : Number.parseFloat(v);

const REVIEW_SELECT = `
  id, software_id, reviewer_name, reviewer_job_title, reviewer_company,
  reviewer_industry, reviewer_company_size, used_for_duration,
  overall_rating, ease_of_use, value_for_money, customer_service, functionality,
  review_title, summary, pros, cons, vendor_response, status, created_at,
  submitter_email, submitter_ip_hash, moderation_note, moderated_by,
  software:software!reviews_software_id_fkey(name, slug)
`;

/**
 * The queue. Fixtures are excluded: a development fixture has nothing to
 * moderate, and offering an approve button next to one is an invitation to
 * publish invented text as a customer statement.
 */
export async function getReviewQueue(
  status: "pending" | "published" | "rejected" = "pending",
  limit = 50,
): Promise<PendingReview[]> {
  const db = adminClient();

  const { data, error } = await db
    .from("reviews")
    .select(REVIEW_SELECT)
    .eq("status", status)
    .eq("is_seed", false)
    .order("created_at", { ascending: status === "pending" })
    .limit(limit);

  if (error) throw new Error(`Moderationsliste: ${error.message}`);

  const rows = (data ?? []) as unknown as RawReview[];
  if (rows.length === 0) return [];

  // One extra read to answer the question the moderator actually has: has
  // this address already had its say about this product?
  const hashes = rows.map((r) => r.submitter_ip_hash).filter((h): h is string => Boolean(h));
  const seen = new Set<string>();

  if (hashes.length > 0) {
    const { data: others } = await db
      .from("reviews")
      .select("software_id, submitter_ip_hash")
      .in("submitter_ip_hash", hashes);

    const counts = new Map<string, number>();
    for (const row of (others ?? []) as { software_id: string; submitter_ip_hash: string }[]) {
      const key = `${row.software_id}:${row.submitter_ip_hash}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    for (const [key, count] of counts) if (count > 1) seen.add(key);
  }

  return rows.map((row) => {
    const product = Array.isArray(row.software) ? row.software[0] : row.software;
    return {
      id: row.id,
      software_name: product?.name ?? "Unbekanntes Produkt",
      software_slug: product?.slug ?? "",
      reviewer_name: row.reviewer_name,
      reviewer_job_title: row.reviewer_job_title,
      reviewer_company: row.reviewer_company,
      reviewer_industry: row.reviewer_industry,
      reviewer_company_size: row.reviewer_company_size,
      used_for_duration: row.used_for_duration,
      overall_rating: nnum(row.overall_rating) ?? 0,
      ease_of_use: nnum(row.ease_of_use),
      value_for_money: nnum(row.value_for_money),
      customer_service: nnum(row.customer_service),
      functionality: nnum(row.functionality),
      review_title: row.review_title,
      summary: row.summary,
      pros: row.pros,
      cons: row.cons,
      vendor_response: row.vendor_response,
      status: row.status,
      created_at: row.created_at,
      submitter_email: row.submitter_email,
      moderation_note: row.moderation_note,
      moderated_by: row.moderated_by,
      duplicate_from_same_ip: row.submitter_ip_hash
        ? seen.has(`${row.software_id}:${row.submitter_ip_hash}`)
        : false,
    };
  });
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: string;
  created_at: string;
}

export async function getContactMessages(limit = 25): Promise<ContactMessage[]> {
  const { data, error } = await adminClient()
    .from("contact_messages")
    .select("id,name,email,topic,message,status,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Nachrichten: ${error.message}`);
  return (data ?? []) as ContactMessage[];
}

export interface AdminFigures {
  pendingReviews: number;
  publishedReviews: number;
  rejectedReviews: number;
  newMessages: number;
  confirmedSubscribers: number;
  pendingSubscribers: number;
  publishedSoftware: number;
  draftSoftware: number;
  clicksLast30Days: number;
}

export async function getAdminFigures(): Promise<AdminFigures> {
  const db = adminClient();
  const count = (table: string) => db.from(table).select("id", { count: "exact", head: true });
  const since = new Date(Date.now() - 30 * 86400_000).toISOString();

  const [
    pending,
    published,
    rejected,
    messages,
    confirmed,
    pendingSubs,
    softwarePublished,
    softwareDraft,
    clicks,
  ] = await Promise.all([
    count("reviews").eq("status", "pending").eq("is_seed", false),
    count("reviews").eq("status", "published").eq("is_seed", false),
    count("reviews").eq("status", "rejected").eq("is_seed", false),
    count("contact_messages").eq("status", "new"),
    count("newsletter_subscribers").eq("status", "confirmed"),
    count("newsletter_subscribers").eq("status", "pending"),
    count("software").eq("status", "published"),
    count("software").eq("status", "draft"),
    count("affiliate_clicks").gte("created_at", since),
  ]);

  return {
    pendingReviews: pending.count ?? 0,
    publishedReviews: published.count ?? 0,
    rejectedReviews: rejected.count ?? 0,
    newMessages: messages.count ?? 0,
    confirmedSubscribers: confirmed.count ?? 0,
    pendingSubscribers: pendingSubs.count ?? 0,
    publishedSoftware: softwarePublished.count ?? 0,
    draftSoftware: softwareDraft.count ?? 0,
    clicksLast30Days: clicks.count ?? 0,
  };
}

export interface AuditEntry {
  id: string;
  table_name: string;
  record_id: string | null;
  action: string;
  actor: string | null;
  created_at: string;
}

export async function getRecentAudit(limit = 15): Promise<AuditEntry[]> {
  const { data, error } = await adminClient()
    .from("audit_log")
    .select("id,table_name,record_id,action,actor,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Protokoll: ${error.message}`);
  return (data ?? []) as AuditEntry[];
}
