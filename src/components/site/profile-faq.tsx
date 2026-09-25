"use client";

import { useState } from "react";
import { IconArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/ui/primitives";

type Faq = { question: string; answer: string };

function category(question: string) {
  if (/kost|preis|tarif|gratis|kostenlos/i.test(question)) return "Preise";
  if (/datev|steuer|rechnungspflicht|finanzamt|gobd|elster|deutsch/i.test(question)) return "Deutschland";
  if (/daten|hosting|server|sicherheit|datenschutz/i.test(question)) return "Datenschutz";
  return "Funktionen";
}

export function ProfileFaq({ items, productName }: { items: Faq[]; productName: string }) {
  const [active, setActive] = useState("Alle Fragen");
  const categories = ["Alle Fragen", ...Array.from(new Set(items.map((item) => category(item.question))))];
  const visible = active === "Alle Fragen" ? items : items.filter((item) => category(item.question) === active);

  return <div className="mt-9 grid gap-3 rounded-[26px] bg-[#f5f7fb] p-2.5 md:grid-cols-[13rem_1fr]">
    <div className="flex gap-1 overflow-x-auto p-1 md:flex-col" role="group" aria-label="Fragen filtern">
      {categories.map((entry) => <button key={entry} type="button" onClick={() => setActive(entry)} aria-pressed={active === entry} className={`shrink-0 rounded-[13px] px-4 py-3 text-left text-[13px] font-medium transition-colors ${active === entry ? "border border-[#e2e8f1] bg-white text-[var(--color-ink)] shadow-[0_8px_18px_-16px_rgba(23,44,60,.45)]" : "border border-transparent text-[var(--color-ink-3)] hover:text-[var(--color-primary)]"}`}>{entry}</button>)}
    </div>
    <div className="space-y-2.5">
      {visible.map((item, index) => <details key={item.question} className="group rounded-[18px] border border-[#e2e8f1] bg-white" open={index === 0 && active === "Alle Fragen" ? true : undefined}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">{item.question}<span aria-hidden="true" className="text-[20px] font-light text-[var(--color-ink-3)] group-open:rotate-45">+</span></summary><p className="border-t border-[#eef1f5] px-6 pb-6 pt-4 text-[14px] leading-[1.65] text-[var(--color-ink-2)]">{item.answer}</p></details>)}
      <div className="rounded-[18px] border border-[#e2e8f1] bg-white p-6"><span className="rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] text-[var(--color-ink-2)]">Kontakt</span><h3 className="mt-4 text-[19px] font-semibold text-[var(--color-ink)]">Noch eine Frage zu {productName}?</h3><p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Schreiben Sie uns, welche Angabe fehlt. Wir prüfen sie für Sie.</p><div className="mt-5"><ButtonLink href="/kontakt-zur-redaktion" variant="primary">Kontakt aufnehmen <IconArrowRight size={16} /></ButtonLink></div></div>
    </div>
  </div>;
}
