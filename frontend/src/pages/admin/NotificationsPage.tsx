import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { EmptyState, Skeleton } from "../../components/admin/common/EmptyState";
import { Button } from "../../components/admin/common/Button";
import { formatRelative } from "../../utils/cn";
import { cn } from "../../utils/cn";

export default function NotificationsPage() {
  const { notifications, loading, markRead, unreadCount, refresh } = useNotifications();

  return (
    <div className="space-y-5 anim-fade-up">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h2>
          <p className="mt-1 text-[13.5px] text-slate-500">{unreadCount} unread alert{unreadCount === 1 ? "" : "s"} for you today.</p>
        </div>
        <Button variant="outline" onClick={refresh} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/></svg>}
          title="No notifications yet"
          description="Operational alerts about your leads will appear here."
        />
      ) : (
        <ul className="space-y-2">
          {notifications.map(n => (
            <li key={n.id} className={cn("fc-card fc-card-hover p-4 sm:p-5", !n.isRead && "ring-1 ring-blue-100")}>
              <div className="flex items-start gap-4">
                <span className={cn(
                  "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                  n.isRead ? "bg-slate-300" : "bg-blue-600 dot-pulse",
                )} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">Follow up this lead</span>
                    <span className="text-[11.5px] text-slate-400">· {formatRelative(n.createdAt)}</span>
                  </div>
                  <p className="mt-1.5 text-[14px] font-semibold text-slate-900">{n.message}</p>
                  <p className="mt-0.5 text-[12.5px] text-slate-500">{n.courseInterested}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {n.enquiryId && (
                    <Link to={`/admin/enquiries/${n.enquiryId}`} className="inline-flex">
                      <Button variant="outline" size="sm">View lead</Button>
                    </Link>
                  )}
                  {!n.isRead && (
                    <Button size="sm" onClick={() => markRead(n.id)}>Mark as read</Button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
