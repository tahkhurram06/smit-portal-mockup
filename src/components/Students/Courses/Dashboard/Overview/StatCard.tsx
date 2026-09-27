import { StatData } from "@/lib/dashboardData";

const icons: Record<StatData["icon"], React.ReactNode> = {
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  hourglass: (
    <>
      <path d="M7 3h10M7 21h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 3v3.5a4 4 0 0 0 1.6 3.2L12 12l-2.4 2.3A4 4 0 0 0 8 17.5V21M16 3v3.5a4 4 0 0 1-1.6 3.2L12 12l2.4 2.3a4 4 0 0 1 1.6 3.2V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cap: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 12v5c0 1.4 2.7 3 6 3s6-1.6 6-3v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12.5 2.2 2.2L16 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "minus-circle": (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 12h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  "x-circle": (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9.5 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
};

const iconColor: Record<StatData["icon"], string> = {
  card: "text-purple",
  hourglass: "text-amber",
  clock: "text-teal",
  cap: "text-purple",
  calendar: "text-purple",
  "check-circle": "text-teal",
  "minus-circle": "text-amber",
  "x-circle": "text-red",
};

const iconBg: Record<StatData["icon"], string> = {
  card: "bg-[#8B6BFF]/[0.1]",
  hourglass: "bg-[#FFC65A]/[0.1]",
  clock: "bg-[#3FE6D6]/[0.1]",
  cap: "bg-[#8B6BFF]/[0.1]",
  calendar: "bg-[#8B6BFF]/[0.1]",
  "check-circle": "bg-[#3FE6D6]/[0.1]",
  "minus-circle": "bg-[#FFC65A]/[0.1]",
  "x-circle": "bg-[#FF6B6B]/[0.1]",
};

interface StatCardProps {
  stat: StatData;
  delay?: number;
}

export default function StatCard({ stat, delay = 0 }: StatCardProps) {
  return (
    <div
      className="group animate-[fadeUp_0.5s_ease_both] rounded-2xl border border-ov/[0.1] bg-card shadow-card p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-ov/[0.18] hover:bg-card-hover hover:shadow-[0_16px_40px_-16px_rgba(139,107,255,0.35)] sm:p-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-fraunces text-xl font-semibold text-strong sm:text-2xl">
            {stat.value}
          </p>
          <p className="mt-1 text-[12.5px] text-muted">{stat.label}</p>
        </div>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${iconBg[stat.icon]}`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`h-4.5 w-4.5 ${iconColor[stat.icon]}`}>
            {icons[stat.icon]}
          </svg>
        </div>
      </div>
    </div>
  );
}