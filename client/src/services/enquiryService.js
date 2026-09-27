const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export async function submitEnquiry(enquiry) {
  const response = await fetch(`${apiBaseUrl}/api/v1/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(enquiry),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "Unable to submit your enquiry. Please try again.");
  }

  return result?.data;
}