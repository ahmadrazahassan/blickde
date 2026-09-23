import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/* ==========================================================================
   Button.

   The sheen comes from the .gloss helpers in globals.css: flat inset
   hairlines plus one flat white veil across the top half. No gradient.
   ========================================================================== */

type ButtonVariant = "primary" | "accent" | "secondary" | "quiet" | "inverse" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_BASE =
  "gloss inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap " +
  "transition-[background-color,color,box-shadow,transform] duration-200 " +
  "[transition-timing-function:var(--ease-editorial)] active:translate-y-px " +
  "disabled:opacity-50 disabled:pointer-events-none select-none";

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: "gloss-dark bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
  accent: "gloss-dark bg-[var(--color-primary-hover)] text-white hover:bg-[var(--color-primary)]",
  secondary: "gloss-light bg-[var(--color-secondary)] text-[#07316f] hover:bg-[#bce7ff]",
  quiet:
    "bg-transparent text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]",
  inverse: "gloss-dark bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
  destructive:
    "gloss-light bg-white text-[var(--color-negative)] hover:bg-[var(--color-red-tint)]",
};

/* Tap targets stay at 44px minimum on the two larger sizes. */
const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13.5px] rounded-[6px]",
  md: "h-11 px-5 text-[14.5px] rounded-[7px]",
  lg: "h-13 px-7 text-[15.5px] rounded-[8px]",
};

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
}

export function Button({
  variant = "secondary",
  size = "md",
  block = false,
  className,
  ...props
}: ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(BUTTON_BASE, BUTTON_VARIANT[variant], BUTTON_SIZE[size], block && "w-full", className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "secondary",
  size = "md",
  block = false,
  className,
  href,
  external = false,
  children,
  ...props
}: ButtonOwnProps & { href: string; external?: boolean } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >) {
  const classes = cx(
    BUTTON_BASE,
    BUTTON_VARIANT[variant],
    BUTTON_SIZE[size],
    block && "w-full",
    className,
  );

  if (external) {
    return (
      <a className={classes} href={href} rel="nofollow sponsored noopener" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}

/* ==========================================================================
   Card
   ========================================================================== */

export function Card({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "article" | "li" | "section";
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cx("card-soft", className)}>{children}</Tag>;
}

export function LinkCard({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cx("group block card-soft card-hover", className)}>
      {children}
    </Link>
  );
}

/* ==========================================================================
   Badge
   ========================================================================== */

type BadgeTone = "neutral" | "ink" | "red" | "accent" | "positive" | "negative" | "gold";

const BADGE_TONE: Record<BadgeTone, string> = {
  neutral: "bg-[var(--color-paper-2)] text-[var(--color-ink-3)] border-[var(--color-rule)]",
  ink: "bg-[var(--color-ink)] text-white border-[var(--color-ink)]",
  red: "bg-[var(--color-red-tint)] text-[var(--color-red)] border-[var(--color-red-tint)]",
  accent: "bg-[var(--color-accent-tint)] text-[var(--color-accent)] border-[var(--color-accent-tint)]",
  positive: "bg-white text-[var(--color-positive)] border-[var(--color-positive)]",
  negative: "bg-white text-[var(--color-negative)] border-[var(--color-negative)]",
  /* A gold fill carries black ink only. Gold is never the text colour. */
  gold: "bg-[var(--color-gold-tint)] text-[var(--color-ink)] border-[var(--color-gold-tint)]",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-[8px] border px-2.5 py-[4px] text-[11px] font-medium uppercase tracking-[0.1em]",
        BADGE_TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* A softer, sentence case chip for categories and filters. */
export function Chip({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-[999px] border px-3 py-[5px] text-[12.5px] font-medium",
        BADGE_TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ==========================================================================
   Form fields. The label is always visible. A placeholder is not a label.
   ========================================================================== */

const FIELD_BASE =
  "w-full rounded-[12px] border border-[var(--color-rule)] bg-white px-3.5 text-[15px] text-[var(--color-ink)] " +
  "placeholder:text-[var(--color-ink-4)] transition-colors duration-200 " +
  "[transition-timing-function:var(--ease-editorial)] hover:border-[var(--color-ink-4)] " +
  "focus:border-[var(--color-accent)] focus:outline-none focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={htmlFor} className="text-[13.5px] font-medium text-[var(--color-ink)]">
        {label}
        {required ? (
          <span className="ml-1 text-[var(--color-red)]" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-[var(--color-ink-4)]">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-[13px] text-[var(--color-ink-3)]">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-[13px] text-[var(--color-negative)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(FIELD_BASE, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(FIELD_BASE, "min-h-28 py-2.5 leading-[1.6]", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cx(FIELD_BASE, "h-11 cursor-pointer appearance-none pr-9", className)} {...props}>
      {children}
    </select>
  );
}

export function Checkbox({
  label,
  id,
  className,
  ...props
}: { label: ReactNode; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex min-h-[44px] items-start gap-2.5 py-2.5 text-left">
      <input
        id={id}
        type="checkbox"
        className={cx(
          "mt-0.5 size-[18px] shrink-0 cursor-pointer rounded-[6px] border border-[var(--color-rule)] accent-[var(--color-accent)]",
          className,
        )}
        {...props}
      />
      <label htmlFor={id} className="cursor-pointer text-[14px] leading-[1.55] text-[var(--color-ink-2)]">
        {label}
      </label>
    </div>
  );
}

export function Radio({
  label,
  id,
  className,
  ...props
}: { label: ReactNode; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex min-h-[44px] items-start gap-2.5 py-2.5 text-left">
      <input
        id={id}
        type="radio"
        className={cx("mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[var(--color-accent)]", className)}
        {...props}
      />
      <label htmlFor={id} className="cursor-pointer text-[14px] leading-[1.55] text-[var(--color-ink-2)]">
        {label}
      </label>
    </div>
  );
}

/* ==========================================================================
   Section scaffolding. Centred by default, because that is the register the
   rest of the page is set in now.
   ========================================================================== */

export function SectionHead({
  step,
  micro,
  title,
  lede,
  action,
  align = "center",
  className,
}: {
  step?: string;
  micro?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centred = align === "center";

  return (
    <div className={cx(centred ? "flex flex-col items-center text-center" : "text-left", className)}>
      {step ? (
        <div className={cx("flex flex-col items-center gap-2", centred ? "" : "items-start")}>
          <span data-numeric className="text-[12px] tracking-[0.2em] text-[var(--color-ink-4)]">
            {step}
          </span>
          <span aria-hidden="true" className="block h-6 w-px bg-[var(--color-rule)]" />
        </div>
      ) : null}

      {micro ? (
        <p className={cx("t-micro text-[var(--color-ink-3)]", step ? "mt-3" : "")}>{micro}</p>
      ) : null}

      <h2 className={cx("t-display-2 mt-4", centred ? "max-w-[20ch]" : "max-w-[24ch]")}>{title}</h2>

      {lede ? (
        <div className={cx("t-lede mt-4", centred ? "max-w-[62ch]" : "max-w-[58ch]")}>{lede}</div>
      ) : null}
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}

export function SrOnly({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
