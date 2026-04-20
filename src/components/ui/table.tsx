import type { PropsWithChildren, TableHTMLAttributes } from 'react';

interface TableProps extends TableHTMLAttributes<HTMLTableElement>, PropsWithChildren {}

export default function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className={`w-full text-left text-sm ${className ?? ''}`} {...props}>
        {children}
      </table>
    </div>
  );
}