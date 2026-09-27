import DashboardLayout from "@/components/Students/Courses/Dashboard/Layout/DashboardLayout";
import StatCard from "@/components/Students/Courses/Dashboard/Overview/StatCard";
import ScheduleCard from "@/components/Students/Courses/Dashboard/Overview/ScheduleCard";
import UpcomingPanel from "@/components/Students/Courses/Dashboard/Overview/UpcomingPanel";
import ActiveCourseCard from "@/components/Students/Courses/Dashboard/Overview/ActiveCourseCard";
import FeeTable from "@/components/Students/Courses/Dashboard/Overview/FeeTable";
import { stats, activeCourse } from "@/lib/dashboardData";

export default function DashboardPage() {
  return (
    <DashboardLayout activeHref="/dashboard" courseTitle={activeCourse.title}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-6">
        {/* main column */}
        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
            ))}
          </div>

          <div className="mt-5 sm:mt-6">
            <p
              className="mb-3 animate-[fadeUp_0.5s_ease_both] text-[12.5px] font-medium uppercase tracking-wide text-muted"
              style={{ animationDelay: "0.24s" }}
            >
              Active course
            </p>
            <ActiveCourseCard course={activeCourse} delay={0.28} />
          </div>

          <div className="mt-5 sm:mt-6">
            <p
              className="mb-3 animate-[fadeUp_0.5s_ease_both] text-[12.5px] font-medium uppercase tracking-wide text-muted"
              style={{ animationDelay: "0.36s" }}
            >
              Fee
            </p>
            <FeeTable delay={0.4} />
          </div>
        </div>

        {/* side column */}
        <div className="flex flex-col gap-4">
          <ScheduleCard delay={0.16} />
          <UpcomingPanel delay={0.22} />
        </div>
      </div>
    </DashboardLayout>
  );
}
