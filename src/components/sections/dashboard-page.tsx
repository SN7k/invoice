"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart3, FileText, LineChart, Plus, TrendingUp, Users, Wallet } from 'lucide-react';
import { getLocalInvoices, subscribeLocalInvoices, type LocalInvoiceRecord } from '@/lib/demo-invoices';

type SalesPoint = {
  day: string;
  value: number;
};

const SALES_TREND_7D: SalesPoint[] = [
  { day: 'Mon', value: 35 },
  { day: 'Tue', value: 48 },
  { day: 'Wed', value: 30 },
  { day: 'Thu', value: 62 },
  { day: 'Fri', value: 56 },
  { day: 'Sat', value: 70 },
  { day: 'Sun', value: 64 },
];

const SALES_TREND_30D: SalesPoint[] = [
  { day: 'D1', value: 24 },
  { day: 'D2', value: 30 },
  { day: 'D3', value: 27 },
  { day: 'D4', value: 36 },
  { day: 'D5', value: 32 },
  { day: 'D6', value: 39 },
  { day: 'D7', value: 35 },
  { day: 'D8', value: 43 },
  { day: 'D9', value: 40 },
  { day: 'D10', value: 46 },
  { day: 'D11', value: 44 },
  { day: 'D12', value: 52 },
  { day: 'D13', value: 49 },
  { day: 'D14', value: 56 },
  { day: 'D15', value: 53 },
  { day: 'D16', value: 61 },
  { day: 'D17', value: 57 },
  { day: 'D18', value: 64 },
  { day: 'D19', value: 60 },
  { day: 'D20', value: 68 },
  { day: 'D21', value: 63 },
  { day: 'D22', value: 70 },
  { day: 'D23', value: 66 },
  { day: 'D24', value: 72 },
  { day: 'D25', value: 69 },
  { day: 'D26', value: 74 },
  { day: 'D27', value: 71 },
  { day: 'D28', value: 76 },
  { day: 'D29', value: 73 },
  { day: 'D30', value: 80 },
];

export default function DashboardPage() {
  const [trendRange, setTrendRange] = useState<'7d' | '30d'>('7d');
  const [invoices, setInvoices] = useState<LocalInvoiceRecord[]>([]);
  const activeTrendData = trendRange === '7d' ? SALES_TREND_7D : SALES_TREND_30D;

  useEffect(() => {
    const loadInvoices = () => setInvoices(getLocalInvoices());
    loadInvoices();

    return subscribeLocalInvoices(loadInvoices);
  }, []);

  const totalSales = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    [invoices]
  );

  const totalInvoices = invoices.length;
  const pendingInvoices = Math.floor(totalInvoices * 0.2);
  const recentInvoices = invoices.slice(0, 5);

  return (
    <section className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#111111]">
          <div className="relative flex h-32 items-stretch justify-center gap-3 overflow-hidden border-b border-slate-100 bg-slate-50 p-4 dark:border-[#282828] dark:bg-[#030303]">
            <div className="flex w-1/4 flex-col gap-2">
              <div className="h-1/2 w-full rounded-md bg-slate-200/50 transition-transform duration-500 group-hover:scale-105 dark:bg-[#282828]" />
              <div className="h-1/2 w-full rounded-md bg-slate-200/50 transition-transform duration-500 delay-75 group-hover:scale-105 dark:bg-[#282828]" />
            </div>
            <div className="relative w-2/4 rounded-lg border border-slate-200 bg-slate-200/80 shadow-sm transition-transform duration-500 group-hover:-translate-y-1 dark:border-[#282828] dark:bg-[#1a1a1a]">
              <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-[#282828]">
                <Wallet className="h-4 w-4 text-blue-500 dark:text-indigo-400" />
              </div>
              <div className="absolute bottom-6 left-3 h-1.5 w-1/2 rounded-full bg-slate-300 dark:bg-[#333]" />
              <div className="absolute bottom-3 left-3 right-3 h-1.5 rounded-full bg-slate-300 dark:bg-[#333]" />
            </div>
            <div className="flex w-1/4 flex-col gap-2">
              <div className="h-2/3 w-full rounded-md bg-slate-200/50 transition-transform duration-500 delay-100 group-hover:scale-105 dark:bg-[#282828]" />
              <div className="flex h-1/3 w-full items-center justify-center rounded-md bg-slate-200/50 transition-transform duration-500 group-hover:scale-105 dark:bg-[#282828]">
                <Plus className="h-3 w-3 text-slate-400 dark:text-[#555]" />
              </div>
            </div>
            <div className="absolute left-[25%] top-1/2 flex h-16 w-14 -translate-x-1/2 -translate-y-1/2 -rotate-12 transform flex-col gap-1.5 rounded-lg border border-slate-200 bg-white p-2 shadow-lg transition-all duration-500 group-hover:rotate-0 group-hover:scale-110 dark:border-[#282828] dark:bg-[#111111]">
              <div className="h-1/2 w-full rounded border border-blue-500/20 bg-blue-500/10 dark:border-indigo-500/30 dark:bg-indigo-500/20" />
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 dark:bg-[#282828]" />
              <div className="h-1.5 w-2/3 rounded-full bg-slate-100 dark:bg-[#282828]" />
            </div>
          </div>
          <div className="bg-white p-5 dark:bg-[#111111]">
            <div className="mb-2 flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-[#a3a3a3]">Total Sales</p>
              <span className="inline-flex items-center rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <TrendingUp className="mr-1 h-3 w-3" strokeWidth={2.5} /> +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">Rs. {totalSales.toLocaleString()}</h3>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#111111]">
          <div className="relative flex h-32 flex-col items-center justify-center gap-2 overflow-hidden border-b border-slate-100 bg-slate-50 p-4 dark:border-[#282828] dark:bg-[#030303]">
            <div className="flex h-8 w-3/4 items-center gap-2 rounded-lg border border-slate-200 bg-slate-200/80 px-3 shadow-sm transition-transform duration-500 group-hover:translate-x-2 dark:border-[#282828] dark:bg-[#1a1a1a]">
              <div className="h-3 w-3 rounded-full border border-purple-300 bg-purple-200 dark:border-purple-500/30 dark:bg-purple-500/20" />
              <div className="h-1.5 w-1/2 rounded-full bg-slate-300 dark:bg-[#333]" />
            </div>
            <div className="flex h-8 w-3/4 items-center gap-2 rounded-lg border border-transparent bg-slate-200/50 px-3 transition-transform duration-500 delay-75 group-hover:translate-x-1 dark:border-[#282828]/50 dark:bg-[#111]">
              <div className="h-3 w-3 rounded-full border border-amber-300 bg-amber-200 dark:border-amber-500/30 dark:bg-amber-500/20" />
              <div className="h-1.5 w-1/3 rounded-full bg-slate-300 dark:bg-[#333]" />
            </div>
            <div className="flex h-8 w-3/4 items-center gap-2 rounded-lg border border-transparent bg-slate-200/50 px-3 transition-transform duration-500 delay-100 group-hover:translate-x-2 dark:border-[#282828]/50 dark:bg-[#111]">
              <div className="h-3 w-3 rounded-full border border-green-300 bg-green-200 dark:border-emerald-500/30 dark:bg-emerald-500/20" />
              <div className="h-1.5 w-2/5 rounded-full bg-slate-300 dark:bg-[#333]" />
            </div>
            <div className="absolute -right-4 bottom-2 flex h-16 w-16 rotate-12 transform items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 dark:border-[#282828] dark:bg-[#111111]">
              <FileText className="h-6 w-6 text-violet-500 dark:text-violet-400" />
            </div>
          </div>
          <div className="bg-white p-5 dark:bg-[#111111]">
            <div className="mb-2 flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-[#a3a3a3]">Total Invoices</p>
              <span className="inline-flex items-center rounded-md border border-amber-100 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                {pendingInvoices} Pending
              </span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">{totalInvoices}</h3>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#111111]">
          <div className="relative flex h-32 items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50 p-4 dark:border-[#282828] dark:bg-[#030303]">
            <div className="grid w-3/4 grid-cols-2 gap-3">
              <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-200/80 px-2 shadow-sm transition-transform duration-500 group-hover:-translate-y-1 dark:border-[#282828] dark:bg-[#1a1a1a]">
                <div className="h-5 w-5 rounded-full border border-orange-300 bg-orange-200 dark:border-orange-500/30 dark:bg-orange-500/20" />
                <div className="h-1.5 w-1/2 rounded-full bg-slate-300 dark:bg-[#333]" />
              </div>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-200/80 px-2 shadow-sm transition-transform duration-500 group-hover:translate-y-1 dark:border-[#282828] dark:bg-[#1a1a1a]">
                <div className="h-5 w-5 rounded-full border border-blue-300 bg-blue-200 dark:border-blue-500/30 dark:bg-blue-500/20" />
                <div className="h-1.5 w-1/2 rounded-full bg-slate-300 dark:bg-[#333]" />
              </div>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-200/80 px-2 shadow-sm transition-transform duration-500 delay-75 group-hover:-translate-y-1 dark:border-[#282828] dark:bg-[#1a1a1a]">
                <div className="h-5 w-5 rounded-full border border-emerald-300 bg-emerald-200 dark:border-emerald-500/30 dark:bg-emerald-500/20" />
                <div className="h-1.5 w-1/2 rounded-full bg-slate-300 dark:bg-[#333]" />
              </div>
              <div className="flex h-10 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-200/50 transition-transform duration-500 delay-75 group-hover:scale-105 dark:border-[#282828] dark:bg-[#111]">
                <Users className="h-4 w-4 text-slate-400 dark:text-[#555]" />
              </div>
            </div>
          </div>
          <div className="bg-white p-5 dark:bg-[#111111]">
            <div className="mb-2 flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-[#a3a3a3]">Total Clients</p>
              <span className="inline-flex items-center rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                +3 This week
              </span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">42</h3>
          </div>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="min-h-[400px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
          <h4 className="mb-6 flex items-center text-lg font-semibold text-slate-800 dark:text-white">
            <Activity className="mr-2 h-5 w-5 text-blue-500 dark:text-indigo-400" /> Recent Activity
          </h4>
          <div className="space-y-5">
            {recentInvoices.slice(0, 4).map((invoice) => (
              <div key={invoice.id} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-blue-50 dark:border-[#282828] dark:bg-[#030303]">
                  <FileText className="h-5 w-5 text-blue-500 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-[#ededed]">Invoice {invoice.id} created</p>
                  <p className="mt-0.5 text-xs text-slate-400 dark:text-[#737373]">Client: {invoice.client}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="min-h-[300px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="flex items-center text-lg font-semibold text-slate-800 dark:text-white">
              <LineChart className="mr-2 h-5 w-5 text-blue-500 dark:text-indigo-400" /> Sales Trend
            </h4>
            <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1 text-xs dark:border-[#282828] dark:bg-[#1f1f1f]">
              <button
                type="button"
                onClick={() => setTrendRange('7d')}
                className={`rounded-md px-2 py-1 transition-colors ${
                  trendRange === '7d'
                    ? 'bg-slate-100 font-semibold text-slate-700 dark:bg-[#282828] dark:text-[#ededed]'
                    : 'font-medium text-slate-500 hover:text-slate-700 dark:text-[#a3a3a3] dark:hover:text-[#ededed]'
                }`}
              >
                Last 7 days
              </button>
              <button
                type="button"
                onClick={() => setTrendRange('30d')}
                className={`rounded-md px-2 py-1 transition-colors ${
                  trendRange === '30d'
                    ? 'bg-slate-100 font-semibold text-slate-700 dark:bg-[#282828] dark:text-[#ededed]'
                    : 'font-medium text-slate-500 hover:text-slate-700 dark:text-[#a3a3a3] dark:hover:text-[#ededed]'
                }`}
              >
                30 days
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50/80 p-3 dark:bg-[#1f1f1f]">
            <div className="flex h-[250px] items-end gap-1.5">
              {activeTrendData.map((point, index) => (
                <div key={point.day} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <div className="flex h-[205px] w-full items-end">
                    <div className="w-full rounded-t-md bg-gradient-to-t from-blue-500/30 to-blue-500/70 dark:from-indigo-500/25 dark:to-indigo-400/70" style={{ height: `${point.value}%` }} />
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-[#a3a3a3]">
                    {trendRange === '7d' || index % 5 === 0 || index === activeTrendData.length - 1 ? point.day : ''}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-[#a3a3a3]">
              {trendRange === '7d' ? 'Daily view: Mon to Sun' : 'Daily view: Day 1 to Day 30'}
            </p>
          </div>
        </section>

        <section className="min-h-[400px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
          <h4 className="mb-6 flex items-center text-lg font-semibold text-slate-800 dark:text-white">
            <BarChart3 className="mr-2 h-5 w-5 text-rose-500 dark:text-rose-400" /> Top Salon Services
          </h4>

          <div className="h-[300px] rounded-xl bg-slate-50/80 p-3 dark:bg-[#1f1f1f]">
            <div className="space-y-5">
              {[
                { label: 'Haircut & Styling', value: 92 },
                { label: 'Hair Color / Highlights', value: 78 },
                { label: 'Facial & Cleanup', value: 84 },
                { label: 'Manicure & Pedicure', value: 69 },
                { label: 'Hair Spa & Treatment', value: 74 },
              ].map((service) => (
                <div key={service.label}>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-[#a3a3a3]">
                    <span>{service.label}</span>
                    <span>{service.value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-200 dark:bg-[#282828]">
                    <div className="h-3 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-500 dark:from-rose-400 dark:to-fuchsia-500" style={{ width: `${service.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-800 dark:text-white">Quick Actions & Recent Invoices</h4>
          <Link href="/invoices" className="text-sm font-medium text-blue-600 hover:underline dark:text-indigo-400">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500 dark:border-[#282828] dark:text-[#a3a3a3]">
                <th className="px-2 pb-3 font-medium">Invoice ID</th>
                <th className="px-2 pb-3 font-medium">Client</th>
                <th className="px-2 pb-3 font-medium">Date</th>
                <th className="px-2 pb-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50 dark:border-[#282828] dark:hover:bg-[#282828]/50">
                  <td className="px-2 py-4 text-sm font-medium text-slate-800 dark:text-[#ededed]">{invoice.id}</td>
                  <td className="px-2 py-4 text-sm text-slate-600 dark:text-[#d4d4d4]">{invoice.client}</td>
                  <td className="px-2 py-4 text-sm text-slate-500 dark:text-[#a3a3a3]">{invoice.date}</td>
                  <td className="px-2 py-4 text-sm font-semibold text-slate-800 dark:text-[#ededed]">Rs. {invoice.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}