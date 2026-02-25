import type { Request, Response } from "express";
import { Message } from "../models/message.js";

export async function sendMessageHandler(req: Request, res: Response) {
  try {
    const { contactId, sender, text } = await req.body;

    const newContact = await new Message({
      contactId,
      sender,
      text,
    }).save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newContact,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
