"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
 target: number;
 duration?: number; // ms
 decimals?: number;
 prefix?: string;
 suffix?: string;
 enabled?: boolean;
}

/**
 * useCountUp — animated number counting hook using requestAnimationFrame.
 * Respects prefers-reduced-motion by jumping instantly to the target value.
 */
export function useCountUp({
 target,
 duration = 1800,
 decimals = 0,
 prefix = "",
 suffix = "",
 enabled = true,
}: UseCountUpOptions): string {
 const [display, setDisplay] = useState("0");
 const rafRef = useRef<number | null>(null);

 useEffect(() => {
 if (!enabled) return;

 // Respect prefers-reduced-motion
 const prefersReduced = window.matchMedia(
 "(prefers-reduced-motion: reduce)"
 ).matches;

 if (prefersReduced) {
 setDisplay(`${prefix}${target.toFixed(decimals)}${suffix}`);
 return;
 }

 const start = performance.now();

 const step = (now: number) => {
 const elapsed = now - start;
 const progress = Math.min(elapsed / duration, 1);
 // Ease-out cubic
 const eased = 1 - Math.pow(1 - progress, 3);
 const current = eased * target;
 setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);

 if (progress < 1) {
 rafRef.current = requestAnimationFrame(step);
 }
 };

 rafRef.current = requestAnimationFrame(step);
 return () => {
 if (rafRef.current) cancelAnimationFrame(rafRef.current);
 };
 }, [target, duration, decimals, prefix, suffix, enabled]);

 return display;
}
