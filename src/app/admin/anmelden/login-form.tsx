"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Field, Input } from "@/components/ui/primitives";
import { signInAction } from "../actions";

export function LoginForm({ target }: { target: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const result = await signInAction(new FormData(event.currentTarget));
    if (result.ok) {
      router.replace(target);
      router.refresh();
      return;
    }

    setMessage(result.message);
    setState("error");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <Field label="E-Mail-Adresse" htmlFor="admin-email" required>
        <Input id="admin-email" name="email" type="email" autoComplete="username" required />
      </Field>

      <Field label="Passwort" htmlFor="admin-password" required>
        <Input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      {state === "error" ? (
        <p role="alert" className="text-[13.5px] text-[var(--color-negative)]">
          {message}
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" block disabled={state === "sending"}>
        {state === "sending" ? "Wird geprüft …" : "Anmelden"}
      </Button>
    </form>
  );
}
