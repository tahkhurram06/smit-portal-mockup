import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import BatchList from "@/components/Admin/Batches/BatchList";

export default function AdminBatchesPage() {
  return (
    <AdminLayout
      activeHref="/admin/batches"
      pageTitle="Batches"
      pageSubtitle="Every batch, with its students inside"
    >
      <BatchList />
    </AdminLayout>
  );
}