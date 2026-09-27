// Intended path: app/admin/payments/page.tsx
import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import AdminStatCard from "@/components/Admin/Overview/AdminStatCard";
import PaymentBatchList from "@/components/Admin/Payments/PaymentBatchList";
import { paymentOverview, formatAmount } from "@/lib/adminPaymentData";
import { AdminStatData } from "@/lib/adminData";

export default function AdminPaymentsPage() {
  const stats: AdminStatData[] = [
    { value: formatAmount(paymentOverview.collected), label: "Collected (this month)", icon: "students" },
    { value: formatAmount(paymentOverview.expected), label: "Expected (this month)", icon: "batches" },
    { value: String(paymentOverview.overdueCount), label: "Overdue vouchers", icon: "overdue" },
    { value: `${paymentOverview.collectionRate}%`, label: "Collection rate", icon: "teachers" },
  ];

  return (
    <AdminLayout
      activeHref="/admin/payments"
      pageTitle="Payments"
      pageSubtitle="Fee collection across every batch"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <AdminStatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
        ))}
      </div>

      <div className="mt-5 sm:mt-6">
        <PaymentBatchList />
      </div>
    </AdminLayout>
  );
}