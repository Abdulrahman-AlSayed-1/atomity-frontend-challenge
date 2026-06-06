"use client";

import { motion } from "framer-motion";
import { ResourceBar } from "@/components/ResourceBar/ResourceBar";
import { useCountUp } from "@/hooks/useCountUp";
import { ResourceData } from "@/hooks/useCloudData";
import { RESOURCES } from "@/lib/providers-config";

interface CentralChartProps {
  animate: boolean;
  resources?: ResourceData[];
  totalCost?: number;
  totalSavings?: number;
  isLoading?: boolean;
  isError?: boolean;
}

/**
 * CentralChart — the central resource bar chart card in the topology.
 * Refactored using an explicit vertical flex stack to guarantee header elements
 * never bleed into or overlap with the bar chart rendering below.
 */
export function CentralChart({
  animate,
  resources,
  totalCost = 0,
  totalSavings = 0,
  isLoading = false,
  isError = false,
}: CentralChartProps) {
  const costDisplay = useCountUp({
    target: totalCost,
    duration: 2000,
    decimals: 0,
    prefix: "$",
    enabled: animate && !isLoading,
  });

  const savingsDisplay = useCountUp({
    target: totalSavings,
    duration: 1800,
    decimals: 0,
    prefix: "$",
    enabled: animate && !isLoading,
  });

  // Use fetched data or fall back to static config
  const displayResources =
    resources ??
    RESOURCES.map((r) => ({
      ...r,
      cost: undefined as unknown as number,
      costPerUnit: 0,
      trend: 0,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.3 }}
      // FIX 1: Forced a flex column stack layout to create rigid boundaries between sections
      className="relative flex flex-col rounded-2xl overflow-hidden w-full max-w-110"
      style={{
        background: "var(--color-bg-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--color-border-strong)",
        boxShadow:
          "var(--shadow-card), 0 0 60px var(--color-accent-green-glow)",
      }}
      aria-label="Cloud resource cost breakdown chart"
    >
      {/* Glow overlay — Fixed to prevent bleeding */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--color-accent-green-muted) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Header — Isolated row with isolated layout columns */}
      <div
        className="grid grid-cols-2 items-center p-5! pb-5! border-b gap-4 relative z-10 shrink-0 select-none"
        style={{ borderColor: "var(--color-border-surface)" }}
      >
        {/* Left Side: Resource Spend Stack */}
        <div className="flex flex-col items-start min-w-0">
          <p
            className="text-xs font-semibold tracking-wider uppercase whitespace-nowrap block"
            style={{ color: "var(--color-text-muted)" }}
          >
            Resource Spend
          </p>
          <div className="flex items-baseline mt-1.5! max-w-full">
            <motion.span
              className="text-2xl font-bold font-mono tracking-tight text-left truncate block"
              style={{ color: "var(--color-text-primary)" }}
            >
              {isLoading ? (
                <span
                  className="inline-block w-24 h-7 rounded animate-pulse"
                  style={{ background: "var(--color-bg-surface)" }}
                />
              ) : isError ? (
                <span style={{ color: "var(--color-text-muted)" }}>—</span>
              ) : (
                costDisplay
              )}
            </motion.span>
            {!isLoading && !isError && (
              <span
                className="text-xs font-normal ml-1! shrink-0"
                style={{ color: "var(--color-text-muted)" }}
              >
                /mo
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Estimated Savings Badge Stack */}
        <div
          className="flex flex-col items-end justify-center gap-1 py-2! px-4! rounded-xl text-right justify-self-end w-full"
          style={{
            background: "var(--color-accent-savings-bg)",
            border: "1px solid var(--color-border-strong)",
          }}
        >
          <span
            className="text-[9px] font-bold tracking-widest uppercase whitespace-nowrap block"
            style={{ color: "var(--color-accent-savings)" }}
          >
            Est. Savings
          </span>
          <span
            className="text-base font-bold font-mono block truncate max-w-full"
            style={{ color: "var(--color-accent-savings)" }}
          >
            {isLoading ? "…" : isError ? "—" : `${savingsDisplay}/mo`}
          </span>
        </div>
      </div>

      {/* Bar chart content section — Completely isolated from the top grid */}
      <div className="p-6! pt-6! pb-6! relative z-10 flex-1 w-full mt-auto">
        {isError ? (
          <div
            className="flex items-center justify-center h-40 text-sm rounded-lg"
            style={{
              color: "var(--color-text-muted)",
              border: "1px dashed var(--color-border-surface)",
            }}
          >
            Failed to load resource data
          </div>
        ) : (
          <figure aria-label="Bar chart of cloud resources by cost" className="w-full">
            <div className="flex items-end justify-center gap-4 min-h-35">
              {displayResources.map((resource, i) => (
                <ResourceBar
                  key={resource.id}
                  label={resource.label}
                  heightPercent={resource.heightPercent}
                  cost={isLoading ? undefined : resource.cost}
                  index={i}
                  animate={animate}
                />
              ))}
            </div>
            {/* Baseline grid lines */}
            <div
              className="relative mt-4 border-t"
              style={{ borderColor: "var(--color-border-surface)" }}
            />
          </figure>
        )}
      </div>

      {/* Loading skeleton overlay — Constrained within container layout context */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-(--color-bg-glass) backdrop-blur-sm z-20">
          <div
            className="flex gap-4 items-end justify-center pt-16"
            aria-label="Loading resource data"
          >
            {RESOURCES.map((r, i) => (
              <div
                key={r.id}
                className="rounded-t-md animate-pulse"
                style={{
                  width: 44,
                  height: `${r.heightPercent * 1.6}px`,
                  background: "var(--color-bg-surface)",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}