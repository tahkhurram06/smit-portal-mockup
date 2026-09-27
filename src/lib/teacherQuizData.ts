export type TeacherQuizStatus = "Active" | "Closed";

export interface TeacherQuizRecord {
  title: string;
  courses: string[];
  date: string;
  expiry: string;
  status: TeacherQuizStatus;
}

export const teacherQuizRecords: TeacherQuizRecord[] = [
  {
    title: "Javascript (Quiz-4)",
    courses: ["Modern Web Application Development", "Web and Mobile App Development"],
    date: "Jun 24, 2026",
    expiry: "Jun 24, 2026",
    status: "Active",
  },
  {
    title: "Javascript (Quiz-3)",
    courses: ["Modern Web Application Development", "Web and Mobile App Development"],
    date: "Jun 3, 2026",
    expiry: "Jun 3, 2026",
    status: "Active",
  },
  {
    title: "Javascript (Quiz-2)",
    courses: ["Modern Web Application Development", "Web and Mobile App Development"],
    date: "May 18, 2026",
    expiry: "May 18, 2026",
    status: "Active",
  },
  {
    title: "Javascript (Quiz-1)",
    courses: [
      "Modern Web Application Development",
      "Web and Mobile App Development",
      "JavaScript Crash Course",
      "Full Stack Foundations for Teens",
    ],
    date: "Apr 17, 2026",
    expiry: "Apr 17, 2026",
    status: "Active",
  },
  {
    title: "CSS Quiz",
    courses: [
      "Modern Web Application Development",
      "Web & Mobile Application Development (Female)",
      "Web and Mobile App Development",
      "Techno Kids Course",
      "Front End Development",
      "Back-end Development",
    ],
    date: "Mar 27, 2026",
    expiry: "Mar 27, 2026",
    status: "Active",
  },
  {
    title: "HTML Quiz",
    courses: [
      "Modern Web Application Development",
      "Web & Mobile Application Development (Female)",
      "Web and Mobile App Development",
      "Techno Kids Course",
      "Front End Development",
      "Backend Development",
      "Mobile App Development (React Native)",
    ],
    date: "Jan 7, 2026",
    expiry: "Jan 7, 2026",
    status: "Active",
  },
  {
    title: "HTML Quiz",
    courses: [
      "Modern Web Application Development",
      "Web & Mobile Application Development (Female)",
      "Web and Mobile App Development",
      "Techno Kids Course",
      "Backend Development",
      "Mobile App Development",
    ],
    date: "Jan 5, 2026",
    expiry: "Jan 5, 2026",
    status: "Closed",
  },
];