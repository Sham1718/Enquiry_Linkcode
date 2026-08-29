import { type SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "../../../utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, className, id, children, ...rest }, ref) {
  const reactId = `sel-${Math.random().toString(36).slice(2, 8)}`;
  const selectId = id || reactId;
  return (
    <div className="w-full">
      {label && <label htmlFor={selectId} className="mb-1.5 block text-[12px] font-semibold tracking-wide text-slate-600 uppercase">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 hover:border-slate-300",
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
});
