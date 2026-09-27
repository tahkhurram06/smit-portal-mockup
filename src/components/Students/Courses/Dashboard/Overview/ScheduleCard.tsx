import { weekSchedule, DayStatus } from "@/lib/dashboardData";

const stateStyles: Record<DayStatus["state"], string> = {
  present:
    "bg-gradient-to-br from-[#3FE6D6] to-[#2BC4B5] text-[#04342C] shadow-[0_4px_12px_-3px_rgba(63,230,214,0.45)]",
  absent:
    "bg-[#FF6B6B]/[0.14] text-red border border-[#FF6B6B]/30",
  upcoming:
    "bg-[#8B6BFF]/[0.14] text-purple-soft border border-[#8B6BFF]/30",
  off: "bg-ov/[0.04] text-dim border border-ov/[0.08]",
};

interface ScheduleCardProps {
  delay?: number;
}

export default function ScheduleCard({ delay = 0 }: ScheduleCardProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] rounded-2xl border border-ov/[0.1] bg-card shadow-card p-4 backdrop-blur-xl transition-all duration-300 hover:border-ov/[0.18] hover:bg-card-hover sm:p-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <p className="mb-3 flex items-center gap-1.5 text-[12.5px] font-medium text-strong">
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-teal">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Class schedule
      </p>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {weekSchedule.map((day, i) => (
          <div
            key={day.label + day.date}
            title={`${day.label} ${day.date}`}
            className={`flex cursor-default flex-col items-center gap-0.5 rounded-[10px] py-2 text-[10px] font-semibold transition-transform duration-200 hover:scale-[1.07] motion-safe:animate-[fadeUp_0.4s_ease_both] ${stateStyles[day.state]}`}
            style={{ animationDelay: `${delay + 0.05 + i * 0.03}s` }}
          >
            <span className="opacity-80">{day.label}</span>
            <span className="text-[11.5px]">{day.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}