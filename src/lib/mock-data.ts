export interface MockInvoice {
  id: string;
  client: string;
  amount: number;
  date: string;
}

export interface MockClient {
  id: number;
  name: string;
  phone: string;
  email: string;
  spent: number;
  invoices: number;
  points: number;
}

export interface MockService {
  id: number;
  name: string;
  price: number;
  type: string;
}

export const MOCK_INVOICES: MockInvoice[] = [
  { id: 'INV-001', client: 'SNK', amount: 1250, date: '2026-04-18' },
  { id: 'INV-002', client: 'Shombhu karan', amount: 840, date: '2026-04-17' },
  { id: 'INV-003', client: 'Suman biswas', amount: 200, date: '2026-04-15' }
];

export const MOCK_CLIENTS: MockClient[] = [
  {
    id: 1,
    name: 'SNK',
    phone: '9876543210',
    email: 'billing@acme.com',
    spent: 15400,
    invoices: 12,
    points: 450
  },
  {
    id: 2,
    name: 'Shombhu karan',
    phone: '9988776655',
    email: 'accounts@gtech.com',
    spent: 8400,
    invoices: 5,
    points: 120
  },
  {
    id: 3,
    name: 'Suman biswas',
    phone: '9123456789',
    email: 'sarah@example.com',
    spent: 2000,
    invoices: 2,
    points: 50
  }
];

export const MOCK_SERVICES: MockService[] = [
  { id: 1, name: 'Haircut & Styling', price: 500, type: 'Service' },
  { id: 2, name: 'Facial Treatment', price: 1200, type: 'Service' },
  { id: 3, name: 'Premium Hair Spa', price: 2500, type: 'Service' }
];
