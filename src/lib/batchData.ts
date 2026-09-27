// Intended path: lib/batchData.ts

export interface BatchData {
  title: string;
  status: "Active" | "Live" | "Completed";
  timeSlots: string[];
  progress: number; // syllabus covered, not attendance
  batch: number;
  students: number;
  campus: string;
  city: string;
  nextClassLabel: string; // "Next class" | "In session" | "Final class"
  nextClassValue: string;
  studentsBelowAttendance: number | null; // null = don't show the risk line (e.g. completed batch)
}

export const activeBatch: BatchData = {
  title: "Modern Web Application Development",
  status: "Active",
  timeSlots: ["Mon 01:00 – 03:00 PM", "Wed 01:00 – 03:00 PM", "Fri 01:00 – 03:00 PM"],
  progress: 73,
  batch: 20,
  students: 42,
  campus: "Zaitoon Ashraf IT Park",
  city: "Karachi",
  nextClassLabel: "Next class",
  nextClassValue: "Wed, Sep 23 · 01:00 – 03:00 PM",
  studentsBelowAttendance: 3,
};

export const teacher = {
  name: "Sara Ahmed",
  initials: "SA",
};