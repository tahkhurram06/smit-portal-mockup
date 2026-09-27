import { feedbackTypes, FeedbackType } from "@/lib/feedbackData";

export interface AdminNavItem {
  label: string;
  icon: "overview" | "batches" | "teachers" | "payments" | "feedback";
  href: string;
}

export const adminNavItems: AdminNavItem[] = [
  { label: "Overview", icon: "overview", href: "/admin/dashboard" },
  { label: "Batches", icon: "batches", href: "/admin/batches" },
  { label: "Teachers", icon: "teachers", href: "/admin/teachers" },
  { label: "Payments", icon: "payments", href: "/admin/payments" },
  { label: "Feedback", icon: "feedback", href: "/admin/feedback" },
];

export const admin = {
  name: "Admin SMIT",
  initials: "AS",
};

export interface AdminStatData {
  value: string;
  label: string;
  icon: "students" | "teachers" | "batches" | "overdue";
}

// Portal-wide totals across every batch — not tied to a single course like the
// student/teacher stat cards.
export const overviewStats: AdminStatData[] = [
  { value: "183", label: "Total students", icon: "students" },
  { value: "4", label: "Teachers", icon: "teachers" },
  { value: "5", label: "Active batches", icon: "batches" },
  { value: "12", label: "Overdue vouchers", icon: "overdue" },
];

export interface FeeSummary {
  collected: number;
  expected: number;
}

export const feeSummary: FeeSummary = {
  collected: 142000,
  expected: 182000,
};

export type FeedbackStatus = "New" | "Reviewed";

export interface FeedbackPreview {
  id: string;
  type: FeedbackType;
  author: string;
  message: string;
  images: number;
  daysAgo: number;
  status: FeedbackStatus;
}

// The full inbox, newest first. The Overview page only previews the first 3
// (see app/admin/dashboard/page.tsx); the Feedback page shows all of it.
export const feedbackItems: FeedbackPreview[] = [
  {
    id: "fb-1",
    type: "bug",
    author: "Bilal Ahmed",
    message: "The attendance page shows 0 present even after I mark students.",
    images: 2,
    daysAgo: 1,
    status: "New",
  },
  {
    id: "fb-2",
    type: "idea",
    author: "Ayesha Khan",
    message: "Would love a dark-mode toggle inside the quiz fullscreen view too.",
    images: 0,
    daysAgo: 2,
    status: "New",
  },
  {
    id: "fb-3",
    type: "other",
    author: "Sara Ahmed (Teacher)",
    message: "Can we get bulk CSV export for the student list?",
    images: 1,
    daysAgo: 3,
    status: "New",
  },
  {
    id: "fb-4",
    type: "bug",
    author: "Hira Fatima",
    message: "Payment voucher copy button does nothing on Safari.",
    images: 1,
    daysAgo: 4,
    status: "New",
  },
  {
    id: "fb-5",
    type: "idea",
    author: "Zain Malik",
    message: "Add push notifications before quiz deadlines.",
    images: 0,
    daysAgo: 5,
    status: "Reviewed",
  },
  {
    id: "fb-6",
    type: "bug",
    author: "Usman Tariq",
    message: "Assignment topics chip overflows on small screens in landscape.",
    images: 3,
    daysAgo: 7,
    status: "Reviewed",
  },
  {
    id: "fb-7",
    type: "other",
    author: "Omar Siddiqui (Teacher)",
    message: "Requesting an export of my batch's attendance as a spreadsheet.",
    images: 0,
    daysAgo: 9,
    status: "Reviewed",
  },
  {
    id: "fb-8",
    type: "idea",
    author: "Maryam Sheikh",
    message: "It would help to get a reminder a day before fee vouchers are due.",
    images: 0,
    daysAgo: 11,
    status: "Reviewed",
  },
];

// Badge count shown on the sidebar's Feedback nav item.
export const feedbackInboxCount = feedbackItems.filter((f) => f.status === "New").length;

/** Look up a feedback type's badge colours, reusing the palette from the feedback form. */
export function feedbackAccent(type: FeedbackType) {
  return feedbackTypes.find((t) => t.key === type)!;
}