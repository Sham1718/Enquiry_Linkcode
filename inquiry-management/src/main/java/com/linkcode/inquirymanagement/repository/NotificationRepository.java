package com.linkcode.inquirymanagement.repository;

import com.linkcode.inquirymanagement.entity.Notification;
import com.linkcode.inquirymanagement.enums.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByIsReadFalseOrderByCreatedAtDesc();

    List<Notification> findAllByOrderByCreatedAtDesc();

    long countByIsReadFalse();

    boolean existsByEnquiryIdAndType(Long enquiryId, NotificationType type);

    boolean existsByEnquiryIdAndTypeAndCreatedAtBetween(
            Long enquiryId,
            NotificationType type,
            LocalDateTime start,
            LocalDateTime end
    );
}
