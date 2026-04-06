"use client";
import { useState, useEffect, useTransition } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchContacts } from "@/actions/search"; // Import the Action

export function ChatSearchBar() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState([]);

  // 1. Use transitions to keep the UI responsive during the "POST"
  const [isPending, startTransition] = useTransition();
  const debouncedSearch = useDebounce(search, 500);

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
        {results.map((contact: any) => (
          <li key={contact.id} className="p-2 border-b border-gray-800">
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
