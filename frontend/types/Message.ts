type messageStatus = "sent" | "delivered" | "seen";
export interface Message {
  contactId: string;
  sender: string;
  receiver: string;
  status?: messageStatus;
  text: string;
  readBy?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
