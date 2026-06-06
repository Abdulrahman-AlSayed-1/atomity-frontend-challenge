# Atomity Front‑End Challenge  
*React + Next.js + Tailwind CSS – Cloud Cost Intelligence UI*  

---  

## Table of contents  

1. [Project overview](#overview)  
2. [Tech stack](#tech-stack)  
3. [Getting started (dev environment)](#getting-started)  
4. [Project structure](#structure)  
5. [Design system & tokens](#design-tokens)  
6. [Key UI components](#components)  
7. [Tailwind utilities & important overrides](#tailwind‑important)  
8. [Data flow (mock API)](#data‑flow)  
9. [Testing & linting](#testing)  
10. [Build & deployment](#build)  
11. [Known issues & future work](#issues)  

---  

## <a name="overview"></a>1. Project overview  

The app is a **single‑page demonstrator** that visualises cloud‑resource spend and potential savings.  
It shows:

* A fixed top navigation bar with a theme toggle.  
* A hero section containing a headline, a short description and two CTA buttons.  
* An interactive **cloud‑topology diagram** (hexagonal nodes, connection lines, pod tool‑tips).  
* A **central chart** that displays the total monthly cost and the estimated monthly savings.  
* A footer with attribution.  

All UI is built with **Tailwind CSS** (custom design tokens) and **React components** written in **TypeScript**. The UI is fully responsive and supports **dark‑mode** out of the box.

---  

## <a name="tech-stack"></a>2. Tech stack  

| Layer | Library / Tool | Version* |
|-------|----------------|----------|
| Framework | **Next.js** (App Router) | `13.x` |
| UI | **React** + **Framer Motion** (animations) | `18.x` / `10.x` |
| Styling | **Tailwind CSS** (v3.x) – custom token‑driven configuration | `3.x` |
| State / Data fetching | **React Query** (`@tanstack/react-query`) | `4.x` |
| Utilities | **clsx**, **classnames**, **use‑count‑up** (number animation) | – |
| Language | **TypeScript** (strict) | `5.x` |
| Build / Bundler | **Next.js** (webpack / turbo) | – |
| Linting & formatting | **ESLint**, **Prettier** | – |

\*Exact versions are defined in `package.json` and can be inspected with `npm list`.

---  

## <a name="getting-started"></a>3. Getting started (dev environment)  

```bash
# 1️⃣ Clone the repo
git clone https://github.com/your‑org/atomity-frontend-challenge.git
cd atomity-frontend-challenge/atomity-app

# 2️⃣ Install dependencies
npm ci   # or `yarn install` if you prefer Yarn

# 3️⃣ Run the development server
npm run dev   # http://localhost:3000
```

The dev server watches for file changes, recompiles Tailwind, and hot‑replaces the UI.  

---  

## <a name="structure"></a>4. Project structure  

```
atomity-app/
│
├─ src/
│   ├─ app/                 # Next.js App Router (layout, page, globals.css)
│   ├─ components/          # Re‑usable UI pieces
│   │   ├─ Badge/
│   │   ├─ CloudTopology/
│   │   │   ├─ CentralChart.tsx
│   │   │   ├─ CloudTopology.tsx
│   │   │   ├─ ProviderNode.tsx
│   │   │   ├─ PodHex.tsx
│   │   │   └─ … (lines, tool‑tips)
│   │   ├─ ResourceBar/
│   │   ├─ SectionLabel/
│   │   ├─ ThemeToggle/
│   │   └─ …
│   ├─ hooks/               # Custom React hooks (useCloudData, useCountUp, etc.)
│   ├─ lib/                 # Static provider config & query client
│   ├─ providers/           # React‑Query provider wrapper
│   └─ tokens/              # Design‑token definitions (CSS variables)
│
├─ public/                  # Static assets (favicon, etc.)
├─ tailwind.config.js       # Tailwind extensions (custom colors, spacing, etc.)
├─ next.config.js           # Next.js configuration (experimental flags)
└─ package.json
```

---  

## <a name="design-tokens"></a>5. Design system & tokens  

All colors, spacing, radii, typography, shadows and transitions live as **CSS custom properties** in `globals.css`.  
Example token usage:

```css
/* globals.css */
:root {
  --color-bg-primary: #080c14;          /* dark background */
  --color-accent-green: #4ade80;        /* primary accent */
  --space-4: 16px;                      /* spacing scale */
  --radius-lg: 20px;                    /* border radius */
  --text-4xl: clamp(36px,5vw,56px);      /* fluid heading */
}
```

Tailwind is configured to read those variables, so you can use the tokens inside Tailwind classes:

```tsx
<div className="bg-[var(--color-bg-glass)] border-[var(--color-border-strong)]">
```

The **light‑mode** overrides are scoped under `[data-theme="light"]`.  
Switching themes is handled by the `ThemeToggle` component (adds/removes the `data-theme` attribute on `<html>`).

---  

## <a name="components"></a>6. Key UI components  

| Component | Purpose | Notable props / behaviours |
|-----------|---------|-----------------------------|
| **Badge** | Small status chips (default, success, muted, savings). | `variant="savings"` adds green‑bg & text from tokens; `dot` adds animated pulse. |
| **SectionLabel** | Uppercase label used in hero & sections. | Uses `py-2! px-4!` (important) to guarantee padding. |
| **ThemeToggle** | Light / dark switch. | Persists choice in `localStorage`. |
| **CloudTopology** | Renders the full hex‑grid of providers and pods. | Handles hover, selected node, and tool‑tips. |
| **CentralChart** | Header card with **Total Cost** & **Estimated Savings** badge. | Fixed `z‑10` and `whitespace-nowrap` to avoid overlapping/ wrapping. |
| **ResourceBar** | Vertical bar representing a single resource’s cost proportion. | Animated height via Framer Motion. |
| **PodTooltip** | Hover overlay showing per‑pod metrics (CPU, memory, savings). | Highlights the savings row with `var(--color-accent-savings)`. |

All components are **fully typed** and use **Tailwind utilities** (with `!` on padding utilities to enforce importance).  

---  

## <a name="tailwind-important"></a>7. Tailwind utilities & important overrides  

Because a global `margin:0; padding:0;` reset previously cancelled Tailwind’s `px‑*` / `py‑*` utilities, the following steps were added:

1. **Globals** – `globals.css` now contains the proper Tailwind layer imports:  

   ```css
   @import "tailwindcss";
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Important paddings** – Every occurrence of `px‑*` or `py‑*` across the codebase has been suffixed with `!` (e.g., `px-6! py-4!`). This forces Tailwind to generate `!important` rules, guaranteeing they win over any competing selector.  

3. **Z‑index & whitespace** – In `CentralChart.tsx` the savings badge now has `z-10` (so it appears above the chart) and `whitespace-nowrap` on the number spans, preventing the cost and savings values from wrapping onto a new line.  

4. **Responsive utilities** – The layout already uses responsive prefixes (`md:px-12`, `sm:inline-flex`, etc.) – the `!` modifier works with those as well (e.g., `md:px-12!`).  

---  

## <a name="data-flow"></a>8. Data flow (mock API)  

* `useCloudData` – a custom hook that **simulates** an async fetch of resource data (`RESOURCES` from `lib/providers-config.ts`). It returns:  

  ```ts
  {
    resources: ResourceData[];
    totalCost: number;
    totalSavings: number;
    fetchedAt: number;
  }
  ```

* `QueryProvider` – wraps the app with **React Query** so the hook can be switched to a real endpoint with minimal changes.  

* The UI consumes `totalCost` and `totalSavings` via the hook and animates them using `useCountUp`.  

---  

## <a name="testing"></a>9. Testing & linting  

The repo ships with a basic ESLint + Prettier config. Run:

```bash
npm run lint       # lint with eslint
npm run format     # auto‑format with prettier
```

No unit or integration tests are included in the challenge, but adding **Jest + React Testing Library** would be straightforward:  

* Test that `CentralChart` displays the correct formatted cost and savings.  
* Snapshot tests for `CloudTopology` to detect accidental layout changes.  

---  

## <a name="build"></a>10. Build & deployment  

```bash
# Production build
npm run build

# Start the production server
npm start
```

The output in `.next/` can be deployed to any Node.js host (Vercel, Netlify, Render, Docker, etc.). The `next.config.js` is already set up for static asset handling and experimental **appDir** features.

---  

## <a name="issues"></a>11. Known issues & future work  

| Issue | Current state | Suggested fix |
|-------|---------------|---------------|
| **Padding utilities ignored** (originally) | Fixed by adding Tailwind layer imports and `!` suffixes. | ✅ Resolved |
| **Savings badge overlapping cost** | Resolved by adding `z-10`, `mr-2` and `whitespace-nowrap`. | ✅ Resolved |
| **Responsive spacing on very small screens** | Some `px‑*` values become too large on mobile. | Consider using `sm:px-2!` or fluid spacing via `clamp()` tokens. |
| **Accessibility – focus outlines** | Focus styles rely on browser defaults. | Add a `focus-visible` utility for better keyboard navigation. |
| **Real API integration** | Data is mocked locally. | Replace `useCloudData` with a real fetch (`/api/resources`) and adjust the React‑Query query key. |
| **Testing** | No automated tests shipped. | Add Jest + RTL tests for main components. |
| **Dark‑mode toggle persistence** | Works via `localStorage`, but SSR hydration flash may appear. | Use Next.js `headers()` or `cookies()` to read the preference server‑side. |

---  

### TL;DR  

*Run the dev server → explore the hero, navigation, topology diagram, and central cost chart.*  
