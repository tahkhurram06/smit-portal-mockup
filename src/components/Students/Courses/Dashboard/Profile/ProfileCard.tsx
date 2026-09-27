import type { ReactNode } from "react";

type Tone = "teal" | "purple";

const toneStyles: Record<Tone, { box: string; icon: string }> = {
  teal: { box: "bg-[#3FE6D6]/[0.1]", icon: "text-teal" },
  purple: { box: "bg-[#8B6BFF]/[0.1]", icon: "text-purple" },
};

interface ProfileCardProps {
  title: string;
  /** SVG children (paths, rects). The wrapper <svg> and its sizing are handled here. */
  icon: ReactNode;
  tone?: Tone;
  /** Anything to show on the right of the title, e.g. a count pill. */
  trailing?: ReactNode;
  delay?: number;
  children: ReactNode;
}

export default function ProfileCard({
  title,
  icon,
  tone = "teal",
  trailing,
  delay = 0,
  children,
}: ProfileCardProps) {
  const styles = toneStyles[tone];

  return (
    <section
      className="animate-[fadeUp_0.5s_ease_both] rounded-2xl border border-ov/[0.1] bg-card shadow-card p-5 backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18] sm:p-6"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.box}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`h-[18px] w-[18px] ${styles.icon}`}
            >
              {icon}
            </svg>
          </div>
          <h2 className="truncate font-fraunces text-lg font-semibold text-strong">{title}</h2>
        </div>
        {trailing}
      </div>

      {children}
    </section>
  );
}