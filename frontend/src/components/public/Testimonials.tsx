import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionEyebrow } from "../common/Section";
import { testimonials } from "../../data/testimonials";
import { cn } from "../../utils/cn";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <Section id="feedback" className="py-20 sm:py-28">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <SectionEyebrow>Student Feedback</SectionEyebrow>
          <h2 className="display mt-5 text-[40px] sm:text-[52px] lg:text-[60px] text-[#0F172A]">
            What our students
            <br />
            <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
              say about us.
            </span>
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6] max-w-md">
            Real feedback from learners who've completed our programs and
            stepped into the industry.
          </p>

          <div className="mt-8 flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-10 bg-[#1D4ED8]" : "w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                )}
              />
            ))}
          </div>

          <div className="mt-10 hidden lg:block">
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-5 max-w-sm">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#94A3B8] font-semibold">
                Average rating
              </div>
              <div className="mt-3 flex items-end gap-3">
                <div className="display text-[44px] text-[#0F172A] leading-none">4.9</div>
                <div className="pb-1.5 text-[13px] text-[#64748B]">out of 5</div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <Stars rating={4.9} />
                <span className="text-[12px] text-[#64748B] ml-1.5">across 2,400+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          {/* Featured testimonial card */}
          <div className="relative min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-7 sm:p-10"
              >
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.18),transparent_70%)]" />
                <Quote />

                <blockquote className="mt-5 text-[20px] sm:text-[24px] leading-[1.45] text-[#0F172A] font-medium tracking-tight">
                  "{current.review}"
                </blockquote>

                <div className="mt-7 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-2xl bg-gradient-to-br grid place-items-center text-white text-[15px] font-extrabold",
                        current.gradient
                      )}
                    >
                      {current.initials}
                    </div>
                    <div>
                      <div className="text-[15px] font-extrabold text-[#0F172A] tracking-tight">
                        {current.name}
                      </div>
                      <div className="text-[12.5px] text-[#64748B] mt-0.5">
                        {current.course} • {current.placedAt}
                      </div>
                    </div>
                  </div>
                  <Stars rating={current.rating} />
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Mini testimonial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.slice(0, 2).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5"
              >
                <Stars rating={t.rating} />
                <p className="mt-3 text-[14px] leading-[1.6] text-[#475569] line-clamp-3">
                  "{t.review}"
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-xl bg-gradient-to-br grid place-items-center text-white text-[11px] font-extrabold",
                      t.gradient
                    )}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold text-[#0F172A]">{t.name}</div>
                    <div className="text-[11px] text-[#64748B]">{t.placedAt}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i + 1 <= Math.floor(rating);
        const half = !filled && i + 0.5 <= rating;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={filled ? "#F59E0B" : half ? "url(#half)" : "none"}
            stroke="#F59E0B"
            strokeWidth={1.5}
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="half" x1="0" y1="0" x2="1" y2="0">
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.2L12 17.8 5.6 21.6 7.3 14.4 1.7 9.5l7.4-.6L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}

function Quote() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-10 w-10 text-[#BFDBFE]"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-1.7 1.3-3 3-3V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z" />
    </svg>
  );
}
