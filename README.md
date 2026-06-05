# Atomity Frontend Challenge
The **Atomity Frontend Challenge** is a high-fidelity, compliance-first cloud cost orchestration dashboard designed to visualize multi-cloud environments, analyze real-time cluster workloads, and track automated infrastructure cost-optimization telemetry. 

The application functions as an interactive control plane that provides deep, structural visibility into infrastructure expenditure and workload metrics through a polished, glassmorphic data interface.

---

### Key Architectural Features

* **Interactive Node Topology Grid:** A visual cluster layout representing individual cloud providers and workload pods. Interacting with active topology elements reveals precise compute and allocation matrices dynamically.
* **Central Telemetry Dashboard (`CentralChart`):** A centralized command module aggregating platform-wide financial statistics, continuous resource utilization scales, and active cost-efficiency badges.
* **Real-Time Telemetry Interpolation:** Built using custom counting engines that interpolate system statistics smoothly down to the decimal point without impacting execution loop cycles.

---

### What Was Built & Implemented

#### 1. Infrastructure Compute Telemetry Mapping
The application processes and renders core multi-cloud resource properties with strict technical granularity:
* **CPU Core Allocations:** Displays real-time processing execution metrics alongside strict provisioned capacity requests (tracked in compute units `M`).
* **Memory Constraints Engine:** Monitors cluster runtime footprint and memory request parameters, dynamically managing structural scaling across `MiB` and `GiB` boundaries.
* **Contextual Metric Modals (`PodTooltip`):** Floating interface cards powered by spring physics handlers that track cluster coordinates to display workload diagnostics precisely on interaction events.

#### 2. Layout Structure & Interface Alignment
The user interface implements strict functional spacing layers to ensure absolute clarity across dense operational nodes:
* **Side-by-Side Data Formats:** Resource parameters and active financial statistics are grouped within dedicated horizontal blocks (`flex justify-between`), forcing labels and numerical values to scale safely along a fixed axis.
* **Sleek Glassmorphic Dark-Theming:** Constructed on a dark system profile using backdrop blur rules (`blur(20px)`) to provide visual layer isolation from underlying cluster maps.
* **Token-Driven Badges:** The *Estimated Savings* element leverages semantic token property maps (`var(--color-accent-savings-bg)`) to maintain cohesive styling across component boundaries.

#### 3. Graphical Resource Bar Charting
The lower tracking layout isolates visual charting components to protect nearby telemetry metrics:
* **Enclosed Canvas Geometry:** The bar visualization framework uses an explicit height boundary (`h-36`) to reserve a dedicated visual workspace for cluster data.
* **Baseline Alignment Metrics:** UI text fields, alignment divider rules, and data columns share a unified baseline layout, preventing active bar adjustments from altering surrounding component rows.

---

### Core Technologies Used

* **Framework Core:** React.js paired with Next.js (utilizing explicit client-side hydration boundaries via `"use client"` scopes).
* **Styling Infrastructure:** Tailwind CSS implementing strict flexbox/grid layout properties and system custom property theme variables (`var(--color-*)`).
* **Motion Design System:** Framer Motion (`AnimatePresence`, `motion.div`) for viewport entrance tracking, spring-physics micro-interactions, and responsive tooltips.
* **Data Hydration Utilities:** Custom React hooks (`useCountUp`, `useCloudData`) for real-time numeric text updates and infrastructure state syncing.