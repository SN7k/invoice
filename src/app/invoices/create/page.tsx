import AdminShell from '@/components/layout/admin-shell';
import InvoiceForm from '@/components/invoice/invoice-form';

export default function CreateInvoiceRoutePage() {
  return (
    <AdminShell title="Create Invoice">
      <InvoiceForm />
    </AdminShell>
  );
}