"use client";

import { useState } from "react";
import { batches } from "@/lib/adminBatchData";
import BatchRow from "./BatchRow";

export default function BatchList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [pageByBatch, setPageByBatch] = useState<Record<number, number>>({});

  return (
    <div className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]">
      {batches.map((batch, i) => (
        <BatchRow
          key={batch.title}
          batch={batch}
          open={openIndex === i}
          onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
          page={pageByBatch[i] ?? 0}
          onPageChange={(page) => setPageByBatch((prev) => ({ ...prev, [i]: page }))}
          delay={0.06 + i * 0.05}
        />
      ))}
    </div>
  );
}