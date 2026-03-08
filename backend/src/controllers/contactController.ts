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

export async function getContactsHandler(req: Request, res: Response) {
  try {
    const userId = "6999e617eded7df788b23101" as mongoose.Types.ObjectId; // Replace with req.user.userId in production
    const { limit = 20, lastTimestamp } = req.query;

    // 1. Build the query
    const query: any = { participants: userId };

    // 2. If we have a timestamp, only find items OLDER than that
    if (lastTimestamp) {
      query.updatedAt = { $lt: new Date(lastTimestamp as string) };
    }

    const contacts: IContact[] = (await Contact.find(query)
      .sort({ updatedAt: -1 }) // Newest first
      .limit(Number(limit))
      .populate({
        path: "participants",
        select: "name",
        match: { _id: { $ne: userId } },
      })
      .populate("lastMessage", "text createdAt")
      .lean()) as IContact[];

    // 3. Get the timestamp of the last item to send back as the next cursor
    const nextCursor =
      contacts.length > 0 ? contacts[contacts.length - 1]!.updatedAt : null;

    return res.status(200).json({
      success: true,
      contacts,
      nextCursor, // Frontend will send this back in the next request
      hasMore: contacts.length === Number(limit),
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Cursor pagination failed", error: error.message });
  }
}
