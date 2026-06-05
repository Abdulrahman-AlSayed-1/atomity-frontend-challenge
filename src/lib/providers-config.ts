// lib/providers-config.ts
// Static configuration for cloud provider nodes and their pods.

export interface PodConfig {
 id: string;
 label: string;
 isActive: boolean;
 isSpecial?: boolean; // highlighted pod (e.g., shows detailed tooltip)
}

export interface ProviderConfig {
 id: string;
 name: string;
 shortName: string;
 colorVar: string; // references a CSS token color
 position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
 pods: PodConfig[];
 cpuUsage: number; // millicores
 cpuRequest: number;
 memUsage: number; // MiB
 memRequest: number; // GiB
 estimatedSavings: number; // USD/month
}

export const PROVIDERS: ProviderConfig[] = [
 {
 id: "aws",
 name: "Amazon Web Services",
 shortName: "AWS",
 colorVar: "var(--color-node-aws)",
 position: "top-left",
 pods: [
 { id: "aws-p1", label: "Pod A", isActive: true, isSpecial: false },
 { id: "aws-p2", label: "Pod B", isActive: true, isSpecial: true },
 ],
 cpuUsage: 63,
 cpuRequest: 700,
 memUsage: 557,
 memRequest: 5,
 estimatedSavings: 237.4,
 },
 {
 id: "azure",
 name: "Microsoft Azure",
 shortName: "Azure",
 colorVar: "var(--color-node-azure)",
 position: "top-right",
 pods: [
 { id: "az-p1", label: "Pod A", isActive: true, isSpecial: false },
 { id: "az-p2", label: "Pod B", isActive: true, isSpecial: false },
 { id: "az-p3", label: "Pod C", isActive: false, isSpecial: true },
 ],
 cpuUsage: 128,
 cpuRequest: 500,
 memUsage: 1024,
 memRequest: 8,
 estimatedSavings: 412.8,
 },
 {
 id: "gcp",
 name: "Google Cloud Platform",
 shortName: "GCP",
 colorVar: "var(--color-node-gcp)",
 position: "bottom-left",
 pods: [
 { id: "gcp-p1", label: "Pod A", isActive: true, isSpecial: false },
 { id: "gcp-p2", label: "Pod B", isActive: true, isSpecial: false },
 { id: "gcp-p3", label: "Pod C", isActive: true, isSpecial: false },
 { id: "gcp-p4", label: "Pod D", isActive: false, isSpecial: true },
 ],
 cpuUsage: 256,
 cpuRequest: 1000,
 memUsage: 2048,
 memRequest: 16,
 estimatedSavings: 189.2,
 },
 {
 id: "onprem",
 name: "On-Premise",
 shortName: "On-Prem",
 colorVar: "var(--color-node-onprem)",
 position: "bottom-right",
 pods: [
 { id: "op-p1", label: "Pod A", isActive: false, isSpecial: false },
 { id: "op-p2", label: "Pod B", isActive: true, isSpecial: true },
 ],
 cpuUsage: 32,
 cpuRequest: 200,
 memUsage: 256,
 memRequest: 2,
 estimatedSavings: 95.6,
 },
];

export interface ResourceConfig {
 id: string;
 label: string;
 unit: string;
 heightPercent: number; // 0–100 for chart bar height
}

export const RESOURCES: ResourceConfig[] = [
 { id: "cpu", label: "CPU", unit: "cores", heightPercent: 78 },
 { id: "gpu", label: "GPU", unit: "units", heightPercent: 35 },
 { id: "ram", label: "RAM", unit: "GiB", heightPercent: 58 },
 { id: "pv", label: "PV", unit: "GB", heightPercent: 42 },
 { id: "network", label: "Network", unit: "Gbps", heightPercent: 62 },
 { id: "cloud", label: "Cloud", unit: "svc", heightPercent: 25 },
];
