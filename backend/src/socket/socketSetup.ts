import type { Server } from "socket.io";

import { Message } from "../models/message.js";
import { Contact } from "../models/contact.js";

type messageStatus = "sent" | "delivered" | "seen";
interface SocketMessage {
  contactId: string;
  sender: string;
  receiver: string;
  text: string;
  readBy?: string[];
  status?: messageStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("join_room", (roomId) => {
      // socket.rooms is a Set of rooms the user is currently in
      // It's good practice to leave old rooms so they don't get "double messages"
      // socket.rooms.forEach((r) => {
      //   if (r !== room.roomId) socket.leave(room);
      // });

      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Example: Chat Message
    socket.on("admin", async (data: SocketMessage) => {
      console.log(data.text);
      console.log(data);
      console.log(`Message from ${socket.id}: ${data.receiver}`);
      try {
        const newMessage = await new Message(data).save();
        await Contact.findByIdAndUpdate(
          { _id: data.contactId },
          { lastMessage: data.text },
        );

        console.log(newMessage);
        console.log("📂 Database Name:", Message.db.name);
        console.log("📑 Collection Name:", Message.collection.name);
      } catch (error) {
        console.log(error);
      }

      io.to(data.contactId).emit(data.receiver, data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};
