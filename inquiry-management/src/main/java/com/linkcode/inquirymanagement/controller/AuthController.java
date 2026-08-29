package com.linkcode.inquirymanagement.controller;

import com.linkcode.inquirymanagement.dto.request.LoginRequest;
import com.linkcode.inquirymanagement.dto.response.ApiResponse;
import com.linkcode.inquirymanagement.dto.response.LoginResponse;
import com.linkcode.inquirymanagement.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody @Valid LoginRequest request) {

        LoginResponse responseData = authService.login(request);

        ApiResponse<LoginResponse> response = ApiResponse.success(
                "Login successful.",
                responseData
        );

        return ResponseEntity.ok(response);
    }
}
