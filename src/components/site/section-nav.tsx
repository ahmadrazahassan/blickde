"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components/ui/primitives";

/**
 * The profile rail on a software profile and on a comparison.
 *
 * It floats as a single pill that is only as wide as its tabs, centred under
 * the header. On a narrow screen it scrolls sideways inside the pill rather
 * than stretching across the viewport.
 */
export function SectionNav({
  items,
  label,
  contained = false,
}: {
  items: { id: string; label: string }[];
  label: string;
  contained?: boolean;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -72% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className={cx(
        "sticky top-2 z-30 flex justify-center px-4 py-2",
        !contained && "top-0 py-3",
      )}
    >
      {/* The plate. w-fit keeps it to the width of the tabs; max-w-full lets it
          scroll instead of overflowing once the labels no longer fit. */}
      <div className="scroll-x-bare w-fit max-w-full rounded-full border border-white/70 bg-white/85 p-1.5 shadow-[0_1px_2px_rgba(16,26,53,.06),0_18px_40px_-22px_rgba(16,26,53,.45)] backdrop-blur-xl backdrop-saturate-150">
        <ul className="flex items-center gap-1 whitespace-nowrap">
          {items.map((item) => {
            const current = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  className={cx(
                    "inline-flex h-9 items-center rounded-full px-3.5 text-[12.5px] font-medium tracking-[-0.005em]",
                    "transition-[background-color,color,box-shadow] duration-200",
                    "[transition-timing-function:var(--ease-editorial)]",
                    current
                      ? "gloss gloss-dark bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
