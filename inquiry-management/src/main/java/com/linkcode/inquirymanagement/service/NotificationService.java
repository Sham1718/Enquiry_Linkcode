package com.linkcode.inquirymanagement.service;

import com.linkcode.inquirymanagement.dto.response.NotificationResponse;

import java.util.List;

public interface NotificationService {

    List<NotificationResponse> getAllNotifications();

    long getUnreadNotificationCount();

    void markNotificationAsRead(Long id);
}
