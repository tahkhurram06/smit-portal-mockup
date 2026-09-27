"use client";

import { useState } from "react";
import DashboardLayout from "@/components/Students/Courses/Dashboard/Layout/DashboardLayout";
import StatCard from "@/components/Students/Courses/Dashboard/Overview/StatCard";
import AssignmentTable from "@/components/Students/Courses/Dashboard/Assignment/AssignmentTable";
import Pagination from "@/components/Students/Courses/Dashboard/Assignment/Pagination";
import { activeCourse, StatData } from "@/lib/dashboardData";
import { assignmentRecords, assignmentSummary } from "@/lib/assignmentData";

const PER_PAGE = 6;

export default function AssignmentPage() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(assignmentRecords.length / PER_PAGE);
  const rangeStart = page * PER_PAGE;
  const rangeEnd = Math.min(rangeStart + PER_PAGE, assignmentRecords.length);
  const pageRecords = assignmentRecords.slice(rangeStart, rangeEnd);

  const stats: StatData[] = [
    {
      value: String(assignmentSummary.assigned),
      label: "Assigned",
      icon: "cap",
    },
    {
      value: String(assignmentSummary.submitted),
      label: "Submitted",
      icon: "check-circle",
    },
    {
      value: String(assignmentSummary.pending),
      label: "Pending",
      icon: "clock",
    },
  ];

  return (
    <DashboardLayout
      activeHref="/dashboard/assignment"
      courseTitle={activeCourse.title}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
        ))}
      </div>

      <div className="mt-5 sm:mt-6">
        <AssignmentTable
          records={pageRecords}
          delay={0.3}
          footer={
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              rangeStart={rangeStart + 1}
              rangeEnd={rangeEnd}
              total={assignmentRecords.length}
            />
          }
        />
      </div>
    </DashboardLayout>
  );
}
