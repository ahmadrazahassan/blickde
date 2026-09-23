import type { Metadata } from "next";
import Link from "next/link";
import { getSoftwareList } from "@/lib/queries";
import { categoryById } from "@/data/categories";
import { formatPrice, reviewCountLabel } from "@/lib/format";
import { Breadcrumb } from "@/components/ui/navigation";
import { ComparisonSelector } from "@/components/site/forms";
import { SoftwareLogo } from "@/components/ui/software";
import { CountryFlags } from "@/components/site/country-flags";
import { IconArrowRight } from "@/components/icons";
import type { Software } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Software vergleichen",
  description: "Software für deutsche Unternehmen vergleichen. Preise, Funktionen, Schnittstellen und rechtliche Anforderungen direkt nebeneinander.",
  alternates: { canonical: "/vergleich" },
};

const PAIRS = [
  { a: "sage-active", b: "lexware-office", line: "Cloudbuchhaltung für kleine Teams mit oder ohne integrierte Lohnabrechnung." },
  { a: "sage-hr-payroll", b: "personio", line: "Personalverwaltung mit integrierter Lohnabrechnung oder HR Plattform mit Partnern." },
  { a: "sage-50", b: "lexware-office", line: "Lokale Buchhaltung mit Fachhändler oder eine Anwendung im Browser?" },
  { a: "sage-50", b: "collmex", line: "Zwei Wege zur doppelten Buchführung mit sehr unterschiedlicher Einführung." },
  { a: "sage-50", b: "datev-unternehmen-online", line: "Eigene Buchhaltung und die Zusammenarbeit mit der Kanzlei im Vergleich." },
  { a: "sage-50", b: "buchhaltungsbutler", line: "Vollständige Buchhaltung oder automatisierte Belegverarbeitung?" },
  { a: "sage-50-handwerk", b: "weclapp", line: "Handwerksabläufe mit Aufmaß gegen breit angelegte Warenwirtschaft." },
  { a: "sage-50-handwerk", b: "xentral", line: "Baustellenkalkulation und Versandprozesse haben verschiedene Schwerpunkte." },
  { a: "sage-lohnabrechnung", b: "lexware-lohn-gehalt", line: "Persönliche Betreuung durch Fachhändler oder ein fester Softwaretarif?" },
  { a: "sage-lohnabrechnung", b: "datev-lohn-und-gehalt", line: "Lohnabrechnung im eigenen Betrieb oder enger Kanzleiprozess?" },
  { a: "sage-lohnabrechnung", b: "personio", line: "Entgeltabrechnung und Personalverwaltung lösen unterschiedliche Aufgaben." },
  { a: "lexware-office", b: "sevdesk", line: "Zwei Browserlösungen für die laufende Buchhaltung kleiner Betriebe." },
  { a: "personio", b: "factorial", line: "Personalverwaltung für verschiedene Betriebsgrößen und Arbeitsabläufe." },
  { a: "weclapp", b: "xentral", line: "Zwei deutsche Warenwirtschaftssysteme mit unterschiedlichem Schwerpunkt." },
] as const;

export default async function ComparisonHubPage({ searchParams }: { searchParams: Promise<{ a?: string; b?: string }> }) {
  const query = await searchParams;
  const all = await getSoftwareList({ sort: "name" });
  const bySlug = new Map(all.map((item) => [item.slug, item]));
  const options = all.map((item) => ({ slug: item.slug, name: item.name, category: categoryById(item.category_id)?.name ?? "Weitere" }));
  const selected = PAIRS.map((pair) => ({ ...pair, left: bySlug.get(pair.a), right: bySlug.get(pair.b) })).filter((pair): pair is typeof pair & { left: Software; right: Software } => Boolean(pair.left && pair.right));

  return <>
    <div className="container-wide pt-6"><Breadcrumb items={[{ label: "Vergleich", href: "/vergleich" }]} /></div>
    <header className="container-page pb-10 pt-10 text-center md:pb-14 md:pt-14">
      <span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">Direktvergleich</span>
      <h1 className="t-display-1 mx-auto mt-5 max-w-[16ch]">Software direkt <span className="text-[var(--color-primary)]">vergleichen.</span></h1>
      <p className="t-lede mx-auto mt-5 max-w-[54ch]">Zwei Programme auswählen und die Angaben prüfen, die für den eigenen Betrieb zählen: Funktionen, Preise, Schnittstellen und deutsche Pflichten.</p>
    </header>

    <section aria-labelledby="eigener-vergleich" className="mx-auto w-[calc(100%-2rem)] max-w-[72rem] rounded-[26px] bg-[#f5f7fb] p-3 sm:p-5">
      <div className="mb-4 text-center"><h2 id="eigener-vergleich" className="t-micro text-[var(--color-ink-3)]">Eigenen Vergleich erstellen</h2></div>
      <ComparisonSelector options={options} defaultA={options.find((item) => item.slug === query.a)?.slug ?? "sage-50"} defaultB={options.find((item) => item.slug === query.b)?.slug ?? "lexware-office"} compact />
    </section>

    <section className="mx-auto w-[calc(100%-2rem)] max-w-[72rem] pb-20 pt-20">
      <div className="text-center"><span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">Häufige Vergleiche</span><h2 className="t-display-2 mt-4">Womit Unternehmen ihre Auswahl eingrenzen</h2><p className="mx-auto mt-4 max-w-[60ch] text-[14px] leading-[1.65] text-[var(--color-ink-3)]">Einige Paarungen vergleichen denselben Arbeitsablauf. Andere machen sichtbar, ob ein Unternehmen zunächst die richtige Produktart sucht.</p></div>
      <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{selected.map((pair) => <CompareCard key={`${pair.a}-${pair.b}`} a={pair.left} b={pair.right} line={pair.line} />)}</div>
      <p className="mt-8 text-center text-[13px] leading-[1.6] text-[var(--color-ink-3)]">Für Programme ohne veröffentlichte Nutzerbewertungen zeigen wir keine künstlichen Noten. Alle Vergleiche verwenden die Angaben aus den jeweiligen Produktprofilen.</p>
    </section>
  </>;
}

function CompareCard({ a, b, line }: { a: Software; b: Software; line: string }) {
  const metrics = [
    { label: "Bestätigte Funktionen", a: confirmedFeatures(a), b: confirmedFeatures(b) },
    { label: "Geprüfte Angaben für Deutschland", a: confirmedGermanFacts(a), b: confirmedGermanFacts(b) },
    { label: "Genannte Integrationen", a: a.integrations.length, b: b.integrations.length },
  ];
  return <Link href={`/vergleich/${a.slug}-vs-${b.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e2e8f1] bg-white transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#b8d0f5] hover:shadow-[0_20px_38px_-30px_rgba(6,70,200,.45)]">
    <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 p-5 text-center"><ProductMini item={a} /><span className="mt-8 rounded-[7px] bg-[var(--color-ink)] px-2 py-1 text-[11px] font-semibold text-white">oder</span><ProductMini item={b} /></div>
    <p className="min-h-12 px-5 text-center text-[12px] leading-[1.5] text-[var(--color-ink-3)]">{line}</p>
    <div className="mt-4 space-y-4 border-t border-[#e9edf3] px-5 py-5">{metrics.map((metric) => <MiniMetric key={metric.label} {...metric} />)}</div>
    <div className="mt-auto flex items-center justify-center gap-2 border-t border-[#e9edf3] px-5 py-4 text-[13px] font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)]">Vergleich ansehen <IconArrowRight size={16} /></div>
  </Link>;
}

function ProductMini({ item }: { item: Software }) {
  return <div className="flex min-w-0 flex-col items-center"><SoftwareLogo item={item} size={40} /><span className="mt-2 line-clamp-2 min-h-9 text-[12px] font-semibold leading-[1.35] text-[var(--color-ink)]">{item.name}</span><span className="mt-1 text-[11px] text-[var(--color-ink-3)]">{item.review_count ? reviewCountLabel(item.review_count) : "Noch keine Note"}</span><span className="mt-2 text-[11px] font-medium text-[var(--color-ink)]">{item.starting_price === null ? "Preis auf Anfrage" : item.starting_price === 0 ? "Kostenlos" : `Ab ${formatPrice(item.starting_price)}`}</span><CountryFlags countries={item.countries_available.filter((country) => country === "Deutschland").slice(0, 1)} compact /></div>;
}

function MiniMetric({ label, a, b }: { label: string; a: number; b: number }) {
  const max = Math.max(a, b, 1);
  return <div><p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">{label}</p><div className="grid grid-cols-[1rem_1fr_1fr_1rem] items-center gap-2"><span data-numeric className="text-[11px] font-semibold text-[var(--color-ink)]">{a}</span><div className="h-1.5 rounded-full bg-[#eef2f7]"><div className="ml-auto h-full rounded-full bg-[#0646C8]" style={{ width: `${a / max * 100}%` }} /></div><div className="h-1.5 rounded-full bg-[#eef2f7]"><div className="h-full rounded-full bg-[#69A8EB]" style={{ width: `${b / max * 100}%` }} /></div><span data-numeric className="text-right text-[11px] font-semibold text-[var(--color-ink)]">{b}</span></div></div>;
}

function confirmedFeatures(item: Software) { return item.features.flatMap((group) => group.items).filter((feature) => feature.available === true).length; }
function confirmedGermanFacts(item: Software) { return Object.values(item.de_compliance).filter((value) => value === true).length; }
