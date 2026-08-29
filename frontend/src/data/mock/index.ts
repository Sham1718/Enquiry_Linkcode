import type { DashboardData, Enquiry, NotificationItem, NotificationsResponse, PagedResponse } from "../../types";

const COURSES = [
  "Java Full Stack Development",
  "Python & Data Science",
  "MERN Stack Development",
  "Cloud & DevOps",
  "Data Analytics",
  "AI & Machine Learning",
  "Cybersecurity Essentials",
  "UI/UX Design Pro",
];

const REFS = ["Google Search", "Instagram Ad", "Friend Referral", "Walk-in", "YouTube", "LinkedIn", "Newspaper", "Website"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function phone() {
  return `98${Math.floor(10000000 + Math.random() * 89999999).toString()}`;
}
function email(name: string) {
  return name.toLowerCase().replace(/\s+/g, ".") + "@gmail.com";
}
function dateOffset(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}
function futureDate(daysAhead: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

const STUDENT_NAMES = [
  "Rahul Sharma", "Aarav Verma", "Sneha Patel", "Priya Gupta", "Vikram Iyer",
  "Ananya Reddy", "Rohan Khan", "Ishaan Mehta", "Meera Joshi", "Aditya Kapoor",
  "Kavya Singh", "Arjun Rao", "Diya Nair", "Sanya Bose", "Neha Chopra",
  "Karan Bhatia", "Riya Saxena", "Tara Trivedi", "Aman Malhotra", "Pooja Das",
  "Harsh Bhatt", "Simran Kohli", "Varun Tiwari", "Tanvi Pillai", "Aisha Sood",
  "Nikhil Walia", "Sakshi Ahuja", "Dev Mathur", "Mira Bhandari", "Yash Khanna",
  "Anika Roy", "Krish Bajaj", "Ishita Lall", "Rajat Sethi", "Misha D'Souza",
  "Aryan Khurana", "Aadhya Bedi", "Veer Chawla", "Myra Dugar", "Samar Ghai",
];

function makeEnquiry(i: number): Enquiry {
  const name = STUDENT_NAMES[i % STUDENT_NAMES.length];
  const createdDaysAgo = Math.floor(Math.random() * 60);
  const statusRand = Math.random();
  let status: Enquiry["status"];
  if (statusRand < 0.30) status = "NEW";
  else if (statusRand < 0.55) status = "INTERESTED";
  else if (statusRand < 0.75) status = "HOT";
  else if (statusRand < 0.90) status = "COLD";
  else status = "NOT_INTERESTED";

  const course = COURSES[i % COURSES.length];
  const hasJoinDate = status === "HOT" || (status === "INTERESTED" && Math.random() > 0.5);

  return {
    id: (1000 + i),
    studentName: name,
    email: email(name),
    phone: phone(),
    courseInterested: course,
    reference: rand(REFS),
    status,
    joiningDate: hasJoinDate ? futureDate(Math.floor(Math.random() * 30) + 2) : null,
    createdAt: dateOffset(createdDaysAgo),
  };
}

export const MOCK_ENQUIRIES: Enquiry[] = Array.from({ length: 86 }, (_, i) => makeEnquiry(i))
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export function buildMockDashboard(): DashboardData {
  const today = new Date().toISOString().slice(0, 10);
  return {
    totalEnquiries: MOCK_ENQUIRIES.length,
    newEnquiries: MOCK_ENQUIRIES.filter(e => e.status === "NEW").length,
    interestedEnquiries: MOCK_ENQUIRIES.filter(e => e.status === "INTERESTED").length,
    hotEnquiries: MOCK_ENQUIRIES.filter(e => e.status === "HOT").length,
    coldEnquiries: MOCK_ENQUIRIES.filter(e => e.status === "COLD").length,
    notInterestedEnquiries: MOCK_ENQUIRIES.filter(e => e.status === "NOT_INTERESTED").length,
    todayEnquiries: MOCK_ENQUIRIES.filter(e => e.createdAt.slice(0, 10) === today).length,
    upcomingFollowUps: MOCK_ENQUIRIES.filter(e => e.joiningDate && e.joiningDate >= today && e.status !== "NOT_INTERESTED").length,
  };
}

export function buildMockEnquiriesPage(params: {
  page?: number; size?: number; status?: string; search?: string; course?: string;
}): PagedResponse<Enquiry> {
  const page = Math.max(0, (params.page ?? 0));
  const size = params.size ?? 10;
  let list = [...MOCK_ENQUIRIES];
  if (params.status && params.status !== "ALL") list = list.filter(e => e.status === params.status);
  if (params.course && params.course !== "ALL") list = list.filter(e => e.courseInterested === params.course);
  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(e =>
      e.studentName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q)
    );
  }
  const totalElements = list.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const content = list.slice(page * size, page * size + size);
  return {
    content,
    page,
    size,
    totalElements,
    totalPages,
    first: page === 0,
    last: page >= totalPages - 1,
  };
}

export function buildMockNotifications(): NotificationsResponse {
  const items: NotificationItem[] = [
    {
      id: 1,
      enquiryId: MOCK_ENQUIRIES[0].id,
      studentName: MOCK_ENQUIRIES[0].studentName,
      courseInterested: MOCK_ENQUIRIES[0].courseInterested,
      message: `${MOCK_ENQUIRIES[0].studentName} is expected to join today.`,
      isRead: false,
      type: "JOINING_REMINDER",
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
      id: 2,
      enquiryId: MOCK_ENQUIRIES[1].id,
      studentName: MOCK_ENQUIRIES[1].studentName,
      courseInterested: MOCK_ENQUIRIES[1].courseInterested,
      message: `Follow-up call scheduled with ${MOCK_ENQUIRIES[1].studentName}.`,
      isRead: false,
      type: "FOLLOW_UP",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: 3,
      enquiryId: MOCK_ENQUIRIES[2].id,
      studentName: MOCK_ENQUIRIES[2].studentName,
      courseInterested: MOCK_ENQUIRIES[2].courseInterested,
      message: `Joining date confirmed for ${MOCK_ENQUIRIES[2].studentName}.`,
      isRead: false,
      type: "JOINING_CONFIRMATION",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    },
    {
      id: 4,
      enquiryId: MOCK_ENQUIRIES[3].id,
      studentName: MOCK_ENQUIRIES[3].studentName,
      courseInterested: MOCK_ENQUIRIES[3].courseInterested,
      message: `New enquiry received from ${MOCK_ENQUIRIES[3].studentName}.`,
      isRead: true,
      type: "NEW_ENQUIRY",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: 5,
      enquiryId: MOCK_ENQUIRIES[4].id,
      studentName: MOCK_ENQUIRIES[4].studentName,
      courseInterested: MOCK_ENQUIRIES[4].courseInterested,
      message: `${MOCK_ENQUIRIES[4].studentName} requested fee details.`,
      isRead: true,
      type: "GENERAL",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    },
  ];
  return { unreadCount: items.filter(i => !i.isRead).length, notifications: items };
}
