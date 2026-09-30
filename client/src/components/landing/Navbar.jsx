import Logo from '../common/logo.jsx';
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-black/80 bg-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          {/* Link<span className="text-blue-500">Code</span> */}
          {/* <Logo/> */}
          <img src="logo.png" className='w-45 h-17.5 object-contain' alt="" />
        </div>

        {/* Navigation Links */}
        <div className="hidden text-black items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-sm  transition hover:text-red-400"
          >
            Home
          </a>

          <a
            href="#courses"
            className="text-sm text-black transition hover:text-red-400"
          >
            Courses
          </a>

          <a
            href="#certifications"
            className="text-sm text-black transition hover:text-red-400"
          >
            Certifications
          </a>

          <a
            href="#testimonials"
            className="text-sm text-black transition hover:text-red-400"
          >
            Testimonials
          </a>

          <a
            href="#contact"
            className="text-sm text-black transition hover:text-red-400"
          >
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <a href="#enquiry" className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-700">
          Enroll Now
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
