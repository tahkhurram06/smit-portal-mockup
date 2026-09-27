import DashboardLayout from "@/components/Students/Courses/Dashboard/Layout/DashboardLayout";
import StatCard from "@/components/Students/Courses/Dashboard/Overview/StatCard";
import QuizInfoBanner from "@/components/Students/Courses/Dashboard/Quiz/QuizInfoBanner";
import QuizTable from "@/components/Students/Courses/Dashboard/Quiz/QuizTable";
import { activeCourse, StatData } from "@/lib/dashboardData";
import { quizRecords, quizSummary } from "@/lib/quizData";

export default function QuizPage() {
  const stats: StatData[] = [
    { value: String(quizSummary.total), label: "Total quizzes", icon: "cap" },
    {
      value: String(quizSummary.passed),
      label: "Passed",
      icon: "check-circle",
    },
    { value: String(quizSummary.failed), label: "Failed", icon: "x-circle" },
    {
      value: `${quizSummary.averagePercentage}%`,
      label: "Average score",
      icon: "clock",
    },
  ];

  return (
    <DashboardLayout
      activeHref="/dashboard/quiz"
      courseTitle={activeCourse.title}
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
        ))}
      </div>

      <div className="mt-5 sm:mt-6">
        <QuizInfoBanner />
      </div>

      <div className="mt-5 sm:mt-6">
        <QuizTable records={quizRecords} delay={0.36} />
      </div>
    </DashboardLayout>
  );
}
