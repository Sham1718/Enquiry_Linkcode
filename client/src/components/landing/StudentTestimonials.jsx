
const testimonials = [
  {
    id: 1,
    name: "Student Testimonial 1",
    course: "Student Experience",
    videoUrl: "https://www.instagram.com/reel/Dcvf2T_tLAm/embed",
  },
  {
    id: 2,
    name: "Student Testimonial 2",
    course: "Student Experience",
    videoUrl: "https://www.instagram.com/reel/DaK3woSpugn/embed",
  },
  {
    id: 3,
    name: "Student Testimonial 3",
    course: "Student Experience",
    videoUrl: "https://www.instagram.com/reel/DZ-MwRktDPD/embed",
  },
];

const StudentTestimonials = () => {
  return (
    <section className="w-full bg-black px-6 py-20 md:px-12 lg:px-20">
      
      {/* Section Heading */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Student Testimonials
        </p>

        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Hear From Our Students
        </h2>

        <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
          Discover what our students have to say about their learning
          experience, training, and journey with us.
        </p>
      </div>

      {/* Testimonials */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="overflow-hidden rounded-2xl border border-gray-800 bg-zinc-950 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-gray-600"
          >
            {/* Instagram Reel */}
            <div className="flex justify-center bg-black">
              <iframe
                src={testimonial.videoUrl}
                title={testimonial.name}
                className="h-130 w-full"
                frameBorder="0"
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Student Information */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white">
                {testimonial.name}
              </h3>

              <p className="mt-1 text-sm text-blue-400">
                {testimonial.course}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default StudentTestimonials;