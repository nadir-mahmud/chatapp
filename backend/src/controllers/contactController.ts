import type { Request, Response } from "express";
import { Contact, type IContact } from "../models/contact.js";

export async function createContactHandler(req: Request, res: Response) {
  try {
    const { participants, lastMessage } = await req.body;
    console.log("Received participants:", lastMessage);
    const existingContact: IContact | null = await Contact.findOne({
      participants: { $all: participants.sort() },
    });
    if (existingContact) {
      existingContact.lastMessage = lastMessage || null;
      await existingContact.save();
      return res.status(200).json({
        success: true,
        message: "Contact already exists",
        contact: existingContact,
      });
    }
    const newContact = await new Contact({
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
