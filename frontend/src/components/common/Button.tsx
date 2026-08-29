import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#1D4ED8] text-white hover:bg-[#1E40AF] active:bg-[#1E3A8A] shadow-[0_10px_24px_-12px_rgba(29,78,216,0.55)]",
  secondary:
    "bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]",
  ghost: "bg-transparent text-[#0F172A] hover:bg-[#F1F5F9]",
  outline:
    "bg-white/60 backdrop-blur text-[#1D4ED8] border border-[#BFDBFE] hover:border-[#60A5FA] hover:bg-[#EFF6FF]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-full",
  md: "h-11 px-5 text-[15px] rounded-full",
  lg: "h-14 px-7 text-base rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      disabled,
      iconRight,
      iconLeft,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-200 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#BFDBFE] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed select-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...rest}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span>Please wait…</span>
          </span>
        ) : (
          <>
            {iconLeft}
            <span>{children}</span>
            {iconRight}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
