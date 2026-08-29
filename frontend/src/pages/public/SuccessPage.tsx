import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "../../components/public/Navbar";
import { Footer } from "../../components/public/Footer";
import { Button } from "../../components/common/Button";
import type { EnquiryResult } from "../../types";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [enquiry, setEnquiry] = useState<EnquiryResult | null>(null);

  useEffect(() => {
    const fromState = (location.state as { enquiry?: EnquiryResult } | null)?.enquiry;
    if (fromState) {
      setEnquiry(fromState);
      return;
    }
    const cached = sessionStorage.getItem("fortunecloud_last_enquiry");
    if (cached) {
      try {
        setEnquiry(JSON.parse(cached) as EnquiryResult);
      } catch {
        // ignore
      }
    }
  }, [location.state]);

  // If somehow landed here with no enquiry, send back to the form.
  useEffect(() => {
    const has = !!enquiry;
    const timer = setTimeout(() => {
      if (!has) navigate("/enquiry", { replace: true });
    }, 600);
    return () => clearTimeout(timer);
  }, [enquiry, navigate]);

  return (
    <div className="relative min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-[#F5F9FF] via-[#EFF6FF] to-white" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.18),transparent_70%)]" />

      <main className="pt-28 sm:pt-36 pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-12 text-center"
          >
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.18),transparent_70%)]" />
            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(29,78,216,0.16),transparent_70%)]" />

            <div className="relative">
              <AnimatedCheck />

              <div className="mt-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1D4ED8]">
                  Submission confirmed
                </div>
                <h1 className="display mt-5 text-[36px] sm:text-[48px] lg:text-[56px] text-[#0F172A]">
                  Enquiry submitted
                  <br />
                  <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
                    successfully!
                  </span>
                </h1>
                <p className="mt-5 text-[17px] text-[#475569] leading-[1.6] max-w-xl mx-auto">
                  Thank you for contacting us. Our team will review your
                  enquiry and reach out to you shortly.
                </p>
              </div>

              {enquiry && (
                <div className="mt-8 mx-auto max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-5 text-left">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#94A3B8] font-semibold">
                    Reference ID
                  </div>
                  <div className="mt-1 text-[18px] font-extrabold tracking-tight text-[#0F172A]">
                    {enquiry.id}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                    <div>
                      <div className="text-[#94A3B8] uppercase tracking-[0.18em] text-[10.5px] font-semibold">
                        Name
                      </div>
                      <div className="mt-1 font-semibold text-[#0F172A]">
                        {enquiry.payload.studentName}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#94A3B8] uppercase tracking-[0.18em] text-[10.5px] font-semibold">
                        Course
                      </div>
                      <div className="mt-1 font-semibold text-[#0F172A]">
                        {enquiry.payload.course}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#94A3B8] uppercase tracking-[0.18em] text-[10.5px] font-semibold">
                        Email
                      </div>
                      <div className="mt-1 font-semibold text-[#0F172A] truncate">
                        {enquiry.payload.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#94A3B8] uppercase tracking-[0.18em] text-[10.5px] font-semibold">
                        Phone
                      </div>
                      <div className="mt-1 font-semibold text-[#0F172A]">
                        {enquiry.payload.phone}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center">
                <Link to="/">
                  <Button variant="secondary" size="md" iconLeft={<HomeIcon />}>
                    BACK TO HOME
                  </Button>
                </Link>
                <Link to="/enquiry">
                  <Button size="md">SUBMIT ANOTHER</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function AnimatedCheck() {
  return (
    <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-white shadow-[0_18px_40px_-12px_rgba(29,78,216,0.35)]" />
      <svg
        viewBox="0 0 52 52"
        className="absolute inset-0 m-auto h-14 w-14 sm:h-16 sm:w-16"
        aria-hidden
      >
        <motion.circle
          cx="26"
          cy="26"
          r="22"
          fill="none"
          stroke="#2563EB"
          strokeWidth={3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M14 27l8 8 16-18"
          fill="none"
          stroke="#1D4ED8"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}
