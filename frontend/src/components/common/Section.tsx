import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
};

export function Section({ id, className, children, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full", className)}>
      <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/80 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#475569]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
      {children}
    </div>
  );
}
