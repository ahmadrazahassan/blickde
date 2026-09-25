"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Checkbox, Field, Input, Select, Textarea, cx } from "@/components/ui/primitives";
import { IconCheck, IconStar } from "@/components/icons";
import { submitReviewAction } from "@/app/actions";

const COMPANY_SIZES = [
  "1 Person",
  "2 bis 9 Mitarbeitende",
  "10 bis 49 Mitarbeitende",
  "50 bis 249 Mitarbeitende",
  "250 und mehr Mitarbeitende",
];

const INDUSTRIES = [
  "Handwerk",
  "Handel und E-Commerce",
  "Industrie und Produktion",
  "Bauwirtschaft",
  "Informationstechnik",
  "Unternehmensberatung",
  "Werbung und Design",
  "Steuerberatung und Rechtsberatung",
  "Gesundheitswesen",
  "Gastronomie und Hotellerie",
  "Logistik und Verkehr",
  "Bildung",
  "Öffentlicher Dienst",
  "Sonstige",
];

const DURATIONS = [
  "Weniger als sechs Monate",
  "Sechs bis zwölf Monate",
  "Ein bis zwei Jahre",
  "Über zwei Jahre",
];

const DIMENSIONS = [
  { name: "ease_of_use", label: "Bedienung" },
  { name: "value_for_money", label: "Preis-Leistungs-Verhältnis" },
  { name: "customer_service", label: "Kundenbetreuung" },
  { name: "functionality", label: "Funktionsumfang" },
] as const;

function StarInput({
  name,
  label,
  value,
  onChange,
  required,
}: {
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-[13.5px] font-medium text-[var(--color-ink)]">
        {label}
        {required ? (
          <span className="ml-1 text-[var(--color-red)]" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={star}
            className="flex size-11 cursor-pointer items-center justify-center rounded-[4px] transition-colors duration-200 hover:bg-[var(--color-paper-2)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-red)]"
          >
            <input
              type="radio"
              name={name}
              value={star}
              checked={value === star}
              onChange={() => onChange(star)}
              required={required}
              className="sr-only"
            />
            <span className="sr-only">
              {star} von 5 Punkten für {label}
            </span>
            <IconStar
              size={20}
              filled={star <= value}
              className={star <= value ? "text-[var(--color-gold)]" : "text-[var(--color-ink-4)]"}
            />
          </label>
        ))}
        <span
          data-numeric
          aria-hidden="true"
          className="ml-2 text-[13.5px] text-[var(--color-ink-3)]"
        >
          {value > 0 ? `${value} von 5` : "noch keine Auswahl"}
        </span>
      </div>
    </fieldset>
  );
}

export function ReviewForm({ softwareName, softwareSlug }: { softwareName: string; softwareSlug: string }) {
  const [overall, setOverall] = useState(0);
  const [dimensions, setDimensions] = useState<Record<string, number>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Record<string, string> = {};
    const name = String(data.get("reviewer_name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const title = String(data.get("review_title") ?? "").trim();
    const summary = String(data.get("summary") ?? "").trim();
    const pros = String(data.get("pros") ?? "").trim();
    const cons = String(data.get("cons") ?? "").trim();

    if (name.length < 2) next.reviewer_name = "Bitte nennen Sie Ihren Namen.";
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email))
      next.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (overall === 0) next.overall = "Bitte vergeben Sie eine Gesamtnote.";
    if (DIMENSIONS.some((d) => !dimensions[d.name]))
      next.dimensions = "Bitte bewerten Sie alle vier Dimensionen.";
    if (title.length < 10) next.review_title = "Die Überschrift sollte mindestens 10 Zeichen haben.";
    if (summary.length < 80)
      next.summary = "Bitte beschreiben Sie Ihre Erfahrung in mindestens 80 Zeichen.";
    if (pros.length < 15) next.pros = "Bitte nennen Sie mindestens einen konkreten Vorteil.";
    if (cons.length < 15) next.cons = "Bitte nennen Sie mindestens einen konkreten Nachteil.";
    if (!data.get("truthful")) next.truthful = "Diese Bestätigung ist erforderlich.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setState("error");
      return;
    }

    setState("sending");

    /* Die Server Action hasht die IP mit dem Pepper und schreibt die Zeile mit
       dem Status 'pending'. Es gibt von hier aus keinen Weg zu einer
       veröffentlichten Bewertung: darüber entscheidet ein Mensch in der
       Moderation. */
    data.set("software_slug", softwareSlug);
    data.set("overall_rating", String(overall));
    for (const dimension of DIMENSIONS) {
      data.set(dimension.name, String(dimensions[dimension.name] ?? 0));
    }

    const result = await submitReviewAction(data);
    setErrors(result.errors ?? {});
    setMessage(result.message);
    setState(result.ok ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="rounded-[8px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6"
      >
        <div className="flex items-start gap-3">
          <IconCheck size={20} className="mt-0.5 shrink-0 text-[var(--color-ink-3)]" />
          <div>
            <h2 className="text-[16px] font-semibold text-[var(--color-ink)]">
              Ihre Bewertung liegt zur Prüfung vor
            </h2>
            <p className="mt-2 max-w-[56ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
              {message}
            </p>
            <p className="mt-3 max-w-[56ch] text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
              Eine Bewertung darf nach § 5b Abs. 3 UWG nur erscheinen, wenn wir überprüft haben,
              dass sie von einer Person stammt, die das Produkt tatsächlich eingesetzt hat. Bei
              Rückfragen melden wir uns unter der angegebenen Adresse. Änderungen und Löschungen
              können Sie jederzeit über die{" "}
              <Link href="/kontakt-zur-redaktion" className="underline underline-offset-[3px]">
                Redaktionsadresse
              </Link>{" "}
              verlangen.
            </p>
            <Link
              href={`/unternehmenssoftware-vergleichen/${softwareSlug}`}
              className="mt-4 inline-flex text-[14px] text-[var(--color-red)] underline underline-offset-[3px]"
            >
              Zurück zum Profil von {softwareName}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-10">
      {/* ------------------------------------------------- your ratings */}
      <fieldset className="flex flex-col gap-6 border-t border-[var(--color-rule)] pt-8">
        <legend className="t-micro text-[var(--color-ink-3)]">1. Ihre Bewertung</legend>

        <StarInput
          name="overall_rating"
          label={`Gesamtnote für ${softwareName}`}
          value={overall}
          onChange={setOverall}
          required
        />
        {errors.overall ? (
          <p role="alert" className="text-[13px] text-[var(--color-negative)]">
            {errors.overall}
          </p>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          {DIMENSIONS.map((dimension) => (
            <StarInput
              key={dimension.name}
              name={dimension.name}
              label={dimension.label}
              value={dimensions[dimension.name] ?? 0}
              onChange={(value) => setDimensions((d) => ({ ...d, [dimension.name]: value }))}
              required
            />
          ))}
        </div>
        {errors.dimensions ? (
          <p role="alert" className="text-[13px] text-[var(--color-negative)]">
            {errors.dimensions}
          </p>
        ) : null}
      </fieldset>

      {/* ----------------------------------------------- your experience */}
      <fieldset className="flex flex-col gap-5 border-t border-[var(--color-rule)] pt-8">
        <legend className="t-micro text-[var(--color-ink-3)]">2. Ihre Erfahrung</legend>

        <Field label="Überschrift" htmlFor="rv-title" required error={errors.review_title}>
          <Input
            id="rv-title"
            name="review_title"
            maxLength={90}
            placeholder="Der eine Satz, den Sie einem Kollegen sagen würden"
          />
        </Field>

        <Field
          label="Ihre Erfahrung im Überblick"
          htmlFor="rv-summary"
          required
          error={errors.summary}
          hint="Was hat sich für Ihren Betrieb konkret geändert? Zahlen und Beispiele helfen anderen mehr als Adjektive."
        >
          <Textarea id="rv-summary" name="summary" rows={6} />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Was gut funktioniert" htmlFor="rv-pros" required error={errors.pros}>
            <Textarea id="rv-pros" name="pros" rows={4} />
          </Field>
          <Field label="Was fehlt oder stört" htmlFor="rv-cons" required error={errors.cons}>
            <Textarea id="rv-cons" name="cons" rows={4} />
          </Field>
        </div>

        <Field label="Nutzungsdauer" htmlFor="rv-duration" required>
          <Select id="rv-duration" name="used_for_duration" defaultValue={DURATIONS[1]}>
            {DURATIONS.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </Select>
        </Field>
      </fieldset>

      {/* ------------------------------------------------- about you */}
      <fieldset className="flex flex-col gap-5 border-t border-[var(--color-rule)] pt-8">
        <legend className="t-micro text-[var(--color-ink-3)]">3. Zu Ihrer Person</legend>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name" htmlFor="rv-name" required error={errors.reviewer_name}>
            <Input id="rv-name" name="reviewer_name" autoComplete="name" />
          </Field>
          <Field
            label="E-Mail-Adresse"
            htmlFor="rv-email"
            required
            error={errors.email}
            hint="Wird nicht veröffentlicht. Wir nutzen sie nur für Rückfragen."
          >
            <Input id="rv-email" name="email" type="email" autoComplete="email" />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Ihre Rolle im Betrieb" htmlFor="rv-role" required>
            <Input
              id="rv-role"
              name="reviewer_job_title"
              autoComplete="organization-title"
              placeholder="Geschäftsführerin, Buchhalter, IT-Leitung …"
            />
          </Field>
          <Field label="Betrieb" htmlFor="rv-company">
            <Input id="rv-company" name="reviewer_company" autoComplete="organization" />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Betriebsgröße" htmlFor="rv-size" required>
            <Select id="rv-size" name="reviewer_company_size" defaultValue={COMPANY_SIZES[1]}>
              {COMPANY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Branche" htmlFor="rv-industry" required>
            <Select id="rv-industry" name="reviewer_industry" defaultValue={INDUSTRIES[0]}>
              {INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </fieldset>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
        <label htmlFor="rv-website">Bitte nicht ausfüllen</label>
        <input id="rv-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* --------------------------------------------- confirm and send */}
      <div className="border-t border-[var(--color-rule)] pt-8">
        <Checkbox
          id="rv-truthful"
          name="truthful"
          label={
            <>
              Ich bestätige, dass ich {softwareName} selbst eingesetzt habe und dass meine Angaben
              zutreffen. Mir ist bekannt, dass wir keine Gegenleistung für Bewertungen gewähren und
              dass bezahlte oder erfundene Bewertungen nicht veröffentlicht werden.
            </>
          }
        />
        {errors.truthful ? (
          <p role="alert" className="text-[13px] text-[var(--color-negative)]">
            {errors.truthful}
          </p>
        ) : null}

        <p className={cx("mt-3 max-w-[60ch] text-[13px] leading-[1.6] text-[var(--color-ink-3)]")}>
          Wir speichern Ihre Angaben zur Prüfung und Veröffentlichung der Bewertung auf Grundlage
          von Art. 6 Abs. 1 lit. b und lit. f DSGVO, dazu einen gesalzenen Hashwert Ihrer
          IP-Adresse zur Erkennung von Mehrfacheinreichungen, niemals die Adresse selbst. Ihre
          E-Mail-Adresse wird nicht veröffentlicht. Einzelheiten stehen in der{" "}
          <Link href="/datenschutzerklaerung-und-privatsphaere" className="link-red">
            Datenschutzerklärung
          </Link>
          .
        </p>

        {state === "error" && message ? (
          <p role="alert" className="mt-4 text-[13.5px] text-[var(--color-negative)]">
            {message}
          </p>
        ) : null}

        <div className="mt-6">
          <Button type="submit" variant="primary" size="lg" disabled={state === "sending"}>
            {state === "sending" ? "Wird übermittelt …" : "Bewertung zur Prüfung einreichen"}
          </Button>
        </div>
      </div>
    </form>
  );
}
