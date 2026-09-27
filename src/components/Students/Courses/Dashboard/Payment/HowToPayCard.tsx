"use client";

import { useState } from "react";
import { howToPaySteps } from "@/lib/paymentData";

interface HowToPayCardProps {
  delay?: number;
}

export default function HowToPayCard({ delay = 0 }: HowToPayCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors duration-300 ${
        open
          ? "border-[#8B6BFF]/25 bg-[#8B6BFF]/[0.06]"
          : "border-ov/[0.1] bg-card shadow-card hover:border-ov/[0.18]"
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="how-to-pay-steps"
        className="group flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left outline-none transition-colors duration-200 hover:bg-ov/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2 sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B6BFF]/[0.14] text-purple transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
              <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M11 18.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-strong sm:text-sm">
              Pay your fee with JazzCash
            </p>
            <p className="mt-0.5 text-[12.5px] text-muted">{howToPaySteps.length} steps</p>
          </div>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:text-strong ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id="how-to-pay-steps"
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="grid gap-5 border-t border-[#8B6BFF]/[0.18] px-4 pb-5 pt-4 sm:grid-cols-[minmax(0,1fr)_190px] sm:gap-6 sm:px-5 sm:pb-6">
            <ol className="flex flex-col gap-3">
              {howToPaySteps.map((step, i) => {
                const last = i === howToPaySteps.length - 1;
                return (
                  <li
                    key={i}
                    className={`group/step flex items-center gap-3 text-[13px] text-purple-soft transition-transform duration-200 hover:translate-x-0.5 ${
                      open ? "motion-safe:animate-[fadeUp_0.35s_ease_both]" : ""
                    }`}
                    style={{ animationDelay: `${0.06 + i * 0.05}s` }}
                  >
                    <span
                      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border font-sora text-[11px] font-semibold transition-transform duration-200 group-hover/step:scale-110 ${
                        last
                          ? "border-transparent text-[#0A0A12]"
                          : "border-[#8B6BFF]/35 bg-[#8B6BFF]/[0.16] text-strong"
                      }`}
                      style={
                        last
                          ? { backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)" }
                          : undefined
                      }
                    >
                      {i + 1}
                    </span>
                    <span>
                      {step.before}
                      {step.bold && <b className="font-semibold text-strong">{step.bold}</b>}
                      {step.after}
                    </span>
                  </li>
                );
              })}
            </ol>

            <button
              type="button"
              tabIndex={open ? 0 : -1}
              aria-label="Watch the payment walkthrough"
              className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-ov/[0.1] bg-panel outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8B6BFF]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 sm:aspect-[9/13] sm:self-start"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 20%, rgba(139,107,255,0.35), transparent 55%), radial-gradient(circle at 20% 90%, rgba(63,230,214,0.25), transparent 55%)",
              }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full shadow-[0_10px_24px_-8px_rgba(139,107,255,0.7)] transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)" }}
              >
                <svg viewBox="0 0 24 24" fill="#0A0A12" className="ml-0.5 h-[18px] w-[18px]">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <span className="text-[11.5px] font-medium text-fg-soft">Watch the walkthrough</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}