import { batches, Batch } from "@/lib/adminBatchData";

export interface TeacherBatch {
  title: string;
  batchNumber: number;
  status: Batch["status"];
  studentCount: number;
}

export interface Teacher {
  name: string;
  email: string;
  campus: string;
  batches: TeacherBatch[];
}

function emailFor(name: string): string {
  return `${name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

// Grouped from the same `batches` array the Batches page uses — a teacher's
// batch count and campus come from there, so the two pages can't disagree.
export const teachers: Teacher[] = (() => {
  const byName = new Map<string, Teacher>();

  batches.forEach((b) => {
    const entry: TeacherBatch = {
      title: b.title,
      batchNumber: b.batchNumber,
      status: b.status,
      studentCount: b.students.length,
    };

    const existing = byName.get(b.teacher);
    if (existing) {
      existing.batches.push(entry);
    } else {
      byName.set(b.teacher, {
        name: b.teacher,
        email: emailFor(b.teacher),
        campus: b.campus,
        batches: [entry],
      });
    }
  });

  return Array.from(byName.values());
})();