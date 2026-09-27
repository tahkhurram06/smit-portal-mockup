"use client";

import { useTheme } from "@/hooks/useTheme";

/**
 * Sun / moon button for pages that have no account menu (login, My courses).
 * The icon swaps with CSS off the data-theme attribute, so there is no flicker on load.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`group flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-ov/[0.1] bg-card text-muted shadow-card outline-none transition-all duration-200 hover:border-ov/[0.22] hover:bg-ov/[0.075] hover:text-strong active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${className}`}
    >
      {/* sun: shown in dark mode (click to go light) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 [[data-theme=light]_&]:hidden"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      {/* moon: shown in light mode (click to go dark) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="hidden h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 [[data-theme=light]_&]:block"
      >
        <path
          d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}