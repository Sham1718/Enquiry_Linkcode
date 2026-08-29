import { cn } from "../../utils/cn";

export function Pagination({
  page, totalPages, onPage, totalElements, size,
}: { page: number; totalPages: number; onPage: (p: number) => void; totalElements: number; size: number; }) {
  const from = totalElements === 0 ? 0 : page * size + 1;
  const to = Math.min(totalElements, (page + 1) * size);
  const items = buildPageItems(page, totalPages);
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-white px-4 py-3 sm:flex-row">
      <div className="text-[12.5px] text-slate-500">
        Showing <span className="font-semibold text-slate-700">{from}</span>–<span className="font-semibold text-slate-700">{to}</span> of <span className="font-semibold text-slate-700">{totalElements}</span> results
      </div>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          onClick={() => onPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 text-[12.5px] font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Prev
        </button>
        {items.map((it, i) =>
          it === "…" ? (
            <span key={`e${i}`} className="px-1 text-slate-400">…</span>
          ) : (
            <button
              key={it}
              onClick={() => onPage(it)}
              className={cn(
                "inline-flex h-8 min-w-[32px] items-center justify-center rounded-md px-2 text-[12.5px] font-semibold transition-colors",
                it === page ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              )}
            >
              {it + 1}
            </button>
          ),
        )}
        <button
          onClick={() => onPage(Math.min(totalPages - 1, page + 1))}
          disabled={page >= totalPages - 1}
          className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 text-[12.5px] font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </nav>
    </div>
  );
}

function buildPageItems(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);
  const result: (number | "…")[] = [];
  result.push(0);
  if (page > 3) result.push("…");
  for (let i = Math.max(1, page - 1); i <= Math.min(total - 2, page + 1); i++) result.push(i);
  if (page < total - 4) result.push("…");
  result.push(total - 1);
  return result;
}
