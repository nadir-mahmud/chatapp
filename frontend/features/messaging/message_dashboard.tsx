"use client";
import { MessageContainerHeader } from "@/components/message_container_header";
import { ChatHeader } from "@/components/chat_header";
import { ContactList } from "@/components/contact_list";
import { ChatSearchBar } from "@/components/chat_searchbar";
import Link from "next/dist/client/link";
import { MessageContainerInput } from "@/components/message_container_input";
import { Contact } from "@/types/Contact";
import { useIsMobile } from "@/hooks/use-mobile";
import { Message } from "@/components/messages";

interface props {
  contacts: Contact[];
  user: { userId: string; name: string };
}

function MessageDashboard({ contacts, user }: props) {
  const isMobile = useIsMobile();

  return (
    <div className=" md:h-screen flex flex-col md:flex-row ">
      {/* Chat Sidebar */}
      <div className="w-full h-full text-black md:w-1/3 bg-white md:border-r dark:bg-gray-900 dark:text-white">
        {/* Chat Sidebar -> Chat Header */}
        <ChatHeader />

        {/* Chat Sidebar -> Chat search Bar */}
        <ChatSearchBar user={user} />

        {/* Chat Sidebar -> Contact List */}
        <ContactList contacts={contacts} />
      </div>

      {/* Chat Sidebar -> Message Container */}
      <div className="hidden h-screen flex-col bg-gray-100 dark:bg-gray-900 md:w-2/3 md:flex">
        <MessageContainerHeader contacts={contacts} />
        <Message contacts={contacts} user={user} />
      </div>
    </div>
  );
}

export default MessageDashboard;
