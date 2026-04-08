"use server";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import MessageDashboard from "@/features/messaging/message_dashboard";
import { getContacts } from "@/actions/get_contacts";

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

  return <MessageDashboard contacts={contacts} user={dycrypt} />;
}
