// Intended path: components/Teacher/Dashboard/Layout/TeacherTopbar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FeedbackModal from "@/components/Feedback/FeedbackModal";
import ThemeToggle from "@/components/ui/ThemeToggle";

const tabLabels: Record<string, string> = {
  students:    "Students",
  attendance:  "Attendance",
  assignments: "Assignments",
  quizzes:     "Quizzes",
  progress:    "Course Progress",
};

interface TeacherTopbarProps {
  courseTitle: string;
  activeKey: string;
  onOpenMobileMenu: () => void;
}

export default function TeacherTopbar({
  courseTitle,
  activeKey,
  onOpenMobileMenu,
}: TeacherTopbarProps) {
  const router = useRouter();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const activeLabel = tabLabels[activeKey] ?? "";

  return (
    <div className="mb-5 animate-[fadeUp_0.5s_ease_0.05s_both] sm:mb-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-ov/[0.1] text-muted transition-colors duration-200 hover:border-ov/[0.2] hover:text-strong lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center text-[12.5px] text-muted">
            <button
              type="button"
              onClick={() => router.push("/teacher/batches")}
              className="hidden shrink-0 cursor-pointer rounded-[4px] text-muted outline-none transition-colors duration-200 hover:text-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 sm:inline"
            >
              Dashboard
            </button>
            <svg viewBox="0 0 24 24" fill="none" className="mx-1.5 hidden h-3 w-3 shrink-0 sm:inline">
              <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate font-semibold text-fg-soft">{courseTitle}</span>
            <svg viewBox="0 0 24 24" fill="none" className="mx-1.5 h-3 w-3 shrink-0">
              <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="shrink-0 truncate font-semibold text-fg">{activeLabel}</span>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            aria-haspopup="dialog"
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3 py-2 text-xs font-medium text-muted transition-all duration-200 hover:border-ov/[0.22] hover:bg-ov/[0.075] hover:text-strong active:scale-[0.97]"
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
            <span className="hidden sm:inline">Feedback</span>
          </button>
        </div>
      </div>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}