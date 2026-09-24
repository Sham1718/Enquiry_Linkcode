import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <Hero />
      </main>

    </div>
  );
};

export default Landing;