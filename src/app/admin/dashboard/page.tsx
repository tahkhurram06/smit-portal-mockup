import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import AdminStatCard from "@/components/Admin/Overview/AdminStatCard";
import FeeProgressCard from "@/components/Admin/Overview/FeeProgressCard";
import RecentFeedbackCard from "@/components/Admin/Overview/RecentFeedbackCard";
import { overviewStats, feeSummary, feedbackItems } from "@/lib/adminData";

const FEEDBACK_PREVIEW_COUNT = 3;

export default function AdminOverviewPage() {
  return (
    <AdminLayout
      activeHref="/admin/dashboard"
      pageTitle="Admin overview"
      pageSubtitle="Portal-wide summary across every batch"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {overviewStats.map((stat, i) => (
          <AdminStatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
        ))}
      </div>

      <div className="mt-5 sm:mt-6">
        <FeeProgressCard data={feeSummary} delay={0.34} />
      </div>

      <div className="mt-5 sm:mt-6">
        <RecentFeedbackCard
          items={feedbackItems.slice(0, FEEDBACK_PREVIEW_COUNT)}
          delay={0.42}
        />
      </div>
    </AdminLayout>
  );
}