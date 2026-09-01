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

import java.time.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class FollowUpScheduler {

    private static final ZoneId ZONE = ZoneId.of("Asia/Kolkata");

    private final EnquiryRepository enquiryRepository;
    private final NotificationRepository notificationRepository;

    // ────────────────────────────────────────────────
    // 30-second scheduler — registration notification
    // ────────────────────────────────────────────────

    @Scheduled(fixedDelay = 30000)
    public void checkNewEnquiries() {
        try {
            LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
            // Safe window: last 5 minutes to cover scheduler delays
            LocalDateTime windowStart = now.minusMinutes(5);

            var enquiries = enquiryRepository.findByCreatedAtAfterAndStatusNot(
                    windowStart, EnquiryStatus.NOT_INTERESTED
            );

            log.debug("Registration check — {} candidate enquiries since {}", enquiries.size(), windowStart);

            for (Enquiry enquiry : enquiries) {
                try {
                    // Check if a registration FOLLOW_UP was already created in the same window
                    boolean alreadyCreated = notificationRepository
                            .existsByEnquiryIdAndTypeAndCreatedAtBetween(
                                    enquiry.getId(),
                                    NotificationType.FOLLOW_UP,
                                    windowStart,
                                    now
                            );

                    if (alreadyCreated) {
                        log.debug("Skipping enquiry ID {} — registration FOLLOW_UP already exists", enquiry.getId());
                        continue;
                    }

                    Notification notification = Notification.builder()
                            .enquiry(enquiry)
                            .type(NotificationType.FOLLOW_UP)
                            .message("Follow up this lead.")
                            .isRead(false)
                            .build();

                    notificationRepository.save(notification);
                    log.info("Created registration FOLLOW_UP notification for enquiry ID: {}", enquiry.getId());

                } catch (Exception e) {
                    log.error("Error processing registration notification for enquiry ID {}: {}",
                            enquiry.getId(), e.getMessage());
                }
            }
        } catch (Exception e) {
            log.error("Error in registration notification check: {}", e.getMessage());
        }
    }

    // ────────────────────────────────────────────────
    // 9:00 AM daily cron — joining-date & null-joining-date
    // ────────────────────────────────────────────────

    @Scheduled(cron = "0 * * * * *", zone = "Asia/Kolkata")
    public void createDailyFollowUpNotifications() {
        try {
            LocalDate today = LocalDate.now(ZONE);
            LocalDateTime dayStart = today.atStartOfDay(ZONE).toLocalDateTime();
            LocalDateTime dayEnd = today.atTime(LocalTime.MAX);

            log.info("Running daily follow-up notification check for date: {}", today);

            // 1. Enquiries with joiningDate == today
            processJoiningDateEnquiries(today, dayStart, dayEnd);

            // 2. Enquiries with joiningDate == null
            processNullJoiningDateEnquiries(dayStart, dayEnd);

            log.info("Daily follow-up check completed for date: {}", today);
        } catch (Exception e) {
            log.error("Error in daily follow-up notification check: {}", e.getMessage());
        }
    }

    private void processJoiningDateEnquiries(LocalDate today, LocalDateTime dayStart, LocalDateTime dayEnd) {
        var enquiries = enquiryRepository.findByJoiningDate(today);
        log.debug("Found {} enquiries with joining date: {}", enquiries.size(), today);

        for (Enquiry enquiry : enquiries) {
            try {
                if (enquiry.getStatus() == EnquiryStatus.NOT_INTERESTED) {
                    log.debug("Skipping enquiry ID {} — NOT_INTERESTED", enquiry.getId());
                    continue;
                }

                boolean alreadyCreated = notificationRepository
                        .existsByEnquiryIdAndTypeAndCreatedAtBetween(
                                enquiry.getId(),
                                NotificationType.FOLLOW_UP,
                                dayStart,
                                dayEnd
                        );

                if (alreadyCreated) {
                    log.debug("Skipping enquiry ID {} — joining-date FOLLOW_UP already exists for today",
                            enquiry.getId());
                    continue;
                }

                Notification notification = Notification.builder()
                        .enquiry(enquiry)
                        .type(NotificationType.FOLLOW_UP)
                        .message("Follow up this lead.")
                        .isRead(false)
                        .build();

                notificationRepository.save(notification);
                log.info("Created joining-date FOLLOW_UP notification for enquiry ID: {}", enquiry.getId());

            } catch (Exception e) {
                log.error("Error processing joining-date notification for enquiry ID {}: {}",
                        enquiry.getId(), e.getMessage());
            }
        }
    }

    private void processNullJoiningDateEnquiries(LocalDateTime dayStart, LocalDateTime dayEnd) {
        // Find enquiries with no joining date, excluding NOT_INTERESTED
        // Spring Data doesn't support "joiningDate is null AND status != ..." directly,
        // so we fetch active statuses and filter in-memory. Acceptable for moderate data volumes.
        var allStatuses = new java.util.ArrayList<Enquiry>();
        allStatuses.addAll(enquiryRepository.findByStatus(EnquiryStatus.NEW));
        allStatuses.addAll(enquiryRepository.findByStatus(EnquiryStatus.INTERESTED));
        allStatuses.addAll(enquiryRepository.findByStatus(EnquiryStatus.HOT));
        allStatuses.addAll(enquiryRepository.findByStatus(EnquiryStatus.COLD));

        log.debug("Null-joining-date check — {} candidate enquiries across active statuses", allStatuses.size());

        for (Enquiry enquiry : allStatuses) {
            try {
                if (enquiry.getJoiningDate() != null) {
                    continue; // handled by processJoiningDateEnquiries
                }

                boolean alreadyCreated = notificationRepository
                        .existsByEnquiryIdAndTypeAndCreatedAtBetween(
                                enquiry.getId(),
                                NotificationType.FOLLOW_UP,
                                dayStart,
                                dayEnd
                        );

                if (alreadyCreated) {
                    log.debug("Skipping enquiry ID {} — daily FOLLOW_UP already exists for today",
                            enquiry.getId());
                    continue;
                }

                Notification notification = Notification.builder()
                        .enquiry(enquiry)
                        .type(NotificationType.FOLLOW_UP)
                        .message("Follow up this lead.")
                        .isRead(false)
                        .build();

                notificationRepository.save(notification);
                log.info("Created daily FOLLOW_UP notification for enquiry ID: {} (null joining date)",
                        enquiry.getId());

            } catch (Exception e) {
                log.error("Error processing daily notification for enquiry ID {}: {}",
                        enquiry.getId(), e.getMessage());
            }
        }
    }
}
