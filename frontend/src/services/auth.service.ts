import { apiClient, mockHandlers, setToken, removeToken, isTokenValid, getToken, unwrapData, USE_MOCK_API } from "./api";
import type { ApiResponse, LoginRequest, LoginResponse } from "../types";

export const authService = {
  /**
   * Authenticate admin with backend
   * Endpoint: POST /api/v1/auth/login
   */
  async login(payload: LoginRequest | { email?: string; username?: string; password: string }): Promise<LoginResponse> {
    const formattedPayload: LoginRequest = {
      username: (payload as any).username || (payload as any).email || "",
      password: payload.password,
    };

    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.login(formattedPayload);
      const data = unwrapData(mockRes);
      setToken(data.token, data.expiresIn);
      return data;
    }

    const res = await apiClient.post<ApiResponse<LoginResponse>>("/api/v1/auth/login", formattedPayload);
    const data = unwrapData(res);
    setToken(data.token, data.expiresIn);
    return data;
  },

  /**
   * Sign out and clear stored session token
   */
  logout(): void {
    removeToken();
  },

  /**
   * Check if user currently holds a valid unexpired JWT token
   */
  isAuthenticated(): boolean {
    return isTokenValid();
  },

  /**
   * Retrieve active JWT token
   */
  getToken(): string | null {
    return getToken();
  },
};

export default authService;
