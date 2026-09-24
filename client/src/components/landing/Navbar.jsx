    const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          Link<span className="text-blue-500">Code</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#courses"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Courses
          </a>

          <a
            href="#certifications"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Certifications
          </a>

          <a
            href="#testimonials"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Testimonials
          </a>

          <a
            href="#contact"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-700">
          Enroll Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
