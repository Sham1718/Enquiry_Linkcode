import { motion } from "framer-motion";
import { Section, SectionEyebrow } from "../common/Section";

const steps = [
  {
    n: "01",
    title: "LEARN",
    text: "Structured curriculum, live mentor sessions, and crystal-clear fundamentals — built for absolute clarity.",
    color: "from-[#EFF6FF] to-[#DBEAFE]",
    accent: "bg-[#1D4ED8]",
  },
  {
    n: "02",
    title: "PRACTICE",
    text: "Daily coding drills, problem-solving sprints, and curated assignments that move the needle.",
    color: "from-[#ECFEFF] to-[#CFFAFE]",
    accent: "bg-[#0891B2]",
  },
  {
    n: "03",
    title: "BUILD",
    text: "Real-world, production-grade projects you can showcase — not toy demos.",
    color: "from-[#F0FDF4] to-[#DCFCE7]",
    accent: "bg-[#16A34A]",
  },
  {
    n: "04",
    title: "GROW",
    text: "Mock interviews, resume reviews, portfolio polish and direct referrals to hiring partners.",
    color: "from-[#FAF5FF] to-[#F3E8FF]",
    accent: "bg-[#7C3AED]",
  },
];

export function WhyChooseUs() {
  return (
    <Section id="why" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <SectionEyebrow>Why FORTUNECloud</SectionEyebrow>
          <h2 className="display mt-5 text-[40px] sm:text-[52px] lg:text-[60px] text-[#0F172A]">
            A learning
            <br />
            experience{" "}
            <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
              built to ship careers.
            </span>
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6] max-w-md">
            We don't just teach. We build engineers — with a clear roadmap,
            relentless practice and genuine mentorship at every step.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[34px] top-2 bottom-2 w-px bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#E2E8F0] hidden sm:block" />

            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
                  className="relative group flex gap-5 sm:gap-6 items-start"
                >
                  {/* Number tile */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`h-[68px] w-[68px] rounded-2xl bg-gradient-to-br ${s.color} border border-white shadow-[0_8px_20px_-10px_rgba(15,23,42,0.15)] grid place-items-center`}
                    >
                      <span className="text-[20px] font-extrabold tracking-tight text-[#0F172A]">
                        {s.n}
                      </span>
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ${s.accent} ring-4 ring-white`}
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-6 group-hover:border-[#BFDBFE] transition-colors">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-[22px] sm:text-[24px] font-extrabold tracking-tight text-[#0F172A]">
                        {s.title}
                      </h3>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8] font-semibold">
                        Stage {s.n}
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] text-[#475569] leading-[1.6]">{s.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
