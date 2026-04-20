import ClientHistoryModal from '@/components/client/client-history-modal';
import AdminShell from '@/components/layout/admin-shell';

interface ClientHistoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientHistoryRoutePage({ params }: ClientHistoryPageProps) {
  const { id } = await params;

  return (
    <AdminShell title={`Client History: ${id}`}>
      <ClientHistoryModal clientId={id} />
    </AdminShell>
  );
}