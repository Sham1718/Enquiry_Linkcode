import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

type ToastVariant = "success" | "error" | "info";
interface Toast { id: number; message: string; variant: ToastVariant; }
interface ToastContextValue { push: (message: string, variant?: ToastVariant) => void; success: (m: string) => void; error: (m: string) => void; info: (m: string) => void; }

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, message, variant }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const value = useMemo<ToastContextValue>(() => ({
    push,
    success: (m) => push(m, "success"),
    error: (m) => push(m, "error"),
    info: (m) => push(m, "info"),
  }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:right-4 sm:left-auto sm:items-end">
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto anim-slide-down flex w-full max-w-sm items-start gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg",
              t.variant === "success" && "border-emerald-200",
              t.variant === "error" && "border-rose-200",
              t.variant === "info" && "border-sky-200",
            )}
          >
            <div className={cn(
              "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold",
              t.variant === "success" && "bg-emerald-100 text-emerald-700",
              t.variant === "error" && "bg-rose-100 text-rose-700",
              t.variant === "info" && "bg-sky-100 text-sky-700",
            )}>
              {t.variant === "success" ? "✓" : t.variant === "error" ? "✕" : "i"}
            </div>
            <div className="text-sm text-slate-800">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
