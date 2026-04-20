export interface Customer {
  id: string;
  name: string;
  phone: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  status: 'paid' | 'pending';
}