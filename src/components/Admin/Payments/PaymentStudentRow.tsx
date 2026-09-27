import { StudentVoucher, initials, formatAmount } from "@/lib/adminPaymentData";
import StatusBadge from "@/components/ui/StatusBadge";

interface PaymentStudentRowProps {
  voucher: StudentVoucher;
  delay?: number;
}

export default function PaymentStudentRow({ voucher, delay = 0 }: PaymentStudentRowProps) {
  const overdue = voucher.status === "Overdue";

  return (
    <div
      className={`group flex items-center gap-3 rounded-[10px] px-2 py-2.5 transition-colors duration-200 motion-safe:animate-[fadeUp_0.3s_ease_both] hover:bg-ov/[0.05] ${
        overdue ? "bg-[#FF6B6B]/[0.03]" : ""
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] font-sora text-[10.5px] font-bold text-[#0A0A12] transition-transform duration-200 group-hover:scale-105">
        {initials(voucher.name)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-strong">{voucher.name}</p>
        <p className="truncate text-[11.5px] text-dim">
          {voucher.roll} · {formatAmount(voucher.amount)}
        </p>
      </div>

      <div className="hidden shrink-0 text-[11.5px] text-muted transition-colors duration-200 group-hover:text-fg-soft sm:block">
        Due {voucher.dueDate}
      </div>

      <StatusBadge status={voucher.status} />

      {overdue && (
        <button
          type="button"
          className="hidden shrink-0 cursor-pointer items-center gap-1 rounded-[8px] border border-[#FF6B6B]/30 bg-[#FF6B6B]/[0.08] px-2.5 py-1.5 text-[11px] font-medium text-red opacity-0 transition-all duration-200 hover:border-[#FF6B6B]/50 hover:bg-[#FF6B6B]/[0.14] group-hover:opacity-100 sm:flex"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
            <path
              d="M4 4h16v16H4zM4 4l8 9 8-9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Remind
        </button>
      )}
    </div>
  );
}