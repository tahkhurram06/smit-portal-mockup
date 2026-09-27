"use client";

import { PaymentBatch, collectionStats, formatAmount } from "@/lib/adminPaymentData";
import ProgressBar from "@/components/ui/ProgressBar";
import Pagination from "@/components/Students/Courses/Dashboard/Assignment/Pagination";
import PaymentStudentRow from "./PaymentStudentRow";

const PER_PAGE = 5;

interface PaymentBatchRowProps {
  batch: PaymentBatch;
  open: boolean;
  onToggle: () => void;
  page: number;
  onPageChange: (page: number) => void;
  /** Only show vouchers matching this status. "all" shows every voucher. */
  statusFilter: "all" | "Paid" | "Pending" | "Overdue";
  delay?: number;
}

function collectionColor(percent: number) {
  if (percent >= 85) return "var(--teal)";
  if (percent >= 60) return "var(--amber)";
  return "var(--red)";
}

export default function PaymentBatchRow({
  batch,
  open,
  onToggle,
  page,
  onPageChange,
  statusFilter,
  delay = 0,
}: PaymentBatchRowProps) {
  const stats = collectionStats(batch.vouchers);
  const percent = stats.total === 0 ? 0 : Math.round((stats.paid / stats.total) * 100);
  const color = collectionColor(percent);

  const filtered =
    statusFilter === "all" ? batch.vouchers : batch.vouchers.filter((v) => v.status === statusFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const rangeStart = safePage * PER_PAGE;
  const rangeEnd = Math.min(rangeStart + PER_PAGE, filtered.length);
  const pageVouchers = filtered.slice(rangeStart, rangeEnd);

  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] border-t border-ov/[0.07] first:border-t-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full cursor-pointer flex-col gap-3 p-4 text-left outline-none transition-colors duration-200 hover:bg-ov/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2 sm:flex-row sm:items-start sm:gap-3 sm:p-5"
      >
        <div className="flex items-start gap-3 sm:min-w-0 sm:flex-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:text-strong ${
              open ? "rotate-90" : ""
            }`}
          >
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="min-w-0 flex-1">
            <p className="truncate font-fraunces text-[15px] font-semibold text-strong sm:text-base">
              {batch.title}
            </p>
            <p className="mt-1 truncate text-[12px] text-muted">
              Batch {batch.batchNumber} · {batch.teacher} · {stats.total} vouchers
            </p>
            <div className="mt-2.5 max-w-[220px]">
              <ProgressBar value={percent} label="Collected" />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 pl-7 sm:flex-col sm:items-end sm:gap-1.5 sm:pl-0">
          <span className="font-fraunces text-lg font-semibold transition-transform duration-300 group-hover:scale-105 sm:text-xl" style={{ color }}>
            {percent}%
          </span>
          <span className="text-[11.5px] text-dim">
            {formatAmount(stats.collected)} <span className="text-dim/70">/ {formatAmount(stats.expected)}</span>
          </span>
          {stats.overdue > 0 && (
            <span className="inline-flex items-center whitespace-nowrap rounded-full border border-[#FF6B6B]/40 bg-[#FF6B6B]/[0.08] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-red">
              {stats.overdue} overdue
            </span>
          )}
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-ov/[0.07] px-4 pb-4 pl-[46px] pt-1 sm:px-5 sm:pl-[54px]">
            {filtered.length === 0 ? (
              <p className="py-4 text-[12.5px] text-dim">No vouchers match this filter in this batch.</p>
            ) : (
              <>
                <div className="flex flex-col divide-y divide-ov/[0.06]">
                  {pageVouchers.map((voucher, i) => (
                    <PaymentStudentRow
                      key={voucher.roll}
                      voucher={voucher}
                      delay={open ? 0.04 + i * 0.04 : 0}
                    />
                  ))}
                </div>

                <div className="mt-1">
                  <Pagination
                    page={safePage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    rangeStart={rangeStart + 1}
                    rangeEnd={rangeEnd}
                    total={filtered.length}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}