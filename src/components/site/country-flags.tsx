const FLAGS: Record<string, string> = { Deutschland: "/flags/de.svg", "Österreich": "/flags/at.svg", Schweiz: "/flags/ch.svg" };

export function CountryFlags({ countries, compact = false }: { countries: string[]; compact?: boolean }) {
  if (countries.length === 0) return null;
  return <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-3"}`} aria-label="Verfügbarkeit nach Ländern">{countries.map((country) => <span key={country} className="inline-flex items-center gap-1.5 rounded-[7px] border border-[#e2e8f1] bg-white px-2.5 py-1.5 text-[12px] text-[var(--color-ink-2)]">{FLAGS[country] ? <img src={FLAGS[country]} alt="" width={20} height={14} className="h-[14px] w-5 rounded-[2px] border border-black/10 object-cover" /> : null}{country}</span>)}</div>;
}
