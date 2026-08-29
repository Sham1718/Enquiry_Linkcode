export type EnquiryStatus = "NEW" | "INTERESTED" | "HOT" | "COLD" | "NOT_INTERESTED";

export const STATUS_OPTIONS: EnquiryStatus[] = ["NEW", "INTERESTED", "HOT", "COLD", "NOT_INTERESTED"];

/**
 * Standard Spring Boot backend response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  /** Backwards compatibility alias if referenced */
  accessToken?: string;
}

export interface Enquiry {
  id: string | number;
  studentName: string;
  email: string;
  phone: string;
  courseInterested: string;
  status: EnquiryStatus;
  joiningDate?: string | null;
  createdAt: string;
  reference?: string;
  message?: string;
}

export type EnquiryItem = Enquiry;

export interface UpdateEnquiryRequest {
  status?: EnquiryStatus;
  joiningDate?: string | null;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first?: boolean;
  last?: boolean;
}

export type PageResponse<T> = PagedResponse<T>;

export interface NotificationItem {
  id: string | number;
  enquiryId?: string | number;
  studentName: string;
  message: string;
  type?: string;
  isRead: boolean;
  createdAt: string;
  courseInterested?: string;
}

export interface NotificationsResponse {
  unreadCount: number;
  notifications: NotificationItem[];
}

export interface DashboardData {
  totalEnquiries: number;
  newEnquiries: number;
  interestedEnquiries: number;
  hotEnquiries: number;
  coldEnquiries: number;
  notInterestedEnquiries: number;
  todayEnquiries: number;
  upcomingFollowUps: number;
}
