import { getMessages } from "@/actions/get_messages";
import { useContact } from "@/hooks/useSingleContact";
import { useMessages } from "@/hooks/useMessages";
import { Contact } from "@/types/Contact";
import { useEffect, useState } from "react";
import { useAllContacts } from "@/hooks/useAllContacts";
import { getContacts } from "@/actions/get_contacts";

interface ContactProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactProps) {
  const [contactLists, setContactLists] = useState<Contact[]>(contacts);
  const setContact = useContact((state) => state.setContact);
  const setMessages = useMessages((state) => state.setMessages);
  const selectedContact = useContact((state) => state.contact); // Get current selection
  const zustandContacts = useAllContacts((state) => state.contacts);

  const loadMessages = async () => {
    const { messages } = await getMessages(selectedContact._id);
    setMessages(messages);
  };

  useEffect(() => {
    setContactLists(zustandContacts);
  }, [zustandContacts]);

  useEffect(() => {
    setContactLists(contacts);
  }, [contacts.length > 0]);

  useEffect(() => {
    const loadContacts = async () => {
      const { contacts } = await getContacts();
      setContactLists(contacts);
    };
    loadContacts();
  }, []);

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

    setMessages(messages);
  };

  return (
    <div className="w-full h-[calc(100vh-128px)] overflow-y-auto">
      <ul>
        {contactLists.map((contact) => (
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
                    {contact.lastMessage || "No messages yet"}
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
