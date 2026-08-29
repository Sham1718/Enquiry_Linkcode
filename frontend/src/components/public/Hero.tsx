import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F9FF] via-white to-white" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[1200px] rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.30),transparent_70%)]" />
        <div className="absolute top-32 -right-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.16),transparent_70%)]" />
        <div className="absolute -bottom-20 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(191,219,254,0.5),transparent_70%)]" />
        <div className="absolute inset-0 dot-texture opacity-50" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT: editorial copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/80 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#475569]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#60A5FA] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2563EB]" />
              </span>
              CAREER • SKILLS • FUTURE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
              className="display mt-6 sm:mt-7 text-[42px] sm:text-[56px] lg:text-[76px] text-[#0F172A]"
            >
              Build the skills
              <br />
              that build your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
                  future.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 9 C 60 2, 140 2, 198 9"
                    stroke="#BFDBFE"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: easeOut }}
              className="mt-6 max-w-xl text-[17px] sm:text-[18px] leading-[1.65] text-[#475569]"
            >
              Learn industry-ready skills, build real-world projects, and prepare
              yourself for the career you want. Mentorship, structure and
              accountability — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/enquiry">
                <Button size="lg" iconRight={<ArrowRight />} className="w-full sm:w-auto">
                  START YOUR JOURNEY
                </Button>
              </Link>
              <a href="#courses">
                <Button
                  size="lg"
                  variant="secondary"
                  iconLeft={<Compass />}
                  className="w-full sm:w-auto"
                >
                  EXPLORE COURSES
                </Button>
              </a>
            </motion.div>

            {/* Micro trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#64748B]"
            >
              <div className="flex items-center gap-2">
                <Check />
                <span>Mentor-led live sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check />
                <span>Real-world project portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <Check />
                <span>Dedicated placement support</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: layered visual composition */}
          <div className="lg:col-span-5 relative">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
      className="relative mx-auto max-w-[560px] aspect-[5/6] lg:aspect-[4/5]"
    >
      {/* Soft gradient backdrop blob */}
      <div className="absolute inset-0 rounded-[36px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-[#60A5FA]/40 to-[#2563EB]/0 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-[#BFDBFE]/60 to-transparent blur-2xl" />
        <div className="absolute inset-0 grid-texture opacity-50" />
      </div>

      {/* Center: laptop + person composition */}
      <div className="absolute inset-0">
        <CodeWindow />
      </div>

      {/* Floating surface — students trained */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
        className="absolute -left-3 sm:-left-8 top-[10%] floaty z-10"
      >
        <div className="rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.18)] border border-[#E2E8F0] px-4 py-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#EFF6FF] grid place-items-center">
            <Users />
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-[#0F172A] leading-none tracking-tight">
              5,500+
            </div>
            <div className="text-[11px] text-[#64748B] mt-1 font-medium">
              Students Trained
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating surface — placement success */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
        className="absolute -right-2 sm:-right-8 top-[44%] floaty-2 z-10"
      >
        <div className="rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.18)] border border-[#E2E8F0] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#ECFDF5] grid place-items-center">
              <TrendUp />
            </div>
            <div>
              <div className="text-[18px] font-extrabold text-[#0F172A] leading-none tracking-tight">
                94%
              </div>
              <div className="text-[11px] text-[#64748B] mt-1 font-medium">
                Placement Success
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating surface — hiring partners */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
        className="absolute -left-2 sm:-left-8 bottom-[8%] floaty-3 z-10"
      >
        <div className="rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.18)] border border-[#E2E8F0] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#F5F3FF] grid place-items-center">
              <Briefcase />
            </div>
            <div>
              <div className="text-[18px] font-extrabold text-[#0F172A] leading-none tracking-tight">
                5,000+
              </div>
              <div className="text-[11px] text-[#64748B] mt-1 font-medium">
                Hiring Companies
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subtle decorative ring */}
      <div className="absolute -bottom-4 right-6 h-20 w-20 rounded-full border border-[#BFDBFE]" />
      <div className="absolute -top-3 right-10 h-3 w-3 rounded-full bg-[#60A5FA]" />
      <div className="absolute top-1/2 -right-3 h-2 w-2 rounded-full bg-[#2563EB]" />
    </motion.div>
  );
}

function CodeWindow() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative w-[86%] h-[60%] rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)]">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 h-9 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCA5A5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCD34D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#86EFAC]" />
          </div>
          <div className="text-[10.5px] font-mono text-[#94A3B8] tracking-tight">
            fortunecloud / learn.js
          </div>
          <div className="w-10" />
        </div>
        {/* Editor body */}
        <div className="p-4 font-mono text-[11.5px] leading-[1.7] text-[#475569]">
          <div className="flex">
            <span className="w-6 text-right pr-3 text-[#CBD5E1] select-none">1</span>
            <span>
              <span className="text-[#7C3AED]">const</span>{" "}
              <span className="text-[#2563EB]">career</span> ={" "}
              <span className="text-[#0F172A]">await</span>{" "}
              <span className="text-[#16A34A]">learn</span>.
              <span className="text-[#0F172A]">build</span>(
              <span className="text-[#F59E0B]">"future"</span>);
            </span>
          </div>
          <div className="flex">
            <span className="w-6 text-right pr-3 text-[#CBD5E1] select-none">2</span>
            <span>
              <span className="text-[#7C3AED]">const</span>{" "}
              <span className="text-[#2563EB]">mentor</span> ={" "}
              <span className="text-[#0F172A]">new</span>{" "}
              <span className="text-[#16A34A]">Guide</span>();
            </span>
          </div>
          <div className="flex">
            <span className="w-6 text-right pr-3 text-[#CBD5E1] select-none">3</span>
            <span>
              <span className="text-[#0F172A]">mentor</span>.
              <span className="text-[#2563EB]">support</span>(
              <span className="text-[#0F172A]">you</span>);
            </span>
          </div>
          <div className="flex">
            <span className="w-6 text-right pr-3 text-[#CBD5E1] select-none">4</span>
            <span>&nbsp;</span>
          </div>
          <div className="flex">
            <span className="w-6 text-right pr-3 text-[#CBD5E1] select-none">5</span>
            <span>
              <span className="text-[#7C3AED]">return</span>{" "}
              <span className="text-[#16A34A]">"job-ready"</span>;
            </span>
          </div>

          {/* Blinking cursor line */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-[#94A3B8]">
            <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
            Build successful · ready to ship
          </div>
        </div>
      </div>

      {/* Overlapping small tag pill */}
      <div className="absolute top-[12%] right-[6%] rounded-full bg-white border border-[#E2E8F0] shadow-[0_10px_24px_-12px_rgba(15,23,42,0.18)] px-3 py-1.5 flex items-center gap-1.5 z-10">
        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
        <span className="text-[10.5px] font-semibold tracking-wide text-[#0F172A]">
          LIVE MENTOR
        </span>
      </div>

      {/* Overlapping stack of avatars */}
      <div className="absolute bottom-[12%] left-[6%] rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_10px_24px_-12px_rgba(15,23,42,0.18)] px-3 py-2.5 flex items-center gap-2.5 z-10">
        <div className="flex -space-x-2">
          {["bg-gradient-to-br from-rose-400 to-pink-500", "bg-gradient-to-br from-amber-400 to-orange-500", "bg-gradient-to-br from-emerald-400 to-teal-500", "bg-gradient-to-br from-blue-400 to-indigo-500"].map((g, i) => (
            <span
              key={i}
              className={`h-6 w-6 rounded-full ${g} ring-2 ring-white`}
            />
          ))}
        </div>
        <div className="text-[10.5px] font-semibold text-[#0F172A]">
          24 mentors online
        </div>
      </div>
    </div>
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

function Compass() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

function Check() {
  return (
    <span className="grid place-items-center h-5 w-5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function Users() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#1D4ED8]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TrendUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#16A34A]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

function Briefcase() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#7C3AED]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 13h20" />
    </svg>
  );
}
