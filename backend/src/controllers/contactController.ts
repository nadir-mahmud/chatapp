import type { Request, Response } from "express";
import { Contact, type IContact } from "../models/contact.js";

export async function createContactHandler(req: Request, res: Response) {
  try {
    const { participants, lastMessage = null } = req.body;

    if (!Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({
        message: "Participants must be an array of at least 2 user IDs",
      });
    }

    const sortedParticipants = [...participants].sort();

    const existingContact = (await Contact.findOneAndUpdate(
      {
        participants: sortedParticipants,
      },
      {
        $set: { lastMessage },
        $setOnInsert: {
          participants: sortedParticipants,
          isGroup: participants.length > 2,
        },
      },

      {
        new: true,
        upsert: true,
      },
    )) as IContact;

    const isCreated =
      existingContact.createdAt.getTime() ===
      existingContact.updatedAt.getTime();
    if (isCreated) {
      res.status(201).json({
        success: true,
        message: "Contact created successfully",
        contact: existingContact,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Contact already exists",
        contact: existingContact,
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
