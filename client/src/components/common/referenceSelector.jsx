const ReferenceSelector = ({
  value,
  onChange,
  error,
  options,
}) => {
  return (
    <section>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
        Step 03 — How did you hear about us?
      </p>

      <label
        htmlFor="reference"
        className="mb-2 block text-sm font-medium"
      >
        How did you hear about us?
      </label>

      <select
        id="reference"
        name="reference"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-14 w-full rounded-2xl border bg-white px-4 text-[15px] outline-none transition ${
          error
            ? "border-red-300 ring-4 ring-red-100"
            : "border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
        }`}
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </section>
  );
};

export default ReferenceSelector;