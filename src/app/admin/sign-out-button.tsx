"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/primitives";
import { signOutAction } from "./actions";

export function SignOutButton() {
  const [pending, start] = useTransition();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      disabled={pending}
      onClick={() => start(() => void signOutAction())}
    >
      {pending ? "Wird abgemeldet …" : "Abmelden"}
    </Button>
  );
}
