import { batches } from "@/lib/adminBatchData";

export type VoucherStatus = "Paid" | "Pending" | "Overdue";

export interface StudentVoucher {
  name: string;
  roll: number;
  amount: number;
  dueDate: string; // "08 Oct 2026"
  status: VoucherStatus;
}

export interface PaymentBatch {
  title: string;
  batchNumber: number;
  teacher: string;
  campus: string;
  vouchers: StudentVoucher[];
}

const AMOUNTS = [1000, 1000, 1200, 1000, 1500];

/** Deterministic mock voucher per enrolled student — same seed pattern as adminBatchData. */
function makeVouchers(seed: number, studentCount: number): StudentVoucher[] {
  const list: StudentVoucher[] = [];
  for (let i = 0; i < studentCount; i++) {
    const cycle = (i + seed) % 11;
    const status: VoucherStatus = cycle === 0 ? "Overdue" : cycle <= 2 ? "Pending" : "Paid";
    list.push({
      name: `Student ${i + 1}`, // overwritten below from the real roster
      roll: 494500 + seed * 100 + i,
      amount: AMOUNTS[seed % AMOUNTS.length],
      dueDate: status === "Paid" ? "08 Sep 2026" : "08 Oct 2026",
      status,
    });
  }
  return list;
}

// Reuse the real roster names from adminBatchData so the two pages agree.
export const paymentBatches: PaymentBatch[] = batches.map((batch, seed) => {
  const vouchers = makeVouchers(seed, batch.students.length);
  batch.students.forEach((s, i) => {
    vouchers[i].name = s.name;
    vouchers[i].roll = s.roll;
  });

  return {
    title: batch.title,
    batchNumber: batch.batchNumber,
    teacher: batch.teacher,
    campus: batch.campus,
    vouchers,
  };
});

export function formatAmount(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-US")}`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

export function collectionStats(vouchers: StudentVoucher[]) {
  const paid = vouchers.filter((v) => v.status === "Paid").length;
  const overdue = vouchers.filter((v) => v.status === "Overdue").length;
  const collected = vouchers.filter((v) => v.status === "Paid").reduce((sum, v) => sum + v.amount, 0);
  const expected = vouchers.reduce((sum, v) => sum + v.amount, 0);
  return { paid, overdue, collected, expected, total: vouchers.length };
}

// Portal-wide totals — same pattern as feeSummary / overviewStats in adminData.ts.
export const paymentOverview = (() => {
  const all = paymentBatches.flatMap((b) => b.vouchers);
  const stats = collectionStats(all);
  return {
    collected: stats.collected,
    expected: stats.expected,
    overdueCount: stats.overdue,
    collectionRate: Math.round((stats.paid / stats.total) * 100),
  };
})();