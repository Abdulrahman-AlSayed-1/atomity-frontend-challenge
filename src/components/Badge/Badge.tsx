"use client";

import { ReactNode } from "react";

interface BadgeProps {
 children: ReactNode;
 variant?: "default" | "success" | "muted" | "savings";
 size?: "sm" | "md";
 dot?: boolean;
}

/**
 * Badge — reusable status/label badge built from scratch.
 */
export function Badge({
 children,
 variant = "default",
 size = "sm",
 dot = false,
}: BadgeProps) {
 const base = [
 "inline-flex items-center gap-1.5 font-medium rounded-full border",
 "transition-all duration-200",
 size === "sm" ? "text-xs" : "text-sm",
 // Inline padding equivalents: sm => style={{paddingLeft: "2.5rem"}} (0.625rem) (0.125rem), default => style={{paddingLeft: "3rem"}} (0.75rem) (0.25rem)
 ].join(" ");

 const variantStyles: Record<string, string> = {
 default: [
 "bg-[var(--color-accent-green-muted)]",
 "text-[var(--color-accent-green)]",
 "border-[var(--color-border-subtle)]",
 ].join(" "),
 success: [
 "bg-[var(--color-accent-green-muted)]",
 "text-[var(--color-accent-green-bright)]",
 "border-[var(--color-border-strong)]",
 ].join(" "),
 muted: [
 "bg-[var(--color-bg-surface)]",
 "text-[var(--color-text-muted)]",
 "border-[var(--color-border-surface)]",
 ].join(" "),
 savings: [
 "bg-[var(--color-accent-savings-bg)]",
 "text-[var(--color-accent-savings)]",
 "border-[var(--color-border-strong)]",
 ].join(" "),
 };

 return (
 <span className={`${base} ${variantStyles[variant]}`}>
 {dot && (
 <span
 className="w-1.5 h-1.5 rounded-full flex-shrink-0"
 style={{
 backgroundColor:
 variant === "muted"
 ? "var(--color-text-muted)"
 : "var(--color-accent-green)",
 boxShadow:
 variant !== "muted" ? "0 0 4px var(--color-accent-green)" : "none",
 }}
 aria-hidden="true"
 />
 )}
 {children}
 </span>
 );
}
