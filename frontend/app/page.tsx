"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  message: string;
  to: string;
  from: string;
}
export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(
      "https://chatapp-backend-production-58bf.up.railway.app/",
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      //join user room
      socket.emit("join", {
        userId: "nadirmahmud5@gmail.com",
      });
    });

    socket.on("nadirmahmud5@gmail.com", (data: Message) => {
      console.log("Received:", data);
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socketRef.current?.emit("admin", {
      message: "Hello penguin!",
      to: "penguin",
      from: "nadirmahmud5@gmail.com",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </p>
      <Link href="sms:+8801716496606">call</Link>
      <h1 className="text-4xl font-bold">Welcome to the Penguin App!</h1>
      <p className="mt-4 text-lg">This is the frontend of your application.</p>
      <button
        onClick={sendMessage}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
    </main>
  );
}
