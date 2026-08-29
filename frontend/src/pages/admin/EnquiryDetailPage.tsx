import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { enquiryService } from "../../services/admin/enquiryService";
import { useToast } from "../../context/ToastContext";
import { Avatar } from "../../components/admin/common/Avatar";
import { StatusBadge } from "../../components/admin/common/Badge";
import { Button } from "../../components/admin/common/Button";
import { EmptyState, ErrorState, Skeleton } from "../../components/admin/common/EmptyState";
import { Select } from "../../components/admin/common/Select";
import { formatDate, formatRelative } from "../../utils/cn";
import { STATUS_OPTIONS } from "../../types";
import type { Enquiry, EnquiryStatus } from "../../types";
import { cn } from "../../utils/cn";

export default function EnquiryDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [status, setStatus] = useState<EnquiryStatus>("NEW");
  const [joiningDate, setJoiningDate] = useState<string>("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true); setError(false);
    try {
      const e = await enquiryService.get(id);
      setEnquiry(e);
      setStatus(e.status);
      setJoiningDate(e.joiningDate || "");
    } catch {
      setError(true);
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [id]);

  const dirty = useMemo(() => {
    if (!enquiry) return false;
    return status !== enquiry.status || (joiningDate || "") !== (enquiry.joiningDate || "");
  }, [enquiry, status, joiningDate]);

  const enquiryCreatedAt = enquiry?.createdAt?.slice(0, 10) || "";
  const joiningDateError = useMemo(() => {
    if (!joiningDate) return null;
    if (enquiryCreatedAt && joiningDate < enquiryCreatedAt) return "Joining date cannot be before enquiry date.";
    return null;
  }, [joiningDate, enquiryCreatedAt]);

  async function handleSave() {
    if (!enquiry) return;
    if (joiningDateError) return;
    setSaving(true);
    try {
      const updated = await enquiryService.update(enquiry.id, { status, joiningDate: joiningDate || null });
      setEnquiry(updated);
      toast.success("Enquiry updated");
    } catch {
      toast.error("Failed to update enquiry");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  if (error || !enquiry) {
    return <ErrorState onRetry={load} title="Enquiry not found" description="This enquiry may have been removed or the link is invalid." />;
  }

  return (
    <div className="space-y-5 anim-fade-up">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12.5px] font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
        <span className="text-[12.5px] text-slate-400">/</span>
        <Link to="/admin/enquiries" className="text-[12.5px] font-semibold text-slate-500 hover:text-slate-800">Enquiries</Link>
        <span className="text-[12.5px] text-slate-400">/</span>
        <span className="font-mono text-[12.5px] font-semibold text-slate-700">{enquiry.id}</span>
      </div>

      {/* Profile header */}
      <div className="fc-card relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50" />
        <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="flex items-end gap-4">
            <div className="rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-100">
              <Avatar name={enquiry.studentName} size={64} />
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] font-bold tracking-tight text-slate-900 sm:text-2xl">{enquiry.studentName}</h2>
                <StatusBadge status={enquiry.status} />
              </div>
              <p className="mt-1 text-[13px] text-slate-500">{enquiry.email} · {enquiry.phone}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <a href={`mailto:${enquiry.email}`} className="inline-flex">
              <Button variant="outline" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}>Email</Button>
            </a>
            <a href={`tel:${enquiry.phone.replace(/\s/g, "")}`} className="inline-flex">
              <Button variant="outline" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}>Call</Button>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-5 lg:col-span-2">
          {/* Student section */}
          <Section title="Student" subtitle="Personal and contact information">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <Field label="Full name" value={enquiry.studentName} />
              <Field label="Email" value={enquiry.email} mono />
              <Field label="Phone" value={enquiry.phone} mono />
              <Field label="Reference" value={enquiry.reference || "—"} />
            </div>
          </Section>

          {/* Course */}
          <Section title="Course" subtitle="Programme the student is interested in">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-slate-900">{enquiry.courseInterested}</div>
                <p className="mt-1 text-[12.5px] text-slate-500">Full-time · Weekday batches · Placement assistance included</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-[11.5px] font-semibold text-blue-700">Career track</span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-[11.5px] font-semibold text-emerald-700">Certification</span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2 py-1 text-[11.5px] font-semibold text-indigo-700">EMI available</span>
                </div>
              </div>
            </div>
            {enquiry.message && (
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">Student message</div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700">{enquiry.message}</p>
              </div>
            )}
          </Section>

          {/* Enquiry timeline */}
          <Section title="Enquiry" subtitle="Channel and creation details">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <Field label="Enquiry date" value={formatDate(enquiry.createdAt)} />
              <Field label="Enquiry ID" value={enquiry.id} mono />
              <Field label="Created" value={formatRelative(enquiry.createdAt)} />
              <Field label="Source" value={enquiry.reference || "Direct"} />
            </div>
          </Section>
        </div>

        {/* Sidebar: Admission status */}
        <div className="space-y-5">
          <div className="fc-card p-5">
            <div className="mb-4">
              <h3 className="text-[14px] font-semibold text-slate-900">Admission status</h3>
              <p className="text-[12px] text-slate-500">Update lead status and joining date</p>
            </div>

            <div className="space-y-4">
              <Select label="Status" value={status} onChange={e => setStatus(e.target.value as EnquiryStatus)}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
              </Select>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold tracking-wide text-slate-600 uppercase">Joining date</label>
                <input
                  type="date"
                  min={enquiryCreatedAt}
                  value={joiningDate}
                  onChange={e => setJoiningDate(e.target.value)}
                  className={cn(
                    "h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2",
                    joiningDateError ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100" : "border-slate-200 focus:border-blue-500 focus:ring-blue-100",
                  )}
                />
                {joiningDateError ? (
                  <p className="mt-1.5 text-[12px] font-medium text-rose-600">{joiningDateError}</p>
                ) : (                    <p className="mt-1.5 text-[12px] text-slate-500">Cannot be before enquiry date ({formatDate(enquiry.createdAt)}).</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button onClick={handleSave} loading={saving} disabled={!dirty || !!joiningDateError || saving} block>
                  Save changes
                </Button>
                <Button variant="ghost" onClick={() => { setStatus(enquiry.status); setJoiningDate(enquiry.joiningDate || ""); }} disabled={!dirty || saving}>
                  Reset
                </Button>
              </div>
            </div>
          </div>

          <ActivityTimeline enquiry={enquiry} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="fc-card p-5 sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold tracking-wide text-slate-900 uppercase">{title}</h3>
          {subtitle && <p className="mt-0.5 text-[12.5px] text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className={cn("mt-1 text-[14px] font-medium text-slate-900", mono && "font-mono text-[13px]")}>{value}</div>
    </div>
  );
}

function ActivityTimeline({ enquiry }: { enquiry: Enquiry }) {
  const items = [
    { date: enquiry.createdAt, title: "New enquiry received", body: `${enquiry.studentName} submitted an enquiry for ${enquiry.courseInterested}.` },
  ];
  if (enquiry.joiningDate) {
    items.push({ date: enquiry.joiningDate, title: "Joining date set", body: `Planned joining date updated to ${formatDate(enquiry.joiningDate)}.` });
  }
  if (enquiry.status === "HOT" || enquiry.status === "INTERESTED") {
    items.push({ date: enquiry.createdAt, title: "Admin contacted student", body: "Initial outreach completed by admissions team." });
  }

  return (
    <div className="fc-card p-5">
      <div className="mb-4">
        <h3 className="text-[14px] font-semibold tracking-wide text-slate-900 uppercase">Activity</h3>
        <p className="text-[12px] text-slate-500">Recent touchpoints with this lead</p>
      </div>
      {items.length === 0 ? (
        <EmptyState
          className="!py-8"
          title="No follow-up activity yet"
          description="Future follow-ups will appear here as the conversation progresses."
        />
      ) : (
        <ol className="relative space-y-5 border-l border-slate-200 pl-5">
          {items.map((it, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[27px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-white ring-2 ring-blue-500">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </span>
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-blue-600">{formatDate(it.date)}</div>
              <div className="mt-0.5 text-[13.5px] font-semibold text-slate-900">{it.title}</div>
              <p className="mt-0.5 text-[12.5px] text-slate-500">{it.body}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
