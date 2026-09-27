"use client";

import { useRouter } from "next/navigation";
import { CourseData } from "@/lib/dashboardData";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";

interface CourseCardProps {
  course: CourseData;
  delay?: number;
}

export default function CourseCard({ course, delay = 0 }: CourseCardProps) {
  const router = useRouter();

  return (
    <div
      className="group relative animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-[20px] border border-ov/[0.1] bg-card-hi shadow-card p-5 backdrop-blur-xl transition-all duration-300 hover:border-ov/[0.18] hover:shadow-[0_20px_50px_-20px_rgba(139,107,255,0.4)] sm:p-6"
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#3FE6D6] to-[#8B6BFF]"
        aria-hidden="true"
      />

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="mb-2 font-fraunces text-lg font-semibold leading-snug text-strong sm:text-xl">
            {course.title}
          </h3>
          <StatusBadge status={course.status} />
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8B6BFF]/[0.12]">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-purple">
            <path d="m8 6 6 6-6 6M4 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mb-5">
        <ProgressBar value={course.progress} label="Progress" />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ov/[0.08] pt-4 text-[12.5px] sm:grid-cols-4">
        <div className="text-muted">
          Batch: <span className="font-medium text-strong">{course.batch}</span>
        </div>
        <div className="text-muted">
          Roll: <span className="font-medium text-teal">{course.roll}</span>
        </div>
        <div className="col-span-2 text-muted sm:col-span-1">
          Campus: <span className="font-medium text-teal">{course.campus}</span>
        </div>
        <div className="text-muted">
          City: <span className="font-medium text-strong">{course.city}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="w-full cursor-pointer rounded-[12px] bg-[length:220%_auto] bg-[position:0%_center] px-4 py-3 font-sora text-sm font-semibold text-[#0A0A12] shadow-[0_12px_30px_-12px_rgba(139,107,255,0.55)] transition-[background-position,box-shadow,transform] duration-500 hover:bg-[position:100%_center] hover:shadow-[0_14px_34px_-10px_rgba(139,107,255,0.7)] active:translate-y-px active:scale-[0.994] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
        style={{
          backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
        }}
      >
        View details
      </button>
    </div>
  );
}