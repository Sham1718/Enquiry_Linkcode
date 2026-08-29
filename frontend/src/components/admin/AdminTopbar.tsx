import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { formatRelative } from "../../utils/cn";
import { cn } from "../../utils/cn";

const TITLES: Record<string, { title: string; sub?: string }> = {
  "/admin/dashboard": { title: "Dashboard", sub: "Operational overview for today" },
  "/admin/enquiries": { title: "Enquiries", sub: "Manage and review every student lead" },
  "/admin/notifications": { title: "Notifications", sub: "Operational alerts and follow-ups" },
  "/admin/reports": { title: "Reports", sub: "Performance and conversion insights" },
  "/admin/settings": { title: "Settings", sub: "Workspace and account preferences" },
};

function pageMeta(path: string) {
  if (path.startsWith("/admin/enquiries/")) return { title: "Enquiry Details", sub: "Student profile and admission status" };
  return TITLES[path] || { title: "FORTUNECloud" };
}

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const location = useLocation();
  const meta = pageMeta(location.pathname);
  const { unreadCount, notifications, panelOpen, setPanelOpen, markRead, refresh, loading } = useNotifications();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isSearchable = location.pathname === "/admin/enquiries" || location.pathname === "/admin/dashboard";

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setPanelOpen(false);
    }
    if (panelOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [panelOpen, setPanelOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold text-slate-900 sm:text-[16px]">{meta.title}</h1>
          {meta.sub && <p className="hidden truncate text-[12.5px] text-slate-500 sm:block">{meta.sub}</p>}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {isSearchable && (
            <div className="hidden md:block">
              <Link
                to="/admin/enquiries"
                className="group relative flex h-9 w-56 items-center rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-sm text-slate-400 transition-colors hover:border-slate-300 hover:bg-slate-50"
                aria-label="Search students"
              >
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <span>Search students…</span>
                <span className="ml-auto rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">/</span>
              </Link>
            </div>
          )}

          <div className="relative" ref={panelRef}>
            <button
              onClick={() => { setPanelOpen(!panelOpen); if (!panelOpen) refresh(); }}
              aria-label="Notifications"
              className="relative rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {panelOpen && (
              <div className="anim-slide-down absolute right-0 z-50 mt-2 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">Notifications</div>
                    <div className="text-[11.5px] text-slate-500">{unreadCount} unread alerts</div>
                  </div>
                  <Link to="/admin/notifications" onClick={() => setPanelOpen(false)} className="text-[12px] font-semibold text-blue-600 hover:text-blue-700">View all</Link>
                </div>
                <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
                  {loading ? (
                    <div className="space-y-2 p-4">
                      {[0, 1, 2].map(i => <div key={i} className="skeleton h-16 w-full" />)}
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-[12.5px] text-slate-500">No notifications yet.</div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {notifications.slice(0, 5).map(n => (
                        <li key={n.id} className={cn("flex gap-3 px-4 py-3", !n.isRead && "bg-blue-50/40")}>
                          <span className={cn(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            n.isRead ? "bg-slate-300" : "bg-blue-600 dot-pulse",
                          )} />
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Follow up this lead</div>
                            <p className="mt-0.5 text-[13px] leading-snug text-slate-800">{n.message}</p>
                            <p className="mt-1 text-[11.5px] text-slate-500">{n.courseInterested} · {formatRelative(n.createdAt)}</p>
                            {!n.isRead && (
                              <button onClick={() => markRead(n.id)} className="mt-1.5 text-[11.5px] font-semibold text-blue-600 hover:text-blue-700">Mark as read</button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />
          <div className="hidden items-center gap-2 sm:flex">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-[11px] font-bold text-white">A</div>
            <div className="text-right leading-tight">
              <div className="text-[12.5px] font-semibold text-slate-900">Admin</div>
              <div className="text-[10.5px] text-slate-500">Super admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
