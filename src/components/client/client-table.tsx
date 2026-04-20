import Link from 'next/link';
import { MOCK_CLIENTS } from '@/lib/mock-data';

export default function ClientTable() {
  return (
    <section className="relative h-full">
      <div className="space-y-3 md:hidden">
        {MOCK_CLIENTS.map((client) => (
          <article key={client.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-800 dark:text-[#ededed]">{client.name}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-[#a3a3a3]">{client.email}</p>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-[#d4d4d4]">{client.phone}</p>
              </div>

              <Link href={`/clients/${client.id}`} className="shrink-0 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-[#111111] dark:text-indigo-400 dark:hover:bg-[#282828]">
                History
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs dark:border-[#282828]">
              <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-[#111111]">
                <p className="text-slate-500 dark:text-[#a3a3a3]">Invoices</p>
                <p className="mt-0.5 font-semibold text-slate-800 dark:text-[#ededed]">{client.invoices}</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-[#111111]">
                <p className="text-slate-500 dark:text-[#a3a3a3]">Total Spent</p>
                <p className="mt-0.5 font-semibold text-slate-800 dark:text-[#ededed]">Rs. {client.spent.toLocaleString()}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f] md:block">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-slate-100 bg-slate-50/80 dark:border-[#282828] dark:bg-[#111111]">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#737373]">
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Total Invoices</th>
              <th className="px-6 py-4">Total Spent</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CLIENTS.map((client) => (
              <tr key={client.id} className="cursor-pointer border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-[#282828] dark:hover:bg-[#282828]/50">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800 dark:text-[#ededed]">{client.name}</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-[#a3a3a3]">{client.email}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-[#d4d4d4]">{client.phone}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-[#d4d4d4]">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 dark:border dark:border-[#282828] dark:bg-[#111111] dark:text-[#d4d4d4]">
                    {client.invoices}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-[#ededed]">Rs. {client.spent.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/clients/${client.id}`} className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    View History
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}