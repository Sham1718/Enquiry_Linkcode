import { motion } from "framer-motion";
import { Section, SectionEyebrow } from "../common/Section";

const stages = [
  {
    n: "01",
    title: "LEARN",
    text: "Master fundamentals with structured, mentor-led sessions.",
  },
  {
    n: "02",
    title: "PRACTICE",
    text: "Daily problem-solving, code reviews and feedback loops.",
  },
  {
    n: "03",
    title: "BUILD",
    text: "Ship portfolio-grade projects end-to-end.",
  },
  {
    n: "04",
    title: "GET JOB READY",
    text: "Mock interviews, resume polish and placement referrals.",
  },
];

export function CareerJourney() {
  return (
    <Section className="py-20 sm:py-28">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>Your Journey</SectionEyebrow>
        <h2 className="display mt-5 text-[40px] sm:text-[52px] lg:text-[60px] text-[#0F172A]">
          From curious learner
          <br />
          to{" "}
          <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
            job-ready engineer.
          </span>
        </h2>
        <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">
          A clear, four-stage roadmap — so you always know where you are and
          what's next.
        </p>
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="mt-14 hidden md:block">
        <div className="relative">
          {/* Track line */}
          <div className="absolute left-6 right-6 top-9 h-px bg-gradient-to-r from-[#E2E8F0] via-[#BFDBFE] to-[#E2E8F0]" />
          <div className="grid grid-cols-4 gap-6">
            {stages.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                className="relative"
              >
                {/* Dot */}
                <div className="relative mx-auto h-[72px] w-[72px] rounded-full bg-white border border-[#E2E8F0] grid place-items-center shadow-[0_8px_20px_-12px_rgba(15,23,42,0.12)]">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#EFF6FF] to-white" />
                  <span className="relative text-[18px] font-extrabold text-[#1D4ED8]">
                    {s.n}
                  </span>
                </div>

                <div className="mt-6 text-center px-2">
                  <h3 className="text-[18px] font-extrabold tracking-tight text-[#0F172A]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#475569] leading-[1.6]">
                    {s.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="mt-10 md:hidden space-y-5">
        {stages.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-4"
          >
            <div className="shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-white grid place-items-center text-[14px] font-extrabold text-[#1D4ED8]">
              {s.n}
            </div>
            <div className="flex-1 rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <h3 className="text-[16px] font-extrabold tracking-tight text-[#0F172A]">
                {s.title}
              </h3>
              <p className="mt-1 text-[14px] text-[#475569] leading-[1.6]">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
