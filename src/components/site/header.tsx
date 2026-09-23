"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./brand";
import { IconSearch, IconMenu, IconClose, IconArrowRight } from "@/components/icons";
import { cx } from "@/components/ui/primitives";
import { SearchDialog } from "./search-dialog";
import type { SearchHit } from "@/lib/types";

const NAV = [
  { label: "Software", href: "/software" },
  { label: "Vergleich", href: "/vergleich" },
  { label: "Kategorien", href: "/kategorien" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "E-Rechnung", href: "/e-rechnung" },
];

/**
 * A floating bar that rides over the hero photograph, in the shape the client
 * asked for: one rounded white plate carrying the wordmark and the navigation,
 * a second rounded plate on the right carrying the one primary action.
 *
 * It keeps its shape on scroll. The only thing that changes is the shadow,
 * so the plate stays legible once it sits over white page content.
 */
export function Header({ searchAction }: { searchAction: (q: string) => Promise<SearchHit[]> }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60] focus:rounded-[12px] focus:bg-[var(--color-ink)] focus:px-4 focus:py-2.5 focus:text-[14px] focus:text-white"
      >
        Zum Inhalt springen
      </a>

      <header className={cx("inset-x-0 top-0 z-40 h-[68px] bg-transparent", pathname === "/" ? "absolute" : "relative")}>
        <div className="container-page h-full">
          <div className="grid h-full grid-cols-[1fr_auto] items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
              <Brand />

              <nav aria-label="Hauptnavigation" className="hidden lg:block">
                <ul className="flex items-center gap-1">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cx(
                          "inline-flex h-10 items-center rounded-[6px] px-3 text-[13px] font-medium transition-colors duration-200",
                          isActive(item.href)
                            ? "bg-[var(--color-accent-tint)] text-[var(--color-accent)]"
                            : "text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex size-10 items-center justify-center rounded-[6px] text-[var(--color-ink-2)] transition-colors hover:bg-[var(--color-paper-2)]" aria-label="Suche öffnen"><IconSearch size={18} /></button>
              <Link href="/kontakt" className="hidden h-9 items-center justify-center rounded-[5px] border border-[var(--color-rule)] px-4 text-[12px] font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-tint)] sm:inline-flex">Kontakt</Link>
              <Link
                href="/software-eintragen"
                className="gloss gloss-dark hidden h-9 items-center gap-2 rounded-[6px] bg-[var(--color-primary)] px-4 text-[12px] font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)] lg:inline-flex"
              >
                Software eintragen
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="inline-flex size-10 items-center justify-center rounded-[6px] border border-[var(--color-rule)] text-[var(--color-ink)] lg:hidden"
              >
                {menuOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
                <span className="sr-only">{menuOpen ? "Menü schließen" : "Menü öffnen"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-0 z-30 overflow-y-auto bg-white pt-24 lg:hidden"
        >
          <nav aria-label="Hauptnavigation, mobil" className="container-page pb-10">
            <ul className="flex flex-col gap-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "flex h-14 items-center rounded-[14px] px-4 text-[17px] font-medium transition-colors duration-200",
                      isActive(item.href)
                        ? "bg-[var(--color-accent-tint)] text-[var(--color-accent)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-[var(--color-rule)] pt-6">
              <Link
                href="/software-eintragen"
                className="gloss gloss-dark inline-flex h-12 items-center justify-center gap-2 rounded-[7px] bg-[var(--color-primary)] px-5 text-[15px] font-medium text-white"
              >
                Software eintragen
                <IconArrowRight size={16} />
              </Link>
              <Link
                href="/kontakt"
                className="gloss gloss-light inline-flex h-12 items-center justify-center rounded-[7px] bg-[var(--color-secondary)] px-5 text-[15px] font-medium text-[#07316f]"
              >
                Kontakt
              </Link>
            </div>
          </nav>
        </div>
      ) : null}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} searchAction={searchAction} />
    </>
  );
}
