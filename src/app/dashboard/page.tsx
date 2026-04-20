import AdminShell from '@/components/layout/admin-shell';
import DashboardPage from '@/components/sections/dashboard-page';

export default function DashboardRoutePage() {
  return (
    <AdminShell title="Dashboard">
      <DashboardPage />
    </AdminShell>
  );
}