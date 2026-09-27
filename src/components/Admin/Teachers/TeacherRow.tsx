"use client";

import { Teacher, initials } from "@/lib/adminTeacherData";
import TeacherBatchRow from "./TeacherBatchRow";

interface TeacherRowProps {
  teacher: Teacher;
  open: boolean;
  onToggle: () => void;
  delay?: number;
}

export default function TeacherRow({ teacher, open, onToggle, delay = 0 }: TeacherRowProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] border-t border-ov/[0.07] first:border-t-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center gap-3 p-4 text-left outline-none transition-colors duration-200 hover:bg-ov/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2 sm:p-5"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:text-strong ${
            open ? "rotate-90" : ""
          }`}
        >
          <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[12px] font-bold text-[#0A0A12] transition-transform duration-200 group-hover:scale-105">
          {initials(teacher.name)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-medium text-strong sm:text-sm">{teacher.name}</p>
          <p className="mt-0.5 truncate text-[12px] text-muted">
            {teacher.email} · {teacher.campus}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#8B6BFF]/25 bg-[#8B6BFF]/[0.1] px-2.5 py-1 text-[11px] font-semibold text-purple-soft">
          {teacher.batches.length} batch{teacher.batches.length > 1 ? "es" : ""}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col divide-y divide-ov/[0.06] border-t border-ov/[0.07] px-4 pb-4 pl-[46px] pt-1 sm:px-5 sm:pl-[58px]">
            {teacher.batches.map((batch, i) => (
              <TeacherBatchRow key={batch.title} batch={batch} delay={open ? 0.04 + i * 0.05 : 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}