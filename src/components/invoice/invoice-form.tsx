'use client';

import { useEffect, useState } from 'react';
import { Box, CheckCircle2, Gift, Mail, Phone, Receipt, Smartphone, Sparkles, User, Plus } from 'lucide-react';
import { MOCK_CLIENTS } from '@/lib/mock-data';
import { addLocalInvoice, type LocalInvoiceRecord } from '@/lib/demo-invoices';

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
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [createdInvoice, setCreatedInvoice] = useState<LocalInvoiceRecord | null>(null);

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
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = today.toLocaleDateString('en-US', { month: 'long' });
  const year = today.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;
  const previewItems = items
    .map((item) => ({
      desc: item.desc.trim(),
      qty: Number(item.qty || 0),
      price: Number(item.price || 0)
    }))
    .filter((item) => item.desc.length > 0 && item.qty > 0 && item.price > 0);
  const previewRows = previewItems.length > 0 ? previewItems : [{ desc: 'Service item', qty: 1, price: 0 }];

  const updateItem = (index: number, patch: Partial<InvoiceLine>) => {
    setItems((previous) => previous.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  };

  const removeItem = (index: number) => {
    setItems((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
  };

  const buildInvoicePdf = async (invoice: LocalInvoiceRecord) => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    let y = 52;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('YOUR', 48, y);
    doc.text('LOGO', 48, y + 16);
    doc.setFontSize(12);
    doc.text(`NO. ${invoice.id}`, 460, y + 4);

    y += 72;
    doc.setFontSize(56);
    doc.text('INVOICE', 48, y);

    y += 36;
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 48, y);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.date, 88, y);

    y += 38;
    doc.setFont('helvetica', 'bold');
    doc.text('Billed to:', 48, y);
    doc.text('From:', 320, y);

    doc.setFont('helvetica', 'normal');
    doc.text(invoice.client, 48, y + 20);
    doc.text('123 Anywhere St., Any City', 48, y + 38);
    doc.text(invoice.email || 'hello@reallygreatsite.com', 48, y + 56);
    doc.text('SNK DevWorks', 320, y + 20);
    doc.text('123 Anywhere St., Any City', 320, y + 38);
    doc.text('hello@reallygreatsite.com', 320, y + 56);

    y += 92;
    doc.setDrawColor(210, 212, 216);
    doc.setFillColor(220, 222, 225);
    doc.rect(48, y, 500, 28, 'F');
    doc.setFont('helvetica', 'normal');
    doc.text('Item', 58, y + 18);
    doc.text('Quantity', 280, y + 18);
    doc.text('Price', 390, y + 18);
    doc.text('Amount', 500, y + 18);

    y += 45;
    (invoice.items.length > 0 ? invoice.items : [{ desc: 'Service item', qty: 1, price: invoice.amount }]).forEach((item) => {
      doc.text(item.desc, 58, y);
      doc.text(String(item.qty), 302, y);
      doc.text(`$${item.price.toLocaleString()}`, 392, y);
      doc.text(`$${(item.price * item.qty).toLocaleString()}`, 500, y);
      y += 24;
    });

    y += 6;
    doc.line(48, y, 548, y);
    y += 26;
    doc.setFont('helvetica', 'bold');
    doc.text('Total', 400, y);
    doc.text(`$${invoice.amount.toLocaleString()}`, 500, y);
    y += 18;
    doc.line(48, y, 548, y);

    y += 42;
    doc.text('Payment method:', 48, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Cash', 160, y);
    y += 24;
    doc.setFont('helvetica', 'bold');
    doc.text('Note:', 48, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for choosing us!', 90, y);

    return doc.output('blob');
  };

  const handleGenerateInvoice = () => {
    const cleanName = name.trim();
    const invoiceItems = items
      .map((item) => ({
        desc: item.desc.trim(),
        qty: Number(item.qty || 0),
        price: Number(item.price || 0)
      }))
      .filter((item) => item.desc.length > 0 && item.qty > 0 && item.price > 0);

    if (cleanName.length === 0) {
      setErrorMessage('Please enter customer name.');
      return;
    }

    if (phone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    if (invoiceItems.length === 0) {
      setErrorMessage('Please add at least one valid service item.');
      return;
    }

    if (finalTotal <= 0) {
      setErrorMessage('Invoice total should be greater than zero.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setIsSaving(true);

    const created = addLocalInvoice({
      client: cleanName,
      phone,
      email: email.trim() || undefined,
      items: invoiceItems,
      subtotal,
      discount: discountAmount,
      amount: finalTotal,
      pointsEarned
    });

    setCreatedInvoice(created);
    setSuccessMessage(`Invoice ${created.id} created successfully.`);
    setIsSaving(false);
  };

  const handleSendWhatsApp = async () => {
    if (!createdInvoice) {
      setErrorMessage('Please create invoice first.');
      return;
    }

    const cleanedPhone = createdInvoice.phone.replace(/\D/g, '');
    if (!cleanedPhone) {
      setErrorMessage('Client phone number is missing. Please add phone and create again.');
      return;
    }

    const whatsappPhone = cleanedPhone.length === 10 ? `91${cleanedPhone}` : cleanedPhone;
    const message = `Hello ${createdInvoice.client}, your invoice ${createdInvoice.id} for Rs. ${createdInvoice.amount.toLocaleString()} is ready. Please find the invoice PDF attached.`;
    const appWhatsappUrl = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

    setErrorMessage('');
    setSuccessMessage('');
    setIsSendingWhatsApp(true);

    try {
      // Open target client chat immediately to keep behavior direct and avoid popup blockers.
      const appWindow = window.open(appWhatsappUrl, '_blank', 'noopener,noreferrer');
      if (!appWindow) {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      const pdfBlob = await buildInvoicePdf(createdInvoice);
      const fileName = `${createdInvoice.id}.pdf`;

      // If supported, offer a direct file-share action so PDF can be sent in WhatsApp.
      if (typeof navigator !== 'undefined' && 'share' in navigator && 'canShare' in navigator) {
        const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
        const canShareFile = navigator.canShare({ files: [pdfFile] });

        if (canShareFile) {
          await navigator.share({
            files: [pdfFile],
            title: `Invoice ${createdInvoice.id}`,
            text: message
          });
          setSuccessMessage(`WhatsApp chat opened for +${whatsappPhone}. PDF share sheet opened for attachment.`);
          return;
        }
      }

      setSuccessMessage(`WhatsApp chat opened for +${whatsappPhone}. PDF auto-attachment is not supported on this browser.`);
    } catch {
      setErrorMessage('Unable to prepare WhatsApp send. Please try again.');
    } finally {
      setIsSendingWhatsApp(false);
    }
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

        <aside className="space-y-6 lg:sticky lg:top-6">
          <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors dark:border-[#282828] dark:bg-[#1f1f1f]">
            <div className="border-b border-slate-100 bg-slate-50/50 p-5 dark:border-[#282828] dark:bg-[#111111]">
              <h3 className="flex items-center text-lg font-bold text-slate-800 dark:text-white">
                <Receipt className="mr-2 h-5 w-5 text-slate-400 dark:text-[#737373]" /> Invoice Preview
              </h3>
            </div>

            <div className="p-3 sm:p-4">
              <div className="relative mx-auto aspect-[3/4.25] w-full max-w-[560px] overflow-hidden border border-slate-200 bg-[#efeff0] p-6 text-slate-900 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:border-[#3a3a3a] dark:bg-[#efeff0] sm:p-8">
                <div className="relative z-10">
                  <div className="mb-10 flex items-start justify-between">
                    <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-slate-700">
                      Your
                      <br />
                      Logo
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">No. 000001</p>
                  </div>

                  <h4 className="mb-7 text-[64px] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-slate-900">Invoice</h4>

                  <p className="mb-8 text-[17px] text-slate-800">
                    <span className="font-bold">Date:</span> {formattedDate}
                  </p>

                  <div className="mb-7 grid grid-cols-2 gap-5">
                    <div>
                      <p className="mb-1 text-[14px] font-bold">Billed to:</p>
                      <p className="text-[13px] leading-5 text-slate-800">{name.trim() || 'Walk-in Customer'}</p>
                      <p className="text-[13px] leading-5 text-slate-800">123 Anywhere St., Any City</p>
                      <p className="text-[13px] leading-5 text-slate-800">{email.trim() || 'hello@reallygreatsite.com'}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[14px] font-bold">From:</p>
                      <p className="text-[13px] leading-5 text-slate-800">SNK DevWorks</p>
                      <p className="text-[13px] leading-5 text-slate-800">123 Anywhere St., Any City</p>
                      <p className="text-[13px] leading-5 text-slate-800">hello@reallygreatsite.com</p>
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <div className="grid grid-cols-12 bg-slate-300/50 px-3 py-2 text-[13px] font-medium tracking-[0.02em] text-slate-700">
                      <p className="col-span-6">Item</p>
                      <p className="col-span-2 text-center">Quantity</p>
                      <p className="col-span-2 text-right">Price</p>
                      <p className="col-span-2 text-right">Amount</p>
                    </div>

                    <div className="px-3 py-2">
                      {previewRows.map((item, index) => (
                        <div key={`${item.desc}-${index}`} className="grid grid-cols-12 py-1.5 text-[14px] text-slate-800">
                          <p className="col-span-6 truncate pr-2">{item.desc}</p>
                          <p className="col-span-2 text-center">{item.qty}</p>
                          <p className="col-span-2 text-right">${item.price.toLocaleString()}</p>
                          <p className="col-span-2 text-right">${(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 border-y border-slate-300/90 px-3 py-3">
                      <div className="ml-auto grid w-[40%] grid-cols-2 items-center text-right">
                        <span className="text-[16px] font-bold text-slate-800">Total</span>
                        <span className="text-[16px] font-bold text-slate-900">${finalTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="px-3 py-2">
                      {usePoints && discountAmount > 0 ? (
                        <div className="flex items-center justify-between text-[13px] text-slate-700">
                          <span>Points Redeemed</span>
                          <span className="font-semibold">-{discountAmount} pts</span>
                        </div>
                      ) : null}
                      <div className="flex items-center justify-between text-[13px] text-black/70">
                        <span>Points Earned</span>
                        <span className="font-semibold">+{pointsEarned} pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-1 text-[13px] text-slate-800">
                    <p>
                      <span className="font-bold">Payment method:</span> Cash
                    </p>
                    <p>
                      <span className="font-bold">Note:</span> Thank you for choosing us!
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-[70%] rounded-[50%] bg-slate-300/70" />
                <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-[72%] rounded-[50%] bg-slate-700/90" />
              </div>
            </div>
          </article>

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
              {successMessage ? (
                <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {successMessage}
                </p>
              ) : null}

              {errorMessage ? (
                <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="button"
                disabled={finalTotal === 0 || !phone || isSaving}
                onClick={handleGenerateInvoice}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-500"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> {isSaving ? 'Creating...' : 'Create Invoice'}
              </button>
              <button
                type="button"
                disabled={!createdInvoice || isSendingWhatsApp}
                onClick={handleSendWhatsApp}
                className="flex w-full items-center justify-center rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 py-3.5 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#1ebd5a]/10 dark:text-[#25D366]"
              >
                <Smartphone className="mr-2 h-4 w-4" /> {isSendingWhatsApp ? 'Opening WhatsApp...' : 'Send to WhatsApp'}
              </button>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}