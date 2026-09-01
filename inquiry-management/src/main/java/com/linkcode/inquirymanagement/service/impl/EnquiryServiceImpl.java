package com.linkcode.inquirymanagement.service.impl;

import com.linkcode.inquirymanagement.dto.request.CreateEnquiryRequest;
import com.linkcode.inquirymanagement.dto.request.UpdateEnquiryRequest;
import com.linkcode.inquirymanagement.dto.response.CreateEnquiryResponse;
import com.linkcode.inquirymanagement.dto.response.EnquiryListResponse;
import com.linkcode.inquirymanagement.dto.response.PagedResponse;
import com.linkcode.inquirymanagement.entity.Enquiry;
import com.linkcode.inquirymanagement.entity.Notification;
import com.linkcode.inquirymanagement.enums.EnquiryStatus;
import com.linkcode.inquirymanagement.enums.NotificationType;
import com.linkcode.inquirymanagement.exception.EnquiryNotFoundException;
import com.linkcode.inquirymanagement.repository.EnquiryRepository;
import com.linkcode.inquirymanagement.repository.NotificationRepository;
import com.linkcode.inquirymanagement.service.EnquiryService;
import com.linkcode.inquirymanagement.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnquiryServiceImpl implements EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    @Override
    public CreateEnquiryResponse createEnquiry(CreateEnquiryRequest request) {

        Enquiry enquiry = Enquiry.builder()
                .studentName(request.getStudentName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .courseInterested(request.getCourseInterested())
                .reference(request.getReference())
                .status(EnquiryStatus.NEW)
                .build();

        Enquiry savedEnquiry = enquiryRepository.save(enquiry);

        try {
            emailService.sendStudentEnquiryConfirmation(
                    savedEnquiry.getStudentName(),
                    savedEnquiry.getEmail(),
                    savedEnquiry.getCourseInterested()
            );

            emailService.sendAdminNewEnquiryNotification(
                    savedEnquiry.getStudentName(),
                    savedEnquiry.getEmail(),
                    savedEnquiry.getPhone(),
                    savedEnquiry.getCourseInterested(),
                    savedEnquiry.getId()
            );
        } catch (Exception e) {
            log.error("Error sending emails for enquiry ID {}: {}", savedEnquiry.getId(), e.getMessage());
        }

        return CreateEnquiryResponse.builder()
                .enquiryId(savedEnquiry.getId())
                .studentName(savedEnquiry.getStudentName())
                .status(savedEnquiry.getStatus())
                .createdAt(savedEnquiry.getCreatedAt())
                .build();
    }

    @Override
    public PagedResponse<EnquiryListResponse> getEnquiries(
            int page,
            int size,
            EnquiryStatus status,
            String search
    ) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        boolean hasSearch = search != null && !search.isBlank();
        String searchValue = hasSearch ? search.trim() : null;

        Page<Enquiry> enquiryPage;

        if (status == null && !hasSearch) {
            enquiryPage = enquiryRepository.findAll(pageable);
        } else if (status != null && !hasSearch) {
            enquiryPage = enquiryRepository.findByStatus(status, pageable);
        } else if (status == null) {
            enquiryPage = enquiryRepository.findByStudentNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContaining(
                    searchValue, searchValue, searchValue, pageable
            );
        } else {
            enquiryPage = enquiryRepository.findByStatusAndStudentNameContainingIgnoreCaseOrStatusAndEmailContainingIgnoreCaseOrStatusAndPhoneContaining(
                    status, searchValue, status, searchValue, status, searchValue, pageable
            );
        }

        List<EnquiryListResponse> content = enquiryPage.getContent().stream()
                .map(enquiry -> EnquiryListResponse.builder()
                        .id(enquiry.getId())
                        .studentName(enquiry.getStudentName())
                        .email(enquiry.getEmail())
                        .phone(enquiry.getPhone())
                        .courseInterested(enquiry.getCourseInterested())
                        .reference(enquiry.getReference())
                        .status(enquiry.getStatus())
                        .joiningDate(enquiry.getJoiningDate())
                        .createdAt(enquiry.getCreatedAt())
                        .build()
                )
                .toList();

        PagedResponse<EnquiryListResponse> pagedResponse = new PagedResponse<>();
        pagedResponse.setContent(content);
        pagedResponse.setPage(enquiryPage.getNumber());
        pagedResponse.setSize(enquiryPage.getSize());
        pagedResponse.setTotalElements(enquiryPage.getTotalElements());
        pagedResponse.setTotalPages(enquiryPage.getTotalPages());
        pagedResponse.setFirst(enquiryPage.isFirst());
        pagedResponse.setLast(enquiryPage.isLast());

        return pagedResponse;
    }

    @Override
    public EnquiryListResponse updateEnquiry(Long id, UpdateEnquiryRequest request) {

        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new EnquiryNotFoundException(id));

        EnquiryStatus oldStatus = enquiry.getStatus();

        if (request.getStatus() != null) {
            enquiry.setStatus(request.getStatus());
        }

        if (request.getJoiningDate() != null) {
            enquiry.setJoiningDate(request.getJoiningDate());
        }

        Enquiry updatedEnquiry = enquiryRepository.save(enquiry);

        if (request.getStatus() != null && oldStatus != request.getStatus()) {
            EnquiryStatus newStatus = request.getStatus();
            if (newStatus == EnquiryStatus.INTERESTED
                    || newStatus == EnquiryStatus.HOT
                    || newStatus == EnquiryStatus.COLD) {
                Notification notification = Notification.builder()
                        .enquiry(updatedEnquiry)
                        .type(NotificationType.STATUS_CHANGED)
                        .message(updatedEnquiry.getStudentName() + " is now " + newStatus.name())
                        .isRead(false)
                        .build();
                notificationRepository.save(notification);
                log.info("Created STATUS_CHANGED notification for enquiry ID: {} ({} -> {})",
                        updatedEnquiry.getId(), oldStatus, newStatus);
            }
        }

        return EnquiryListResponse.builder()
                .id(updatedEnquiry.getId())
                .studentName(updatedEnquiry.getStudentName())
                .email(updatedEnquiry.getEmail())
                .phone(updatedEnquiry.getPhone())
                .courseInterested(updatedEnquiry.getCourseInterested())
                .reference(updatedEnquiry.getReference())
                .status(updatedEnquiry.getStatus())
                .joiningDate(updatedEnquiry.getJoiningDate())
                .createdAt(updatedEnquiry.getCreatedAt())
                .build();
    }

    @Override
    public EnquiryListResponse getEnquiryById(Long id) {

        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new EnquiryNotFoundException(id));

        return EnquiryListResponse.builder()
                .id(enquiry.getId())
                .studentName(enquiry.getStudentName())
                .email(enquiry.getEmail())
                .phone(enquiry.getPhone())
                .courseInterested(enquiry.getCourseInterested())
                .reference(enquiry.getReference())
                .status(enquiry.getStatus())
                .joiningDate(enquiry.getJoiningDate())
                .createdAt(enquiry.getCreatedAt())
                .build();
    }

    @Override
    public byte[] exportEnquiriesToExcel(EnquiryStatus status, String search) {

        boolean hasSearch = search != null && !search.isBlank();
        String searchValue = hasSearch ? search.trim() : null;

        List<Enquiry> enquiries;

        if (status == null && !hasSearch) {
            enquiries = enquiryRepository.findAll();
        } else if (status != null && !hasSearch) {
            enquiries = enquiryRepository.findByStatus(status);
        } else if (status == null) {
            enquiries = enquiryRepository.findByStudentNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContaining(
                    searchValue, searchValue, searchValue
            );
        } else {
            enquiries = enquiryRepository.findByStatusAndStudentNameContainingIgnoreCaseOrStatusAndEmailContainingIgnoreCaseOrStatusAndPhoneContaining(
                    status, searchValue, status, searchValue, status, searchValue
            );
        }

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Enquiries");

            // ── Header style ──
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // ── Header row ──
            String[] headers = {
                    "ID", "Student Name", "Email", "Phone",
                    "Course Interested", "Reference", "Status", "Joining Date",
                    "Created At", "Updated At"
            };

            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // ── Data rows ──
            int rowNum = 1;
            for (Enquiry enquiry : enquiries) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(enquiry.getId());
                row.createCell(1).setCellValue(enquiry.getStudentName());
                row.createCell(2).setCellValue(enquiry.getEmail());
                row.createCell(3).setCellValue(enquiry.getPhone());
                row.createCell(4).setCellValue(enquiry.getCourseInterested());
                row.createCell(5).setCellValue(enquiry.getReference() != null ? enquiry.getReference() : "");
                row.createCell(6).setCellValue(enquiry.getStatus().name());

                if (enquiry.getJoiningDate() != null) {
                    row.createCell(7).setCellValue(enquiry.getJoiningDate().format(dateFormatter));
                }

                if (enquiry.getCreatedAt() != null) {
                    row.createCell(8).setCellValue(enquiry.getCreatedAt().format(dateTimeFormatter));
                }

                if (enquiry.getUpdatedAt() != null) {
                    row.createCell(9).setCellValue(enquiry.getUpdatedAt().format(dateTimeFormatter));
                }
            }

            // ── Auto-size columns ──
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(outputStream);
            return outputStream.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException("Failed to generate Excel export", e);
        }
    }
}
