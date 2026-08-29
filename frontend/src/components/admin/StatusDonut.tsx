import type { DashboardData } from "../../types";
import { cn } from "../../utils/cn";

export function StatusDonut({ data, size = 200 }: { data: DashboardData; size?: number }) {
  const total = Math.max(1, data.totalEnquiries);
  const items = [
    { key: "NEW", label: "New", value: data.newEnquiries, color: "#0ea5e9" },
    { key: "INTERESTED", label: "Interested", value: data.interestedEnquiries, color: "#2563eb" },
    { key: "HOT", label: "Hot", value: data.hotEnquiries, color: "#e11d48" },
    { key: "COLD", label: "Cold", value: data.coldEnquiries, color: "#94a3b8" },
    ...(data.notInterestedEnquiries !== undefined
      ? [{ key: "NOT_INTERESTED", label: "Not Interested", value: data.notInterestedEnquiries, color: "#71717a" }]
      : []),
  ];
  const r = (size - 28) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef2f7" strokeWidth="20" />
          {items.map((it) => {
            const frac = it.value / total;
            const len = frac * C;
            const dasharray = `${len} ${C - len}`;
            const el = (
              <circle
                key={it.key}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={it.color}
                strokeWidth="20"
                strokeDasharray={dasharray}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                className="transition-[stroke-dasharray] duration-700"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-slate-500">Total</div>
          <div className="text-3xl font-bold tracking-tight text-slate-900">{data.totalEnquiries}</div>
          <div className="text-[11px] text-slate-500">Enquiries</div>
        </div>
      </div>

      <ul className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:min-w-[200px]">
        {items.map(it => {
          const pct = Math.round((it.value / total) * 100);
          return (
            <li key={it.key} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-white px-3 py-2">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: it.color }} />
                <span className="text-[12.5px] font-medium text-slate-700">{it.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] font-bold text-slate-900">{it.value}</span>
                <span className={cn("text-[11px] font-semibold text-slate-400")}>{pct}%</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
