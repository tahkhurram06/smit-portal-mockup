"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { feeRows, formatAmount } from "@/lib/paymentData";
import StatusBadge from "@/components/ui/StatusBadge";
import CopyButton from "@/components/ui/CopyButton";

interface FeeTableProps {
  delay?: number;
}

// The overview only previews recent vouchers; the Payment page has the full history.
const HISTORY_PREVIEW = 4;

function getCurrentRow() {
  const now = new Date();
  const label = now.toLocaleString("en-US", { month: "short", year: "numeric" });
  return feeRows.find((r) => r.month === label) ?? feeRows[0];
}

export default function FeeTable({ delay = 0 }: FeeTableProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = getCurrentRow();
  const history = feeRows
    .filter((r) => r.voucherId !== current.voucherId)
    .slice(0, HISTORY_PREVIEW);

  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* current month summary — always visible, toggles history */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-ov/[0.03] sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B6BFF]/[0.12] text-purple">
            <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="flex flex-wrap items-baseline gap-x-2 text-[13.5px] font-medium text-strong sm:text-sm">
              {current.month}
              <span className="text-[11px] font-normal uppercase tracking-wide text-dim">
                Current
              </span>
            </p>
            <p className="mt-0.5 truncate text-[12.5px] text-muted">
              {formatAmount(current.amount)} · Due {current.dueDate}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <StatusBadge status={current.status} />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`h-4 w-4 text-muted transition-transform duration-300 group-hover:text-strong ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* expandable history */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-ov/[0.08]">
            <p className="px-5 pt-3.5 pb-1 text-[11px] font-medium uppercase tracking-wide text-dim sm:px-6">
              Payment history
            </p>

            {history.length === 0 ? (
              <p className="px-5 py-5 text-[12.5px] text-dim sm:px-6">
                No previous records yet.
              </p>
            ) : (
              <>
                {/* desktop table */}
                <div className="hidden overflow-x-hidden sm:block">
                  <table className="w-full table-fixed border-collapse text-left text-[13px]">
                    <colgroup>
                      <col className="w-[16%]" />
                      <col className="w-[14%]" />
                      <col className="w-[14%]" />
                      <col className="w-[16%]" />
                      <col className="w-[24%]" />
                      <col className="w-[16%]" />
                    </colgroup>
                    <thead>
                      <tr className="text-[11px] uppercase tracking-wide text-dim">
                        <th className="px-5 py-3 font-medium">Month</th>
                        <th className="px-3 py-3 font-medium">Amount</th>
                        <th className="px-3 py-3 font-medium">Type</th>
                        <th className="px-3 py-3 font-medium">Due date</th>
                        <th className="px-3 py-3 font-medium">Voucher ID</th>
                        <th className="px-5 py-3 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((row) => (
                        <tr
                          key={row.voucherId}
                          className="border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035]"
                        >
                          <td className="truncate px-5 py-3.5 font-medium text-strong">{row.month}</td>
                          <td className="truncate px-3 py-3.5 text-fg-soft">{formatAmount(row.amount)}</td>
                          <td className="truncate px-3 py-3.5 text-muted">{row.type}</td>
                          <td className="truncate px-3 py-3.5 text-muted">{row.dueDate}</td>
                          <td className="px-3 py-3.5">
                            <div className="flex items-center gap-1.5 text-muted">
                              <span className="truncate font-mono text-[12px]">{row.voucherId}</span>
                              <CopyButton value={row.voucherId} />
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <StatusBadge status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* mobile stacked cards */}
                <div className="divide-y divide-ov/[0.07] sm:hidden">
                  {history.map((row) => (
                    <div key={row.voucherId} className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-strong">{row.month}</span>
                        <StatusBadge status={row.status} />
                      </div>
                      <div className="flex items-center justify-between text-[12.5px] text-muted">
                        <span>{formatAmount(row.amount)} · {row.type}</span>
                        <span>{row.dueDate}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-[11.5px] text-dim">
                        <span className="font-mono">{row.voucherId}</span>
                        <CopyButton value={row.voucherId} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => router.push("/dashboard/payment")}
              className="group flex w-full cursor-pointer items-center justify-center gap-1.5 border-t border-ov/[0.08] px-5 py-3.5 text-[12.5px] font-medium text-muted transition-colors duration-200 hover:bg-ov/[0.03] hover:text-strong"
            >
              View all payments
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}