import mongoose, { model, Schema, type Document } from "mongoose";

export interface IContact extends Document {
  participants: String[];
  isGroupChat: boolean;
  groupName?: string;
  lastMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isGroupChat: { type: Boolean, default: false },
    groupName: String,
    lastMessage: String,
  },
  {
    timestamps: true,
  },
);
contactSchema.index({ participants: 1 });

export const Contact = model<IContact>("Contact", contactSchema);
