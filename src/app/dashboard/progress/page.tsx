import DashboardLayout from "@/components/Students/Courses/Dashboard/Layout/DashboardLayout";
import StatCard from "@/components/Students/Courses/Dashboard/Overview/StatCard";
import ProgressModuleCard from "@/components/Students/Courses/Dashboard/Progress/ProgressModuleCard";
import { progressModules, activeCourse } from "@/lib/dashboardData";

export default function ProgressPage() {
  const totalTopics = progressModules.reduce((sum, m) => sum + m.total, 0);
  const completedTopics = progressModules.reduce(
    (sum, m) => sum + m.completed,
    0,
  );
  const pendingTopics = totalTopics - completedTopics;

  const stats = [
    {
      value: String(totalTopics),
      label: "Total topics",
      icon: "clock" as const,
    },
    {
      value: String(completedTopics),
      label: "Completed topics",
      icon: "cap" as const,
    },
    {
      value: String(pendingTopics),
      label: "Pending topics",
      icon: "clock" as const,
    },
  ];

  return (
    <DashboardLayout
      activeHref="/dashboard/progress"
      courseTitle={activeCourse.title}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:mt-6">
        {progressModules.map((module, i) => (
          <ProgressModuleCard
            key={module.title}
            module={module}
            delay={0.3 + i * 0.08}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
