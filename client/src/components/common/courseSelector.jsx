const CourseSelector = ({
  value,
  onChange,
  error,
}) => {
  const courses = [
    {
      name: "Java Full Stack Development",
      duration: "6 Months",
      icon: "J",
      iconStyle: "bg-[#FFE5DB] text-[#F97316]",
    },
    {
      name: "Python Full Stack Development",
      duration: "5 Months",
      icon: "P",
      iconStyle: "bg-[#DDEEFF] text-[#2563EB]",
    },
    {
      name: "MERN Stack Development",
      duration: "5 Months",
      icon: "M",
      iconStyle: "bg-[#C9F8E9] text-[#10B981]",
    },
    {
      name: "Data Analytics",
      duration: "4 Months",
      icon: "▥",
      iconStyle: "bg-[#E6E1FF] text-[#6366F1]",
    },
    {
      name: "Other / Not Sure Yet",
      duration: "—",
      icon: "+",
      iconStyle: "bg-[#E8F0FF] text-[#4F7DF3]",
    },
  ];

  return (
    <section>
      {/* Step heading */}
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
        Step 02 — Course
      </p>

      {/* Course cards */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {courses.map((course) => {
          const isSelected = value === course.name;

          return (
            <button
              key={course.name}
              type="button"
              onClick={() => onChange(course.name)}
              className={`group relative flex min-h-[73px] items-center rounded-xl border px-3 py-2.5 text-left transition-colors ${
                isSelected
                  ? "border-[#2563EB] bg-[#F8FBFF]"
                  : "border-[#DCE3EC] bg-white hover:border-[#B8C7DA]"
              }`}
            >
              {/* Course icon */}
              <div
                className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${course.iconStyle}`}
              >
                {course.icon}
              </div>

              {/* Course information */}
              <div className="min-w-0 flex-1 pr-5">
                <p className="text-[12px] font-semibold leading-[1.35] text-[#0F172A]">
                  {course.name}
                </p>

                <p className="mt-1 text-[10px] leading-none text-[#94A3B8]">
                  {course.duration}
                </p>
              </div>

              {/* Selection circle */}
              <span
                className={`absolute right-3 top-3.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-[#2563EB]"
                    : "border-[#CBD5E1]"
                }`}
              >
                {isSelected && (
                  <span className="h-[7px] w-[7px] rounded-full bg-[#2563EB]" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Validation error */}
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </section>
  );
};

export default CourseSelector;