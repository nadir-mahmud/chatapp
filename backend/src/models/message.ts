import mongoose, { model, Schema, type Document } from "mongoose";

type messageStatus = "sent" | "delivered" | "seen";
export interface IMessage extends Document {
  contactId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  text: string;
  status?: messageStatus;
  readBy?: mongoose.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    status: { type: String, enum: ["sent", "delivered", "seen"] },

    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

// Compound index for "Get latest messages for this chat"
MessageSchema.index({ contactId: 1, createdAt: -1 });

export const Message = model("Message", MessageSchema);
