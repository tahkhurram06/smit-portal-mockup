// Intended path: components/Teacher/Dashboard/Layout/TeacherBottomNav.tsx
"use client";

import BottomNav, { BottomNavItem } from "@/components/ui/BottomNav";

const items: BottomNavItem[] = [
  {
    key: "students",
    label: "Students",
    href: "/teacher/dashboard",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    key: "attendance",
    label: "Attendance",
    href: "/teacher/dashboard/attendance",
    icon: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M4 9h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m8.5 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    key: "assignments",
    label: "Assignments",
    href: "/teacher/dashboard/assignments",
    icon: (
      <>
        <path d="M7 3h8l4 4v14H7V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M15 3v4h4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9.5 13h5M9.5 16.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "quizzes",
    label: "Quizzes",
    href: "/teacher/dashboard/quizzes",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.33c-.7.27-1.4.85-1.4 1.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
      </>
    ),
  },
  {
    key: "progress",
    label: "Progress", // "Course Progress" is too long for a tab
    href: "/teacher/dashboard/progress",
    icon: <path d="M4 20V10m6 10V4m6 16v-7m6 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  },
];

interface TeacherBottomNavProps {
  activeKey: string;
}

export default function TeacherBottomNav({ activeKey }: TeacherBottomNavProps) {
  return <BottomNav items={items} activeKey={activeKey} />;
}