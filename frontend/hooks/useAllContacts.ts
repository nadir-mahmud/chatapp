import { Contact } from "@/types/Contact";
import { create } from "zustand";

interface ContactStore {
  contacts: Contact[];
  setAllContacts: (contacts: Contact[]) => void;
}

export const useAllContacts = create<ContactStore>((set) => ({
  contacts: [],
  setAllContacts: (contacts: Contact[]) => set({ contacts: contacts }),
}));
