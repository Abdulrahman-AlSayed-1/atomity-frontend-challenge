// lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
 defaultOptions: {
 queries: {
 staleTime: 5 * 60 * 1000, // 5 minutes — no re-fetch on revisit
 gcTime: 10 * 60 * 1000, // 10 minutes in cache
 retry: 2,
 refetchOnWindowFocus: false,
 },
 },
});
