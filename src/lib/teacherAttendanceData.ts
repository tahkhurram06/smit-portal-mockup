export type AttendanceMarkStatus = "Present" | "Absent" | "Leave" | null; // null = Not Marked

export interface StudentAttendanceRow {
  rollNumber: string;
  name: string;
  status: AttendanceMarkStatus;
}

// Mock roster for the selected class date, unmarked by default — matches
// the "Not Marked" starting state in the real LMS screenshot. In production
// this would be fetched per date instead of being a static list.
// Mock roster for the selected class date. Most students are pre-marked
// (like a class the teacher already took attendance for), a few are left
// unmarked so the "Not Marked" state and the mark buttons are still visible.
// In production this would be fetched per date instead of being static.
export const attendanceRoster: StudentAttendanceRow[] = [
  { rollNumber: "494501", name: "S Muzammil Javed", status: "Present" },
  { rollNumber: "494502", name: "Ayesha Noor", status: "Present" },
  { rollNumber: "494503", name: "Bilal Hassan", status: "Absent" },
  { rollNumber: "494504", name: "Fatima Sheikh", status: "Present" },
  { rollNumber: "494505", name: "Hamza Tariq", status: "Present" },
  { rollNumber: "494506", name: "Zainab Iqbal", status: "Leave" },
  { rollNumber: "494507", name: "Usman Farooq", status: "Present" },
  { rollNumber: "494508", name: "Mahnoor Khan", status: "Present" },
  { rollNumber: "494509", name: "Abdul Wadood", status: null },
  { rollNumber: "494510", name: "Sana Malik", status: "Present" },
  { rollNumber: "494511", name: "Ahmed Raza", status: "Absent" },
  { rollNumber: "494512", name: "Hira Aslam", status: "Present" },
  { rollNumber: "494513", name: "Talha Siddiqui", status: "Present" },
  { rollNumber: "494514", name: "Noor Fatima", status: null },
  { rollNumber: "494515", name: "Waqas Ahmed", status: "Present" },
  { rollNumber: "494516", name: "Iqra Yousuf", status: "Present" },
  { rollNumber: "494517", name: "Danish Ali", status: "Leave" },
  { rollNumber: "494518", name: "Kiran Shahid", status: "Present" },
  { rollNumber: "494519", name: "Saad Jamil", status: "Present" },
  { rollNumber: "494520", name: "Areeba Khalid", status: null },
  { rollNumber: "494521", name: "Rehan Qureshi", status: "Present" },
  { rollNumber: "494522", name: "Amna Rashid", status: "Present" },
  { rollNumber: "494523", name: "Faizan Anwar", status: "Absent" },
  { rollNumber: "494524", name: "Laiba Hassan", status: "Present" },
];

export function summarizeAttendance(rows: StudentAttendanceRow[]) {
  return {
    total: rows.length,
    present: rows.filter((r) => r.status === "Present").length,
    absent: rows.filter((r) => r.status === "Absent").length,
    leave: rows.filter((r) => r.status === "Leave").length,
  };
}