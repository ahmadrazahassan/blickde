"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { siteSettings } from "@/data/site";
import { Button } from "@/components/ui/primitives";
import { recordConsentAction } from "@/app/actions";

const STORAGE_KEY = "pm-consent";
const ID_KEY = "pm-consent-id";
const OPEN_EVENT = "pm:open-consent";

interface ConsentRecord {
  analytics: boolean;
  marketing: boolean;
  version: string;
  decidedAt: string;
  id?: string;
}

function read(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    return parsed.version === siteSettings.privacyPolicyVersion ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * A random identifier for this browser's consent record, so a later withdrawal
 * can be tied to the grant it withdraws. It identifies a decision, not a
 * person, and it is generated here rather than derived from anything.
 */
function consentId(): string {
  try {
    const existing = window.localStorage.getItem(ID_KEY);
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    window.localStorage.setItem(ID_KEY, fresh);
    return fresh;
  } catch {
    return crypto.randomUUID();
  }
}

/**
 * § 25 TDDDG: nothing beyond what is strictly necessary loads before consent.
 * This build ships no analytics and no marketing scripts at all, so the banner
 * has nothing to release. It is here because the decision has to be recorded
 * and withdrawable, and withdrawal has to be as easy as granting.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setVisible(read() === null);
  }, []);

  useEffect(() => {
    function onOpen() {
      const current = read();
      setAnalytics(current?.analytics ?? false);
      setDetailed(true);
      setVisible(true);
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const decide = useCallback((next: { analytics: boolean; marketing: boolean }) => {
    const id = consentId();
    const previous = read();
    const record: ConsentRecord = {
      ...next,
      version: siteSettings.privacyPolicyVersion,
      decidedAt: new Date().toISOString(),
      id,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* A blocked storage means the banner reappears. That is acceptable. */
    }

    /* Section 25 TDDDG asks the operator to be able to demonstrate a consent.
       The record is written server side; a withdrawal is recorded the same
       way, because a withdrawal nobody logged is no easier to prove than a
       grant nobody logged. The interface does not wait for it: the decision
       already took effect locally. */
    const action: "grant" | "deny" | "withdraw" | "update" = !previous
      ? next.analytics || next.marketing
        ? "grant"
        : "deny"
      : (previous.analytics || previous.marketing) && !next.analytics && !next.marketing
        ? "withdraw"
        : "update";

    void recordConsentAction({
      consent_id: id,
      analytics: next.analytics,
      marketing: next.marketing,
      action,
      policy_version: siteSettings.privacyPolicyVersion,
    }).catch(() => {
      /* A failed log must never block the visitor's own decision. */
    });

    setVisible(false);
    setDetailed(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-heading"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-rule)] bg-white shadow-[var(--shadow-over)]"
    >
      <div className="container-page py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-[44rem]">
            <h2 id="consent-heading" className="text-[15px] font-semibold text-[var(--color-ink)]">
              Cookies und Einwilligung
            </h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink-2)]">
              Diese Seite setzt technisch notwendige Cookies, damit sie funktioniert. Darüber hinaus
              laden wir nichts, solange Sie nicht zustimmen. Ihre Entscheidung können Sie jederzeit
              über den Link „Cookie-Einstellungen“ im Fußbereich ändern. Einzelheiten stehen in der{" "}
              <Link href="/datenschutzerklaerung-und-privatsphaere" className="link-red">
                Datenschutzerklärung
              </Link>{" "}
              und in der{" "}
              <Link href="/cookie-richtlinie-und-einstellungen" className="link-red">
                Cookie-Richtlinie
              </Link>
              .
            </p>

            {detailed ? (
              <div className="mt-4 border-t border-[var(--color-rule)] pt-4">
                <div className="flex items-start gap-3 py-2">
                  <input
                    id="consent-necessary"
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 size-[18px] shrink-0 rounded-[4px] accent-[var(--color-ink-4)]"
                  />
                  <label htmlFor="consent-necessary" className="text-[13.5px] leading-[1.55]">
                    <span className="font-medium text-[var(--color-ink)]">Notwendig</span>
                    <span className="block text-[var(--color-ink-3)]">
                      Sitzungsverwaltung und Speicherung dieser Entscheidung. Lässt sich nicht
                      abwählen, weil die Seite sonst nicht funktioniert.
                    </span>
                  </label>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <input
                    id="consent-analytics"
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1 size-[18px] shrink-0 cursor-pointer rounded-[4px] accent-[var(--color-red)]"
                  />
                  <label htmlFor="consent-analytics" className="cursor-pointer text-[13.5px] leading-[1.55]">
                    <span className="font-medium text-[var(--color-ink)]">Reichweitenmessung</span>
                    <span className="block text-[var(--color-ink-3)]">
                      Anonyme Messung, welche Seiten aufgerufen werden. In dieser Fassung der Seite
                      ist keine Messung eingebunden. Ihre Einwilligung wird für den Fall gespeichert,
                      dass wir eine einsetzen.
                    </span>
                  </label>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col lg:w-56">
            <Button variant="primary" onClick={() => decide({ analytics: true, marketing: false })}>
              Alle zulassen
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                decide(detailed ? { analytics, marketing: false } : { analytics: false, marketing: false })
              }
            >
              {detailed ? "Auswahl speichern" : "Nur notwendige"}
            </Button>
            {!detailed ? (
              <Button variant="quiet" onClick={() => setDetailed(true)}>
                Einstellungen
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Withdrawal has to be as easy as granting, so this sits in the bottom bar. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`text-[13px] text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)] ${className}`}
    >
      Cookie-Einstellungen
    </button>
  );
}
