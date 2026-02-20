"use client";
import { MessageContainerHeader } from "@/components/message_container_header";
import { MessageHeader } from "@/components/message_header";
import { MessageList } from "@/components/message_list";
import { MessageSearchBar } from "@/components/message_searchbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

function MessageDashboard() {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col h-screen md:flex-row ">
      {/* Message Lists */}
      <div className="w-full h-full text-black md:w-1/3 bg-white md:border-r dark:bg-gray-900 dark:text-white">
        {/* Message Sidebar -> Message Header */}
        <MessageHeader />

        {/* Message Sidebar -> Messsage search Bar */}
        <MessageSearchBar />

        {/* Message Sidebar -> Message List */}
        <MessageList />
      </div>
      {/* Message Container */}
      <div className="hidden h-full bg-gray-100 dark:bg-gray-900 md:w-2/3 md:block">
        <MessageContainerHeader />
        <div className="h-full bg-[url('/bg.jpg')] backdrop-blur-sm bg-cover bg-center bg-no-repeat h-screen">
          <MessageList />
        </div>
      </div>
    </div>
  );
}

export default MessageDashboard;
