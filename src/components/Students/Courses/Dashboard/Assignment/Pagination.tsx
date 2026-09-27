"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rangeStart: number;
  rangeEnd: number;
  total: number;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  rangeStart,
  rangeEnd,
  total,
}: PaginationProps) {
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ov/[0.08] px-4 py-3.5 sm:px-5">
      <p className="text-[12px] text-dim">
        Showing{" "}
        <span className="font-medium text-fg-soft">
          {rangeStart}–{rangeEnd}
        </span>{" "}
        of <span className="font-medium text-fg-soft">{total}</span>
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(page - 1)}
          className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border border-ov/[0.1] bg-ov/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-fg-soft transition-all duration-200 hover:border-ov/[0.2] hover:bg-ov/[0.075] hover:text-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ov/[0.1] disabled:hover:bg-ov/[0.04] disabled:hover:text-fg-soft"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1.5" role="tablist" aria-label="Pages">
          {Array.from({ length: totalPages }, (_, i) => {
            const active = i === page;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Page ${i + 1}`}
                onClick={() => onPageChange(i)}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  active
                    ? "w-5 bg-gradient-to-r from-[#3FE6D6] to-[#8B6BFF]"
                    : "w-1.5 bg-ov/[0.15] hover:bg-ov/[0.3]"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(page + 1)}
          className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border border-ov/[0.1] bg-ov/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-fg-soft transition-all duration-200 hover:border-ov/[0.2] hover:bg-ov/[0.075] hover:text-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ov/[0.1] disabled:hover:bg-ov/[0.04] disabled:hover:text-fg-soft"
        >
          <span className="hidden sm:inline">Next</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}