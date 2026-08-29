package com.linkcode.inquirymanagement.service;

import com.linkcode.inquirymanagement.dto.request.LoginRequest;
import com.linkcode.inquirymanagement.dto.response.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
}
