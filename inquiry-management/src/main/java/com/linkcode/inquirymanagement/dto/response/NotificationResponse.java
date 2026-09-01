package com.linkcode.inquirymanagement.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.linkcode.inquirymanagement.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;
    private Long enquiryId;
    private String studentName;
    private String message;
    private NotificationType type;
    @JsonProperty("isRead")
    private boolean isRead;
    private LocalDateTime createdAt;
}
