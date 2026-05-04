import type { Request, Response } from "express";
import { Message, type IMessage } from "../models/message.js";

export async function sendMessageHandler(req: Request, res: Response) {
  try {
    const { contactId, sender, text } = await req.body;

    const newMessage = await new Message({
      contactId,
      sender,
      text,
    }).save();

    res.status(201).json({
      success: true,

      message: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getMessagessHandler(req: Request, res: Response) {
  try {
    const { contactId } = req.params;
    const { limit = 20 } = req.query;
    console.log(contactId);
    // 1. Build the query
    const query: any = { contactId: contactId };

    // 2. If we have a timestamp, only find items OLDER than that

    // if (lastTimestamp) {
    //   query.updatedAt = { $lt: new Date(lastTimestamp as string) };
    // }

    const messages: IMessage[] = (await Message.find(query)
      .sort({ updatedAt: 1 }) // Newest first
      .limit(Number(limit))
      .populate({
        path: "sender",
        select: "_id name",
      })
      .lean()) as IMessage[];

    // 3. Get the timestamp of the last item to send back as the next cursor

    const nextCursor =
      messages.length > 0 ? messages[messages.length - 1]!.updatedAt : null;

    return res.status(200).json({
      success: true,
      messages,
      nextCursor, // Frontend will send this back in the next request
      hasMore: messages.length === Number(limit),
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Cursor pagination failed", error: error.message });
  }
}
