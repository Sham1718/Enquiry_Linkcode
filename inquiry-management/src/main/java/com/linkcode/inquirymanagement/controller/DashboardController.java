package com.linkcode.inquirymanagement.controller;

import com.linkcode.inquirymanagement.dto.response.ApiResponse;
import com.linkcode.inquirymanagement.dto.response.DashboardResponse;
import com.linkcode.inquirymanagement.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {

        DashboardResponse responseData = dashboardService.getDashboardStatistics();

        ApiResponse<DashboardResponse> response = ApiResponse.success(
                "Dashboard statistics retrieved successfully.",
                responseData
        );

        return ResponseEntity.ok(response);
    }
}
