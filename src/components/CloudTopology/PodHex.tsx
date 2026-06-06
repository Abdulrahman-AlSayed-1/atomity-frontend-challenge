"use client";

import { motion } from "framer-motion";
import { PodConfig, ProviderConfig } from "@/lib/providers-config";

interface PodHexProps {
  pod: PodConfig;
  provider: ProviderConfig;
  animate: boolean;
  index: number;
}

/**
 * PodHex — hexagon-shaped pod icon with pulse animation.
 * Focusable and keyboard accessible. Hover listeners are managed at the
 * ProviderNode parent layer via Portal layout implementation.
 */
export function PodHex({ pod, provider, animate, index }: PodHexProps) {
  const isActive = pod.isActive;
  const isSpecial = pod.isSpecial;

  return (
    <div className="relative flex items-center justify-center">
      {/* NOTE: Local PodTooltip has been stripped.
        Hover triggers are caught by the parent wrapper layer in ProviderNode.tsx 
      */}

      {/* Pod hexagon visual element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.6 + index * 0.1,
        }}
        whileHover={{ scale: 1.15 }}
        whileFocus={{ scale: 1.15 }}
        aria-label={`${provider.shortName} ${pod.label}`}
        className="relative focus-visible:outline-none"
        style={{ width: 36, height: 36 }}
      >
        {/* Pulse ring for active pods */}
        {isActive && animate && (
          <motion.span
            className="absolute inset-0 rounded-lg"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
            style={{
              background: isSpecial
                ? provider.colorVar
                : "var(--color-accent-green)",
              clipPath:
                "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            }}
          />
        )}

        {/* Hexagon shape structural block */}
        <span
          className="absolute inset-0 flex items-center justify-center transition-all duration-200"
          style={{
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            background: isActive
              ? isSpecial
                ? provider.colorVar
                : "var(--color-accent-green-muted)"
              : "var(--color-bg-surface)",
            border: "none",
            boxShadow: isSpecial
              ? `0 0 12px ${provider.colorVar}88`
              : isActive
                ? "0 0 8px var(--color-accent-green-glow)"
                : "none",
          }}
        >
          {/* Inner graphical vector node elements */}
          {isSpecial ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" opacity="0.9" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3" />
            </svg>
          ) : isActive ? (
            <span
              className="w-2 h-2 rounded-sm"
              style={{ background: "var(--color-accent-green)" }}
            />
          ) : (
            <span
              className="w-2 h-2 rounded-sm opacity-30"
              style={{ background: "var(--color-text-muted)" }}
            />
          )}
        </span>
      </motion.div>
    </div>
  );
}