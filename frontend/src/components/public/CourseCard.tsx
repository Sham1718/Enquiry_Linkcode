import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CourseIcon } from "../common/CourseIcon";
import type { Course } from "../../data/courses";
import { cn } from "../../utils/cn";

type CourseCardProps = {
  course: Course;
  index: number;
  variant?: "default" | "feature";
};

export function CourseCard({ course, index, variant = "default" }: CourseCardProps) {
  const isFeature = variant === "feature";

  if (isFeature) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-white via-[#F5F9FF] to-[#EFF6FF] p-7 sm:p-9 transition-all duration-300 hover:shadow-[0_30px_80px_-30px_rgba(29,78,216,0.30)]"
      >
        <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#60A5FA]/30 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#BFDBFE]/40 to-transparent blur-2xl" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-6 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1D4ED8]" />
              Most Popular
            </div>
            <h3 className="display mt-4 text-[28px] sm:text-[34px] lg:text-[40px] text-[#0F172A]">
              {course.name}
            </h3>
            <p className="mt-4 text-[15.5px] leading-[1.65] text-[#475569] max-w-xl">
              {course.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {course.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2E8F0] px-3 py-1.5 text-[12.5px] font-semibold text-[#334155]"
                >
                  <Check />
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-5">
              <Link
                to={`/enquiry?course=${encodeURIComponent(course.name)}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] text-white px-5 h-12 text-[14.5px] font-semibold shadow-[0_10px_24px_-12px_rgba(29,78,216,0.55)] hover:bg-[#1E40AF] transition-colors"
              >
                Enquire Now
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
              <div className="text-[12.5px] text-[#64748B]">
                <span className="font-semibold text-[#0F172A]">{course.duration}</span> · {course.level}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-3">
            <CourseIcon type={course.icon} className="!h-16 !w-16 rounded-3xl" />
            <div className="rounded-2xl bg-white border border-[#E2E8F0] px-3 py-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
              <span className="text-[11px] font-semibold text-[#0F172A]">Next batch starts soon</span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-white p-6 sm:p-7 transition-all duration-300",
        "border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-[0_24px_60px_-30px_rgba(29,78,216,0.30)]"
      )}
    >
      <div
        className={cn(
          "absolute -top-24 -right-20 h-56 w-56 rounded-full bg-gradient-to-br opacity-60 blur-2xl pointer-events-none",
          course.accent
        )}
      />

      <div className="relative flex items-start justify-between">
        <CourseIcon type={course.icon} />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#475569]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
          {course.duration}
        </span>
      </div>

      <h3 className="relative mt-6 text-[22px] sm:text-[24px] font-extrabold tracking-tight text-[#0F172A]">
        {course.name}
      </h3>
      <p className="relative mt-3 text-[14.5px] leading-[1.6] text-[#475569]">
        {course.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {course.highlights.slice(0, 4).map((h) => (
          <span
            key={h}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11.5px] font-medium text-[#334155]"
          >
            <span className="h-1 w-1 rounded-full bg-[#2563EB]" />
            {h}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between pt-5 border-t border-[#E2E8F0]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-semibold">
            Level
          </div>
          <div className="text-[13.5px] font-semibold text-[#0F172A] mt-0.5">
            {course.level}
          </div>
        </div>
        <Link
          to={`/enquiry?course=${encodeURIComponent(course.name)}`}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
        >
          Enquire Now
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

function Check() {
  return (
    <span className="grid place-items-center h-3.5 w-3.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8]">
      <svg
        viewBox="0 0 24 24"
        className="h-2.5 w-2.5"
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
