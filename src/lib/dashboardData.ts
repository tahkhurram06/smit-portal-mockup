export interface NavItem {
  label: string;
  icon:
    | "dashboard"
    | "progress"
    | "attendance"
    | "payment"
    | "assignment"
    | "quiz";
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { label: "Progress", icon: "progress", href: "/dashboard/progress" },
  { label: "Attendance", icon: "attendance", href: "/dashboard/attendance" },
  { label: "Payment", icon: "payment", href: "/dashboard/payment" },
  { label: "Assignment", icon: "assignment", href: "/dashboard/assignment" },
  { label: "Quiz", icon: "quiz", href: "/dashboard/quiz" },
];

export interface CourseData {
  title: string;
  status: "Enrolled";
  timeSlots: string[];
  progress: number;
  batch: number;
  roll: string;
  campus: string;
  city: string;
}

export const activeCourse: CourseData = {
  title: "Modern Web Application Development",
  status: "Enrolled",
  timeSlots: ["Mon 01:00 – 03:00 PM", "Wed 01:00 – 03:00 PM", "Fri 01:00 – 03:00 PM"],
  progress: 73,
  batch: 20,
  roll: "494544",
  campus: "Zaitoon Ashraf IT Park",
  city: "Karachi",
};

export interface DayStatus {
  label: string;
  date: number;
  state: "present" | "absent" | "upcoming" | "off";
}

export const weekSchedule: DayStatus[] = [
  { label: "Sun", date: 13, state: "off" },
  { label: "Mon", date: 14, state: "present" },
  { label: "Tue", date: 15, state: "off" },
  { label: "Wed", date: 16, state: "present" },
  { label: "Thu", date: 17, state: "off" },
  { label: "Fri", date: 18, state: "present" },
  { label: "Sat", date: 19, state: "off" },
];

export interface StatData {
  value: string;
  label: string;
  icon:
    | "clock"
    | "cap"
    | "calendar"
    | "check-circle"
    | "minus-circle"
    | "x-circle"
    | "card"
    | "hourglass";
}

export const stats: StatData[] = [
  { value: "81/143", label: "Attendance", icon: "clock" },
  { value: "14/13", label: "Assignments", icon: "cap" },
];

export const student = {
  name: "Taha Khurram",
  initials: "TK",
};

export type UpcomingTab = "assignments" | "quizzes" | "events";

export interface UpcomingItem {
  title: string;
  meta: string;
  status: "Pending" | "Submitted" | "Graded" | "Live" | "Closed";
}

export const upcomingItems: Record<UpcomingTab, UpcomingItem[]> = {
  assignments: [
    { title: "CSS Figma Website", meta: "Due in 2 days", status: "Pending" },
    { title: "HTML – Registration Form", meta: "Due in 4 days", status: "Pending" },
    { title: "HTML – Links With Multiple Pages", meta: "Due in 6 days", status: "Pending" },
  ],
  quizzes: [
    { title: "JavaScript Basics Quiz", meta: "Opens Fri, 2:00 PM", status: "Pending" },
    { title: "CSS Flexbox Quiz", meta: "Closed · scored 8/10", status: "Closed" },
  ],
  events: [
    { title: "Guest Talk: Career in Frontend", meta: "Sat, 11:00 AM · Auditorium", status: "Live" },
    { title: "Batch 20 Demo Day", meta: "Next Wed, 3:00 PM", status: "Pending" },
  ],
};
export interface ProgressTopic {
  title: string;
  done: boolean;
}

export interface ProgressModule {
  title: string;
  completed: number;
  total: number;
  topics: ProgressTopic[];
}

export const progressModules: ProgressModule[] = [
  {
    title: "Web Designing",
    completed: 20,
    total: 20,
    topics: [
      { title: "HTML fundamentals", done: true },
      { title: "CSS layouts and flexbox", done: true },
      { title: "Responsive design", done: true },
    ],
  },
  {
    title: "Front-End Development",
    completed: 27,
    total: 31,
    topics: [
      { title: "JavaScript fundamentals", done: true },
      { title: "DOM manipulation", done: true },
      { title: "Async JS and APIs", done: false },
    ],
  },
  {
    title: "Modern Front-End Development",
    completed: 10,
    total: 14,
    topics: [
      { title: "Next.js App Router fundamentals", done: true },
      { title: "Server and client components", done: true },
      { title: "Data fetching patterns", done: false },
    ],
  },
  {
    title: "Back-End Development",
    completed: 0,
    total: 16,
    topics: [
      { title: "Node.js fundamentals", done: false },
      { title: "REST API design", done: false },
      { title: "Databases and ORMs", done: false },
    ],
  },
];