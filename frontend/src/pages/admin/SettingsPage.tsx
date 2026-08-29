import { useState } from "react";
import { Button } from "../../components/admin/common/Button";
import { Input, PasswordInput } from "../../components/admin/common/Input";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { USE_MOCK_API } from "../../services/admin/api";

export default function SettingsPage() {
  const { logout } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@fortunecloud.in" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    // UI only
    await new Promise(r => setTimeout(r, 600));
    setSavingProfile(false);
    toast.success("Profile updated");
  }
  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) { toast.error("Passwords do not match"); return; }
    if (passwords.next.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setSavingPassword(true);
    await new Promise(r => setTimeout(r, 700));
    setSavingPassword(false);
    setPasswords({ current: "", next: "", confirm: "" });
    toast.success("Password updated");
  }

  return (
    <div className="space-y-5 anim-fade-up">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="mt-1 text-[13.5px] text-slate-500">Manage your account and workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form onSubmit={saveProfile} className="fc-card p-5 sm:p-6">
          <h3 className="text-[14px] font-semibold tracking-wide text-slate-900 uppercase">Profile</h3>
          <p className="mt-0.5 mb-4 text-[12.5px] text-slate-500">Update your personal information.</p>
          <div className="space-y-3.5">
            <Input label="Full name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
            <Input label="Email" type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="mt-5 flex justify-end">
            <Button type="submit" loading={savingProfile}>Save changes</Button>
          </div>
        </form>

        <form onSubmit={changePassword} className="fc-card p-5 sm:p-6">
          <h3 className="text-[14px] font-semibold tracking-wide text-slate-900 uppercase">Security</h3>
          <p className="mt-0.5 mb-4 text-[12.5px] text-slate-500">Change your account password.</p>
          <div className="space-y-3.5">
            <PasswordInput label="Current password" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
            <PasswordInput label="New password" value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} />
            <PasswordInput label="Confirm new password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
          </div>
          <div className="mt-5 flex justify-end">
            <Button type="submit" loading={savingPassword}>Update password</Button>
          </div>
        </form>

        <div className="fc-card p-5 sm:p-6 lg:col-span-2">
          <h3 className="text-[14px] font-semibold tracking-wide text-slate-900 uppercase">Workspace</h3>
          <p className="mt-0.5 mb-4 text-[12.5px] text-slate-500">System information and session controls.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Info label="Environment" value={USE_MOCK_API ? "Mock API" : "Live API"} tone={USE_MOCK_API ? "amber" : "emerald"} />
            <Info label="Session" value="24 hours" tone="blue" />
            <Info label="Auth scheme" value="Bearer JWT" tone="indigo" />
          </div>
          <div className="mt-5 flex justify-end">
            <Button variant="danger" onClick={logout} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>}>
              Sign out of this device
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, tone = "blue" }: { label: string; value: string; tone?: "blue" | "emerald" | "amber" | "indigo" }) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  };
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
      <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1.5">
        <span className={`inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-[12.5px] font-semibold ring-1 ${tones[tone]}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {value}
        </span>
      </div>
    </div>
  );
}
