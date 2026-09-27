export default function SSOButtons() {
  return (
    <>
      <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wide text-muted before:h-px before:flex-1 before:bg-ov/[0.13] after:h-px after:flex-1 after:bg-ov/[0.13]">
        or continue with
      </div>

      <div className="mb-1 flex gap-2.5">
        <button
          type="button"
          className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-ov/[0.13] bg-ov/[0.04] px-2 py-2.5 text-xs font-medium text-muted transition-colors duration-200 hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong sm:text-[12.5px]"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-ov/[0.13] bg-ov/[0.04] px-2 py-2.5 text-xs font-medium text-muted transition-colors duration-200 hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong sm:text-[12.5px]"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
            <rect x="2" y="2" width="9" height="9" fill="#F35325" />
            <rect x="13" y="2" width="9" height="9" fill="#81BC06" />
            <rect x="2" y="13" width="9" height="9" fill="#05A6F0" />
            <rect x="13" y="13" width="9" height="9" fill="#FFBA08" />
          </svg>
          Microsoft
        </button>
      </div>
    </>
  );
}