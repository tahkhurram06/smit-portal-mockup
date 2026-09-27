"use client";

interface AttendanceDatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function addDays(date: Date, delta: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}

export default function AttendanceDatePicker({ date, onChange }: AttendanceDatePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(addDays(date, -1))}
        aria-label="Previous day"
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-ov/[0.1] bg-card shadow-card text-muted transition-colors duration-200 hover:border-ov/[0.22] hover:text-strong"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-center gap-2 rounded-[10px] border border-ov/[0.1] bg-card shadow-card px-3.5 py-2.5 text-[13px] font-medium text-strong">
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-teal">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {formatDate(date)}
      </div>

      <button
        type="button"
        onClick={() => onChange(addDays(date, 1))}
        aria-label="Next day"
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-ov/[0.1] bg-card shadow-card text-muted transition-colors duration-200 hover:border-ov/[0.22] hover:text-strong"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}