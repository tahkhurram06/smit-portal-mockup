export default function QuizInfoBanner() {
  return (
    <div className="animate-[fadeUp_0.5s_ease_both] rounded-2xl border border-[#8B6BFF]/25 bg-[#8B6BFF]/[0.06] p-4 backdrop-blur-xl sm:p-5">
      <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-strong">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-purple">
          <path
            d="M12 9v4M12 17h.01M10.3 3.9 2.5 17a1.8 1.8 0 0 0 1.5 2.7h16a1.8 1.8 0 0 0 1.5-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Important information
      </div>
      <ul className="list-disc space-y-1.5 pl-[18px] text-[12.5px] leading-relaxed text-purple-soft">
        <li>Once started, quizzes must be completed in one session</li>
        <li>Switching tabs or leaving the window will be recorded</li>
        <li>Ensure you have a stable internet connection</li>
        <li>The quiz will open in fullscreen mode</li>
      </ul>
    </div>
  );
}