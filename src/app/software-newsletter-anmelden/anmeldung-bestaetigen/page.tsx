import type { Metadata } from "next";
import Link from "next/link";

import { confirmNewsletterAction } from "@/app/actions";
import { PageHeader } from "@/components/ui/page";
import { Card } from "@/components/ui/primitives";
import { IconCheck } from "@/components/icons";

/* The token is consumed on the server when this page is requested. There is no
   button to press: a confirmation that needs a second confirmation is not a
   confirmation, it is an obstacle. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsletter bestätigen",
  description: "Bestätigung der Newsletter-Anmeldung im Double-Opt-in-Verfahren.",
  alternates: { canonical: "/software-newsletter-anmelden/anmeldung-bestaetigen" },
  robots: { index: false, follow: false },
};

export default async function ConfirmNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = token
    ? await confirmNewsletterAction(token)
    : {
        ok: false,
        message:
          "Dieser Aufruf enthält keinen Bestätigungscode. Bitte öffnen Sie den Link aus unserer E-Mail.",
      };

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Newsletter", href: "/software-newsletter-anmelden" },
          { label: "Bestätigung", href: "/software-newsletter-anmelden/anmeldung-bestaetigen" },
        ]}
        micro="Double Opt-in"
        title={result.ok ? "Anmeldung bestätigt" : "Bestätigung nicht möglich"}
        lede={
          result.ok
            ? "Ihre Einwilligung ist dokumentiert. Ab jetzt erhalten Sie den Newsletter."
            : "Der Bestätigungslink konnte nicht eingelöst werden."
        }
      />

      <section className="section">
        <div className="container-page">
          <div className="max-w-[46rem]">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                {result.ok ? (
                  <IconCheck size={20} className="mt-0.5 shrink-0 text-[var(--color-positive)]" />
                ) : null}
                <p className="text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
                  {result.message}
                </p>
              </div>

              <p className="mt-6 border-t border-[var(--color-rule)] pt-5 text-[13.5px] leading-[1.6] text-[var(--color-ink-3)]">
                Sie können sich jederzeit{" "}
                <Link href="/software-newsletter-anmelden/newsletter-abmelden" className="link-red">
                  mit einem Klick abmelden
                </Link>
                , ohne Anmeldung und ohne Begründung. Wie wir Ihre Adresse verarbeiten, steht in der{" "}
                <Link href="/datenschutzerklaerung-und-privatsphaere" className="link-red">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </Card>

            {!result.ok ? (
              <p className="mt-6 text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
                Sie können sich jederzeit{" "}
                <Link href="/software-newsletter-anmelden" className="link-red">
                  erneut anmelden
                </Link>
                . Wir schicken dann einen neuen Bestätigungslink.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
