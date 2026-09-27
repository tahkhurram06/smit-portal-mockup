"use client";

import { useEffect, useRef, useState } from "react";

interface MonthDropdownProps {
  months: string[];
  value: string;
  onChange: (month: string) => void;
}

export default function MonthDropdown({ months, value, onChange }: MonthDropdownProps) {
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

  return (
    <div ref={rootRef} className="relative z-10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-2 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5 text-[13px] font-medium text-strong transition-colors duration-200 hover:border-ov/[0.22] hover:bg-ov/[0.075]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-teal">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {value}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 max-h-64 w-44 origin-top-right overflow-y-auto rounded-[14px] border border-ov/[0.12] bg-panel/95 p-1.5 shadow-pop backdrop-blur-xl motion-safe:animate-[fadeUp_0.15s_ease_both]"
        >
          {months.map((month) => {
            const active = month === value;
            return (
              <button
                key={month}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(month);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-[10px] px-3 py-2 text-left text-[13px] transition-colors duration-150 hover:bg-ov/[0.07] ${
                  active ? "text-strong" : "text-muted hover:text-strong"
                }`}
              >
                {month}
                {active && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3FE6D6]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}