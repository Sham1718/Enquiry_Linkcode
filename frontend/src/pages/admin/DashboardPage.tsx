import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardService } from "../../services/admin/dashboardService";
import { enquiryService } from "../../services/admin/enquiryService";
import { StatCard } from "../../components/admin/StatCard";
import { StatusDonut } from "../../components/admin/StatusDonut";
import { EnquiryTable } from "../../components/admin/EnquiryTable";
import { EmptyState, ErrorState, Skeleton } from "../../components/admin/common/EmptyState";
import { Button } from "../../components/admin/common/Button";
import { greeting } from "../../utils/cn";
import type { DashboardData, Enquiry } from "../../types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [recent, setRecent] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  // testing the ci/cd from frontend 
  async function load() {
    setLoading(true);
    setError(false);
    try {
      const [d, p] = await Promise.all([
        dashboardService.getDashboard(),
        enquiryService.list({ page: 0, size: 5 }),
      ]);
      setData(d);
      setRecent(p.content);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">{greeting()}, Admin 👋</div>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Here's what's happening with your enquiries today.</h2>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/enquiries" className="inline-flex">
            <Button variant="outline" size="md" iconRight={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}>
              View all enquiries
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary KPI */}
      {loading ? (
        <Skeleton className="h-32 w-full" />
      ) : error || !data ? (
        <ErrorState onRetry={load} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <StatCard
              primary
              label="Total Enquiries"
              value={data.totalEnquiries.toLocaleString()}
              hint="All-time student leads received"
              tone="blue"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12c0-4.5 4-8 9-8s9 3.5 9 8-4 8-9 8c-2 0-3.8-.5-5.3-1.3"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/></svg>}
            />
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <StatCard label="New" value={data.newEnquiries} tone="sky" hint="Fresh enquiries awaiting action" icon={<DotIcon />} />
                <StatCard label="Interested" value={data.interestedEnquiries} tone="blue" hint="Engaged and exploring options" icon={<HeartIcon />} />
                <StatCard label="Hot" value={data.hotEnquiries} tone="rose" hint="High-intent, ready to join" icon={<FlameIcon />} />
                <StatCard label="Cold" value={data.coldEnquiries} tone="slate" hint="Needs re-engagement" icon={<SnowIcon />} />
              </div>
            </div>
          </div>

          {/* Analytics area */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="fc-card lg:col-span-2 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-900">Status distribution</h3>
                  <p className="text-[12px] text-slate-500">Pipeline breakdown across {data.totalEnquiries} enquiries</p>
                </div>
                <div className="hidden text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 sm:block">Live</div>
              </div>
              <StatusDonut data={data} />
            </div>
            <div className="fc-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-900">Conversion health</h3>
                  <p className="text-[12px] text-slate-500">Hot + Interested vs. total</p>
                </div>
              </div>
              <div className="space-y-4">
                <Bar
                  label="Hot leads"
                  value={data.hotEnquiries}
                  total={data.totalEnquiries}
                  color="bg-rose-500"
                />
                <Bar
                  label="Interested"
                  value={data.interestedEnquiries}
                  total={data.totalEnquiries}
                  color="bg-blue-500"
                />
                <Bar
                  label="New"
                  value={data.newEnquiries}
                  total={data.totalEnquiries}
                  color="bg-sky-500"
                />
                <Bar
                  label="Cold"
                  value={data.coldEnquiries}
                  total={data.totalEnquiries}
                  color="bg-slate-400"
                />
              </div>
              <div className="mt-5 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-3 text-[11.5px] text-slate-500">
                More insights will appear as additional enquiry data becomes available.
              </div>
            </div>
          </div>

          {/* Recent enquiries */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">Recent enquiries</h3>
                <p className="text-[12px] text-slate-500">Latest leads received across all channels</p>
              </div>
              <Link to="/admin/enquiries" className="text-[12.5px] font-semibold text-blue-600 hover:text-blue-700">View all →</Link>
            </div>
            {loading ? <Skeleton className="h-72 w-full" /> :
              recent.length === 0 ? <EmptyState title="No enquiries yet" description="New leads will appear here as they come in." /> :
              <EnquiryTable rows={recent} compact />
            }
          </div>
        </>
      )}
    </div>
  );
}

function Bar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[12px]">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value} <span className="text-slate-400">· {pct.toFixed(0)}%</span></span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color} transition-[width] duration-700`} style={{ width: `${Math.max(2, pct)}%` }} />
      </div>
    </div>
  );
}

function DotIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>; }
function HeartIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; }
function FlameIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>; }
function SnowIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></svg>; }
