const CourseSelector = ({
  value,
  onChange,
  error,
  courses,
}) => {
  return (
    <section>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
        Step 02 — Course
      </p>

      <label
        htmlFor="course"
        className="mb-2 block text-sm font-medium"
      >
        Course Interested In
      </label>

      <select
        id="course"
        name="course"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-14 w-full rounded-2xl border bg-white px-4 text-[15px] outline-none transition ${
          error
            ? "border-red-300 ring-4 ring-red-100"
            : "border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
        }`}
      >
        <option value="">Select a course</option>

        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
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

export default CourseSelector;