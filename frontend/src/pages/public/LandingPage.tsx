import { Navbar } from "../../components/public/Navbar";
import { Hero } from "../../components/public/Hero";
import { Stats } from "../../components/public/Stats";
import { Courses } from "../../components/public/Courses";
import { CompanyMarquee } from "../../components/public/CompanyMarquee";
import { WhyChooseUs } from "../../components/public/WhyChooseUs";
import { CareerJourney } from "../../components/public/CareerJourney";
import { Alumni } from "../../components/public/Alumni";
import { Testimonials } from "../../components/public/Testimonials";
import { FinalCTA } from "../../components/public/FinalCTA";
import { Footer } from "../../components/public/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Courses />
        <CompanyMarquee />
        <WhyChooseUs />
        <CareerJourney />
        <Alumni />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
