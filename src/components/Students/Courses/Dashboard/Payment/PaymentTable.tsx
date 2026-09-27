import { FeeRow, formatAmount } from "@/lib/paymentData";
import StatusBadge from "@/components/ui/StatusBadge";
import CopyButton from "@/components/ui/CopyButton";

interface PaymentTableProps {
  records: FeeRow[];
  delay?: number;
  footer?: React.ReactNode;
}

export default function PaymentTable({ records, delay = 0, footer }: PaymentTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No payments to show.
        </p>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden overflow-hidden sm:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[13%]" />
                <col className="w-[18%]" />
                <col className="w-[25%]" />
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
                {records.map((row, i) => (
                  <tr
                    key={row.voucherId}
                    className={`border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both] ${
                      row.status === "Paid" ? "" : "bg-[#FFC65A]/[0.035]"
                    }`}
                    style={{ animationDelay: `${i * 0.04}s` }}
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
            {records.map((row, i) => (
              <div
                key={row.voucherId}
                className={`p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both] ${
                  row.status === "Paid" ? "" : "bg-[#FFC65A]/[0.035]"
                }`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-strong">{row.month}</span>
                  <StatusBadge status={row.status} />
                </div>
                <div className="flex items-center justify-between gap-3 text-[12.5px] text-muted">
                  <span>
                    {formatAmount(row.amount)} · {row.type}
                  </span>
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

      {footer}
    </div>
  );
}