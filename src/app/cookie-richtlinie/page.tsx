import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, ProseSection } from "@/components/ui/page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description:
    "Welche Speicherzugriffe diese Seite vornimmt, warum sie notwendig sind und wie Sie Ihre Entscheidung ändern.",
  alternates: { canonical: "/cookie-richtlinie" },
};

const ENTRIES = [
  {
    name: "pm-consent",
    type: "Lokaler Speicher",
    purpose:
      "Speichert Ihre Entscheidung im Einwilligungsbanner samt Fassung der Datenschutzerklärung und Zeitpunkt, damit wir nicht bei jedem Aufruf erneut fragen.",
    duration: "Bis Sie ihn löschen oder eine neue Fassung der Erklärung erscheint",
    necessary: true,
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Cookie-Richtlinie", href: "/cookie-richtlinie" }]}
        micro="Cookie-Richtlinie"
        title="Was diese Seite auf Ihrem Gerät speichert"
        lede="Die kurze Antwort: einen einzigen Eintrag, und der merkt sich Ihre Entscheidung zu dieser Frage. Die lange Antwort steht darunter."
      />

      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <h2 className="t-heading-3">Die vollständige Liste</h2>

          <div className="scroll-x mt-6">
            <table className="w-full min-w-[42rem]">
              <caption className="sr-only">
                Vollständige Liste der Speicherzugriffe dieser Website
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-rule-strong)]">
                  <th scope="col" className="w-[10rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Bezeichnung
                  </th>
                  <th scope="col" className="w-[9rem] py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Art
                  </th>
                  <th scope="col" className="py-3 pr-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Zweck
                  </th>
                  <th scope="col" className="w-[13rem] py-3 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                    Dauer
                  </th>
                </tr>
              </thead>
              <tbody>
                {ENTRIES.map((entry) => (
                  <tr key={entry.name} className="border-b border-[var(--color-rule)]">
                    <th scope="row" className="py-4 pr-4 text-left text-[13.5px] font-medium text-[var(--color-ink)]">
                      <code className="font-mono">{entry.name}</code>
                      <span className="mt-1 block text-[12px] font-normal text-[var(--color-ink-3)]">
                        {entry.necessary ? "technisch notwendig" : "einwilligungspflichtig"}
                      </span>
                    </th>
                    <td className="py-4 pr-4 text-[13.5px] text-[var(--color-ink-2)]">{entry.type}</td>
                    <td className="py-4 pr-4 text-[13.5px] leading-[1.55] text-[var(--color-ink-2)]">
                      {entry.purpose}
                    </td>
                    <td className="py-4 text-[13.5px] leading-[1.55] text-[var(--color-ink-2)]">
                      {entry.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-[62ch] text-[14px] leading-[1.62] text-[var(--color-ink-2)]">
            Das ist die gesamte Liste. Es gibt keinen weiteren Eintrag, keinen Zähler, keinen
            Werbekennung und keine Einbindung eines fremden Dienstes, die einen setzen könnte.
          </p>
        </div>
      </section>

      <ProseSection>
        <h2>Warum es überhaupt ein Banner gibt</h2>
        <p>
          Nach § 25 Abs. 2 TDDDG braucht ein technisch notwendiger Speicherzugriff keine
          Einwilligung. Der oben genannte Eintrag wäre also auch ohne Banner zulässig.
        </p>
        <p>
          Wir fragen trotzdem, und zwar aus einem praktischen Grund: Sollten wir später eine
          Reichweitenmessung einbinden, brauchen wir dafür eine dokumentierte Einwilligung. Ein
          Banner, das erst dann erscheint, kommt für alle zu spät, die schon vorher da waren.
        </p>

        <h2>Was Sie zustimmen können</h2>
        <p>
          Im Banner gibt es eine Schaltfläche für die Reichweitenmessung. Derzeit ist keine
          eingebunden, und Ihre Zustimmung löst deshalb nichts aus. Sie wird gespeichert für den
          Fall, dass sich das ändert. Wenn es soweit ist, nennen wir das Werkzeug hier namentlich
          und holen bei einer wesentlichen Änderung eine neue Einwilligung ein.
        </p>

        <h2>Wie Sie Ihre Entscheidung ändern</h2>
        <p>
          Über den Link „Cookie-Einstellungen“ im Fußbereich jeder Seite. Der Widerruf ist mit
          demselben Aufwand möglich wie die Erteilung, so wie es Art. 7 Abs. 3 DSGVO verlangt.
        </p>
        <p>
          Sie können den Eintrag außerdem jederzeit in Ihrem Browser löschen. Danach erscheint das
          Banner beim nächsten Aufruf erneut, weil wir Ihre frühere Entscheidung dann nicht mehr
          kennen.
        </p>

        <h2>Was auf verlinkten Seiten gilt</h2>
        <p>
          Wenn Sie zu einem Softwareanbieter wechseln, gelten dort dessen Regeln. Manche Anbieter
          setzen unmittelbar nach dem Aufruf Werbekennungen. Darauf haben wir keinen Einfluss und
          können dafür nicht einstehen.
        </p>

        <h2>Weiterlesen</h2>
        <p>
          Welche Daten wir im Einzelnen verarbeiten, auf welcher Rechtsgrundlage und wie lange,
          steht in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>
      </ProseSection>
    </>
  );
}
