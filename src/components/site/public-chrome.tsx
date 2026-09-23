"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The public header, footer and consent banner belong to the public site. The
 * editorial back office is a different application that happens to share an
 * origin, and rendering a marketing footer under a moderation queue would be
 * confusing rather than consistent.
 */
export function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
