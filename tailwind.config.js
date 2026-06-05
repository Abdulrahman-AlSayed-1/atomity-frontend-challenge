// Tailwind configuration with custom design token variables
export const content = [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {
        colors: {
            bgPrimary: "var(--color-bg-primary)",
            bgSecondary: "var(--color-bg-secondary)",
            bgSurface: "var(--color-bg-surface)",
            bgGlass: "var(--color-bg-glass)",
            textPrimary: "var(--color-text-primary)",
            textSecondary: "var(--color-text-secondary)",
            textMuted: "var(--color-text-muted)",
            accentGreen: "var(--color-accent-green)",
            accentGreenMuted: "var(--color-accent-green-muted)",
            accentSavings: "var(--color-accent-savings)",
            borderSurface: "var(--color-border-surface)",
        },
    },
};
export const plugins = [];