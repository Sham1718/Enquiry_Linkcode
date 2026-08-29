package com.linkcode.inquirymanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private long totalEnquiries;
    private long newEnquiries;
    private long interestedEnquiries;
    private long hotEnquiries;
    private long coldEnquiries;
    private long notInterestedEnquiries;
    private long todayEnquiries;
    private long upcomingFollowUps;
}
