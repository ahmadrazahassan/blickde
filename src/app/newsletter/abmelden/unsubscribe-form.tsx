"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Field, Input } from "@/components/ui/primitives";
import { IconCheck } from "@/components/icons";
import { unsubscribeNewsletterAction } from "@/app/actions";

export function UnsubscribeForm({
  hasToken,
  token,
  presetEmail,
}: {
  hasToken: boolean;
  token: string;
  presetEmail: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  /* A link from the mail footer carries a token. One click, no login, no
     reason given, and nothing further is asked of the reader. */
  useEffect(() => {
    if (!hasToken) return;
    let cancelled = false;
    setState("sending");
    unsubscribeNewsletterAction({ token }).then((result) => {
      if (cancelled) return;
      setMessage(result.message);
      setState(result.ok ? "done" : "error");
    });
    return () => {
      cancelled = true;
    };
  }, [hasToken, token]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
      setState("error");
      setMessage("Bitte geben Sie eine gültige E-Mail-Adresse an.");
      return;
    }

    setState("sending");
    const result = await unsubscribeNewsletterAction({ email });
    setMessage(result.message);
    setState(result.ok ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-[8px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6"
      >
        <IconCheck size={20} className="mt-0.5 shrink-0 text-[var(--color-positive)]" />
        <div>
          <h2 className="text-[16px] font-semibold text-[var(--color-ink)]">
            Sie sind abgemeldet
          </h2>
          <p className="mt-2 max-w-[52ch] text-[14.5px] leading-[1.62] text-[var(--color-ink-2)]">
            {message} Danach hören Sie nichts mehr von uns. Wenn Sie es sich anders überlegen,
            können Sie sich jederzeit{" "}
            <Link href="/newsletter" className="link-red">
              erneut anmelden
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  if (hasToken && state === "sending") {
    return (
      <p role="status" className="text-[15px] text-[var(--color-ink-2)]">
        Abmeldung wird verarbeitet …
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <Field
        label="E-Mail-Adresse"
        htmlFor="unsub-email"
        required
        error={state === "error" ? message : undefined}
        hint="Die Adresse, mit der Sie den Newsletter beziehen."
      >
        <Input
          id="unsub-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={presetEmail}
        />
      </Field>

      <div>
        <Button type="submit" variant="primary" size="lg" disabled={state === "sending"}>
          {state === "sending" ? "Wird verarbeitet …" : "Newsletter abbestellen"}
        </Button>
      </div>

      <p className="max-w-[52ch] text-[13px] leading-[1.6] text-[var(--color-ink-3)]">
        Wir bestätigen die Abmeldung nicht per E-Mail, weil das eine weitere Nachricht wäre, die Sie
        nicht wollten. Die Abmeldung ist sofort wirksam.
      </p>
    </form>
  );
}
