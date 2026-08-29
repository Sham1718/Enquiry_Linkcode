import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";

// Public Pages
const LandingPage = lazy(() => import("./pages/public/LandingPage"));
const EnquiryPage = lazy(() => import("./pages/public/EnquiryPage"));
const SuccessPage = lazy(() => import("./pages/public/SuccessPage"));

// Admin Pages
const LoginPage = lazy(() => import("./pages/admin/LoginPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const EnquiriesPage = lazy(() => import("./pages/admin/EnquiriesPage"));
const EnquiryDetailPage = lazy(() => import("./pages/admin/EnquiryDetailPage"));
const NotificationsPage = lazy(() => import("./pages/admin/NotificationsPage"));
const ReportsPage = lazy(() => import("./pages/admin/ReportsPage"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage"));

function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex items-center gap-3 text-slate-500">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <NotificationProvider>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Public / Student Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/enquiry" element={<EnquiryPage />} />
                <Route path="/success" element={<SuccessPage />} />

                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<LoginPage />} />

                {/* Admin Protected Routes */}
                <Route
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<DashboardPage />} />
                  <Route path="/admin/enquiries" element={<EnquiriesPage />} />
                  <Route path="/admin/enquiries/:id" element={<EnquiryDetailPage />} />
                  <Route path="/admin/notifications" element={<NotificationsPage />} />
                  <Route path="/admin/reports" element={<ReportsPage />} />
                  <Route path="/admin/settings" element={<SettingsPage />} />
                </Route>

                {/* Catch-all Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </NotificationProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
