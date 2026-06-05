"use client";

import { motion } from "framer-motion";
import { useIntersection } from "@/hooks/useIntersection";
import { useCloudData } from "@/hooks/useCloudData";
import { PROVIDERS } from "@/lib/providers-config";
import { ProviderNode } from "./ProviderNode";
import { CentralChart } from "./CentralChart";
import { ConnectionLines } from "./ConnectionLines";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { Badge } from "@/components/Badge/Badge";

/**
 * CloudTopology — the main scroll-triggered section.
 * Orchestrates the full multi-cloud topology layout with animations.
 */
export function CloudTopology() {
 const { ref, isVisible } = useIntersection<HTMLElement>({
 threshold: 0.1,
 rootMargin: "0px 0px -60px 0px",
 triggerOnce: true,
 });

 const { data, isLoading, isError } = useCloudData();

 const topLeft = PROVIDERS.find((p) => p.position === "top-left")!;
 const topRight = PROVIDERS.find((p) => p.position === "top-right")!;
 const bottomLeft = PROVIDERS.find((p) => p.position === "bottom-left")!;
 const bottomRight = PROVIDERS.find((p) => p.position === "bottom-right")!;

 return (
 <section
 ref={ref}
 className="relative w-full overflow-hidden flex flex-col items-center justify-center"
 style={{
 paddingTop: "64px",  paddingBottom: "64px",
 }}
 aria-labelledby="topology-heading"
 id="cloud-topology"
 >
 {/* Background grid pattern */}
 <div
 className="absolute inset-0 pointer-events-none opacity-[0.03]"
 style={{
 backgroundImage:
 "linear-gradient(var(--color-accent-green) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent-green) 1px, transparent 1px)",
 backgroundSize: "40px 40px",
 }}
 aria-hidden="true"
 />

 {/* Radial glow center */}
 <div
 className="absolute inset-0 pointer-events-none"
 style={{
 background:
 "radial-gradient(ellipse 60% 50% at 50% 50%, var(--color-accent-green-muted) 0%, transparent 70%)",
 opacity: isVisible ? 0.6 : 0,
 transition: "opacity 1s ease",
 }}
 aria-hidden="true"
 />

 <div  className="relative z-10 max-w-6xl mx-auto w-full"
  >
 {/* Section header */}
 <motion.div
 initial={{ opacity: 0, y: 24 }}
 animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
 transition={{ duration: 0.6, ease: "easeOut" }}
 className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16"
 >
 <SectionLabel>Multi-Cloud Intelligence</SectionLabel>

 <h2
 id="topology-heading"
 className="heading-section"
 style={{ color: "var(--color-text-primary)" }}
 >
 One view across{" "}
 <span style={{ color: "var(--color-accent-green)" }}>
 every cloud
 </span>
 </h2>

 <p
 className="max-w-xl text-base"
 style={{
 color: "var(--color-text-secondary)",
 fontSize: "var(--text-lg)",
 }}
 >
 Atomity unifies your infrastructure across AWS, Azure, GCP, and
 on-premise — revealing cost inefficiencies and savings opportunities
 in real time.
 </p>

 <div className="flex flex-wrap justify-center gap-2 mt-2">
 <Badge variant="success" dot>Live data</Badge>
 <Badge variant="default">4 providers</Badge>
 <Badge variant="savings">
 ${data?.totalSavings?.toLocaleString() ?? "…"}/mo savings
 </Badge>
 </div>
 </motion.div>

 {/* Topology canvas */}
 <div
 className="topology-grid relative"
 style={{ minHeight: 480 }}
 >
 {/* SVG connection lines (behind everything) */}
 <ConnectionLines animate={isVisible} providers={PROVIDERS} />

 {/* 3×3 grid layout: corners = providers, center = chart */}
 <div
 className="relative z-10 grid items-center justify-items-center gap-8"
 style={{
 gridTemplateColumns: "1fr auto 1fr",
 gridTemplateRows: "1fr auto 1fr",
 minHeight: 480,
 }}
 >
 {/* Top-left: AWS */}
 <div className="flex justify-end w-full pr-4">
 <ProviderNode provider={topLeft} animate={isVisible} index={0} />
 </div>

 {/* Top-center: spacer */}
 <div />

 {/* Top-right: Azure */}
 <div className="flex justify-start w-full pl-4">
 <ProviderNode provider={topRight} animate={isVisible} index={1} />
 </div>

 {/* Middle-left: spacer */}
 <div />

 {/* Center: chart */}
 <div className="flex items-center justify-center w-full">
 <CentralChart
 animate={isVisible}
 resources={data?.resources}
 totalCost={data?.totalCost}
 totalSavings={data?.totalSavings}
 isLoading={isLoading}
 isError={isError}
 />
 </div>

 {/* Middle-right: spacer */}
 <div />

 {/* Bottom-left: GCP */}
 <div className="flex justify-end w-full pr-4">
 <ProviderNode provider={bottomLeft} animate={isVisible} index={2} />
 </div>

 {/* Bottom-center: spacer */}
 <div />

 {/* Bottom-right: On-Premise */}
 <div className="flex justify-start w-full pl-4">
 <ProviderNode provider={bottomRight} animate={isVisible} index={3} />
 </div>
 </div>
 </div>

 {/* Footer stats row */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
 transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
 className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
 >
 {[
 { label: "Total Providers", value: "4" },
 { label: "Active Pods", value: "9" },
 { label: "Resources Monitored", value: "6" },
 {
 label: "Monthly Savings",
 value: data?.totalSavings
 ? `$${data.totalSavings.toLocaleString()}`
 : isLoading ? "…" : "—",
 accent: true,
 },
 ].map(({ label, value, accent }) => (
 <div
 key={label}
 className="flex flex-col items-center gap-1 rounded-xl border text-center"
 style={{
 padding: "16px 16px", // Replaced style={{paddingLeft: "4rem"}} stat card paddings
 background: accent
 ? "var(--color-accent-savings-bg)"
 : "var(--color-bg-surface)",
 borderColor: accent
 ? "var(--color-border-strong)"
 : "var(--color-border-surface)",
 }}
 >
 <span
 className="text-2xl font-bold font-mono"
 style={{
 color: accent
 ? "var(--color-accent-savings)"
 : "var(--color-text-primary)",
 }}
 >
 {value}
 </span>
 <span
 className="text-xs font-medium uppercase tracking-wider"
 style={{ color: "var(--color-text-muted)" }}
 >
 {label}
 </span>
 </div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}