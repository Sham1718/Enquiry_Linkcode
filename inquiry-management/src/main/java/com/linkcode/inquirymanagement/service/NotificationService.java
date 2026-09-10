package com.linkcode.inquirymanagement.service;

import com.linkcode.inquirymanagement.dto.response.NotificationResponse;
import com.linkcode.inquirymanagement.dto.response.PagedResponse;

public interface NotificationService {

    PagedResponse<NotificationResponse> getAllNotifications(int page, int size);

    long getUnreadNotificationCount();

    void markNotificationAsRead(Long id);
}
