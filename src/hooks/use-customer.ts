'use client';

import { useMemo, useState } from 'react';
import type { Customer } from '@/types';

const initialCustomers: Customer[] = [
  { id: 'cl-001', name: 'Anita Sharma', phone: '9999900001' },
  { id: 'cl-002', name: 'Rohit Verma', phone: '9999900002' }
];

export function useCustomer() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const customerCount = useMemo(() => customers.length, [customers]);

  return {
    customers,
    customerCount,
    setCustomers
  };
}