import { apiClient, mockHandlers, unwrapData, USE_MOCK_API } from "./api";
import type {
  ApiResponse,
  CreateEnquiryRequest,
  CreateEnquiryResponse,
  Enquiry,
  EnquiryPayload,
  EnquiryResult,
  EnquiryStatus,
  PagedResponse,
  UpdateEnquiryRequest,
} from "../types";

export interface EnquiryQuery {
  page?: number;
  size?: number;
  status?: EnquiryStatus | "ALL";
  course?: string | "ALL";
  search?: string;
}

export const enquiryService = {
  /**
   * Submit new student enquiry
   * Endpoint: POST /api/v1/enquiries
   */
  async createEnquiry(payload: CreateEnquiryRequest): Promise<CreateEnquiryResponse> {
    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.createEnquiry(payload);
      return unwrapData(mockRes);
    }
    const res = await apiClient.post<ApiResponse<CreateEnquiryResponse>>("/api/v1/enquiries", payload);
    return unwrapData(res);
  },

  /**
   * Helper for public student form
   */
  async submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
    const requestPayload: CreateEnquiryRequest = {
      studentName: payload.studentName.trim(),
      email: payload.email.trim(),
      phone: payload.phone.replace(/\D/g, ""),
      courseInterested: payload.courseInterested || payload.course || "",
      reference: payload.reference,
    };

    const response = await this.createEnquiry(requestPayload);
    return {
      id: response.enquiryId,
      receivedAt: response.createdAt || new Date().toISOString(),
      payload: {
        studentName: requestPayload.studentName,
        email: requestPayload.email,
        phone: requestPayload.phone,
        course: requestPayload.courseInterested,
        courseInterested: requestPayload.courseInterested,
        reference: requestPayload.reference,
      },
    };
  },

  /**
   * Fetch paginated list of enquiries
   * Endpoint: GET /api/v1/enquiries
   */
  async getEnquiries(params: EnquiryQuery = {}): Promise<PagedResponse<Enquiry>> {
    const queryParams: Record<string, any> = {};
    if (params.page !== undefined) queryParams.page = params.page;
    if (params.size !== undefined) queryParams.size = params.size;
    if (params.status && params.status !== "ALL") queryParams.status = params.status;
    if (params.search && params.search.trim()) queryParams.search = params.search.trim();

    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.getEnquiries({
        ...queryParams,
        course: params.course && params.course !== "ALL" ? params.course : undefined,
      });
      return unwrapData(mockRes);
    }

    const res = await apiClient.get<ApiResponse<PagedResponse<Enquiry>>>("/api/v1/enquiries", {
      params: queryParams,
    });
    return unwrapData(res);
  },

  // Alias for backward compatibility
  list(params: EnquiryQuery = {}) {
    return this.getEnquiries(params);
  },

  /**
   * Fetch single enquiry by ID
   * Endpoint: GET /api/v1/enquiries/{id}
   */
  async getEnquiryById(id: string | number): Promise<Enquiry> {
    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.getEnquiry(id);
      return unwrapData(mockRes);
    }
    const res = await apiClient.get<ApiResponse<Enquiry>>(`/api/v1/enquiries/${id}`);
    return unwrapData(res);
  },

  // Alias for backward compatibility
  get(id: string | number) {
    return this.getEnquiryById(id);
  },

  /**
   * Update enquiry status and/or planned joining date
   * Endpoint: PUT /api/v1/enquiries/{id}
   */
  async updateEnquiry(id: string | number, payload: UpdateEnquiryRequest): Promise<Enquiry> {
    // Only send fields that are provided
    const cleanPayload: UpdateEnquiryRequest = {};
    if (payload.status) cleanPayload.status = payload.status;
    if (payload.joiningDate !== undefined && payload.joiningDate !== "") {
      cleanPayload.joiningDate = payload.joiningDate;
    }

    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.updateEnquiry(id, cleanPayload);
      return unwrapData(mockRes);
    }

    const res = await apiClient.put<ApiResponse<Enquiry>>(`/api/v1/enquiries/${id}`, cleanPayload);
    return unwrapData(res);
  },

  // Alias for backward compatibility
  update(id: string | number, payload: UpdateEnquiryRequest) {
    return this.updateEnquiry(id, payload);
  },

  /**
   * Download enquiries excel export file
   * Endpoint: GET /api/v1/enquiries/export
   */
  async exportEnquiriesToExcel(params?: { status?: EnquiryStatus | "ALL"; search?: string }): Promise<void> {
    const queryParams: Record<string, any> = {};
    if (params?.status && params.status !== "ALL") queryParams.status = params.status;
    if (params?.search && params.search.trim()) queryParams.search = params.search.trim();

    if (USE_MOCK_API) {
      const blob = await mockHandlers.exportExcel();
      triggerDownload(URL.createObjectURL(blob), "enquiries.xlsx");
      return;
    }

    const res = await apiClient.get("/api/v1/enquiries/export", {
      params: queryParams,
      responseType: "blob",
    });

    const blob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "enquiries.xlsx");
  },

  // Alias for backward compatibility
  exportExcel(params?: { status?: EnquiryStatus | "ALL"; search?: string }) {
    return this.exportEnquiriesToExcel(params);
  },
};

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Re-export submitEnquiry for public form consumers
export const submitEnquiry = (payload: EnquiryPayload) => enquiryService.submitEnquiry(payload);

export default enquiryService;
