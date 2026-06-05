"use client";

import { motion } from "framer-motion";
import { ProviderConfig } from "@/lib/providers-config";

interface ConnectionLinesProps {
 animate: boolean;
 providers: ProviderConfig[];
}

/**
 * ConnectionLines — SVG overlay drawing animated dotted lines
 * from each provider node corner to the central chart.
 * Lines draw themselves in using pathLength 0→1 animation.
 */
export function ConnectionLines({ animate, providers }: ConnectionLinesProps) {
 // Corner anchor points (as % of the container)
 // These match where the provider nodes sit in the grid
 const corners = {
 "top-left": { x: 14, y: 18 },
 "top-right": { x: 86, y: 18 },
 "bottom-left": { x: 14, y: 82 },
 "bottom-right": { x: 86, y: 82 },
 };

 // Central connection point
 const center = { x: 50, y: 50 };

 // Intermediate waypoints for L-shaped dotted lines (like the video)
 const paths = providers.map((p) => {
 const corner = corners[p.position];
 const midX = corner.x < 50 ? 30 : 70;
 const midY = corner.y < 50 ? 30 : 70;
 return {
 id: p.id,
 color: p.colorVar,
 // Elbow path: corner → horizontal mid → vertical → center
 d: `M ${corner.x} ${corner.y} L ${midX} ${corner.y} L ${midX} ${midY} L ${center.x} ${midY} L ${center.x} ${center.y}`,
 };
 });

 return (
 <svg
 className="absolute inset-0 w-full h-full pointer-events-none"
 viewBox="0 0 100 100"
 preserveAspectRatio="none"
 aria-hidden="true"
 role="img"
 aria-label="Connection lines between cloud providers and central hub"
 >
 <defs>
 <filter id="line-glow">
 <feGaussianBlur stdDeviation="0.3" result="blur" />
 <feComposite in="SourceGraphic" in2="blur" operator="over" />
 </filter>
 </defs>

 {paths.map((path, i) => (
 <g key={path.id} filter="url(#line-glow)">
 {/* Background dim line */}
 <path
 d={path.d}
 fill="none"
 stroke="var(--color-border-surface)"
 strokeWidth="0.3"
 strokeDasharray="1.5 1.5"
 vectorEffect="non-scaling-stroke"
 />

 {/* Animated colored line */}
 <motion.path
 d={path.d}
 fill="none"
 stroke={path.color}
 strokeWidth="0.35"
 strokeDasharray="1.5 1.5"
 strokeLinecap="round"
 vectorEffect="non-scaling-stroke"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={
 animate
 ? { pathLength: 1, opacity: 0.7 }
 : { pathLength: 0, opacity: 0 }
 }
 transition={{
 pathLength: {
 duration: 1.0,
 delay: 0.5 + i * 0.15,
 ease: "easeInOut",
 },
 opacity: {
 duration: 0.3,
 delay: 0.5 + i * 0.15,
 },
 }}
 />

 {/* Traveling data-packet dot */}
 {animate && (
 <motion.circle
 r="0.6"
 fill={path.color}
 opacity={0.9}
 style={{ filter: `drop-shadow(0 0 1px ${path.color})` }}
 initial={{ offsetDistance: "0%" } as any}
 animate={{ offsetDistance: "100%" } as any}
 transition={{
 duration: 2.5,
 delay: 1.5 + i * 0.15,
 repeat: Infinity,
 ease: "linear",
 }}
 >
 <animateMotion
 dur={`${2.5 + i * 0.3}s`}
 repeatCount="indefinite"
 begin={`${1.5 + i * 0.15}s`}
 >
 <mpath href={`#path-${path.id}`} />
 </animateMotion>
 </motion.circle>
 )}

 {/* Hidden path for mpath reference */}
 <path
 id={`path-${path.id}`}
 d={path.d}
 fill="none"
 stroke="none"
 />
 </g>
 ))}
 </svg>
 );
}
