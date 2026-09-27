import { StudentRecord } from "@/lib/studentData";
import StatusBadge from "@/components/ui/StatusBadge";
import StudentTableRow from "./StudentTableRow";

interface StudentTableProps {
  records: StudentRecord[];
  delay?: number;
  footer?: React.ReactNode;
}

function ViewAction() {
  return (
    <button
      type="button"
      aria-label="View student"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] text-muted transition-all duration-200 hover:bg-ov/[0.08] hover:text-strong"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </button>
  );
}

export default function StudentTable({ records, delay = 0, footer }: StudentTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No students match your search.
        </p>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden overflow-hidden sm:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[40%]" />
                <col className="w-[30%]" />
                <col className="w-[18%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-dim">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-3 py-3 font-medium">Email</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Action</th>
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
                      <StudentTableRow student={student} />
                    </td>
                    <td className="truncate px-3 py-3 text-fg-soft">{student.email}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={student.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <ViewAction />
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
                className="flex items-center justify-between gap-3 p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <StudentTableRow student={student} />
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <StatusBadge status={student.status} />
                  <ViewAction />
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