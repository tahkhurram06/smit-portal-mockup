"use client";

import { useState } from "react";
import TeacherDashboardLayout from "@/components/Teacher/Dashboard/Layout/TeacherDashboardLayout";
import StudentProgressSelector from "@/components/Teacher/Dashboard/Progress/StudentProgressSelector";
import StudentProgressHeader from "@/components/Teacher/Dashboard/Progress/StudentProgressHeader";
import ProgressModuleCard from "@/components/Students/Courses/Dashboard/Progress/ProgressModuleCard";
import { studentProgressRecords } from "@/lib/teacherProgressData";

export default function TeacherProgressPage() {
  const [rollNumber, setRollNumber] = useState(studentProgressRecords[0].rollNumber);
  const student = studentProgressRecords.find((s) => s.rollNumber === rollNumber)!;

  return (
    <TeacherDashboardLayout activeKey="progress">
      <div className="mb-5 sm:mb-6">
        <StudentProgressSelector
          students={studentProgressRecords}
          value={rollNumber}
          onChange={setRollNumber}
        />
      </div>

      <StudentProgressHeader student={student} delay={0.1} />

      <div className="mt-5 flex flex-col gap-3 sm:mt-6">
        {student.modules.map((module, i) => (
          <ProgressModuleCard key={module.title} module={module} delay={0.2 + i * 0.08} />
        ))}
      </div>
    </TeacherDashboardLayout>
  );
}