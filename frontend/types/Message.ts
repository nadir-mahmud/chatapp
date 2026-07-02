type messageStatus = "sending" | "sent" | "delivered" | "seen";
export interface Message {
  contactId: string | null;
  sender: string;
  receiver: string | null;
  status?: messageStatus;
  text: string;
  readBy?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
