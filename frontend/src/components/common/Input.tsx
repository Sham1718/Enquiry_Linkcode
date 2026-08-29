import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, iconLeft, iconRight, id, ...rest }, ref) => {
    const inputId = id || rest.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#0F172A] mb-2 tracking-tight"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "group relative flex items-center rounded-2xl border bg-white transition-all duration-200",
            "h-14 px-4",
            error
              ? "border-[#FCA5A5] ring-4 ring-[#FEE2E2]"
              : "border-[#E2E8F0] hover:border-[#CBD5E1] focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#DBEAFE]"
          )}
        >
          {iconLeft && <span className="mr-3 text-[#64748B]">{iconLeft}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-transparent text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none tracking-tight",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...rest}
          />
          {iconRight && <span className="ml-3 text-[#64748B]">{iconRight}</span>}
        </div>
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-[#DC2626] flex items-center gap-1.5"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
            {error}
          </p>
        ) : hint ? (
          <p className="mt-2 text-xs text-[#64748B]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
