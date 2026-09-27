"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navItems, student } from "@/lib/dashboardData";
import SidebarNavItem from "./SidebarNavItem";
import SidebarTooltip from "./SidebarTooltip";
import AccountMenu from "../AccountMenu/AccountMenu";

interface SidebarProps {
  activeHref: string;
  onNavigate: (href: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  activeHref,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const accountRef = useRef<HTMLButtonElement>(null);
  const [accountHovered, setAccountHovered] = useState(false);
  const [accountCoords, setAccountCoords] = useState({ top: 0, left: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) setMenuOpen(false);
  }, [mobileOpen]);

  const handleAccountEnter = () => {
    if (!collapsed || !accountRef.current) return;
    const rect = accountRef.current.getBoundingClientRect();
    setAccountCoords({
      top: rect.top + rect.height / 2,
      left: rect.right + 14,
    });
    setAccountHovered(true);
  };

  return (
    <>
      {/* mobile scrim */}
      <div
        onClick={onCloseMobile}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-ov/[0.1] bg-panel/95 py-5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:overflow-y-auto lg:bg-sidebar lg:backdrop-blur-xl ${
          collapsed ? "lg:w-[68px] lg:px-2.5" : "lg:w-[220px] lg:px-3"
        } ${
          mobileOpen
            ? "w-[240px] translate-x-0 px-3"
            : "w-[240px] -translate-x-full px-3 lg:translate-x-0"
        }`}
      >
        {/* ── Header ── */}
        <div
          className={`mb-6 flex items-center px-1 ${
            collapsed
              ? "lg:flex-col lg:justify-center lg:gap-3"
              : "justify-between gap-2.5"
          }`}
        >
          <Link
            href="/courses"
            aria-label="Go to my courses"
            className="flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] shadow-[0_4px_14px_-3px_rgba(139,107,255,0.5)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M4 12L10 18L20 6"
                  stroke="#0A0A12"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className={`whitespace-nowrap text-sm tracking-wide text-muted overflow-hidden transition-all duration-300 ${
                collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
              }`}
            >
              <b className="font-semibold tracking-wider text-strong">SMIT</b>
            </span>
          </Link>

          {/* Collapse toggle — desktop */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-ov/[0.1] text-muted outline-none transition-all duration-200 hover:border-ov/[0.2] hover:text-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 lg:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Close — mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-ov/[0.1] text-muted outline-none transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item, i) => (
            <div
              key={item.href}
              className="motion-safe:animate-[fadeUp_0.5s_ease_both]"
              style={{ animationDelay: `${0.06 + i * 0.04}s` }}
            >
              <SidebarNavItem
                item={item}
                active={item.href === activeHref}
                collapsed={collapsed}
                onClick={() => onNavigate(item.href)}
              />
            </div>
          ))}
        </nav>

        {/* ── Account button ── */}
        <button
          ref={accountRef}
          type="button"
          onMouseEnter={handleAccountEnter}
          onMouseLeave={() => setAccountHovered(false)}
          onClick={() => {
            setAccountHovered(false);
            setMenuOpen((o) => !o);
          }}
          onKeyDown={(e) => {
            if (!menuOpen && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
              e.preventDefault();
              setMenuOpen(true);
            }
          }}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className={`group mt-4 flex cursor-pointer items-center gap-3 rounded-[12px] border p-2.5 text-left outline-none transition-all duration-200 ${
            menuOpen
              ? "border-[#8B6BFF]/40 bg-ov/[0.06]"
              : "border-ov/[0.08] bg-ov/[0.03] hover:border-ov/[0.16] hover:bg-ov/[0.06]"
          } focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
            collapsed
              ? "lg:mx-auto lg:h-11 lg:w-11 lg:justify-center lg:gap-0 lg:p-0"
              : ""
          }`}
        >
          <div className="relative mx-auto shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[12.5px] font-bold text-[#0A0A12] shadow-[0_0_0_2px_var(--panel),0_0_0_3px_rgba(139,107,255,0.3)] transition-shadow duration-200 group-hover:shadow-[0_0_0_2px_var(--panel),0_0_0_3px_rgba(139,107,255,0.5)]">
              {student.initials}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-panel bg-[#3FE6D6] motion-safe:animate-[pulseSoft_2s_ease-in-out_infinite]" />
          </div>

          <div
            className={`flex min-w-0 flex-1 items-center justify-between gap-2 overflow-hidden transition-all duration-300 ${
              collapsed ? "lg:m-0 lg:w-0 lg:flex-none lg:opacity-0" : "w-auto opacity-100"
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-medium leading-tight text-strong">
                {student.name}
              </span>
              <span className="block truncate text-[11px] leading-tight text-muted">
                Student
              </span>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5 shrink-0 text-dim transition-colors duration-200 group-hover:text-muted"
            >
              <path
                d="M8 9l4-4 4 4M8 15l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        <SidebarTooltip
          label={`${student.name} · Student`}
          top={accountCoords.top}
          left={accountCoords.left}
          visible={collapsed && accountHovered && !menuOpen}
        />

        <AccountMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          anchorRef={accountRef}
          collapsed={collapsed}
        />
      </aside>
    </>
  );
}