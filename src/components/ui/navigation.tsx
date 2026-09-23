import Link from "next/link";
import { siteSettings } from "@/data/site";
import { IconChevronRight, IconArrowLeft, IconArrowRight } from "@/components/icons";
import { cx } from "./primitives";

/* ==========================================================================
   Breadcrumb, with its BreadcrumbList JSON-LD attached.
   ========================================================================== */

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Start", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteSettings.url}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Brotkrumennavigation" className="scroll-x">
        <ol className="flex items-center gap-1.5 whitespace-nowrap py-1 text-[13px]">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <IconChevronRight size={16} className="text-[var(--color-ink-4)]" />
                ) : null}
                {isLast ? (
                  <span aria-current="page" className="text-[var(--color-ink-3)]">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-red)]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

/* ==========================================================================
   Pagination
   ========================================================================== */

export function Pagination({
  page,
  totalPages,
  basePath,
  query = {},
}: {
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const href = (target: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value) params.set(key, value);
    }
    if (target > 1) params.set("seite", String(target));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav aria-label="Seitennavigation" className="flex items-center justify-between gap-4 pt-10">
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          rel="prev"
          className="inline-flex h-11 items-center gap-2 rounded-[6px] border border-[var(--color-rule)] px-4 text-[14px] text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-ink)]"
        >
          <IconArrowLeft size={16} />
          Zurück
        </Link>
      ) : (
        <span />
      )}

      <ol className="hidden items-center gap-1 md:flex">
        {pages.map((p, index) => {
          const previous = pages[index - 1];
          const gap = previous !== undefined && p - previous > 1;
          return (
            <li key={p} className="flex items-center gap-1">
              {gap ? (
                <span className="px-2 text-[var(--color-ink-4)]" aria-hidden="true">
                  …
                </span>
              ) : null}
              {p === page ? (
                <span
                  aria-current="page"
                  data-numeric
                  className="inline-flex size-11 items-center justify-center rounded-[6px] border border-[var(--color-ink)] bg-[var(--color-ink)] text-[14px] font-medium text-white"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={href(p)}
                  data-numeric
                  aria-label={`Seite ${p}`}
                  className="inline-flex size-11 items-center justify-center rounded-[6px] border border-transparent text-[14px] text-[var(--color-ink-2)] transition-colors duration-200 hover:border-[var(--color-rule)] hover:text-[var(--color-ink)]"
                >
                  {p}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {page < totalPages ? (
        <Link
          href={href(page + 1)}
          rel="next"
          className="inline-flex h-11 items-center gap-2 rounded-[6px] border border-[var(--color-rule)] px-4 text-[14px] text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-ink)]"
        >
          Weiter
          <IconArrowRight size={16} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

/* ==========================================================================
   FAQ accordion. Native details and summary, so it works without JavaScript
   and is keyboard operable for free.
   ========================================================================== */

export function FaqAccordion({
  items,
  className,
}: {
  items: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <div className={cx("border-t border-[var(--color-rule)]", className)}>
      {items.map((item, index) => (
        <details key={index} className="group border-b border-[var(--color-rule)]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[16px] font-medium leading-[1.45] text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-red)] [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--color-ink-4)] transition-transform duration-300 [transition-timing-function:var(--ease-editorial)] group-open:rotate-45"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="max-w-[48rem] pb-6 text-[15px] leading-[1.68] text-[var(--color-ink-2)]">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ==========================================================================
   Jump navigation used on comparison pages. Sticky, hairline bottom.
   ========================================================================== */

export function JumpNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="Abschnittsnavigation"
      className="sticky top-0 z-30 border-y border-[#35475a] bg-[var(--color-ink)] shadow-[0_10px_24px_-16px_rgba(23,44,60,.5)]"
    >
      <div className="container-page scroll-x">
        <ul className="flex items-center justify-center gap-1 whitespace-nowrap py-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="inline-flex h-9 items-center rounded-[6px] px-3 text-[12.5px] font-medium text-white/72 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
