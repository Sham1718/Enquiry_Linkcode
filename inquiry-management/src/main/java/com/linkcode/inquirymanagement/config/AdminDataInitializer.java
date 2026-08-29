package com.linkcode.inquirymanagement.config;

import com.linkcode.inquirymanagement.entity.Admin;
import com.linkcode.inquirymanagement.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AdminDataInitializer {

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner initAdmin(AdminRepository adminRepository,
                                       PasswordEncoder passwordEncoder) {
        return args -> {
            if (adminRepository.findByUsername(adminUsername).isEmpty()) {
                Admin admin = Admin.builder()
                        .username(adminUsername)
                        .password(passwordEncoder.encode(adminPassword))
                        .build();
                adminRepository.save(admin);
                System.out.println("Default admin created with username: " + adminUsername);
            }
        };
    }
}
