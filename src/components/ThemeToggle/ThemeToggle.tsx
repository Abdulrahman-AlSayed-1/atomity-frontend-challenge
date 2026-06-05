"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

/**
 * ThemeToggle — dark/light mode toggle button.
 * Demonstrates token architecture: theme switch updates CSS variables globally.
 */
export function ThemeToggle() {
 const { theme, toggleTheme } = useTheme();
 const isDark = theme === "dark";

 return (
 <button
 onClick={toggleTheme}
 aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
 className="relative flex items-center w-12 h-6 rounded-full border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
 style={{
 background: isDark
 ? "var(--color-accent-green-muted)"
 : "var(--color-bg-surface)",
 borderColor: "var(--color-border-strong)",
 outlineColor: "var(--color-accent-green)",
 }}
 >
 {/* Sliding knob */}
 <motion.span
 layout
 transition={{ type: "spring", stiffness: 500, damping: 30 }}
 className="absolute w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
 style={{
 left: isDark ? "calc(100% - 18px)" : "2px",
 background: isDark
 ? "var(--color-accent-green)"
 : "var(--color-text-secondary)",
 boxShadow: isDark ? "0 0 8px var(--color-accent-green-glow)" : "none",
 }}
 >
 {isDark ? "🌙" : "☀️"}
 </motion.span>
 </button>
 );
}
