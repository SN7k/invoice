import { MOCK_SERVICES, type MockService } from '@/lib/mock-data';

const STORAGE_KEY = 'invoice-demo-local-services';
const UPDATE_EVENT = 'invoice-demo-local-services-updated';

function normalizeServices(input: unknown): MockService[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((entry): entry is Partial<MockService> => Boolean(entry) && typeof entry === 'object')
    .map((entry) => ({
      id: typeof entry.id === 'number' && Number.isFinite(entry.id) ? entry.id : 0,
      name: typeof entry.name === 'string' ? entry.name : '',
      price: typeof entry.price === 'number' && Number.isFinite(entry.price) ? entry.price : 0,
      type: typeof entry.type === 'string' ? entry.type : 'Service'
    }))
    .filter((service) => service.id > 0 && service.name.trim().length > 0 && service.price > 0)
    .sort((a, b) => a.id - b.id);
}

function readLocalStorageServices(): MockService[] {
  if (typeof window === 'undefined') {
    return [...MOCK_SERVICES];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SERVICES));
      return [...MOCK_SERVICES];
    }

    const parsed = JSON.parse(raw);
    const normalized = normalizeServices(parsed);

    if (normalized.length === 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SERVICES));
      return [...MOCK_SERVICES];
    }

    return normalized;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SERVICES));
    return [...MOCK_SERVICES];
  }
}

function writeLocalStorageServices(services: MockService[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function getLocalServices() {
  return readLocalStorageServices();
}

export function addLocalService(input: { name: string; price: number }) {
  const services = readLocalStorageServices();
  const nextId = services.length > 0 ? Math.max(...services.map((service) => service.id)) + 1 : 1;

  const nextService: MockService = {
    id: nextId,
    name: input.name,
    price: input.price,
    type: 'Service'
  };

  writeLocalStorageServices([...services, nextService]);
  return nextService;
}

export function subscribeLocalServices(callback: () => void) {
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
