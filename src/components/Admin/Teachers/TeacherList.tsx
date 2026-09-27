"use client";

import { useState } from "react";
import { teachers } from "@/lib/adminTeacherData";
import TeacherRow from "./TeacherRow";

export default function TeacherList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]">
      {teachers.map((teacher, i) => (
        <TeacherRow
          key={teacher.name}
          teacher={teacher}
          open={openIndex === i}
          onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
          delay={0.06 + i * 0.05}
        />
      ))}
    </div>
  );
}