import { QuizRecord } from "@/lib/quizData";
import StatusBadge from "@/components/ui/StatusBadge";

interface QuizTableProps {
  records: QuizRecord[];
  delay?: number;
}

export default function QuizTable({ records, delay = 0 }: QuizTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No quizzes assigned yet.
        </p>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden overflow-hidden rounded-2xl sm:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[21%]" />
                <col className="w-[9%]" />
                <col className="w-[9%]" />
                <col className="w-[10%]" />
                <col className="w-[11%]" />
                <col className="w-[6%]" />
                <col className="w-[14%]" />
              </colgroup>
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-dim">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-3 py-3 font-medium">Module</th>
                  <th className="px-3 py-3 font-medium">Questions</th>
                  <th className="px-3 py-3 font-medium">Attempts</th>
                  <th className="px-3 py-3 font-medium">Percentage</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Note</th>
                  <th className="px-3 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((quiz, i) => {
                  const attemptsExhausted =
                    quiz.status === "Failed" &&
                    quiz.attemptsUsed >= quiz.attemptsAllowed;

                  return (
                    <tr
                      key={quiz.title}
                      className="border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                      style={{ animationDelay: `${i * 0.03}s` }}
                    >
                      <td className="truncate px-5 py-3.5 font-medium text-strong">{quiz.title}</td>
                      <td className="truncate px-3 py-3.5 text-muted">{quiz.module}</td>
                      <td className="px-3 py-3.5">
                        <span className="inline-flex min-w-[34px] items-center justify-center rounded-lg border border-ov/[0.1] bg-ov/[0.06] px-2 py-1 font-semibold text-strong">
                          {quiz.questions}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`font-semibold ${
                            attemptsExhausted ? "text-red" : "text-fg-soft"
                          }`}
                        >
                          {quiz.attemptsUsed}/{quiz.attemptsAllowed}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 font-semibold text-strong">{quiz.percentage}%</td>
                      <td className="px-3 py-3.5">
                        <StatusBadge status={quiz.status} />
                      </td>
                      <td className="truncate px-3 py-3.5 text-dim">{quiz.note}</td>
                      <td className="px-3 py-3.5 text-right">
                        <button
                          type="button"
                          disabled
                          className="cursor-default rounded-lg border border-ov/[0.1] bg-ov/[0.04] px-3 py-1.5 text-xs font-medium text-muted"
                        >
                          Completed
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* mobile stacked cards */}
          <div className="divide-y divide-ov/[0.07] sm:hidden">
            {records.map((quiz, i) => {
              const attemptsExhausted =
                quiz.status === "Failed" && quiz.attemptsUsed >= quiz.attemptsAllowed;

              return (
                <div
                  key={quiz.title}
                  className="p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-medium text-strong">{quiz.title}</p>
                      <p className="mt-0.5 truncate text-[12px] text-muted">{quiz.module}</p>
                    </div>
                    <StatusBadge status={quiz.status} />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted">
                    <span>
                      Questions:{" "}
                      <span className="font-medium text-strong">{quiz.questions}</span>
                    </span>
                    <span>
                      Attempts:{" "}
                      <span
                        className={`font-medium ${
                          attemptsExhausted ? "text-red" : "text-strong"
                        }`}
                      >
                        {quiz.attemptsUsed}/{quiz.attemptsAllowed}
                      </span>
                    </span>
                    <span>
                      Score: <span className="font-medium text-strong">{quiz.percentage}%</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="mt-3 w-full cursor-default rounded-lg border border-ov/[0.1] bg-ov/[0.04] px-3 py-2 text-xs font-medium text-muted"
                  >
                    Completed
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}