"use client";

import { useState } from "react";
import { upcomingItems, UpcomingTab } from "@/lib/dashboardData";
import StatusBadge from "@/components/ui/StatusBadge";

const tabs: { key: UpcomingTab; label: string }[] = [
  { key: "assignments", label: "Assignments" },
  { key: "quizzes", label: "Quizzes" },
  { key: "events", label: "Events" },
];

interface UpcomingPanelProps {
  delay?: number;
}

export default function UpcomingPanel({ delay = 0 }: UpcomingPanelProps) {
  const [active, setActive] = useState<UpcomingTab>("assignments");
  const activeIndex = tabs.findIndex((t) => t.key === active);
  const items = upcomingItems[active];

  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] rounded-2xl border border-ov/[0.1] bg-card shadow-card p-4 backdrop-blur-xl transition-all duration-300 hover:border-ov/[0.18] sm:p-5"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* tab switcher */}
      <div className="relative mb-4 flex rounded-full border border-ov/[0.1] bg-ov/[0.03] p-1">
        <div
          className="absolute inset-y-1 left-1 z-[1] rounded-full bg-gradient-to-r from-[#3FE6D6] to-[#8B6BFF] shadow-[0_2px_10px_-2px_rgba(139,107,255,0.5)] transition-transform duration-[350ms] ease-[cubic-bezier(0.34,1.4,0.64,1)]"
          style={{
            width: `calc((100% - 8px) / ${tabs.length})`,
            transform: `translateX(calc(${activeIndex} * 100%))`,
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`group relative z-[2] flex-1 cursor-pointer overflow-hidden rounded-full px-1 py-1.5 text-center text-[11.5px] font-semibold transition-colors duration-200 ${
              active === tab.key
                ? "text-[#0A0A12]"
                : "text-muted hover:text-strong"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2`}
          >
            {active === tab.key && (
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[length:250%_auto] bg-[position:0%_center] opacity-0 transition-[background-position,opacity] duration-[600ms] ease-out group-hover:bg-[position:100%_center] group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #3FE6D6, #8B6BFF 50%, #FF57A8 85%, #3FE6D6)",
                }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* list */}
      <div className="flex flex-col gap-2">
        {items.length === 0 ? (
          <p className="animate-[fadeUp_0.3s_ease_both] py-6 text-center text-[12.5px] text-dim">
            No upcoming {active}.
          </p>
        ) : (
          items.map((item, i) => (
            <div
              key={item.title}
              className="group flex items-start justify-between gap-3 rounded-[12px] border border-ov/[0.07] bg-ov/[0.02] p-3 transition-all duration-200 motion-safe:animate-[fadeUp_0.35s_ease_both] hover:border-ov/[0.15] hover:bg-ov/[0.05]"
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-strong transition-colors duration-200 group-hover:text-teal sm:whitespace-normal">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11.5px] text-muted">{item.meta}</p>
              </div>
              <div className="shrink-0 pt-0.5">
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}