package com.linkcode.inquirymanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class InquiryManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(InquiryManagementApplication.class, args);
	}

}
