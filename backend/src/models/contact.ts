import mongoose, { model, Schema, type Document } from "mongoose";
import { Message } from "./message.js";

export interface IContact extends Document {
  participants: String[];
  isGroupChat: boolean;
  groupName?: string;
  lastMessage?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isGroupChat: { type: Boolean, default: false },
    groupName: String,
    lastMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
contactSchema.index({ participants: 1 });

export const Contact = model<IContact>("Contact", contactSchema);
