"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Mail, Phone, Receipt, Sparkles } from 'lucide-react';
import { MOCK_CLIENTS, MOCK_INVOICES } from '@/lib/mock-data';

interface ClientHistoryModalProps {
  clientId: string;
}

export default function ClientHistoryModal({ clientId }: ClientHistoryModalProps) {
  const router = useRouter();
  const parsedId = Number(clientId);
  const client = MOCK_CLIENTS.find((item) => item.id === parsedId);

  if (!client) {
    return (
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
                return;
              }

              router.push('/clients');
            }}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-[#282828] dark:bg-[#111111] dark:text-[#ededed] dark:hover:bg-[#111]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Client History</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-[#a3a3a3]">Client not found.</p>
      </section>
    );
  }

  const clientInvoices = MOCK_INVOICES.filter((invoice) => invoice.client === client.name);

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      <header className="border-b border-slate-100 pb-5 dark:border-[#282828]">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
                return;
              }

              router.push('/clients');
            }}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-[#282828] dark:bg-[#111111] dark:text-[#ededed] dark:hover:bg-[#111]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">{client.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-[#a3a3a3]">
          <span className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium text-slate-700 dark:border-[#282828] dark:bg-[#030303] dark:text-[#d4d4d4]">
            <Phone className="mr-2 h-3.5 w-3.5 text-slate-400 dark:text-[#737373]" /> {client.phone}
          </span>
          <span className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium text-slate-700 dark:border-[#282828] dark:bg-[#030303] dark:text-[#d4d4d4]">
            <Mail className="mr-2 h-3.5 w-3.5 text-slate-400 dark:text-[#737373]" /> {client.email}
          </span>
        </div>
      </header>

      <article className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-[#282828] dark:bg-[#1f1f1f]">
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 dark:border-[#282828] dark:bg-[#111111]">
            <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-white">Loyalty Points</p>
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-[#737373]">Available for next checkout</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">{client.points}</span>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#555]">Points</p>
        </div>
      </article>

      <div>
        <h4 className="mb-3 flex items-center text-sm font-bold text-slate-800 dark:text-white">
          <FileText className="mr-2 h-4 w-4 text-slate-400 dark:text-[#737373]" /> Billing History
        </h4>

        {clientInvoices.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-[#282828] dark:bg-[#1f1f1f]">
            <table className="w-full border-collapse text-left">
              <thead className="border-b border-slate-100 bg-slate-50/80 dark:border-[#282828] dark:bg-[#111111]">
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#737373]">
                  <th className="px-5 py-4">Invoice ID</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {clientInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50 dark:border-[#282828] dark:hover:bg-[#282828]/50">
                    <td className="px-5 py-4 text-sm font-bold text-slate-800 dark:text-[#ededed]">{invoice.id}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-[#a3a3a3]">{invoice.date}</td>
                    <td className="px-5 py-4 text-right text-sm font-bold text-slate-800 dark:text-white">Rs. {invoice.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white py-12 text-center shadow-sm dark:border-[#282828] dark:bg-[#1f1f1f]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-slate-50 dark:border-[#282828] dark:bg-[#111111]">
              <Receipt className="h-8 w-8 text-slate-300 dark:text-[#555]" />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-[#ededed]">No invoices found</p>
            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-[#737373]">This client has not made any purchases yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}