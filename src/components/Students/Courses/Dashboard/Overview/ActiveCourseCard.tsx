import { CourseData } from "@/lib/dashboardData";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import TimeSlotPill from "./TimeSlotPill";

interface ActiveCourseCardProps {
  course: CourseData;
  delay?: number;
}

export default function ActiveCourseCard({ course, delay = 0 }: ActiveCourseCardProps) {
  return (
    <div
      className="group relative animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card-hi shadow-card p-5 backdrop-blur-xl transition-all duration-300 hover:border-ov/[0.18] hover:bg-card-hover hover:shadow-[0_20px_50px_-20px_rgba(139,107,255,0.4)] sm:p-6"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* sheen sweep on hover */}
      <div className="pointer-events-none absolute left-[-60%] top-0 h-full w-2/5 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-safe:group-hover:animate-[sweep_1.4s_ease-in-out]" />

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-fraunces text-lg font-semibold leading-snug text-strong sm:text-xl">
          {course.title}
        </h3>
        <StatusBadge status={course.status} />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {course.timeSlots.map((slot) => (
          <TimeSlotPill key={slot} label={slot} />
        ))}
      </div>

      <div className="mb-5">
        <ProgressBar value={course.progress} label="Progress" />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ov/[0.08] pt-4 text-[12.5px] sm:grid-cols-4">
        <div className="flex items-center gap-1.5 text-muted">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-purple">
            <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Batch: <span className="font-medium text-strong">{course.batch}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-purple">
            <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          Roll: <span className="font-medium text-teal">{course.roll}</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5 text-muted sm:col-span-1">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-purple">
            <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          Campus: <span className="font-medium text-teal">{course.campus}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-purple">
            <path d="M3 11l9-8 9 8M5 10v10h14V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          City: <span className="font-medium text-strong">{course.city}</span>
        </div>
      </div>
    </div>
  );
}