"use client";

import { useEffect, useRef, useState } from "react";

interface CopyButtonProps {
  value: string;
  /** "icon" is the small inline button; "primary" is the full-width gradient CTA. */
  variant?: "icon" | "primary";
  label?: string;
  className?: string;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API unavailable (e.g. opened over plain http on a LAN) — use a hidden textarea.
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyIcons({ copied, className }: { copied: boolean; className: string }) {
  return (
    <span className={`relative block shrink-0 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`absolute inset-0 h-full w-full transition-all duration-200 ${
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`absolute inset-0 h-full w-full transition-all duration-200 ${
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function CopyButton({
  value,
  variant = "icon",
  label = "Copy voucher ID",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleClick() {
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  const announce = (
    <span className="sr-only" aria-live="polite">
      {copied ? "Copied to clipboard" : ""}
    </span>
  );

  if (variant === "primary") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[length:220%_auto] bg-[position:0%_center] px-4 py-3 font-sora text-sm font-semibold text-[#0A0A12] shadow-[0_12px_30px_-12px_rgba(139,107,255,0.55)] transition-[background-position,box-shadow,transform] duration-500 hover:bg-[position:100%_center] hover:shadow-[0_14px_34px_-10px_rgba(139,107,255,0.7)] active:translate-y-px active:scale-[0.994] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${className}`}
        style={{
          backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
        }}
      >
        <CopyIcons copied={copied} className="h-4 w-4" />
        {copied ? "Copied" : label}
        {announce}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={copied ? "Copied" : label}
      className={`shrink-0 cursor-pointer rounded-md p-1 outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
        copied ? "text-teal" : "text-muted hover:bg-ov/[0.08] hover:text-strong"
      } ${className}`}
    >
      <CopyIcons copied={copied} className="h-3.5 w-3.5" />
      {announce}
    </button>
  );
}