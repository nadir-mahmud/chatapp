"use server";
import { cookies } from "next/headers";
import axios from "axios";
import MessageDashboard from "@/features/messaging/message_dashboard";
import { getContacts } from "@/actions/get_contacts";

export default async function MessagePage() {
  const { contacts } = await getContacts();

  return <MessageDashboard contacts={contacts} />;
}
