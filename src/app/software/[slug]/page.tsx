import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSoftware,
  getSoftwareSlugs,
  getReviews,
  getAlternatives,
  getRatingDistribution,
  SHOW_SEED_REVIEWS,
} from "@/lib/queries";
import { categoryById } from "@/data/categories";
import { vendorHref } from "@/lib/links";
import { COMPLIANCE_ROWS } from "@/data/software";
import { siteSettings } from "@/data/site";
import {
  billingPeriodLabel,
  formatDate,
  formatGrade,
  formatPrice,
  reviewCountLabel,
} from "@/lib/format";
import { Breadcrumb } from "@/components/ui/navigation";
import { Badge, ButtonLink, Card, SectionHead, cx } from "@/components/ui/primitives";
import { VerifiedMark } from "@/components/ui/rating";
import {
  SoftwareLogo,
  ComplianceChips,
  PromotionBanner,
  PROMOTION_FOOTNOTE,
  activePromotion,
  PriceDisclaimer,
  trialSummary,
} from "@/components/ui/software";
import { ReviewFull, SeedDataNotice } from "@/components/ui/review";
import { IconExternal, IconArrowRight, IconCalendar } from "@/components/icons";
import { SectionNav } from "@/components/site/section-nav";
import { RatingDashboard, PercentRing } from "@/components/site/rating-dashboard";
import { ProfileFaq } from "@/components/site/profile-faq";
import { CountryFlags } from "@/components/site/country-flags";
import type { Software } from "@/lib/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getSoftwareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getSoftware(slug);
  if (!item) return { title: "Nicht gefunden" };

  return {
    title: item.meta_title,
    description: item.meta_description,
    alternates: { canonical: `/software/${item.slug}` },
    openGraph: {
      title: item.meta_title,
      description: item.meta_description,
      url: `${siteSettings.url}/software/${item.slug}`,
      type: "article",
      images: [{ url: `/api/og?titel=${encodeURIComponent(item.meta_title)}&bereich=Software`, width: 1200, height: 630, alt: item.meta_title }],
    },
  };
}

const SECTIONS = [
  { id: "urteil", label: "Überblick" },
  { id: "beschreibung", label: "Redaktion" },
  { id: "einordnung", label: "Einordnung" },
  { id: "preise", label: "Preise" },
  { id: "funktionen", label: "Funktionen" },
  { id: "konformitaet", label: "Deutsche Pflichten" },
  { id: "noten", label: "Noten" },
  { id: "vergleich", label: "Vergleich" },
  { id: "bewertungen", label: "Bewertungen" },
  { id: "alternativen", label: "Alternativen" },
  { id: "fragen", label: "Fragen" },
];

export default async function SoftwarePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getSoftware(slug);
  if (!item) notFound();

  const [reviews, alternatives, distribution, allVisibleReviews] = await Promise.all([
    getReviews(slug, { sort: "helpful" }, 5),
    getAlternatives(slug, 4),
    getRatingDistribution(slug),
    getReviews(slug),
  ]);

  const category = categoryById(item.category_id);
  const hasReviews = item.review_count > 0;
  const comparisonAlternative = alternatives[0];
  const alternativeDistributions = await Promise.all(alternatives.map((alternative) => getRatingDistribution(alternative.slug)));

  /* SoftwareApplication with AggregateRating, and only when reviews exist.
     Emitting an invented aggregate is structured data spam and it is false. */
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: item.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: item.description_short,
    url: `${siteSettings.url}/software/${item.slug}`,
    softwareVersion: undefined,
    publisher: { "@type": "Organization", name: item.vendor_name },
    inLanguage: "de-DE",
  };

  if (item.starting_price !== null) {
    jsonLd.offers = {
      "@type": "Offer",
      price: item.starting_price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    };
  }

  if (hasReviews) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: item.overall_rating,
      reviewCount: item.review_count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  const faqJsonLd =
    item.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: item.faq.map((entry) => ({
            "@type": "Question",
            name: entry.question,
            acceptedAnswer: { "@type": "Answer", text: entry.answer },
          })),
        }
      : null;

  return (
    <>
      <div className="container-wide pt-6">
        <Breadcrumb
          items={[
            { label: "Software", href: "/software" },
            ...(category ? [{ label: category.name, href: `/kategorie/${category.slug}` }] : []),
            { label: item.name, href: `/software/${item.slug}` },
          ]}
        />
      </div>

      <header className="container-page flex flex-col items-center pb-9 pt-7 text-center md:pb-12 md:pt-10">
        <SoftwareLogo item={item} size={70} />
        <p className="t-micro mt-5 text-[var(--color-primary)]">Software im Detail</p>
        <h1 className="t-display-1 mt-3">{item.name}</h1>
        <p className="t-lede mt-4 max-w-[56ch]">{item.tagline}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[13px] text-[var(--color-ink-3)]">
          {category ? <Link href={`/kategorie/${category.slug}`} className="rounded-[6px] bg-[var(--color-accent-tint)] px-3 py-1.5 font-medium text-[var(--color-primary)]">{category.name}</Link> : null}
          <span>{item.vendor_name}</span><span aria-hidden="true">·</span>
          <Link href={`/software/${item.slug}/bewertungen`} className="font-medium text-[var(--color-primary)] hover:underline">{item.review_count > 0 ? `${formatGrade(item.overall_rating, item.review_count)} / 5 · ${reviewCountLabel(item.review_count)}` : "Noch keine Nutzerwertung"}</Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {item.affiliate_url ? <span className="w-full text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-3)]">Werbung · Partnerlink</span> : null}
          <ButtonLink href={vendorHref(item, `/software/${item.slug}`)} external variant="primary" size="md">Zum Anbieter <IconExternal size={16} /></ButtonLink>
          <ButtonLink href={`/software/${item.slug}/bewertungen/neu`} variant="secondary" size="md">Bewertung schreiben</ButtonLink>
        </div>
        <CountryFlags countries={item.countries_available} />
      </header>

      <SectionNav items={SECTIONS} label="Profilabschnitte" contained />

      <div className="mx-auto mt-9 w-[calc(100%-2rem)] max-w-[70rem] rounded-[28px] bg-[#f5f7fb] p-2.5 sm:p-3">
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Einstiegspreis" value={item.starting_price === null ? "Auf Anfrage" : item.starting_price === 0 ? "Kostenlos" : formatPrice(item.starting_price)} note={item.pricing_checked_at ? `Geprüft ${formatDate(item.pricing_checked_at)}` : "Preis ohne Prüfdatum"} />
          <Fact label="Anbieter" value={item.vendor_name} note={category?.name ?? "Software"} />
          <Fact label="Gegründet" value={item.founded_year ? String(item.founded_year) : "Nicht bekannt"} note="Angabe des Herstellers" />
          <Fact label="Verfügbar in" value={item.countries_available.length ? item.countries_available.join(", ") : "Keine Angabe"} note="Länder laut Produktprofil" />
          <Fact label="Sprachen" value={item.languages.length ? item.languages.join(", ") : "Keine Angabe"} note="Oberfläche und Betreuung" />
          <Fact label="Support" value={item.support_types.length ? item.support_types.join(", ") : "Keine Angabe"} note="Kanäle laut Produktprofil" />
        </div>
        <div className="flex flex-col gap-5 px-4 pb-3 pt-6 sm:flex-row sm:items-end sm:justify-between sm:px-5">
          <div className="max-w-[42rem]">
            <p className="inline-flex rounded-[6px] bg-white px-2.5 py-1 text-[12px] font-medium text-[var(--color-primary)]">{trialSummary(item).headline}</p>
            <PromotionBanner item={item} className="mt-3" />
            <p className="mt-3 text-[12px] leading-[1.6] text-[var(--color-ink-3)]">{item.affiliate_url ? <>Werbung: Wenn über diesen Link ein Vertrag zustande kommt, erhalten wir möglicherweise eine Provision. Das beeinflusst unsere Bewertung nicht. <Link href="/affiliate-hinweis" className="underline underline-offset-2">Affiliate-Hinweis</Link>.</> : "Für dieses Produkt besteht keine Provisionsvereinbarung. Der Link führt zur Herstellerseite."}</p>
          </div>
          <ButtonLink href={vendorHref(item, `/software/${item.slug}`)} external variant="primary" size="lg">Zum Anbieter <IconExternal size={18} /></ButtonLink>
        </div>
      </div>

      <div className="mx-auto w-[calc(100%-2rem)] max-w-[70rem] pb-16">
          <div className="min-w-0">
            {/* ---------------------------------------------- 1. verdict */}
            <section id="urteil" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Überblick</SectionLabel><h2 className="t-display-2 mt-4">Was ist {item.name}?</h2></div>
              <p className="mx-auto mt-9 max-w-[52rem] font-[var(--font-display)] text-[1.4rem] font-normal leading-[1.55] tracking-[-0.015em] text-[var(--color-ink)]">
                {item.verdict}
              </p>
            </section>

            {/* ------------------------------------------ 2. description */}
            <section id="beschreibung" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Redaktion</SectionLabel><h2 className="t-display-2 mt-4">Unsere Einschätzung</h2></div>
              <div className="prose-editorial mx-auto mt-9 max-w-[52rem]">
                {item.description_full.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

            </section>

            <section id="einordnung" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Kaufentscheidung</SectionLabel><h2 className="t-display-2 mt-4">Worauf es bei {item.name} ankommt</h2><p className="mx-auto mt-4 max-w-[56ch] text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Die Produktangaben werden erst dann nützlich, wenn sie zu Ihrem Betrieb passen. Diese Punkte sollten Sie vor einer Entscheidung prüfen.</p></div>
              <div className="mt-9 grid gap-3 rounded-[26px] bg-[#f5f7fb] p-2.5 md:grid-cols-2">
                <EditorialCard number="01" title="Der passende Arbeitsablauf"><p>{item.verdict}</p><p>Im Produktprofil sind besonders {item.top_features.slice(0, 3).join(", ")} dokumentiert. Lassen Sie sich genau diese Abläufe mit Ihren eigenen Beispielen zeigen.</p></EditorialCard>
                <EditorialCard number="02" title="Kosten und Einstieg"><p>{item.starting_price === null ? `${item.vendor_name} nennt keinen allgemein gültigen Einstiegspreis. Fragen Sie nach einem Angebot, das alle benötigten Arbeitsplätze, Leistungen und die Betreuung einschließt.` : `Der veröffentlichte Einstieg beginnt bei ${formatPrice(item.starting_price)} ${billingPeriodLabel(item.billing_period)}. Prüfen Sie, ob der dafür genannte Tarif die Funktionen enthält, die Ihr Betrieb täglich braucht.`}</p><p>{item.trial_days ? `Sie können ${item.trial_days} Tage kostenlos testen. Nutzen Sie die Zeit für echte Belege und konkrete Aufgaben aus Ihrem Betrieb, nicht für die Beispieldaten des Anbieters.` : item.free_trial ? "Eine Testphase ist vorgesehen, der Anbieter nennt dafür aber keine Laufzeit. Fragen Sie danach, bevor Sie einen Zeitplan aufsetzen." : item.demo ? `Eine selbst startbare Testphase gibt es nicht. ${item.vendor_name} bietet stattdessen an: ${item.demo.label}. Verlangen Sie dabei eine Vorführung Ihrer wichtigsten Abläufe.` : "Eine allgemein verfügbare Testphase ist für dieses Produkt nicht bestätigt. Bitten Sie vor einer Zusage um eine Vorführung Ihrer wichtigsten Abläufe."}</p></EditorialCard>
                <EditorialCard number="03" title="Einführung und Betreuung"><p>Als Wege zur Unterstützung sind {item.support_types.length ? item.support_types.join(", ") : "keine konkreten Kanäle"} genannt. Klären Sie vor dem Start, wer Ihre Daten übernimmt und wer bei fachlichen Fragen erreichbar ist.</p><p>{item.integrations.length ? `Genannte Verbindungen sind ${item.integrations.slice(0, 4).join(", ")}. Fragen Sie beim Anbieter nach dem Umfang der Übergabe und möglichen Tarifgrenzen.` : "Konkrete Integrationen sind in unseren Daten noch nicht bestätigt. Prüfen Sie die nötigen Übergaben direkt mit dem Anbieter."}</p></EditorialCard>
                <EditorialCard number="04" title="Was noch offen ist"><p>Eine fehlende Bestätigung ist kein Gegenbeweis. Bei einzelnen Anforderungen liegen uns noch keine belastbaren Angaben vor. Die vollständige Prüfliste weiter unten trennt bestätigte Funktionen, bestätigte Einschränkungen und offene Punkte.</p><p>Wenn eine dieser Anforderungen für Ihre Buchhaltung oder Kanzlei entscheidend ist, verlangen Sie eine schriftliche Bestätigung für die angebotene Produktversion.</p></EditorialCard>
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-3"><ButtonLink href={vendorHref(item, `/software/${item.slug}`)} external variant="primary">Produkt beim Anbieter prüfen <IconExternal size={16} /></ButtonLink><ButtonLink href={`/vergleich?a=${item.slug}`} variant="secondary">Mit anderer Software vergleichen <IconArrowRight size={16} /></ButtonLink></div>
            </section>

            {/* ----------------------------------------------- 5. pricing */}
            <section id="preise" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Preise</SectionLabel><h2 className="t-display-2 mt-4">Die Tarife von {item.name}</h2></div>
              <div className="mx-auto mt-5 max-w-[64ch]"><PriceDisclaimer checkedAt={item.pricing_checked_at} className="justify-center text-center" /></div>
              <div className="mx-auto mt-4 max-w-[46rem]"><PromotionBanner item={item} /></div>
              {activePromotion(item) ? (
                <p className="mx-auto mt-3 max-w-[64ch] text-center text-[12.5px] leading-[1.6] text-[var(--color-ink-3)]">
                  {PROMOTION_FOOTNOTE}
                </p>
              ) : null}
              <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-[13.5px] text-[var(--color-ink-3)]">
                <IconCalendar size={16} />
                {item.pricing_checked_at ? (
                  <>
                    Listenkonditionen geprüft am{" "}
                    <time data-numeric dateTime={item.pricing_checked_at} className="text-[var(--color-ink)]">
                      {formatDate(item.pricing_checked_at)}
                    </time>
                    . Alle Beträge netto, zzgl. 19&nbsp;% MwSt.
                  </>
                ) : (
                  "Kein Prüfdatum hinterlegt."
                )}
              </p>

              {item.pricing_plans.length === 0 ? (
                <Card className="mt-6 p-6">
                  <p className="max-w-[54ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                    {item.vendor_name} veröffentlicht für dieses Produkt keine Preisliste. Der Preis
                    ergibt sich aus Umfang und Betreuung und wird auf Anfrage genannt. Wir nennen
                    hier bewusst keine Zahl, weil sie geraten wäre.
                  </p>
                </Card>
              ) : (
                <div className={cx("mt-9 grid gap-3 rounded-[26px] bg-[#f5f7fb] p-2.5", item.pricing_plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
                  {item.pricing_plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={cx(
                        "flex flex-col rounded-[20px] border border-[#e2e8f1] bg-white p-6 sm:p-7",
                        plan.highlighted ? "border-[#b8d0f5]" : "",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">
                          {plan.name}
                        </h3>
                        {plan.highlighted ? <Badge tone="ink">Meistgewählt</Badge> : null}
                      </div>

                      <p className="mt-7">
                        {plan.price === null ? (
                          <span className="font-[var(--font-display)] text-[1.35rem] font-semibold text-[var(--color-ink)]">
                            Auf Anfrage
                          </span>
                        ) : plan.price === 0 ? (
                          <span className="font-[var(--font-display)] text-[1.35rem] font-semibold text-[var(--color-ink)]">
                            Kostenlos
                          </span>
                        ) : (
                          <>
                            <span
                              data-numeric
                              className="font-[var(--font-display)] text-[2.2rem] font-semibold tracking-[-0.04em] text-[var(--color-ink)]"
                            >
                              {formatPrice(plan.price)}
                            </span>
                            <span className="block text-[13px] text-[var(--color-ink-3)]">
                              {billingPeriodLabel(plan.billing_period)}, zzgl. 19&nbsp;% MwSt.
                            </span>
                          </>
                        )}
                      </p>

                      <p className="mt-4 min-h-12 text-[13.5px] leading-[1.55] text-[var(--color-ink-2)]">
                        {plan.description}
                      </p>

                      <div className="mt-6"><ButtonLink href={vendorHref(item, `/software/${item.slug}`)} external variant={plan.highlighted ? "primary" : "secondary"} block>Tarif beim Anbieter ansehen <IconExternal size={16} /></ButtonLink></div>

                      <ul className="mt-6 flex flex-col gap-2 border-t border-[var(--color-rule)] pt-5">
                        {plan.includes.map((line) => (
                          <li
                            key={line}
                            className="flex items-start gap-2 text-[13.5px] leading-[1.5] text-[var(--color-ink-2)]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[8px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                            />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* --------------------------------------------- 3. features */}
            <section id="funktionen" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Funktionen</SectionLabel><h2 className="t-display-2 mt-4">Was {item.name} kann</h2></div>
              <p className="mx-auto mt-4 max-w-[56ch] text-center text-[14.5px] leading-[1.6] text-[var(--color-ink-3)]">
                Geprüft am{" "}
                {item.pricing_checked_at ? formatDate(item.pricing_checked_at) : "unbekanntem Datum"}.
                Eine Zeile ohne Angabe heißt, dass wir sie nicht prüfen konnten.
              </p>

              {item.top_features.length > 0 ? <div className="mt-9 grid gap-2.5 rounded-[26px] bg-[#f5f7fb] p-2.5 sm:grid-cols-2">
                {item.top_features.slice(0, 4).map((feature, index) => <div key={feature} className="flex min-h-24 items-center gap-5 rounded-[18px] border border-[#e2e8f1] bg-white px-6 py-5"><span className="font-[var(--font-display)] text-[28px] font-semibold text-[#b7c6da]">{String(index + 1).padStart(2, "0")}</span><p className="text-[15px] font-medium leading-[1.5] text-[var(--color-ink)]">{feature}</p></div>)}
              </div> : null}

              <div className="mt-3 grid gap-3 rounded-[26px] bg-[#f5f7fb] p-2.5 md:grid-cols-2">
                {item.features.map((group) => (
                  <div key={group.group} className="rounded-[18px] border border-[#e2e8f1] bg-white p-6">
                    <h3 className="border-b border-[var(--color-rule-strong)] pb-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]">
                      {group.group}
                    </h3>
                    <table className="w-full">
                      <caption className="sr-only">Funktionen der Gruppe {group.group}</caption>
                      <tbody>
                        {group.items.map((feature) => (
                          <tr key={feature.name} className="border-b border-[var(--color-rule)]">
                            <th
                              scope="row"
                              className="py-3 pr-4 text-left text-[14.5px] font-normal text-[var(--color-ink-2)]"
                            >
                              {feature.name}
                              {feature.note ? (
                                <span className="block text-[12.5px] text-[var(--color-ink-4)]">
                                  {feature.note}
                                </span>
                              ) : null}
                            </th>
                            <td className="w-[8.5rem] py-3 text-right">
                              <VerifiedMark state={feature.available} label={feature.name} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
              {item.integrations.length > 0 ? <div className="mt-3 rounded-[20px] border border-[#e2e8f1] bg-white p-6"><h3 className="text-[17px] font-semibold text-[var(--color-ink)]">Schnittstellen und Integrationen</h3><div className="mt-4 flex flex-wrap gap-2">{item.integrations.map((integration) => <span key={integration} className="rounded-[7px] border border-[#dce6f1] px-3 py-2 text-[13px] text-[var(--color-ink-2)]">{integration}</span>)}</div></div> : null}
            </section>

            {/* -------------------------------------- 4. German compliance */}
            <section id="konformitaet" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Deutschland</SectionLabel><h2 className="t-display-2 mt-4">Pflichten und Schnittstellen</h2></div>
              <p className="mx-auto mt-4 max-w-[58ch] text-center text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
                Geprüfte Angaben für den Einsatz in Deutschland. Nicht geprüfte Punkte sind ausdrücklich als solche markiert.
              </p>
              {item.countries_available.includes("Deutschland") ? <div className="relative mt-8 hidden h-48 overflow-hidden rounded-[20px] border border-[#e2e8f1] sm:block"><img src="/german-flag-fabric-no-text-16x9.webp" alt="Deutsche Flagge aus Stoff" className="absolute inset-0 h-full w-full object-cover object-left" /><div className="relative ml-auto flex h-full w-1/2 flex-col justify-center bg-white/90 px-7"><p className="t-micro text-[var(--color-primary)]">Für Deutschland</p><p className="mt-2 text-[17px] font-semibold leading-[1.35] text-[var(--color-ink)]">Entscheidend sind die nachgewiesenen Funktionen, nicht ein allgemeines Werbeversprechen.</p></div></div> : null}
              <div className="mt-6 flex justify-center"><ComplianceChips item={item} /></div>

              <div className="scroll-x mt-8 overflow-hidden rounded-[20px] border border-[#e2e8f1] bg-white px-5 sm:px-8">
                <table className="w-full">
                  <caption className="sr-only">
                    Geprüfte Angaben zu deutschen Pflichten und Schnittstellen für {item.name}
                  </caption>
                  <tbody className="border-t border-[var(--color-rule-strong)]">
                    {COMPLIANCE_ROWS.map((row) => {
                      const value = item.de_compliance[row.key];
                      return (
                        <tr key={String(row.key)} className="border-b border-[var(--color-rule)]">
                          <th
                            scope="row"
                            className="py-3.5 pr-4 text-left text-[14.5px] font-normal text-[var(--color-ink-2)]"
                          >
                            {row.label}
                            {row.hint ? (
                              <span className="block text-[12.5px] text-[var(--color-ink-4)]">
                                {row.hint}
                              </span>
                            ) : null}
                          </th>
                          <td className="py-3.5 text-right text-[14px] text-[var(--color-ink)] sm:w-[16rem]">
                            {row.kind === "text" ? (
                              value ? (
                                <span>{String(value)}</span>
                              ) : (
                                <span className="text-[var(--color-ink-3)]">nicht geprüft</span>
                              )
                            ) : (
                              <VerifiedMark state={value as boolean | null} label={row.label} />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-5 rounded-[12px] bg-[#f5f7fb] p-5 text-[13.5px] leading-[1.6] text-[var(--color-ink-2)]">
                <span className="font-medium text-[var(--color-ink)]">Zur Lesart:</span> „nicht
                geprüft“ heißt, dass wir die Angabe nicht bestätigen konnten. Es heißt ausdrücklich
                nicht, dass das Programm die Anforderung nicht erfüllt. Wo wir eine Anforderung als
                nicht erfüllt bestätigt haben, steht dort „nein“.
              </p>
            </section>

            {/* ----------------------------------------------- 6. ratings */}
            <section id="noten" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Bewertungsbild</SectionLabel><h2 className="t-display-2 mt-4">Die Noten im Einzelnen</h2></div>

              <p className="mx-auto mt-4 max-w-[54ch] text-center text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Alle Werte stammen aus veröffentlichten Bewertungen. Ohne Bewertungen zeigen wir keine erfundene Note.</p>
              <RatingDashboard item={item} reviews={allVisibleReviews} distribution={distribution} />
            </section>

            {/* ----------------------------------------- 7. quick comparison */}
            <section id="vergleich" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="text-center"><SectionLabel>Direktvergleich</SectionLabel><h2 className="t-display-2 mt-4">{comparisonAlternative ? `${item.name} oder ${comparisonAlternative.name}?` : "Mit einem anderen Programm vergleichen"}</h2></div>
              {comparisonAlternative ? <>
                <p className="mx-auto mt-4 max-w-[58ch] text-center text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Die wichtigsten geprüften Eckdaten auf einen Blick. Einzelheiten und Unterschiede stehen im vollständigen Vergleich.</p>
                <div className="mx-auto mt-9 max-w-[56rem] overflow-hidden rounded-[24px] border-[8px] border-[#f5f7fb] bg-white">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-[#dce6f1] bg-[#f8faff] p-6">
                    <div className="flex min-w-0 items-center gap-3"><SoftwareLogo item={item} size={42} /><div className="min-w-0"><p className="truncate text-[15px] font-semibold text-[var(--color-ink)]">{item.name}</p><p className="text-[12px] text-[var(--color-ink-3)]">{reviewCountLabel(item.review_count)}</p></div></div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-[var(--color-ink-3)]">vs.</span>
                    <div className="flex min-w-0 items-center justify-end gap-3 text-right"><div className="min-w-0"><p className="truncate text-[15px] font-semibold text-[var(--color-ink)]">{comparisonAlternative.name}</p><p className="text-[12px] text-[var(--color-ink-3)]">{reviewCountLabel(comparisonAlternative.review_count)}</p></div><SoftwareLogo item={comparisonAlternative} size={42} /></div>
                  </div>
                  {[["Einstiegspreis", item.starting_price, comparisonAlternative.starting_price], ["Testphase", item.free_trial, comparisonAlternative.free_trial], ["Kostenloser Tarif", item.free_version, comparisonAlternative.free_version]].map(([label, aValue, bValue]) => <div key={String(label)} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-[#e8edf2] px-6 py-4 last:border-b-0"><div className="text-right text-[14px] font-semibold text-[var(--color-ink)]">{typeof aValue === "boolean" ? aValue ? "Ja" : "Nein" : aValue === null ? "Auf Anfrage" : aValue === 0 ? "Kostenlos" : formatPrice(Number(aValue))}</div><div className="min-w-20 text-center sm:min-w-28 text-[12px] text-[var(--color-ink-3)]">{label}</div><div className="text-[14px] font-semibold text-[var(--color-ink)]">{typeof bValue === "boolean" ? bValue ? "Ja" : "Nein" : bValue === null ? "Auf Anfrage" : bValue === 0 ? "Kostenlos" : formatPrice(Number(bValue))}</div></div>)}
                </div>
                <div className="mt-6 text-center"><ButtonLink href={`/vergleich/${item.slug}-vs-${comparisonAlternative.slug}`} variant="primary">Vollständigen Vergleich öffnen <IconArrowRight size={18} /></ButtonLink></div>
              </> : <div className="mt-5"><ButtonLink href={`/vergleich?a=${item.slug}`} variant="primary">Programm auswählen <IconArrowRight size={18} /></ButtonLink></div>}
            </section>

            {/* ---------------------------------------------- 8. reviews */}
            <section id="bewertungen" className="scroll-mt-24 border-b border-[var(--color-rule)] py-10">
              <SectionHead
                title="Bewertungen"
                action={
                  item.review_count > 5 ? (
                    <ButtonLink href={`/software/${item.slug}/bewertungen`} variant="secondary">
                      Alle {reviewCountLabel(item.review_count)}
                      <IconArrowRight size={18} />
                    </ButtonLink>
                  ) : (
                    <ButtonLink href={`/software/${item.slug}/bewertungen/neu`} variant="secondary">
                      Bewertung schreiben
                    </ButtonLink>
                  )
                }
              />

              {SHOW_SEED_REVIEWS && reviews.length > 0 ? <SeedDataNotice className="mt-6" /> : null}

              {reviews.length === 0 ? (
                <Card className="mt-6 p-6">
                  <p className="max-w-[54ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                    Noch keine veröffentlichte Bewertung. Wenn Sie {item.name} im Betrieb einsetzen,
                    hilft Ihre Einschätzung anderen bei der Auswahl.
                  </p>
                  <div className="mt-5">
                    <ButtonLink href={`/software/${item.slug}/bewertungen/neu`} variant="secondary">
                      Erste Bewertung schreiben
                    </ButtonLink>
                  </div>
                </Card>
              ) : (
                <div className="mt-2">
                  {reviews.map((review) => (
                    <ReviewFull key={review.id} review={review} />
                  ))}
                </div>
              )}
            </section>

            {/* ----------------------------------------- 8. alternatives */}
            <section id="alternativen" className="scroll-mt-28 border-b border-[var(--color-rule)] py-16 md:py-20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="t-micro text-[var(--color-ink-3)]">Weitere Optionen</p><h2 className="t-display-2 mt-4">Alternativen zu {item.name}</h2><p className="mt-3 text-[14px] text-[var(--color-ink-3)]">Programme für eine ähnliche Aufgabe – mit geprüften Preisen und echten Nutzerwertungen.</p></div><Link href={`/software/${item.slug}/alternativen`} className="inline-flex shrink-0 items-center gap-2 text-[14px] font-semibold text-[var(--color-primary)] hover:underline">Alle Alternativen <IconArrowRight size={18} /></Link></div>
              <ul className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {alternatives.map((alternative, index) => (
                  <li key={alternative.id}>
                    <AlternativeCard item={alternative} distribution={alternativeDistributions[index] ?? []} />
                  </li>
                ))}
              </ul>
            </section>

            {/* ------------------------------------------------- 9. FAQ */}
            {item.faq.length > 0 ? (
              <section id="fragen" className="scroll-mt-28 py-16 md:py-20">
                <div className="text-center"><SectionLabel>FAQ</SectionLabel><h2 className="t-display-2 mt-4">Antworten auf Ihre Fragen</h2><p className="mx-auto mt-4 max-w-[50ch] text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Die häufigsten Fragen zu {item.name}, beantwortet mit den Angaben auf dieser Seite.</p></div>
                <ProfileFaq items={item.faq} productName={item.name} />
              </section>
            ) : null}
            <p className="mt-8 border-t border-[var(--color-rule)] pt-6 text-center text-[13px] text-[var(--color-ink-3)]">Eine Angabe ist veraltet oder fehlerhaft? <Link href="/kontakt" className="font-medium text-[var(--color-primary)] underline underline-offset-2">Korrektur melden</Link></p>
          </div>


      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </>
  );
}

function Fact({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="min-h-28 rounded-[18px] border border-[#e2e8f1] bg-white p-5"><p className="t-micro text-[var(--color-ink-3)]">{label}</p><p className="mt-3 break-words font-[var(--font-display)] text-[18px] font-semibold leading-tight tracking-[-0.025em] text-[var(--color-ink)]">{value}</p><p className="mt-2 text-[12px] text-[var(--color-ink-3)]">{note}</p></div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">{children}</span>;
}

function EditorialCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <article className="rounded-[20px] border border-[#e2e8f1] bg-white p-7"><span className="font-[var(--font-display)] text-[29px] font-semibold text-[#bdcbe0]">{number}</span><h3 className="mt-4 text-[18px] font-semibold text-[var(--color-ink)]">{title}</h3><div className="mt-4 space-y-3 text-[14px] leading-[1.7] text-[var(--color-ink-2)]">{children}</div></article>;
}

function AlternativeCard({ item, distribution }: { item: Software; distribution: { stars: number; count: number; share: number }[] }) {
  const positive = distribution.filter((row) => row.stars >= 4).reduce((sum, row) => sum + row.count, 0);
  const positiveShare = item.review_count > 0 ? Math.round(positive / item.review_count * 100) : null;
  return <article className="flex h-full flex-col rounded-[20px] border border-[#dce6f1] bg-white p-5 shadow-[0_18px_34px_-30px_rgba(23,44,60,.35)]">
    <div className="flex min-h-16 items-center gap-3"><SoftwareLogo item={item} size={48} /><div className="min-w-0"><h3 className="line-clamp-2 text-[15px] font-semibold leading-[1.35] text-[var(--color-ink)]">{item.name}</h3><p className="mt-1 text-[12px] text-[var(--color-ink-3)]">{item.review_count ? `${formatGrade(item.overall_rating, item.review_count)} / 5 · ${reviewCountLabel(item.review_count)}` : "Noch keine Bewertung"}</p></div></div>
    <div className="mt-5 border-t border-[#e7ebf0] pt-5"><p className="t-micro text-[var(--color-ink-3)]">Einstiegspreis</p><p className="mt-2 text-[19px] font-semibold text-[var(--color-ink)]">{item.starting_price === null ? "Auf Anfrage" : item.starting_price === 0 ? "Kostenlos" : formatPrice(item.starting_price)}</p><p className="text-[12px] text-[var(--color-ink-3)]">{billingPeriodLabel(item.billing_period)}</p><div className="mt-4 space-y-2 text-[13px] text-[var(--color-ink-2)]"><p><span className="mr-2 font-semibold text-[var(--color-primary)]">{item.free_trial ? "✓" : "–"}</span>{trialSummary(item).headline}</p><p><span className="mr-2 font-semibold text-[var(--color-primary)]">{item.free_version ? "✓" : "–"}</span>Kostenloser Tarif</p></div></div>
    <div className="mt-5 flex items-center gap-3 border-t border-[#e7ebf0] pt-5"><PercentRing percent={positiveShare} /><p className="text-[12px] leading-[1.5] text-[var(--color-ink-3)]">{positiveShare === null ? "Noch keine veröffentlichten Bewertungen" : <><strong className="text-[var(--color-ink)]">{positiveShare}%</strong> bewerten mit 4 oder 5 Sternen</>}</p></div>
    <div className="mt-auto pt-6"><ButtonLink href={`/software/${item.slug}`} variant="primary" block>Profil ansehen <IconArrowRight size={16} /></ButtonLink></div>
  </article>;
}





