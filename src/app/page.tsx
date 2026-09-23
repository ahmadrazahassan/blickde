import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getCategories,
  getTopRated,
  getArticles,
  getFeaturedReviews,
  getSiteFigures,
  getSoftwareList,
} from "@/lib/queries";
import { categoryById } from "@/data/categories";
import { siteSettings } from "@/data/site";
import { formatCount, formatDate, formatReviewCount } from "@/lib/format";
import { ButtonLink, SectionHead, Card } from "@/components/ui/primitives";
import { TopRatedCard, PriceDisclaimer } from "@/components/ui/software";
import { HeroSearch, NewsletterForm, ComparisonSelector } from "@/components/site/forms";
import { ReviewMarquee } from "@/components/site/review-marquee";
import { ComparisonPairs } from "@/components/site/comparison-pairs";
import { SoftwareGrid } from "@/components/site/software-grid";
import { IconArrowRight, IconReview, IconLedger, IconCalendar, IconCheck } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${siteSettings.name}: Unternehmenssoftware unabhängig geprüft`,
  description:
    "Buchhaltung, Lohn, HR, CRM und ERP für den deutschen Mittelstand. Geprüfte Preise mit Datum, GoBD, DATEV, ELSTER und E-Rechnung, in einer Übersicht.",
  alternates: { canonical: "/" },
};

const HERO_CHIPS = [
  { label: "Buchhaltung", href: "/kategorie/buchhaltungssoftware" },
  { label: "Lohnabrechnung", href: "/kategorie/lohnabrechnung" },
  { label: "HR-Software", href: "/kategorie/hr-software" },
  { label: "CRM", href: "/kategorie/crm-software" },
  { label: "ERP", href: "/kategorie/erp-software" },
];

export default async function HomePage() {
  const [
    categories,
    allSoftware,
    topRated,
    guides,
    reviewWall,
    figures,
  ] = await Promise.all([
    getCategories(),
    getSoftwareList({ sort: "rating" }),
    getTopRated(4),
    getArticles(6),
    getFeaturedReviews(12),
    getSiteFigures(),
  ]);

  const gridCategories = categories
    .filter((c) => c.software_count > 0)
    .map((c) => ({ slug: c.slug, name: c.name, count: c.software_count }));
  const homepageOrder = ["sage-active", "lexware-office", "sage-operations", "sevdesk", "sage-lohnabrechnung", "sage-hr"];
  const homepageSoftware = [...allSoftware].sort((a, b) => {
    const rankA = homepageOrder.indexOf(a.slug);
    const rankB = homepageOrder.indexOf(b.slug);
    return (rankA < 0 ? 999 : rankA) - (rankB < 0 ? 999 : rankB);
  });
  const sageSpotlight = ["sage-active", "sage-hr"]
    .map((slug) => allSoftware.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => item !== undefined)
    .filter((item) => item.review_count > 0 && !topRated.some((rated) => rated.id === item.id));

  return (
    <>
      {/* ==================================================== 1. Hero ==== */}
      <section className="relative isolate overflow-hidden bg-[#fbfaf6]">
        {/* Reichstagsgebäude, hinter einem flachen weißen Schleier gehalten.
            Ein deutsches Motiv, weil die gesamte Aussage der Seite der
            deutsche Markt ist. */}
        <Image
          src="/new-hero-image.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-center opacity-[0.22]"
        />
        <div aria-hidden="true" className="absolute inset-0 z-0 bg-white/55" />
        <div className="container-page relative z-10">
          <div className="flex min-h-[640px] flex-col items-center justify-center pb-24 pt-40 text-center md:min-h-[710px] md:pb-28 md:pt-44">
            <p className="inline-flex items-center gap-2 rounded-[5px] border border-[var(--color-rule)] bg-white/80 px-3 py-1 text-[12px] font-medium text-[var(--color-ink-2)]"><Image src="/flags/de.svg" alt="Deutschland" width={18} height={12} className="h-3 w-[18px] rounded-[2px] object-cover" /> Unabhängige Orientierung für Unternehmen</p>

            <h1 className="t-display-1 mt-7 max-w-[18ch] text-[var(--color-ink)]">
              Unternehmenssoftware, geprüft für den deutschen Mittelstand
            </h1>

            <p className="t-lede mt-6 max-w-[56ch] text-[var(--color-ink-2)]">
              Wir prüfen Preise, Funktionsumfang und die deutschen Pflichten: GoBD, ELSTER, DATEV und
              die E-Rechnungspflicht. Was wir nicht bestätigen konnten, steht auch so da.
            </p>

            <div className="mt-10 flex w-full justify-center">
              <HeroSearch chips={HERO_CHIPS} />
            </div>

            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13.5px] text-[var(--color-ink-2)]">
              {[
                `${formatCount(figures.softwareCount)} Programme im Bestand`,
                `${formatReviewCount(figures.reviewCount)} Bewertungen veröffentlicht`,
                "Keine gekauften Platzierungen",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <IconCheck size={16} className="text-[var(--color-red)]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================== 2. Trust rail ==== */}
      <section aria-labelledby="kennzahlen" className="border-b border-[var(--color-rule)]">
        <h2 id="kennzahlen" className="sr-only">
          Kennzahlen der Redaktion
        </h2>
        <div className="container-page">
          <dl className="grid grid-cols-1 gap-px overflow-hidden py-4 sm:grid-cols-2 lg:grid-cols-4">
            <Figure
              icon={<IconLedger size={20} />}
              value={formatCount(figures.softwareCount)}
              label="Programme im Bestand"
              note={`Verteilt auf ${formatCount(figures.categoryCount)} Kategorien`}
            />
            <Figure
              icon={<IconReview size={20} />}
              value={formatReviewCount(figures.reviewCount)}
              label="veröffentlichte Bewertungen"
              note="Erfahrungen von Nutzerinnen und Nutzern"
              className="sm:border-l sm:border-[var(--color-rule)]"
            />
            <Figure
              icon={<IconCalendar size={20} />}
              value={figures.lastCheckedAt ? formatDate(figures.lastCheckedAt) : "Offen"}
              label="letzte Preisprüfung"
              note={
                figures.lastCheckedAt
                  ? `Zuletzt geprüft am ${formatDate(figures.lastCheckedAt)}`
                  : "Laufend aktualisiert"
              }
              className="lg:border-l lg:border-[var(--color-rule)]"
            />
            <Figure icon={<IconCheck size={20} />} value="4 Jahre" label="unabhängige Tests" note="Erfahrung aus redaktioneller Arbeit" className="sm:border-l sm:border-[var(--color-rule)]" />
          </dl>
        </div>
      </section>

      {/* ============================================ 3. Software ======== */}
      <section id="software" className="section scroll-mt-24 bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-[48rem] text-center">
            <p className="t-micro text-[var(--color-red)]"><span data-numeric className="mr-3 text-[14px]">01</span>Der Bestand</p>
            <h2 className="t-display-2 mt-5">Software finden, die zu Ihrem Betrieb passt.</h2>
            <p className="t-lede mt-5">{formatCount(allSoftware.length)} Programme im Überblick. Vergleichen Sie Einstiegspreise, Bewertungen und bestätigte Angaben zu deutschen Pflichten.</p>
          </div>
          {/* Preise ändern sich. Der Hinweis steht direkt am Bestand, nicht
              versteckt im Kleingedruckten. */}
          <div className="mx-auto mt-8 max-w-[62ch]">
            <PriceDisclaimer checkedAt={figures.lastCheckedAt || null} className="justify-center text-center" />
          </div>

          <div className="mt-10">
            <SoftwareGrid
              software={homepageSoftware.map((item) => ({
                item,
                categorySlug: categoryById(item.category_id)?.slug ?? "",
              }))}
              categories={gridCategories}
            />
          </div>
        </div>
      </section>

      {/* ============================================ 4. Comparison ====== */}
      <section className="border-y border-[var(--color-rule)] bg-[#f8f8f4] py-14 md:py-16">
        <div className="container-page">
          <SectionHead
            micro="Direktvergleich"
            title="Zwei Programme. Ein klarer Vergleich."
            lede="Wählen Sie zwei Programme aus dem gesamten Bestand."
          />
          <div className="mt-8">
            <ComparisonSelector compact options={allSoftware.map((item) => ({ slug: item.slug, name: item.name, category: categoryById(item.category_id)?.name ?? "Software" }))} defaultA="sage-active" defaultB="lexware-office" />
          </div>
          <ComparisonPairs software={allSoftware} />
        </div>
      </section>

      {/* ============================================ 5. Top rated ======= */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-[48rem] text-center">
            <p className="t-micro text-[var(--color-red)]"><span data-numeric className="mr-3 text-[14px]">03</span>Bestbewertet</p><h2 className="t-display-2 mt-5">Die Favoriten der Anwender.</h2>
            <p className="t-lede mt-5">Die Rangfolge entsteht aus veröffentlichten Bewertungen in vier Dimensionen. Jedes Ergebnis lässt sich bis zum Produktprofil nachvollziehen.</p>
          </div>

          {topRated.length === 0 ? (
            <Card className="mx-auto mt-12 max-w-[46rem] rounded-[10px] border-[var(--color-rule)] p-9 text-center md:p-12">
              <p aria-hidden="true" className="font-[var(--font-display)] text-[4rem] font-semibold leading-none tracking-[-0.05em] text-[var(--color-accent)]">— / 5</p>
              <h3 className="mt-5 text-[20px] font-semibold">Die Rangliste wächst mit echten Erfahrungen.</h3>
              <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">Noch liegen keine veröffentlichten Bewertungen vor. Sobald sie geprüft sind, erscheinen die bestbewerteten Programme hier.</p>
            </Card>
          ) : (
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {topRated.map((item, index) => (
                <li key={item.id}>
                  <TopRatedCard item={item} rank={index + 1} />
                </li>
              ))}
            </ul>
          )}

          {sageSpotlight.length > 0 ? (
            <div className="mx-auto mt-10 max-w-[70rem] border-t border-[var(--color-rule)] pt-8">
              <div className="text-center"><p className="t-micro text-[var(--color-primary)]">Weitere Nutzerstimmen</p><h3 className="mt-3 text-[21px] font-semibold text-[var(--color-ink)]">Sage Programme im Blick</h3><p className="mx-auto mt-2 max-w-[58ch] text-[13px] leading-[1.6] text-[var(--color-ink-3)]">Diese Programme zeigen wir ergänzend. Ihre Noten und Bewertungszahlen stammen ebenfalls aus veröffentlichten Nutzerbewertungen.</p></div>
              <ul className="mx-auto mt-6 grid max-w-[35rem] gap-5 sm:max-w-none sm:grid-cols-2 lg:max-w-[35rem] lg:grid-cols-2">{sageSpotlight.map((item) => <li key={item.id}><TopRatedCard item={item} /></li>)}</ul>
            </div>
          ) : null}

          <div className="mt-12 flex justify-center">
            <ButtonLink href="/software?sortierung=note" variant="secondary" size="lg">
              Vollständige Rangliste
              <IconArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ============================================== 6. Reviews ======= */}
      <section
        aria-labelledby="bewertungen-heading"
        className="relative isolate overflow-hidden bg-[var(--color-accent)]"
      >
        {/* Die Kanten oben und unten werden über eine Alphamaske ausgeblendet,
            damit das Band nicht als aufgesetztes Bild wirkt, sondern in die
            angrenzenden Abschnitte übergeht. Die Maske wirkt nur auf die
            Deckkraft des Fotos; eine Farbverlaufsfläche entsteht dabei nicht. */}
        <Image
          src="/reviews-clouds.webp"
          alt=""
          fill
          sizes="100vw"
          className="z-0 object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
        />

        <h2 id="bewertungen-heading" className="sr-only">
          Bewertungen aus der Praxis
        </h2>

        <div className="container-page relative z-10">
          <div className="py-14 md:py-16">
            <ReviewMarquee reviews={reviewWall} software={allSoftware.slice(0, 6)} />
          </div>
        </div>
      </section>

      {/* ================================================ 8. Blog ======== */}
      <section className="section border-t border-[var(--color-rule)] bg-white">
        <div className="container-page">
          <SectionHead
            step="04"
            micro="Ratgeber"
            title="Wissen, das die Entscheidung leichter macht."
            lede="Praktische Leitfäden zu Auswahl, Wechsel und deutschen Anforderungen. Klar erklärt und regelmäßig geprüft."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            {guides[0] ? (
              <Link href={`/ratgeber/${guides[0].slug}`} className="group flex min-h-[360px] flex-col rounded-[12px] border border-[var(--color-rule)] bg-[#f8f7ed] p-7 transition-colors hover:border-[var(--color-accent)] md:p-9">
                <p className="t-micro text-[var(--color-accent)]">Im Fokus · {guides[0].category_tag}</p>
                <h3 className="mt-10 max-w-[20ch] font-[var(--font-display)] text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">{guides[0].title}</h3>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">{guides[0].excerpt}</p>
                <div className="mt-auto flex items-center justify-between border-t border-[var(--color-rule)] pt-5 text-[12px] text-[var(--color-ink-3)]"><time dateTime={guides[0].published_date}>{formatDate(guides[0].published_date)}</time><span className="text-[var(--color-accent)]">Artikel lesen ↗</span></div>
              </Link>
            ) : null}
            <div className="flex flex-col rounded-[12px] border border-[var(--color-rule)] bg-white px-6 md:px-8">
              {guides.slice(1).map((article, index) => (
                <Link key={article.id} href={`/ratgeber/${article.slug}`} className="group flex flex-1 gap-4 border-b border-[var(--color-rule)] py-6 last:border-b-0">
                  <span data-numeric className="pt-1 text-[12px] font-semibold text-[var(--color-red)]">0{index + 2}</span>
                  <div className="flex-1"><p className="t-micro text-[var(--color-ink-3)]">{article.category_tag}</p><h3 className="mt-2.5 font-[var(--font-display)] text-[18px] font-semibold leading-[1.3] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">{article.title}</h3><p className="mt-2 text-[12px] text-[var(--color-ink-3)]">{formatDate(article.published_date)} · {article.read_time_minutes} Min. Lesezeit</p></div>
                  <span aria-hidden="true" className="text-[18px] text-[var(--color-accent)]">↗</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <ButtonLink href="/ratgeber" variant="secondary" size="lg">
              Alle Beiträge
              <IconArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ============================================ 9. Newsletter ====== */}
      <section className="section border-t border-[var(--color-rule)] bg-white">
        <div className="container-page">
          <div className="grid gap-10 py-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div>
              <p className="t-micro text-[var(--color-accent)]">Newsletter</p>
              <h2 className="t-display-2 mt-5 max-w-[17ch]">Immer aktuell bei Unternehmenssoftware.</h2>
              <p className="t-lede mt-5 max-w-[44ch]">Neue Tests, Vergleichsleitfäden und Preisänderungen, direkt in Ihr Postfach. Etwa einmal im Monat.</p>
            </div>
            <div className="lg:pt-8">
              <NewsletterForm />
              <p className="mt-5 text-[13px] text-[var(--color-ink-3)]">Oder schreiben Sie an <a className="link-accent" href={`mailto:${siteSettings.operator.email}`}>{siteSettings.operator.email}</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Figure({
  icon,
  value,
  label,
  note,
  className,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  note: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center px-6 py-9 text-center ${className ?? ""}`}>
      <span className="text-[var(--color-ink-4)]">{icon}</span>
      <span
        data-numeric
        className="mt-3 font-[var(--font-display)] text-[2.5rem] font-semibold leading-none tracking-[-0.035em] text-[var(--color-ink)]"
      >
        {value}
      </span>
      <span className="t-micro mt-2.5 text-[var(--color-ink-3)]">{label}</span>
      <span className="mt-2 text-[13px] leading-[1.5] text-[var(--color-ink-4)]">{note}</span>
    </div>
  );
}
