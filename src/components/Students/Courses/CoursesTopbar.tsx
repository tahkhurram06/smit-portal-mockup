"use client";

import { useState } from "react";
import { student } from "@/lib/dashboardData";
import FeedbackModal from "@/components/Feedback/FeedbackModal";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function CoursesTopbar() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[13px] font-bold text-[#0A0A12]">
          {student.initials}
        </div>
        <span className="text-sm font-medium text-strong">{student.name}</span>
      </div>

      <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5 sm:flex-none sm:min-w-[260px]">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-dim">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search courses"
          className="w-full bg-transparent text-[13px] text-strong placeholder:text-dim focus:outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setFeedbackOpen(true)}
          aria-haspopup="dialog"
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5 text-xs font-medium text-muted transition-all duration-200 hover:border-ov/[0.22] hover:bg-ov/[0.075] hover:text-strong"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path
              d="M8 10h8M8 14h5M6 4h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-4 3v-3H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Feedback
        </button>
      </div>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}