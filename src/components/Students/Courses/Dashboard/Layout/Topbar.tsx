"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { navItems } from "@/lib/dashboardData";
import FeedbackModal from "@/components/Feedback/FeedbackModal";

interface TopbarProps {
  activeHref: string;
  courseTitle: string;
  onOpenMobileMenu: () => void;
}

interface Crumb {
  label: string;
  href: string | null;
}

export default function Topbar({ activeHref, courseTitle, onOpenMobileMenu }: TopbarProps) {
  const router = useRouter();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const currentPage = navItems.find((item) => item.href === activeHref);
  const isOverview = !currentPage || activeHref === "/dashboard";
  // The profile belongs to the student, not the course, so it skips the course crumb.
  const isProfile = activeHref === "/dashboard/profile";

  const courseCrumbs: Crumb[] = isOverview
    ? [
        { label: "Home", href: "/courses" },
        { label: courseTitle, href: null },
      ]
    : [
        { label: "Home", href: "/courses" },
        { label: courseTitle, href: "/dashboard" },
        { label: currentPage.label, href: null },
      ];

  const crumbs: Crumb[] = isProfile
    ? [
        { label: "Home", href: "/courses" },
        { label: "Profile", href: null },
      ]
    : courseCrumbs;

  return (
    <div className="mb-5 flex animate-[fadeUp_0.5s_ease_0.05s_both] items-center justify-between gap-3 sm:mb-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-ov/[0.1] text-muted transition-colors duration-200 hover:border-ov/[0.2] hover:text-strong lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center text-[12.5px] text-muted"
        >
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            const isFirst = i === 0;

            return (
              <span key={`${crumb.label}-${i}`} className="flex min-w-0 items-center">
                {i > 0 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`mx-1.5 h-3 w-3 shrink-0 ${isFirst ? "" : "hidden sm:inline"}`}
                    style={{ display: isFirst ? undefined : "inline" }}
                  >
                    <path
                      d="m9 6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                {isLast ? (
                  <span
                    className={`truncate font-semibold text-fg ${
                      isFirst ? "" : "min-w-0"
                    }`}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => crumb.href && router.push(crumb.href)}
                    className={`shrink-0 cursor-pointer truncate rounded-[4px] text-muted outline-none transition-colors duration-200 hover:text-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
                      isFirst ? "hidden sm:inline" : "min-w-0"
                    }`}
                  >
                    {crumb.label}
                  </button>
                )}
              </span>
            );
          })}
        </nav>
      </div>

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

      {/* renders into document.body, so it doesn't affect this bar's layout */}
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}