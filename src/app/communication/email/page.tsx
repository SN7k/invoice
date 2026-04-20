import { CheckCircle2, Mail } from 'lucide-react';
import AdminShell from '@/components/layout/admin-shell';

export default function EmailRoutePage() {
  return (
    <AdminShell title="Email Communication">
      <section className="max-w-2xl space-y-8 animate-in fade-in duration-300">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 capitalize dark:text-white">email Integration</h2>
          <p className="mt-1 text-slate-500 dark:text-[#a3a3a3]">Configure your communication channels.</p>
        </div>

        <article className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-colors dark:border-[#282828] dark:bg-[#0a0a0a]">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Mail className="h-10 w-10" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">Email Configuration</h3>
          <p className="mx-auto mb-8 max-w-sm text-slate-500 dark:text-[#a3a3a3]">Set up your SMTP credentials to automatically send invoices via email.</p>

          <div className="mx-auto mb-8 max-w-md space-y-5 text-left">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Sender Email</label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-blue-200 focus:ring-2 dark:border-[#282828] dark:bg-[#030303]"
                placeholder="billing@yourcompany.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">SMTP Server</label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-blue-200 focus:ring-2 dark:border-[#282828] dark:bg-[#030303]"
                placeholder="smtp.gmail.com"
              />
            </div>
            <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500">
              Save Configuration
            </button>
          </div>

          <div className="inline-flex items-center rounded-xl border border-green-100 bg-green-50 px-5 py-2.5 text-sm font-bold text-green-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Status: Active
          </div>
        </article>
      </section>
    </AdminShell>
  );
}