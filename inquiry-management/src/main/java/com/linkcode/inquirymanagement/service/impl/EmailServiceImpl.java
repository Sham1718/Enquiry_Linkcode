package com.linkcode.inquirymanagement.service.impl;

import com.linkcode.inquirymanagement.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Override
    public void sendStudentEnquiryConfirmation(
            String studentName,
            String studentEmail,
            String courseInterested
    ) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(studentEmail);
            message.setSubject("Enquiry Received - LinkCode Technologies");
            message.setText(
                    "Hello " + studentName + ",\n\n"
                    + "Thank you for your enquiry with LinkCode Technologies.\n\n"
                    + "We have successfully received your enquiry for:\n"
                    + courseInterested + "\n\n"
                    + "Our team will review your enquiry and contact you soon.\n\n"
                    + "Thank you,\n"
                    + "LinkCode Technologies"
            );

            mailSender.send(message);
            log.info("Student confirmation email sent successfully to: {}", studentEmail);

        } catch (MailException e) {
            log.error("Failed to send student confirmation email to: {}. Error: {}",
                    studentEmail, e.getMessage());
        }
    }

    @Override
    public void sendAdminNewEnquiryNotification(
            String studentName,
            String studentEmail,
            String phone,
            String courseInterested,
            Long enquiryId
    ) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(adminEmail);
            message.setSubject("New Student Enquiry Received");
            message.setText(
                    "A new student enquiry has been received.\n\n"
                    + "Enquiry ID: " + enquiryId + "\n"
                    + "Student Name: " + studentName + "\n"
                    + "Email: " + studentEmail + "\n"
                    + "Phone: " + phone + "\n"
                    + "Course Interested: " + courseInterested + "\n\n"
                    + "Please log in to the Inquiry Management application to review and follow up with this lead."
            );

            mailSender.send(message);
            log.info("Admin notification email sent successfully for enquiry ID: {}", enquiryId);

        } catch (MailException e) {
            log.error("Failed to send admin notification email for enquiry ID: {}. Error: {}",
                    enquiryId, e.getMessage());
        }
    }
}
