import { AttendanceSummary } from "@/lib/attendanceData";

interface AttendanceOverviewCardProps {
  data: AttendanceSummary;
  delay?: number;
}

export default function AttendanceOverviewCard({ data, delay = 0 }: AttendanceOverviewCardProps) {
  const percent = Math.round((data.present / data.totalClasses) * 100);
  const healthy = percent >= 75;

  return (
    <div
      className={`group relative animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border bg-card shadow-card p-5 backdrop-blur-xl transition-colors duration-300 hover:bg-card-hover sm:p-6 ${
        healthy ? "border-ov/[0.1] hover:border-ov/[0.18]" : "border-[#FF6B6B]/[0.25] hover:border-[#FF6B6B]/40"
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* sheen sweep on hover */}
      <div className="pointer-events-none absolute left-[-60%] top-0 h-full w-2/5 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-safe:group-hover:animate-[sweep_1.4s_ease-in-out]" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-[220px] flex-1">
          <h3 className="mb-1.5 font-fraunces text-lg font-semibold text-strong sm:text-xl">
            Attendance overview
          </h3>
          <p className={`text-[13px] leading-relaxed ${healthy ? "text-muted" : "text-red"}`}>
            {healthy
              ? "You're doing great — keep it above 75% to stay on track."
              : "Your attendance is below 75%. Please improve."}
          </p>
        </div>
        <span
          className="font-fraunces text-3xl font-semibold sm:text-4xl"
          style={{ color: healthy ? "var(--teal)" : "var(--red)" }}
        >
          {percent}%
        </span>
      </div>

      <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ov/[0.08]">
        <div
          className="h-full rounded-full bg-[length:220%_auto] transition-[width] duration-700 ease-out motion-safe:animate-[barShimmer_3.5s_linear_infinite]"
          style={{
            width: `${percent}%`,
            backgroundImage: healthy
              ? "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)"
              : "linear-gradient(100deg, #FF9A6B, #FF6B6B 60%, #FF3D6B)",
          }}
        />
      </div>
    </div>
  );
}