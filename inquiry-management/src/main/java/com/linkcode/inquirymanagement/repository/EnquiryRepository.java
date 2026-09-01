package com.linkcode.inquirymanagement.repository;

import com.linkcode.inquirymanagement.entity.Enquiry;
import com.linkcode.inquirymanagement.enums.EnquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    Page<Enquiry> findByStatus(EnquiryStatus status, Pageable pageable);

    Page<Enquiry> findByStudentNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContaining(
            String studentName,
            String email,
            String phone,
            Pageable pageable
    );

    Page<Enquiry> findByStatusAndStudentNameContainingIgnoreCaseOrStatusAndEmailContainingIgnoreCaseOrStatusAndPhoneContaining(
            EnquiryStatus status1,
            String studentName,
            EnquiryStatus status2,
            String email,
            EnquiryStatus status3,
            String phone,
            Pageable pageable
    );

    long countByStatus(EnquiryStatus status);

    List<Enquiry> findByJoiningDate(LocalDate joiningDate);

    List<Enquiry> findByStatus(EnquiryStatus status);

    List<Enquiry> findByStudentNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContaining(
            String studentName,
            String email,
            String phone
    );

    List<Enquiry> findByStatusAndStudentNameContainingIgnoreCaseOrStatusAndEmailContainingIgnoreCaseOrStatusAndPhoneContaining(
            EnquiryStatus status1,
            String studentName,
            EnquiryStatus status2,
            String email,
            EnquiryStatus status3,
            String phone
    );

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    long countByJoiningDateGreaterThanEqualAndStatusNot(LocalDate joiningDate, EnquiryStatus status);

    List<Enquiry> findByCreatedAtAfterAndStatusNot(LocalDateTime createdAt, EnquiryStatus status);
}
