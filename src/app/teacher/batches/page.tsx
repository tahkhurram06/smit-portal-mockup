// Intended path: app/teacher/batches/page.tsx
"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import BatchesTopbar from "@/components/Teacher/Batches/BatchesTopbar";
import BatchCard from "@/components/Teacher/Batches/BatchCard";
import { activeBatch } from "@/lib/batchData";

export default function BatchesPage() {
  // Requires the updated useAuthGuard(allowedRole) — see hooks/useAuthGuard.ts.
  const checked = useAuthGuard("teacher");

  if (!checked) return null;

  return (
    <main className="min-h-screen bg-page px-4 py-6 text-fg sm:px-8 sm:py-8 lg:px-12">
      <BatchesTopbar />

      <div className="mx-auto max-w-2xl">
        <p className="mb-4 animate-[fadeUp_0.4s_ease_both] text-[12.5px] font-medium uppercase tracking-wide text-muted">
          My batches
        </p>

        <div className="flex flex-col gap-4">
          <BatchCard batch={activeBatch} delay={0.08} />
        </div>
      </div>
    </main>
  );
}