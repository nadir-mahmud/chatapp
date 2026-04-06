import { Contact } from "@/types/Contact";

interface ContactProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactProps) {
  console.log(contacts[0].participants, "I am from client");
  return (
    <div className="w-full h-[calc(100vh-128px)] overflow-y-auto">
      <ul>
        {contacts.map((contact) => (
          <>
            <button className="w-full">
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
          </>
        ))}

        {/* More contacts... */}
      </ul>
    </div>
  );
}
