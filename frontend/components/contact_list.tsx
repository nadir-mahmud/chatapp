import { useContact } from "@/hooks/useContacts";
import { Contact } from "@/types/Contact";
import { useRef } from "react";
import { set } from "react-hook-form";

interface ContactProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactProps) {
  const setContact = useContact((state) => state.setContact);
  setContact(contacts[0]);
  const handleContactClick = (contact: Contact) => {
    setContact(contact);
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
                    {contact.participants[0].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {contact.lastMessage.text || "No messages yet"}
                  </p>
                </div>
              </div>
            </li>
          </button>
        ))}

        {/* More contacts... */}
      </ul>
    </div>
  );
}
