import type { Metadata } from "next";
import Link from "next/link";
import { getSoftwareList } from "@/lib/queries";
import { PageHeader, ProseSection } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Affiliate-Hinweis",
  description:
    "Mit welchen Anbietern eine Vermittlungsvereinbarung besteht, wie Werbelinks gekennzeichnet sind und warum Provisionen Noten und Reihenfolge nicht beeinflussen.",
  alternates: { canonical: "/affiliate-hinweis" },
};

export default async function AffiliateDisclosurePage() {
  const all = await getSoftwareList({ sort: "name" });
  const withAffiliate = all.filter((s) => s.affiliate_url !== null);
  const withoutAffiliate = all.filter((s) => s.affiliate_url === null);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Affiliate-Hinweis", href: "/affiliate-hinweis" }]}
        micro="Werbekennzeichnung"
        title="Finanzierung und Partnerlinks"
        lede={withAffiliate.length ? "Für einzelne Produkte bestehen Vermittlungsvereinbarungen. Die Listen unten zeigen, welche Anbieter betroffen sind." : "Derzeit bestehen keine aktiven Vermittlungsvereinbarungen. Die Anbieterlinks führen direkt zu den Herstellerseiten."}
      />

      <ProseSection>
        <h2>Was eine Vermittlungsvereinbarung bedeutet</h2>
        <p>
          Wenn künftig eine Vermittlungsvereinbarung besteht, kann bei einem Abschluss über einen
          gekennzeichneten Link eine Provision entstehen. Aktuell enthält der Bestand keine solchen Links.
        </p>
        <p>
          Solche Links sind vor dem Klick mit dem Wort Werbung gekennzeichnet, nicht danach und
          nicht im Kleingedruckten am Seitenende. Auf einem Produktprofil steht der Hinweis
          unmittelbar über der Schaltfläche zur Herstellerseite.
        </p>

        <h2>Was dadurch nicht beeinflusst wird</h2>
        <ul>
          <li>
            <strong>Die Note.</strong> Sie ist der berechnete Durchschnitt der veröffentlichten
            Bewertungen. Es gibt kein Eingabefeld, in das jemand eine Note eintragen könnte.
          </li>
          <li>
            <strong>Die Reihenfolge.</strong> Ranglisten sortieren nach Note und bei Gleichstand
            nach der Zahl der Bewertungen. Eine Provision verschiebt keine Position.
          </li>
          <li>
            <strong>Die Aufnahme in den Bestand.</strong> Wir nehmen auf, was für die Zielgruppe
            relevant ist. Eine Zahlung verschafft keinen Eintrag.
          </li>
          <li>
            <strong>Der Inhalt eines Beitrags.</strong> Kein Anbieter liest einen Text gegen, bevor
            er erscheint.
          </li>
        </ul>

        <h2>Warum wir das überhaupt aufschreiben</h2>
        <p>
          Weil es rechtlich geboten ist und weil eine Prüfseite, die ihre Finanzierung verschweigt,
          ihr eigenes Versprechen beschädigt. Die kommerzielle Absicht hinter einem Link muss nach
          § 5a Abs. 4 UWG erkennbar sein, bevor jemand darauf klickt.
        </p>

        <h2>Wie Sie das überprüfen können</h2>
        <p>
          Unten stehen die Produkte mit und ohne Vereinbarung. Ranglisten verwenden veröffentlichte
          Nutzerbewertungen. Solange keine vorliegen, zeigen wir keine Note und keine Rangfolge.
        </p>
      </ProseSection>

      <section className="section border-t border-[var(--color-rule)]">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="t-heading-3 text-[1.2rem]">Mit Vermittlungsvereinbarung</h2>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
                Bei diesen Produkten erhalten wir eine Provision, wenn über einen gekennzeichneten
                Link ein Vertrag zustande kommt.
              </p>
              {withAffiliate.length === 0 ? (
                <p className="mt-5 border-t border-[var(--color-rule)] pt-4 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
                  Derzeit besteht mit keinem Anbieter in unserem Bestand eine
                  Vermittlungsvereinbarung. Sobald sich das ändert, steht der betreffende Anbieter
                  hier und der Link auf seinem Profil ist als Werbung gekennzeichnet.
                </p>
              ) : (
                <ul className="mt-5 border-t border-[var(--color-rule)]">
                  {withAffiliate.map((item) => (
                    <li key={item.id} className="border-b border-[var(--color-rule)]">
                      <Link
                        href={`/software/${item.slug}`}
                        className="flex min-h-[44px] items-center justify-between gap-4 py-2.5 text-[14px] transition-colors duration-200 hover:text-[var(--color-red)]"
                      >
                        <span className="font-medium text-[var(--color-ink)]">{item.name}</span>
                        <span className="text-[13px] text-[var(--color-ink-3)]">
                          {item.affiliate_network}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="t-heading-3 text-[1.2rem]">Ohne Vermittlungsvereinbarung</h2>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
                Bei diesen Produkten verdienen wir nichts. Die Links führen unmittelbar zur
                Herstellerseite.
              </p>
              <ul className="mt-5 grid grid-cols-1 border-t border-[var(--color-rule)] sm:grid-cols-2">
                {withoutAffiliate.map((item) => (
                  <li key={item.id} className="border-b border-[var(--color-rule)]">
                    <Link
                      href={`/software/${item.slug}`}
                      className="flex min-h-[44px] items-center py-2.5 text-[14px] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <p className="mt-8 max-w-[62ch] text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
            Wie Noten zustande kommen und wie wir Werbung von Redaktion trennen, steht ausführlich
            in den{" "}
            <Link href="/redaktionsrichtlinien" className="link-red">
              Redaktionsrichtlinien
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
