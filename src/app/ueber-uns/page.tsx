import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteFigures, getSoftwareList } from "@/lib/queries";
import { formatCount, formatDate, formatReviewCount } from "@/lib/format";
import { siteSettings } from "@/data/site";
import { PageHeader } from "@/components/ui/page";
import { Card, ButtonLink, SectionHead } from "@/components/ui/primitives";
import {
  IconArrowRight,
  IconAudit,
  IconCheck,
  IconDisclosure,
  IconEuro,
  IconLedger,
  IconMail,
  IconSearch,
} from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Wer diese Seite betreibt, wie ein Softwareprofil entsteht, wie sie finanziert wird und warum Provisionen keinen Einfluss auf Noten und Reihenfolge haben.",
  alternates: { canonical: "/ueber-uns" },
};

/* --------------------------------------------------------------------------
   The method. This is the part an Anbieter and eine Leserin gleichermaßen
   nachvollziehen können müssen, deshalb steht es weit oben und nicht im
   Fließtext vergraben.
   -------------------------------------------------------------------------- */

const METHODE = [
  {
    icon: IconSearch,
    step: "01",
    title: "Angaben an der Quelle holen",
    text: "Jede Angabe stammt von der Herstellerseite selbst, nicht aus einem Verzeichnis und nicht aus einer Pressemitteilung. Preise, Tarifnamen, Testphasen und enthaltene Funktionen lesen wir dort nach, wo der Anbieter sie verbindlich nennt.",
  },
  {
    icon: IconLedger,
    step: "02",
    title: "Auf den deutschen Alltag prüfen",
    text: "Wir prüfen die Punkte, an denen es hierzulande tatsächlich klemmt: DATEV-Schnittstelle, SKR03 und SKR04, GoBD, E-Rechnung nach EN 16931, ELSTER, DEÜV-Meldungen und die Frage, ob die Daten in einem Rechenzentrum in Deutschland liegen.",
  },
  {
    icon: IconEuro,
    step: "03",
    title: "Preis mit Datum festhalten",
    text: "Zu jedem Programm steht, wann wir den Preis zuletzt gesehen haben. Ohne dieses Datum ist eine Preisangabe im Softwaremarkt wertlos, weil Tarife und Aktionen sich mehrmals im Jahr ändern.",
  },
  {
    icon: IconAudit,
    step: "04",
    title: "Offene Fragen offen lassen",
    text: "Was ein Anbieter nicht öffentlich beantwortet, tragen wir als ungeprüft ein. Ein leeres Feld ist kein Nein. Diese Unterscheidung ist der Grund, warum unsere Profile an manchen Stellen zurückhaltender sind als andere Verzeichnisse.",
  },
];

const GRUNDSAETZE = [
  "Wir nehmen kein Geld für die Aufnahme in den Bestand und keines für eine bessere Platzierung.",
  "Wir lassen Anbieter keine Texte gegenlesen, bevor sie erscheinen.",
  "Wir veröffentlichen keine Bewertung, für die eine Gegenleistung geflossen ist.",
  "Wir erfinden keine Note für ein Produkt, zu dem keine Bewertungen vorliegen.",
  "Wir kennzeichnen vergütete Links vor dem Klick, nicht im Kleingedruckten.",
];

export default async function AboutPage() {
  const figures = await getSiteFigures();

  /* Die Finanzierungsangabe darf dem Affiliate-Hinweis nie widersprechen,
     deshalb kommt sie aus derselben Quelle: dem Bestand selbst. */
  const alle = await getSoftwareList({ sort: "name" });
  const mitVereinbarung = alle.some((item) => item.affiliate_url !== null);

  const zahlen = [
    { label: "Geprüfte Programme", value: formatCount(figures.softwareCount) },
    { label: "Kategorien", value: formatCount(figures.categoryCount) },
    { label: "Bewertungen", value: formatReviewCount(figures.reviewCount) },
    {
      label: "Preise zuletzt geprüft",
      value: figures.lastCheckedAt ? formatDate(figures.lastCheckedAt) : "laufend",
    },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Über uns", href: "/ueber-uns" }]}
        micro="Über uns"
        title="Wer hinter Softwareblick steht"
        lede="Eine unabhängige Redaktion aus Magdeburg, die Unternehmenssoftware für den deutschen Mittelstand prüft. Jede Angabe hat eine Quelle, jeder Preis ein Datum, und jede offene Frage bleibt als offene Frage stehen."
        meta={
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] py-1.5 pl-1.5 pr-4">
            <Image
              src="/flags/de.svg"
              alt="Flagge der Bundesrepublik Deutschland"
              width={60}
              height={40}
              className="h-5 w-[30px] rounded-[4px] object-cover ring-1 ring-black/10"
            />
            <span className="text-[13px] font-medium text-[var(--color-ink-2)]">
              Redaktion mit Sitz in {siteSettings.operator.city}
            </span>
          </span>
        }
      />

      {/* -------------------------------------------------------------- Zahlen */}
      <section className="border-b border-[var(--color-rule)] bg-[var(--color-paper-2)]">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
            {zahlen.map((zahl) => (
              <div
                key={zahl.label}
                className="flex flex-col items-center px-4 py-8 text-center md:py-10"
              >
                <dd
                  data-numeric
                  className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--color-ink)]"
                >
                  {zahl.value}
                </dd>
                <dt className="mt-2.5 text-[12.5px] leading-[1.4] text-[var(--color-ink-3)]">
                  {zahl.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ Methode */}
      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <SectionHead
            micro="Arbeitsweise"
            title="Wie ein Profil auf dieser Seite entsteht"
            lede="Vier Schritte, die bei jedem Programm gleich ablaufen. Sie sind der Grund, warum bei uns manche Felder leer bleiben, während andere Vergleichsseiten dort eine Angabe stehen haben."
          />

          <ol className="mx-auto mt-14 grid max-w-[72rem] gap-5 md:grid-cols-2">
            {METHODE.map((schritt) => {
              const Icon = schritt.icon;
              return (
                <li key={schritt.step}>
                  <Card className="h-full p-6 md:p-7">
                    <div className="flex items-center gap-3.5">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-accent-tint)] text-[var(--color-accent)]">
                        <Icon size={20} />
                      </span>
                      <span
                        data-numeric
                        className="text-[12px] font-medium tracking-[0.2em] text-[var(--color-ink-4)]"
                      >
                        {schritt.step}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[17.5px] font-semibold leading-[1.25] tracking-[-0.015em] text-[var(--color-ink)]">
                      {schritt.title}
                    </h3>
                    <p className="mt-2.5 text-[14.8px] leading-[1.68] text-[var(--color-ink-2)]">
                      {schritt.text}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------------------- Fließtext */}
      <section className="section border-b border-[var(--color-rule)]">
        <div className="container-page">
          <div className="prose-editorial mx-auto max-w-[44rem]">
            <h2>Warum es diese Seite gibt</h2>
            <p>
              Wer in Deutschland eine Buchhaltungssoftware sucht, findet vor allem zwei Dinge:
              Produktseiten der Hersteller und Verzeichnisse, die Herstellerangaben ungeprüft
              übernehmen. Beides beantwortet die Frage nicht, die ein Betrieb tatsächlich hat.
            </p>
            <p>
              Diese Frage lautet selten, welche Software die beste sei. Sie lautet: Übergibt das
              Programm Buchungssätze so an meine Kanzlei, dass dort niemand nacharbeiten muss? Kann
              es eine XRechnung erzeugen, weil ich an eine Stadtverwaltung liefere? Läuft die
              Lohnabrechnung mit der DEÜV-Meldung durch, ohne dass jemand nebenher eine Tabelle
              pflegt? Und stimmt der Preis auf der Website überhaupt noch?
            </p>
            <p>
              Solche Fragen lassen sich beantworten, aber nur durch Nachsehen. Genau das tun wir,
              und genau das schreiben wir mit Datum auf.
            </p>

            <h2>Wie wir uns finanzieren</h2>
            {mitVereinbarung ? (
              <p>
                Diese Seite finanziert sich über Vermittlungsprovisionen. Klickt jemand auf einen
                gekennzeichneten Anbieterlink und schließt beim Hersteller ab, kann für uns eine
                Provision anfallen. Für Sie ändert sich am Preis dadurch nichts. Welche Anbieter das
                betrifft, steht namentlich im{" "}
                <Link href="/affiliate-hinweis">Affiliate-Hinweis</Link>. Betroffene Links sind vor
                dem Klick als Werbung gekennzeichnet, nicht erst im Kleingedruckten.
              </p>
            ) : (
              <p>
                Derzeit bestehen für die gelisteten Programme keine aktiven
                Vermittlungsvereinbarungen. Die Anbieterlinks führen unmittelbar zu den
                Herstellerseiten. Kommt später eine vergütete Partnerschaft hinzu, wird der
                betreffende Anbieter im{" "}
                <Link href="/affiliate-hinweis">Affiliate-Hinweis</Link> namentlich genannt und der
                Link vor dem Klick als Werbung gekennzeichnet, nicht erst im Kleingedruckten.
              </p>
            )}
            <p>
              Was daraus ausdrücklich nicht folgt: Provisionen haben keinen Einfluss auf Noten, auf
              die Reihenfolge einer Rangliste oder darauf, ob ein Produkt überhaupt aufgenommen
              wird. Die Note ist der Durchschnitt der veröffentlichten Bewertungen. Sie wird
              berechnet, nicht vergeben, und niemand in der Redaktion kann sie von Hand setzen.
            </p>
            <p>
              Auch Programme ohne jede Vermittlungsvereinbarung stehen im Bestand, werden nach
              denselben Kriterien geprüft und können in einer Rangliste vor einem vergüteten Produkt
              stehen. Solange zu einem Programm keine veröffentlichten Nutzerbewertungen vorliegen,
              zeigen wir dort keine Note. Redaktionelle Empfehlungen sind als Einordnung erkennbar
              und als solche benannt.
            </p>

            <h2>Wie wir mit Fehlern umgehen</h2>
            <p>
              Preise ändern sich, Funktionen kommen dazu, und manchmal tragen wir etwas falsch ein.
              Wenn Sie einen Fehler finden, schreiben Sie uns. Wir prüfen die Quelle nach und
              korrigieren. Bei inhaltlichen Korrekturen vermerken wir das Datum der Änderung am
              Eintrag.
            </p>
            <p>
              Anbieter dürfen uns ebenso auf Fehler hinweisen. Ein Korrekturwunsch, der sich auf
              eine überprüfbare Quelle stützt, wird genauso behandelt wie der einer Leserin. Ein
              Wunsch nach einer freundlicheren Darstellung ohne neue Fakten wird es nicht.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Grundsätze */}
      <section className="section border-b border-[var(--color-rule)] bg-[var(--color-paper-2)]">
        <div className="container-page">
          <SectionHead
            micro="Grundsätze"
            title="Was wir nicht tun"
            lede="Fünf Zusagen, an denen Sie uns messen können. Sie gelten unabhängig davon, ob zu einem Programm eine Vermittlungsvereinbarung besteht."
          />

          <ul className="mx-auto mt-12 grid max-w-[54rem] gap-3">
            {GRUNDSAETZE.map((satz) => (
              <li
                key={satz}
                className="flex items-start gap-3.5 rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper)] px-5 py-4"
              >
                <IconCheck size={20} className="mt-0.5 shrink-0 text-[var(--color-positive)]" />
                <span className="text-[15px] leading-[1.6] text-[var(--color-ink-2)]">{satz}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-[54rem] text-center text-[13.5px] leading-[1.6] text-[var(--color-ink-3)]">
            Ausführlich steht das in den{" "}
            <Link href="/redaktionsrichtlinien" className="link-red">
              Redaktionsrichtlinien
            </Link>{" "}
            und im{" "}
            <Link href="/affiliate-hinweis" className="link-red">
              Affiliate-Hinweis
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- Verantwortung */}
      <section className="section">
        <div className="container-page">
          <SectionHead
            micro="Verantwortlich"
            title="Wer hier schreibt"
            lede="Beiträge und Korrekturen sollen nachvollziehbar einer Person zugeordnet werden können. Deshalb steht hier ein Name und eine Anschrift, nicht ein Redaktionspostfach."
          />

          <div className="mx-auto mt-12 max-w-[42rem]">
            <Card className="p-7 text-center md:p-9">
              <span
                aria-hidden="true"
                className="inline-flex size-14 items-center justify-center rounded-full bg-[var(--color-ink)] font-[family-name:var(--font-display)] text-[20px] font-semibold text-white"
              >
                {siteSettings.editorialResponsible.name.charAt(0)}
              </span>

              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.015em] text-[var(--color-ink)]">
                {siteSettings.editorialResponsible.name}
              </h3>
              <p className="mt-1 text-[13.5px] text-[var(--color-ink-3)]">
                Gründer und verantwortlich für den redaktionellen Inhalt nach § 18 Abs. 2 MStV
              </p>

              <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-[1.68] text-[var(--color-ink-2)]">
                Ansprechpartner für Produktangaben, Korrekturen und redaktionelle Fragen. Anfragen
                von Anbietern und von Leserinnen und Lesern laufen über dieselbe Adresse und werden
                nach denselben Maßstäben beantwortet.
              </p>

              <address className="mt-6 border-t border-[var(--color-rule)] pt-6 text-[14px] not-italic leading-[1.6] text-[var(--color-ink-2)]">
                {siteSettings.editorialResponsible.street}
                <br />
                <span data-numeric>{siteSettings.editorialResponsible.zip}</span>{" "}
                {siteSettings.editorialResponsible.city}
                <br />
                <a
                  href={`mailto:${siteSettings.operator.email}`}
                  className="link-red mt-1.5 inline-flex items-center gap-1.5"
                >
                  <IconMail size={16} />
                  {siteSettings.operator.email}
                </a>
              </address>
            </Card>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/kontakt" variant="primary">
                Redaktion kontaktieren
                <IconArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="/redaktionsrichtlinien" variant="secondary">
                <IconDisclosure size={18} />
                Redaktionsrichtlinien
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
