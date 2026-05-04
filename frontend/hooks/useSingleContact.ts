import { Contact } from "@/types/Contact";
import { create } from "zustand";

interface ContactStore {
  contact: Contact;
  setContact: (contact: Contact) => void;
}

export const useContact = create<ContactStore>((set) => ({
  contact: {
    _id: "",
    participants: [{ _id: "", name: "" }],
    lastMessage: "",
    createdAt: "",
    updatedAt: "",
  },
  setContact: (contact: Contact) => set({ contact: contact }),
}));
