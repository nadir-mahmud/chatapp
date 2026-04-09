import { Message } from "@/types/Message";
import { create } from "zustand";

interface ContactStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export const useMessages = create<ContactStore>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages: messages }),
}));
