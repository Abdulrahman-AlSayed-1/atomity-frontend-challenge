"use client";

import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

/**
 * SectionLabel — Eyebrow pill container located above main layout headings.
 * 100% Pure Tailwind CSS implementation.
 */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-semibold tracking-[0.12em] uppercase bg-[var(--color-accent-green-muted)] border border-[var(--color-border-strong)] text-[var(--color-accent-green)]">
      <span
        className="block w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
        style={{
          backgroundColor: "var(--color-accent-green)",
          boxShadow: "0 0 6px var(--color-accent-green)",
        }}
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}