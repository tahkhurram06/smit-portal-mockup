"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLogout } from "@/hooks/useLogout";
import { useTheme } from "@/hooks/useTheme";
import Switch from "@/components/ui/Switch";
import AdminAccountMenuItem from "./AdminAccountMenuItem";

const MENU_WIDTH = 196;
const GAP = 8;

interface AdminAccountMenuProps {
  open: boolean;
  onClose: () => void;
  /** The account button the menu hangs off. */
  anchorRef: React.RefObject<HTMLElement | null>;
  /** Only used to re-position the menu when the sidebar collapses or expands. */
  collapsed: boolean;
}

export default function AdminAccountMenu({
  open,
  onClose,
  anchorRef,
  collapsed,
}: AdminAccountMenuProps) {
  const logout = useLogout();
  const { theme, toggle: toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ left: number; bottom: number } | null>(null);

  // Rendered in a portal so the sidebar's scrolling can't clip it. Positioned
  // from the button's rect, opening upward so it never runs off the bottom.
  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }

    const place = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setCoords({
        left: Math.max(GAP, Math.min(rect.left, window.innerWidth - MENU_WIDTH - GAP)),
        bottom: window.innerHeight - rect.top + GAP,
      });
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open, collapsed, anchorRef]);

  const placed = coords !== null;
  useEffect(() => {
    if (placed) menuRef.current?.focus();
  }, [placed]);

  useEffect(() => {
    if (!open) return;

    const rows = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]:not(:disabled)') ?? [],
      );

    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (menuRef.current?.contains(target) || anchorRef.current?.contains(target)) return;
      onClose();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        anchorRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const list = rows();
        if (list.length === 0) return;
        const i = list.indexOf(document.activeElement as HTMLElement);
        const down = e.key === "ArrowDown";
        const next = i === -1 ? (down ? 0 : list.length - 1) : (i + (down ? 1 : -1) + list.length) % list.length;
        list[next].focus();
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, anchorRef]);

  if (!open || !coords || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-label="Account"
      tabIndex={-1}
      style={{ left: coords.left, bottom: coords.bottom, width: MENU_WIDTH }}
      className="fixed z-[100] origin-bottom-left rounded-[14px] border border-ov/[0.12] bg-panel/95 p-1.5 shadow-pop outline-none backdrop-blur-xl motion-safe:animate-[menuIn_0.18s_cubic-bezier(0.16,1,0.3,1)_both]"
    >
      {/* No admin profile page yet — keep the row visible but disabled, same pattern as the student menu before its profile route existed. */}
      <AdminAccountMenuItem
        label="Profile"
        disabled
        badge="Soon"
        icon={
          <>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        }
      />

      <AdminAccountMenuItem
        label="Light mode"
        checked={theme === "light"}
        onClick={toggleTheme}
        trailing={<Switch on={theme === "light"} />}
        icon={
          <>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        }
      />

      <div role="separator" className="mx-2 my-1 h-px bg-ov/[0.08]" />

      <AdminAccountMenuItem
        label="Log out"
        tone="danger"
        onClick={() => {
          onClose();
          logout();
        }}
        icon={
          <path
            d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 8l4 4-4 4M20 12H9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        }
      />
    </div>,
    document.body,
  );
}