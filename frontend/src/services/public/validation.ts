import type { FormErrors } from "../../types";

export const validators = {
  studentName: (v: string) => {
    const value = v.trim();
    if (!value) return "Please enter your full name.";
    if (value.length < 2) return "Name should be at least 2 characters.";
    if (value.length > 100) return "Name is too long (max 100 characters).";
    return "";
  },
  email: (v: string) => {
    const value = v.trim();
    if (!value) return "Please enter your email address.";
    if (value.length > 150) return "Email is too long (max 150 characters).";
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!re.test(value)) return "Please enter a valid email address.";
    return "";
  },
  phone: (v: string) => {
    const value = v.replace(/\D/g, "");
    if (!value) return "Please enter your phone number.";
    if (!/^[6-9]\d{9}$/.test(value))
      return "Enter a valid 10-digit Indian mobile number.";
    return "";
  },
  course: (v: string) => (!v ? "Please choose a course you're interested in." : ""),
  reference: (v: string) => (!v ? "Please tell us how you heard about us." : ""),
};

export type { FormErrors };
