const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const submitEnquiry = async (payload) => {
  const requestPayload = {
    studentName: payload.studentName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.replace(/\D/g, ""),
    courseInterested: payload.courseInterested || payload.course || "",
    reference: payload.reference,
  };

  const response = await fetch(
    `${API_BASE_URL}/api/v1/enquiries`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestPayload),
    }
  );

  let responseData;

  try {
    responseData = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      responseData?.message ||
        responseData?.error ||
        "Something went wrong. Please try again."
    );
  }
  const data =
    responseData &&
    typeof responseData === "object" &&
    "success" in responseData &&
    "data" in responseData
      ? responseData.data
      : responseData;

  return {
    id: data.enquiryId,
    receivedAt:
      data.createdAt || new Date().toISOString(),

    payload: {
      studentName: requestPayload.studentName,
      email: requestPayload.email,
      phone: requestPayload.phone,
      course: requestPayload.courseInterested,
      courseInterested:
        requestPayload.courseInterested,
      reference: requestPayload.reference,
    },
  };
};
