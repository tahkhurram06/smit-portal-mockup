import { StudentProgressRecord, overallPercent, totalTopics } from "@/lib/teacherProgressData";

interface StudentProgressHeaderProps {
  student: StudentProgressRecord;
  delay?: number;
}

export default function StudentProgressHeader({ student, delay = 0 }: StudentProgressHeaderProps) {
  const percent = overallPercent(student.modules);
  const topics = totalTopics(student.modules);

  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] rounded-2xl border border-ov/[0.1] bg-card-hi shadow-card p-5 backdrop-blur-xl sm:p-6"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-[13.5px] font-semibold text-strong">
            {student.name}{" "}
            <span className="font-normal text-muted">— {student.campus}</span>{" "}
            <span className="rounded-full border border-ov/[0.15] bg-ov/[0.04] px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-muted">
              Batch {student.batch}
            </span>
          </p>
          <p className="truncate text-[12px] text-dim">{student.timeSlots.join(" | ")}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[#8B6BFF]/30 bg-[#8B6BFF]/[0.1] px-2.5 py-1 text-[11.5px] font-semibold text-purple-soft">
          Topics: {topics.completed}/{topics.total}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted">Overall progress</span>
        <span className="text-xs font-semibold text-teal">{percent}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ov/[0.08]">
        <div
          className="h-full rounded-full bg-[length:220%_auto] transition-[width] duration-700 ease-out motion-safe:animate-[barShimmer_3.5s_linear_infinite]"
          style={{
            width: `${percent}%`,
            backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
          }}
        />
      </div>
    </div>
  );
}