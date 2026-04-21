'use client';

import { useEffect, useState } from 'react';
import { Box, MoreVertical, Plus } from 'lucide-react';
import AddServiceModal from '@/components/service/add-service-modal';
import { type MockService } from '@/lib/mock-data';
import { addLocalService, getLocalServices, subscribeLocalServices } from '@/lib/demo-services';

export default function ServicePage() {
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [services, setServices] = useState<MockService[]>([]);

  useEffect(() => {
    setServices(getLocalServices());

    return subscribeLocalServices(() => {
      setServices(getLocalServices());
    });
  }, []);

  const handleAddService = (service: { name: string; price: number }) => {
    addLocalService(service);
  };

  return (
    <section className="relative h-full animate-in fade-in duration-300">
      <div className="grid grid-cols-1 gap-6 pb-20 md:grid-cols-3">
        {services.map((item) => (
          <article key={item.id} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-slate-200 dark:border-[#282828] dark:bg-[#1f1f1f] dark:hover:border-[#444]">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50 dark:border-[#282828] dark:bg-[#111111]">
                <Box className="h-5 w-5 text-slate-500 dark:text-[#a3a3a3]" />
              </div>
              <button className="p-1 text-slate-400 transition-colors hover:text-slate-600 dark:text-[#737373] dark:hover:text-[#d4d4d4]">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <h4 className="mt-2 text-lg font-bold text-slate-800 dark:text-white">{item.name}</h4>
            <p className="mt-4 text-2xl font-bold text-blue-600 dark:text-indigo-400">Rs. {item.price}</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsAddServiceOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-all hover:-translate-y-1 hover:scale-105 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 md:bottom-10 md:right-10 md:h-auto md:w-auto md:rounded-full md:p-4 lg:bottom-12 lg:right-14"
        title="Add Service"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </button>

      <AddServiceModal
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
        onAddService={handleAddService}
      />
    </section>
  );
}