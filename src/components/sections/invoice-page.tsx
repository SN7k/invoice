import Link from 'next/link';
import { FileText, MoreVertical, Plus } from 'lucide-react';
import { MOCK_INVOICES } from '@/lib/mock-data';

export default function InvoicePage() {
  return (
    <section className="relative h-full animate-in fade-in duration-300">
      <div className="space-y-3 md:hidden">
        {MOCK_INVOICES.map((invoice) => (
          <article key={invoice.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-[#111111] dark:text-indigo-400">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-[#ededed]">{invoice.id}</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-[#ededed]">Rs. {invoice.amount.toLocaleString()}</p>
                </div>
                <p className="truncate text-sm font-medium text-slate-600 dark:text-[#d4d4d4]">{invoice.client}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-[#a3a3a3]">{invoice.date}</p>
              </div>

              <button className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-[#282828] dark:hover:text-indigo-400">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f] md:block">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-slate-100 bg-slate-50/80 dark:border-[#282828] dark:bg-[#111111]">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#737373]">
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICES.map((invoice) => (
              <tr key={invoice.id} className="cursor-pointer border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-[#282828] dark:hover:bg-[#282828]/50">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800 dark:text-[#ededed]">{invoice.id}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-[#d4d4d4]">{invoice.client}</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-[#a3a3a3]">{invoice.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-[#ededed]">Rs. {invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-[#282828] dark:hover:text-indigo-400">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href="/invoices/create"
        className="fixed bottom-10 right-10 z-40 hidden items-center justify-center rounded-full bg-blue-600 p-4 text-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-all hover:-translate-y-1 hover:scale-105 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 md:flex lg:bottom-12 lg:right-14"
        title="New Invoice"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </Link>
    </section>
  );
}