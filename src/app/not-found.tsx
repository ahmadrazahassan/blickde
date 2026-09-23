import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/primitives";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  { label: "Alle geprüften Programme", href: "/software" },
  { label: "Kategorien im Überblick", href: "/kategorien" },
  { label: "Zwei Programme vergleichen", href: "/vergleich" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "E-Rechnungspflicht", href: "/e-rechnung" },
  { label: "Glossar", href: "/glossar" },
];

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-[44rem]">
          <p data-numeric className="t-micro text-[var(--color-ink-3)]">
            Fehler 404
          </p>
          <h1 className="t-display-2 mt-4">Diese Seite gibt es nicht</h1>
          <p className="t-lede mt-5">
            Möglicherweise haben wir die Adresse geändert, oder ein Eintrag wurde entfernt. Über die
            Suche finden Sie in der Regel schneller, was Sie gesucht haben.
          </p>

          <form action="/suche" method="get" role="search" className="mt-8 flex max-w-[32rem] gap-2.5">
            <div className="flex-1">
              <label htmlFor="nf-q" className="sr-only">
                Suchbegriff
              </label>
              <input
                id="nf-q"
                name="q"
                type="search"
                placeholder="Software, Ratgeber oder Fachbegriff"
                className="h-11 w-full rounded-[6px] border border-[var(--color-rule)] bg-white px-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors duration-200 placeholder:text-[var(--color-ink-4)] hover:border-[var(--color-ink-4)] focus:border-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-red)]"
              />
            </div>
            <button
              type="submit"
              className="gloss gloss-dark inline-flex h-11 shrink-0 items-center rounded-[6px] bg-[var(--color-primary)] px-4 text-[14.5px] font-medium text-white transition-colors duration-200 hover:bg-[var(--color-primary-hover)]"
            >
              Suchen
            </button>
          </form>

          <div className="mt-12 border-t border-[var(--color-rule)] pt-8">
            <h2 className="t-micro text-[var(--color-ink-3)]">Häufig gesucht</h2>
            <ul className="mt-4 grid gap-1 sm:grid-cols-2">
              {SUGGESTIONS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                  >
                    {item.label}
                    <IconArrowRight size={16} className="text-[var(--color-ink-4)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <ButtonLink href="/" variant="secondary">
              Zur Startseite
            </ButtonLink>
          </div>

          <p className="mt-8 text-[13.5px] leading-[1.6] text-[var(--color-ink-3)]">
            Sind Sie über einen Link von außerhalb hierher gekommen?{" "}
            <Link href="/kontakt" className="link-red">
              Sagen Sie uns Bescheid
            </Link>
            , dann richten wir eine Weiterleitung ein.
          </p>
        </div>
      </div>
    </section>
  );
}
