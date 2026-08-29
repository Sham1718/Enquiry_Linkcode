package com.linkcode.inquirymanagement.controller;

import com.linkcode.inquirymanagement.dto.request.CreateEnquiryRequest;
import com.linkcode.inquirymanagement.dto.request.UpdateEnquiryRequest;
import com.linkcode.inquirymanagement.dto.response.ApiResponse;
import com.linkcode.inquirymanagement.dto.response.CreateEnquiryResponse;
import com.linkcode.inquirymanagement.dto.response.EnquiryListResponse;
import com.linkcode.inquirymanagement.dto.response.PagedResponse;
import com.linkcode.inquirymanagement.enums.EnquiryStatus;
import com.linkcode.inquirymanagement.service.EnquiryService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/enquiries")
@RequiredArgsConstructor
@Validated
public class EnquiryController {

    private final EnquiryService enquiryService;

    @PostMapping
    public ResponseEntity<ApiResponse<CreateEnquiryResponse>> createEnquiry(
            @RequestBody @Valid CreateEnquiryRequest request) {

        CreateEnquiryResponse responseData = enquiryService.createEnquiry(request);

        ApiResponse<CreateEnquiryResponse> response = ApiResponse.success(
                "Your enquiry has been submitted successfully. We will contact you soon.",
                responseData
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<EnquiryListResponse>>> getEnquiries(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size,
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(required = false) String search
    ) {

        PagedResponse<EnquiryListResponse> responseData = enquiryService.getEnquiries(page, size, status, search);

        ApiResponse<PagedResponse<EnquiryListResponse>> response = ApiResponse.success(
                "Enquiries retrieved successfully.",
                responseData
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EnquiryListResponse>> getEnquiryById(
            @PathVariable @Positive Long id
    ) {

        EnquiryListResponse responseData = enquiryService.getEnquiryById(id);

        ApiResponse<EnquiryListResponse> response = ApiResponse.success(
                "Enquiry retrieved successfully.",
                responseData
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EnquiryListResponse>> updateEnquiry(
            @PathVariable @Positive Long id,
            @RequestBody @Valid UpdateEnquiryRequest request
    ) {

        EnquiryListResponse responseData = enquiryService.updateEnquiry(id, request);

        ApiResponse<EnquiryListResponse> response = ApiResponse.success(
                "Enquiry updated successfully.",
                responseData
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportEnquiries(
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(required = false) String search
    ) {

        byte[] excelData = enquiryService.exportEnquiriesToExcel(status, search);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "enquiries.xlsx");
        headers.setContentLength(excelData.length);

        return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
    }
}
