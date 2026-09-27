// Intended path: components/Teacher/Batches/BatchCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { BatchData } from "@/lib/batchData";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";

interface BatchCardProps {
  batch: BatchData;
  delay?: number;
}

function TimeSlotPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-ov/[0.1] bg-ov/[0.04] px-2.5 py-1.5 text-[11.5px] text-muted transition-colors duration-200 hover:border-ov/[0.2] hover:text-strong">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-3 w-3 shrink-0 text-teal"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7v5l3.5 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </span>
  );
}

export default function BatchCard({ batch, delay = 0 }: BatchCardProps) {
  const router = useRouter();
  const isCompleted = batch.status === "Completed";

  return (
    <div
      className="group relative animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-[20px] border border-ov/[0.1] bg-card-hi shadow-card p-5 backdrop-blur-xl transition-all duration-300 hover:border-ov/[0.18] hover:shadow-[0_20px_50px_-20px_rgba(139,107,255,0.4)] sm:p-6"
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className={`absolute inset-y-0 left-0 w-1 ${
          isCompleted
            ? "bg-ov/[0.2]"
            : "bg-gradient-to-b from-[#3FE6D6] to-[#8B6BFF]"
        }`}
        aria-hidden="true"
      />

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="mb-2 font-fraunces text-lg font-semibold leading-snug text-strong sm:text-xl">
            {batch.title}
          </h3>
          <span
            className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide ${
              batch.status === "Live"
                ? "border-[#FF57A8]/40 text-pink bg-[#FF57A8]/[0.08] motion-safe:animate-[pulseSoft_2s_ease-in-out_infinite]"
                : batch.status === "Active"
                  ? "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]"
                  : "border-ov/[0.15] text-muted bg-ov/[0.04]"
            }`}
          >
            {batch.status}
          </span>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8B6BFF]/[0.12]">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-purple">
            <path
              d="m8 6 6 6-6 6M4 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {batch.timeSlots.map((slot) => (
          <TimeSlotPill key={slot} label={slot} />
        ))}
      </div>

      <div className="mb-5">
        <ProgressBar value={batch.progress} label="Syllabus covered" />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ov/[0.08] pt-4 text-[12.5px] sm:grid-cols-4">
        <div className="text-muted">
          Batch: <span className="font-medium text-strong">{batch.batch}</span>
        </div>
        <div className="text-muted">
          Students:{" "}
          <span className="font-medium text-strong">{batch.students}</span>
        </div>
        <div className="col-span-2 text-muted sm:col-span-1">
          Campus: <span className="font-medium text-teal">{batch.campus}</span>
        </div>
        <div className="text-muted">
          City: <span className="font-medium text-strong">{batch.city}</span>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-[11px] border border-ov/[0.08] bg-ov/[0.03] px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 shrink-0 text-teal"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M12 7v5l3.5 2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="min-w-0">
            <span className="block text-[10.5px] font-medium uppercase tracking-wide text-dim">
              {batch.nextClassLabel}
            </span>
            <span className="block truncate text-[13px] font-medium text-strong">
              {batch.nextClassValue}
            </span>
          </span>
        </div>
        {batch.studentsBelowAttendance !== null && (
          <span
            className={`text-[12px] font-medium ${
              batch.studentsBelowAttendance > 0 ? "text-amber" : "text-teal"
            }`}
          >
            {batch.studentsBelowAttendance > 0
              ? `${batch.studentsBelowAttendance} student${batch.studentsBelowAttendance > 1 ? "s" : ""} below 75% attendance`
              : "All above 75% attendance"}
          </span>
        )}
      </div>

      {isCompleted ? (
        <button
          type="button"
          onClick={() => router.push("/teacher/dashboard")}
          className="w-full cursor-pointer rounded-[12px] border border-ov/[0.13] bg-ov/[0.04] px-4 py-3 font-sora text-sm font-semibold text-muted transition-all duration-200 hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong active:scale-[0.98]"
        >
          View batch
        </button>
      ) : (
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push("/teacher/dashboard")}
            className="flex-1 cursor-pointer rounded-[12px] bg-[length:220%_auto] bg-[position:0%_center] px-4 py-3 font-sora text-sm font-semibold text-[#0A0A12] shadow-[0_12px_30px_-12px_rgba(139,107,255,0.55)] transition-[background-position,box-shadow,transform] duration-500 hover:bg-[position:100%_center] hover:shadow-[0_14px_34px_-10px_rgba(139,107,255,0.7)] active:translate-y-px active:scale-[0.994] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
            style={{
              backgroundImage:
                "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
            }}
          >
            Open batch
          </button>
          <button
            type="button"
            onClick={() => router.push("/teacher/dashboard/attendance")}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-ov/[0.13] bg-ov/[0.04] px-4 py-3 font-sora text-[13px] font-semibold text-muted transition-all duration-200 hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]">
              <rect
                x="4"
                y="5"
                width="16"
                height="15"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M4 9h16M9 3v4M15 3v4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="m8.5 14 2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Take attendance
          </button>
        </div>
      )}
    </div>
  );
}
