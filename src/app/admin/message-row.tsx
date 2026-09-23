"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/primitives";
import type { ContactMessage } from "@/lib/admin-queries";
import { setMessageStatusAction } from "./actions";

const DATE = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const LABEL: Record<string, string> = {
  new: "Neu",
  read: "Gelesen",
  answered: "Beantwortet",
};

export function MessageRow({ message }: { message: ContactMessage }) {
  const [status, setStatus] = useState(message.status);
  const [pending, start] = useTransition();
  const [open, setOpen] = useState(false);

  function change(next: string) {
    const previous = status;
    setStatus(next);
    start(async () => {
      const data = new FormData();
      data.set("id", message.id);
      data.set("status", next);
      const result = await setMessageStatusAction(data);
      if (!result.ok) setStatus(previous);
    });
  }

  return (
    <li className="rounded-[10px] border border-[var(--color-rule)] bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[15px] font-medium text-[var(--color-ink)]">{message.topic}</p>
        <p className="text-[13px] text-[var(--color-ink-3)]" data-numeric>
          {DATE.format(new Date(message.created_at))}
        </p>
      </div>

      <p className="mt-1 text-[13.5px] text-[var(--color-ink-3)]">
        {message.name} ·{" "}
        <a href={`mailto:${message.email}`} className="link-red">
          {message.email}
        </a>{" "}
        · {LABEL[status] ?? status}
      </p>

      <p
        className={`mt-3 whitespace-pre-line text-[14px] leading-[1.6] text-[var(--color-ink-2)] ${
          open ? "" : "line-clamp-3"
        }`}
      >
        {message.message}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="quiet" size="sm" onClick={() => setOpen((v) => !v)}>
          {open ? "Weniger" : "Ganze Nachricht"}
        </Button>
        {status !== "read" ? (
          <Button type="button" variant="secondary" size="sm" disabled={pending} onClick={() => change("read")}>
            Als gelesen markieren
          </Button>
        ) : null}
        {status !== "answered" ? (
          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={pending}
            onClick={() => change("answered")}
          >
            Als beantwortet markieren
          </Button>
        ) : null}
      </div>
    </li>
  );
}
