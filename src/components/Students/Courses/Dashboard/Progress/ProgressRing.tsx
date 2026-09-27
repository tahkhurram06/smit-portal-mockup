"use client";

import { useEffect, useState } from "react";

interface ProgressRingProps {
  percent: number;
  color: string;
  /** seconds to wait before the ring starts filling */
  delay?: number;
}

const DURATION_MS = 1000;

export default function ProgressRing({ percent, color, delay = 0 }: ProgressRingProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(percent);
      return;
    }

    let raf = 0;
    let startTime = 0;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min((now - startTime) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(percent * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [percent, delay]);

  return (
    <div
      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(${color} ${value}%, color-mix(in srgb, var(--ov) 8%, transparent) 0)`,
      }}
    >
      <div
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-panel text-[10px] font-semibold tabular-nums"
        style={{ color }}
      >
        {Math.round(value)}
      </div>
    </div>
  );
}