package com.linkcode.inquirymanagement.service.impl;

import com.linkcode.inquirymanagement.dto.request.LoginRequest;
import com.linkcode.inquirymanagement.dto.response.LoginResponse;
import com.linkcode.inquirymanagement.entity.Admin;
import com.linkcode.inquirymanagement.exception.InvalidCredentialsException;
import com.linkcode.inquirymanagement.repository.AdminRepository;
import com.linkcode.inquirymanagement.security.JwtService;
import com.linkcode.inquirymanagement.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest request) {

        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String token = jwtService.generateToken(admin.getUsername());

        return LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(jwtService.getExpirationTime())
                .build();
    }
}
