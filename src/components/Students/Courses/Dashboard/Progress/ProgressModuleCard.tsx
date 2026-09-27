"use client";

import { useState } from "react";
import { ProgressModule } from "@/lib/dashboardData";
import ProgressRing from "./ProgressRing";

interface ProgressModuleCardProps {
  module: ProgressModule;
  delay?: number;
}

function getStatusColor(percent: number) {
  if (percent === 100) return "var(--teal)";
  if (percent === 0) return "var(--dim)";
  return "var(--purple)";
}

export default function ProgressModuleCard({ module, delay = 0 }: ProgressModuleCardProps) {
  const [open, setOpen] = useState(false);
  const percent = Math.round((module.completed / module.total) * 100);
  const color = getStatusColor(percent);
  const isComplete = percent === 100;
  const isNotStarted = percent === 0;

  return (
    <div
      className={`animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
        open
          ? "border-[#8B6BFF]/30 bg-[#8B6BFF]/[0.06]"
          : "border-ov/[0.1] bg-card shadow-card hover:border-ov/[0.18]"
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-ov/[0.03] sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}
          >
            {isComplete ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" style={{ color }}>
                <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" style={{ color: isNotStarted ? "var(--dim)" : "var(--amber)" }}>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-medium text-strong sm:text-sm">{module.title}</p>
            <p className="mt-0.5 text-[12px] text-muted">
              Topics: {module.completed}/{module.total}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <ProgressRing percent={percent} color={color} delay={delay + 0.2} />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`h-4 w-4 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2.5 border-t border-ov/[0.08] px-5 pb-4 pt-3.5 sm:px-6">
            {module.topics.map((topic, i) => (
              <div
                key={topic.title}
                className={`flex items-center gap-2 text-[12.5px] ${
                  open ? "motion-safe:animate-[fadeUp_0.35s_ease_both]" : ""
                }`}
                style={{ animationDelay: `${0.08 + i * 0.06}s` }}
              >
                {topic.done ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-teal">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m8.5 12.5 2.2 2.2L16 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-dim">
                    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
                <span className={topic.done ? "text-fg-soft" : "text-dim"}>{topic.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}