export type QuizStatus = "Passed" | "Failed";

export interface QuizRecord {
  title: string;
  module: string;
  questions: number;
  attemptsUsed: number;
  attemptsAllowed: number;
  percentage: number;
  status: QuizStatus;
  note: string;
}

export const quizRecords: QuizRecord[] = [
  {
    title: "Javascript (Quiz-4)",
    module: "Modern Front-End Development",
    questions: 40,
    attemptsUsed: 1,
    attemptsAllowed: 3,
    percentage: 88,
    status: "Passed",
    note: "—",
  },
  {
    title: "Javascript (Quiz-3)",
    module: "Modern Front-End Development",
    questions: 40,
    attemptsUsed: 1,
    attemptsAllowed: 3,
    percentage: 78,
    status: "Passed",
    note: "—",
  },
  {
    title: "Javascript (Quiz-2)",
    module: "Modern Front-End Development",
    questions: 40,
    attemptsUsed: 1,
    attemptsAllowed: 3,
    percentage: 90,
    status: "Passed",
    note: "—",
  },
  {
    title: "Javascript (Quiz-1)",
    module: "Modern Front-End Development",
    questions: 40,
    attemptsUsed: 1,
    attemptsAllowed: 3,
    percentage: 95,
    status: "Passed",
    note: "—",
  },
  {
    title: "CSS Quiz",
    module: "Front-End Development",
    questions: 40,
    attemptsUsed: 2,
    attemptsAllowed: 3,
    percentage: 65,
    status: "Failed",
    note: "—",
  },
  {
    title: "HTML Quiz",
    module: "Web Designing",
    questions: 40,
    attemptsUsed: 1,
    attemptsAllowed: 3,
    percentage: 75,
    status: "Passed",
    note: "—",
  },
];

// Course-wide quiz totals — same pattern as overallAttendance in
// attendanceData.ts. Stat cards always reflect all quizzes to date.
export const quizSummary = {
  total: quizRecords.length,
  passed: quizRecords.filter((q) => q.status === "Passed").length,
  failed: quizRecords.filter((q) => q.status === "Failed").length,
  averagePercentage: Math.round(
    quizRecords.reduce((sum, q) => sum + q.percentage, 0) / quizRecords.length,
  ),
};