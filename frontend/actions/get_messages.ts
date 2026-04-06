import { cookies } from "next/headers";
export interface Contact {
  _id: string;
  participants: [
    {
      name: string;
      _id: string;
    },
  ];
  lastMessage: {
    _id: string;
    text: string;
    createdAt: string;
  };
  updatedAt: string;
  createdAt: string;
}
interface ContactResponse {
  success: boolean;
  contacts: Contact[];
  nextCursor: Date | null;
  hasMore: boolean;
}

const API_URL = process.env.BACKEND_URL || "http://localhost:8080";

export async function getContacts() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Use native fetch for Next.js caching & revalidation benefits
  const res = await fetch(`${API_URL}/api/message/get_messages`);

  if (!res.ok) {
    // In production, we don't just log; we throw for the Error Boundary to catch
    throw new Error(`Failed to fetch contacts: ${res.statusText}`);
  }

  return res.json();
}
