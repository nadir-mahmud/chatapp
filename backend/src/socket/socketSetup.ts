import type { Server } from "socket.io";

interface Message {
  message: string;
  to: string;
  from: string;
}
export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`User Joined: ${socket.id}`);
    socket.join("penguin"); // Join a default room

    // Example: Chat Message
    socket.on("admin", (data: Message) => {
      console.log(typeof data);
      console.log(`Message from ${socket.id}: ${data.from}`);

      io.to("penguin").emit(data.to, data);
    });

    // socket.on("disconnect", () => {
    //   console.log("User Disconnected", socket.id);
    // });
  });
};
