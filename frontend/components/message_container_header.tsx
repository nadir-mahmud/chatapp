import * as React from "react";

export interface IMessageContainerHeaderProps {}

export function MessageContainerHeader(props: IMessageContainerHeaderProps) {
  return (
    <div>
      <li className="p-4 border-style:none cursor-pointer rounded-xl text-black dark:text-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full">
            <img src="/user.png" alt="user" />
          </div>
          <div>
            <p className="font-semibold">John Doe</p>
          </div>
        </div>
      </li>
    </div>
  );
}
