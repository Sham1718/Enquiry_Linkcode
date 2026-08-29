import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Section } from "../common/Section";
import { Button } from "../common/Button";

export function FinalCTA() {
  return (
    <Section className="py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[28px] border border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE] p-8 sm:p-14 lg:p-20"
      >
        {/* Decorative geometry */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#60A5FA]/30 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#1D4ED8]/20 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute inset-0 grid-texture opacity-50" />

        <div className="relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white/80 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1D4ED8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1D4ED8]" />
              Take the first step
            </div>
            <h2 className="display mt-6 text-[42px] sm:text-[56px] lg:text-[68px] text-[#0F172A]">
              Ready to start
              <br />
              your{" "}
              <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
                career journey?
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[17px] text-[#475569] leading-[1.6]">
              Talk to our mentors. Get a personalized roadmap. And take the
              first step toward the career you've been planning.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link to="/enquiry">
                <Button size="lg" iconRight={<Arrow />} className="w-full sm:w-auto">
                  ENQUIRE NOW
                </Button>
              </Link>
              <a href="#courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  EXPLORE COURSES
                </Button>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Arrow() {
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
