import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "../../components/public/Navbar";
import { Footer } from "../../components/public/Footer";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { CourseSelector } from "../../components/common/CourseSelector";
import { ReferenceChips } from "../../components/common/ReferenceChips";
import { submitEnquiry } from "../../services/public/enquiryService";
import type { EnquiryPayload } from "../../types";
import { validators, type FormErrors } from "../../services/public/validation";
import { getCourseByName } from "../../data/courses";
import { USE_MOCK_API } from "../../services/public/api";

const initialValues: EnquiryPayload = {
  studentName: "",
  email: "",
  phone: "",
  course: "",
  reference: "",
};

export default function EnquiryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preselectedCourse = useMemo(() => {
    const raw = searchParams.get("course");
    return getCourseByName(raw)?.name || "";
  }, [searchParams]);

  const [values, setValues] = useState<EnquiryPayload>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryPayload, boolean>>>({
    studentName: false,
    email: false,
    phone: false,
    course: false,
    reference: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedCourse && !values.course) {
      setValues((v) => ({ ...v, course: preselectedCourse }));
    }
  }, [preselectedCourse, values.course]);

  const setField = <K extends keyof EnquiryPayload>(key: K, val: EnquiryPayload[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (touched[key]) {
      const vfn = (validators as Record<string, (v: string) => string>)[key as string];
      if (vfn) setErrors((e) => ({ ...e, [key]: vfn(String(val)) }));
    }
  };

  const handleBlur = (key: keyof EnquiryPayload) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const vfn = (validators as Record<string, (v: string) => string>)[key as string];
    if (vfn) setErrors((e) => ({ ...e, [key]: vfn(String(values[key])) }));
  };

  const validateAll = (): boolean => {
    const next: FormErrors = {
      studentName: validators.studentName(values.studentName),
      email: validators.email(values.email),
      phone: validators.phone(values.phone),
      course: validators.course(values.course ?? ""),
      reference: validators.reference(values.reference ?? ""),
    };
    setErrors(next);
    setTouched(prev => ({
      ...prev,
      studentName: true,
      email: true,
      phone: true,
      course: true,
      reference: true,
    }));
    return !Object.values(next).some((v) => v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateAll()) return;

    try {
      setSubmitting(true);
      const result = await submitEnquiry(values);
      sessionStorage.setItem(
        "fortunecloud_last_enquiry",
        JSON.stringify(result)
      );
      navigate("/success", { state: { enquiry: result } });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      {/* Decorative atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-[#F5F9FF] via-[#EFF6FF] to-white" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.18),transparent_70%)]" />

      <main className="pt-28 sm:pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/80 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#475569]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                Enquiry
              </div>
              <h1 className="display mt-6 text-[44px] sm:text-[56px] lg:text-[68px] text-[#0F172A]">
                Let's get
                <br />
                to{" "}
                <span className="bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] bg-clip-text text-transparent">
                  know you.
                </span>
              </h1>
              <p className="mt-5 text-[17px] text-[#475569] leading-[1.6] max-w-md">
                Tell us a little about yourself and the course you're
                interested in. Our mentors will reach out within 24 hours.
              </p>

              <ul className="mt-8 space-y-3.5 text-[14.5px] text-[#334155]">
                {[
                  "Personalized course guidance",
                  "Curriculum walkthrough with a mentor",
                  "No commitment — just clarity",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {USE_MOCK_API && (
                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                  Mock mode — no real submission
                </div>
              )}
            </motion.div>

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)]"
              >
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.18),transparent_70%)]" />

                <div className="relative space-y-8">
                  {/* Section: Personal */}
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#94A3B8] font-semibold">
                      Step 01 — Personal
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        name="studentName"
                        label="Full Name"
                        placeholder="e.g. Aarav Mehta"
                        autoComplete="name"
                        value={values.studentName}
                        onChange={(e) => setField("studentName", e.target.value)}
                        onBlur={() => handleBlur("studentName")}
                        error={touched.studentName ? errors.studentName : undefined}
                        iconLeft={<User />}
                      />
                      <Input
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        inputMode="numeric"
                        placeholder="10-digit mobile"
                        autoComplete="tel"
                        maxLength={10}
                        value={values.phone}
                        onChange={(e) =>
                          setField("phone", e.target.value.replace(/\D/g, ""))
                        }
                        onBlur={() => handleBlur("phone")}
                        error={touched.phone ? errors.phone : undefined}
                        iconLeft={<Phone />}
                      />
                    </div>
                    <div className="mt-4">
                      <Input
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => setField("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        error={touched.email ? errors.email : undefined}
                        iconLeft={<Mail />}
                      />
                    </div>
                  </div>

                  {/* Section: Course */}
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#94A3B8] font-semibold">
                      Step 02 — Course
                    </div>
                    <div className="mt-4">
                      <CourseSelector
                        selected={values.course ?? ""}
                        onSelect={(v) => {
                          setField("course", v);
                          setTouched((t) => ({ ...t, course: true }));
                          setErrors((e) => ({ ...e, course: "" }));
                        }}
                        error={touched.course ? errors.course : undefined}
                      />
                    </div>
                  </div>

                  {/* Section: Reference */}
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#94A3B8] font-semibold">
                      Step 03 — How did you hear about us?
                    </div>
                    <div className="mt-4">
                      <ReferenceChips
                        selected={values.reference ?? ""}
                        onSelect={(v) => {
                          setField("reference", v);
                          setTouched((t) => ({ ...t, reference: true }));
                          setErrors((e) => ({ ...e, reference: "" }));
                        }}
                        error={touched.reference ? errors.reference : undefined}
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
                      {submitError}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <Link
                      to="/"
                      className="text-[14px] font-medium text-[#64748B] hover:text-[#0F172A] inline-flex items-center gap-1.5"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 12H5" />
                        <path d="M11 18l-6-6 6-6" />
                      </svg>
                      Back to home
                    </Link>
                    <Button
                      type="submit"
                      size="lg"
                      loading={submitting}
                      iconRight={!submitting ? <Arrow /> : undefined}
                      className="w-full sm:w-auto"
                    >
                      {submitting ? "SUBMITTING…" : "SUBMIT ENQUIRY"}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function User() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function Mail() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function Phone() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19.86 19.86 0 0 1 2 4.11 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.27 1L7.21 10.21a16 16 0 0 0 6.58 6.58l1.46-1.61a1 1 0 0 1 1-.27l4 1a1 1 0 0 1 .75 1z" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
