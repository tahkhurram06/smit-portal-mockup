import GradientButton from "@/components/ui/GradientButton";

interface ProfileHeaderProps {
  name: string;
  initials: string;
  /** Profile photo URL. Falls back to the initials avatar when empty. */
  photoUrl?: string | null;
  roleLabel?: string;
  onEdit?: () => void;
  delay?: number;
}

// Fine film grain over the banner so the aurora doesn't band on big screens.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ProfileHeader({
  name,
  initials,
  photoUrl,
  roleLabel = "Student",
  onEdit,
  delay = 0,
}: ProfileHeaderProps) {
  return (
    <section
      className="relative animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* banner: the login page's aurora, drifting slowly */}
      <div className="relative h-32 overflow-hidden bg-panel sm:h-40 lg:h-44" aria-hidden="true">
        <span className="absolute -left-[8%] top-[-60%] h-[160%] w-[38%] rounded-full bg-[#3FE6D6]/[0.34] blur-[70px] motion-safe:animate-[drift1_16s_ease-in-out_infinite]" />
        <span className="absolute left-[28%] top-[-30%] h-[150%] w-[40%] rounded-full bg-[#8B6BFF]/[0.42] blur-[70px] motion-safe:animate-[drift2_20s_ease-in-out_infinite]" />
        <span className="absolute -right-[6%] top-[-40%] h-[160%] w-[34%] rounded-full bg-[#FF57A8]/[0.3] blur-[70px] motion-safe:animate-[drift3_18s_ease-in-out_infinite]" />
        <span
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="pointer-events-none absolute left-[-60%] top-0 h-full w-2/5 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent motion-safe:animate-[sweep_7s_ease-in-out_0.8s_infinite]" />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-page/60 to-transparent" />
        <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="relative px-5 pb-6 sm:px-7">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:gap-5">
          {/* avatar */}
          <div className="relative shrink-0 self-start">
            <div
              className="rounded-full p-[3px] shadow-[0_18px_40px_-14px_rgba(139,107,255,0.6)]"
              style={{ backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)" }}
            >
              <div className="rounded-full bg-panel p-1">
                {photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoUrl}
                    alt={`${name}'s profile photo`}
                    className="h-[88px] w-[88px] rounded-full object-cover sm:h-[104px] sm:w-[104px]"
                  />
                ) : (
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[28px] font-bold text-[#0A0A12] sm:h-[104px] sm:w-[104px] sm:text-[32px]">
                    {initials}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* name + role */}
          <div className="min-w-0 flex-1 sm:pb-1">
            <h1 className="font-fraunces text-[26px] font-semibold leading-tight tracking-tight text-strong sm:text-[32px]">
              {name}
            </h1>
            <div className="mt-2">
              <span className="inline-flex items-center whitespace-nowrap rounded-full border border-ov/[0.15] bg-ov/[0.04] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-muted">
                {roleLabel}
              </span>
            </div>
          </div>

          <GradientButton onClick={onEdit} className="w-full sm:w-auto">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
              <path
                d="M16.5 3.5a2 2 0 0 1 3 3L7 19l-4 1 1-4Z"
                stroke="#0A0A12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit profile
          </GradientButton>
        </div>
      </div>
    </section>
  );
}