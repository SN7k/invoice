import { MOCK_INVOICES } from '@/lib/mock-data';

const STORAGE_KEY = 'invoice-demo-local-data';
const UPDATE_EVENT = 'invoice-demo-local-updated';

export interface LocalInvoiceItem {
  desc: string;
  qty: number;
  price: number;
}

export interface LocalInvoiceRecord {
  id: string;
  client: string;
  amount: number;
  date: string;
  phone: string;
  email?: string;
  items: LocalInvoiceItem[];
  subtotal: number;
  discount: number;
  pointsEarned: number;
}

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getSeedInvoices(): LocalInvoiceRecord[] {
  return MOCK_INVOICES.map((invoice) => ({
    id: invoice.id,
    client: invoice.client,
    amount: invoice.amount,
    date: invoice.date,
    phone: '',
    email: '',
    items: [],
    subtotal: invoice.amount,
    discount: 0,
    pointsEarned: Math.floor(invoice.amount / 100)
  }));
}

function normalizeInvoices(input: unknown): LocalInvoiceRecord[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((entry): entry is Partial<LocalInvoiceRecord> => Boolean(entry) && typeof entry === 'object')
    .map((entry) => ({
      id: typeof entry.id === 'string' ? entry.id : 'INV-000',
      client: typeof entry.client === 'string' ? entry.client : 'Walk-in Customer',
      amount: typeof entry.amount === 'number' && Number.isFinite(entry.amount) ? entry.amount : 0,
      date: typeof entry.date === 'string' ? entry.date : formatDate(new Date()),
      phone: typeof entry.phone === 'string' ? entry.phone : '',
      email: typeof entry.email === 'string' ? entry.email : '',
      items: Array.isArray(entry.items)
        ? entry.items
            .filter((item): item is LocalInvoiceItem => Boolean(item) && typeof item === 'object')
            .map((item) => ({
              desc: typeof item.desc === 'string' ? item.desc : '',
              qty: typeof item.qty === 'number' && Number.isFinite(item.qty) ? item.qty : 1,
              price: typeof item.price === 'number' && Number.isFinite(item.price) ? item.price : 0
            }))
        : [],
      subtotal: typeof entry.subtotal === 'number' && Number.isFinite(entry.subtotal) ? entry.subtotal : 0,
      discount: typeof entry.discount === 'number' && Number.isFinite(entry.discount) ? entry.discount : 0,
      pointsEarned: typeof entry.pointsEarned === 'number' && Number.isFinite(entry.pointsEarned) ? entry.pointsEarned : 0
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function readLocalStorageInvoices() {
  if (typeof window === 'undefined') {
    return getSeedInvoices();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getSeedInvoices();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }

    const parsed = JSON.parse(raw);
    const normalized = normalizeInvoices(parsed);

    if (normalized.length === 0) {
      const seed = getSeedInvoices();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }

    return normalized;
  } catch {
    const seed = getSeedInvoices();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    } catch {
      return seed;
    }
    return seed;
  }
}

function writeLocalStorageInvoices(invoices: LocalInvoiceRecord[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

function getNextInvoiceId(invoices: LocalInvoiceRecord[]) {
  const maxNumber = invoices.reduce((max, invoice) => {
    const match = invoice.id.match(/INV-(\d+)/);
    const value = match ? Number(match[1]) : 0;
    return Number.isFinite(value) && value > max ? value : max;
  }, 0);

  return `INV-${String(maxNumber + 1).padStart(3, '0')}`;
}

export function getLocalInvoices() {
  return readLocalStorageInvoices();
}

export function addLocalInvoice(input: {
  client: string;
  phone: string;
  email?: string;
  items: LocalInvoiceItem[];
  subtotal: number;
  discount: number;
  amount: number;
  pointsEarned: number;
}) {
  const invoices = readLocalStorageInvoices();

  const nextInvoice: LocalInvoiceRecord = {
    id: getNextInvoiceId(invoices),
    client: input.client,
    amount: input.amount,
    date: formatDate(new Date()),
    phone: input.phone,
    email: input.email,
    items: input.items,
    subtotal: input.subtotal,
    discount: input.discount,
    pointsEarned: input.pointsEarned
  };

  writeLocalStorageInvoices([nextInvoice, ...invoices]);
  return nextInvoice;
}

export function subscribeLocalInvoices(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener('storage', onStorage);
  window.addEventListener(UPDATE_EVENT, callback);

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}
