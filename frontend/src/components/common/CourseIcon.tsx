import { cn } from "../../utils/cn";

type CourseIconType = "java" | "python" | "mern" | "data" | "spark";

export function CourseIcon({
  type,
  className,
}: {
  type: CourseIconType;
  className?: string;
}) {
  const base = "flex h-12 w-12 items-center justify-center rounded-2xl";
  const palettes: Record<CourseIconType, string> = {
    java: "bg-gradient-to-br from-orange-100 to-rose-100 text-[#B45309]",
    python: "bg-gradient-to-br from-sky-100 to-blue-200 text-[#1D4ED8]",
    mern: "bg-gradient-to-br from-emerald-100 to-teal-200 text-[#047857]",
    data: "bg-gradient-to-br from-violet-100 to-indigo-200 text-[#5B21B6]",
    spark: "bg-gradient-to-br from-slate-100 to-blue-100 text-[#1D4ED8]",
  };

  return (
    <div className={cn(base, palettes[type], className)}>
      {type === "java" && (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-1 1-1 2 0 3-2 0-3 2-2 3-2 0-3 2-2 3-1 1-1 2 0 3" />
          <path d="M9 14c-1 1-1 2 0 3 1 1 3 1 4 0" />
          <path d="M11 19c0 1 1 1 2 1" />
        </svg>
      )}
      {type === "python" && (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-3 0-4 1-4 3v3h4" />
          <path d="M12 21c3 0 4-1 4-3v-3h-4" />
          <circle cx="9.5" cy="6.5" r=".7" fill="currentColor" />
          <circle cx="14.5" cy="17.5" r=".7" fill="currentColor" />
        </svg>
      )}
      {type === "mern" && (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7l8-4 8 4-8 4-8-4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 17l8 4 8-4" />
        </svg>
      )}
      {type === "data" && (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20H2" />
        </svg>
      )}
      {type === "spark" && (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v6" />
          <path d="M12 15v6" />
          <path d="M3 12h6" />
          <path d="M15 12h6" />
        </svg>
      )}
    </div>
  );
}
