import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./navigation";
import { cx } from "./primitives";

/**
 * The standard page opening: breadcrumb, micro label, H1, lede.
 * Used by every route except the homepage.
 */
export function PageHeader({
  crumbs,
  micro,
  title,
  lede,
  meta,
  aside,
  size = "md",
  wide = false,
}: {
  crumbs: Crumb[];
  micro?: string;
  title: string;
  lede?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  size?: "md" | "lg";
  wide?: boolean;
}) {
  return (
    <header className="border-b border-[var(--color-rule)]">
      <div className={wide ? "container-wide" : "container-page"}>
        <div className="pt-6">
          <Breadcrumb items={crumbs} />
        </div>

        <div
          className={cx(
            "grid gap-8 pb-12 pt-8 md:pb-14",
            aside ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16" : "",
          )}
        >
          <div className="max-w-[54rem]">
            {micro ? <p className="t-micro text-[var(--color-ink-3)]">{micro}</p> : null}
            <h1 className={cx("mt-4", size === "lg" ? "t-display-1" : "t-display-2")}>{title}</h1>
            {lede ? <div className="t-lede mt-5 max-w-[64ch]">{lede}</div> : null}
            {meta ? <div className="mt-6">{meta}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </header>
  );
}

/** Running text pages: Impressum, Datenschutz, Über uns and the like. */
export function ProseSection({ children }: { children: ReactNode }) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="prose-editorial max-w-[44rem]">{children}</div>
      </div>
    </section>
  );
}

/** A definition list styled as hairline rows. Used across the legal pages. */
export function DataRows({
  rows,
  className,
  compact = false,
}: {
  rows: { label: string; value: ReactNode }[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <dl className={cx("border-t border-[var(--color-rule)]", className)}>
      {rows.map((row, index) => (
        <div
          key={index}
          className={cx("grid border-b border-[var(--color-rule)] py-3.5", compact ? "grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3" : "grid-cols-1 gap-1 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-6")}
        >
          <dt className="text-[13.5px] text-[var(--color-ink-3)]">{row.label}</dt>
          <dd className={cx("text-[14.5px] leading-[1.6] text-[var(--color-ink)]", compact && "break-words text-right")}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Honest empty state. Never a fake placeholder. */
export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-8">
      <h2 className="t-heading-3 text-[1.15rem]">{title}</h2>
      <div className="mt-2.5 max-w-[56ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
        {children}
      </div>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
