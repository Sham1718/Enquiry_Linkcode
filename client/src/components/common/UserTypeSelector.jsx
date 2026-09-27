const UserTypeSelector = ({
  value,
  onChange,
  error,
}) => {
  const options = [
    "Student",
    "Working Professional",
    "Looking for Job / Internship",
    "PBL (OJT - On Job Training)",
  ];

  return (
    <section>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
        Step 04 — Your Current Status
      </p>

      <label className="mb-3 block text-sm font-medium">
        Tell us about yourself
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                isSelected
                  ? "border-[#2563EB] bg-blue-50 text-[#1D4ED8] ring-2 ring-blue-100"
                  : "border-[#E2E8F0] bg-white text-[#334155] hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </section>
  );
};

export default UserTypeSelector;