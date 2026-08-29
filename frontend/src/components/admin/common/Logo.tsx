export function Logo({ size = 28, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative grid place-items-center rounded-[10px] bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25"
        style={{ width: size + 4, height: size + 4 }}
        aria-hidden="true"
      >
        <svg width={size - 6} height={size - 6} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12c0-4.5 4-8 9-8s9 3.5 9 8-4 8-9 8c-2 0-3.8-.5-5.3-1.3"/>
          <path d="M3 12c0 4.5 4 8 9 8"/>
          <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white" />
      </div>
      {withText && (
        <div className="leading-none">
          <div className="text-[15px] font-extrabold tracking-tight text-slate-900">FORTUNE<span className="text-blue-600">Cloud</span></div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">Admin Suite</div>
        </div>
      )}
    </div>
  );
}
