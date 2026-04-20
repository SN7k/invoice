import AdminShell from '@/components/layout/admin-shell';
import ClientPage from '@/components/sections/client-page';

export default function ClientsRoutePage() {
  return (
    <AdminShell title="Clients">
      <ClientPage />
    </AdminShell>
  );
}