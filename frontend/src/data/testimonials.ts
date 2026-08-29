export type Testimonial = {
  name: string;
  course: string;
  rating: number; // out of 5
  review: string;
  initials: string;
  gradient: string;
  placedAt: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ananya Roy",
    course: "Java Full Stack",
    rating: 5,
    review:
      "The mentorship felt personal. I built a full banking app during the course and that became my interview project. Placed within 60 days.",
    initials: "AR",
    gradient: "from-blue-500 to-indigo-600",
    placedAt: "Placed at Capgemini",
  },
  {
    name: "Vikram Patel",
    course: "MERN Stack",
    rating: 5,
    review:
      "What I loved most was the focus on real-world projects — not just theory. The career support team is genuinely invested in your success.",
    initials: "VP",
    gradient: "from-emerald-500 to-teal-600",
    placedAt: "Placed at IBM",
  },
  {
    name: "Riya Nair",
    course: "Data Analytics",
    rating: 4.5,
    review:
      "Coming from a non-tech background, I was nervous. The structured roadmap and patient mentors made the entire journey feel achievable.",
    initials: "RN",
    gradient: "from-violet-500 to-fuchsia-600",
    placedAt: "Placed at Deloitte",
  },
  {
    name: "Aditya Joshi",
    course: "Python Full Stack",
    rating: 5,
    review:
      "Django, REST APIs, deployment — the curriculum is genuinely current. I cracked two interviews using what I built here.",
    initials: "AJ",
    gradient: "from-sky-500 to-blue-700",
    placedAt: "Placed at L&T Infotech",
  },
];
