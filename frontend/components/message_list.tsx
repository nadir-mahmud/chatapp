export interface IAppProps {}

export function MessageList(props: IAppProps) {
  return (
    <div className="w-full h-[calc(100vh-128px)] overflow-y-auto">
      <ul>
        <li className="p-4 border-style:none cursor-pointer rounded-xl m-4  hover:bg-gray-200 dark:hover:bg-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full">
              <img src="/user.png" alt="user" />
            </div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">Hey, how are you?</p>
            </div>
          </div>
        </li>
        {/* More contacts... */}
      </ul>
    </div>
  );
}
