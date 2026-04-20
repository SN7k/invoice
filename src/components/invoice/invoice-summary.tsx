const rows = [
  { id: 'INV-001', client: 'Anita', amount: 1200, status: 'Paid' },
  { id: 'INV-002', client: 'Rohit', amount: 850, status: 'Pending' }
];

export default function InvoiceSummary() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-[#111111]">
          <tr>
            <th className="px-4 py-3 font-medium text-slate-700 dark:text-[#a3a3a3]">Invoice</th>
            <th className="px-4 py-3 font-medium text-slate-700 dark:text-[#a3a3a3]">Client</th>
            <th className="px-4 py-3 font-medium text-slate-700 dark:text-[#a3a3a3]">Amount</th>
            <th className="px-4 py-3 font-medium text-slate-700 dark:text-[#a3a3a3]">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/50 dark:border-[#282828] dark:hover:bg-[#282828]/50">
              <td className="px-4 py-3 text-slate-800 dark:text-[#ededed]">{row.id}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-[#d4d4d4]">{row.client}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-[#d4d4d4]">Rs. {row.amount}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-[#d4d4d4]">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}