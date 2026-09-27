type Status =
  | "Paid"
  | "Pending"
  | "Overdue"
  | "Enrolled"
  | "Submitted"
  | "Graded"
  | "Live"
  | "Closed"
  | "Present"
  | "Absent"
  | "Leave"
  | "Passed"
  | "Failed"
  | "Approved"
  | "Not Submitted"
  | "Not Approved"
  | "Late Submitted"
  // Added for the admin Batches page
  | "Active"
  | "Completed"
  | "Freezed";

interface StatusBadgeProps {
  status: Status;
}

const styles: Record<Status, string> = {
  Paid: "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]",
  Enrolled: "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]",
  Graded: "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]",
  Present: "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]",
  Passed: "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]",
  Approved: "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]",
  Active: "border-[#3FE6D6]/40 text-teal bg-[#3FE6D6]/[0.08]",
  Pending: "border-[#FFC65A]/40 text-amber bg-[#FFC65A]/[0.08]",
  Leave: "border-[#FFC65A]/40 text-amber bg-[#FFC65A]/[0.08]",
  Freezed: "border-[#FFC65A]/40 text-amber bg-[#FFC65A]/[0.08]",
  Submitted: "border-[#8B6BFF]/40 text-purple-soft bg-[#8B6BFF]/[0.08]",
  Live: "border-[#FF57A8]/40 text-pink bg-[#FF57A8]/[0.08] motion-safe:animate-[pulseSoft_2s_ease-in-out_infinite]",
  Overdue: "border-[#FF6B6B]/40 text-red bg-[#FF6B6B]/[0.08]",
  Absent: "border-[#FF6B6B]/40 text-red bg-[#FF6B6B]/[0.08]",
  Failed: "border-[#FF6B6B]/40 text-red bg-[#FF6B6B]/[0.08]",
  "Not Approved": "border-[#FF6B6B]/40 text-red bg-[#FF6B6B]/[0.08]",
  "Late Submitted": "border-[#FFC65A]/40 text-amber bg-[#FFC65A]/[0.08]",
  "Not Submitted": "border-ov/[0.15] text-muted bg-ov/[0.04]",
  Closed: "border-ov/[0.15] text-muted bg-ov/[0.04]",
  Completed: "border-ov/[0.15] text-muted bg-ov/[0.04]",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide transition-colors duration-200 ${styles[status]}`}
    >
      {status}
    </span>
  );
}