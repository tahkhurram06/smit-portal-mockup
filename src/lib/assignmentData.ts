export type AssignmentStatus =
  | "Approved"
  | "Not Submitted"
  | "Not Approved"
  | "Late Submitted";

export interface AssignmentRecord {
  title: string;
  topics: number;
  dueDate: string;
  status: AssignmentStatus;
}

export const assignmentRecords: AssignmentRecord[] = [
  { title: "Landing Page Assignment", topics: 11, dueDate: "March 6, 2026", status: "Approved" },
  { title: "Grid Assignment no 2", topics: 1, dueDate: "February 16, 2026", status: "Approved" },
  { title: "Grid Assignment no 1", topics: 1, dueDate: "February 16, 2026", status: "Approved" },
  { title: "CSS Figma website", topics: 0, dueDate: "January 23, 2026", status: "Not Submitted" },
  { title: "HTML - Registration Form", topics: 0, dueDate: "December 29, 2025", status: "Not Submitted" },
  { title: "HTML - Links with multiple pages", topics: 0, dueDate: "December 17, 2025", status: "Not Submitted" },
  { title: "Flexbox Portfolio Layout", topics: 3, dueDate: "November 30, 2025", status: "Approved" },
  { title: "JS - Todo List App", topics: 2, dueDate: "April 12, 2026", status: "Not Approved" },
  { title: "CSS Animations Practice", topics: 4, dueDate: "March 28, 2026", status: "Approved" },
  { title: "Responsive Navbar", topics: 1, dueDate: "February 2, 2026", status: "Approved" },
  { title: "API Fetch Weather App", topics: 5, dueDate: "May 4, 2026", status: "Late Submitted" },
  { title: "E-Commerce Website (React js)", topics: 4, dueDate: "August 17, 2026", status: "Late Submitted" },
  { title: "Form Validation Exercise", topics: 2, dueDate: "January 9, 2026", status: "Approved" },
  { title: "Async JS Practice Set", topics: 3, dueDate: "June 21, 2026", status: "Not Approved" },
  { title: "Portfolio Deployment", topics: 0, dueDate: "July 15, 2026", status: "Not Submitted" },
  { title: "Next.js Routing Basics", topics: 2, dueDate: "September 3, 2026", status: "Approved" },
];

// Course-wide assignment totals — same pattern as quizSummary / overallAttendance.
// Stat cards always reflect the whole course, independent of pagination.
export const assignmentSummary = {
  assigned: assignmentRecords.length,
  submitted: assignmentRecords.filter((a) => a.status !== "Not Submitted").length,
  pending: assignmentRecords.filter((a) => a.status === "Not Submitted").length,
};