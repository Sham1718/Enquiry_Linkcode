const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-24 md:grid-cols-2">

        {/* Left Content */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-500">
            Learn. Build. Grow.
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Build Your
            <span className="block text-blue-500">
              Future With Us
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
            Learn industry-ready skills from experienced instructors,
            work on real-world projects, and earn certifications that
            help you move forward in your career.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700">
              Explore Courses
            </button>

            <button className="rounded-lg border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10">
              Watch Student Stories
            </button>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="relative flex h-80 w-full max-w-md items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">

            <div className="text-center">
              <div className="text-6xl font-bold text-blue-500">
                10K+
              </div>

              <p className="mt-2 text-gray-400">
                Students Trained
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;