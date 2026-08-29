import { apiClient, mockHandlers, unwrapData, USE_MOCK_API } from "./api";
import type { ApiResponse, NotificationItem, NotificationsResponse } from "../types";

export const notificationService = {
  /**
   * Retrieve all notifications
   * Endpoint: GET /api/v1/notifications
   */
  async getAllNotifications(): Promise<NotificationItem[]> {
    if (USE_MOCK_API) {
      const mockRes = await mockHandlers.getNotifications();
      return unwrapData(mockRes);
    }
    const res = await apiClient.get<ApiResponse<NotificationItem[]>>("/api/v1/notifications");
    return unwrapData(res);
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
  async list(): Promise<NotificationsResponse> {
    const [notifications, unreadCount] = await Promise.all([
      this.getAllNotifications(),
      this.getUnreadCount(),
    ]);
    return {
      notifications,
      unreadCount,
    };
  },

  // Alias for backward compatibility
  markRead(id: string | number) {
    return this.markAsRead(id);
  },
};

export default notificationService;
