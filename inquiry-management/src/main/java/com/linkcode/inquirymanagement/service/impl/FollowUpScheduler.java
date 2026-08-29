package com.linkcode.inquirymanagement.service.impl;

import com.linkcode.inquirymanagement.entity.Enquiry;
import com.linkcode.inquirymanagement.entity.Notification;
import com.linkcode.inquirymanagement.enums.EnquiryStatus;
import com.linkcode.inquirymanagement.enums.NotificationType;
import com.linkcode.inquirymanagement.repository.EnquiryRepository;
import com.linkcode.inquirymanagement.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;

@Slf4j
@Component
@RequiredArgsConstructor
public class FollowUpScheduler {

    private final EnquiryRepository enquiryRepository;
    private final NotificationRepository notificationRepository;

    @Scheduled(cron = "0 0 9 * * *", zone = "Asia/Kolkata")
    public void createFollowUpNotifications() {
        runFollowUpCheck();
    }

    public void runFollowUpCheck() {

        LocalDate today = LocalDate.now(ZoneId.of("Asia/Kolkata"));
        log.info("Running follow-up check for date: {}", today);

        var enquiries = enquiryRepository.findByJoiningDate(today);
        log.info("Found {} enquiries with joining date: {}", enquiries.size(), today);

        for (Enquiry enquiry : enquiries) {
            try {
                if (enquiry.getStatus() == EnquiryStatus.NOT_INTERESTED) {
                    log.info("Skipping enquiry ID {} — status is NOT_INTERESTED", enquiry.getId());
                    continue;
                }

                if (notificationRepository.existsByEnquiryIdAndType(enquiry.getId(), NotificationType.FOLLOW_UP)) {
                    log.info("Skipping enquiry ID {} — FOLLOW_UP notification already exists", enquiry.getId());
                    continue;
                }

                Notification notification = Notification.builder()
                        .enquiry(enquiry)
                        .type(NotificationType.FOLLOW_UP)
                        .message("Follow up this lead.")
                        .isRead(false)
                        .build();

                notificationRepository.save(notification);
                log.info("Created FOLLOW_UP notification for enquiry ID: {}", enquiry.getId());

            } catch (Exception e) {
                log.error("Error processing enquiry ID {}: {}", enquiry.getId(), e.getMessage());
            }
        }

        log.info("Follow-up check completed for date: {}", today);
    }
}
