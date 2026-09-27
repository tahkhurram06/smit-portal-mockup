"use client";

import { useState } from "react";
import { paymentBatches } from "@/lib/adminPaymentData";
import PaymentBatchRow from "./PaymentBatchRow";

type StatusFilter = "all" | "Paid" | "Pending" | "Overdue";

const filters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Paid", label: "Paid" },
  { value: "Pending", label: "Pending" },
  { value: "Overdue", label: "Overdue" },
];

export default function PaymentBatchList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [pageByBatch, setPageByBatch] = useState<Record<number, number>>({});
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  return (
    <div>
      {/* filter chips */}
      <div
        className="mb-4 flex flex-wrap animate-[fadeUp_0.5s_ease_both] gap-2"
        style={{ animationDelay: "0.02s" }}
      >
        {filters.map((f) => {
          const active = f.value === statusFilter;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setStatusFilter(f.value);
                setPageByBatch({});
              }}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-200 active:scale-[0.97] ${
                active
                  ? f.value === "Overdue"
                    ? "border-[#FF6B6B]/50 bg-[#FF6B6B]/[0.14] text-red"
                    : f.value === "Pending"
                      ? "border-[#FFC65A]/50 bg-[#FFC65A]/[0.14] text-amber"
                      : f.value === "Paid"
                        ? "border-[#3FE6D6]/50 bg-[#3FE6D6]/[0.14] text-teal"
                        : "border-[#8B6BFF]/50 bg-[#8B6BFF]/[0.14] text-purple-soft"
                  : "border-ov/[0.13] bg-ov/[0.04] text-muted hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]">
        {paymentBatches.map((batch, i) => (
          <PaymentBatchRow
            key={batch.title}
            batch={batch}
            open={openIndex === i}
            onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            page={pageByBatch[i] ?? 0}
            onPageChange={(page) => setPageByBatch((prev) => ({ ...prev, [i]: page }))}
            statusFilter={statusFilter}
            delay={0.06 + i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}