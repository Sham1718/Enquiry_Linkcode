import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Enquiry from "../components/landing/Enquiry.jsx";
import StudentTestimonials from '../components/landing/StudentTestimonials.jsx';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <Hero />
        <Enquiry/>
        <StudentTestimonials/>
      </main>

    </div>
  );
};

export default Landing;