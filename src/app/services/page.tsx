import AdminShell from '@/components/layout/admin-shell';
import ServicePage from '@/components/sections/service-page';

export default function ServicesRoutePage() {
  return (
    <AdminShell title="Services">
      <ServicePage />
    </AdminShell>
  );
}