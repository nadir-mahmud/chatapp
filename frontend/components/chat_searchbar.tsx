"use client";
import { useState, useEffect, useTransition } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchContacts } from "@/actions/search"; // Import the Action
import { User } from "@/types/User";
import { createContact } from "@/actions/create_contact";
import { useContact } from "@/hooks/useContacts";

export function ChatSearchBar({
  user,
}: {
  user: { userId: string; name: string };
}) {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);

  // 1. Use transitions to keep the UI responsive during the "POST"
  const [isPending, startTransition] = useTransition();
  const debouncedSearch = useDebounce(search, 500);
  const setContact = useContact((state) => state.setContact);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setResults([]);
      return;
    }

    // 2. Call the Server Action
    startTransition(async () => {
      try {
        const data = await searchContacts(debouncedSearch);
        setResults(data.users);
      } catch (error) {
        console.error("Search failed", error);
      }
    });
  }, [debouncedSearch]);

  const handleSearchQueryResult = async (searchedContact: string) => {
    const { contact } = await createContact(user.userId, searchedContact);
    setContact(contact);
  };

  return (
    <div className="w-full p-4">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contacts..."
          className="w-full p-2 border border-gray-700 rounded-3xl dark:bg-gray-700"
        />
        {isPending && (
          <span className="absolute right-4 top-2">Loading...</span>
        )}
      </div>

      {/* Render Results */}
      <ul className="mt-4">
        {results.map((user: User) => (
          <button
            onClick={() => handleSearchQueryResult(user._id)}
            className="block"
            key={user._id}
          >
            <li key={user._id} className="p-2 border-b border-gray-800">
              {user.name}
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
