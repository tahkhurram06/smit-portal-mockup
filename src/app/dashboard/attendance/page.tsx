"use client";

import { useState } from "react";
import DashboardLayout from "@/components/Students/Courses/Dashboard/Layout/DashboardLayout";
import StatCard from "@/components/Students/Courses/Dashboard/Overview/StatCard";
import AttendanceOverviewCard from "@/components/Students/Courses/Dashboard/Attendance/AttendanceOverviewCard";
import AttendanceTable from "@/components/Students/Courses/Dashboard/Attendance/AttendanceTable";
import MonthDropdown from "@/components/ui/MonthDropdown";
import { activeCourse, StatData } from "@/lib/dashboardData";
import {
  attendanceMonths,
  attendanceByMonth,
  defaultAttendanceMonth,
  overallAttendance,
} from "@/lib/attendanceData";

export default function AttendancePage() {
  // The dropdown only controls which month's classes show in the table.
  // The stat cards and the overview card always reflect the whole course
  // to date, same as the "144 total classes" summary on the reference design.
  const [month, setMonth] = useState(defaultAttendanceMonth);
  const monthData = attendanceByMonth[month];

  const stats: StatData[] = [
    {
      value: String(overallAttendance.totalClasses),
      label: "Total classes",
      icon: "calendar",
    },
    {
      value: String(overallAttendance.present),
      label: "Present",
      icon: "check-circle",
    },
    {
      value: String(overallAttendance.leave),
      label: "Leave",
      icon: "minus-circle",
    },
    {
      value: String(overallAttendance.absent),
      label: "Absent",
      icon: "x-circle",
    },
  ];

  return (
    <DashboardLayout
      activeHref="/dashboard/attendance"
      courseTitle={activeCourse.title}
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
        ))}
      </div>

      <div className="mt-5 sm:mt-6">
        <AttendanceOverviewCard data={overallAttendance} delay={0.32} />
      </div>

      <div className="mt-5 sm:mt-6">
        <div
          className="relative z-20 mb-3 flex animate-[fadeUp_0.5s_ease_both] justify-end"
          style={{ animationDelay: "0.36s" }}
        >
          <MonthDropdown
            months={attendanceMonths}
            value={month}
            onChange={setMonth}
          />
        </div>
        <AttendanceTable records={monthData.records} delay={0.4} />
      </div>
    </DashboardLayout>
  );
}
