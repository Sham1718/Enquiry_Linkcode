package com.linkcode.inquirymanagement.dto.response;

import com.linkcode.inquirymanagement.enums.EnquiryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnquiryListResponse {

    private Long id;
    private String studentName;
    private String email;
    private String phone;
    private String courseInterested;
    private String reference;
    private EnquiryStatus status;
    private LocalDate joiningDate;
    private LocalDateTime createdAt;
}
