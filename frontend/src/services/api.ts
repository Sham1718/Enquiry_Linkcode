import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import type { ApiResponse } from "../types";
import { MOCK_ENQUIRIES, buildMockDashboard, buildMockEnquiriesPage, buildMockNotifications } from "../data/mock";

export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8080";
export const USE_MOCK_API = String((import.meta as any).env?.VITE_USE_MOCK_API ?? "false").toLowerCase() === "true";

export const TOKEN_KEY = "fc_token";
export const TOKEN_EXP_KEY = "fc_token_exp";

/**
 * Token Management Utilities
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, expiresInMs?: number): void {
  localStorage.setItem(TOKEN_KEY, token);
  if (expiresInMs) {
    localStorage.setItem(TOKEN_EXP_KEY, String(Date.now() + expiresInMs));
  } else {
    // Default 24 hours expiry if not specified
    localStorage.setItem(TOKEN_EXP_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
  }
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXP_KEY);
}

export function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;
  const exp = Number(localStorage.getItem(TOKEN_EXP_KEY) || 0);
  if (exp && Date.now() > exp) {
    removeToken();
    return false;
  }
  return true;
}

/**
 * Central Axios HTTP Client
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Alias for convenience
export const api = apiClient;

// Request Interceptor: Attach JWT Bearer token if present
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || ({} as any);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Unauthorized Handler Callback Registry
let onUnauthorized: (() => void) | null = null;
export function registerUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

// Response Interceptor: Handle 401s and error extraction
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiResponse<any>>) => {
    if (error.response?.status === 401) {
      removeToken();
      if (onUnauthorized) onUnauthorized();
    }
    const message =
      error.response?.data?.message ||
      (error.response?.data as any)?.error ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new ApiError(message, error.response?.status ?? 0));
  }
);

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function toApiError(err: unknown, fallback = "Something went wrong"): ApiError {
  if (err instanceof ApiError) return err;
  if (axios.isAxiosError(err)) {
    const status = err.response?.status ?? 0;
    const message =
      (err.response?.data as any)?.message ||
      (err.response?.data as any)?.error ||
      err.message ||
      fallback;
    return new ApiError(typeof message === "string" ? message : fallback, status);
  }
  if (err instanceof Error) return new ApiError(err.message, 0);
  return new ApiError(fallback, 0);
}

/**
 * Unwraps Spring Boot backend ApiResponse wrapper (res.data.data)
 */
export function unwrapData<T>(response: AxiosResponse<ApiResponse<T> | T>): T {
  const data = response.data;
  if (data && typeof data === "object" && "success" in data && "data" in data) {
    return (data as ApiResponse<T>).data;
  }
  return data as T;
}

// ---- In-Memory Mock Handlers for Local Development ----------------------------

function delay(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}

function ok<T>(data: T, message = "Success", status = 200): AxiosResponse<ApiResponse<T>> {
  return {
    data: { success: true, message, data },
    status,
    statusText: "OK",
    headers: {},
    config: {} as any,
  };
}

function fail(message: string, status: number) {
  const err: any = new Error(message);
  err.isAxiosError = true;
  err.response = { data: { success: false, message, data: null }, status };
  return err;
}

const mockStore = {
  enquiries: [...MOCK_ENQUIRIES],
  notifications: buildMockNotifications().notifications,
};

export const mockHandlers = {
  async login(payload: { username?: string; email?: string; password?: string }) {
    await delay(600);
    const identifier = payload.username || payload.email;
    if (!identifier || !payload.password) throw fail("Username and password are required", 400);
    if (payload.password.length < 4) throw fail("Invalid credentials", 401);
    const token = "mock-jwt-" + btoa(identifier) + "-" + Date.now();
    return ok({ token, tokenType: "Bearer", expiresIn: 86400000 });
  },

  async createEnquiry(payload: {
    studentName: string;
    email: string;
    phone: string;
    courseInterested?: string;
    course?: string;
    reference?: string;
  }) {
    await delay(700);
    const id = Date.now();
    const course = payload.courseInterested || payload.course || "Java Full Stack Development";
    const newEnq = {
      id,
      studentName: payload.studentName,
      email: payload.email,
      phone: payload.phone,
      courseInterested: course,
      reference: payload.reference || "Website",
      status: "NEW" as const,
      joiningDate: null,
      createdAt: new Date().toISOString(),
    };
    mockStore.enquiries.unshift(newEnq);
    return ok({
      enquiryId: id,
      studentName: payload.studentName,
      status: "NEW" as const,
      createdAt: newEnq.createdAt,
    });
  },

  async getEnquiries(params: { page?: number; size?: number; status?: string; search?: string; course?: string }) {
    await delay();
    return ok(buildMockEnquiriesPage(params));
  },

  async getEnquiry(id: string | number) {
    await delay();
    const strId = String(id);
    const e = mockStore.enquiries.find((x) => String(x.id) === strId);
    if (!e) throw fail("Enquiry not found", 404);
    return ok(e);
  },

  async updateEnquiry(id: string | number, payload: { status?: any; joiningDate?: string | null }) {
    await delay();
    const strId = String(id);
    const idx = mockStore.enquiries.findIndex((x) => String(x.id) === strId);
    if (idx < 0) throw fail("Enquiry not found", 404);
    const e = { ...mockStore.enquiries[idx] };
    if (payload.status) e.status = payload.status;
    if (payload.joiningDate !== undefined) e.joiningDate = payload.joiningDate;
    mockStore.enquiries[idx] = e;
    return ok(e);
  },

  async getDashboard() {
    await delay();
    return ok(buildMockDashboard());
  },

  async getNotifications() {
    await delay(300);
    return ok(mockStore.notifications);
  },

  async getUnreadNotificationCount() {
    await delay(200);
    const count = mockStore.notifications.filter((n) => !n.isRead).length;
    return ok(count);
  },

  async markNotificationAsRead(id: string | number) {
    await delay(200);
    const strId = String(id);
    const n = mockStore.notifications.find((x) => String(x.id) === strId);
    if (n) n.isRead = true;
    return ok(null);
  },

  async exportExcel() {
    await delay(600);
    const header = ["ID", "Student Name", "Email", "Phone", "Course Interested", "Status", "Joining Date", "Created At"];
    const rows = mockStore.enquiries.map((e) => [
      e.id,
      e.studentName,
      e.email,
      e.phone,
      e.courseInterested,
      e.status,
      e.joiningDate ?? "",
      e.createdAt.slice(0, 10),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return blob;
  },
};
