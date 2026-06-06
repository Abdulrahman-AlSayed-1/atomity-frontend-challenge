"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

interface PodTooltipProps {
  visible: boolean;
  providerColor: string;
  cpuUsage: number;
  cpuRequest: number;
  memUsage: number;
  memRequest: number;
  estimatedSavings: number;
  podLabel: string;
}

interface MetricRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function MetricRow({ label, value, highlight = false }: MetricRowProps) {
  return (
    <div
      className="flex flex-col gap-0.5 pl-12! p-3! text-left"
      style={{
        borderRight: "1px solid var(--color-border-surface)",
        background: highlight
          ? "var(--color-accent-savings-bg)"
          : "transparent",
      }}
    >
      <span
        className="text-[9px] font-semibold tracking-widest uppercase"
        style={{
          color: highlight
            ? "var(--color-accent-savings)"
            : "var(--color-text-muted)",
        }}
      >
        {label}
      </span>
      <span
        className="text-sm font-bold font-mono"
        style={{
          color: highlight
            ? "var(--color-accent-savings)"
            : "var(--color-text-primary)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * PodTooltip — floating metrics card shown on pod hover/focus.
 * Fixed to remove Turbopack-crashing inline style string literal remnants.
 */
export function PodTooltip({
  visible,
  providerColor,
  cpuUsage,
  cpuRequest,
  memUsage,
  memRequest,
  estimatedSavings,
  podLabel,
}: PodTooltipProps) {
  const savingsDisplay = useCountUp({
    target: estimatedSavings,
    duration: 1200,
    decimals: 1,
    prefix: "$",
    suffix: "",
    enabled: visible,
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="tooltip"
          aria-label={`${podLabel} metrics`}
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 8 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="absolute z-50 rounded-xl overflow-hidden shadow-2xl"
          style={{
            bottom: "calc(100% + 16px)",
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: 320,
            background: "var(--color-bg-glass)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${providerColor}44`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${providerColor}22`,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2 border-b p-4! pl-12!"
            style={{
              borderColor: "var(--color-border-surface)",
              background: `${providerColor}11`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: providerColor,
                boxShadow: `0 0 6px ${providerColor}`,
              }}
            />
            <span
              className="text-xs font-semibold truncate"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {podLabel}
            </span>
          </div>

          {/* Metrics grid */}
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
          >
            <MetricRow label="CPU Usage" value={`${cpuUsage} M`} />
            <MetricRow label="CPU Request" value={`${cpuRequest} M`} />
            <MetricRow label="Mem Usage" value={`${memUsage} MiB`} />
            <MetricRow label="Mem Request" value={`${memRequest} GiB`} />
            <MetricRow
              label="Est. Savings"
              value={`${savingsDisplay}/mo`}
              highlight
            />
          </div>

          {/* Arrow */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 pointer-events-none"
            style={{
              background: "var(--color-bg-glass)",
              border: `1px solid ${providerColor}44`,
              borderTop: "none",
              borderLeft: "none",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
