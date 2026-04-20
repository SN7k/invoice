'use client';

import { useMemo, useState } from 'react';
import type { Invoice } from '@/types';

const initialInvoices: Invoice[] = [
  { id: 'INV-001', customerId: 'cl-001', amount: 1200, status: 'paid' },
  { id: 'INV-002', customerId: 'cl-002', amount: 850, status: 'pending' }
];

export function useInvoice() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const totalRevenue = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    [invoices]
  );

  return {
    invoices,
    totalRevenue,
    setInvoices
  };
}