import { apiClient, mockHandlers, unwrapData, USE_MOCK_API } from "./api";
import type { ApiResponse, DashboardData } from "../types";

export const dashboardService = {
  /**
   * Get dashboard analytics summary
   * Endpoint: GET /api/v1/dashboard
   */
  async getDashboard(): Promise<DashboardData> {
    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.getDashboard();
      return unwrapData(mockRes);
    }

    const res = await apiClient.get<ApiResponse<DashboardData>>("/api/v1/dashboard");
    return unwrapData(res);
  },
};

export default dashboardService;
