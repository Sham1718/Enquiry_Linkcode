import { Section } from "../common/Section";
import { companies } from "../../data/companies";

export function CompanyMarquee() {
  return (
    <Section className="py-12 sm:py-16 border-y border-[#E2E8F0] bg-white overflow-hidden">
      <div className="text-center max-w-xl mx-auto">
        <p className="text-[12px] uppercase tracking-[0.22em] font-semibold text-[#64748B]">
          Our students are placed at
        </p>
      </div>
      <div className="mt-8 relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 marquee gap-12 items-center pr-12">
            {[...companies, ...companies].map((c, i) => (
              <div
                key={i}
                className="shrink-0 text-[20px] sm:text-[22px] font-extrabold tracking-tight text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
