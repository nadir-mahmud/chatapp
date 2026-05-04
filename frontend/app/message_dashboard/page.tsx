"use server";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import MessageDashboard from "@/features/messaging/message_dashboard";
import { getContacts } from "@/actions/get_contacts";
import { getMessages } from "@/actions/get_messages";

interface JwtUserPayload {
  userId: string;
  name: string;
}

export default async function MessagePage() {
  const { contacts } = await getContacts();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const dycrypt = Jwt.verify(
    token!,
    process.env.JWT_SECRET_KEY as string,
  ) as JwtUserPayload;

  const { messages } = await getMessages(contacts[0]._id);
  //console.log(messages, "found");

  return (
    <MessageDashboard
      contacts={contacts}
      user={dycrypt}
      initialMessages={messages}
    />
  );
}
