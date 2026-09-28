// Intended path: components/ui/BottomNav.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export interface BottomNavItem {
  key: string;
  label: string;
  href: string;
  /** SVG children (paths, rects). The wrapper <svg> is handled here. */
  icon: ReactNode;
}

interface BottomNavProps {
  items: BottomNavItem[];
  /** key of the current page. null = none highlighted (e.g. profile page). */
  activeKey: string | null;
}

/**
 * Thumb-reach navigation for phones and tablets. Hidden from lg up, where the
 * sidebar takes over. z-20 keeps it under the sidebar drawer (z-40) and modals (z-100).
 */
export default function BottomNav({ items, activeKey }: BottomNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-ov/[0.1] bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
    >
      <ul className="mx-auto flex max-w-xl items-stretch px-1">
        {items.map((item) => {
          const active = item.key === activeKey;

          return (
            <li key={item.key} className="min-w-0 flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex flex-col items-center gap-1 px-1 pb-2 pt-2.5 outline-none transition-colors duration-200 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2 ${
                  active ? "text-strong" : "text-muted hover:text-strong"
                }`}
              >
                {/* active indicator */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 top-0 h-[2px] rounded-b-full bg-gradient-to-r from-[#3FE6D6] to-[#8B6BFF] transition-opacity duration-200 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />

                <span
                  className={`flex h-8 w-11 items-center justify-center rounded-full transition-colors duration-200 ${
                    active ? "bg-[#8B6BFF]/[0.16]" : "group-hover:bg-ov/[0.05]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`h-5 w-5 transition-all duration-200 ${
                      active ? "text-purple drop-shadow-[0_0_6px_rgba(139,107,255,0.5)]" : ""
                    }`}
                  >
                    {item.icon}
                  </svg>
                </span>

                <span className="max-w-full truncate text-[10px] font-medium leading-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}