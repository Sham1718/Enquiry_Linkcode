package com.linkcode.inquirymanagement.dto.request;

import com.linkcode.inquirymanagement.enums.EnquiryStatus;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEnquiryRequest {

    private EnquiryStatus status;

    @FutureOrPresent(message = "Joining date cannot be in the past")
    private LocalDate joiningDate;
}
