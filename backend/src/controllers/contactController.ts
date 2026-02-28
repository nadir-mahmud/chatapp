import type { Request, Response } from "express";
import { Contact, type IContact } from "../models/contact.js";
import type mongoose from "mongoose";
import { text } from "node:stream/consumers";

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
    const { participants, lastMessage } = await req.body;

    await Contact.findOneAndReplace(
      {
        participants: { $all: participants.sort() },
      },
      { lastMessage: lastMessage || null },
    )
      .populate("lastMessage", "text")
      .then((contact) => {
        if (contact && contact.lastMessage) {
          console.log(
            "Contact already exists with last message:",
            contact.lastMessage,
          );
          const { _id, text } = contact.lastMessage as {
            _id: mongoose.Types.ObjectId;
            text: string;
          };
          console.log("Extracted text:", text, typeof text);
          contact.lastMessage = text;
          contact.save();
          return res.status(200).json({
            success: true,
            message: "Contact already exists",
            contact,
          });
        } else {
          const newContact = new Contact({
            participants: participants.sort(),
            lastMessage: lastMessage || null,
          }).save();

          res.status(201).json({
            success: true,
            message: "Contact created successfully",
            newContact,
          });
        }
      });

    // if (existingContact) {

    //   //await existingContact.save();
    //   return res.status(200).json({
    //     success: true,
    //     message: "Contact already exists",
    //     contact: existingContact,
    //     text: existingContact.lastMessage ? existingContact.lastMessage : "",
    //   });
    // }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
