"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Checkbox, Field, Input, Select, Textarea, cx } from "@/components/ui/primitives";
import { IconCheck, IconSearch } from "@/components/icons";
import { sendContactAction, subscribeNewsletterAction } from "@/app/actions";

/* ==========================================================================
   Hero search. Submits to /software-und-wissen-durchsuchen, so it works without JavaScript.
   ========================================================================== */

export function HeroSearch({ chips }: { chips: { label: string; href: string }[] }) {
  return (
    <div className="w-full max-w-[42rem]">
      {/* One white plate carrying the field and the action, so both stay
          legible over the photograph without a fade behind them. */}
      <form
        action="/software-und-wissen-durchsuchen"
        method="get"
        role="search"
        className="flex flex-col gap-2 rounded-[9px] bg-white p-2 shadow-[var(--shadow-over)] sm:flex-row"
      >
        <div className="relative flex-1">
          <label htmlFor="hero-q" className="sr-only">
            Software, Kategorie oder Fachbegriff suchen
          </label>
          <IconSearch
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-3)]"
          />
          <input
            id="hero-q"
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Buchhaltung, DATEV, Lohnabrechnung …"
            className="h-12 w-full rounded-[6px] bg-transparent pl-12 pr-3 text-[15.5px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="shrink-0 !rounded-[6px] sm:px-8"
        >
          Suchen
        </Button>
      </form>

      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {chips.map((chip) => (
          <li key={chip.href}>
            <Link
              href={chip.href}
              className="inline-flex min-h-9 items-center rounded-[5px] border border-[var(--color-rule)] bg-white/85 px-3.5 py-1 text-[13px] font-medium text-[var(--color-ink-2)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-white"
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   Comparison selector. Two selects and a button.
   ========================================================================== */

export function ComparisonSelector({
  options,
  defaultA,
  defaultB,
  compact = false,
}: {
  options: { slug: string; name: string; category: string }[];
  defaultA?: string;
  defaultB?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [a, setA] = useState(defaultA ?? options[0]?.slug ?? "");
  const [b, setB] = useState(defaultB ?? options[1]?.slug ?? "");
  const [error, setError] = useState<string | null>(null);

  const groups = [...new Set(options.map((o) => o.category))];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!a || !b) {
      setError("Bitte wählen Sie zwei Programme aus.");
      return;
    }
    if (a === b) {
      setError("Bitte wählen Sie zwei verschiedene Programme aus.");
      return;
    }
    setError(null);
    router.push(`/software-im-direktvergleich/${a}-vs-${b}`);
  }

  const optionGroups = groups.map((group) => (
    <optgroup key={group} label={group}>
      {options.filter((o) => o.category === group).map((o) => <option key={o.slug} value={o.slug}>{o.name}</option>)}
    </optgroup>
  ));

  if (compact) return (
    <form onSubmit={submit} className="mx-auto max-w-[58rem]">
      <div className="grid items-end gap-3 rounded-[14px] border border-[var(--color-rule)] bg-white p-4 shadow-[var(--shadow-lift)] sm:grid-cols-[1fr_auto_1fr_auto] sm:p-5">
        <Field label="Erstes Programm" htmlFor="cmp-a" required><Select id="cmp-a" value={a} onChange={(e) => setA(e.target.value)} className="h-11 rounded-[7px] font-medium">{optionGroups}</Select></Field>
        <button type="button" onClick={() => { setA(b); setB(a); }} aria-label="Programme tauschen" className="h-11 rounded-[7px] border border-[var(--color-rule)] px-3 text-[17px] text-[var(--color-primary)] hover:bg-[var(--color-accent-tint)]">⇄</button>
        <Field label="Zweites Programm" htmlFor="cmp-b" required><Select id="cmp-b" value={b} onChange={(e) => setB(e.target.value)} className="h-11 rounded-[7px] font-medium">{optionGroups}</Select></Field>
        <Button type="submit" variant="primary" className="!rounded-[7px]">Vergleichen ↗</Button>
      </div>
      {error ? <p role="alert" className="mt-3 text-center text-[13px] text-[var(--color-negative)]">{error}</p> : null}
    </form>
  );

  return (
    <form onSubmit={submit} className="mx-auto max-w-[58rem]">
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-5">
        <div className="rounded-[12px] border border-[var(--color-rule)] bg-white p-6 shadow-[var(--shadow-lift)]">
          <p className="t-micro mb-6 text-[var(--color-accent)]">01 · Erste Auswahl</p>
          <Field label="Erstes Programm" htmlFor="cmp-a" required>
          <Select id="cmp-a" value={a} onChange={(e) => setA(e.target.value)} className="h-12 rounded-[7px] bg-white font-medium">
            {groups.map((group) => (
              <optgroup key={group} label={group}>
                {options
                  .filter((o) => o.category === group)
                  .map((o) => (
                    <option key={o.slug} value={o.slug}>
                      {o.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </Select>
          </Field>
          <p className="mt-4 text-[13px] text-[var(--color-ink-3)]">{options.find((item) => item.slug === a)?.category}</p>
        </div>

        <button type="button" onClick={() => { setA(b); setB(a); }} className="self-center justify-self-center rounded-[7px] border border-[var(--color-rule)] bg-white px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-tint)]" aria-label="Programme tauschen">⇄</button>

        <div className="rounded-[12px] border border-[var(--color-rule)] bg-white p-6 shadow-[var(--shadow-lift)]">
          <p className="t-micro mb-6 text-[var(--color-red)]">02 · Zweite Auswahl</p>
          <Field label="Zweites Programm" htmlFor="cmp-b" required>
          <Select id="cmp-b" value={b} onChange={(e) => setB(e.target.value)} className="h-12 rounded-[7px] bg-white font-medium">
            {groups.map((group) => (
              <optgroup key={group} label={group}>
                {options
                  .filter((o) => o.category === group)
                  .map((o) => (
                    <option key={o.slug} value={o.slug}>
                      {o.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </Select>
          </Field>
          <p className="mt-4 text-[13px] text-[var(--color-ink-3)]">{options.find((item) => item.slug === b)?.category}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Button type="submit" variant="primary" size="lg" className="w-full max-w-[18rem] !rounded-[7px]">Vergleich öffnen <span aria-hidden="true">↗</span></Button>
        <p className="text-center text-[13px] text-[var(--color-ink-3)]">Alle {options.length} Programme sind frei kombinierbar.</p>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-center text-[13.5px] text-[var(--color-negative)]">
          {error}
        </p>
      ) : null}
    </form>
  );
}

/* ==========================================================================
   Newsletter. Double opt in is mandatory in Germany; the copy says so and
   the submit handler stands in for the server action that sends the token.
   ========================================================================== */

export function NewsletterForm({
  compact = false,
  inverse = false,
}: {
  compact?: boolean;
  /** Set on a dark panel: the copy and the legal line flip to light. */
  inverse?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* A courtesy check so the visitor is not made to wait for a round trip to
       be told about a missing @. The validation that counts runs on the
       server, because a form post is just an HTTP request. */
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
      setState("error");
      setMessage("Bitte geben Sie eine gültige E-Mail-Adresse an.");
      return;
    }
    if (!data.get("consent")) {
      setState("error");
      setMessage("Ohne Ihre Einwilligung dürfen wir Ihnen keinen Newsletter senden.");
      return;
    }

    setState("sending");
    data.set("source", compact ? "footer" : "newsletter-seite");
    const result = await subscribeNewsletterAction(data);

    setMessage(result.message);
    setState(result.ok ? "done" : "error");
    if (result.ok) form.reset();
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className={cx(
          "flex items-start gap-3 rounded-[16px] p-5 text-left",
          inverse ? "bg-white/10" : "border border-[var(--color-rule)] bg-[var(--color-paper-2)]",
        )}
      >
        <IconCheck
          size={20}
          className={cx("mt-0.5 shrink-0", inverse ? "text-white" : "text-[var(--color-positive)]")}
        />
        <p
          className={cx(
            "text-[14.5px] leading-[1.6]",
            inverse ? "text-white/85" : "text-[var(--color-ink-2)]",
          )}
        >
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div
        className={cx(
          "flex flex-col gap-2",
          compact ? "" : "sm:flex-row",
          inverse ? "rounded-[9px] bg-white p-2" : "",
        )}
      >
        <div className="flex-1">
          <label htmlFor="nl-email" className="sr-only">
            E-Mail-Adresse
          </label>
          {inverse ? (
            <input
              id="nl-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="ihre.adresse@firma.de"
              aria-describedby="nl-legal"
              className="h-12 w-full rounded-[6px] bg-transparent px-4 text-[15.5px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            />
          ) : (
            <Input
              id="nl-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="ihre.adresse@firma.de"
              aria-describedby="nl-legal"
            />
          )}
        </div>

        {/* Honeypot, hidden from people and from screen readers. */}
        <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
          <label htmlFor="nl-website">Bitte nicht ausfüllen</label>
          <input id="nl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Button
          type="submit"
          variant="primary"
          size={inverse ? "lg" : "md"}
          disabled={state === "sending"}
          className={cx("shrink-0", inverse && "!rounded-[6px] sm:px-8")}
        >
          {state === "sending" ? "Wird gesendet …" : "Newsletter abonnieren"}
        </Button>
      </div>

      <div className={inverse ? "mx-auto max-w-[46ch] [&_label]:text-white/75" : ""}>
        <Checkbox
          id="nl-consent"
          name="consent"
          label={
            <>
              Ich möchte den Newsletter erhalten und bin damit einverstanden, dass meine
              E-Mail-Adresse zu diesem Zweck gespeichert wird. Die Einwilligung kann ich jederzeit
              über den Abmeldelink widerrufen. Einzelheiten in der{" "}
              <Link
                href="/datenschutzerklaerung-und-privatsphaere"
                className={inverse ? "text-white underline underline-offset-[3px]" : "link-accent"}
              >
                Datenschutzerklärung
              </Link>
              .
            </>
          }
        />
      </div>

      <p
        id="nl-legal"
        className={cx(
          "text-[12.5px] leading-[1.55]",
          inverse ? "text-white/55" : "text-[var(--color-ink-3)]",
        )}
      >
        Wir versenden im Double-Opt-in-Verfahren: Sie erhalten zuerst eine E-Mail mit einem
        Bestätigungslink, und erst nach Ihrer Bestätigung tragen wir Sie ein. Datum und Uhrzeit der
        Bestätigung speichern wir als Nachweis der Einwilligung.
      </p>

      {state === "error" ? (
        <p
          role="alert"
          className={cx("text-[13.5px]", inverse ? "text-white" : "text-[var(--color-negative)]")}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

/* ==========================================================================
   Contact form
   ========================================================================== */

const CONTACT_TOPICS = [
  "Korrektur zu einem Softwareprofil",
  "Frage zu einer Bewertung",
  "Anfrage als Anbieter",
  "Presseanfrage",
  "Datenschutzauskunft nach Art. 15 DSGVO",
  "Sonstiges",
];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* A courtesy pass so obvious gaps are caught without a round trip. The
       server validates the same fields again and does not trust these. */
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Bitte nennen Sie uns Ihren Namen.";
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email))
      next.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (body.length < 20) next.message = "Bitte beschreiben Sie Ihr Anliegen in mindestens 20 Zeichen.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setState("error");
      return;
    }

    setState("sending");
    const result = await sendContactAction(data);

    setErrors(result.errors ?? {});
    setMessage(result.message);
    setState(result.ok ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-[8px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5"
      >
        <IconCheck size={20} className="mt-0.5 shrink-0 text-[var(--color-positive)]" />
        <p className="text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" htmlFor="ct-name" required error={errors.name}>
          <Input id="ct-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="E-Mail-Adresse" htmlFor="ct-email" required error={errors.email}>
          <Input id="ct-email" name="email" type="email" required autoComplete="email" />
        </Field>
      </div>

      <Field label="Thema" htmlFor="ct-topic" required>
        <Select id="ct-topic" name="topic" required defaultValue={CONTACT_TOPICS[0]}>
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Ihre Nachricht"
        htmlFor="ct-message"
        required
        error={errors.message}
        hint="Bei einer Korrektur helfen uns Produktname, betroffene Angabe und wenn möglich eine Quelle."
      >
        <Textarea id="ct-message" name="message" required rows={7} />
      </Field>

      <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
        <label htmlFor="ct-website">Bitte nicht ausfüllen</label>
        <input id="ct-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
        Wir speichern Ihre Nachricht zur Bearbeitung Ihres Anliegens auf Grundlage von Art. 6 Abs. 1
        lit. f DSGVO und löschen sie spätestens nach 24 Monaten. Zusätzlich speichern wir einen
        gesalzenen Hashwert Ihrer IP-Adresse zur Abwehr von Missbrauch, niemals die Adresse selbst.
        Einzelheiten in der{" "}
        <Link href="/datenschutzerklaerung-und-privatsphaere" className="link-red">
          Datenschutzerklärung
        </Link>
        .
      </p>

      {state === "error" && message ? (
        <p role="alert" className="text-[13.5px] text-[var(--color-negative)]">
          {message}
        </p>
      ) : null}

      <div>
        <Button type="submit" variant="primary" size="lg" disabled={state === "sending"}>
          {state === "sending" ? "Wird gesendet …" : "Nachricht senden"}
        </Button>
      </div>
    </form>
  );
}
