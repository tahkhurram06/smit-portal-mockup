"use client";

import { useMemo, useState } from "react";
import TeacherDashboardLayout from "@/components/Teacher/Dashboard/Layout/TeacherDashboardLayout";
import StudentSearchBar from "@/components/Teacher/Dashboard/Students/StudentSearchBar";
import StudentTable from "@/components/Teacher/Dashboard/Students/StudentTable";
import StudentPagination from "@/components/Teacher/Dashboard/Students/StudentPagination";
import { studentRecords } from "@/lib/studentData";

const PER_PAGE = 10;

export default function TeacherStudentsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    return studentRecords.filter((s) => {
      const matchesFilter = filter === "all" || s.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.rollNumber.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const rangeStart = safePage * PER_PAGE;
  const rangeEnd = Math.min(rangeStart + PER_PAGE, filtered.length);
  const pageRecords = filtered.slice(rangeStart, rangeEnd);

  return (
    <TeacherDashboardLayout activeKey="students">
      <StudentSearchBar
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setPage(0);
        }}
        filter={filter}
        onFilterChange={(v) => {
          setFilter(v);
          setPage(0);
        }}
      />

      <StudentTable
        records={pageRecords}
        delay={0.1}
        footer={
          <StudentPagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            rangeStart={filtered.length === 0 ? 0 : rangeStart + 1}
            rangeEnd={rangeEnd}
            total={filtered.length}
          />
        }
      />
    </TeacherDashboardLayout>
  );
}