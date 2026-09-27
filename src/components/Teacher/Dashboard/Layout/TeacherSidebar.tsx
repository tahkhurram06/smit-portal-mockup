// Intended path: components/Teacher/Dashboard/Layout/TeacherSidebar/TeacherSidebar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { teacher } from "@/lib/batchData";
import { useLogout } from "@/hooks/useLogout";
import { useTheme } from "@/hooks/useTheme";
import SidebarTooltip from "@/components/Students/Courses/Dashboard/Layout/SideBar/SidebarTooltip";
import Switch from "@/components/ui/Switch";

// ─── Nav items ────────────────────────────────────────────────────────────────

type TeacherNavIcon =
  | "students"
  | "attendance"
  | "assignments"
  | "quizzes"
  | "progress";

interface TeacherNavItem {
  key: string;
  label: string;
  href: string;
  icon: TeacherNavIcon;
}

const navItems: TeacherNavItem[] = [
  { key: "students",    label: "Students",        href: "/teacher/dashboard",             icon: "students"    },
  { key: "attendance",  label: "Attendance",       href: "/teacher/dashboard/attendance",  icon: "attendance"  },
  { key: "assignments", label: "Assignments",      href: "/teacher/dashboard/assignments", icon: "assignments" },
  { key: "quizzes",     label: "Quizzes",          href: "/teacher/dashboard/quizzes",     icon: "quizzes"     },
  { key: "progress",    label: "Course Progress",  href: "/teacher/dashboard/progress",    icon: "progress"    },
];

const navIcons: Record<TeacherNavIcon, React.ReactNode> = {
  students: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  attendance: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 9h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m8.5 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  assignments: (
    <>
      <path d="M7 3h8l4 4v14H7V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 3v4h4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.5 13h5M9.5 16.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  quizzes: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.33c-.7.27-1.4.85-1.4 1.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
    </>
  ),
  progress: (
    <path d="M4 20V10m6 10V4m6 16v-7m6 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),
};

// ─── Nav item button ───────────────────────────────────────────────────────────

interface NavItemProps {
  item: TeacherNavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function TeacherNavItemBtn({ item, active, collapsed, onClick }: NavItemProps) {
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
          collapsed
            ? "mx-auto h-11 w-11 justify-center p-0"
            : "w-full px-3.5 py-3"
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
        {active && !collapsed && (
          <span
            className="absolute inset-0 rounded-[12px] border border-[#8B6BFF]/30 bg-gradient-to-r from-[#8B6BFF]/[0.16] to-[#8B6BFF]/[0.04] motion-safe:animate-[fadeUp_0.25s_ease_both]"
            aria-hidden="true"
          />
        )}
        {active && collapsed && (
          <span
            className="absolute inset-0 rounded-[12px] border border-[#8B6BFF]/40 motion-safe:animate-[fadeUp_0.25s_ease_both]"
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
              ? "text-purple drop-shadow-[0_0_6px_rgba(139,107,255,0.5)]"
              : "text-muted group-hover:scale-110 group-hover:text-teal"
          }`}
        >
          {navIcons[item.icon]}
        </svg>
        <span
          className={`relative z-[1] overflow-hidden whitespace-nowrap transition-all duration-200 ${
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          {item.label}
        </span>
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface TeacherSidebarProps {
  activeKey: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function TeacherSidebar({
  activeKey,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: TeacherSidebarProps) {
  const router = useRouter();
  const logout = useLogout();
  const { theme, toggle: toggleTheme } = useTheme();

  const accountRef = useRef<HTMLButtonElement>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [accountHovered, setAccountHovered] = useState(false);
  const [accountCoords, setAccountCoords] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // Close account menu when mobile drawer closes
  useEffect(() => {
    if (!mobileOpen) setAccountMenuOpen(false);
  }, [mobileOpen]);

  // Outside-click / Escape for account menu
  useEffect(() => {
    if (!accountMenuOpen) return;

    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || accountRef.current?.contains(t)) return;
      setAccountMenuOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAccountMenuOpen(false);
        accountRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [accountMenuOpen]);

  const handleAccountEnter = () => {
    if (!collapsed || !accountRef.current) return;
    const rect = accountRef.current.getBoundingClientRect();
    setAccountCoords({ top: rect.top + rect.height / 2, left: rect.right + 14 });
    setAccountHovered(true);
  };

  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={onCloseMobile}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-ov/[0.1] bg-panel/95 px-3 py-5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:overflow-y-auto lg:bg-sidebar lg:backdrop-blur-xl ${
          collapsed ? "lg:w-[76px]" : "lg:w-[220px]"
        } ${mobileOpen ? "w-[240px] translate-x-0" : "w-[240px] -translate-x-full lg:translate-x-0"}`}
      >
        {/* Header: logo + collapse/close buttons */}
        <div
          className={`mb-6 flex items-center gap-2.5 px-1 ${
            collapsed ? "justify-between lg:flex-col lg:justify-center lg:gap-3" : "justify-between"
          }`}
        >
          <Link
            href="/teacher/batches"
            aria-label="Go to my batches"
            className="flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] shadow-[0_4px_14px_-3px_rgba(139,107,255,0.5)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M4 12L10 18L20 6" stroke="#0A0A12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span
              className={`whitespace-nowrap text-sm tracking-wide text-muted overflow-hidden transition-all duration-200 ${
                collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
              }`}
            >
              <b className="font-semibold tracking-wider text-strong">SMIT</b>
            </span>
          </Link>

          {/* Collapse toggle (desktop) */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-ov/[0.1] text-muted outline-none transition-all duration-200 hover:border-ov/[0.2] hover:text-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 lg:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            >
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Close (mobile) */}
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-ov/[0.1] text-muted outline-none transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1.5">
          {navItems.map((item, i) => (
            <div
              key={item.key}
              className="motion-safe:animate-[fadeUp_0.5s_ease_both]"
              style={{ animationDelay: `${0.06 + i * 0.04}s` }}
            >
              <TeacherNavItemBtn
                item={item}
                active={item.key === activeKey}
                collapsed={collapsed}
                onClick={() => {
                  onCloseMobile();
                  router.push(item.href);
                }}
              />
            </div>
          ))}
        </nav>

        {/* Account button */}
        <button
          ref={accountRef}
          type="button"
          onMouseEnter={handleAccountEnter}
          onMouseLeave={() => setAccountHovered(false)}
          onClick={() => {
            setAccountHovered(false);
            setAccountMenuOpen((o) => !o);
          }}
          aria-haspopup="menu"
          aria-expanded={accountMenuOpen}
          className={`group mt-4 flex cursor-pointer items-center gap-3 rounded-[12px] border p-2.5 text-left outline-none transition-all duration-200 ${
            accountMenuOpen
              ? "border-[#8B6BFF]/40 bg-ov/[0.06]"
              : "border-ov/[0.08] bg-ov/[0.03] hover:border-ov/[0.16] hover:bg-ov/[0.06]"
          } focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
            collapsed ? "lg:mx-auto lg:h-11 lg:w-11 lg:justify-center lg:p-0" : ""
          }`}
        >
          <div className="relative shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[12.5px] font-bold text-[#0A0A12] shadow-[0_0_0_2px_var(--panel),0_0_0_3.5px_rgba(139,107,255,0.35)] transition-shadow duration-200 group-hover:shadow-[0_0_0_2px_var(--panel),0_0_0_3.5px_rgba(139,107,255,0.55)]">
              {teacher.initials}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-panel bg-[#3FE6D6] motion-safe:animate-[pulseSoft_2s_ease-in-out_infinite]" />
          </div>

          <div
            className={`flex min-w-0 flex-1 items-center justify-between gap-2 overflow-hidden transition-all duration-200 ${
              collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-medium leading-tight text-strong">{teacher.name}</span>
              <span className="block truncate text-[11px] leading-tight text-muted">Teacher</span>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5 shrink-0 text-dim transition-colors duration-200 group-hover:text-muted"
            >
              <path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        <SidebarTooltip
          label={`${teacher.name} · Teacher`}
          top={accountCoords.top}
          left={accountCoords.left}
          visible={collapsed && accountHovered && !accountMenuOpen}
        />

        {/* Inline account menu (portal-less, same pattern as student AccountMenu but simplified) */}
        {accountMenuOpen && (
          <div
            ref={menuRef}
            role="menu"
            aria-label="Account"
            className="mt-2 rounded-[14px] border border-ov/[0.12] bg-panel/95 p-1.5 shadow-pop backdrop-blur-xl motion-safe:animate-[menuIn_0.18s_cubic-bezier(0.16,1,0.3,1)_both]"
          >
            {/* Light mode toggle */}
            <button
              type="button"
              role="menuitemcheckbox"
              aria-checked={theme === "light"}
              onClick={toggleTheme}
              className="group/mi flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[13px] font-medium text-muted outline-none transition-colors duration-150 hover:bg-ov/[0.07] hover:text-strong focus-visible:bg-ov/[0.07]"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-dim transition-all duration-200 group-hover/mi:scale-110 group-hover/mi:text-teal">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="flex-1 truncate">Light mode</span>
              <Switch on={theme === "light"} />
            </button>

            <div role="separator" className="mx-2 my-1 h-px bg-ov/[0.08]" />

            {/* Log out */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setAccountMenuOpen(false);
                logout();
              }}
              className="group/mi flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[13px] font-medium text-muted outline-none transition-colors duration-150 hover:bg-[#FF6B6B]/10 hover:text-red focus-visible:bg-[#FF6B6B]/10 focus-visible:text-red"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-dim transition-all duration-200 group-hover/mi:translate-x-0.5 group-hover/mi:text-red">
                <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 8l4 4-4 4M20 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Log out
            </button>
          </div>
        )}
      </aside>
    </>
  );
}