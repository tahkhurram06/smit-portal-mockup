import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import TeacherList from "@/components/Admin/Teachers/TeacherList";

export default function AdminTeachersPage() {
  return (
    <AdminLayout
      activeHref="/admin/teachers"
      pageTitle="Teachers"
      pageSubtitle="Trainers and the batches they run"
    >
      <TeacherList />
    </AdminLayout>
  );
}