"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { IconSearch, IconClose, IconArrowRight } from "@/components/icons";
import { cx } from "@/components/ui/primitives";
import type { SearchHit } from "@/lib/types";

const KIND_LABEL: Record<SearchHit["kind"], string> = {
  software: "Software",
  article: "Ratgeber",
  category: "Kategorie",
  glossar: "Glossar",
};

const SUGGESTIONS = [
  "Buchhaltung",
  "E-Rechnung",
  "DATEV",
  "Lohnabrechnung",
  "GoBD",
  "Kleinunternehmer",
];

export function SearchDialog({
  open,
  onClose,
  searchAction,
}: {
  open: boolean;
  onClose: () => void;
  searchAction: (q: string) => Promise<SearchHit[]>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [active, setActive] = useState(0);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(timer);
    }
    setQuery("");
    setHits([]);
    setActive(0);
    return undefined;
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setHits([]);
      return undefined;
    }
    const timer = setTimeout(() => {
      startTransition(async () => {
        const results = await searchAction(query);
        setHits(results.slice(0, 8));
        setActive(0);
      });
    }, 160);
    return () => clearTimeout(timer);
  }, [query, searchAction]);

  if (!open) return null;

  function go(href: string) {
    onClose();
    router.push(href);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, hits.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const hit = hits[active];
      if (hit) go(hit.href);
      else if (query.trim()) go(`/suche?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Suche schließen"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(16,16,20,0.4)]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Website durchsuchen"
        onKeyDown={onKeyDown}
        className="relative mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-[40rem] overflow-hidden rounded-[12px] border border-[var(--color-rule)] bg-white shadow-[var(--shadow-over)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-4">
          <IconSearch size={20} className="shrink-0 text-[var(--color-ink-3)]" />
          <label htmlFor="site-search" className="sr-only">
            Software, Ratgeber und Fachbegriffe durchsuchen
          </label>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Software, Ratgeber oder Fachbegriff"
            autoComplete="off"
            className="h-14 w-full border-0 bg-transparent text-[16px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-4)]"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-[4px] text-[var(--color-ink-3)] transition-colors duration-200 hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
          >
            <IconClose size={18} />
            <span className="sr-only">Schließen</span>
          </button>
        </div>

        <div className="max-h-[min(28rem,60vh)] overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="p-4">
              <p className="t-micro px-1 text-[var(--color-ink-3)]">Häufig gesucht</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-[4px] border border-[var(--color-rule)] px-2.5 py-1.5 text-[13px] text-[var(--color-ink-2)] transition-colors duration-200 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : hits.length === 0 ? (
            <p className="px-4 py-8 text-center text-[14px] text-[var(--color-ink-3)]">
              {pending ? "Wird gesucht …" : `Nichts gefunden zu „${query}“.`}
            </p>
          ) : (
            <ul>
              {hits.map((hit, index) => (
                <li key={`${hit.kind}-${hit.id}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(hit.href)}
                    className={cx(
                      "flex w-full items-start gap-3 border-b border-[var(--color-rule)] px-4 py-3.5 text-left transition-colors duration-200",
                      index === active ? "bg-[var(--color-paper-2)]" : "bg-white",
                    )}
                  >
                    <span className="mt-[3px] w-[4.5rem] shrink-0 text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-4)]">
                      {KIND_LABEL[hit.kind]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium text-[var(--color-ink)]">
                        {hit.title}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[13px] leading-[1.5] text-[var(--color-ink-3)]">
                        {hit.snippet}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {query.trim().length >= 2 ? (
          <button
            type="button"
            onClick={() => go(`/suche?q=${encodeURIComponent(query.trim())}`)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-[14px] text-[var(--color-ink-2)] transition-colors duration-200 hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
          >
            Alle Treffer zu „{query.trim()}“ anzeigen
            <IconArrowRight size={18} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
