import { MessageContainerHeader } from "@/components/message_container_header";
import { ChatHeader } from "@/components/chat_header";
import { ContactList } from "@/components/contact_list";
import { ChatSearchBar } from "@/components/chat_searchbar";
import Link from "next/dist/client/link";
import { MessageContainerInput } from "@/components/message_container_input";
import axios from "axios";
import { cookies } from "next/headers";

export interface Contact {
  _id: string;
  participants: [
    {
      name: string;
      _id: string;
    },
  ];
  lastMessage: {
    _id: string;
    text: string;
    createdAt: string;
  };
  updatedAt: string;
  createdAt: string;
}
interface ContactResponse {
  success: boolean;
  contacts: Contact[];
  nextCursor: Date | null;
  hasMore: boolean;
}
async function MessageDashboard() {
  //const isMobile = useIsMobile();

  async function getContacts(): Promise<Contact[]> {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    console.log(cookie.getAll(), "I am cookie header");
    const { data } = await axios.get<ContactResponse>(
      "http://localhost:8080/api/contact/get_contacts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: cookie.toString(),
        },
      },
    );
    console.log(data.contacts[0].participants, " I am server");
    return data.contacts;
  }
  const contactData = await getContacts();

  return (
    <div className="flex flex-col h-full md:flex-row ">
      {/* Chat Sidebar */}
      <div className="w-full h-full text-black md:w-1/3 bg-white md:border-r dark:bg-gray-900 dark:text-white">
        {/* Chat Sidebar -> Chat Header */}
        <ChatHeader />

        {/* Chat Sidebar -> Chat search Bar */}
        <ChatSearchBar />

        {/* Chat Sidebar -> Contact List */}
        <ContactList contacts={contactData} />
      </div>

      {/* Chat Sidebar -> Message Container */}
      <div className="hidden bg-gray-100 dark:bg-gray-900 md:w-2/3 md:block">
        <MessageContainerHeader />
        <div className="h-full bg-[url('/bg.jpg')] backdrop-blur-sm bg-cover bg-center bg-no-repeat"></div>
        <div className="p-4 flex items-center">
          <MessageContainerInput />
          <Link href="/">View Messages</Link>
        </div>
      </div>
    </div>
  );
}

export default MessageDashboard;
