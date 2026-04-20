'use client';

import { useEffect, useState } from 'react';
import { Box, CheckCircle2, Gift, Mail, Phone, Receipt, Smartphone, Sparkles, User, Plus } from 'lucide-react';
import { MOCK_CLIENTS } from '@/lib/mock-data';

interface InvoiceLine {
  desc: string;
  price: string;
  qty: number;
}

export default function InvoiceForm() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState<InvoiceLine[]>([{ desc: '', price: '', qty: 1 }]);
  const [usePoints, setUsePoints] = useState(false);

  const matchedClient = MOCK_CLIENTS.find((client) => client.phone === phone);

  useEffect(() => {
    if (matchedClient) {
      setName(matchedClient.name);
      setEmail(matchedClient.email);
      return;
    }

    if (phone.length === 0) {
      setName('');
      setEmail('');
      setUsePoints(false);
    }
  }, [matchedClient, phone]);

  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const availablePoints = matchedClient ? matchedClient.points : 0;
  const maxDiscount = Math.min(subtotal, availablePoints);
  const discountAmount = usePoints ? maxDiscount : 0;
  const finalTotal = subtotal - discountAmount;
  const pointsEarned = Math.floor(finalTotal / 100);

  const updateItem = (index: number, patch: Partial<InvoiceLine>) => {
    setItems((previous) => previous.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  };

  const removeItem = (index: number) => {
    setItems((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
            <div className="border-b border-slate-100 bg-slate-50/50 p-5 dark:border-[#282828] dark:bg-[#111111]">
              <h3 className="flex items-center text-lg font-bold text-slate-800 dark:text-white">
                <User className="mr-2 h-5 w-5 text-slate-400 dark:text-[#737373]" /> Customer Details
              </h3>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Customer Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#030303] dark:text-white dark:focus:ring-indigo-500/50"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#737373]" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#030303] dark:text-white dark:focus:ring-indigo-500/50"
                      placeholder="Enter 10-digit number"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">
                    Email <span className="ml-1 font-normal text-slate-400 dark:text-[#737373]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#737373]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#030303] dark:text-white dark:focus:ring-indigo-500/50"
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>
              </div>

              {matchedClient ? (
                <div className="animate-in fade-in slide-in-from-top-2 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 p-4 duration-300 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20">
                      <Gift className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100">Loyalty Member Found!</p>
                      <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300/80">Welcome back, {matchedClient.name}.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-indigo-700 dark:text-indigo-300/80">Available Balance</p>
                    <p className="text-xl font-bold text-indigo-700 dark:text-indigo-400">{availablePoints} Points</p>
                  </div>
                </div>
              ) : null}
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-5 dark:border-[#282828] dark:bg-[#111111]">
              <h3 className="flex items-center text-lg font-bold text-slate-800 dark:text-white">
                <Box className="mr-2 h-5 w-5 text-slate-400 dark:text-[#737373]" /> Services Rendered
              </h3>
            </div>

            <div className="space-y-4 p-6">
              {items.map((item, index) => (
                <div key={`line-${index}`} className="group relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="w-full flex-1">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(event) => updateItem(index, { desc: event.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#030303] dark:text-white dark:focus:ring-indigo-500/50"
                      placeholder="e.g., Premium Hair Spa"
                    />
                  </div>

                  <div className="w-full sm:w-24">
                    <div className="relative">
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">Qty</span>
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(event) => updateItem(index, { qty: Number(event.target.value || 1) })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pr-10 text-center text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#030303] dark:text-white dark:focus:ring-indigo-500/50"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-36">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">Rs.</span>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(event) => updateItem(index, { price: event.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pl-8 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#030303] dark:text-white dark:focus:ring-indigo-500/50"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {items.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="absolute -right-2 -top-2 rounded-full border border-slate-100 bg-white p-2 text-slate-400 shadow-sm transition-colors hover:text-red-500 dark:border-[#282828] dark:bg-[#0a0a0a] dark:hover:text-red-400 sm:static sm:rounded-none sm:border-none sm:bg-transparent sm:p-2 sm:shadow-none"
                    >
                      x
                    </button>
                  ) : null}
                </div>
              ))}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setItems((previous) => [...previous, { desc: '', price: '', qty: 1 }])}
                  className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <Plus className="mr-1.5 h-4 w-4" /> Add another service
                </button>
              </div>
            </div>
          </article>
        </div>

        <aside className="lg:sticky lg:top-6">
          <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
            <div className="border-b border-slate-100 bg-slate-50/50 p-5 dark:border-[#282828] dark:bg-[#111111]">
              <h3 className="flex items-center text-lg font-bold text-slate-800 dark:text-white">
                <Receipt className="mr-2 h-5 w-5 text-slate-400 dark:text-[#737373]" /> Order Summary
              </h3>
            </div>

            <div className="flex-1 space-y-5 p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-slate-500 dark:text-[#a3a3a3]">Subtotal</span>
                  <span className="text-slate-800 dark:text-[#ededed]">Rs. {subtotal.toLocaleString()}</span>
                </div>

                {matchedClient && availablePoints > 0 ? (
                  <div className="border-t border-slate-100 pt-3 dark:border-[#282828]">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center text-sm font-semibold text-slate-800 dark:text-white">
                        Redeem Points
                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-[#282828] dark:text-[#a3a3a3]">
                          Max Rs. {maxDiscount}
                        </span>
                      </span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={usePoints}
                          onChange={() => setUsePoints((previous) => !previous)}
                          className="peer sr-only"
                        />
                        <div className="after:content-[''] peer h-5 w-9 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-[#282828]" />
                      </label>
                    </div>

                    {usePoints ? (
                      <div className="animate-in fade-in flex items-center justify-between text-sm font-medium text-emerald-600 duration-200 dark:text-emerald-400">
                        <span>Discount Applied</span>
                        <span>- Rs. {discountAmount.toLocaleString()}</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="border-t border-slate-200 pt-5 dark:border-[#333]">
                <div className="flex items-end justify-between">
                  <span className="text-base font-bold text-slate-800 dark:text-[#ededed]">Total Payable</span>
                  <span className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {finalTotal > 0 ? (
                <div className="mt-4 flex items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                  <Sparkles className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    Customer earns <strong className="text-emerald-800 dark:text-emerald-100">{pointsEarned} Points</strong>
                  </span>
                </div>
              ) : null}
            </div>

            <div className="space-y-3 p-6 pt-0">
              <button
                type="button"
                disabled={finalTotal === 0 || !phone}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-500"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> Generate Invoice
              </button>
              <button
                type="button"
                disabled={finalTotal === 0 || !phone}
                className="flex w-full items-center justify-center rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 py-3.5 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#1ebd5a]/10 dark:text-[#25D366]"
              >
                <Smartphone className="mr-2 h-4 w-4" /> Send to WhatsApp
              </button>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}