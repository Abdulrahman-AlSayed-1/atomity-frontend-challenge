"use client";

import { useQuery } from "@tanstack/react-query";
import { RESOURCES, ResourceConfig } from "@/lib/providers-config";

interface DummyProduct {
 id: number;
 title: string;
 price: number;
 stock: number;
 rating: number;
}

interface DummyProductsResponse {
 products: DummyProduct[];
}

export interface ResourceData extends ResourceConfig {
 cost: number; // fetched from API
 costPerUnit: number;
 trend: number; // % change (derived from rating)
}

export interface CloudSummaryData {
 resources: ResourceData[];
 totalCost: number;
 totalSavings: number;
 fetchedAt: number;
}

async function fetchCloudData(): Promise<CloudSummaryData> {
 const res = await fetch(
 "https://dummyjson.com/products?limit=6&select=title,price,stock,rating",
 { next: { revalidate: 300 } }
 );
 if (!res.ok) throw new Error(`API error: ${res.status}`);

 const data: DummyProductsResponse = await res.json();

 // Map each product to a resource type using static RESOURCES config
 const resources: ResourceData[] = RESOURCES.map((resource, i) => {
 const product = data.products[i];
 const cost = product ? Math.round(product.price * 12.5) : 0;
 const costPerUnit = product ? parseFloat((product.price / (product.stock || 1)).toFixed(2)) : 0;
 const trend = product ? parseFloat(((product.rating - 3) * 15).toFixed(1)) : 0;
 return {
 ...resource,
 cost,
 costPerUnit,
 trend,
 };
 });

 const totalCost = resources.reduce((sum, r) => sum + r.cost, 0);
 const totalSavings = Math.round(totalCost * 0.23); // 23% savings opportunity

 return { resources, totalCost, totalSavings, fetchedAt: Date.now() };
}

/**
 * useCloudData — TanStack Query hook for cloud resource cost data.
 * Caches for 5 minutes (staleTime in queryClient.ts) — no redundant requests on revisit.
 */
export function useCloudData() {
 return useQuery<CloudSummaryData, Error>({
 queryKey: ["cloud-resource-data"],
 queryFn: fetchCloudData,
 });
}
