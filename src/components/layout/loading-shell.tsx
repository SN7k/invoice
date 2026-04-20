import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-xl bg-slate-200/80 dark:bg-[#1c1c1c]', className)} />;
}

function SkeletonLine({ className }: { className?: string }) {
  return <SkeletonBlock className={cn('h-4 rounded-lg', className)} />;
}

function AdminSidebarSkeleton() {
  return (
    <>
      <div className="flex h-14 items-center overflow-hidden px-5">
        <div className="flex items-center gap-2.5">
          <SkeletonBlock className="h-8 w-8 rounded-full bg-slate-200 dark:bg-[#242424]" />
          <SkeletonBlock className="h-5 w-24 rounded-full bg-slate-200 dark:bg-[#242424]" />
        </div>
      </div>

      <aside className="ml-2 flex flex-1 flex-col overflow-hidden rounded-t-xl border border-b-0 border-slate-200/70 bg-white shadow-sm transition-colors duration-300 dark:border-[#282828] dark:bg-[#0a0a0a]">
        <div className="flex h-14 items-center justify-between px-4">
          <SkeletonBlock className="h-3.5 w-20 rounded-full bg-slate-200 dark:bg-[#242424]" />
          <SkeletonBlock className="hidden h-8 w-8 rounded-lg bg-slate-200 dark:bg-[#242424] lg:block" />
        </div>

        <div className="custom-scrollbar flex-1 space-y-6 overflow-hidden px-4 pb-4">
          <div className="space-y-3">
            <SkeletonBlock className="h-3 w-16 rounded-full bg-slate-200 dark:bg-[#242424]" />
            <div className="space-y-2">
              <SkeletonBlock className="h-11 rounded-xl bg-slate-100 dark:bg-[#141414]" />
              <SkeletonBlock className="h-11 rounded-xl bg-slate-100 dark:bg-[#141414]" />
            </div>
          </div>

          <div className="space-y-3">
            <SkeletonBlock className="h-3 w-20 rounded-full bg-slate-200 dark:bg-[#242424]" />
            <div className="space-y-2">
              <SkeletonBlock className="h-11 rounded-xl bg-slate-100 dark:bg-[#141414]" />
              <SkeletonBlock className="h-11 rounded-xl bg-slate-100 dark:bg-[#141414]" />
              <SkeletonBlock className="h-11 rounded-xl bg-slate-100 dark:bg-[#141414]" />
              <SkeletonBlock className="h-11 rounded-xl bg-slate-100 dark:bg-[#141414]" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function AdminShellSkeleton({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 antialiased transition-colors duration-300 dark:bg-[#030303] dark:text-white">
      <div className="relative z-20 flex h-full shrink-0 flex-col w-[16.5rem]">
        <AdminSidebarSkeleton />
      </div>

      <main className="relative z-10 flex h-screen min-w-0 flex-1 flex-col transition-all duration-300">
        <header className="flex h-14 items-center bg-transparent px-4">
          <div className="ml-auto flex items-center gap-4">
            <SkeletonBlock className="hidden h-10 w-[14rem] rounded-xl bg-white dark:bg-[#0a0a0a] sm:block" />
            <SkeletonBlock className="h-8 w-8 rounded-full bg-white dark:bg-[#0a0a0a]" />
            <SkeletonBlock className="h-9 w-16 rounded-full bg-white dark:bg-[#0a0a0a]" />
          </div>
        </header>

        <div className="relative mx-2 flex-1 overflow-hidden rounded-t-xl border border-b-0 border-slate-200/80 bg-white shadow-[0_0_15px_-3px_rgba(0,0,0,0.05)] transition-colors duration-300 dark:border-[#282828] dark:bg-[#0a0a0a] dark:shadow-[0_0_40px_-10px_rgba(0,0,0,1)]">
          <div className="custom-scrollbar absolute inset-0 overflow-auto p-6 md:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-[96rem]">
              <div className="space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function AuthPageSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SkeletonBlock className="h-8 w-24 rounded-full bg-slate-200" />
        <SkeletonLine className="mt-3 w-56 bg-slate-200" />

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <SkeletonLine className="w-16 bg-slate-200" />
            <SkeletonBlock className="h-11 rounded-md bg-slate-100" />
          </div>
          <div className="space-y-2">
            <SkeletonLine className="w-20 bg-slate-200" />
            <SkeletonBlock className="h-11 rounded-md bg-slate-100" />
          </div>
          <SkeletonBlock className="h-11 rounded-md bg-slate-200" />
        </div>
      </section>
    </div>
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <AdminShellSkeleton>
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <SkeletonBlock className="h-48 rounded-2xl bg-slate-100 dark:bg-[#141414]" />
          <SkeletonBlock className="h-48 rounded-2xl bg-slate-100 dark:bg-[#141414]" />
          <SkeletonBlock className="h-48 rounded-2xl bg-slate-100 dark:bg-[#141414]" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SkeletonBlock className="h-[320px] rounded-2xl bg-slate-100 dark:bg-[#141414]" />
          <SkeletonBlock className="h-[320px] rounded-2xl bg-slate-100 dark:bg-[#141414]" />
        </div>

        <SkeletonBlock className="h-[260px] rounded-2xl bg-slate-100 dark:bg-[#141414]" />
      </div>
    </AdminShellSkeleton>
  );
}

export function TableLoadingSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <AdminShellSkeleton>
      <section className="space-y-6 animate-pulse">
        <div>
          <SkeletonBlock className="h-8 w-40 rounded-full bg-slate-200 dark:bg-[#242424]" />
          <SkeletonLine className="mt-3 w-80 bg-slate-200 dark:bg-[#242424]" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-[#282828] dark:bg-[#0a0a0a]">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-[#282828] dark:bg-[#030303]">
            <SkeletonBlock className="h-4 w-28 rounded-full bg-slate-200 dark:bg-[#242424]" />
            <SkeletonBlock className="h-4 w-20 rounded-full bg-slate-200 dark:bg-[#242424]" />
          </div>

          <div className="divide-y divide-slate-50 dark:divide-[#282828]">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-4 px-6 py-4">
                <SkeletonLine className="col-span-1 w-32 bg-slate-100 dark:bg-[#141414]" />
                <SkeletonLine className="col-span-1 w-40 bg-slate-100 dark:bg-[#141414]" />
                <SkeletonLine className="col-span-1 w-24 bg-slate-100 dark:bg-[#141414]" />
                <SkeletonLine className="col-span-1 w-28 bg-slate-100 dark:bg-[#141414]" />
                <SkeletonBlock className="col-span-1 ml-auto h-9 w-24 rounded-xl bg-slate-100 dark:bg-[#141414]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminShellSkeleton>
  );
}

export function FormLoadingSkeleton({ withSidebarSummary = false }: { withSidebarSummary?: boolean }) {
  return (
    <AdminShellSkeleton>
      <section className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-44 rounded-full bg-slate-200 dark:bg-[#242424]" />
          <SkeletonLine className="w-72 bg-slate-200 dark:bg-[#242424]" />
        </div>

        <div className={cn('grid grid-cols-1 gap-6', withSidebarSummary ? 'lg:grid-cols-3' : '')}>
          <div className={cn('space-y-6', withSidebarSummary ? 'lg:col-span-2' : 'lg:col-span-1')}>
            <SkeletonBlock className="h-[420px] rounded-2xl bg-slate-100 dark:bg-[#141414]" />
            <SkeletonBlock className="h-[460px] rounded-2xl bg-slate-100 dark:bg-[#141414]" />
          </div>

          {withSidebarSummary ? <SkeletonBlock className="h-[520px] rounded-2xl bg-slate-100 dark:bg-[#141414] lg:sticky lg:top-6" /> : null}
        </div>
      </section>
    </AdminShellSkeleton>
  );
}

export function ServiceLoadingSkeleton() {
  return (
    <AdminShellSkeleton>
      <section className="relative space-y-8 animate-pulse">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-2">
            <SkeletonBlock className="h-8 w-36 rounded-full bg-slate-200 dark:bg-[#242424]" />
            <SkeletonLine className="w-64 bg-slate-200 dark:bg-[#242424]" />
          </div>
          <SkeletonBlock className="h-11 w-32 rounded-xl bg-slate-200 dark:bg-[#242424]" />
        </div>

        <div className="grid grid-cols-1 gap-6 pb-20 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-40 rounded-2xl bg-slate-100 dark:bg-[#141414]" />
          ))}
        </div>

        <SkeletonBlock className="fixed bottom-10 right-10 z-40 h-16 w-16 rounded-full bg-slate-200 dark:bg-[#242424] lg:bottom-12 lg:right-14" />
      </section>
    </AdminShellSkeleton>
  );
}

export function CommunicationLoadingSkeleton({ titleWidth = 'w-56' }: { titleWidth?: string }) {
  return (
    <AdminShellSkeleton>
      <section className="max-w-2xl space-y-8 animate-pulse">
        <div className="space-y-2">
          <SkeletonBlock className={cn('h-8 rounded-full bg-slate-200 dark:bg-[#242424]', titleWidth)} />
          <SkeletonLine className="w-72 bg-slate-200 dark:bg-[#242424]" />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-[#282828] dark:bg-[#0a0a0a]">
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-slate-100 dark:bg-[#141414]" />
          <SkeletonBlock className="mx-auto mb-3 h-6 w-48 rounded-full bg-slate-100 dark:bg-[#141414]" />
          <SkeletonLine className="mx-auto mb-8 w-80 bg-slate-100 dark:bg-[#141414]" />
          <SkeletonBlock className="mx-auto mb-8 h-56 w-56 rounded-2xl bg-slate-100 dark:bg-[#141414]" />
          <SkeletonBlock className="mx-auto h-11 w-48 rounded-xl bg-slate-100 dark:bg-[#141414]" />
        </div>
      </section>
    </AdminShellSkeleton>
  );
}

export function SettingsLoadingSkeleton() {
  return (
    <AdminShellSkeleton>
      <section className="max-w-3xl space-y-8 animate-pulse">
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-40 rounded-full bg-slate-200 dark:bg-[#242424]" />
          <SkeletonLine className="w-72 bg-slate-200 dark:bg-[#242424]" />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-[#282828] dark:bg-[#0a0a0a]">
          <SkeletonBlock className="mb-5 h-6 w-44 rounded-full bg-slate-200 dark:bg-[#242424]" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <SkeletonLine className="w-36 bg-slate-200 dark:bg-[#242424]" />
              <SkeletonBlock className="h-12 rounded-xl bg-slate-100 dark:bg-[#141414]" />
            </div>
            <div className="space-y-2">
              <SkeletonLine className="w-28 bg-slate-200 dark:bg-[#242424]" />
              <SkeletonBlock className="h-12 rounded-xl bg-slate-100 dark:bg-[#141414]" />
            </div>
          </div>

          <SkeletonBlock className="mb-5 mt-8 h-6 w-48 rounded-full bg-slate-200 dark:bg-[#242424]" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <SkeletonLine className="w-16 bg-slate-200 dark:bg-[#242424]" />
              <SkeletonBlock className="h-12 rounded-xl bg-slate-100 dark:bg-[#141414]" />
            </div>
            <div className="space-y-2">
              <SkeletonLine className="w-32 bg-slate-200 dark:bg-[#242424]" />
              <SkeletonBlock className="h-12 rounded-xl bg-slate-100 dark:bg-[#141414]" />
            </div>
          </div>

          <SkeletonBlock className="mt-8 h-12 w-36 rounded-xl bg-slate-200 dark:bg-[#242424]" />
        </div>
      </section>
    </AdminShellSkeleton>
  );
}