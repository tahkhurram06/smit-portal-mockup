import { FeeRow, formatAmount, daysUntil } from "@/lib/paymentData";
import StatusBadge from "@/components/ui/StatusBadge";
import CopyButton from "@/components/ui/CopyButton";

interface CurrentVoucherCardProps {
  voucher: FeeRow;
  delay?: number;
}

function dueLabel(days: number): string {
  if (days < 0) return `overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`;
  if (days === 0) return "due today";
  if (days === 1) return "due tomorrow";
  return `in ${days} days`;
}

export default function CurrentVoucherCard({ voucher, delay = 0 }: CurrentVoucherCardProps) {
  const paid = voucher.status === "Paid";
  const days = daysUntil(voucher.dueDate);

  return (
    <div
      className="group relative animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card-hi shadow-card p-5 pl-6 backdrop-blur-xl transition-all duration-300 hover:border-ov/[0.18] hover:bg-card-hover hover:shadow-[0_20px_50px_-20px_rgba(139,107,255,0.4)] sm:p-6 sm:pl-7"
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#3FE6D6] to-[#8B6BFF]"
        aria-hidden="true"
      />

      {/* sheen sweep on hover */}
      <div className="pointer-events-none absolute left-[-60%] top-0 h-full w-2/5 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-safe:group-hover:animate-[sweep_1.4s_ease-in-out]" />

      {/* row layout deferred from md to lg — a fixed 320px column at 768px left too little room for the main content */}
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8 xl:flex-col xl:items-stretch xl:gap-0">
        <div className="min-w-0">
          <div className="mb-3.5 flex items-center justify-between gap-3 lg:justify-start xl:justify-between">
            <span className="text-[12.5px] font-medium text-muted">Current voucher</span>
            <StatusBadge status={voucher.status} />
          </div>

          <p className="font-fraunces text-lg font-semibold text-strong">{voucher.month}</p>
          <p className="mt-1 font-fraunces text-3xl font-semibold leading-tight text-strong sm:text-[32px]">
            {formatAmount(voucher.amount)}
          </p>
          <p className="mt-1.5 text-[12.5px] text-muted">
            {voucher.type} · Due {voucher.dueDate}
            {!paid && (
              <span className={`font-medium ${days < 0 ? "text-red" : "text-amber"}`}>
                {" "}· {dueLabel(days)}
              </span>
            )}
          </p>
        </div>

        <div className="lg:w-[320px] lg:shrink-0 xl:mt-5 xl:w-full">
          <div className="flex items-center justify-between gap-2 rounded-[11px] border border-ov/[0.13] bg-ov/[0.045] px-3 py-2.5 transition-colors duration-200 hover:border-ov/[0.22]">
            <div className="min-w-0">
              <span className="mb-0.5 block text-[10.5px] font-medium uppercase tracking-wide text-dim">
                Voucher ID
              </span>
              <span className="block select-all truncate font-mono text-[13.5px] text-strong">
                {voucher.voucherId}
              </span>
            </div>
            <CopyButton value={voucher.voucherId} />
          </div>

          {!paid && (
            <div className="mt-3">
              <CopyButton value={voucher.voucherId} variant="primary" label="Copy voucher ID" />
            </div>
          )}

          <p className="mt-3 text-[11.5px] leading-relaxed text-dim">
            {paid
              ? "This voucher is paid. Nothing is due right now."
              : "Paste it in JazzCash at step 6 to pay this month's fee."}
          </p>
        </div>
      </div>
    </div>
  );
}