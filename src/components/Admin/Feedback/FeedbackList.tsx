"use client";

import { useState } from "react";
import { feedbackItems as initialItems, FeedbackPreview } from "@/lib/adminData";
import { FeedbackType, feedbackTypes } from "@/lib/feedbackData";
import FeedbackListItem from "./FeedbackListItem";

type FilterKey = "all" | FeedbackType;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  ...feedbackTypes.map((t) => ({ key: t.key, label: t.label })),
];

export default function FeedbackList() {
  const [items, setItems] = useState<FeedbackPreview[]>(initialItems);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [q, setQ] = useState("");

  const filtered = items.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (!q.trim()) return true;
    const needle = q.toLowerCase();
    return item.author.toLowerCase().includes(needle) || item.message.toLowerCase().includes(needle);
  });

  function toggleStatus(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === "New" ? "Reviewed" : "New" } : item,
      ),
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium capitalize transition-all duration-200 ${
                  active
                    ? "border-[#8B6BFF]/40 bg-[#8B6BFF]/[0.14] text-strong"
                    : "border-ov/[0.13] bg-ov/[0.04] text-muted hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5 sm:w-64 sm:shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-dim">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search feedback"
            className="w-full bg-transparent text-[13px] text-strong placeholder:text-dim focus:outline-none"
          />
        </div>
      </div>

      <div className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]">
        {filtered.length === 0 ? (
          <p className="px-5 py-8 text-center text-[12.5px] text-dim">No feedback matches your filters.</p>
        ) : (
          <div className="flex flex-col gap-2 p-3 sm:p-4">
            {filtered.map((item, i) => (
              <FeedbackListItem
                key={item.id}
                item={item}
                delay={0.03 + i * 0.03}
                onToggleStatus={() => toggleStatus(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}