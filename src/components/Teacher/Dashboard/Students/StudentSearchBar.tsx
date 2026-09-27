"use client";

import { useEffect, useRef, useState } from "react";

interface StudentSearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

const filterOptions = [
  { value: "all", label: "All" },
  { value: "Enrolled", label: "Enrolled" },
];

export default function StudentSearchBar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
}: StudentSearchBarProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const activeLabel = filterOptions.find((o) => o.value === filter)?.label ?? "All";

  return (
    <div className="mb-4 flex flex-wrap gap-2.5 sm:flex-nowrap">
      <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-dim">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, email or roll no..."
          className="w-full bg-transparent text-[13px] text-strong placeholder:text-dim focus:outline-none"
        />
      </div>

      <div ref={rootRef} className="relative z-10 shrink-0">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-full cursor-pointer items-center gap-2 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5 text-[13px] font-medium text-strong transition-colors duration-200 hover:border-ov/[0.22] hover:bg-ov/[0.075]"
        >
          {activeLabel}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute right-0 top-full z-50 mt-2 w-36 origin-top-right overflow-hidden rounded-[14px] border border-ov/[0.12] bg-panel/95 p-1.5 shadow-pop backdrop-blur-xl motion-safe:animate-[fadeUp_0.15s_ease_both]"
          >
            {filterOptions.map((opt) => {
              const active = opt.value === filter;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onFilterChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-[10px] px-3 py-2 text-left text-[13px] transition-colors duration-150 hover:bg-ov/[0.07] ${
                    active ? "text-strong" : "text-muted hover:text-strong"
                  }`}
                >
                  {opt.label}
                  {active && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3FE6D6]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}