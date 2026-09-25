import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";
import { UnsubscribeForm } from "./unsubscribe-form";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Newsletter abbestellen",
  description: "Abmeldung vom Newsletter, ohne Anmeldung und ohne Begründung.",
  alternates: { canonical: "/software-newsletter-anmelden/newsletter-abmelden" },
  robots: { index: false, follow: true },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const params = await searchParams;

  /* A one click unsubscribe carries a token. In that case the server action
     consumes it and no further interaction is required. */
  const hasToken = Boolean(params.token);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Newsletter", href: "/software-newsletter-anmelden" },
          { label: "Abmelden", href: "/software-newsletter-anmelden/newsletter-abmelden" },
        ]}
        micro="Abmeldung"
        title="Newsletter abbestellen"
        lede="Ein Klick genügt. Sie müssen sich nicht anmelden, nichts bestätigen und keinen Grund angeben."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <UnsubscribeForm
                hasToken={hasToken}
                token={params.token ?? ""}
                presetEmail={params.email ?? ""}
              />
            </div>

            <aside>
              <Card className="p-5">
                <h2 className="t-micro text-[var(--color-ink-3)]">Was danach passiert</h2>
                <ul className="mt-3.5 flex flex-col gap-3 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
                  <li className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                    />
                    Der Versand endet sofort. Eine bereits versandte Ausgabe erreicht Sie
                    möglicherweise noch.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                    />
                    Wir vermerken Ihre Adresse in einer Sperrliste. Damit stellen wir sicher, dass
                    sie nicht versehentlich erneut eingetragen wird.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                    />
                    Die Sperrliste enthält ausschließlich die Adresse und das Datum. Sie wird für
                    keinen anderen Zweck verwendet.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] block size-1 shrink-0 rounded-full bg-[var(--color-ink-4)]"
                    />
                    Eine vollständige Löschung auch aus der Sperrliste können Sie jederzeit über
                    das Kontaktformular verlangen.
                  </li>
                </ul>

                <p className="mt-5 border-t border-[var(--color-rule)] pt-4 text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
                  Einzelheiten zur Verarbeitung stehen in der{" "}
                  <Link href="/datenschutzerklaerung-und-privatsphaere" className="link-red">
                    Datenschutzerklärung
                  </Link>
                  . Wenn Sie sich nur weniger oft melden lassen möchten, statt sich abzumelden,{" "}
                  <Link href="/kontakt-zur-redaktion" className="link-red">
                    schreiben Sie uns
                  </Link>
                  .
                </p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
