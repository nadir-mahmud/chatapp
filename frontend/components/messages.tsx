"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Contact } from "@/types/Contact";
import { useContact } from "@/hooks/useContacts";
import { useMessages } from "@/hooks/useMessages";
import { type Message } from "@/types/Message";

interface ContactProps {
  contacts: Contact[];
  user: { userId: string; name: string };
}

interface SocketMessage {
  message: string;
  to: string;
  from: string;
  senderName: string;
}

export function Message({ contacts, user }: ContactProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const contact = useContact((state) => state.contact);
  const zustandStoreMessages = useMessages((state) => state.messages);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      //join user room
      socket.emit("join", {
        userId: "nadirmahmud5@gmail.com",
      });
    });

    socket.on(user.userId, (data: SocketMessage) => {
      console.log("Received:", data);
      //setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setMessages(zustandStoreMessages);
  }, [zustandStoreMessages]);

  const sendMessage = () => {
    console.log("id available", contact.participants[0]?._id);
    socketRef.current?.emit("admin", {
      message: message,
      to: contact.participants[0]?._id,
      from: user.userId,
      senderName: user.name,
    });
    // setMessages((prev) => [...prev, message]);
  };
  return (
    <>
      <div className="flex-1 bg-[url('/bg.jpg')] backdrop-blur-sm bg-cover bg-center bg-no-repeat">
        <div className="w-full h-[calc(100vh-128px)] overflow-y-auto">
          <ul>
            {messages.map((message) => (
              <li className="p-4 border-style:none cursor-pointer rounded-xl m-4  hover:bg-gray-200 dark:hover:bg-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full">
                    <img src="/user.png" alt="user" />
                  </div>
                  <div>
                    <p className="font-semibold">{`anonymous`}</p>
                    <p className="text-sm text-gray-500">
                      {message.text || "No messages yet"}
                    </p>
                  </div>
                </div>
              </li>
            ))}

            {/* More contacts... */}
          </ul>
        </div>
      </div>
      <div className="p-4 items-center">
        <div className="w-full flex flex-row">
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="flex-11 w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="flex-1 ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
