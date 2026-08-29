import type { EnquiryStatus } from "../../../types";
import { cn } from "../../../utils/cn";

export function StatusBadge({ status, size = "md" }: { status: EnquiryStatus | string; size?: "sm" | "md" }) {
  const cfg: Record<string, { dot: string; bg: string; text: string; label: string }> = {
    NEW: { dot: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-700", label: "New" },
    INTERESTED: { dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700", label: "Interested" },
    HOT: { dot: "bg-rose-500", bg: "bg-rose-50", text: "text-rose-700", label: "Hot" },
    COLD: { dot: "bg-slate-400", bg: "bg-slate-100", text: "text-slate-600", label: "Cold" },
    NOT_INTERESTED: { dot: "bg-zinc-500", bg: "bg-zinc-100", text: "text-zinc-700", label: "Not Interested" },
  };
  const c = cfg[status] || cfg.NEW;
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium",
      c.bg, c.text,
      size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]",
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}

export function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "blue" | "green" | "amber" | "rose" | "indigo" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    indigo: "bg-indigo-50 text-indigo-700",
  } as const;
  return <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold", tones[tone])}>{children}</span>;
}
