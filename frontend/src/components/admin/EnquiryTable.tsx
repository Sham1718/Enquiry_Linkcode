import { Link } from "react-router-dom";
import type { Enquiry } from "../../types";
import { StatusBadge } from "./common/Badge";
import { Avatar } from "./common/Avatar";
import { formatDate } from "../../utils/cn";

export function EnquiryTable({ rows, compact = false }: { rows: Enquiry[]; compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-[13px]">
          <thead className="bg-slate-50/60">
            <tr className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Student</th>
              {!compact && <th className="hidden px-4 py-3 sm:table-cell">Phone</th>}
              <th className="hidden px-4 py-3 md:table-cell">Course</th>
              <th className="px-4 py-3">Status</th>
              <th className="hidden px-4 py-3 lg:table-cell">Joining Date</th>
              <th className="hidden px-4 py-3 sm:table-cell">Enquiry Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map(e => (
              <tr key={e.id} className="group transition-colors hover:bg-blue-50/30">
                <td className="px-4 py-3 font-mono text-[12px] font-semibold text-slate-500">{e.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={e.studentName} size={32} />
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-semibold text-slate-900">{e.studentName}</div>
                      <div className="truncate text-[11.5px] text-slate-500">{e.email}</div>
                    </div>
                  </div>
                </td>
                {!compact && <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">{e.phone}</td>}
                <td className="hidden max-w-[200px] truncate px-4 py-3 text-slate-600 md:table-cell">{e.courseInterested}</td>
                <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                <td className="hidden px-4 py-3 text-slate-600 lg:table-cell">{e.joiningDate ? formatDate(e.joiningDate) : <span className="text-slate-400">—</span>}</td>
                <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">{formatDate(e.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/admin/enquiries/${e.id}`}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12.5px] font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    View
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
