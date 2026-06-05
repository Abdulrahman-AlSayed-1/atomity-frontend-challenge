"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * useTheme — manages dark/light theme toggle.
 * Persists preference in localStorage and applies data-theme attribute to <html>.
 */
export function useTheme() {
 const [theme, setTheme] = useState<Theme>("dark");

 useEffect(() => {
 const saved = localStorage.getItem("atomity-theme") as Theme | null;
 const preferred = window.matchMedia("(prefers-color-scheme: light)").matches
 ? "light"
 : "dark";
 const initial = saved ?? preferred;
 setTheme(initial);
 document.documentElement.setAttribute("data-theme", initial);
 }, []);

 const toggleTheme = () => {
 setTheme((prev) => {
 const next: Theme = prev === "dark" ? "light" : "dark";
 document.documentElement.setAttribute("data-theme", next);
 localStorage.setItem("atomity-theme", next);
 return next;
 });
 };

 return { theme, toggleTheme };
}
