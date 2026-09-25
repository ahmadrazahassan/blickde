"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/primitives";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    /* In production this is where the error reporter would be called. The
       digest is what lets us find the server side stack for this request. */
    console.error(error);
  }, [error]);

  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-[40rem]">
          <p data-numeric className="t-micro text-[var(--color-ink-3)]">
            Fehler 500
          </p>
          <h1 className="t-display-2 mt-4">Hier ist etwas schiefgelaufen</h1>
          <p className="t-lede mt-5">
            Der Fehler liegt bei uns, nicht bei Ihnen. Versuchen Sie es erneut. Wenn er bestehen
            bleibt, schreiben Sie uns und nennen Sie die Kennung unten; damit finden wir die
            betroffene Anfrage.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={reset}>
              Erneut versuchen
            </Button>
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-[6px] border border-[var(--color-rule)] px-6 text-[15.5px] font-medium text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-ink)]"
            >
              Zur Startseite
            </Link>
          </div>

          {error.digest ? (
            <p className="mt-8 border-t border-[var(--color-rule)] pt-6 text-[13.5px] text-[var(--color-ink-3)]">
              Fehlerkennung:{" "}
              <code data-numeric className="font-mono text-[var(--color-ink)]">
                {error.digest}
              </code>
            </p>
          ) : null}

          <p className="mt-4 text-[13.5px] leading-[1.6] text-[var(--color-ink-3)]">
            <Link href="/kontakt-zur-redaktion" className="link-red">
              Fehler melden
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
