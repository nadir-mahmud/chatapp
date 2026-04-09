import { getMessages } from "@/actions/get_messages";
import { useContact } from "@/hooks/useContacts";
import { useMessages } from "@/hooks/useMessages";
import { Contact } from "@/types/Contact";
import { useEffect } from "react";

interface ContactProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactProps) {
  const setContact = useContact((state) => state.setContact);
  const setMessages = useMessages((state) => state.setMessages);
  const selectedContact = useContact((state) => state.contact); // Get current selection

  const loadMessages = async () => {
    const { messages } = await getMessages(selectedContact._id);
    setMessages(messages);
  };

  useEffect(() => {
    // Only set the default if we have contacts and nothing is selected yet
    if (contacts.length > 0 && !selectedContact) {
      setContact(contacts[0]);
    }
    if (!selectedContact?._id) return;
  }, [contacts, setContact, selectedContact?._id]);

  const handleContactClick = async (contact: Contact) => {
    setContact(contact);
    const { messages } = await getMessages(contact._id);
    console.log(await messages);
    setMessages(messages);
  };

  return (
    <div className="w-full h-[calc(100vh-128px)] overflow-y-auto">
      <ul>
        {contacts.map((contact) => (
          <button
            onClick={() => handleContactClick(contact)}
            className="w-full"
            key={contact._id}
          >
            <li
              key={contact._id}
              className="p-4 border-style:none cursor-pointer rounded-xl m-4  hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full">
                  <img src="/user.png" alt="user" />
                </div>
                <div>
                  <p className="font-semibold">
                    {contact.participants[0]?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {contact.lastMessage?.text || "No messages yet"}
                  </p>
                </div>
              </div>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
