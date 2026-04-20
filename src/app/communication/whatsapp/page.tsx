import { Clock, MessageCircle, Search } from 'lucide-react';
import AdminShell from '@/components/layout/admin-shell';

export default function WhatsAppRoutePage() {
  return (
    <AdminShell title="WhatsApp Communication">
      <section className="max-w-2xl space-y-8 animate-in fade-in duration-300">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 capitalize dark:text-white">whatsapp Integration</h2>
          <p className="mt-1 text-slate-500 dark:text-[#a3a3a3]">Configure your communication channels.</p>
        </div>

        <article className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-colors dark:border-[#282828] dark:bg-[#0a0a0a]">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
            <MessageCircle className="h-12 w-12" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">Connect WhatsApp Business</h3>
          <p className="mx-auto mb-8 max-w-sm text-slate-500 dark:text-[#a3a3a3]">
            Link your WhatsApp account to automatically send invoices directly to your clients.
          </p>

          <div className="mx-auto mb-8 flex h-56 w-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 dark:border-[#282828] dark:bg-[#030303]">
            <Search className="mb-2 h-8 w-8 text-slate-300 dark:text-[#555]" />
            <span className="text-sm font-medium text-slate-400 dark:text-[#737373]">Scan QR Code</span>
          </div>

          <div className="inline-flex items-center rounded-xl border border-yellow-100 bg-yellow-50 px-5 py-2.5 text-sm font-bold text-yellow-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
            <Clock className="mr-2 h-4 w-4" /> Status: Not Connected
          </div>
        </article>
      </section>
    </AdminShell>
  );
}