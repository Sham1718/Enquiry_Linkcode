package com.linkcode.inquirymanagement.service.impl;

import com.linkcode.inquirymanagement.dto.response.NotificationResponse;
import com.linkcode.inquirymanagement.dto.response.PagedResponse;
import com.linkcode.inquirymanagement.entity.Notification;
import com.linkcode.inquirymanagement.exception.NotificationNotFoundException;
import com.linkcode.inquirymanagement.repository.NotificationRepository;
import com.linkcode.inquirymanagement.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public PagedResponse<NotificationResponse> getAllNotifications(int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Notification> notificationPage = notificationRepository.findAll(pageable);

        List<NotificationResponse> content = notificationPage.getContent().stream()
                .map(this::mapToResponse)
                .toList();

        PagedResponse<NotificationResponse> pagedResponse = new PagedResponse<>();
        pagedResponse.setContent(content);
        pagedResponse.setPage(notificationPage.getNumber());
        pagedResponse.setSize(notificationPage.getSize());
        pagedResponse.setTotalElements(notificationPage.getTotalElements());
        pagedResponse.setTotalPages(notificationPage.getTotalPages());
        pagedResponse.setFirst(notificationPage.isFirst());
        pagedResponse.setLast(notificationPage.isLast());

        return pagedResponse;
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
