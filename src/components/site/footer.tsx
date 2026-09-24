import Link from "next/link";
import Image from "next/image";
import { siteSettings } from "@/data/site";
import { Brand } from "./brand";
import { CookieSettingsButton } from "./consent-banner";

const columns = [
  { title: "Software", links: [["Alle Programme", "/software"], ["Buchhaltung", "/kategorie/buchhaltungssoftware"], ["Lohnabrechnung", "/kategorie/lohnabrechnung"], ["HR-Software", "/kategorie/hr-software"]] },
  { title: "Vergleichen", links: [["Direktvergleich", "/vergleich"], ["Kategorien", "/kategorien"], ["Bestbewertet", "/software?sortierung=note"], ["Software eintragen", "/software-eintragen"]] },
  { title: "Wissen", links: [["Ratgeber", "/ratgeber"], ["Glossar", "/glossar"], ["E-Rechnung", "/e-rechnung"], ["Newsletter", "/newsletter"]] },
  { title: "Softwareblick", links: [["Über uns", "/ueber-uns"], ["Redaktion", "/redaktionsrichtlinien"], ["Kontakt", "/kontakt"], ["Presse", "/presse"]] },
] as const;

export async function Footer() {
  return (
    <footer className="mt-auto overflow-hidden bg-[#191b1b] text-[#f7f7ed]">
      <div className="container-page pt-12 md:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-5 md:gap-x-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">{column.title}</h2>
              <ul className="mt-4 space-y-2.5 border-l border-white/12 pl-3">
                {column.links.map(([label, href]) => <li key={href}><Link href={href} className="text-[15px] leading-[1.3] text-white/80 transition-colors hover:text-[var(--color-secondary)]">{label}</Link></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Kontakt</h2>
            <div className="mt-4 border-l border-white/12 pl-3">
              <a href={`mailto:${siteSettings.operator.email}`} className="block break-all text-[14px] leading-[1.5] text-white/80 hover:text-white">{siteSettings.operator.email}</a>

              {/* Operator address with the flag, so a reader sees at a glance
                  that the editorial team sits in Germany. Everything here
                  comes from siteSettings and matches the Impressum exactly. */}
              <address className="mt-4 flex items-start gap-2.5 not-italic">
                <Image
                  src="/flags/de.svg"
                  alt="Flagge der Bundesrepublik Deutschland"
                  width={60}
                  height={40}
                  className="mt-0.5 h-5 w-[30px] shrink-0 rounded-[3px] object-cover ring-1 ring-white/25"
                />
                <span className="text-[12.5px] leading-[1.55] text-white/70">
                  <span className="block font-medium text-white/90">{siteSettings.operator.company}</span>
                  {siteSettings.operator.street}
                  <br />
                  <span data-numeric>{siteSettings.operator.zip}</span> {siteSettings.operator.city}
                  <br />
                  {siteSettings.operator.country}
                </span>
              </address>
              <Link href="/software" className="gloss gloss-dark mt-5 inline-flex min-h-9 items-center rounded-[7px] bg-[var(--color-primary)] px-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-white hover:bg-[var(--color-primary-hover)]">Software finden ↗</Link>
              <Link href="/kontakt" className="gloss gloss-light mt-2 inline-flex min-h-9 items-center rounded-[7px] bg-[var(--color-secondary)] px-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#07316f] hover:bg-[#bce7ff]">Kontakt ↗</Link>
              <ul className="mt-5 space-y-1.5 text-[11px] text-white/45">
                <li><Link href="/nutzungsbedingungen" className="hover:text-white">Nutzungsbedingungen</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
                <li><Link href="/barrierefreiheit" className="hover:text-white">Barrierefreiheit</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-b border-white/15 pb-4 md:mt-14 md:pb-7">
          <Brand inverse large />
        </div>
        <div className="flex flex-col gap-3 py-5 text-[11px] leading-[1.5] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteSettings.operator.company} · {siteSettings.operator.city}. <Link href="/affiliate-hinweis" className="hover:text-white">Affiliate-Hinweis</Link></p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <CookieSettingsButton className="!text-white/45 hover:!text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
