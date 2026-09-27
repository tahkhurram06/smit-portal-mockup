export type Theme = "light" | "dark";

export const THEME_KEY = "smit_theme";

/** What a first-time visitor sees. Change to "light" to flip the default. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Inlined in <head> (see app/layout.tsx) so the saved theme is applied before the
 * first paint. Without it the page would flash the default theme on every reload.
 */
export const themeInitScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_KEY}");d.setAttribute("data-theme",t==="light"||t==="dark"?t:"${DEFAULT_THEME}")}catch(e){d.setAttribute("data-theme","${DEFAULT_THEME}")}})()`;