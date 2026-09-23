"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Software } from "@/lib/types";
import { SoftwareCard } from "@/components/ui/software";
import { cx } from "@/components/ui/primitives";
import { IconArrowRight } from "@/components/icons";
import { formatCount } from "@/lib/format";

interface Entry {
  item: Software;
  categorySlug: string;
}

const INITIAL_VISIBLE = 24;
const STEP = 12;

/**
 * The homepage software grid.
 *
 * Filtering happens on data that is already on the page, so switching a tab
 * costs nothing and the whole set stays available without JavaScript when the
 * component is server rendered on first paint.
 */
export function SoftwareGrid({
  software,
  categories,
}: {
  software: Entry[];
  categories: { slug: string; name: string; count: number }[];
}) {
  const [active, setActive] = useState<string>("alle");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(
    () => (active === "alle" ? software : software.filter((e) => e.categorySlug === active)),
    [active, software],
  );

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  function pick(slug: string) {
    setActive(slug);
    setVisible(INITIAL_VISIBLE);
  }

  return (
    <div>
      {/* Category tabs */}
      <div role="group" aria-label="Software nach Kategorie filtern" className="mx-auto flex max-w-[60rem] flex-wrap items-center justify-center gap-2">
        <FilterTab active={active === "alle"} onClick={() => pick("alle")} count={software.length}>
          Alle Programme
        </FilterTab>

        {categories.map((category) => (
          <FilterTab
            key={category.slug}
            active={active === category.slug}
            onClick={() => pick(category.slug)}
            count={category.count}
          >
            {category.name}
          </FilterTab>
        ))}
      </div>

      {/* Grid */}
      <ul className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((entry) => (
          <li key={entry.item.id}>
            <SoftwareCard item={entry.item} />
          </li>
        ))}
      </ul>

      {/* Count and the two ways onward */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <p data-numeric className="text-[13.5px] text-[var(--color-ink-3)]" aria-live="polite">
          {formatCount(shown.length)} von {formatCount(filtered.length)}{" "}
          {filtered.length === 1 ? "Programm" : "Programmen"} angezeigt
        </p>

        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          {remaining > 0 ? (
            <button
              type="button"
              onClick={() => setVisible((v) => v + STEP)}
              className="gloss gloss-light inline-flex min-h-12 items-center justify-center gap-2 rounded-[7px] bg-[var(--color-secondary)] px-6 py-2 text-center text-[15px] font-medium text-[#07316f] transition-colors duration-200 hover:bg-[#bce7ff]"
            >
              Weitere {formatCount(Math.min(remaining, STEP))} anzeigen
            </button>
          ) : null}

          <Link
            href="/software"
            className="gloss gloss-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-[7px] bg-[var(--color-accent)] px-6 py-2 text-center text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[var(--color-accent-hover)]"
          >
            Zur vollständigen Übersicht
            <IconArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FilterTab({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "inline-flex min-h-10 items-center gap-2 rounded-[6px] border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-200",
        active
          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_7px_18px_-12px_rgba(6,70,200,.8)]"
          : "border-[#d8e6f5] bg-[#f7faff] text-[var(--color-ink-2)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
      )}
    >
      {children}
      <span
        data-numeric
        className={cx(
          "inline-flex min-w-4 items-center justify-center text-[10px] font-semibold",
          active ? "text-white/75" : "text-[var(--color-ink-4)]",
        )}
      >
        {count}
      </span>
    </button>
  );
}
