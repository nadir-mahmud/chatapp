export function SenderMessage({ message }: { message: string }) {
  return (
    //right aligned message bubble
    <div className="flex justify-end">
      <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
        {message}
      </div>
    </div>
  );
}
