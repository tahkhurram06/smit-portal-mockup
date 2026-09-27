export type FeeStatus = "Paid" | "Pending" | "Overdue";

export interface FeeRow {
  month: string;
  amount: number;
  type: string;
  dueDate: string; // "08 Oct 2026"
  voucherId: string;
  status: FeeStatus;
}

// Newest first. Voucher IDs follow the pattern YYYYMM + roll number.
export const feeRows: FeeRow[] = [
  { month: "Oct 2026", amount: 1000, type: "Monthly", dueDate: "08 Oct 2026", voucherId: "202610494544", status: "Pending" },
  { month: "Sep 2026", amount: 1000, type: "Monthly", dueDate: "08 Sep 2026", voucherId: "202609494544", status: "Paid" },
  { month: "Aug 2026", amount: 1000, type: "Monthly", dueDate: "14 Aug 2026", voucherId: "202608494544", status: "Paid" },
  { month: "Jul 2026", amount: 1000, type: "Monthly", dueDate: "08 Jul 2026", voucherId: "202607494544", status: "Paid" },
  { month: "Jun 2026", amount: 1000, type: "Monthly", dueDate: "14 Jun 2026", voucherId: "202606494544", status: "Paid" },
  { month: "May 2026", amount: 1000, type: "Monthly", dueDate: "08 May 2026", voucherId: "202605494544", status: "Paid" },
  { month: "Apr 2026", amount: 1000, type: "Monthly", dueDate: "08 Apr 2026", voucherId: "202604494544", status: "Paid" },
  { month: "Mar 2026", amount: 1000, type: "Monthly", dueDate: "11 Mar 2026", voucherId: "202603494544", status: "Paid" },
  { month: "Feb 2026", amount: 1000, type: "Monthly", dueDate: "08 Feb 2026", voucherId: "202602494544", status: "Paid" },
  { month: "Jan 2026", amount: 1000, type: "Monthly", dueDate: "08 Jan 2026", voucherId: "202601494544", status: "Paid" },
  { month: "Dec 2025", amount: 1000, type: "Monthly", dueDate: "12 Dec 2025", voucherId: "202512494544", status: "Paid" },
  { month: "Nov 2025", amount: 1000, type: "Monthly", dueDate: "14 Nov 2025", voucherId: "202511494544", status: "Paid" },
  { month: "Oct 2025", amount: 1000, type: "Monthly", dueDate: "08 Oct 2025", voucherId: "202510494544", status: "Paid" },
  { month: "Sep 2025", amount: 1000, type: "Monthly", dueDate: "19 Sep 2025", voucherId: "202509494544", status: "Paid" },
];

export function formatAmount(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-US")}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Whole days from today until a "08 Oct 2026" style date. Negative once it has passed. */
export function daysUntil(dueDate: string): number {
  const [day, month, year] = dueDate.split(" ");
  const due = new Date(Number(year), MONTHS.indexOf(month), Number(day));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - today.getTime()) / 86_400_000);
}

// Course-wide totals — same pattern as assignmentSummary / quizSummary.
// Stat cards always reflect every voucher, independent of pagination.
export const paymentSummary = {
  totalPaid: feeRows.filter((r) => r.status === "Paid").reduce((sum, r) => sum + r.amount, 0),
  paidCount: feeRows.filter((r) => r.status === "Paid").length,
  pendingCount: feeRows.filter((r) => r.status !== "Paid").length,
};

// The voucher the student should pay next: the first unpaid one, else the latest.
export const currentVoucher: FeeRow = feeRows.find((r) => r.status !== "Paid") ?? feeRows[0];

export interface PayStep {
  before: string;
  bold?: string;
  after?: string;
}

export const howToPaySteps: PayStep[] = [
  { before: "Open the JazzCash app" },
  { before: "Tap ", bold: "More" },
  { before: "Go to the ", bold: "Education", after: " tab" },
  { before: "Tap ", bold: "Universities" },
  { before: "Select ", bold: "Saylani Education", after: " from the list" },
  { before: "Paste your ", bold: "Voucher ID" },
  { before: "Pay your fee" },
];