"use client";

import { FeedbackType, feedbackTypes } from "@/lib/feedbackData";

const icons: Record<FeedbackType, React.ReactNode> = {
  bug: (
    <>
      <path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="7.5" y="9" width="9" height="10.5" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 10v9.5M4 13h3.5M16.5 13H20M5 7.5 8 10M19 7.5 16 10M5 19.5l3-2.5M19 19.5l-3-2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  idea: (
    <>
      <path
        d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 19.5h4M10.8 22h2.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  other: (
    <path
      d="M8 10h8M8 14h5M6 4h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-4 3v-3H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

interface FeedbackTypePickerProps {
  value: FeedbackType | null;
  onChange: (type: FeedbackType) => void;
  /** Shows a red outline on the tiles when the person tried to send without picking one. */
  invalid?: boolean;
  /** id of the element that labels this group. */
  labelledBy?: string;
}

export default function FeedbackTypePicker({
  value,
  onChange,
  invalid = false,
  labelledBy,
}: FeedbackTypePickerProps) {
  return (
    <div role="group" aria-labelledby={labelledBy} className="grid grid-cols-3 gap-2 sm:gap-2.5">
      {feedbackTypes.map((t, i) => {
        const selected = t.key === value;

        return (
          <button
            key={t.key}
            type="button"
            aria-pressed={selected}
            data-autofocus={i === 0 ? "" : undefined}
            onClick={() => onChange(t.key)}
            className={`group relative flex cursor-pointer flex-col items-center gap-1.5 rounded-[14px] border px-2 py-3.5 font-sora text-[12.5px] font-semibold outline-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 sm:gap-2 sm:py-4 sm:text-[13px] ${
              selected
                ? "text-strong"
                : `text-muted hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong ${
                    invalid
                      ? "border-[#FF6B6B]/40 bg-[#FF6B6B]/[0.04]"
                      : "border-ov/[0.13] bg-ov/[0.04]"
                  }`
            }`}
            style={
              {
                "--accent": t.accent,
                "--accent-text": t.text,
                ...(selected
                  ? {
                      borderColor: `${t.accent}80`,
                      backgroundColor: `${t.accent}17`,
                      boxShadow: `0 0 0 3.5px ${t.accent}26, 0 12px 28px -14px ${t.accent}66`,
                    }
                  : {}),
              } as React.CSSProperties
            }
          >
            {/* selected check */}
            {selected && (
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full motion-safe:animate-[popIn_0.3s_ease_both]"
                style={{ backgroundColor: t.accent }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
                  <path d="m5 13 4 4L19 7" stroke="#0A0A12" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`h-5 w-5 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-[22px] sm:w-[22px] ${
                selected ? "[color:var(--accent-text)]" : "group-hover:[color:var(--accent-text)]"
              }`}
            >
              {icons[t.key]}
            </svg>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}