import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Tone = "blue" | "sky" | "indigo" | "rose" | "slate" | "amber" | "emerald";

const TONE_BG: Record<Tone, string> = {
  blue: "from-blue-500 to-indigo-500",
  sky: "from-sky-500 to-blue-500",
  indigo: "from-indigo-500 to-violet-500",
  rose: "from-rose-500 to-pink-500",
  slate: "from-slate-500 to-slate-600",
  amber: "from-amber-500 to-orange-500",
  emerald: "from-emerald-500 to-teal-500",
};

const TONE_SOFT: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700",
  sky: "bg-sky-50 text-sky-700",
  indigo: "bg-indigo-50 text-indigo-700",
  rose: "bg-rose-50 text-rose-700",
  slate: "bg-slate-100 text-slate-700",
  amber: "bg-amber-50 text-amber-700",
  emerald: "bg-emerald-50 text-emerald-700",
};

export function StatCard({
  label,
  value,
  hint,
  tone = "blue",
  icon,
  primary,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  primary?: boolean;
}) {
  if (primary) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-10 blur-2xl" style={{ backgroundImage: "linear-gradient(135deg, #2563eb, #6366f1)" }} />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</div>
            <div className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{value}</div>
            {hint && <div className="mt-2 text-[12.5px] text-slate-500">{hint}</div>}
          </div>
          {icon && (
            <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", TONE_BG[tone])}>
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="fc-card fc-card-hover group relative p-5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
        {icon && (
          <div className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-105", TONE_SOFT[tone])}>
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</div>
      {hint && <div className="mt-1.5 text-[12px] text-slate-500">{hint}</div>}
    </div>
  );
}
