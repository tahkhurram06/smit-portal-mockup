"use client";

import { useEffect, useState } from "react";
import { FeeSummary } from "@/lib/adminData";
import { formatAmount } from "@/lib/paymentData";

interface FeeProgressCardProps {
  data: FeeSummary;
  delay?: number;
}

export default function FeeProgressCard({ data, delay = 0 }: FeeProgressCardProps) {
  const percent = Math.min(100, Math.round((data.collected / data.expected) * 100));
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setWidth(percent));
    return () => cancelAnimationFrame(raf);
  }, [percent]);

  return (
    <div
      className="group relative animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card p-5 backdrop-blur-xl transition-all duration-300 hover:border-ov/[0.18] hover:bg-card-hover sm:p-6"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* sheen sweep on hover */}
      <div className="pointer-events-none absolute left-[-60%] top-0 h-full w-2/5 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-safe:group-hover:animate-[sweep_1.4s_ease-in-out]" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <span className="text-[12.5px] font-medium text-muted">Fee collected this month</span>
        <span className="font-fraunces text-xl font-semibold text-teal sm:text-2xl">
          {formatAmount(data.collected)}
        </span>
      </div>

      <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ov/[0.08]">
        <div
          className="h-full rounded-full bg-[length:220%_auto] transition-[width] duration-700 ease-out motion-safe:animate-[barShimmer_3.5s_linear_infinite]"
          style={{
            width: `${width}%`,
            backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
          }}
        />
      </div>

      <p className="relative mt-2.5 text-[12px] text-dim">
        {percent}% of {formatAmount(data.expected)} expected
      </p>
    </div>
  );
}