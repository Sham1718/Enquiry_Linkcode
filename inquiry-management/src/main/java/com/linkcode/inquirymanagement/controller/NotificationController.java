package com.linkcode.inquirymanagement.controller;

import com.linkcode.inquirymanagement.dto.response.ApiResponse;
import com.linkcode.inquirymanagement.dto.response.NotificationResponse;
import com.linkcode.inquirymanagement.service.NotificationService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Validated
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getAllNotifications() {

        List<NotificationResponse> responseData = notificationService.getAllNotifications();

        ApiResponse<List<NotificationResponse>> response = ApiResponse.success(
                "Notifications retrieved successfully.",
                responseData
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Long>> getUnreadNotificationCount() {

        long count = notificationService.getUnreadNotificationCount();

        ApiResponse<Long> response = ApiResponse.success(
                "Unread notification count retrieved successfully.",
                count
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markNotificationAsRead(
            @PathVariable @Positive Long id
    ) {
        notificationService.markNotificationAsRead(id);

        ApiResponse<Void> response = ApiResponse.success(
                "Notification marked as read successfully.",
                null
        );

        return ResponseEntity.ok(response);
    }
}
