"use client";

interface StudentPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rangeStart: number;
  rangeEnd: number;
  total: number;
}

// Builds ["1", "2", "…", "21"] style lists, always keeping first, last,
// current, and one neighbour on each side.
function getPageList(page: number, totalPages: number): (number | "ellipsis")[] {
  const current = page + 1;
  const pages = new Set<number>([1, totalPages, current, current - 1, current + 1]);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("ellipsis");
    result.push(p);
  });
  return result;
}

export default function StudentPagination({
  page,
  totalPages,
  onPageChange,
  rangeStart,
  rangeEnd,
  total,
}: StudentPaginationProps) {
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;
  const pageList = getPageList(page, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ov/[0.08] px-4 py-3.5 sm:px-5">
      <p className="text-[12px] text-dim">
        Showing <span className="font-medium text-fg-soft">{rangeStart}–{rangeEnd}</span> of{" "}
        <span className="font-medium text-fg-soft">{total}</span> records
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(page - 1)}
          className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border border-ov/[0.1] bg-ov/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-fg-soft transition-all duration-200 hover:border-ov/[0.2] hover:bg-ov/[0.075] hover:text-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Previous</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 sm:hidden">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          {pageList.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`e-${i}`} className="px-1.5 text-[12px] text-dim">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p - 1)}
                aria-current={p === page + 1 ? "page" : undefined}
                className={`h-7 min-w-7 cursor-pointer rounded-[8px] px-1.5 text-[12.5px] font-medium transition-colors duration-200 ${
                  p === page + 1
                    ? "bg-gradient-to-r from-[#3FE6D6] to-[#8B6BFF] text-[#0A0A12]"
                    : "text-fg-soft hover:bg-ov/[0.08]"
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(page + 1)}
          className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border border-ov/[0.1] bg-ov/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-fg-soft transition-all duration-200 hover:border-ov/[0.2] hover:bg-ov/[0.075] hover:text-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 sm:hidden">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}