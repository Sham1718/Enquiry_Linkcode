import { Section, SectionEyebrow } from "../common/Section";
import { CourseCard } from "./CourseCard";
import { courses } from "../../data/courses";

export function Courses() {
  const featured = courses[0];
  const rest = courses.slice(1);

  return (
    <Section id="courses" className="py-20 sm:py-28">
      {/* Heading */}
      <div className="max-w-3xl">
        <SectionEyebrow>Programs</SectionEyebrow>
        <h2 className="display mt-5 text-[40px] sm:text-[52px] lg:text-[64px] text-[#0F172A]">
          Choose your
          <br />
          <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
            career path.
          </span>
        </h2>
        <p className="mt-5 text-[17px] text-[#475569] max-w-xl leading-[1.6]">
          Industry-aligned, mentor-led programs designed to take you from
          fundamentals to job-ready. Pick the path that excites you.
        </p>
      </div>

      {/* Featured + grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <CourseCard course={featured} index={0} variant="feature" />
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 gap-5">
          <CourseCard course={rest[0]} index={1} />
          <CourseCard course={rest[1]} index={2} />
        </div>
        {rest.slice(2).map((c, i) => (
          <div key={c.id} className="lg:col-span-4">
            <CourseCard course={c} index={i + 3} />
          </div>
        ))}
      </div>
    </Section>
  );
}
