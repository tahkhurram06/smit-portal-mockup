interface TimeSlotPillProps {
  label: string;
}

export default function TimeSlotPill({ label }: TimeSlotPillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-ov/[0.1] bg-ov/[0.04] px-2.5 py-1.5 text-[11.5px] text-muted transition-colors duration-200 hover:border-ov/[0.2] hover:text-strong">
      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 shrink-0 text-teal">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}