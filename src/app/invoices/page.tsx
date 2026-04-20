import AdminShell from '@/components/layout/admin-shell';
import InvoicePage from '@/components/sections/invoice-page';

export default function InvoicesRoutePage() {
  return (
    <AdminShell title="Invoices">
      <InvoicePage />
    </AdminShell>
  );
}