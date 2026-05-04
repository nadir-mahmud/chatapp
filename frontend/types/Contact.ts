export interface Contact {
  _id: string;
  participants: [
    {
      _id: string;
      name: string;
    },
  ];
  lastMessage: string;
  updatedAt: string;
  createdAt: string;
}
