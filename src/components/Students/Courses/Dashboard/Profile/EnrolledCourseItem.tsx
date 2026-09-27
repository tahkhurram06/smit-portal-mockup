import Link from "next/link";
import { CourseData } from "@/lib/dashboardData";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";

interface EnrolledCourseItemProps {
  course: CourseData;
  /** Where the row goes when clicked. Defaults to the course dashboard. */
  href?: string;
}

export default function EnrolledCourseItem({
  course,
  href = "/dashboard",
}: EnrolledCourseItemProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-ov/[0.08] bg-ov/[0.03] p-4 pl-5 outline-none transition-all duration-200 hover:border-ov/[0.18] hover:bg-ov/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
    >
      <span
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#3FE6D6] to-[#8B6BFF]"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <div className="min-w-0">
          <p className="font-fraunces text-base font-semibold leading-snug text-strong">
            {course.title}
          </p>
          <p className="mt-1 text-[12.5px] text-muted">
            Batch <span className="font-medium text-strong">{course.batch}</span> · Roll{" "}
            <span className="font-medium text-teal">{course.roll}</span> · {course.city}
          </p>
        </div>
        <StatusBadge status={course.status} />
      </div>

      <div className="mt-4">
        <ProgressBar value={course.progress} label="Progress" />
      </div>
    </Link>
  );
}