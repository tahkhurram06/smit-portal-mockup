"use client";

import { useMemo, useState } from "react";
import TeacherDashboardLayout from "@/components/Teacher/Dashboard/Layout/TeacherDashboardLayout";
import StatCard from "@/components/Students/Courses/Dashboard/Overview/StatCard";
import AttendanceDatePicker from "@/components/Teacher/Dashboard/Attendance/AttendanceDatePicker";
import AttendanceTable from "@/components/Teacher/Dashboard/Attendance/AttendanceTable";
import StudentPagination from "@/components/Teacher/Dashboard/Students/StudentPagination";
import {
  attendanceRoster,
  summarizeAttendance,
  AttendanceMarkStatus,
  StudentAttendanceRow,
} from "@/lib/teacherAttendanceData";
import { StatData } from "@/lib/dashboardData";

const PER_PAGE = 9;

export default function TeacherAttendancePage() {
  const [date, setDate] = useState(new Date(2026, 8, 15)); // Sep 15, 2026
  const [records, setRecords] = useState<StudentAttendanceRow[]>(attendanceRoster);
  const [page, setPage] = useState(0);

  function handleMark(rollNumber: string, status: Exclude<AttendanceMarkStatus, null>) {
    setRecords((prev) =>
      prev.map((r) =>
        r.rollNumber === rollNumber ? { ...r, status: r.status === status ? null : status } : r,
      ),
    );
  }

  const summary = useMemo(() => summarizeAttendance(records), [records]);

  const stats: StatData[] = [
    { value: String(summary.total), label: "Total students", icon: "clock" },
    { value: String(summary.present), label: "Present", icon: "check-circle" },
    { value: String(summary.absent), label: "Absent", icon: "x-circle" },
    { value: String(summary.leave), label: "Leave", icon: "minus-circle" },
  ];

  const totalPages = Math.max(1, Math.ceil(records.length / PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const rangeStart = safePage * PER_PAGE;
  const rangeEnd = Math.min(rangeStart + PER_PAGE, records.length);
  const pageRecords = records.slice(rangeStart, rangeEnd);

  return (
    <TeacherDashboardLayout activeKey="attendance">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
        <p className="text-[12.5px] font-medium text-muted">Select a date</p>
        <AttendanceDatePicker
          date={date}
          onChange={(d) => {
            setDate(d);
            setRecords(attendanceRoster); // swap for that date's real roster once wired to an API
            setPage(0);
          }}
        />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
        ))}
      </div>

      <AttendanceTable
        records={pageRecords}
        onMark={handleMark}
        delay={0.3}
        footer={
          <StudentPagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            rangeStart={records.length === 0 ? 0 : rangeStart + 1}
            rangeEnd={rangeEnd}
            total={records.length}
          />
        }
      />
    </TeacherDashboardLayout>
  );
}