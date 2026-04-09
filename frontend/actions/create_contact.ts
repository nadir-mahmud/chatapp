"use server";
import { revalidatePath } from "next/cache";

const API_URL = process.env.BACKEND_URL || "http://localhost:8080";

export async function createContact(userId: string, contactId: string) {
  // Use native fetch for Next.js caching & revalidation benefits
  const res = await fetch(`${API_URL}/api/contact/create_contact`, {
    method: "PUT", // Specify the method
    headers: {
      "Content-Type": "application/json", // Crucial for your backend to parse the body
    },
    body: JSON.stringify({
      participants: [userId, contactId], // Data goes inside the body
    }),
  });

  if (!res.ok) {
    // In production, we don't just log; we throw for the Error Boundary to catch
    throw new Error(`Failed to fetch contacts: ${res.statusText}`);
  }
  revalidatePath("/message_dashboard");
  return res.json();
}
