'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ComponentType } from 'react';
import { Box, ChevronDown, ChevronRight, FileText, LayoutDashboard, MessageCircle, Settings, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavSubItem {
  id: string;
  name: string;
  href: string;
}

interface NavItem {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number | string }>;
  href?: string;
  subItems?: NavSubItem[];
}

interface NavGroup {
  section: string;
  items: NavItem[];
}

interface SidebarProps {
  isCollapsed: boolean;
  sidebarMode: 'pinned' | 'auto' | 'collapsed';
  onToggleSidebarMode: () => void;
  onRequestExpand: () => void;
}

const navGroups: NavGroup[] = [
  {
    section: 'OVERVIEW',
    items: [{ id: 'dashboard', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }]
  },
  {
    section: 'WORKSPACE',
    items: [
      {
        id: 'invoices',
        name: 'Invoices',
        icon: FileText,
        subItems: [
          { id: 'invoices-all', name: 'All Invoices', href: '/invoices' },
          { id: 'invoices-create', name: 'Create Invoice', href: '/invoices/create' }
        ]
      },
      { id: 'clients', name: 'Clients', href: '/clients', icon: Users },
      { id: 'services', name: 'Services', href: '/services', icon: Box },
      {
        id: 'communication',
        name: 'Communication',
        icon: MessageCircle,
        subItems: [
          { id: 'comm-whatsapp', name: 'WhatsApp', href: '/communication/whatsapp' },
          { id: 'comm-email', name: 'Email', href: '/communication/email' }
        ]
      }
    ]
  }
];

export default function Sidebar({ isCollapsed, sidebarMode, onToggleSidebarMode, onRequestExpand }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['invoices', 'communication']);

  const isRouteActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isExactRouteActive = (href: string) => pathname === href;

  useEffect(() => {
    setExpandedMenus((previous) => {
      const next = [...previous];

      if (pathname.startsWith('/invoices') && !next.includes('invoices')) {
        next.push('invoices');
      }

      if (pathname.startsWith('/communication') && !next.includes('communication')) {
        next.push('communication');
      }

      return next;
    });
  }, [pathname]);

  const toggleMenu = (menuId: string) => {
    if (isCollapsed) {
      onRequestExpand();
    }

    setExpandedMenus((previous) =>
      previous.includes(menuId) ? previous.filter((id) => id !== menuId) : [...previous, menuId]
    );
  };

  return (
    <>
      <div className="flex h-14 items-center overflow-hidden px-5">
        <div className="flex items-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-sm shadow-blue-500/20 dark:bg-white dark:shadow-none">
            <Box className="h-4 w-4 text-white dark:text-[#0a0a0a]" />
          </div>
          <span
            className={cn(
              'ml-2.5 whitespace-nowrap text-xl font-semibold tracking-tight text-slate-800 transition-all duration-300 dark:text-white',
              isCollapsed ? 'ml-0 w-0 overflow-hidden opacity-0' : 'opacity-100'
            )}
          >
            SmartBill
          </span>
        </div>
      </div>

      <aside className="ml-2 flex flex-1 flex-col overflow-hidden rounded-t-xl border border-b-0 border-slate-200/70 bg-white shadow-sm transition-colors duration-300 dark:border-[#282828] dark:bg-[#0a0a0a]">
        <div className={cn('flex h-14 items-center px-4', isCollapsed ? 'justify-center' : 'justify-between')}>
          {!isCollapsed ? (
            <span className="ml-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-400 dark:text-[#737373]">
              SMARTBILL
            </span>
          ) : null}

          <button
            onClick={onToggleSidebarMode}
            title={`Sidebar Mode: ${sidebarMode.charAt(0).toUpperCase() + sidebarMode.slice(1)}`}
            className={cn(
              'hidden items-center justify-center rounded-lg bg-transparent text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 active:scale-95 dark:text-[#737373] dark:hover:bg-[#282828] dark:hover:text-[#d4d4d4] lg:flex',
              isCollapsed ? 'mx-auto h-10 w-10' : 'h-8 w-8'
            )}
          >
            <div className="relative flex h-5 w-5 items-center justify-center">
              <div className="absolute inset-0 rounded-[6px] border-[1.5px] border-slate-300 transition-colors dark:border-[#444]" />
              <div
                className={cn(
                  'absolute bottom-[3px] top-[3px] left-[3px] w-[4px] rounded-[1px] bg-slate-300 transition-all duration-300 ease-out dark:bg-[#555]',
                  sidebarMode === 'collapsed' ? 'left-[8px] scale-y-50 opacity-0' : 'scale-y-100 opacity-100'
                )}
              />
              <div
                className={cn(
                  'absolute bottom-[3px] top-[3px] right-[3px] w-[4px] rounded-[1px] bg-slate-300 transition-all duration-300 ease-out dark:bg-[#555]',
                  sidebarMode === 'pinned' ? 'right-[8px] scale-y-50 opacity-0' : 'scale-y-100 opacity-100'
                )}
              />
            </div>
          </button>
        </div>

        <nav className="custom-scrollbar flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-4 pb-4">
          {navGroups.map((group) => (
            <div key={group.section}>
              <div className={cn('mb-2 h-5 overflow-hidden transition-opacity duration-300', isCollapsed ? 'px-0' : 'px-3')}>
                {isCollapsed ? (
                  <div className="h-[1px] w-full bg-slate-100 dark:bg-[#282828]" />
                ) : (
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[#737373]">{group.section}</h3>
                )}
              </div>

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const hasSubItems = Boolean(item.subItems?.length);
                  const isItemActive = item.href ? isRouteActive(item.href) : false;
                  const isOpen = expandedMenus.includes(item.id);

                  return (
                    <div key={item.id}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200',
                            isItemActive
                              ? 'border-transparent bg-blue-50/60 text-blue-700 shadow-sm dark:bg-[#282828] dark:text-white'
                              : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#a3a3a3] dark:hover:bg-[#282828]/50 dark:hover:text-white'
                          )}
                          title={isCollapsed ? item.name : undefined}
                        >
                          <div className="flex items-center">
                            <Icon
                              className={cn(
                                'h-[18px] w-[18px] flex-shrink-0 transition-colors',
                                isItemActive ? 'text-blue-600 dark:text-indigo-400' : 'text-slate-400 dark:text-[#737373]'
                              )}
                              strokeWidth={isItemActive ? 2 : 1.5}
                            />
                            <span className={cn('ml-3 whitespace-nowrap text-left transition-all', isCollapsed ? 'w-0 opacity-0' : 'opacity-100')}>
                              {item.name}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleMenu(item.id)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200',
                            isItemActive
                              ? 'border-transparent bg-blue-50/60 text-blue-700 shadow-sm dark:bg-[#282828] dark:text-white'
                              : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#a3a3a3] dark:hover:bg-[#282828]/50 dark:hover:text-white'
                          )}
                          title={isCollapsed ? item.name : undefined}
                        >
                          <div className="flex items-center">
                            <Icon
                              className={cn(
                                'h-[18px] w-[18px] flex-shrink-0 transition-colors',
                                isItemActive ? 'text-blue-600 dark:text-indigo-400' : 'text-slate-400 dark:text-[#737373]'
                              )}
                              strokeWidth={isItemActive ? 2 : 1.5}
                            />
                            <span className={cn('ml-3 whitespace-nowrap text-left transition-all', isCollapsed ? 'w-0 opacity-0' : 'opacity-100')}>
                              {item.name}
                            </span>
                          </div>
                          {!isCollapsed ? (
                            isOpen ? <ChevronDown className="h-4 w-4 text-slate-400 dark:text-[#555]" /> : <ChevronRight className="h-4 w-4 text-slate-400 dark:text-[#555]" />
                          ) : null}
                        </button>
                      )}

                      {item.subItems && isOpen && !isCollapsed ? (
                        <div className="mt-1 space-y-0.5 pb-1 pl-9 pr-2">
                          {item.subItems.map((sub) => {
                            const isSubActive = isExactRouteActive(sub.href);
                            return (
                              <Link
                                key={sub.id}
                                href={sub.href}
                                className={cn(
                                  'block w-full rounded-md px-3 py-2 text-left text-sm transition-all duration-200',
                                  isSubActive
                                    ? 'bg-blue-50/50 font-medium text-blue-700 dark:bg-[#282828] dark:text-white'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-[#a3a3a3] dark:hover:bg-[#282828]/50 dark:hover:text-white'
                                )}
                              >
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-100 p-3 dark:border-[#282828]">
          <Link
            href="/settings"
            className={cn(
              'flex w-full items-center rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200',
              pathname.startsWith('/settings')
                ? 'border-transparent bg-slate-100 text-slate-900 dark:bg-[#282828] dark:text-white'
                : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#a3a3a3] dark:hover:bg-[#282828]/50 dark:hover:text-white'
            )}
            title={isCollapsed ? 'Settings' : undefined}
          >
            <Settings
              className={cn(
                'h-[18px] w-[18px] flex-shrink-0 transition-colors',
                pathname.startsWith('/settings') ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-[#737373]'
              )}
              strokeWidth={pathname.startsWith('/settings') ? 2 : 1.5}
            />
            <span className={cn('ml-3 whitespace-nowrap text-left transition-all', isCollapsed ? 'w-0 opacity-0' : 'opacity-100')}>
              Settings
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
