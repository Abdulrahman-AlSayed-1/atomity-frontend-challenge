"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProviderConfig } from "@/lib/providers-config";
import { PodHex } from "./PodHex";
import { PodTooltip } from "./PodTooltip";

interface ProviderNodeProps {
  provider: ProviderConfig;
  animate: boolean;
  index: number;
}

function ProviderLogo({ id, color }: { id: string; color: string }) {
  if (id === "aws") {
    return (
      <svg width="52" height="32" viewBox="0 0 80 48" fill="none" aria-label="Amazon Web Services">
        <text x="0" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="26" fill={color} letterSpacing="-1">aws</text>
        <path d="M8 34 Q28 42 48 34" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M44 30 L48 34 L44 38" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "azure") {
    return (
      <svg width="76" height="28" viewBox="0 0 110 40" fill="none" aria-label="Microsoft Azure">
        <polygon points="18,4 32,4 22,36 8,36" fill="#0072C6" opacity="0.9" />
        <polygon points="28,4 42,4 56,36 22,36" fill="#0089D6" opacity="0.8" />
        <polygon points="42,4 56,4 56,36" fill="#50ABF1" opacity="0.7" />
        <text x="62" y="28" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="18" fill={color}>Azure</text>
      </svg>
    );
  }
  if (id === "gcp") {
    return (
      <svg width="100" height="28" viewBox="0 0 140 38" fill="none" aria-label="Google Cloud Platform">
        <circle cx="19" cy="19" r="14" fill="none" stroke="#4285F4" strokeWidth="5" />
        <path d="M19 5 A14 14 0 0 1 33 19" stroke="#EA4335" strokeWidth="5" fill="none" />
        <path d="M33 19 A14 14 0 0 1 19 33" stroke="#FBBC05" strokeWidth="5" fill="none" />
        <text x="40" y="26" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="16" fill={color}>Google Cloud</text>
      </svg>
    );
  }
  return (
    <svg width="88" height="28" viewBox="0 0 120 38" fill="none" aria-label="On-Premise">
      <rect x="2" y="6" width="28" height="10" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="25" cy="11" r="2" fill={color} opacity="0.7" />
      <rect x="2" y="20" width="28" height="10" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="25" cy="25" r="2" fill={color} opacity="0.4" />
      <text x="36" y="24" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="14" fill={color}>On-Premise</text>
    </svg>
  );
}

export function ProviderNode({ provider, animate, index }: ProviderNodeProps) {
  const isRight = provider.position.includes("right");
  const delayBase = 0.2 + index * 0.12;

  const [activePod, setActivePod] = useState<any | null>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const colorMap: Record<string, string> = {
    "var(--color-node-aws)": "#ff9900",
    "var(--color-node-azure)": "#0078d4",
    "var(--color-node-gcp)": "#4285f4",
    "var(--color-node-onprem)": "#94a3b8",
  };
  const resolvedColor = colorMap[provider.colorVar] ?? "#4ade80";

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.7 }}
      animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: delayBase }}
      whileHover={{ scale: 1.04 }}
      className="flex flex-col items-center gap-3 provider-node-wrapper"
      aria-label={`${provider.name} cloud provider node`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 120,
          height: 120,
          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          background: "var(--color-bg-surface)",
          border: `2px solid ${resolvedColor}44`,
          boxShadow: `0 0 20px ${resolvedColor}22, inset 0 0 30px ${resolvedColor}08`,
          transition: "box-shadow var(--transition-base)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            background: `${resolvedColor}08`,
          }}
          animate={animate ? { boxShadow: [`inset 0 0 10px ${resolvedColor}10`, `inset 0 0 25px ${resolvedColor}20`, `inset 0 0 10px ${resolvedColor}10`] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 p-4" style={{ maxWidth: 90 }}>
          {provider.pods.map((pod, podIndex) => (
            <div
              key={pod.id}
              className="cursor-pointer"
              onMouseEnter={(e) => {
                setTriggerRect(e.currentTarget.getBoundingClientRect());
                setActivePod(pod);
              }}
              onMouseLeave={() => {
                setActivePod(null);
                setTriggerRect(null);
              }}
            >
              <PodHex pod={pod} provider={provider} animate={animate} index={podIndex} />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ delay: delayBase + 0.2, duration: 0.4 }}
        className={`flex flex-col items-center gap-1 ${isRight ? "items-end" : "items-start"}`}
        style={{ alignItems: "center" }}
      >
        <ProviderLogo id={provider.id} color={resolvedColor} />
        <span className="text-[10px] font-medium" style={{ color: "var(--color-text-muted)" }}>
          {provider.pods.filter((p) => p.isActive).length}/{provider.pods.length} pods active
        </span>
      </motion.div>

      <PodTooltip
        visible={activePod !== null}
        providerColor={resolvedColor}
        cpuUsage={activePod?.metrics?.cpuUsage ?? 0}
        cpuRequest={activePod?.metrics?.cpuRequest ?? 0}
        memUsage={activePod?.metrics?.memUsage ?? 0}
        memRequest={activePod?.metrics?.memRequest ?? 0}
        estimatedSavings={activePod?.metrics?.estimatedSavings ?? 0}
        podLabel={activePod?.name ?? "Unknown Pod"}
      />
    </motion.article>
  );
}