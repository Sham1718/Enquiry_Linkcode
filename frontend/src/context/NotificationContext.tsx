import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { notificationService } from "../services/notification.service";
import type { NotificationItem } from "../types";

const PAGE_SIZE = 10;

interface NotificationContextValue {
  unreadCount: number;
  notifications: NotificationItem[];
  loading: boolean;
  page: number;
  totalPages: number;
  totalElements: number;
  setPage: (page: number) => void;
  refresh: () => Promise<void>;
  markRead: (id: string | number) => Promise<void>;
  panelOpen: boolean;
  setPanelOpen: (v: boolean) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children, autoLoad = true }: { children: ReactNode; autoLoad?: boolean }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationService.list({ page, size: PAGE_SIZE });
      setNotifications(res.notifications);
      setUnreadCount(res.unreadCount);
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
    } catch {
      // silent — UI surfaces fallback state
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (autoLoad) refresh();
  }, [autoLoad, refresh]);

  const markRead = useCallback(async (id: string | number) => {
  try {
    console.log("Marking notification as read:", id);

    await notificationService.markAsRead(id);

    console.log("Mark as read API successful:", id);

    // Refresh only after successful backend update
    await refresh();

    console.log("Notifications refreshed");
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    await refresh();
  }
}, [refresh]);

  const value = useMemo(() => ({
    unreadCount, notifications, loading, page, totalPages, totalElements, setPage,
    refresh, markRead, panelOpen, setPanelOpen,
  }), [unreadCount, notifications, loading, page, totalPages, totalElements, refresh, markRead, panelOpen]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
