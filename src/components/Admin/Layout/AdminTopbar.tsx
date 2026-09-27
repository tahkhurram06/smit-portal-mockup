"use client";

interface AdminTopbarProps {
  pageTitle: string;
  onOpenMobileMenu: () => void;
}

export default function AdminTopbar({ pageTitle, onOpenMobileMenu }: AdminTopbarProps) {
  return (
    <div className="mb-5 flex animate-[fadeUp_0.5s_ease_0.05s_both] items-center justify-between gap-3 sm:mb-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-ov/[0.1] text-muted transition-colors duration-200 hover:border-ov/[0.2] hover:text-strong lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center text-[12.5px] text-muted">
          <span className="hidden shrink-0 sm:inline">Admin</span>
          <svg viewBox="0 0 24 24" fill="none" className="mx-1.5 hidden h-3 w-3 shrink-0 sm:inline">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="truncate font-semibold text-fg">{pageTitle}</span>
        </nav>
      </div>
    </div>
  );
}