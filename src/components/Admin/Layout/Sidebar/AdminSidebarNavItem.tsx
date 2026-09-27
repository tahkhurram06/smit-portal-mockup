"use client";

import { useRef, useState } from "react";
import { AdminNavItem } from "@/lib/adminData";
import AdminSidebarTooltip from "./AdminSidebarTooltip";

const icons: Record<AdminNavItem["icon"], React.ReactNode> = {
  overview: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="4" width="6" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="14" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="17" width="6" height="3" rx="1" fill="currentColor" />
    </>
  ),
  batches: (
    <>
      <path d="M12 4 3 9l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m6 12 6 3.5 6-3.5M6 16l6 3.5 6-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  teachers: (
    <>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m16.5 3.5.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.9Z" fill="currentColor" />
    </>
  ),
  payments: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  feedback: (
    <path
      d="M8 10h8M8 14h5M6 4h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-4 3v-3H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

interface AdminSidebarNavItemProps {
  item: AdminNavItem;
  active?: boolean;
  collapsed?: boolean;
  /** Small count pill, e.g. unread feedback. Omit or 0 to hide. */
  badge?: number;
  onClick?: () => void;
}

export default function AdminSidebarNavItem({
  item,
  active = false,
  collapsed = false,
  badge = 0,
  onClick,
}: AdminSidebarNavItemProps) {
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
        className={`group relative flex cursor-pointer items-center gap-3.5 rounded-[12px] text-[14.5px] font-medium outline-none transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
          collapsed ? "mx-auto h-11 w-11 justify-center p-0" : "w-full px-3.5 py-3"
        } ${
          active
            ? collapsed
              ? "bg-[#FF57A8]/[0.16] text-strong"
              : "text-strong"
            : collapsed
              ? "text-muted hover:bg-ov/[0.06] hover:text-strong"
              : "text-muted hover:bg-ov/[0.05] hover:text-strong"
        }`}
      >
        {active && !collapsed && (
          <span
            className="absolute inset-0 rounded-[12px] border border-[#FF57A8]/30 bg-gradient-to-r from-[#FF57A8]/[0.16] to-[#FF57A8]/[0.04] motion-safe:animate-[fadeUp_0.25s_ease_both]"
            aria-hidden="true"
          />
        )}
        {active && collapsed && (
          <span
            className="absolute inset-0 rounded-[12px] border border-[#FF57A8]/40 motion-safe:animate-[fadeUp_0.25s_ease_both]"
            aria-hidden="true"
          />
        )}

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`relative z-[1] shrink-0 transition-all duration-200 ${
            collapsed ? "h-5 w-5" : "h-[21px] w-[21px]"
          } ${
            active
              ? "text-pink drop-shadow-[0_0_6px_rgba(255,87,168,0.5)]"
              : "text-muted group-hover:scale-110 group-hover:text-teal"
          }`}
        >
          {icons[item.icon]}
        </svg>

        <span
          className={`relative z-[1] overflow-hidden whitespace-nowrap transition-all duration-200 ${
            collapsed ? "w-0 opacity-0" : "w-auto flex-1 text-left opacity-100"
          }`}
        >
          {item.label}
        </span>

        {badge > 0 && !collapsed && (
          <span className="relative z-[1] flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full border border-[#FF6B6B]/40 bg-[#FF6B6B]/[0.14] px-1 font-sora text-[10.5px] font-semibold tabular-nums text-red">
            {badge}
          </span>
        )}
        {badge > 0 && collapsed && (
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-panel bg-red motion-safe:animate-[pulseSoft_2s_ease-in-out_infinite]"
          />
        )}
      </button>

      <AdminSidebarTooltip
        label={badge > 0 ? `${item.label} (${badge})` : item.label}
        top={coords.top}
        left={coords.left}
        visible={collapsed && hovered}
      />
    </>
  );
}