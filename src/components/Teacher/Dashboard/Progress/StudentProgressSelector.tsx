"use client";

import { useEffect, useRef, useState } from "react";
import { StudentProgressRecord } from "@/lib/teacherProgressData";

interface StudentProgressSelectorProps {
  students: StudentProgressRecord[];
  value: string;
  onChange: (rollNumber: string) => void;
}

export default function StudentProgressSelector({
  students,
  value,
  onChange,
}: StudentProgressSelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = students.find((s) => s.rollNumber === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
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
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5 text-[13px] font-medium text-strong transition-colors duration-200 hover:border-ov/[0.22] hover:bg-ov/[0.075] sm:w-auto sm:min-w-[240px]"
      >
        <span className="flex min-w-0 items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-teal">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="truncate">{active ? `${active.name} · Roll ${active.rollNumber}` : "Select a student"}</span>
        </span>
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
          className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full min-w-[240px] overflow-y-auto rounded-[14px] border border-ov/[0.12] bg-panel/95 p-1.5 shadow-pop backdrop-blur-xl motion-safe:animate-[fadeUp_0.15s_ease_both]"
        >
          {students.map((s) => {
            const isActive = s.rollNumber === value;
            return (
              <button
                key={s.rollNumber}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(s.rollNumber);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] px-3 py-2 text-left text-[13px] transition-colors duration-150 hover:bg-ov/[0.07] ${
                  isActive ? "text-strong" : "text-muted hover:text-strong"
                }`}
              >
                <span className="min-w-0 truncate">
                  {s.name} <span className="text-dim">· {s.rollNumber}</span>
                </span>
                {isActive && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3FE6D6]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}