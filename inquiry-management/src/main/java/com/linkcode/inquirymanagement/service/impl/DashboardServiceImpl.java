package com.linkcode.inquirymanagement.service.impl;

import com.linkcode.inquirymanagement.dto.response.DashboardResponse;
import com.linkcode.inquirymanagement.enums.EnquiryStatus;
import com.linkcode.inquirymanagement.repository.EnquiryRepository;
import com.linkcode.inquirymanagement.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final EnquiryRepository enquiryRepository;

    @Override
    public DashboardResponse getDashboardStatistics() {

        LocalDate today = LocalDate.now(ZoneId.of("Asia/Kolkata"));
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        long totalEnquiries = enquiryRepository.count();

        long newEnquiries = enquiryRepository.countByStatus(EnquiryStatus.NEW);
        long interestedEnquiries = enquiryRepository.countByStatus(EnquiryStatus.INTERESTED);
        long hotEnquiries = enquiryRepository.countByStatus(EnquiryStatus.HOT);
        long coldEnquiries = enquiryRepository.countByStatus(EnquiryStatus.COLD);
        long notInterestedEnquiries = enquiryRepository.countByStatus(EnquiryStatus.NOT_INTERESTED);

        long todayEnquiries = enquiryRepository.countByCreatedAtBetween(startOfDay, endOfDay);

        long upcomingFollowUps = enquiryRepository.countByJoiningDateGreaterThanEqualAndStatusNot(
                today, EnquiryStatus.NOT_INTERESTED
        );

        return DashboardResponse.builder()
                .totalEnquiries(totalEnquiries)
                .newEnquiries(newEnquiries)
                .interestedEnquiries(interestedEnquiries)
                .hotEnquiries(hotEnquiries)
                .coldEnquiries(coldEnquiries)
                .notInterestedEnquiries(notInterestedEnquiries)
                .todayEnquiries(todayEnquiries)
                .upcomingFollowUps(upcomingFollowUps)
                .build();
    }
}
