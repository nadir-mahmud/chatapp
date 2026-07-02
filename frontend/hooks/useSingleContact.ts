import { Contact } from "@/types/Contact";
import { create } from "zustand";

interface ContactStore {
  contact: Contact | null;
  setContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
}

export const useContact = create<ContactStore>((set) => ({
  contact: null,
  setContact: (contact: Contact) => set({ contact: contact }),
  updateContact: (contact: Contact) =>
    set((state) => ({ contact: { ...state.contact, ...contact } })),
}));
