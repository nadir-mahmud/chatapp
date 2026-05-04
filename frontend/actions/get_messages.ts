"use server";
const API_URL = process.env.BACKEND_URL || "http://localhost:8080";

export async function getMessages(contactId: string) {
  // Use native fetch for Next.js caching & revalidation benefits

  const res = await fetch(`${API_URL}/api/message/get_messages/${contactId}`, {
    method: "GET", // Specify the method
    headers: {
      "Content-Type": "application/json", // Crucial for your backend to parse the body
    },
  });

  if (!res.ok) {
    // In production, we don't just log; we throw for the Error Boundary to catch
    throw new Error(`Failed to fetch contacts: ${res.statusText}`);
  }
  const data = await res.json();

  return data;
}
