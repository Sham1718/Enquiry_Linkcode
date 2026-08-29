import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Section } from "../common/Section";

type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
};

const stats: Stat[] = [
  { value: 5500, suffix: "+", label: "Students Trained", sub: "Across all batches" },
  { value: 5000, suffix: "+", label: "Hiring Companies", sub: "Active placement network" },
  { value: 94, suffix: "%", label: "Placement Success", sub: "Within 6 months" },
  { value: 4.9, suffix: "/5", label: "Student Rating", sub: "Across course reviews" },
];

function CountUp({ to, suffix, prefix }: { to: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => {
    if (Number.isInteger(to)) return Math.round(latest).toLocaleString();
    return latest.toFixed(1);
  });
  const [display, setDisplay] = useState(to >= 100 ? "0" : "0.0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, motionVal, rounded]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      <span className="text-[#1D4ED8]">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-12">
        <div className="absolute inset-0 grid-texture opacity-40" />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.20),transparent_70%)]" />

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="relative lg:px-2"
            >
              {i !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-px bg-[#E2E8F0]" />
              )}
              <div className="display text-[40px] sm:text-[56px] lg:text-[64px] text-[#0F172A]">
                <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div className="mt-3 text-[15px] font-semibold text-[#0F172A]">{s.label}</div>
              <div className="text-[13px] text-[#64748B] mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
