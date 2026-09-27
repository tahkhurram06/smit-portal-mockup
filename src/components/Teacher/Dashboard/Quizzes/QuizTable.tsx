import { TeacherQuizRecord } from "@/lib/teacherQuizData";
import StatusBadge from "@/components/ui/StatusBadge";

interface QuizTableProps {
  records: TeacherQuizRecord[];
  delay?: number;
  footer?: React.ReactNode;
}

function CoursesList({ courses }: { courses: string[] }) {
  const [first, ...rest] = courses;
  return (
    <span className="block truncate text-fg-soft">
      {first}
      {rest.length > 0 && <span className="ml-1.5 text-dim">+{rest.length}</span>}
    </span>
  );
}

function RowActions() {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        aria-label="View quiz"
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
      <button
        type="button"
        aria-label="Delete quiz"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] text-muted transition-all duration-200 hover:bg-[#FF6B6B]/10 hover:text-red"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]">
          <path
            d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function QuizTable({ records, delay = 0, footer }: QuizTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No quizzes created yet.
        </p>
      ) : (
        <>
          {/* desktop table — 6 columns incl. a multi-course list, deferred to lg for tablet breathing room */}
          <div className="hidden overflow-hidden lg:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[34%]" />
                <col className="w-[13%]" />
                <col className="w-[13%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-dim">
                  <th className="px-5 py-3 font-medium">Quiz</th>
                  <th className="px-3 py-3 font-medium">Course(s)</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Expiry</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((q, i) => (
                  <tr
                    key={`${q.title}-${q.date}`}
                    className="border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <td className="truncate px-5 py-3.5 font-medium text-strong">{q.title}</td>
                    <td className="px-3 py-3.5">
                      <CoursesList courses={q.courses} />
                    </td>
                    <td className="truncate px-3 py-3.5 text-muted">{q.date}</td>
                    <td className="truncate px-3 py-3.5 text-muted">{q.expiry}</td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={q.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <RowActions />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile / tablet stacked cards — shown up to lg */}
          <div className="divide-y divide-ov/[0.07] lg:hidden">
            {records.map((q, i) => (
              <div
                key={`${q.title}-${q.date}`}
                className="p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <p className="min-w-0 truncate text-[13.5px] font-medium text-strong">{q.title}</p>
                  <StatusBadge status={q.status} />
                </div>
                <p className="mb-2.5 truncate text-[12px] text-dim">
                  <CoursesList courses={q.courses} />
                </p>
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted">
                  <span>Date: {q.date}</span>
                  <span>Expiry: {q.expiry}</span>
                </div>
                <RowActions />
              </div>
            ))}
          </div>
        </>
      )}

      {footer}
    </div>
  );
}