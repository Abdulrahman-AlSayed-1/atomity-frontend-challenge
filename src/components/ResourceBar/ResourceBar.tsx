"use client";

import { motion } from "framer-motion";

interface ResourceBarProps {
 label: string;
 heightPercent: number;
 cost?: number;
 index: number;
 animate: boolean;
}

/**
 * ResourceBar — single animated bar in the central chart.
 * Uses Framer Motion spring for grow-from-bottom animation.
 */
export function ResourceBar({
 label,
 heightPercent,
 cost,
 index,
 animate,
}: ResourceBarProps) {
 const maxBarPx = 160; // max bar height in px
 const targetHeight = (heightPercent / 100) * maxBarPx;

 return (
 <div className="flex flex-col items-center gap-2 w-11">
 {/* Bar container */}
 <div
 className="relative flex items-end justify-center w-full rounded-t-sm h-40"
 aria-label={`${label} resource bar at ${heightPercent}%`}
 >
 {/* Track (background) */}
 <div
 className="absolute inset-x-0 bottom-0 top-0 rounded-md opacity-10 bg-accentGreen"
 />

 {/* Animated fill */}
 <motion.div
 className="absolute inset-x-0 bottom-0 rounded-md"
 initial={{ height: 0 }}
 animate={{ height: animate ? targetHeight : 0 }}
 transition={{
 type: "spring",
 stiffness: 90,
 damping: 18,
 delay: index * 0.08,
 }}
 style={{
 background:
 "linear-gradient(to top, var(--color-accent-green-bright), var(--color-accent-green))",
 boxShadow: animate
 ? "0 -4px 20px var(--color-accent-green-glow)"
 : "none",
 }}
 />

 {/* Cost label on top of bar */}
 {cost !== undefined && animate && (
 <motion.span
 initial={{ opacity: 0, y: 4 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: index * 0.08 + 0.5, duration: 0.3 }}
 className="absolute -top-6 text-[10px] font-mono font-medium whitespace-nowrap"
 style={{ color: "var(--color-accent-green)" }}
 >
 ${cost.toLocaleString()}
 </motion.span>
 )}
 </div>

 {/* Label */}
 <span
 className="text-[11px] font-medium text-center"
 style={{ color: "var(--color-text-secondary)" }}
 >
 {label}
 </span>
 </div>
 );
}
