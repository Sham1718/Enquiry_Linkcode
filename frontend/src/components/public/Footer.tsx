import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] grid place-items-center shadow-[0_8px_20px_-6px_rgba(29,78,216,0.5)]">
                <span className="text-white font-extrabold text-sm">F</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold tracking-tight text-[#0F172A]">
                  FORTUNE<span className="text-[#1D4ED8]">Cloud</span>
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-[#64748B] mt-0.5">
                  LEARN • BUILD • GROW
                </span>
              </div>
            </div>
            <p className="mt-5 text-[15px] text-[#475569] leading-[1.6] max-w-sm">
              A premium learning institute helping students build
              industry-ready skills, real projects, and lasting careers.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid place-items-center h-10 w-10 rounded-full border border-[#E2E8F0] bg-white text-[#475569] hover:text-[#1D4ED8] hover:border-[#BFDBFE] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#94A3B8]">
              Explore
            </div>
            <ul className="mt-4 space-y-2.5 text-[14.5px] text-[#334155]">
              <li><a href="#courses" className="hover:text-[#0F172A] transition-colors">Courses</a></li>
              <li><a href="#why" className="hover:text-[#0F172A] transition-colors">Why Us</a></li>
              <li><a href="#alumni" className="hover:text-[#0F172A] transition-colors">Alumni</a></li>
              <li><a href="#feedback" className="hover:text-[#0F172A] transition-colors">Feedback</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#94A3B8]">
              Get started
            </div>
            <p className="mt-4 text-[14.5px] text-[#475569] leading-[1.6]">
              Have a question or want to know which course is right for you?
            </p>
            <div className="mt-4">
              <Link
                to="/enquiry"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF]"
              >
                Enquire Now
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[12.5px] text-[#64748B]">
          <div>© {new Date().getFullYear()} FORTUNECloud. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[#0F172A]">Privacy</a>
            <a href="#" className="hover:text-[#0F172A]">Terms</a>
            <a href="#" className="hover:text-[#0F172A]">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7" />
        <path d="M8 7v.01" />
        <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
        <path d="M12 10v7" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];
