// app/actions.ts
"use server";

export async function searchContacts(query: string) {
  // 1. Validate the user session (Security)
  // const session = await getSession();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const body = emailRegex.test(query) ? { email: query } : { name: query };
  // 2. Perform the actual Database or API call
  // Using POST logic here
  const response = await fetch("http://localhost:3000/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("Failed to fetch contacts");

  return response.json();
}
