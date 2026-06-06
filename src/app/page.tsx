"use client";

import { motion } from "framer-motion";
import { CloudTopology } from "@/components/CloudTopology/CloudTopology";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export default function Home() {
  return (
    <main
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        minHeight: "100dvh",
      }}
    >
      {/* ─── NAV ──────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6! py-4!! md:px-12!"
        style={{
          background: "var(--color-bg-glass)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{
              background: "var(--color-accent-green-muted)",
              border: "1px solid var(--color-border-strong)",
              color: "var(--color-accent-green)",
              boxShadow: "var(--shadow-green-sm)",
            }}
            aria-hidden="true"
          >
            ⬡
          </span>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            atomity
          </span>
        </motion.div>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-6"
        >
          {["Platform", "Pricing", "Docs", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color =
                  "var(--color-text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "var(--color-text-secondary)")
              }
            >
              {item}
            </a>
          ))}
        </motion.div>

        {/* Right: theme toggle + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <ThemeToggle />
          <a
            href="#cloud-topology"
            className="hidden sm:inline-flex items-center justify-center py-2! px-5! rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: "var(--color-accent-green-muted)",
              border: "1px solid var(--color-border-strong)",
              color: "var(--color-accent-green)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--color-accent-green)";
              el.style.color = "var(--color-text-inverse)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--color-accent-green-muted)";
              el.style.color = "var(--color-accent-green)";
            }}
          >
            See demo →
          </a>
        </motion.div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: "100dvh",
          paddingTop: 80,
          paddingInline: "clamp(16px, 5vw, 80px)",
        }}
        aria-label="Hero section"
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
          aria-hidden="true"
        />

        {/* Green glow orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "clamp(400px, 60vw, 900px)",
            height: "clamp(300px, 40vw, 600px)",
            background:
              "radial-gradient(ellipse, var(--color-accent-green-muted) 0%, transparent 70%)",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 py-1! px-4! rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "var(--color-accent-green-muted)",
              border: "1px solid var(--color-border-strong)",
              color: "var(--color-accent-green)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{
                background: "var(--color-accent-green)",
                boxShadow: "0 0 6px var(--color-accent-green)",
              }}
            />
            Cloud Cost Intelligence
          </motion.div>

          {/* Headline */}
          <h1
            className="heading-hero max-w-3xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Stop overpaying for{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-green) 0%, var(--color-accent-green-bright) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              cloud infrastructure
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="max-w-2xl"
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-xl)",
              lineHeight: 1.6,
            }}
          >
            Atomity gives engineering teams a unified view of Kubernetes
            resource utilization across every cloud provider — and shows exactly
            where to cut costs without sacrificing performance.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <a
              href="#cloud-topology"
              className="flex items-center justify-center gap-2 py-3! px-6! rounded-full font-semibold text-base transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--color-accent-green)",
                color: "var(--color-text-inverse)",
                boxShadow: "var(--shadow-green-md)",
              }}
            >
              View topology demo
              <span aria-hidden="true">↓</span>
            </a>

            <a
              href="#"
              className="flex items-center justify-center gap-2 py-3! px-6! rounded-full font-semibold text-base border transition-all duration-200"
              style={{
                borderColor: "var(--color-border-strong)",
                color: "var(--color-text-primary)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-bg-surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Read docs
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
            style={{ borderColor: "var(--color-border-strong)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: "var(--color-accent-green)" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TOPOLOGY SECTION ─────────────────────────────────── */}
      <CloudTopology />

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer
        className="border-t flex items-center justify-center py-6!"
        style={{
          borderColor: "var(--color-border-surface)",
          background: "var(--color-bg-secondary)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          © 2025 Atomity · Frontend Challenge Submission
        </p>
      </footer>
    </main>
  );
}