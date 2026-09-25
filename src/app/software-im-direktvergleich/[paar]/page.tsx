import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getComparison,
  getEditorialComparisons,
  getRatingDistribution,
  getReviews,
} from "@/lib/queries";
import { COMPLIANCE_ROWS } from "@/data/software";
import { categoryById } from "@/data/categories";
import { vendorHref } from "@/lib/links";
import {
  billingPeriodLabel,
  formatDate,
  formatPrice,
  formatReviewCount,
  reviewCountLabel,
} from "@/lib/format";
import { Breadcrumb } from "@/components/ui/navigation";
import { SectionNav } from "@/components/site/section-nav";
import { Badge, ButtonLink, Card, cx } from "@/components/ui/primitives";
import { StarRating, VerifiedCell } from "@/components/ui/rating";
import { SoftwareLogo } from "@/components/ui/software";
import { ComparisonRatingDashboard } from "@/components/site/rating-dashboard";
import { CountryFlags } from "@/components/site/country-flags";
import { IconExternal, IconCheck, IconTrophy } from "@/components/icons";
import type { Software } from "@/lib/types";

export const revalidate = 3600;

/** Only the editorial pairs are prerendered. Every other pair renders on demand. */
export async function generateStaticParams() {
  const pairs = await getEditorialComparisons();
  return pairs.map((v) => ({ paar: v.pair }));
}

function splitPair(pair: string): [string, string] | null {
  const marker = "-vs-";
  const index = pair.indexOf(marker);
  if (index <= 0) return null;
  const a = pair.slice(0, index);
  const b = pair.slice(index + marker.length);
  return a && b ? [a, b] : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ paar: string }>;
}): Promise<Metadata> {
  const { paar } = await params;
  const parts = splitPair(paar);
  if (!parts) return { title: "Nicht gefunden" };

  const comparison = await getComparison(parts[0], parts[1]);
  if (!comparison) return { title: "Nicht gefunden" };

  const title = `${comparison.a.name} oder ${comparison.b.name}?`;
  return {
    title,
    description: `${comparison.a.name} und ${comparison.b.name} im direkten Vergleich: Preise, Funktionen, Noten und die deutschen Pflichten, Zeile für Zeile geprüft.`,
    alternates: { canonical: `/software-im-direktvergleich/${paar}` },
  };
}

/** Die vier veröffentlichten Teilnoten, an denen sich ein Vorsprung bemisst. */
const RATING_KEYS = [
  "ease_of_use_rating",
  "value_for_money_rating",
  "customer_service_rating",
  "functionality_rating",
] as const;

const SECTIONS = [
  { id: "unterschiede", label: "Unterschiede" },
  { id: "praxis", label: "Im Betrieb" },
  { id: "noten", label: "Noten" },
  { id: "funktionen", label: "Funktionen" },
  { id: "konformitaet", label: "Deutsche Pflichten" },
  { id: "preise", label: "Preise" },
  { id: "entscheidung", label: "Auswahlhilfe" },
  { id: "urteil", label: "Urteil" },
];

export default async function ComparisonPage({ params }: { params: Promise<{ paar: string }> }) {
  const { paar } = await params;
  const parts = splitPair(paar);
  if (!parts) notFound();

  const comparison = await getComparison(parts[0], parts[1]);
  if (!comparison) notFound();

  const { a, b, verdict } = comparison;
  /* Where an outbound click came from, for the click log. Only the path. */
  const pairPath = `/software-im-direktvergleich/${paar}`;
  const [reviewsA, reviewsB, distributionA, distributionB] = await Promise.all([
    getReviews(a.slug), getReviews(b.slug), getRatingDistribution(a.slug), getRatingDistribution(b.slug),
  ]);

  /* If the stored verdict names the products in the other order, flip the
     take lists so "Nehmen Sie A, wenn" really refers to the A on this page. */
  const flipped = verdict !== null && verdict.software_a !== a.slug;
  const takeA = flipped ? verdict?.take_b : verdict?.take_a;
  const takeB = flipped ? verdict?.take_a : verdict?.take_b;

  /* Ein Vorsprung wird nur ausgewiesen, wenn auf beiden Seiten
     veröffentlichte Bewertungen vorliegen. Ohne sie stehen alle Teilnoten
     auf null, und ein Sieg wäre ein Rechenartefakt. */
  const winsA = RATING_KEYS.filter((key) => a[key] > b[key]).length;
  const winsB = RATING_KEYS.filter((key) => b[key] > a[key]).length;
  const rated = a.review_count > 0 && b.review_count > 0;
  const leadsA = rated && winsA > winsB;
  const leadsB = rated && winsB > winsA;

  const featureRows = mergeFeatures(a, b);
  const related = (await getEditorialComparisons())
    .filter((entry) => entry.pair !== paar && [a.slug, b.slug].some((slug) => slug === entry.a.slug || slug === entry.b.slug))
    .slice(0, 4)
    .map((entry) => ({ pair: entry.pair, left: entry.a, right: entry.b, headline: entry.headline }));

  return (
    <>
      <div className="container-wide pt-6">
        <Breadcrumb
          items={[
            { label: "Vergleich", href: "/software-im-direktvergleich" },
            { label: `${a.name} gegen ${b.name}`, href: `/software-im-direktvergleich/${paar}` },
          ]}
        />
      </div>

      {/* ------------------------------------------------------------ head */}
      <header>
        <div className="container-wide pb-9 pt-8 md:pb-12 md:pt-11">
          <div className="text-center">
          <p className="t-micro text-[var(--color-primary)]">Direktvergleich</p>
          <h1 className="t-display-1 mt-4">
            {a.name} <span className="inline-block rounded-[10px] bg-[var(--color-accent-tint)] px-3 py-1 text-[.48em] align-middle text-[var(--color-primary)]">oder</span> {b.name}
          </h1>
          {verdict ? (
            <p className="t-lede mx-auto mt-5 max-w-[62ch]">{verdict.headline}</p>
          ) : (
            <p className="t-lede mx-auto mt-5 max-w-[62ch]">
              Preise, Funktionen und deutsche Pflichten direkt nebeneinander. Für dieses Paar liegt noch kein redaktionelles Urteil vor.
            </p>
          )}
          </div>

          <div className="mx-auto mt-9 grid max-w-[72rem] gap-4 md:grid-cols-2">
            <HeadCard item={a} leads={leadsA} wins={winsA} total={RATING_KEYS.length} />
            <HeadCard item={b} leads={leadsB} wins={winsB} total={RATING_KEYS.length} />
          </div>
          <p className="mt-4 text-center text-[12px] text-[var(--color-ink-3)]">{a.affiliate_url || b.affiliate_url ? "Werbung: Bei einem Vertragsabschluss über einen gekennzeichneten Link können wir eine Provision erhalten. Die Redaktion bewertet unabhängig." : "Die Anbieterlinks führen direkt zu den Herstellerseiten. Für diese beiden Produkte besteht derzeit keine Provisionsvereinbarung."} <Link href="/transparenz-zu-affiliate-links" className="underline underline-offset-2">Transparenz zur Finanzierung</Link></p>
        </div>
      </header>

      <SectionNav items={SECTIONS} label="Vergleichsabschnitte" contained />

      <section aria-label="Vergleich auf einen Blick" className="border-b border-[var(--color-rule)] bg-[#f8faff] py-9">
        <div className="container-wide grid gap-3 md:grid-cols-3">
          <QuickFact label="Veröffentlichte Bewertungen" a={formatReviewCount(a.review_count)} b={formatReviewCount(b.review_count)} names={[a.name, b.name]} />
          <QuickFact label="Bestätigte DE-Angaben" a={String(confirmedDe(a))} b={String(confirmedDe(b))} names={[a.name, b.name]} />
          <QuickFact label="Einstiegspreis" a={a.starting_price === null ? "Auf Anfrage" : a.starting_price === 0 ? "Kostenlos" : formatPrice(a.starting_price)} b={b.starting_price === null ? "Auf Anfrage" : b.starting_price === 0 ? "Kostenlos" : formatPrice(b.starting_price)} names={[a.name, b.name]} />
        </div>
      </section>

      {/* ------------------------------------------------- 1. differences */}
      <section id="unterschiede" className="section scroll-mt-32 border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-display-2 text-[1.9rem]">Was die Entscheidung tatsächlich trägt</h2>

          {verdict ? (
            <ol className="mt-8 border-t border-[var(--color-rule)]">
              {verdict.differences.map((difference, index) => (
                <li
                  key={difference.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-5 border-b border-[var(--color-rule)] py-6"
                >
                  <span
                    aria-hidden="true"
                    data-numeric
                    className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--color-rule)] text-[13px] font-medium text-[var(--color-ink-3)]"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold leading-[1.4] text-[var(--color-ink)]">
                      {difference.title}
                    </h3>
                    <p className="mt-1.5 max-w-[62ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                      {difference.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <Card className="mt-8 p-6">
              <p className="max-w-[58ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                Für diese Paarung liegt noch kein redaktionelles Urteil vor. Die Tabellen weiter
                unten enthalten dieselben geprüften Angaben wie auf den Einzelprofilen. Wenn Sie
                sich eine ausformulierte Gegenüberstellung wünschen, schreiben Sie uns über das{" "}
                <Link href="/kontakt-zur-redaktion" className="link-red">
                  Kontaktformular
                </Link>
                .
              </p>
            </Card>
          )}
        </div>
      </section>

      <section id="praxis" className="section scroll-mt-32 border-b border-[var(--color-rule)]">
        <div className="container-page">
          <div className="text-center"><span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">Im Betrieb</span><h2 className="t-display-2 mt-4">Was sich im Alltag unterscheidet</h2><p className="mx-auto mt-4 max-w-[58ch] text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Die beiden Programme lösen ähnliche Aufgaben oft auf verschiedene Weise. Diese Einordnung stammt aus den ausführlichen Produktprofilen.</p></div>
          <div className="mt-9 grid gap-3 rounded-[26px] bg-[#f5f7fb] p-2.5 md:grid-cols-2">{[a, b].map((item) => <article key={item.id} className="rounded-[20px] border border-[#e2e8f1] bg-white p-7"><div className="flex items-center gap-3"><SoftwareLogo item={item} size={44} /><h3 className="text-[19px] font-semibold text-[var(--color-ink)]">{item.name}</h3></div><p className="mt-5 text-[15px] leading-[1.7] text-[var(--color-ink-2)]">{item.description_full[0]}</p><p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-ink-2)]">{item.description_full[1]}</p><div className="mt-5 border-t border-[#e9edf3] pt-5"><p className="t-micro text-[var(--color-ink-3)]">Wichtige Funktionen</p><ul className="mt-3 space-y-2">{item.top_features.slice(0, 3).map((feature) => <li key={feature} className="flex gap-2 text-[13px] text-[var(--color-ink-2)]"><IconCheck size={16} className="shrink-0 text-[var(--color-primary)]" />{feature}</li>)}</ul></div><div className="mt-6"><ButtonLink href={`/unternehmenssoftware-vergleichen/${item.slug}`} variant="secondary">Ausführliches Profil lesen</ButtonLink></div></article>)}</div>
        </div>
      </section>

      {/* ------------------------------------------------------ 2. ratings */}
      <section id="noten" className="section scroll-mt-32 border-b border-[var(--color-rule)]">
        <div className="container-page">
          <div className="text-center"><span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">Bewertungsbild</span><h2 className="t-display-2 mt-4">Noten im Vergleich</h2></div>

          <p className="mx-auto mt-4 max-w-[54ch] text-center text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Dieselben Kriterien, direkt gegenübergestellt. Alle Werte beruhen ausschließlich auf veröffentlichten Nutzerbewertungen.</p>
          <ComparisonRatingDashboard a={a} b={b} reviewsA={reviewsA} reviewsB={reviewsB} distributionA={distributionA} distributionB={distributionB} />
        </div>
      </section>

      {/* ----------------------------------------------------- 3. features */}
      <section id="funktionen" className="section scroll-mt-32 border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-display-2 text-[1.9rem]">Funktionen im direkten Vergleich</h2>
          <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.6] text-[var(--color-ink-3)]">
            Zusammengeführt aus beiden Prüflisten. Ein Fragezeichen heißt, dass wir die Angabe für
            dieses Produkt nicht geprüft haben.
          </p>

          <div className="scroll-x mt-8">
            <table className="w-full min-w-[34rem]">
              <caption className="sr-only">
                Funktionsumfang von {a.name} und {b.name} im Vergleich
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-rule-strong)]">
                  <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Funktion
                  </th>
                  <th scope="col" className="w-[8rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    {a.name}
                  </th>
                  <th scope="col" className="w-[8rem] py-3 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    {b.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row) => (
                  <tr key={row.name} className="border-b border-[var(--color-rule)]">
                    <th scope="row" className="py-3 pr-4 text-left text-[14.5px] font-normal text-[var(--color-ink-2)]">
                      {row.name}
                      <span className="block text-[12px] text-[var(--color-ink-4)]">{row.group}</span>
                    </th>
                    <td className="py-3 pr-4">
                      <VerifiedCell state={row.a} label={`${a.name}, ${row.name}`} />
                    </td>
                    <td className="py-3">
                      <VerifiedCell state={row.b} label={`${b.name}, ${row.name}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- 4. compliance */}
      <section id="konformitaet" className="section scroll-mt-32 border-b border-[var(--color-rule)]">
        <div className="container-page">
          <div className="text-center"><span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">Deutscher Markt</span><h2 className="t-display-2 mt-4">Pflichten für den Einsatz in Deutschland</h2><p className="mx-auto mt-4 max-w-[60ch] text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Ein Häkchen bezeichnet eine bestätigte Angabe. Wo wir noch keine verlässliche Bestätigung haben, bleibt der Punkt offen.</p></div>
          <div className="relative mt-9 hidden h-48 overflow-hidden rounded-[20px] border border-[#e2e8f1] sm:block"><img src="/german-flag-fabric-no-text-16x9.webp" alt="Deutsche Flagge aus Stoff" className="absolute inset-0 h-full w-full object-cover object-left" /><div className="relative ml-auto flex h-full w-1/2 flex-col justify-center bg-white/90 px-7"><p className="t-micro text-[var(--color-primary)]">Prüfung für Deutschland</p><p className="mt-2 text-[17px] font-semibold leading-[1.35] text-[var(--color-ink)]">Entscheiden Sie anhand der belegten Anforderungen Ihres Betriebs.</p></div></div>

          <div className="scroll-x mt-8 overflow-hidden rounded-[20px] border border-[#e2e8f1] bg-white px-5">
            <table className="w-full min-w-[34rem]">
              <caption className="sr-only">
                Geprüfte deutsche Pflichten und Schnittstellen bei {a.name} und {b.name}
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-rule-strong)]">
                  <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Anforderung
                  </th>
                  <th scope="col" className="w-[10rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    {a.name}
                  </th>
                  <th scope="col" className="w-[10rem] py-3 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    {b.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE_ROWS.map((row) => {
                  const valueA = a.de_compliance[row.key];
                  const valueB = b.de_compliance[row.key];
                  return (
                    <tr key={String(row.key)} className="border-b border-[var(--color-rule)]">
                      <th scope="row" className="py-3 pr-4 text-left text-[14.5px] font-normal text-[var(--color-ink-2)]">
                        {row.label}
                      </th>
                      <td className="py-3 pr-4 text-[13.5px] text-[var(--color-ink)]">
                        {row.kind === "text" ? (
                          valueA ? (
                            String(valueA)
                          ) : (
                            <span className="text-[var(--color-ink-3)]">nicht geprüft</span>
                          )
                        ) : (
                          <VerifiedCell state={valueA as boolean | null} label={`${a.name}, ${row.label}`} />
                        )}
                      </td>
                      <td className="py-3 text-[13.5px] text-[var(--color-ink)]">
                        {row.kind === "text" ? (
                          valueB ? (
                            String(valueB)
                          ) : (
                            <span className="text-[var(--color-ink-3)]">nicht geprüft</span>
                          )
                        ) : (
                          <VerifiedCell state={valueB as boolean | null} label={`${b.name}, ${row.label}`} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ 5. pricing */}
      <section id="preise" className="section scroll-mt-32 border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-display-2 text-[1.9rem]">Preise</h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {[a, b].map((item) => (
              <div key={item.id}>
                <div className="flex items-center gap-3 border-b border-[var(--color-rule-strong)] pb-3">
                  <SoftwareLogo item={item} size={32} />
                  <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">{item.name}</h3>
                </div>

                {item.pricing_plans.length === 0 ? (
                  <p className="mt-5 max-w-[46ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                    {item.vendor_name} veröffentlicht keine Preisliste. Der Preis wird auf Anfrage
                    genannt.
                  </p>
                ) : (
                  <ul className="mt-2">
                    {item.pricing_plans.map((plan) => (
                      <li
                        key={plan.name}
                        className={cx(
                          "border-b border-[var(--color-rule)] py-4",
                          plan.highlighted ? "bg-[var(--color-paper-2)] px-4" : "",
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="flex items-center gap-2 text-[15px] font-medium text-[var(--color-ink)]">
                            {plan.name}
                            {plan.highlighted ? <Badge tone="ink">Mittlerer Tarif</Badge> : null}
                          </span>
                          <span data-numeric className="shrink-0 text-right text-[14px] text-[var(--color-ink)]">
                            {plan.price === null
                              ? "auf Anfrage"
                              : plan.price === 0
                                ? "kostenlos"
                                : formatPrice(plan.price)}
                            {plan.price ? (
                              <span className="block text-[12px] text-[var(--color-ink-4)]">
                                {billingPeriodLabel(plan.billing_period)}
                              </span>
                            ) : null}
                          </span>
                        </div>
                        <p className="mt-1.5 max-w-[42ch] text-[13.5px] leading-[1.55] text-[var(--color-ink-2)]">
                          {plan.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 text-[13px] text-[var(--color-ink-3)]">
                  {item.pricing_checked_at ? (
                    <>
                      Geprüft am{" "}
                      <time data-numeric dateTime={item.pricing_checked_at}>
                        {formatDate(item.pricing_checked_at)}
                      </time>
                      . Alle Beträge netto, zzgl. 19&nbsp;% MwSt.
                    </>
                  ) : (
                    "Kein Prüfdatum hinterlegt."
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Tier matching honesty */}
          <p className="mt-10 max-w-[62ch] rounded-[8px] bg-[var(--color-paper-2)] p-5 text-[13.5px] leading-[1.62] text-[var(--color-ink-2)]">
            <span className="font-medium text-[var(--color-ink)]">Zur Vergleichbarkeit:</span> Die
            Tarife stehen in der Reihenfolge, in der der jeweilige Anbieter sie selbst führt, nicht
            nach Funktionsumfang sortiert. Ein Einstiegstarif des einen Anbieters kann deutlich mehr
            abdecken als der des anderen. Vergleichen Sie deshalb die Leistungsbeschreibung und
            nicht nur die Zahl.
          </p>
          <div className="mt-7 flex flex-wrap gap-3"><ButtonLink href={vendorHref(a, pairPath)} external variant="primary">Konditionen bei {a.name} prüfen <IconExternal size={16} /></ButtonLink><ButtonLink href={vendorHref(b, pairPath)} external variant="secondary">Konditionen bei {b.name} prüfen <IconExternal size={16} /></ButtonLink></div>
        </div>
      </section>

      <section id="entscheidung" className="section scroll-mt-32 border-b border-[var(--color-rule)]">
        <div className="container-page"><div className="text-center"><span className="inline-flex rounded-[8px] bg-[#f3f6fb] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-2)]">Auswahlhilfe</span><h2 className="t-display-2 mt-4">Drei Fragen vor der Entscheidung</h2><p className="mx-auto mt-4 max-w-[57ch] text-[14px] leading-[1.6] text-[var(--color-ink-3)]">Ein Vergleich auf dem Bildschirm ersetzt keine Prüfung Ihrer Abläufe. Diese Punkte sollten Sie mit beiden Anbietern besprechen.</p></div>
          <div className="mt-9 grid gap-3 md:grid-cols-3"><DecisionPoint number="01" title="Wer arbeitet täglich damit?" text={`Prüfen Sie mit den Personen, die Belege, Aufträge oder Personaldaten tatsächlich bearbeiten. ${a.name} und ${b.name} können auf dem Papier ähnlich wirken, aber verschiedene Arbeitswege vorgeben.`} /><DecisionPoint number="02" title="Was kostet der benötigte Umfang?" text={`Vergleichen Sie die passenden Tarife und alle zusätzlichen Arbeitsplätze. Der Einstiegspreis von ${a.name} oder ${b.name} sagt allein noch nichts über die Gesamtkosten Ihres Betriebs.`} /><DecisionPoint number="03" title="Welche Übergaben sind nötig?" text={`Klären Sie, welche Daten Ihre Kanzlei oder andere Systeme erhalten müssen. Die Tabellen oben zeigen bestätigte Schnittstellen und markieren noch ungeprüfte Angaben offen.`} /></div>
          <div className="mt-8 rounded-[20px] border border-[#dce6f1] bg-[#f8faff] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6"><div><h3 className="text-[18px] font-semibold text-[var(--color-ink)]">Noch nicht sicher?</h3><p className="mt-1 text-[13px] leading-[1.6] text-[var(--color-ink-3)]">Lesen Sie die Einzelprofile und notieren Sie offene Punkte für das Gespräch mit dem Anbieter.</p></div><div className="mt-5 flex flex-wrap gap-2 sm:mt-0"><ButtonLink href={`/unternehmenssoftware-vergleichen/${a.slug}`} variant="secondary">{a.name} ansehen</ButtonLink><ButtonLink href={`/unternehmenssoftware-vergleichen/${b.slug}`} variant="primary">{b.name} ansehen</ButtonLink></div></div>
        </div>
      </section>

      {/* ------------------------------------------------------ 6. verdict */}
      <section id="urteil" className="section scroll-mt-32">
        <div className="container-page">
          <h2 className="t-display-2 text-[1.9rem]">Unser Urteil</h2>

          {verdict && takeA && takeB ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <VerdictBox item={a} lines={takeA} />
              <VerdictBox item={b} lines={takeB} />
            </div>
          ) : (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="t-heading-3 text-[1.15rem]">{a.name}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-2)]">{a.verdict}</p>
              </Card>
              <Card className="p-6">
                <h3 className="t-heading-3 text-[1.15rem]">{b.name}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-2)]">{b.verdict}</p>
              </Card>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/unternehmenssoftware-vergleichen/${a.slug}`} variant="secondary">
              Profil von {a.name}
            </ButtonLink>
            <ButtonLink href={`/unternehmenssoftware-vergleichen/${b.slug}`} variant="secondary">
              Profil von {b.name}
            </ButtonLink>
            <ButtonLink href="/software-im-direktvergleich" variant="quiet">
              Anderen Vergleich wählen
            </ButtonLink>
          </div>
        </div>
      </section>

      {related.length ? <section aria-labelledby="weitere-vergleiche" className="section border-t border-[var(--color-rule)]">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="t-micro text-[var(--color-primary)]">Weiterlesen</p><h2 id="weitere-vergleiche" className="t-display-2 mt-3">Weitere Vergleiche für Ihre Auswahl</h2></div><ButtonLink href="/software-im-direktvergleich" variant="quiet">Alle Vergleiche ansehen</ButtonLink></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">{related.map((entry) => entry.left && entry.right ? <Link key={entry.pair} href={`/software-im-direktvergleich/${entry.pair}`} className="group rounded-[18px] border border-[#e0e8f2] bg-white p-5 transition-colors hover:border-[#9bbbf0]"><div className="flex items-center gap-3"><SoftwareLogo item={entry.left} size={34} /><span className="text-[12px] font-semibold text-[var(--color-ink-3)]">oder</span><SoftwareLogo item={entry.right} size={34} /></div><h3 className="mt-4 text-[17px] font-semibold text-[var(--color-ink)]">{entry.left.name} oder {entry.right.name}</h3><p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-[var(--color-ink-3)]">{entry.headline}</p><span className="mt-4 inline-block text-[13px] font-semibold text-[var(--color-primary)] group-hover:underline">Vergleich lesen →</span></Link> : null)}</div>
        </div>
      </section> : null}
    </>
  );
}

function HeadCard({ item, leads, wins, total }: { item: Software; leads: boolean; wins: number; total: number }) {
  const category = categoryById(item.category_id);
  return (
    <article
      className={cx(
        "relative flex flex-col items-center rounded-[18px] border bg-white p-7 text-center md:p-9",
        leads
          ? "border-[var(--color-primary)] shadow-[0_0_0_1px_var(--color-primary),0_18px_44px_-28px_rgba(6,70,200,.55)]"
          : "border-[#dce6f1] shadow-[0_16px_38px_-28px_rgba(23,44,60,.35)]",
      )}
    >
      {/* Der Pokal steht nie allein: daneben steht, worin dieses Produkt
          vorn liegt, damit die Aussage ohne das Symbol vollständig bleibt. */}
      {leads ? (
        <span className="absolute -top-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_-10px_rgba(6,70,200,.8)]">
          <IconTrophy size={16} filled />
          Vorn in {wins} von {total} Noten
        </span>
      ) : null}

      <div className={cx(leads && "mt-3")}>
        <SoftwareLogo item={item} size={60} />
      </div>
      <h2 className="mt-4 font-[var(--font-display)] text-[23px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
            <Link
              href={`/unternehmenssoftware-vergleichen/${item.slug}`}
              className="transition-colors duration-200 hover:text-[var(--color-primary)]"
            >
              {item.name}
            </Link>
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-primary)]">{category?.name} · {item.vendor_name}</p>
      <div className="mt-3"><CountryFlags countries={item.countries_available.slice(0, 3)} compact /></div>
      <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.55] text-[var(--color-ink-2)]">{item.tagline}</p>
      <div className="mt-5 flex items-center gap-2 text-[13px]"><StarRating value={item.overall_rating} reviewCount={item.review_count} /><span className="text-[var(--color-ink-3)]">{reviewCountLabel(item.review_count)}</span></div>
      <p data-numeric className="mt-3 text-[14px] font-semibold text-[var(--color-ink)]">{item.starting_price === null ? "Preis auf Anfrage" : item.starting_price === 0 ? "Kostenloser Tarif" : `Ab ${formatPrice(item.starting_price)}`}</p>
      <div className="mt-6">
        {item.affiliate_url ? <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-3)]">Werbung · Partnerlink</p> : null}
        <ButtonLink
          href={vendorHref(item)}
          external
          variant="primary"
          size="md"
        >
          Zum Anbieter
          <IconExternal size={16} />
        </ButtonLink>
      </div>
    </article>
  );
}

function confirmedDe(item: Software) {
  return Object.values(item.de_compliance).filter((value) => value === true).length;
}

function QuickFact({ label, a, b, names }: { label: string; a: string; b: string; names: [string, string] }) {
      return <div className="rounded-[12px] border border-[#dce6f1] bg-white p-5 text-center"><p className="t-micro text-[var(--color-ink-3)]">{label}</p><div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-start gap-3"><div><p data-numeric className="font-[var(--font-display)] text-[21px] font-semibold text-[var(--color-primary)]">{a}</p><p className="mt-1 truncate text-[12px] text-[var(--color-ink-3)]">{names[0]}</p></div><span className="pt-1 text-[12px] text-[var(--color-ink-4)]">oder</span><div><p data-numeric className="font-[var(--font-display)] text-[21px] font-semibold text-[var(--color-primary)]">{b}</p><p className="mt-1 truncate text-[12px] text-[var(--color-ink-3)]">{names[1]}</p></div></div></div>;
}

function DecisionPoint({ number, title, text }: { number: string; title: string; text: string }) {
  return <article className="rounded-[18px] border border-[#e2e8f1] bg-white p-6"><span className="font-[var(--font-display)] text-[29px] font-semibold text-[#bdcbe0]">{number}</span><h3 className="mt-4 text-[17px] font-semibold text-[var(--color-ink)]">{title}</h3><p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-ink-2)]">{text}</p></article>;
}

function VerdictBox({ item, lines }: { item: Software; lines: string[] }) {
  return (
    <Card className="p-6">
      <h3 className="t-heading-3 text-[1.2rem]">Nehmen Sie {item.name}, wenn</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-[var(--color-ink-2)]">
            <IconCheck size={18} className="mt-1 shrink-0 text-[var(--color-positive)]" />
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-[var(--color-rule)] pt-5">
        <ButtonLink href={`/unternehmenssoftware-vergleichen/${item.slug}`} variant="secondary" size="sm">
          Vollständiges Profil
        </ButtonLink>
      </div>
    </Card>
  );
}

/** Union of both feature lists, so neither product's rows go missing. */
function mergeFeatures(a: Software, b: Software) {
  const rows = new Map<string, { name: string; group: string; a: boolean | null; b: boolean | null }>();

  for (const group of a.features) {
    for (const feature of group.items) {
      rows.set(feature.name, { name: feature.name, group: group.group, a: feature.available, b: null });
    }
  }

  for (const group of b.features) {
    for (const feature of group.items) {
      const existing = rows.get(feature.name);
      if (existing) existing.b = feature.available;
      else
        rows.set(feature.name, {
          name: feature.name,
          group: group.group,
          a: null,
          b: feature.available,
        });
    }
  }

  return [...rows.values()];
}

