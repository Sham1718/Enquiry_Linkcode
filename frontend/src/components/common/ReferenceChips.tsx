import { motion } from "framer-motion";
import { referenceOptions } from "../../data/references";
import { cn } from "../../utils/cn";

type Props = {
  selected: string;
  onSelect: (value: string) => void;
  error?: string;
};

export function ReferenceChips({ selected, onSelect, error }: Props) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {referenceOptions.map((opt, i) => {
          const isSelected = selected === opt;
          return (
            <motion.button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
              className={cn(
                "rounded-full px-4 h-10 text-[13.5px] font-semibold transition-all duration-200 border",
                isSelected
                  ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-[0_8px_20px_-8px_rgba(29,78,216,0.45)]"
                  : "bg-white text-[#334155] border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F5F9FF]"
              )}
              aria-pressed={isSelected}
            >
              {opt}
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
