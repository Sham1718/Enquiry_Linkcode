import { useState } from "react";
import { submitEnquiry } from "../services/enquiryService";
import CourseSelector from '../components/common/courseSelector.jsx';
import ReferenceSelector from '../components/common/referenceSelector.jsx';
import UserTypeSelector from '../components/common/UserTypeSelector.jsx';

const courses = [
  "Java Full Stack Development",
  "Python Full Stack Development",
  "MERN Stack Development",
  "Data Analytics",
  "Other / Not Sure Yet",
];

const referenceOptions = [
  "Friend",
  "Social Media",
  "Google",
  "Walk-in",
  "College",
  "Advertisement",
  "Alumni",
  "Other",
];

const initialValues = {
  studentName: "",
  email: "",
  phone: "",
  course: "",
  reference: "",
  userType:"",
};

const Enquiry = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // --------------------------------------------------
  // Handle all normal input changes
  // --------------------------------------------------
  const setField = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear the existing error for this field
    // when the user starts correcting it.
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  // --------------------------------------------------
  // Validate the complete form
  // --------------------------------------------------
  const validateAll = () => {
    const nextErrors = {};

    const studentName = values.studentName.trim();
    const email = values.email.trim();
    const phone = values.phone.replace(/\D/g, "");

    // Student name
    if (!studentName) {
      nextErrors.studentName = "Please enter your full name.";
    } else if (studentName.length < 2) {
      nextErrors.studentName =
        "Name should be at least 2 characters.";
    } else if (studentName.length > 100) {
      nextErrors.studentName =
        "Name is too long (max 100 characters).";
    }

    // Email
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (email.length > 150) {
      nextErrors.email =
        "Email is too long (max 150 characters).";
    } else {
      const emailRegex =
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if (!emailRegex.test(email)) {
        nextErrors.email =
          "Please enter a valid email address.";
      }
    }

    // Phone
    if (!phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      nextErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // Course
    if (!values.course) {
      nextErrors.course =
        "Please choose a course you're interested in.";
    }

    // Reference
    if (!values.reference) {
      nextErrors.reference =
        "Please tell us how you heard about us.";
    }

    //userType
    if (!values.userType) {
    nextErrors.userType =
        "Please select an option that describes you.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  // --------------------------------------------------
  // Submit form
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError("");

    // Stop here if validation fails
    if (!validateAll()) {
      return;
    }

    try {
      setSubmitting(true);

      const result = await submitEnquiry(values);

      console.log("Enquiry submitted successfully:", result);

      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 py-16 text-[#0F172A]">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Enquiry
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Let's get to know you.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-[#64748B]">
            Tell us a little about yourself and the course you're
            interested in.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8"
        >
          <div className="space-y-7">
            {/* ---------------- PERSONAL INFORMATION ---------------- */}
            <section>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                Step 01 — Personal
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="studentName"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name
                  </label>

                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    placeholder="e.g. Aarav Mehta"
                    autoComplete="name"
                    value={values.studentName}
                    onChange={(e) =>
                      setField("studentName", e.target.value)
                    }
                    className={`h-14 w-full rounded-2xl border bg-white px-4 text-[15px] outline-none transition ${
                      errors.studentName
                        ? "border-red-300 ring-4 ring-red-100"
                        : "border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                    }`}
                  />

                  {errors.studentName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.studentName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) =>
                      setField(
                        "phone",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className={`h-14 w-full rounded-2xl border bg-white px-4 text-[15px] outline-none transition ${
                      errors.phone
                        ? "border-red-300 ring-4 ring-red-100"
                        : "border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) =>
                    setField("email", e.target.value)
                  }
                  className={`h-14 w-full rounded-2xl border bg-white px-4 text-[15px] outline-none transition ${
                    errors.email
                      ? "border-red-300 ring-4 ring-red-100"
                      : "border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                  }`}
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
            </section>

            {/* ---------------- COURSE ---------------- */}
            <CourseSelector
             value={values.course}
             error={errors.course}
             courses={courses}
             onChange={(value) => setField("course", value)}
            />

            {/* ---------------- REFERENCE ---------------- */}
            <ReferenceSelector
             value={values.reference}
             error={errors.reference}
             options={referenceOptions}
             onChange={(value) => setField("reference", value)}
            />

            {/* ---------------- USER-TYPE ---------------- */}
            <UserTypeSelector
             value={values.userType}
             error={errors.userType}
             onChange={(value) => setField("userType", value)}
            />

            {/* ---------------- BACKEND ERROR ---------------- */}
            {submitError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            {/* ---------------- SUBMIT ---------------- */}
            <button
              type="submit"
              disabled={submitting}
              className="h-14 w-full rounded-full bg-[#1D4ED8] px-7 text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(29,78,216,0.55)] transition hover:bg-[#1E40AF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "SUBMITTING..." : "SUBMIT ENQUIRY"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Enquiry;