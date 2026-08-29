package com.linkcode.inquirymanagement.dto.response;

import com.linkcode.inquirymanagement.enums.EnquiryStatus;
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
public class CreateEnquiryResponse {

    private Long enquiryId;
    private String studentName;
    private EnquiryStatus status;
    private LocalDateTime createdAt;
}
