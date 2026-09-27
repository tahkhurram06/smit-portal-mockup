import { AdminStatData } from "@/lib/adminData";

const icons: Record<AdminStatData["icon"], React.ReactNode> = {
  students: (
    <>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="7.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.5 19c-.2-2.4 1.5-4.3 3.8-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  teachers: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 12v5c0 1.4 2.7 3 6 3s6-1.6 6-3v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  batches: (
    <>
      <path d="M12 4 3 9l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m6 12 6 3.5 6-3.5M6 16l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  overdue: (
    <>
      <path d="M12 3 2 20h20L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9.5v4M12 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
};

const iconColor: Record<AdminStatData["icon"], string> = {
  students: "text-purple",
  teachers: "text-purple",
  batches: "text-teal",
  overdue: "text-amber",
};

const iconBg: Record<AdminStatData["icon"], string> = {
  students: "bg-[#8B6BFF]/[0.1]",
  teachers: "bg-[#8B6BFF]/[0.1]",
  batches: "bg-[#3FE6D6]/[0.1]",
  overdue: "bg-[#FFC65A]/[0.1]",
};

interface AdminStatCardProps {
  stat: AdminStatData;
  delay?: number;
}

export default function AdminStatCard({ stat, delay = 0 }: AdminStatCardProps) {
  return (
    <div
      className="group animate-[fadeUp_0.5s_ease_both] rounded-2xl border border-ov/[0.1] bg-card shadow-card p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-ov/[0.18] hover:bg-card-hover hover:shadow-[0_16px_40px_-16px_rgba(255,87,168,0.28)] sm:p-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-fraunces text-xl font-semibold text-strong sm:text-2xl">{stat.value}</p>
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