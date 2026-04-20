'use client';

import { X } from 'lucide-react';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddServiceModal({ isOpen, onClose }: AddServiceModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm dark:bg-black/80">
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl animate-in zoom-in-95 duration-200 dark:border-[#282828] dark:bg-[#1f1f1f]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-white p-6 dark:border-[#282828] dark:bg-[#111111]">
          <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Add New Service</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-transparent bg-slate-50 p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:border-[#282828] dark:bg-[#030303] dark:hover:bg-[#282828] dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 bg-slate-50/50 p-6 dark:bg-[#1f1f1f]">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Service Name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#111111] dark:text-white dark:focus:ring-indigo-500/50"
              placeholder="e.g., Bridal Makeup"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-[#d4d4d4]">Price (Rs.)</label>
            <input
              type="number"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-[#282828] dark:bg-[#111111] dark:text-white dark:focus:ring-indigo-500/50"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 rounded-b-3xl border-t border-slate-100 bg-white p-5 dark:border-[#282828] dark:bg-[#111111]">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-[#282828] dark:bg-[#030303] dark:text-[#ededed] dark:hover:bg-[#111]"
          >
            Cancel
          </button>
          <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500">
            Save Service
          </button>
        </div>
      </div>
    </div>
  );
}