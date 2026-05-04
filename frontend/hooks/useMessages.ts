import { Message } from "@/types/Message";
import { create } from "zustand";

interface MessageStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export const useMessages = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages: messages }),
}));
