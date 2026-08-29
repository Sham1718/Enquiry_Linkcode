import type { EnquiryStatus } from "./admin";

/**
 * Backend CreateEnquiryRequest payload
 */
export interface CreateEnquiryRequest {
  studentName: string;
  email: string;
  phone: string;
  courseInterested: string;
  reference?: string;
}

/**
 * Frontend form enquiry payload (supports both 'course' and 'courseInterested')
 */
export type EnquiryPayload = {
  studentName: string;
  email: string;
  phone: string;
  course?: string;
  courseInterested?: string;
  reference?: string;
};

/**
 * Backend CreateEnquiryResponse DTO
 */
export interface CreateEnquiryResponse {
  enquiryId: number | string;
  studentName: string;
  status: EnquiryStatus;
  createdAt: string;
}

/**
 * Frontend confirmation result wrapper
 */
export type EnquiryResult = {
  id: string | number;
  receivedAt: string;
  payload: {
    studentName: string;
    email: string;
    phone: string;
    course: string;
    courseInterested?: string;
    reference?: string;
  };
};

export type FormErrors = {
  studentName?: string;
  email?: string;
  phone?: string;
  course?: string;
  courseInterested?: string;
  reference?: string;
};

export interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  mode: string;
  badge?: string;
  iconName: string;
  highlights: string[];
  skills: string[];
}
