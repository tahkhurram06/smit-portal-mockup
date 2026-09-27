"use client";

import type { ReactNode } from "react";

interface AdminAccountMenuItemProps {
  /** SVG children (paths, circles). The wrapper <svg> and its sizing/hover colours are handled here. */
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  /** Greyed out and not focusable. Pair with `badge` to say why. */
  disabled?: boolean;
  /** Small pill on the right, e.g. "Soon". */
  badge?: string;
  /** "danger" turns red on hover (used for Log out). */
  tone?: "default" | "danger";
  /** Anything to show on the right, e.g. a switch. */
  trailing?: ReactNode;
  /** Makes the row a checkable menu item (e.g. a theme switch). Leave undefined for a plain item. */
  checked?: boolean;
}

export default function AdminAccountMenuItem({
  icon,
  label,
  onClick,
  disabled = false,
  badge,
  tone = "default",
  trailing,
  checked,
}: AdminAccountMenuItemProps) {
  const danger = tone === "danger";

  return (
    <button
      type="button"
      role={checked === undefined ? "menuitem" : "menuitemcheckbox"}
      aria-checked={checked}
      disabled={disabled}
      onClick={onClick}
      className={`group/mi flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[13px] font-medium outline-none transition-colors duration-150 ${
        disabled
          ? "cursor-not-allowed text-dim"
          : danger
            ? "cursor-pointer text-muted hover:bg-[#FF6B6B]/10 hover:text-red focus-visible:bg-[#FF6B6B]/10 focus-visible:text-red active:scale-[0.985]"
            : "cursor-pointer text-muted hover:bg-ov/[0.07] hover:text-strong focus-visible:bg-ov/[0.07] focus-visible:text-strong active:scale-[0.985]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 transition-all duration-200 ${
          disabled
            ? "text-dim/60"
            : danger
              ? "text-dim group-hover/mi:translate-x-0.5 group-hover/mi:text-red group-focus-visible/mi:translate-x-0.5 group-focus-visible/mi:text-red"
              : "text-dim group-hover/mi:scale-110 group-hover/mi:text-teal group-focus-visible/mi:text-teal"
        }`}
      >
        {icon}
      </svg>

      <span className="flex-1 truncate">{label}</span>

      {badge && (
        <span className="rounded-full border border-ov/[0.12] bg-ov/[0.04] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-dim">
          {badge}
        </span>
      )}
      {trailing}
    </button>
  );
}