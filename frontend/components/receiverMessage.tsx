//left aligned message bubble with avatar
export function ReceiverMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-full">
        <img src="/user.png" alt="user" />
      </div>
      <div className="bg-gray-300 text-gray-800 p-2 rounded-lg max-w-xs ml-2">
        {message}
      </div>
    </div>
  );
}
