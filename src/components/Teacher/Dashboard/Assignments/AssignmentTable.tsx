import { TeacherAssignmentRecord } from "@/lib/teacherAssignmentData";

interface AssignmentTableProps {
  records: TeacherAssignmentRecord[];
  delay?: number;
  footer?: React.ReactNode;
}

function TopicsPill({ topics }: { topics: number }) {
  if (topics === 0) {
    return <span className="text-[12px] text-dim">No topics</span>;
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[#8B6BFF]/25 bg-[#8B6BFF]/[0.12] px-2.5 py-1 text-[11px] font-semibold text-purple-soft">
      {topics} Topic{topics > 1 ? "s" : ""}
    </span>
  );
}

function RowActions() {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        aria-label="View assignment"
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
        aria-label="Edit assignment"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] text-muted transition-all duration-200 hover:bg-ov/[0.08] hover:text-strong"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]">
          <path
            d="M16.5 3.5a2 2 0 0 1 3 3L7 19l-4 1 1-4Z"
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

export default function AssignmentTable({ records, delay = 0, footer }: AssignmentTableProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {records.length === 0 ? (
        <p className="px-5 py-8 text-center text-[12.5px] text-dim">
          No assignments created yet.
        </p>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden overflow-hidden sm:block">
            <table className="w-full table-fixed border-collapse text-left text-[13px]">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[36%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-dim">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-3 py-3 font-medium">Description</th>
                  <th className="px-3 py-3 font-medium">Topics</th>
                  <th className="px-3 py-3 font-medium">Due date</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((a, i) => (
                  <tr
                    key={a.title}
                    className="border-t border-ov/[0.07] transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <td className="truncate px-5 py-3.5 font-medium text-strong">{a.title}</td>
                    <td className="truncate px-3 py-3.5 text-dim">{a.description}</td>
                    <td className="px-3 py-3.5">
                      <TopicsPill topics={a.topics} />
                    </td>
                    <td className="truncate px-3 py-3.5 text-fg-soft">{a.dueDate}</td>
                    <td className="px-5 py-3.5">
                      <RowActions />
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
                key={a.title}
                className="p-4 transition-colors duration-200 hover:bg-ov/[0.035] motion-safe:animate-[fadeUp_0.35s_ease_both]"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <p className="mb-1 text-[13.5px] font-medium text-strong">{a.title}</p>
                <p className="mb-2.5 line-clamp-2 text-[12px] text-dim">{a.description}</p>

                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted">
                  <TopicsPill topics={a.topics} />
                  <span>{a.dueDate}</span>
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