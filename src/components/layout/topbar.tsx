'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, Moon, Search, Sun, X } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

interface TopbarProps {
}

export default function Topbar({}: TopbarProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <header className="flex h-14 items-center bg-transparent px-4">
      <div className="shrink-0 sm:hidden">
        <div className="group relative w-full max-w-[180px]">
          <input
            type="text"
            name="mobile-search"
            placeholder="Search SmartBill..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="block w-full rounded-xl border border-slate-200/80 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 dark:border-[#282828] dark:bg-[#111111] dark:text-white dark:placeholder:text-[#737373] dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : (
            <Search
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-all duration-300"
              strokeWidth={2}
            />
          )}
        </div>
      </div>

      <div className="relative ml-auto flex min-w-0 items-center gap-2 sm:gap-4">
        <div className="group relative hidden sm:block">
          <input
            type="text"
            name="search"
            placeholder="Search SmartBill..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="block w-[200px] rounded-xl border border-slate-200/80 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 hover:w-[240px] focus:w-[280px] focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 dark:border-[#282828] dark:bg-[#0a0a0a] dark:text-white dark:placeholder:text-[#737373] dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : (
            <Search
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-all duration-300"
              strokeWidth={2}
            />
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-[#282828]" />

        <div ref={profileMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((previous) => !previous)}
            className="flex items-center gap-1.5 rounded-full p-1 pr-2 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:hover:bg-[#282828] dark:focus:ring-[#282828]"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold text-blue-700 shadow-inner dark:border-indigo-500/30 dark:bg-indigo-500/20 dark:text-indigo-100 dark:shadow-none bg-blue-100 sm:h-8 sm:w-8 sm:text-sm">
              AD
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 dark:text-[#a3a3a3]" strokeWidth={2} />
          </button>

          {isProfileOpen ? (
            <div className="absolute right-0 top-full z-50 pt-1">
              <div className="animate-in fade-in slide-in-from-top-2 w-64 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-200 dark:border-[#282828] dark:bg-[#0a0a0a] dark:shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
                <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-3.5 dark:border-[#282828] dark:bg-[#030303]">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Admin User</p>
                  <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-[#a3a3a3]">admin@smartbill.com</p>
                </div>

                <div className="space-y-0.5 border-b border-slate-100 p-2 dark:border-[#282828]">
                  <label
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-[#ededed] dark:hover:bg-[#282828]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center">
                      {isDarkMode ? <Moon className="mr-3 h-4 w-4 text-indigo-400" /> : <Sun className="mr-3 h-4 w-4 text-slate-400" />}
                      Appearance
                    </div>

                    <div className="theme-switch">
                      <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                      <span className="slider">
                        <span className="circle">
                          <span className="shine shine-1" />
                          <span className="shine shine-2" />
                          <span className="shine shine-3" />
                          <span className="shine shine-4" />
                          <span className="shine shine-5" />
                          <span className="shine shine-6" />
                          <span className="shine shine-7" />
                          <span className="shine shine-8" />
                          <span className="moon" />
                        </span>
                      </span>
                    </div>
                  </label>
                </div>

                <div className="p-2">
                  <button className="flex w-full items-center rounded-lg px-2.5 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
                    <LogOut className="mr-3 h-4 w-4 text-red-500 dark:text-red-400" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}