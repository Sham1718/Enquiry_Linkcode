import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { notificationService } from "../services/notification.service";
import type { NotificationItem } from "../types";

interface NotificationContextValue {
  unreadCount: number;
  notifications: NotificationItem[];
  loading: boolean;
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

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationService.list();
      setNotifications(res.notifications);
      setUnreadCount(res.unreadCount);
    } catch {
      // silent — UI surfaces fallback state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) refresh();
  }, [autoLoad, refresh]);

  const markRead = useCallback(async (id: string | number) => {
    // Optimistic update
    setNotifications(prev => prev.map(n => String(n.id) === String(id) ? { ...n, isRead: true } : n));
    setUnreadCount(prev => {
      const was = notifications.find(n => String(n.id) === String(id));
      return was && !was.isRead ? Math.max(0, prev - 1) : prev;
    });
    try {
      await notificationService.markRead(id);
    } catch {
      // Revert on failure
      await refresh();
    }
  }, [notifications, refresh]);

  const value = useMemo(() => ({
    unreadCount, notifications, loading, refresh, markRead, panelOpen, setPanelOpen,
  }), [unreadCount, notifications, loading, refresh, markRead, panelOpen]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
