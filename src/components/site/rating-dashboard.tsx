import Link from "next/link";
import { IconStar } from "@/components/icons";
import { formatGrade, formatReviewCount, reviewCountLabel } from "@/lib/format";
import type { Review, Software } from "@/lib/types";

type Distribution = { stars: number; count: number; share: number }[];

const DIMENSIONS = [
  ["Gesamtnote", "overall_rating"],
  ["Bedienung", "ease_of_use_rating"],
  ["Preis & Leistung", "value_for_money_rating"],
  ["Kundenbetreuung", "customer_service_rating"],
  ["Funktionen", "functionality_rating"],
] as const;

const SIZES = ["1 Person", "2 bis 9 Mitarbeitende", "10 bis 49 Mitarbeitende", "50 bis 249 Mitarbeitende", "250 und mehr Mitarbeitende"] as const;
const COLORS = ["#0646C8", "#3C74D9", "#69A8EB", "#9BD8FF", "#cbd9ea"];

export function RatingDashboard({ item, reviews, distribution }: { item: Software; reviews: Review[]; distribution: Distribution }) {
  const total = reviews.length;
  const sizeCounts = SIZES.map((size) => reviews.filter((review) => review.reviewer_company_size === size).length);
  const positive = distribution.filter((row) => row.stars >= 4).reduce((sum, row) => sum + row.count, 0);
  const neutral = distribution.find((row) => row.stars === 3)?.count ?? 0;
  const negative = total - positive - neutral;

  return <div className="mt-9 grid gap-2.5 rounded-[26px] bg-[#f5f7fb] p-2.5 text-left md:grid-cols-2">
    <div className="flex min-h-72 flex-col items-center justify-center rounded-[20px] border border-[#e2e8f1] bg-white p-7 text-center">
      <ScoreRing value={item.overall_rating} count={item.review_count} />
      <div className="mt-4 flex gap-0.5 text-[#3C74D9]" aria-hidden="true">{[1, 2, 3, 4, 5].map((number) => <IconStar key={number} size={18} filled={item.review_count > 0 && number <= Math.round(item.overall_rating)} />)}</div>
      <p className="mt-2 text-[13px] text-[var(--color-ink-3)]">{reviewCountLabel(item.review_count)}</p>
    </div>
    <div className="min-h-72 rounded-[20px] border border-[#e2e8f1] bg-white p-7">
      <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Verteilung der Sterne</h3>
      <div className="mt-5 space-y-3">{distribution.map((row) => <div key={row.stars} className="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-3 text-[13px]"><span className="text-[var(--color-ink-2)]">{row.stars} Sterne</span><div className="h-2 rounded-full bg-[#eef2f7]"><div className="h-full rounded-full bg-[#3C74D9]" style={{ width: `${Math.round(row.share * 100)}%` }} /></div><span data-numeric className="text-right font-semibold text-[var(--color-ink)]">{formatReviewCount(row.count)}</span></div>)}</div>
      <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-[#eef2f7]" aria-label={`${formatReviewCount(positive)} positive, ${formatReviewCount(neutral)} neutrale, ${formatReviewCount(negative)} kritische Bewertungen`}><span className="bg-[#0646C8]" style={{ width: `${total ? positive / total * 100 : 0}%` }} /><span className="bg-[#9BD8FF]" style={{ width: `${total ? neutral / total * 100 : 0}%` }} /><span className="bg-[#a7b2c0]" style={{ width: `${total ? negative / total * 100 : 0}%` }} /></div>
      <p className="mt-3 text-[12px] text-[var(--color-ink-3)]">Positiv {formatReviewCount(positive)} · Neutral {formatReviewCount(neutral)} · Kritisch {formatReviewCount(negative)}</p>
    </div>
    <div className="rounded-[20px] border border-[#e2e8f1] bg-white p-7">
      <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Bewertungen nach Kriterium</h3>
      <div className="mt-6 space-y-4">{DIMENSIONS.map(([label, key]) => { const score = item.review_count > 0 ? item[key] : 0; return <div key={key} className="grid grid-cols-[8.5rem_1fr_2rem] items-center gap-3 text-[13px]"><span className="text-[var(--color-ink-2)]">{label}</span><div className="h-2 rounded-full bg-[#eef2f7]"><div className="h-full rounded-full bg-[#3C74D9]" style={{ width: `${score / 5 * 100}%` }} /></div><span data-numeric className="text-right font-semibold text-[var(--color-ink)]">{formatGrade(score, item.review_count)}</span></div>; })}</div>
      <div className="mt-5 flex justify-between px-[8.5rem] text-[11px] text-[var(--color-ink-4)]"><span>0</span><span>2,5</span><span>5</span></div>
    </div>
    <div className="rounded-[20px] border border-[#e2e8f1] bg-white p-7">
      <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Unternehmensgröße der Bewertenden</h3>
      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row"><SizeDonut counts={sizeCounts} /><ul className="space-y-2">{SIZES.map((size, index) => <li key={size} className="flex items-center gap-2 text-[12px] text-[var(--color-ink-2)]"><span className="size-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />{size} <span data-numeric className="font-semibold text-[var(--color-ink)]">{formatReviewCount(sizeCounts[index] ?? 0)}</span></li>)}</ul></div>
      {total === 0 ? <p className="mt-5 text-[12px] leading-[1.5] text-[var(--color-ink-3)]">Die Diagramme füllen sich mit veröffentlichten Nutzerbewertungen. <Link href={`/software/${item.slug}/bewertungen/neu`} className="font-medium text-[var(--color-primary)] underline underline-offset-2">Erste Bewertung schreiben</Link></p> : null}
    </div>
  </div>;
}

export function ScoreRing({ value, count, small = false }: { value: number; count: number; small?: boolean }) {
  const radius = small ? 30 : 46;
  const size = small ? 76 : 116;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  return <div className="relative inline-flex items-center justify-center" role="img" aria-label={count > 0 ? `Note ${formatGrade(value, count)} von 5 aus ${reviewCountLabel(count)}` : "Noch keine Nutzerwertung"}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true"><circle cx={center} cy={center} r={radius} fill="none" stroke="#e8eef6" strokeWidth={small ? 6 : 7} />{count > 0 ? <circle cx={center} cy={center} r={radius} fill="none" stroke="#0646C8" strokeWidth={small ? 6 : 7} strokeLinecap="round" strokeDasharray={`${circumference * value / 5} ${circumference}`} transform={`rotate(-90 ${center} ${center})`} /> : null}</svg>
    <strong data-numeric className={`absolute font-[var(--font-display)] text-[var(--color-ink)] ${small ? "text-[17px]" : "text-[27px]"}`}>{formatGrade(value, count)}</strong>
  </div>;
}

export function PercentRing({ percent }: { percent: number | null }) {
  const circumference = 2 * Math.PI * 30;
  return <div className="relative inline-flex shrink-0 items-center justify-center" role="img" aria-label={percent === null ? "Noch keine Bewertungen" : `${percent} Prozent mit vier oder fünf Sternen`}><svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true"><circle cx="38" cy="38" r="30" fill="none" stroke="#e8eef6" strokeWidth="6" />{percent !== null && percent > 0 ? <circle cx="38" cy="38" r="30" fill="none" stroke="#0646C8" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${circumference * percent / 100} ${circumference}`} transform="rotate(-90 38 38)" /> : null}</svg><strong data-numeric className="absolute text-[16px] text-[var(--color-ink)]">{percent === null ? "—" : `${percent}%`}</strong></div>;
}

function SizeDonut({ counts }: { counts: number[] }) {
  const total = counts.reduce((sum, value) => sum + value, 0);
  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return <div className="relative shrink-0" role="img" aria-label={total ? `${formatReviewCount(total)} Bewertungen nach Unternehmensgröße` : "Noch keine Angaben zur Unternehmensgröße"}><svg width="136" height="136" viewBox="0 0 136 136" aria-hidden="true"><circle cx="68" cy="68" r={radius} fill="none" stroke="#e8eef6" strokeWidth="17" />{counts.map((count, index) => { const share = total ? count / total : 0; const dash = share * circumference; const segment = <circle key={SIZES[index]} cx="68" cy="68" r={radius} fill="none" stroke={COLORS[index]} strokeWidth="17" strokeDasharray={`${Math.max(0, dash - 3)} ${circumference}`} strokeDashoffset={-offset} transform="rotate(-90 68 68)" />; offset += dash; return segment; })}</svg><div className="absolute inset-0 flex flex-col items-center justify-center"><strong data-numeric className="text-[23px] text-[var(--color-ink)]">{total ? formatReviewCount(total) : "—"}</strong><span className="text-[10px] text-[var(--color-ink-3)]">Bewertende</span></div></div>;
}

export function ComparisonRatingDashboard({ a, b, reviewsA, reviewsB, distributionA, distributionB }: { a: Software; b: Software; reviewsA: Review[]; reviewsB: Review[]; distributionA: Distribution; distributionB: Distribution }) {
  const products = [{ item: a, reviews: reviewsA, distribution: distributionA }, { item: b, reviews: reviewsB, distribution: distributionB }];
  return <div className="mt-9 grid gap-2.5 rounded-[26px] bg-[#f5f7fb] p-2.5 text-left md:grid-cols-2">
    {products.map(({ item }) => <div key={item.id} className="flex items-center justify-center gap-6 rounded-[20px] border border-[#e2e8f1] bg-white p-7"><ScoreRing value={item.overall_rating} count={item.review_count} /><div><h3 className="text-[17px] font-semibold text-[var(--color-ink)]">{item.name}</h3><p className="mt-2 text-[13px] text-[var(--color-ink-3)]">{reviewCountLabel(item.review_count)}</p></div></div>)}
    <div className="rounded-[20px] border border-[#e2e8f1] bg-white p-7"><h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Bewertungskriterien</h3><div className="mt-6 space-y-5">{DIMENSIONS.map(([label, key]) => <div key={key}><p className="mb-2 text-[12px] font-medium text-[var(--color-ink-2)]">{label}</p>{products.map(({ item }, index) => <div key={item.id} className="mb-1.5 grid grid-cols-[5.5rem_1fr_2rem] items-center gap-2 text-[11px]"><span className="truncate text-[var(--color-ink-3)]">{item.name}</span><div className="h-2 rounded-full bg-[#eef2f7]"><div className={`h-full rounded-full ${index === 0 ? "bg-[#0646C8]" : "bg-[#69A8EB]"}`} style={{ width: `${item.review_count ? item[key] / 5 * 100 : 0}%` }} /></div><span data-numeric className="text-right font-semibold text-[var(--color-ink)]">{formatGrade(item[key], item.review_count)}</span></div>)}</div>)}</div></div>
    <div className="rounded-[20px] border border-[#e2e8f1] bg-white p-7"><h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Sterneverteilung</h3><div className="mt-6 space-y-7">{products.map(({ item, distribution }, index) => <div key={item.id}><p className="mb-3 text-[13px] font-medium text-[var(--color-ink)]">{item.name}</p><div className="space-y-2">{distribution.map((row) => <div key={row.stars} className="grid grid-cols-[3.5rem_1fr_1.5rem] items-center gap-2 text-[11px]"><span className="text-[var(--color-ink-3)]">{row.stars} Sterne</span><div className="h-2 rounded-full bg-[#eef2f7]"><div className={`h-full rounded-full ${index === 0 ? "bg-[#0646C8]" : "bg-[#69A8EB]"}`} style={{ width: `${row.share * 100}%` }} /></div><span data-numeric className="text-right text-[var(--color-ink)]">{formatReviewCount(row.count)}</span></div>)}</div></div>)}</div></div>
    <div className="rounded-[20px] border border-[#e2e8f1] bg-white p-7 md:col-span-2"><h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Unternehmensgröße der Bewertenden</h3><div className="mt-6 grid gap-6 md:grid-cols-2">{products.map(({ item, reviews }) => { const counts = SIZES.map((size) => reviews.filter((review) => review.reviewer_company_size === size).length); return <div key={item.id} className="flex items-center gap-5"><SizeDonut counts={counts} /><div><p className="mb-3 text-[13px] font-medium text-[var(--color-ink)]">{item.name}</p><ul className="space-y-1.5">{SIZES.map((size, index) => <li key={size} className="flex items-center gap-2 text-[11px] text-[var(--color-ink-3)]"><span className="size-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />{size}: <strong data-numeric className="text-[var(--color-ink)]">{counts[index]}</strong></li>)}</ul></div></div>; })}</div></div>
    {a.review_count === 0 && b.review_count === 0 ? <p className="px-4 pb-2 text-center text-[13px] text-[var(--color-ink-3)] md:col-span-2">Für beide Programme liegen noch keine veröffentlichten Bewertungen vor. Die Diagramme zeigen deshalb keine erfundenen Werte.</p> : null}
  </div>;
}

