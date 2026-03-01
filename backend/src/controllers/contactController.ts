import type { Request, Response } from "express";
import { Contact, type IContact } from "../models/contact.js";
import type mongoose from "mongoose";
import { text } from "node:stream/consumers";
import { Message } from "../models/message.js";

interface MContact {
  participants: String[];
  isGroupChat: boolean;
  groupName?: string;
  lastMessage?: { _id: mongoose.Types.ObjectId; text: string } | null;
  createdAt: Date;
  updatedAt: Date;
}
export async function createContactHandler(req: Request, res: Response) {
  try {
    const { participants, lastMessage = null } = req.body;

    const message = lastMessage
      ? await Message.findById(lastMessage).select("text")
      : null;
    console.log("Message found:", message);

    const existingContact = await Contact.findOneAndUpdate(
      {
        participants: { $all: participants.sort() },
      },
      {
        $set: { lastMessage: message ? message.text : null },
        $setOnInsert: {
          participants: participants.sort(),
          isGroupChat: participants.length > 2,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      },
    );

    if (existingContact) {
      console.log("Contact found:", existingContact);

      return res.status(200).json({
        success: true,
        message: "Contact already exists",
        contact: existingContact,
        text: existingContact.lastMessage ? existingContact.lastMessage : "",
      });
    }
    const newContact = new Contact({
      participants: participants.sort(),
      lastMessage: lastMessage || null,
    }).save();

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      newContact,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
