import { BatchStudent, initials } from "@/lib/adminBatchData";
import StatusBadge from "@/components/ui/StatusBadge";

interface BatchStudentRowProps {
  student: BatchStudent;
  delay?: number;
}

export default function BatchStudentRow({ student, delay = 0 }: BatchStudentRowProps) {
  return (
    <div
      className="group flex items-center gap-3 rounded-[10px] px-2 py-2.5 transition-colors duration-200 motion-safe:animate-[fadeUp_0.3s_ease_both] hover:bg-ov/[0.05]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[10.5px] font-bold text-[#0A0A12] transition-transform duration-200 group-hover:scale-105">
        {initials(student.name)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-strong">{student.name}</p>
        <p className="truncate text-[11.5px] text-dim">{student.roll}</p>
      </div>
      <StatusBadge status={student.status} />
    </div>
  );
}