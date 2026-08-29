export type Alumni = {
  name: string;
  role: string;
  company: string;
  course: string;
  initials: string;
  gradient: string; // tailwind gradient classes
  story: string;
};

export const alumni: Alumni[] = [
  {
    name: "Aarav Mehta",
    role: "Software Engineer",
    company: "Infosys",
    course: "Java Full Stack",
    initials: "AM",
    gradient: "from-blue-500 to-indigo-600",
    story: "From campus to corporate — placed within 3 months of completion.",
  },
  {
    name: "Priya Sharma",
    role: "Full Stack Developer",
    company: "TCS Digital",
    course: "MERN Stack",
    initials: "PS",
    gradient: "from-emerald-500 to-teal-600",
    story: "Built 6 real-world projects during the program — recruiters noticed.",
  },
  {
    name: "Rohan Verma",
    role: "Data Analyst",
    company: "Wipro",
    course: "Data Analytics",
    initials: "RV",
    gradient: "from-violet-500 to-fuchsia-600",
    story: "Went from non-tech background to a data role in 5 months.",
  },
  {
    name: "Sneha Iyer",
    role: "Backend Engineer",
    company: "Cognizant",
    course: "Python Full Stack",
    initials: "SI",
    gradient: "from-sky-500 to-blue-700",
    story: "Loved the mentor-driven learning — felt guided every step.",
  },
  {
    name: "Karan Singh",
    role: "SDE — I",
    company: "Accenture",
    course: "Java Full Stack",
    initials: "KS",
    gradient: "from-amber-500 to-orange-600",
    story: "Mock interviews and resume prep made the difference.",
  },
  {
    name: "Neha Kapoor",
    role: "Frontend Engineer",
    company: "Mindtree",
    course: "MERN Stack",
    initials: "NK",
    gradient: "from-rose-500 to-pink-600",
    story: "Loved building real product UIs — felt production-ready.",
  },
];
