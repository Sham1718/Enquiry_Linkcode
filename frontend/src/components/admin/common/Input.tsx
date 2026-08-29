import { type InputHTMLAttributes, forwardRef, type ReactNode, useState } from "react";
import { cn } from "../../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string | null;
  leftIcon?: ReactNode;
  rightAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftIcon, rightAdornment, className, id, ...rest },
  ref,
) {
  const reactId = `inp-${Math.random().toString(36).slice(2, 8)}`;
  const inputId = id || reactId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-[12px] font-semibold tracking-wide text-slate-600 uppercase">
          {label}
        </label>
      )}
      <div className={cn(
        "group relative flex items-center rounded-lg border bg-white transition-all duration-150",
        error ? "border-rose-300 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-100" : "border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100",
        "hover:border-slate-300",
      )}>
        {leftIcon && <span className="pl-3 text-slate-400">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 w-full bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none",
            leftIcon && "pl-2",
            rightAdornment && "pr-2",
            className,
          )}
          {...rest}
        />
        {rightAdornment && <span className="pr-2">{rightAdornment}</span>}
      </div>
      {error ? (
        <p className="mt-1.5 text-[12px] font-medium text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
});

interface PasswordInputProps extends Omit<InputProps, "type" | "rightAdornment"> {}

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      rightAdornment={
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="rounded-md px-2 py-1 text-[11px] font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      }
    />
  );
}
