'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import Topbar from './topbar';
import { FileText, LayoutDashboard, Plus, Scissors, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarMode = 'pinned' | 'auto' | 'collapsed';

interface AdminShellProps {
  title: string;
  children: ReactNode;
}

function AdminShellBody({ title, children }: AdminShellProps) {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('pinned');
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const isCollapsed = sidebarMode === 'collapsed' || (sidebarMode === 'auto' && !isHovered);

  const toggleSidebarMode = () => {
    if (sidebarMode === 'pinned') {
      setSidebarMode('auto');
      return;
    }

    if (sidebarMode === 'auto') {
      setSidebarMode('collapsed');
      return;
    }

    setSidebarMode('pinned');
  };

  const mobileNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Services', href: '/services', icon: Scissors }
  ];

  const isMobileActive = (href: string) => {
    if (href === '/invoices') {
      return pathname === '/invoices';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const isCreateInvoiceActive = pathname === '/invoices/create';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 antialiased transition-colors duration-300 dark:bg-[#030303] dark:text-white">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative z-20 hidden h-full shrink-0 flex-col transition-all duration-300 ease-in-out lg:flex',
          isCollapsed ? 'w-20' : 'w-[16.5rem]'
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          sidebarMode={sidebarMode}
          onToggleSidebarMode={toggleSidebarMode}
          onRequestExpand={() => setSidebarMode('pinned')}
        />
      </div>

      <main className="relative z-10 flex h-screen min-w-0 flex-1 flex-col transition-all duration-300">
        <Topbar />

        <div className="relative mx-2 flex-1 overflow-hidden rounded-t-xl border border-b-0 border-slate-200/80 bg-white shadow-[0_0_15px_-3px_rgba(0,0,0,0.05)] transition-colors duration-300 dark:border-[#282828] dark:bg-[#0a0a0a] dark:shadow-[0_0_40px_-10px_rgba(0,0,0,1)]">
          <div className="custom-scrollbar absolute inset-0 overflow-auto p-6 pb-32 md:p-8 md:pb-10 lg:p-10">
            <div className="mx-auto w-full max-w-[96rem]">{children}</div>
          </div>
        </div>
      </main>

      <nav className="pointer-events-none fixed bottom-1 left-0 right-0 z-50 flex items-end justify-center px-4 lg:hidden">
        <div className="pointer-events-auto relative h-[76px] w-full max-w-[420px]">
          <svg
            viewBox="0 0 400 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full text-white drop-shadow-[0_16px_30px_rgba(15,23,42,0.2)] dark:text-[#171717] dark:drop-shadow-[0_38px_64px_rgba(0,0,0,0.95)]"
            preserveAspectRatio="none"
          >
            <path
              d="M0 38C0 17.0132 17.0132 0 38 0H142C154 0 164 8 172 20C180 34 190 40 200 40C210 40 220 34 228 20C236 8 246 0 258 0H362C382.987 0 400 17.0132 400 38V38C400 58.9868 382.987 76 362 76H38C17.0132 76 0 58.9868 0 38V38Z"
              fill="currentColor"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-between px-4">
            <div className="flex flex-1 items-center justify-around">
              {mobileNavItems.slice(0, 2).map((item) => {
                const Icon = item.icon;
                const active = isMobileActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.name}
                    className="group relative flex w-20 flex-col items-center justify-center pt-1 transition-transform active:scale-90"
                  >
                    <Icon className={cn('mb-1 h-5 w-5 transition-colors duration-300', active ? 'text-blue-600 dark:text-purple-500' : 'text-slate-500 dark:text-zinc-500')} strokeWidth={2} />
                    <span className={cn('text-[10px] font-bold tracking-tight transition-colors', active ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-500')}>
                      {item.name}
                    </span>
                    {active ? <span className="absolute -bottom-1 h-[2px] w-3 rounded-full bg-blue-600 dark:bg-purple-500" /> : null}
                  </Link>
                );
              })}
            </div>

            <div className="h-full w-20" />

            <div className="flex flex-1 items-center justify-around">
              {mobileNavItems.slice(2).map((item) => {
                const Icon = item.icon;
                const active = isMobileActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.name}
                    className="group relative flex w-20 flex-col items-center justify-center pt-1 transition-transform active:scale-90"
                  >
                    <Icon className={cn('mb-1 h-5 w-5 transition-colors duration-300', active ? 'text-blue-600 dark:text-purple-500' : 'text-slate-500 dark:text-zinc-500')} strokeWidth={2} />
                    <span className={cn('text-[10px] font-bold tracking-tight transition-colors', active ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-500')}>
                      {item.name}
                    </span>
                    {active ? <span className="absolute -bottom-1 h-[2px] w-3 rounded-full bg-blue-600 dark:bg-purple-500" /> : null}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href="/invoices/create"
            title="Create Invoice"
            aria-label="Create Invoice"
            className={cn(
              'absolute left-1/2 -top-5 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_14px_28px_rgba(15,23,42,0.35)] transition-all hover:scale-105 active:scale-95 dark:bg-purple-600 dark:shadow-[0_22px_42px_rgba(0,0,0,0.9)]',
              isCreateInvoiceActive ? 'bg-blue-500 dark:bg-purple-500' : 'hover:bg-blue-500 dark:hover:bg-purple-500'
            )}
          >
            <Plus className="h-7 w-7" strokeWidth={2.5} />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default function AdminShell({ title, children }: AdminShellProps) {
  return <AdminShellBody title={title}>{children}</AdminShellBody>;
}