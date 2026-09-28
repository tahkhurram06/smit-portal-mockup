"use client";

import { useRef, useState } from "react";
import { NavItem } from "@/lib/dashboardData";
import SidebarTooltip from "./SidebarTooltip";

export const icons: Record<NavItem["icon"], React.ReactNode> = {
  dashboard: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="4" width="6" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="14" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="17" width="6" height="3" rx="1" fill="currentColor" />
    </>
  ),
  progress: (
    <path d="M4 20V10m6 10V4m6 16v-7m6 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),
  attendance: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 9h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m8.5 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  payment: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  assignment: (
    <>
      <path d="M7 3h8l4 4v14H7V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 3v4h4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.5 13h5M9.5 16.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  quiz: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.33c-.7.27-1.4.85-1.4 1.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
    </>
  ),
};

interface SidebarNavItemProps {
  item: NavItem;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export default function SidebarNavItem({
  item,
  active = false,
  collapsed = false,
  onClick,
}: SidebarNavItemProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleEnter = () => {
    if (!collapsed || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setCoords({ top: rect.top + rect.height / 2, left: rect.right + 14 });
    setHovered(true);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex cursor-pointer items-center rounded-[12px] text-[14.5px] font-medium outline-none transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
          collapsed
            ? "mx-auto h-11 w-11 items-center justify-center p-0"
            : "w-full gap-3.5 px-3.5 py-3"
        } ${
          active
            ? collapsed
              ? "bg-[#8B6BFF]/[0.16] text-strong"
              : "text-strong"
            : collapsed
              ? "text-muted hover:bg-ov/[0.06] hover:text-strong"
              : "text-muted hover:bg-ov/[0.05] hover:text-strong"
        }`}
      >
        {/* expanded active bg */}
        {active && !collapsed && (
          <span
            className="absolute inset-0 rounded-[12px] border border-[#8B6BFF]/30 bg-gradient-to-r from-[#8B6BFF]/[0.16] to-[#8B6BFF]/[0.04] motion-safe:animate-[fadeUp_0.25s_ease_both]"
            aria-hidden="true"
          />
        )}
        {/* collapsed active bg — solid fill so it's clearly highlighted */}
        {active && collapsed && (
          <span
            className="absolute inset-0 rounded-[12px] border border-[#8B6BFF]/50 bg-[#8B6BFF]/[0.18] motion-safe:animate-[fadeUp_0.25s_ease_both]"
            aria-hidden="true"
          />
        )}

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`relative z-[1] shrink-0 transition-all duration-200 ${
            collapsed ? "h-[19px] w-[19px]" : "h-[21px] w-[21px]"
          } ${
            active
              ? "text-purple drop-shadow-[0_0_8px_rgba(139,107,255,0.6)]"
              : "text-muted group-hover:scale-110 group-hover:text-teal"
          }`}
        >
          {icons[item.icon]}
        </svg>

        {/* label — only in expanded mode */}
        {!collapsed && (
          <span className="relative z-[1] whitespace-nowrap">
            {item.label}
          </span>
        )}
      </button>

      <SidebarTooltip
        label={item.label}
        top={coords.top}
        left={coords.left}
        visible={collapsed && hovered}
      />
    </>
  );
}