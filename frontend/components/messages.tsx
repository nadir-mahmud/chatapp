"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Contact } from "@/types/Contact";
import { useContact } from "@/hooks/useSingleContact";
import { useMessages } from "@/hooks/useMessages";
import { Message } from "@/types/Message";
import { refreshContacts } from "@/actions/refresh_contacts";
import { getContacts } from "@/actions/get_contacts";
import { useAllContacts } from "@/hooks/useAllContacts";

interface ContactProps {
  contacts: Contact[];
  user: { userId: string; name: string };
  initialMessages: Message[];
}

export function MessageContainer({
  contacts,
  user,
  initialMessages,
}: ContactProps) {
  //console.log(initialMessages, "Message");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const socketRef = useRef<Socket | null>(null);
  const contact = useContact((state) => state.contact);
  const setAllContacts = useAllContacts((state) => state.setAllContacts);
  const zustandSetMessages = useMessages((state) => state.setMessages);
  const zustandStoreMessages = useMessages((state) => state.messages);

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    zustandSetMessages(initialMessages);
    console.log(initialMessages, "I am in");
  }, [initialMessages.length > 0]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !contact?._id) return;

    // Join the specific room for this chat
    socket.emit("join_room", contact._id);

    // Dynamic Listener: Use a generic event name like "new_message"
    // rather than the userId, unless your backend specifically emits to userId.
    const messageHandler = (data: Message) => {
      console.log("Received via Socket:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.on(user.userId, messageHandler); // Industry standard naming

    // Cleanup: Remove listener when switching contacts
    return () => {
      socket.off(user.userId, messageHandler);
    };
  }, [contact?._id]);

  useEffect(() => {
    setMessages(zustandStoreMessages);
  }, [zustandStoreMessages]);
  useEffect(() => {
    const loadContacts = async () => {
      const { contacts } = await getContacts();
      setAllContacts(contacts);
    };
    loadContacts();
  }, [messages]);
  const sendMessage = async () => {
    const payload: Message = {
      contactId: contact._id,
      text: message,
      receiver: contact.participants[0]?._id,
      sender: user.userId,
    };
    socketRef.current?.emit("admin", payload);
    setMessages((prev) => [...prev, payload]);
    setMessage("");
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
