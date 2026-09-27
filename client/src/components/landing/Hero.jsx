import { useState } from "react";
import { submitEnquiry } from "../../services/enquiryService";

const Hero = () => {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback({ type: "", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await submitEnquiry({
        studentName: formData.get("studentName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        courseInterested: formData.get("courseInterested"),
        reference: formData.get("reference"),
      });
      form.reset();
      setFeedback({
        type: "success",
        message: "Thanks! Your enquiry was received. We will contact you soon.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Unable to submit your enquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

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

        <div id="enquiry" className="scroll-mt-28">
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm sm:p-8"
          >
            <h2 className="text-2xl font-semibold">Talk to an advisor</h2>
            <p className="mt-2 text-sm text-gray-400">
              Share your details and we will help you find the right course.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-gray-300">
                Full name
                <input
                  name="studentName"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Your name"
                  className="min-w-0 rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition focus:border-blue-500"
                />
              </label>
              <label className="grid gap-2 text-sm text-gray-300">
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  placeholder="10-digit mobile number"
                  className="min-w-0 rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition focus:border-blue-500"
                />
              </label>
              <label className="grid gap-2 text-sm text-gray-300 sm:col-span-2">
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={150}
                  placeholder="you@example.com"
                  className="min-w-0 rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition focus:border-blue-500"
                />
              </label>
              <label className="grid gap-2 text-sm text-gray-300 sm:col-span-2">
                Course of interest
                <input
                  name="courseInterested"
                  required
                  maxLength={150}
                  placeholder="e.g. Full Stack Development"
                  className="min-w-0 rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition focus:border-blue-500"
                />
              </label>
              <label className="grid gap-2 text-sm text-gray-300 sm:col-span-2">
                How did you hear about us? <span className="text-gray-500">(optional)</span>
                <input
                  name="reference"
                  maxLength={150}
                  placeholder="Friend, social media, or other"
                  className="min-w-0 rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition focus:border-blue-500"
                />
              </label>
            </div>

            {feedback.message && (
              <p
                role="status"
                aria-live="polite"
                className={`mt-4 text-sm ${feedback.type === "success" ? "text-emerald-400" : "text-red-400"}`}
              >
                {feedback.message}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-md bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send enquiry"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Hero;