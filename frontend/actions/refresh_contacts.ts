"use server";
import { revalidateTag } from "next/cache";

export async function refreshContacts() {
  revalidateTag("contacts", "default");
}
