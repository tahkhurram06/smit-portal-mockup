interface ExploreMoreCardProps {
  delay?: number;
}

export default function ExploreMoreCard({ delay = 0 }: ExploreMoreCardProps) {
  return (
    <button
      type="button"
      className="group w-full animate-[fadeUp_0.5s_ease_both] cursor-pointer rounded-[20px] border border-dashed border-ov/[0.12] p-7 text-center transition-all duration-200 hover:border-[#8B6BFF]/40 hover:bg-ov/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-ov/[0.05] transition-all duration-200 group-hover:scale-110 group-hover:bg-[#8B6BFF]/[0.14]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4.5 w-4.5 text-muted transition-colors duration-200 group-hover:text-purple"
        >
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <p className="mb-0.5 text-[13px] font-medium text-strong">Explore more courses</p>
      <p className="text-xs text-dim transition-colors duration-200 group-hover:text-muted">
        Browse the SMIT catalog to enroll in a new track.
      </p>
    </button>
  );
}