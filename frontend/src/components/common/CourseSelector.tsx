import { motion } from "framer-motion";
import { courses } from "../../data/courses";
import { CourseIcon } from "../common/CourseIcon";
import { cn } from "../../utils/cn";

type Props = {
  selected: string;
  onSelect: (name: string) => void;
  error?: string;
};

export function CourseSelector({ selected, onSelect, error }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {courses.map((c, i) => {
          const isSelected = selected === c.name;
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.name)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
              className={cn(
                "group relative text-left rounded-2xl border bg-white p-4 transition-all duration-200",
                "hover:border-[#BFDBFE]",
                isSelected
                  ? "border-[#2563EB] ring-2 ring-[#DBEAFE] bg-[#F5F9FF]"
                  : "border-[#E2E8F0]"
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-3">
                <CourseIcon type={c.icon} />
                <div className="flex-1 min-w-0">
                  <div className="text-[14.5px] font-extrabold tracking-tight text-[#0F172A]">
                    {c.name}
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-0.5">{c.duration}</div>
                </div>
                <div
                  className={cn(
                    "h-5 w-5 rounded-full border-2 grid place-items-center transition-all",
                    isSelected
                      ? "border-[#2563EB] bg-[#2563EB]"
                      : "border-[#CBD5E1] bg-white"
                  )}
                  aria-hidden
                >
                  {isSelected && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      {error && (
        <p className="mt-3 text-sm text-[#DC2626] flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
          {error}
        </p>
      )}
    </div>
  );
}
