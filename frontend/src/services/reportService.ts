import { dashboardService } from "./dashboardService";
import { enquiryService } from "./enquiry.service";
import type { DashboardData, Enquiry } from "../types";

export const reportService = {
  async overview(): Promise<{ dashboard: DashboardData; recent: Enquiry[] }> {
    const [dashboard, recent] = await Promise.all([
      dashboardService.getDashboard(),
      enquiryService.getEnquiries({ page: 0, size: 5 }),
    ]);
    return { dashboard, recent: recent.content };
  },
};

export default reportService;
