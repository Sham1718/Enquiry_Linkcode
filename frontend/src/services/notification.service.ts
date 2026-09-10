import { apiClient, mockHandlers, unwrapData, USE_MOCK_API } from "./api";
import type { ApiResponse, NotificationItem, NotificationsResponse, PagedResponse } from "../types";

export interface NotificationQuery {
  page?: number;
  size?: number;
}

export const notificationService = {
  /**
   * Retrieve paginated notifications
   * Endpoint: GET /api/v1/notifications?page=&size=
   */
  async getPaged(params: NotificationQuery = {}): Promise<PagedResponse<NotificationItem>> {
    const queryParams: Record<string, any> = {};
    if (params.page !== undefined) queryParams.page = params.page;
    if (params.size !== undefined) queryParams.size = params.size;

    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.getNotifications(queryParams);
      return unwrapData(mockRes);
    }

    const res = await apiClient.get<ApiResponse<PagedResponse<NotificationItem>>>(
      "/api/v1/notifications",
      { params: queryParams }
    );
    return unwrapData(res);
  },

  /**
   * Retrieve all notifications
   * Endpoint: GET /api/v1/notifications
   */
  async getAllNotifications(params: NotificationQuery = {}): Promise<NotificationItem[]> {
    const page = await this.getPaged(params);
    return page.content;
  },

  /**
   * Retrieve unread notification count
   * Endpoint: GET /api/v1/notifications/unread-count
   */
  async getUnreadCount(): Promise<number> {
    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.getUnreadNotificationCount();
      return unwrapData(mockRes);
    }
    const res = await apiClient.get<ApiResponse<number>>("/api/v1/notifications/unread-count");
    return unwrapData(res);
  },

  /**
   * Mark a notification as read
   * Endpoint: PUT /api/v1/notifications/{id}/read
   */
  async markAsRead(id: string | number): Promise<void> {
    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.markNotificationAsRead(id);
      unwrapData(mockRes);
      return;
    }
    await apiClient.put<ApiResponse<void>>(`/api/v1/notifications/${id}/read`);
  },

  /**
   * Combined listing helper matching the context & UI format
   */
  async list(params: NotificationQuery = {}): Promise<NotificationsResponse> {
    const [paged, unreadCount] = await Promise.all([
      this.getPaged(params),
      this.getUnreadCount(),
    ]);
    return {
      notifications: paged.content,
      unreadCount,
      page: paged.page,
      size: paged.size,
      totalElements: paged.totalElements,
      totalPages: paged.totalPages,
      first: paged.first,
      last: paged.last,
    };
  },

  // Alias for backward compatibility
  markRead(id: string | number) {
    return this.markAsRead(id);
  },
};

export default notificationService;
