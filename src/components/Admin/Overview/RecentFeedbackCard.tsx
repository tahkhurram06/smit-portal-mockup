import Link from "next/link";
import { FeedbackPreview } from "@/lib/adminData";
import FeedbackListItem from "@/components/Admin/Feedback/FeedbackListItem";

interface RecentFeedbackCardProps {
  items: FeedbackPreview[];
  delay?: number;
}

export default function RecentFeedbackCard({ items, delay = 0 }: RecentFeedbackCardProps) {
  return (
    <div
      className="animate-[fadeUp_0.5s_ease_both] overflow-hidden rounded-2xl border border-ov/[0.1] bg-card shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-ov/[0.18]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <h2 className="font-fraunces text-lg font-semibold text-strong">Recent feedback</h2>
        <Link
          href="/admin/feedback"
          className="group flex shrink-0 cursor-pointer items-center gap-1 rounded-[6px] text-[12.5px] font-medium text-purple-soft outline-none transition-colors duration-200 hover:text-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
        >
          View all
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="px-5 pb-6 text-center text-[12.5px] text-dim sm:px-6">No feedback yet.</p>
      ) : (
        <div className="flex flex-col gap-2 px-3 pb-3 sm:px-4 sm:pb-4">
          {items.map((item, i) => (
            <FeedbackListItem key={item.id} item={item} delay={0.05 + i * 0.05} />
          ))}
        </div>
      )}
    </div>
  );
}