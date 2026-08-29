export type Course = {
  id: string;
  name: string;
  short: string;
  description: string;
  duration: string;
  level: string;
  highlights: string[];
  accent: string; // tailwind classes for soft accent bg
  ring: string;
  icon: "java" | "python" | "mern" | "data" | "spark";
};

export const courses: Course[] = [
  {
    id: "java-full-stack",
    name: "Java Full Stack Development",
    short: "Java",
    description:
      "Master enterprise-grade application development with Java, Spring Boot, REST APIs and modern frontend integration.",
    duration: "6 Months",
    level: "Beginner to Advanced",
    highlights: ["Core Java & OOP", "Spring Boot", "Hibernate + JPA", "REST APIs", "React Integration"],
    accent: "from-orange-50 to-rose-50",
    ring: "ring-orange-200/60",
    icon: "java",
  },
  {
    id: "python-full-stack",
    name: "Python Full Stack Development",
    short: "Python",
    description:
      "Build powerful web platforms with Django, Flask, REST frameworks and modern JavaScript frontends.",
    duration: "5 Months",
    level: "Beginner to Advanced",
    highlights: ["Python & OOP", "Django / Flask", "DRF & APIs", "Database Design", "Deployment"],
    accent: "from-sky-50 to-blue-50",
    ring: "ring-sky-200/60",
    icon: "python",
  },
  {
    id: "mern-stack",
    name: "MERN Stack Development",
    short: "MERN",
    description:
      "Become a full-stack JavaScript engineer with MongoDB, Express, React and Node.js — end to end.",
    duration: "5 Months",
    level: "Intermediate",
    highlights: ["React.js", "Node + Express", "MongoDB", "Auth & Security", "Cloud Deploy"],
    accent: "from-emerald-50 to-teal-50",
    ring: "ring-emerald-200/60",
    icon: "mern",
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    short: "Analytics",
    description:
      "Turn data into decisions with Excel, SQL, Python, Power BI and modern visualization techniques.",
    duration: "4 Months",
    level: "Beginner Friendly",
    highlights: ["Advanced Excel", "SQL & Databases", "Python for Data", "Power BI / Tableau", "Storytelling"],
    accent: "from-violet-50 to-indigo-50",
    ring: "ring-violet-200/60",
    icon: "data",
  },
  {
    id: "other",
    name: "Other / Not Sure Yet",
    short: "Explore",
    description:
      "Not sure which path fits? Talk to our mentors — we'll help you choose the right career track.",
    duration: "—",
    level: "Guidance",
    highlights: ["1-on-1 Counselling", "Career Roadmap", "Personal Mentorship", "Skill Assessment"],
    accent: "from-slate-50 to-blue-50",
    ring: "ring-slate-200/60",
    icon: "spark",
  },
];

export const getCourseByName = (name?: string | null) => {
  if (!name) return undefined;
  const decoded = decodeURIComponent(name).toLowerCase();
  return courses.find(
    (c) => c.name.toLowerCase() === decoded || c.id === decoded || c.short.toLowerCase() === decoded
  );
};
