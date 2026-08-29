import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Spinner } from "../../components/admin/common/Button";
import { Input, PasswordInput } from "../../components/admin/common/Input";
import { Logo } from "../../components/admin/common/Logo";

export default function LoginPage() {
  const { login, isAuthenticated, isReady } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("pass@123");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && isAuthenticated) navigate("/admin/dashboard", { replace: true });
  }, [isAuthenticated, isReady, navigate]);

  function validate() {
    const next: { username?: string; password?: string } = {};
    if (!username.trim()) next.username = "Username or email is required";
    if (!password) next.password = "Password is required";
    else if (password.length < 3) next.password = "Password is too short";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError(null);
    try {
      await login(username.trim(), password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      setServerError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Left brand */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:block">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo size={32} />
          <div className="max-w-md">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              STUDENT INQUIRY CRM
            </div>
            <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 xl:text-6xl">
              Turn every<br />
              enquiry into<br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">an opportunity.</span>
            </h1>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-slate-600">
              Manage student enquiries, follow-ups and admissions from one intelligent workspace — built for institutes that care about every lead.
            </p>
            <ul className="mt-8 grid grid-cols-3 gap-3 text-[12px] text-slate-500">
              {[
                { v: "24h", l: "Session validity" },
                { v: "100%", l: "Pipeline visibility" },
                { v: "Live", l: "Lead tracking" },
              ].map(s => (
                <li key={s.l} className="rounded-xl border border-slate-200/70 bg-white/60 p-3 backdrop-blur">
                  <div className="text-[15px] font-bold text-slate-900">{s.v}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">{s.l}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-[11.5px] text-slate-400">© {new Date().getFullYear()} FORTUNECloud. Secure admin experience.</div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-7 flex items-center justify-between">
            <div className="lg:hidden"><Logo size={28} /></div>
            <div className="hidden text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:block">Admin Portal</div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back <span className="ml-0.5">👋</span></h2>
          <p className="mt-1.5 text-[14px] text-slate-500">Sign in to manage enquiries, follow-ups and admissions.</p>

          <form className="mt-7 space-y-4" onSubmit={onSubmit} noValidate>
            <Input
              label="Username or Email"
              type="text"
              autoComplete="username"
              placeholder="admin or you@fortunecloud.in"
              value={username}
              onChange={e => setUsername(e.target.value)}
              error={errors.username}
              leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
            />
            <PasswordInput
              label="Password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={errors.password}
            />

            {serverError && (
              <div className="anim-fade-in flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-[12.5px] text-rose-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                <span>{serverError}</span>
              </div>
            )}

            <Button type="submit" size="lg" block loading={submitting} iconRight={!submitting ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg> : null}>
              {submitting ? <span className="inline-flex items-center gap-2"><Spinner size={14} /> Signing in…</span> : "Sign in"}
            </Button>

            <div className="flex items-center justify-between pt-1 text-[12px]">
              <label className="inline-flex cursor-pointer items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                Keep me signed in
              </label>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>
          </form>

          <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-3 text-[11.5px] text-slate-500">
            <span className="font-semibold text-slate-700">Default credentials:</span> <code className="font-mono font-bold text-slate-800">admin</code> / <code className="font-mono font-bold text-slate-800">pass@123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
