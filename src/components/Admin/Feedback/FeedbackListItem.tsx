import { FeedbackPreview, feedbackAccent } from "@/lib/adminData";

interface FeedbackListItemProps {
  item: FeedbackPreview;
  delay?: number;
  /** Pass to make the row actionable (the full inbox). Omit for a read-only teaser. */
  onToggleStatus?: () => void;
}

function daysAgoLabel(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export default function FeedbackListItem({ item, delay = 0, onToggleStatus }: FeedbackListItemProps) {
  const accent = feedbackAccent(item.type);
  const isNew = item.status === "New";

  return (
    <div
      className="group flex items-start gap-3 rounded-[12px] border border-ov/[0.07] bg-ov/[0.02] p-3 transition-all duration-200 motion-safe:animate-[fadeUp_0.35s_ease_both] hover:border-ov/[0.15] hover:bg-ov/[0.05]"
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className="mt-0.5 inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide"
        style={{
          borderColor: `${accent.accent}40`,
          backgroundColor: `${accent.accent}14`,
          color: accent.text,
        }}
      >
        {accent.label}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="truncate text-[13px] font-medium text-strong transition-colors duration-200 group-hover:text-teal">
            {item.author}
          </p>
          {isNew && (
            <span className="inline-flex shrink-0 items-center rounded-full border border-[#3FE6D6]/40 bg-[#3FE6D6]/[0.08] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-teal">
              New
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-muted">{item.message}</p>
        <p className="mt-1 text-[11px] text-dim">
          {item.images > 0 && `${item.images} image${item.images > 1 ? "s" : ""} · `}
          {daysAgoLabel(item.daysAgo)}
        </p>
      </div>

      {onToggleStatus && (
        <button
          type="button"
          onClick={onToggleStatus}
          className="shrink-0 cursor-pointer whitespace-nowrap rounded-[8px] border border-ov/[0.13] bg-ov/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-muted opacity-0 outline-none transition-all duration-200 hover:border-ov/[0.24] hover:bg-ov/[0.08] hover:text-strong focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 group-hover:opacity-100 sm:opacity-0"
        >
          {isNew ? "Mark reviewed" : "Mark new"}
        </button>
      )}
    </div>
  );
}