import React from "react";

type Props = {};

export function MessageContainerInput({}: Props) {
  return (
    <div>
      <input
        type="text"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
        placeholder="Type a message..."
      />
      <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Send
      </button>
    </div>
  );
}
