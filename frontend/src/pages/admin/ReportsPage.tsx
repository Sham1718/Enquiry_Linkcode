import { useEffect, useState } from "react";
import { reportService } from "../../services/admin/reportService";
import { enquiryService } from "../../services/admin/enquiryService";
import { useToast } from "../../context/ToastContext";
import { Button } from "../../components/admin/common/Button";
import { Skeleton, EmptyState, ErrorState } from "../../components/admin/common/EmptyState";
import { StatusDonut } from "../../components/admin/StatusDonut";
import { EnquiryTable } from "../../components/admin/EnquiryTable";
import { StatCard } from "../../components/admin/StatCard";
import type { DashboardData, Enquiry } from "../../types";

export default function ReportsPage() {
  const toast = useToast();
  const [data, setData] = useState<DashboardData | null>(null);
  const [recent, setRecent] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exporting, setExporting] = useState(false);

  async function load() {
    setLoading(true); setError(false);
    try {
      const { dashboard, recent } = await reportService.overview();
      setData(dashboard);
      setRecent(recent);
    } catch { setError(true); } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function handleExport() {
    setExporting(true);
    try { await enquiryService.exportExcel(); toast.success("Excel downloaded"); }
    catch { toast.error("Failed to download Excel"); }
    finally { setExporting(false); }
  }

  return (
    <div className="space-y-5 anim-fade-up">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Reports</h2>
          <p className="mt-1 text-[13.5px] text-slate-500">Operational performance and export tools.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" loading={exporting} onClick={handleExport} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>}>
            Download Excel
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : error || !data ? (
        <ErrorState onRetry={load} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total" value={data.totalEnquiries} tone="blue" />
            <StatCard label="New" value={data.newEnquiries} tone="sky" />
            <StatCard label="Interested" value={data.interestedEnquiries} tone="blue" />
            <StatCard label="Hot" value={data.hotEnquiries} tone="rose" />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="fc-card lg:col-span-2 p-5 sm:p-6">
              <div className="mb-4">
                <h3 className="text-[15px] font-semibold text-slate-900">Status distribution</h3>
                <p className="text-[12px] text-slate-500">Pipeline breakdown across all enquiries</p>
              </div>
              <StatusDonut data={data} />
            </div>
            <div className="fc-card p-5 sm:p-6">
              <h3 className="mb-1 text-[15px] font-semibold text-slate-900">Course interest</h3>
              <p className="mb-4 text-[12px] text-slate-500">Breakdown by programme (when available)</p>
              <EmptyState
                className="!py-8"
                title="Course analytics unavailable"
                description="Course-level analytics will appear here when the backend exposes them."
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900">Latest enquiries</h3>
              <p className="text-[12px] text-slate-500">Snapshot of the most recent leads</p>
            </div>
            {recent.length === 0 ? <EmptyState title="No enquiries" /> : <EnquiryTable rows={recent} compact />}
          </div>
        </>
      )}
    </div>
  );
}
