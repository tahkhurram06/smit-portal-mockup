"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_KEY, type Theme } from "@/lib/theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// <html data-theme> is the source of truth; the inline script in layout.tsx sets it before first paint.
function getTheme(): Theme {
  const current = document.documentElement.getAttribute("data-theme");
  return current === "light" || current === "dark" ? current : DEFAULT_THEME;
}

/**
 * Reads and switches the portal theme. The choice is saved in localStorage,
 * so it survives reloads and logging out and back in.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => DEFAULT_THEME);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
    listeners.forEach((l) => l());
  }, []);

  const toggle = useCallback(
    () => setTheme(getTheme() === "light" ? "dark" : "light"),
    [setTheme],
  );

  return { theme, setTheme, toggle };
}