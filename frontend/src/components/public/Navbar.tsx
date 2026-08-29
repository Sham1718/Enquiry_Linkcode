import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../common/Button";
import { cn } from "../../utils/cn";

const links = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Why Us", href: "#why" },
  { label: "Alumni", href: "#alumni" },
  { label: "Feedback", href: "#feedback" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const onLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNav = (href: string) => {
    setOpen(false);
    if (!onLanding) {
      navigate("/" + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // After navigating to "/" with a hash, scroll to the section.
  useEffect(() => {
    if (location.pathname !== "/") return;
    const hash = location.hash;
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_4px_18px_-8px_rgba(15,23,42,0.08)]"
          : "bg-transparent"
      )}
    >
      {/* Scroll progress */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#60A5FA] via-[#2563EB] to-[#1D4ED8] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5" aria-label="FORTUNECloud home">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] shadow-[0_8px_20px_-6px_rgba(29,78,216,0.5)] grid place-items-center">
            <span className="text-white font-extrabold text-sm tracking-tight">F</span>
            <div className="absolute -inset-px rounded-xl ring-1 ring-white/30 pointer-events-none" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-[#0F172A]">
              FORTUNE<span className="text-[#1D4ED8]">Cloud</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-[#64748B] mt-0.5">
              LEARN • BUILD • GROW
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="relative px-4 py-2 text-[14.5px] font-medium text-[#334155] hover:text-[#0F172A] transition-colors rounded-full"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/enquiry">
            <Button size="md" iconRight={<ArrowRight />}>
              ENQUIRE NOW
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden relative h-10 w-10 grid place-items-center rounded-full border border-[#E2E8F0] bg-white/80 backdrop-blur"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "h-[1.5px] w-5 bg-[#0F172A] rounded-full transition-transform duration-300",
                open && "translate-y-[5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-5 bg-[#0F172A] rounded-full transition-opacity duration-200",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-5 bg-[#0F172A] rounded-full transition-transform duration-300",
                open && "-translate-y-[6px] -rotate-45"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden border-t border-[#E2E8F0] bg-white/95 backdrop-blur-xl"
          >
            <div className="px-5 py-5 space-y-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="w-full text-left px-3 py-3 rounded-xl text-[15px] font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <div className="pt-3">
                <Link to="/enquiry" onClick={() => setOpen(false)}>
                  <Button size="md" className="w-full" iconRight={<ArrowRight />}>
                    ENQUIRE NOW
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
