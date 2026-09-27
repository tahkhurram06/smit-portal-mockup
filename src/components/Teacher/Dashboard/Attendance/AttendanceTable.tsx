import { StudentAttendanceRow, AttendanceMarkStatus } from "@/lib/teacherAttendanceData";
import StatusBadge from "@/components/ui/StatusBadge";
import AttendanceMarkRow from "./AttendanceMarkRow";

interface AttendanceTableProps {
  records: StudentAttendanceRow[];
  onMark: (rollNumber: string, status: Exclude<AttendanceMarkStatus, null>) => void;
  delay?: number;
  footer?: React.ReactNode;
}
function NotMarkedBadge() {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-ov/[0.15] bg-ov/[0.04] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-muted">
      Not marked
    </span>
  );
}

function MarkButtons({
  status,
  onMark,
}: {
  status: AttendanceMarkStatus;
  onMark: (s: Exclude<AttendanceMarkStatus, null>) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        onClick={() => onMark("Present")}
        aria-pressed={status === "Present"}
        aria-label="Mark present"
        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] border transition-all duration-200 ${
          status === "Present"
            ? "border-[#3FE6D6]/50 bg-[#3FE6D6]/[0.14] text-teal"
            : "border-ov/[0.13] bg-ov/[0.03] text-dim hover:border-[#3FE6D6]/40 hover:bg-[#3FE6D6]/[0.08] hover:text-teal"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onMark("Leave")}
        aria-pressed={status === "Leave"}
        aria-label="Mark on leave"
        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] border transition-all duration-200 ${
          status === "Leave"
            ? "border-[#FFC65A]/50 bg-[#FFC65A]/[0.14] text-amber"
            : "border-ov/[0.13] bg-ov/[0.03] text-dim hover:border-[#FFC65A]/40 hover:bg-[#FFC65A]/[0.08] hover:text-amber"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="M8.5 12h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onMark("Absent")}
        aria-pressed={status === "Absent"}
        aria-label="Mark absent"
        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] border transition-all duration-200 ${
          status === "Absent"
            ? "border-[#FF6B6B]/50 bg-[#FF6B6B]/[0.14] text-red"
            : "border-ov/[0.13] bg-ov/[0.03] text-dim hover:border-[#FF6B6B]/40 hover:bg-[#FF6B6B]/[0.08] hover:text-red"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default function AttendanceTable({ records, onMark, delay = 0, footer }: AttendanceTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No students to mark for this date.
        </p>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden overflow-hidden sm:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[46%]" />
                <col className="w-[24%]" />
                <col className="w-[30%]" />
              </colgroup>
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-dim">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Mark</th>
                </tr>
              </thead>
              <tbody>
                {records.map((student, i) => (
                  <tr
                    key={student.rollNumber}
                    className="border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <td className="px-5 py-3">
                      <AttendanceMarkRow student={student} />
                    </td>
                    <td className="px-3 py-3">
                      {student.status ? <StatusBadge status={student.status} /> : <NotMarkedBadge />}
                    </td>
                    <td className="px-5 py-3">
                      <MarkButtons status={student.status} onMark={(s) => onMark(student.rollNumber, s)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile stacked cards */}
          <div className="divide-y divide-ov/[0.07] sm:hidden">
            {records.map((student, i) => (
              <div
                key={student.rollNumber}
                className="p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <AttendanceMarkRow student={student} />
                  {student.status ? <StatusBadge status={student.status} /> : <NotMarkedBadge />}
                </div>
                <MarkButtons status={student.status} onMark={(s) => onMark(student.rollNumber, s)} />
              </div>
            ))}
          </div>
        </>
      )}

      {footer}
    </div>
  );
}