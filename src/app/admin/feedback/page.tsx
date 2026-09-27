import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import FeedbackList from "@/components/Admin/Feedback/FeedbackList";

export default function AdminFeedbackPage() {
  return (
    <AdminLayout
      activeHref="/admin/feedback"
      pageTitle="Feedback inbox"
      pageSubtitle="Bug reports, ideas and notes from students and teachers"
    >
      <FeedbackList />
    </AdminLayout>
  );
}