import { StudentRecord } from "@/lib/studentData";

interface StudentTableRowProps {
  student: StudentRecord;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function StudentTableRow({ student }: StudentTableRowProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[11px] font-bold text-[#0A0A12]">
        {getInitials(student.name)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13.5px] font-medium text-strong">{student.name}</p>
        <p className="truncate text-[12px] text-muted">Roll {student.rollNumber}</p>
      </div>
    </div>
  );
}