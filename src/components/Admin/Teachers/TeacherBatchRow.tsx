import { TeacherBatch } from "@/lib/adminTeacherData";
import StatusBadge from "@/components/ui/StatusBadge";

interface TeacherBatchRowProps {
  batch: TeacherBatch;
  delay?: number;
}

export default function TeacherBatchRow({ batch, delay = 0 }: TeacherBatchRowProps) {
  return (
    <div
      className="group flex items-center gap-3 rounded-[10px] px-2 py-2.5 transition-colors duration-200 motion-safe:animate-[fadeUp_0.3s_ease_both] hover:bg-ov/[0.05]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#8B6BFF]/[0.12] text-purple transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M12 4 3 9l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m6 12 6 3.5 6-3.5M6 16l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-strong">{batch.title}</p>
        <p className="truncate text-[11.5px] text-dim">
          Batch {batch.batchNumber} · {batch.studentCount} students
        </p>
      </div>
      <StatusBadge status={batch.status} />
    </div>
  );
}