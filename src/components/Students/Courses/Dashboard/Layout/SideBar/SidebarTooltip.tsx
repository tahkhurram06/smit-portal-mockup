"use client";

import { createPortal } from "react-dom";

interface SidebarTooltipProps {
  label: string;
  top: number;
  left: number;
  visible: boolean;
}

export default function SidebarTooltip({
  label,
  top,
  left,
  visible,
}: SidebarTooltipProps) {
  if (!visible || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="tooltip"
      className="pointer-events-none fixed z-[100] whitespace-nowrap rounded-[8px] border border-white/[0.12] bg-[#14141F] px-2.5 py-1.5 text-[12px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] motion-safe:animate-[tooltipIn_0.15s_ease_both]"
      style={{ top, left }}
    >
      {label}
      <span className="absolute left-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-white/[0.12] bg-[#14141F]" />
    </div>,
    document.body
  );
}