package com.linkcode.inquirymanagement.service;

public interface EmailService {

    void sendStudentEnquiryConfirmation(
            String studentName,
            String studentEmail,
            String courseInterested
    );

    void sendAdminNewEnquiryNotification(
            String studentName,
            String studentEmail,
            String phone,
            String courseInterested,
            Long enquiryId
    );
}
