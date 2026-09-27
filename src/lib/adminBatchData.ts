export type BatchStatus = "Active" | "Live" | "Completed";
export type BatchStudentStatus = "Enrolled" | "Freezed";

export interface BatchStudent {
  name: string;
  roll: number;
  status: BatchStudentStatus;
}

export interface Batch {
  title: string;
  batchNumber: number;
  teacher: string;
  campus: string;
  status: BatchStatus;
  progress: number;
  students: BatchStudent[];
}

const FIRST_NAMES = [
  "Ayesha", "Bilal", "Hira", "Usman", "Zain", "Sana", "Hamza", "Maryam", "Daniyal", "Fatima",
];
const LAST_NAMES = ["Khan", "Ahmed", "Fatima", "Tariq", "Ali", "Raza", "Sheikh", "Malik"];

/** Deterministic mock roster so every reload shows the same names/roll numbers. */
function makeStudents(seed: number, count: number): BatchStudent[] {
  const list: BatchStudent[] = [];
  for (let i = 0; i < count; i++) {
    const name = `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 3 + seed) % LAST_NAMES.length]}`;
    list.push({
      name,
      roll: 494500 + seed * 100 + i,
      status: i % 13 === 6 ? "Freezed" : "Enrolled",
    });
  }
  return list;
}

export const batches: Batch[] = [
  {
    title: "Modern Web Application Development",
    batchNumber: 20,
    teacher: "Sara Ahmed",
    campus: "Zaitoon Ashraf IT Park",
    status: "Active",
    progress: 73,
    students: makeStudents(0, 57),
  },
  {
    title: "Data Science Fundamentals",
    batchNumber: 21,
    teacher: "Omar Siddiqui",
    campus: "Numaish Campus",
    status: "Active",
    progress: 58,
    students: makeStudents(1, 34),
  },
  {
    title: "Mobile App Development (React Native)",
    batchNumber: 19,
    teacher: "Hina Raza",
    campus: "Gulshan Campus",
    status: "Live",
    progress: 91,
    students: makeStudents(2, 41),
  },
  {
    title: "UI/UX Design Bootcamp",
    batchNumber: 18,
    teacher: "Bilal Qureshi",
    campus: "Zaitoon Ashraf IT Park",
    status: "Completed",
    progress: 100,
    students: makeStudents(3, 29),
  },
  {
    title: "Full Stack Foundations for Teens",
    batchNumber: 22,
    teacher: "Sara Ahmed",
    campus: "Zaitoon Ashraf IT Park",
    status: "Active",
    progress: 40,
    students: makeStudents(4, 22),
  },
];

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}