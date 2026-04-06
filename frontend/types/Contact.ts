export interface Contact {
  _id: string;
  participants: [
    {
      _id: string;
      name: string;
    },
  ];
  lastMessage: {
    _id: string;
    text: string;
    createdAt: string;
  };
  updatedAt: string;
  createdAt: string;
}
