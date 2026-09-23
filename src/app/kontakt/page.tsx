import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/data/site";
import { PageHeader } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";
import { ContactForm } from "@/components/site/forms";
import {
  IconArrowRight,
  IconAudit,
  IconBuilding,
  IconLock,
  IconMail,
  IconPackage,
  IconReview,
} from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Korrekturen zu einem Softwareprofil, Anfragen als Anbieter, Presseanfragen und Auskunftsersuchen nach Art. 15 DSGVO. Redaktion in Magdeburg.",
  alternates: { canonical: "/kontakt" },
};

/* Die drei Anliegen, die tatsächlich ankommen. Jede Karte sagt, was wir
   brauchen, damit die Antwort nicht aus einer Rückfrage besteht. */
const ANLIEGEN = [
  {
    icon: IconAudit,
    title: "Korrektur an einem Profil",
    text: "Der häufigste und hilfreichste Fall. Nennen Sie Produktname, die betroffene Angabe und möglichst die Seite, auf der es anders steht. Dann prüfen wir die Quelle nach und ändern den Eintrag mit Änderungsdatum.",
    hint: "Produktname, Angabe, Quelle",
  },
  {
    icon: IconPackage,
    title: "Anfrage als Anbieter",
    text: "Sie möchten ein Programm eintragen lassen oder eine veraltete Angabe richtigstellen. Beides ist kostenlos und beides verändert weder Note noch Platzierung.",
    hint: "Aufnahme und Korrekturen",
    link: { label: "Was wir aufnehmen", href: "/software-eintragen" },
  },
  {
    icon: IconReview,
    title: "Frage zu einer Bewertung",
    text: "Sie halten eine veröffentlichte Bewertung für unzutreffend oder möchten wissen, wie sie zustande gekommen ist. Wie wir Bewertungen prüfen und kennzeichnen, steht in den Redaktionsrichtlinien.",
    hint: "Prüfung nach § 5b Abs. 3 UWG",
    link: { label: "Redaktionsrichtlinien", href: "/redaktionsrichtlinien" },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Kontakt", href: "/kontakt" }]}
        micro="Kontakt"
        title="Schreiben Sie uns"
        lede="Am hilfreichsten sind Korrekturhinweise zu einem Profil. Nennen Sie Produktname, betroffene Angabe und möglichst eine Quelle, dann können wir sofort nachprüfen und müssen nicht zurückfragen."
        meta={
          <a
            href={`mailto:${siteSettings.operator.email}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 py-2 text-[14px] font-medium text-[var(--color-ink-2)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
          >
            <IconMail size={18} className="text-[var(--color-ink-4)]" />
            {siteSettings.operator.email}
          </a>
        }
      />

      {/* ----------------------------------------------------------- Anliegen */}
      <section className="section-tight border-b border-[var(--color-rule)] bg-[var(--color-paper-2)]">
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-3">
            {ANLIEGEN.map((anliegen) => {
              const Icon = anliegen.icon;
              return (
                <li key={anliegen.title}>
                  <Card className="flex h-full flex-col p-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[var(--color-accent-tint)] text-[var(--color-accent)]">
                      <Icon size={20} />
                    </span>

                    <h2 className="mt-5 text-[16.5px] font-semibold leading-[1.28] tracking-[-0.015em] text-[var(--color-ink)]">
                      {anliegen.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-[var(--color-ink-2)]">
                      {anliegen.text}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--color-rule)] pt-4">
                      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink-4)]">
                        {anliegen.hint}
                      </span>
                      {anliegen.link ? (
                        <Link
                          href={anliegen.link.href}
                          className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-[var(--color-accent)] transition-colors duration-200 hover:text-[var(--color-accent-hover)]"
                        >
                          {anliegen.link.label}
                          <IconArrowRight size={16} />
                        </Link>
                      ) : null}
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- Formular */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <h2 className="t-display-2 text-[1.8rem]">Nachricht an die Redaktion</h2>
              <p className="t-lede mt-3.5 max-w-[56ch]">
                Das Formular öffnet Ihr eigenes E-Mail-Programm mit einem vorbereiteten Text.
                Abgeschickt wird die Nachricht erst dort von Ihnen. Auf dieser Website wird nichts
                davon gespeichert.
              </p>

              <div className="mt-9">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:sticky lg:top-[89px] lg:self-start">
              <div className="flex flex-col gap-5">
                <Card className="p-6">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Anschrift</h2>

                  <div className="mt-4 flex items-start gap-3">
                    <Image
                      src="/flags/de.svg"
                      alt="Flagge der Bundesrepublik Deutschland"
                      width={60}
                      height={40}
                      className="mt-0.5 h-5 w-[30px] shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
                    />
                    <address className="text-[14.5px] not-italic leading-[1.6] text-[var(--color-ink-2)]">
                      <span className="block font-semibold text-[var(--color-ink)]">
                        {siteSettings.operator.company}
                      </span>
                      {siteSettings.operator.street}
                      <br />
                      <span data-numeric>{siteSettings.operator.zip}</span>{" "}
                      {siteSettings.operator.city}
                      <br />
                      {siteSettings.operator.country}
                    </address>
                  </div>

                  <a
                    href={`mailto:${siteSettings.operator.email}`}
                    className="mt-5 flex items-center gap-2.5 border-t border-[var(--color-rule)] pt-4 text-[14px] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                  >
                    <IconMail size={18} className="shrink-0 text-[var(--color-ink-4)]" />
                    <span className="break-all">{siteSettings.operator.email}</span>
                  </a>

                  <p className="mt-4 flex items-start gap-2.5 text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
                    <IconBuilding size={16} className="mt-0.5 shrink-0 text-[var(--color-ink-4)]" />
                    <span>
                      Die vollständige Anbieterkennzeichnung nach § 5 DDG steht im{" "}
                      <Link href="/impressum" className="link-red">
                        Impressum
                      </Link>
                      .
                    </span>
                  </p>
                </Card>

                <Card className="p-6">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Wie schnell wir antworten</h2>
                  <dl className="mt-4 border-t border-[var(--color-rule)]">
                    {[
                      ["Korrektur an einem Profil", "meist am nächsten Werktag"],
                      ["Anbieter und Presse", "innerhalb weniger Werktage"],
                      ["Auskunft nach Art. 15 DSGVO", "innerhalb eines Monats"],
                    ].map(([label, wert]) => (
                      <div
                        key={label}
                        className="grid grid-cols-1 gap-0.5 border-b border-[var(--color-rule)] py-3"
                      >
                        <dt className="text-[13.5px] text-[var(--color-ink-2)]">{label}</dt>
                        <dd className="text-[13px] text-[var(--color-ink-3)]">{wert}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-[12.5px] leading-[1.6] text-[var(--color-ink-3)]">
                    Die ersten beiden Angaben sind Erfahrungswerte, keine zugesicherte Frist. Die
                    Monatsfrist für Auskunftsersuchen ergibt sich aus Art. 12 Abs. 3 DSGVO.
                  </p>
                </Card>

                <Card className="p-6">
                  <h2 className="t-micro text-[var(--color-ink-3)]">Datenschutz</h2>
                  <p className="mt-3 flex items-start gap-2.5 text-[13.5px] leading-[1.65] text-[var(--color-ink-2)]">
                    <IconLock size={18} className="mt-0.5 shrink-0 text-[var(--color-ink-4)]" />
                    <span>
                      Auskunft, Berichtigung und Löschung nach Art. 15 bis 17 DSGVO beantragen Sie
                      formlos über dieses Formular oder per E-Mail. Einzelheiten stehen in der{" "}
                      <Link href="/datenschutz" className="link-red">
                        Datenschutzerklärung
                      </Link>
                      .
                    </span>
                  </p>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
