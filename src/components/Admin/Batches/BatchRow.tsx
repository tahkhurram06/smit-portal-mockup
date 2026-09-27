"use client";

import { Batch } from "@/lib/adminBatchData";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import Pagination from "@/components/Students/Courses/Dashboard/Assignment/Pagination";
import BatchStudentRow from "./BatchStudentRow";

const PER_PAGE = 5;

interface BatchRowProps {
  batch: Batch;
  open: boolean;
  onToggle: () => void;
  page: number;
  onPageChange: (page: number) => void;
  delay?: number;
}

export default function BatchRow({
  batch,
  open,
  onToggle,
  page,
  onPageChange,
  delay = 0,
}: BatchRowProps) {
  const totalPages = Math.max(1, Math.ceil(batch.students.length / PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const rangeStart = safePage * PER_PAGE;
  const rangeEnd = Math.min(rangeStart + PER_PAGE, batch.students.length);
  const pageStudents = batch.students.slice(rangeStart, rangeEnd);

  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] border-t border-ov/[0.07] first:border-t-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-start gap-3 p-4 text-left outline-none transition-colors duration-200 hover:bg-ov/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2 sm:p-5"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:text-strong ${
            open ? "rotate-90" : ""
          }`}
        >
          <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="min-w-0 flex-1">
          <p className="truncate font-fraunces text-[15px] font-semibold text-strong sm:text-base">
            {batch.title}
          </p>
          <p className="mt-1 truncate text-[12px] text-muted">
            Batch {batch.batchNumber} · {batch.teacher} · {batch.students.length} students
          </p>
          <div className="mt-2.5 max-w-[220px]">
            <ProgressBar value={batch.progress} label="Progress" />
          </div>
        </div>

        <StatusBadge status={batch.status} />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-ov/[0.07] px-4 pb-4 pl-[46px] pt-1 sm:px-5 sm:pl-[54px]">
            {batch.students.length === 0 ? (
              <p className="py-4 text-[12.5px] text-dim">No students enrolled in this batch yet.</p>
            ) : (
              <>
                <div className="flex flex-col divide-y divide-ov/[0.06]">
                  {pageStudents.map((student, i) => (
                    <BatchStudentRow
                      key={student.roll}
                      student={student}
                      delay={open ? 0.04 + i * 0.04 : 0}
                    />
                  ))}
                </div>

                <div className="mt-1">
                  <Pagination
                    page={safePage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    rangeStart={rangeStart + 1}
                    rangeEnd={rangeEnd}
                    total={batch.students.length}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}