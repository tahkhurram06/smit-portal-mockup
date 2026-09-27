import { ProgressModule } from "@/lib/dashboardData";

export interface StudentProgressRecord {
  rollNumber: string;
  name: string;
  campus: string;
  batch: number;
  timeSlots: string[];
  modules: ProgressModule[];
}

export const studentProgressRecords: StudentProgressRecord[] = [
  {
    rollNumber: "494501",
    name: "S Muzammil Javed",
    campus: "Zaitoon Ashraf IT Park",
    batch: 20,
    timeSlots: ["Mon 01:00 – 03:00 PM", "Wed 01:00 – 03:00 PM", "Fri 01:00 – 03:00 PM"],
    modules: [
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
        completed: 26,
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
    ],
  },
  {
    rollNumber: "494502",
    name: "Ayesha Noor",
    campus: "Zaitoon Ashraf IT Park",
    batch: 20,
    timeSlots: ["Mon 01:00 – 03:00 PM", "Wed 01:00 – 03:00 PM", "Fri 01:00 – 03:00 PM"],
    modules: [
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
        completed: 31,
        total: 31,
        topics: [
          { title: "JavaScript fundamentals", done: true },
          { title: "DOM manipulation", done: true },
          { title: "Async JS and APIs", done: true },
        ],
      },
      {
        title: "Modern Front-End Development",
        completed: 14,
        total: 14,
        topics: [
          { title: "Next.js App Router fundamentals", done: true },
          { title: "Server and client components", done: true },
          { title: "Data fetching patterns", done: true },
        ],
      },
      {
        title: "Back-End Development",
        completed: 5,
        total: 16,
        topics: [
          { title: "Node.js fundamentals", done: true },
          { title: "REST API design", done: false },
          { title: "Databases and ORMs", done: false },
        ],
      },
    ],
  },
  {
    rollNumber: "494503",
    name: "Bilal Hassan",
    campus: "Zaitoon Ashraf IT Park",
    batch: 20,
    timeSlots: ["Mon 01:00 – 03:00 PM", "Wed 01:00 – 03:00 PM", "Fri 01:00 – 03:00 PM"],
    modules: [
      {
        title: "Web Designing",
        completed: 17,
        total: 20,
        topics: [
          { title: "HTML fundamentals", done: true },
          { title: "CSS layouts and flexbox", done: true },
          { title: "Responsive design", done: false },
        ],
      },
      {
        title: "Front-End Development",
        completed: 12,
        total: 31,
        topics: [
          { title: "JavaScript fundamentals", done: true },
          { title: "DOM manipulation", done: false },
          { title: "Async JS and APIs", done: false },
        ],
      },
      {
        title: "Modern Front-End Development",
        completed: 0,
        total: 14,
        topics: [
          { title: "Next.js App Router fundamentals", done: false },
          { title: "Server and client components", done: false },
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
    ],
  },
  {
    rollNumber: "494504",
    name: "Fatima Sheikh",
    campus: "Zaitoon Ashraf IT Park",
    batch: 20,
    timeSlots: ["Mon 01:00 – 03:00 PM", "Wed 01:00 – 03:00 PM", "Fri 01:00 – 03:00 PM"],
    modules: [
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
        completed: 20,
        total: 31,
        topics: [
          { title: "JavaScript fundamentals", done: true },
          { title: "DOM manipulation", done: true },
          { title: "Async JS and APIs", done: false },
        ],
      },
      {
        title: "Modern Front-End Development",
        completed: 4,
        total: 14,
        topics: [
          { title: "Next.js App Router fundamentals", done: true },
          { title: "Server and client components", done: false },
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
    ],
  },
];

export function overallPercent(modules: ProgressModule[]): number {
  const totals = modules.reduce(
    (acc, m) => ({ completed: acc.completed + m.completed, total: acc.total + m.total }),
    { completed: 0, total: 0 },
  );
  return totals.total === 0 ? 0 : Math.round((totals.completed / totals.total) * 100);
}

export function totalTopics(modules: ProgressModule[]) {
  return modules.reduce(
    (acc, m) => ({ completed: acc.completed + m.completed, total: acc.total + m.total }),
    { completed: 0, total: 0 },
  );
}