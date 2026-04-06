import React from "react";

type Props = {};

export function MessageContainerInput({}: Props) {
  return (
    <div className="w-full flex flex-row">
      <input
        type="text"
        className="flex-11 w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
        placeholder="Type a message..."
      />
      <button className="flex-1 ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Send
      </button>
    </div>
  );
}
