package com.linkcode.inquirymanagement.service;

import com.linkcode.inquirymanagement.dto.request.CreateEnquiryRequest;
import com.linkcode.inquirymanagement.dto.request.UpdateEnquiryRequest;
import com.linkcode.inquirymanagement.dto.response.CreateEnquiryResponse;
import com.linkcode.inquirymanagement.dto.response.EnquiryListResponse;
import com.linkcode.inquirymanagement.dto.response.PagedResponse;
import com.linkcode.inquirymanagement.enums.EnquiryStatus;

public interface EnquiryService {

    CreateEnquiryResponse createEnquiry(CreateEnquiryRequest request);

    PagedResponse<EnquiryListResponse> getEnquiries(
            int page,
            int size,
            EnquiryStatus status,
            String search
    );

    EnquiryListResponse updateEnquiry(
            Long id,
            UpdateEnquiryRequest request
    );

    byte[] exportEnquiriesToExcel(EnquiryStatus status, String search);

    EnquiryListResponse getEnquiryById(Long id);
}
