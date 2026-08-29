package com.linkcode.inquirymanagement.service.impl;

import com.linkcode.inquirymanagement.dto.response.NotificationResponse;
import com.linkcode.inquirymanagement.entity.Notification;
import com.linkcode.inquirymanagement.exception.NotificationNotFoundException;
import com.linkcode.inquirymanagement.repository.NotificationRepository;
import com.linkcode.inquirymanagement.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<NotificationResponse> getAllNotifications() {
        return notificationRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public long getUnreadNotificationCount() {
        return notificationRepository.countByIsReadFalse();
    }

    @Override
    public void markNotificationAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException(id));

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    private NotificationResponse mapToResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .enquiryId(notification.getEnquiry().getId())
                .studentName(notification.getEnquiry().getStudentName())
                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
