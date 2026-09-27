"use client";

import { useState } from "react";
import DashboardLayout from "@/components/Students/Courses/Dashboard/Layout/DashboardLayout";
import StatCard from "@/components/Students/Courses/Dashboard/Overview/StatCard";
import HowToPayCard from "@/components/Students/Courses/Dashboard/Payment/HowToPayCard";
import PaymentTable from "@/components/Students/Courses/Dashboard/Payment/PaymentTable";
import CurrentVoucherCard from "@/components/Students/Courses/Dashboard/Payment/CurrentVoucherCard";
import Pagination from "@/components/Students/Courses/Dashboard/Assignment/Pagination";
import { activeCourse, StatData } from "@/lib/dashboardData";
import {
  feeRows,
  currentVoucher,
  paymentSummary,
  formatAmount,
} from "@/lib/paymentData";

const PER_PAGE = 7;

function SectionLabel({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <p
      className="mb-3 animate-[fadeUp_0.5s_ease_both] text-[12.5px] font-medium uppercase tracking-wide text-muted"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </p>
  );
}

export default function PaymentPage() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(feeRows.length / PER_PAGE);
  const rangeStart = page * PER_PAGE;
  const rangeEnd = Math.min(rangeStart + PER_PAGE, feeRows.length);
  const pageRecords = feeRows.slice(rangeStart, rangeEnd);

  const stats: StatData[] = [
    {
      value: formatAmount(paymentSummary.totalPaid),
      label: "Total paid",
      icon: "card",
    },
    {
      value: String(paymentSummary.paidCount),
      label: "Vouchers paid",
      icon: "check-circle",
    },
    {
      value: String(paymentSummary.pendingCount),
      label: "Pending",
      icon: "hourglass",
    },
  ];

  return (
    <DashboardLayout
      activeHref="/dashboard/payment"
      courseTitle={activeCourse.title}
    >
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start xl:gap-6">
        {/* main column */}
        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
            ))}
          </div>

          <div className="mt-5 sm:mt-6">
            <SectionLabel delay={0.28}>How to pay</SectionLabel>
            <HowToPayCard delay={0.32} />
          </div>

          <div className="mt-5 sm:mt-6">
            <SectionLabel delay={0.4}>Payment history</SectionLabel>
            <PaymentTable
              records={pageRecords}
              delay={0.44}
              footer={
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  rangeStart={rangeStart + 1}
                  rangeEnd={rangeEnd}
                  total={feeRows.length}
                />
              }
            />
          </div>
        </div>

        {/* side column — first on small screens, sticky on xl */}
        <div className="order-first xl:sticky xl:top-8 xl:order-none">
          <CurrentVoucherCard voucher={currentVoucher} delay={0.16} />
        </div>
      </div>
    </DashboardLayout>
  );
}
