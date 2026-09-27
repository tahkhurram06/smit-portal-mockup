"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  label?: string;
}

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setWidth(value));
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted">{label}</span>
          <span className="text-xs font-semibold text-strong">{value}% Completed</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ov/[0.08]">
        <div
          className="h-full rounded-full bg-[length:220%_auto] transition-[width] duration-1000 ease-out motion-safe:animate-[barShimmer_3.5s_linear_infinite]"
          style={{
            width: `${width}%`,
            backgroundImage:
              "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
          }}
        />
      </div>
    </div>
  );
}