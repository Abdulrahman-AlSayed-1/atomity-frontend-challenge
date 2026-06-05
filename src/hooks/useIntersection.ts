"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionOptions {
 threshold?: number;
 rootMargin?: string;
 triggerOnce?: boolean;
}

/**
 * useIntersection — scroll-trigger hook using IntersectionObserver.
 * Returns a ref to attach to the target element, and a boolean `isVisible`.
 */
export function useIntersection<T extends Element = HTMLDivElement>({
 threshold = 0.15,
 rootMargin = "0px 0px -80px 0px",
 triggerOnce = true,
}: UseIntersectionOptions = {}) {
 const ref = useRef<T>(null);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const el = ref.current;
 if (!el) return;

 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setIsVisible(true);
 if (triggerOnce) observer.disconnect();
 } else if (!triggerOnce) {
 setIsVisible(false);
 }
 },
 { threshold, rootMargin }
 );

 observer.observe(el);
 return () => observer.disconnect();
 }, [threshold, rootMargin, triggerOnce]);

 return { ref, isVisible };
}
