import { Contact } from "@/types/Contact";

export function MessageContainerHeader({ contacts }: { contacts: Contact[] }) {
  // if (contacts.length === 0) {
  //   return <div className="animate-pulse">Loading header...</div>;
  // }

  return (
    <div>
      <li className="p-4 border-style:none cursor-pointer rounded-xl text-black dark:text-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full">
            <img src="/user.png" alt="user" />
          </div>
          <div>
            <p className="font-semibold">{contacts[0].participants[0]?.name}</p>
          </div>
        </div>
      </li>
    </div>
  );
}
