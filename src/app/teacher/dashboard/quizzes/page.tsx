"use client";

import { useState } from "react";
import TeacherDashboardLayout from "@/components/Teacher/Dashboard/Layout/TeacherDashboardLayout";
import QuizTable from "@/components/Teacher/Dashboard/Quizzes/QuizTable";
import StudentPagination from "@/components/Teacher/Dashboard/Students/StudentPagination";
import GradientButton from "@/components/ui/GradientButton";
import { teacherQuizRecords } from "@/lib/teacherQuizData";

const PER_PAGE = 6;

export default function TeacherQuizzesPage() {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(teacherQuizRecords.length / PER_PAGE));
  const rangeStart = page * PER_PAGE;
  const rangeEnd = Math.min(rangeStart + PER_PAGE, teacherQuizRecords.length);
  const pageRecords = teacherQuizRecords.slice(rangeStart, rangeEnd);

  return (
    <TeacherDashboardLayout activeKey="quizzes">
      <div className="mb-4 flex justify-end">
        <GradientButton>
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M12 5v14M5 12h14" stroke="#0A0A12" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          New Quiz
        </GradientButton>
      </div>

      <QuizTable
        records={pageRecords}
        delay={0.1}
        footer={
          <StudentPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            rangeStart={rangeStart + 1}
            rangeEnd={rangeEnd}
            total={teacherQuizRecords.length}
          />
        }
      />
    </TeacherDashboardLayout>
  );
}