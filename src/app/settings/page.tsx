import { Home, FileText } from 'lucide-react';
import AdminShell from '@/components/layout/admin-shell';

export default function SettingsRoutePage() {
  return (
    <AdminShell title="Settings">
      <section className="max-w-3xl space-y-8 animate-in fade-in duration-300">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">Settings</h2>
          <p className="mt-1 text-slate-500 dark:text-[#a3a3a3]">Manage your account settings and preferences.</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-colors dark:border-[#282828] dark:bg-[#0a0a0a]">
          <h3 className="mb-5 flex items-center border-b border-slate-100 pb-3 text-xl font-bold text-slate-800 dark:border-[#282828] dark:text-white">
            <Home className="mr-2 h-5 w-5 text-slate-400 dark:text-[#737373]" /> Business Info
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Shop/Business Name</label>
              <input type="text" defaultValue="My Awesome Shop" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-blue-200 focus:ring-2 dark:border-[#282828] dark:bg-[#030303]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Business Phone</label>
              <input type="text" defaultValue="+91 9876543210" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-blue-200 focus:ring-2 dark:border-[#282828] dark:bg-[#030303]" />
            </div>
          </div>

          <h3 className="mb-5 mt-8 flex items-center border-b border-slate-100 pb-3 text-xl font-bold text-slate-800 dark:border-[#282828] dark:text-white">
            <FileText className="mr-2 h-5 w-5 text-slate-400 dark:text-[#737373]" /> Billing Settings
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Currency</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-blue-200 focus:ring-2 dark:border-[#282828] dark:bg-[#030303]">
                <option>INR (Rs.)</option>
                <option>USD ($)</option>
                <option>EUR (EUR)</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Default GST / Tax (%)</label>
              <input type="number" defaultValue="18" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-blue-200 focus:ring-2 dark:border-[#282828] dark:bg-[#030303]" />
            </div>
          </div>
          <button className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500">
            Save Changes
          </button>
        </div>
      </section>
    </AdminShell>
  );
}