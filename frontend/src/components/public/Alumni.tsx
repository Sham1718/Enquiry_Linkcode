import { motion } from "framer-motion";
import { Section, SectionEyebrow } from "../common/Section";
import { alumni } from "../../data/alumni";
import { cn } from "../../utils/cn";

export function Alumni() {
  return (
    <Section id="alumni" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-3xl">
        <SectionEyebrow>Alumni</SectionEyebrow>
        <h2 className="display mt-5 text-[40px] sm:text-[52px] lg:text-[64px] text-[#0F172A]">
          Our students.
          <br />
          Their journey.
          <br />
          <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
            Their success.
          </span>
        </h2>
        <p className="mt-5 text-[17px] text-[#475569] leading-[1.6] max-w-xl">
          A glimpse of the careers our alumni are building today — across
          product companies, enterprises and global startups.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {alumni.map((a, i) => (
          <motion.article
            key={a.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-[0_24px_60px_-30px_rgba(29,78,216,0.25)]"
          >
            <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br from-[#EFF6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center gap-4">
              <div
                className={cn(
                  "h-14 w-14 rounded-2xl bg-gradient-to-br grid place-items-center text-white text-[16px] font-extrabold tracking-tight shadow-[0_8px_18px_-8px_rgba(29,78,216,0.5)]",
                  a.gradient
                )}
              >
                {a.initials}
              </div>
              <div>
                <div className="text-[16px] font-extrabold text-[#0F172A] tracking-tight">
                  {a.name}
                </div>
                <div className="text-[13px] text-[#64748B] mt-0.5">
                  {a.role}
                </div>
              </div>
            </div>

            <p className="relative mt-5 text-[14.5px] text-[#475569] leading-[1.6]">
              "{a.story}"
            </p>

            <div className="relative mt-6 pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#94A3B8] font-semibold">
                  Now at
                </div>
                <div className="text-[14.5px] font-semibold text-[#0F172A] mt-0.5">
                  {a.company}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[11.5px] font-semibold text-[#1D4ED8]">
                {a.course}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
