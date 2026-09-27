import { AttendanceRecord } from "@/lib/attendanceData";
import StatusBadge from "@/components/ui/StatusBadge";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  delay?: number;
}

export default function AttendanceTable({ records, delay = 0 }: AttendanceTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No classes recorded for this month.
        </p>
      ) : (
        <>
          {/* desktop table — header row removed for now */}
          <div className="hidden overflow-hidden rounded-2xl sm:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[18%]" />
                <col className="w-[52%]" />
                <col className="w-[30%]" />
              </colgroup>
              <tbody>
                {records.map((record, i) => (
                  <tr
                    key={record.classNumber}
                    className="border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <td className="truncate px-5 py-3.5 font-medium text-strong">{record.classNumber}</td>
                    <td className="truncate px-3 py-3.5 text-muted">{record.date}</td>
                    <td className="px-5 py-3.5 text-right">
                      <StatusBadge status={record.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile stacked cards */}
          <div className="divide-y divide-ov/[0.07] sm:hidden">
            {records.map((record, i) => (
              <div
                key={record.classNumber}
                className="flex items-center justify-between gap-3 p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-strong">Class {record.classNumber}</p>
                  <p className="mt-0.5 truncate text-[12px] text-muted">{record.date}</p>
                </div>
                <StatusBadge status={record.status} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}