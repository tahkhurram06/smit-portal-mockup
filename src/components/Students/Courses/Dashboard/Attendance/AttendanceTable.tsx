import { AttendanceRecord } from "@/lib/attendanceData";
import StatusBadge from "@/components/ui/StatusBadge";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  delay?: number;
  footer?: React.ReactNode;
}

export default function AttendanceTable({ records, delay = 0, footer }: AttendanceTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No attendance records for this month.
        </p>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden overflow-hidden sm:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[16%]" />
                <col className="w-[54%]" />
                <col className="w-[30%]" />
              </colgroup>
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-dim">
                  <th className="px-5 py-3 font-medium">Class #</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((a, i) => (
                  <tr
                    key={`${a.classNumber}-${a.date}`}
                    className="border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <td className="px-5 py-3.5">
                      <span className="inline-flex min-w-[34px] items-center justify-center rounded-lg border border-ov/[0.1] bg-ov/[0.06] px-2 py-1 font-semibold text-strong">
                        {a.classNumber}
                      </span>
                    </td>
                    <td className="truncate px-3 py-3.5 text-fg-soft">{a.date}</td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile stacked cards */}
          <div className="divide-y divide-ov/[0.07] sm:hidden">
            {records.map((a, i) => (
              <div
                key={`${a.classNumber}-${a.date}`}
                className="flex items-center justify-between gap-3 p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-strong">Class {a.classNumber}</p>
                  <p className="mt-0.5 truncate text-[12px] text-muted">{a.date}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </>
      )}

      {footer}
    </div>
  );
}