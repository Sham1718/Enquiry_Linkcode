import { useEffect, useMemo, useRef, useState } from "react";
import { enquiryService, type EnquiryQuery } from "../../services/admin/enquiryService";
import { useToast } from "../../context/ToastContext";
import { EnquiryTable } from "../../components/admin/EnquiryTable";
import { Pagination } from "../../components/admin/Pagination";
import { EmptyState, ErrorState, Skeleton } from "../../components/admin/common/EmptyState";
import { Button } from "../../components/admin/common/Button";
import { Select } from "../../components/admin/common/Select";
import { cn, formatDate } from "../../utils/cn";
import type { Enquiry, EnquiryStatus } from "../../types";
import { STATUS_OPTIONS } from "../../types";

const PAGE_SIZE = 10;

const COURSES = [
  "Java Full Stack Development",
  "Python & Data Science",
  "MERN Stack Development",
  "Cloud & DevOps",
  "Data Analytics",
  "AI & Machine Learning",
  "Cybersecurity Essentials",
  "UI/UX Design Pro",
];

export default function EnquiriesPage() {
  const toast = useToast();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [status, setStatus] = useState<"ALL" | EnquiryStatus>("ALL");
  const [course, setCourse] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exporting, setExporting] = useState(false);

  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => setDebounced(search), 350);
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  }, [search]);

  const activeFilters = useMemo(() => {
    const f: { key: string; label: string; clear: () => void }[] = [];
    if (status !== "ALL") f.push({ key: "status", label: `Status: ${status}`, clear: () => setStatus("ALL") });
    if (course !== "ALL") f.push({ key: "course", label: `Course: ${course}`, clear: () => setCourse("ALL") });
    if (dateFrom) f.push({ key: "from", label: `From: ${formatDate(dateFrom)}`, clear: () => setDateFrom("") });
    if (dateTo) f.push({ key: "to", label: `To: ${formatDate(dateTo)}`, clear: () => setDateTo("") });
    if (debounced) f.push({ key: "q", label: `“${debounced}”`, clear: () => setSearch("") });
    return f;
  }, [status, course, dateFrom, dateTo, debounced]);

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const params: EnquiryQuery = { page, size: PAGE_SIZE, status, course, search: debounced };
      const res = await enquiryService.list(params);
      let filtered = res.content;
      if (dateFrom) filtered = filtered.filter(e => e.createdAt.slice(0, 10) >= dateFrom);
      if (dateTo) filtered = filtered.filter(e => e.createdAt.slice(0, 10) <= dateTo);
      setRows(filtered);
      setTotalElements(dateFrom || dateTo ? filtered.length : res.totalElements);
      setTotalPages(dateFrom || dateTo ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : res.totalPages);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { setPage(0); }, [status, course, debounced, dateFrom, dateTo]);
  useEffect(() => { load(); }, [page, status, course, debounced, dateFrom, dateTo]);

  function clearAll() {
    setStatus("ALL"); setCourse("ALL"); setSearch(""); setDateFrom(""); setDateTo("");
  }

  async function handleExport() {
    setExporting(true);
    try {
      await enquiryService.exportExcel();
      toast.success("Excel downloaded");
    } catch {
      toast.error("Failed to download Excel");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-5 anim-fade-up">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">All Enquiries</h2>
          <p className="mt-1 text-[13.5px] text-slate-500">Review and manage every student enquiry.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" loading={exporting} onClick={handleExport} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>}>
            Download Excel
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="fc-card p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-5">
            <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">Search</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search student, email or phone..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-sm placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Select label="Status" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="ALL">All status</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select label="Course" value={course} onChange={e => setCourse(e.target.value)}>
              <option value="ALL">All courses</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div className="md:col-span-1.5">
            <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">From</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="md:col-span-1.5">
            <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">To</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">Active</span>
            {activeFilters.map(f => (
              <button key={f.key} onClick={f.clear} className="group inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[12px] font-medium text-blue-700 transition-colors hover:bg-blue-100">
                {f.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            ))}
            <button onClick={clearAll} className="ml-1 text-[12px] font-semibold text-slate-500 hover:text-slate-800">Clear all</button>
          </div>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-72 w-full" /></div>
      ) : error ? (
        <ErrorState onRetry={load} />
      ) : rows.length === 0 ? (
        <EmptyState
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
          title="No enquiries found"
          description={activeFilters.length ? "Try adjusting your filters to see more results." : "New leads will appear here as they arrive."}
          action={activeFilters.length ? <Button variant="outline" onClick={clearAll}>Clear filters</Button> : null}
        />
      ) : (
        <div className={cn("overflow-hidden rounded-2xl border border-slate-200 bg-white")}>
          <EnquiryTable rows={rows} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPage={setPage}
            totalElements={totalElements}
            size={PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
}
