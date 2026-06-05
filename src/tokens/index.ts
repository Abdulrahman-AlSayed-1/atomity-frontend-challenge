// tokens/index.ts
// Design tokens — all values reference CSS custom properties.
// Never use raw hex values in components; always use these tokens.

export const tokens = {
 colors: {
 bgPrimary: "var(--color-bg-primary)",
 bgSecondary: "var(--color-bg-secondary)",
 bgSurface: "var(--color-bg-surface)",
 bgSurfaceHover: "var(--color-bg-surface-hover)",
 bgGlass: "var(--color-bg-glass)",
 bgGlassBorder: "var(--color-bg-glass-border)",

 textPrimary: "var(--color-text-primary)",
 textSecondary: "var(--color-text-secondary)",
 textMuted: "var(--color-text-muted)",
 textInverse: "var(--color-text-inverse)",

 accentGreen: "var(--color-accent-green)",
 accentGreenBright: "var(--color-accent-green-bright)",
 accentGreenMuted: "var(--color-accent-green-muted)",
 accentGreenGlow: "var(--color-accent-green-glow)",

 accentSavings: "var(--color-accent-savings)",
 accentSavingsBg: "var(--color-accent-savings-bg)",

 borderSubtle: "var(--color-border-subtle)",
 borderStrong: "var(--color-border-strong)",
 borderSurface: "var(--color-border-surface)",

 nodeAws: "var(--color-node-aws)",
 nodeAzure: "var(--color-node-azure)",
 nodeGcp: "var(--color-node-gcp)",
 nodeOnPrem: "var(--color-node-onprem)",
 },

 spacing: {
 1: "var(--space-1)",
 2: "var(--space-2)",
 3: "var(--space-3)",
 4: "var(--space-4)",
 5: "var(--space-5)",
 6: "var(--space-6)",
 8: "var(--space-8)",
 10: "var(--space-10)",
 12: "var(--space-12)",
 16: "var(--space-16)",
 },

 radius: {
 sm: "var(--radius-sm)",
 md: "var(--radius-md)",
 lg: "var(--radius-lg)",
 xl: "var(--radius-xl)",
 full: "var(--radius-full)",
 },

 font: {
 sans: "var(--font-sans)",
 mono: "var(--font-mono)",
 },

 shadow: {
 greenSm: "var(--shadow-green-sm)",
 greenMd: "var(--shadow-green-md)",
 greenLg: "var(--shadow-green-lg)",
 card: "var(--shadow-card)",
 },

 transition: {
 fast: "var(--transition-fast)",
 base: "var(--transition-base)",
 slow: "var(--transition-slow)",
 spring: "var(--transition-spring)",
 },
} as const;

export type Tokens = typeof tokens;
