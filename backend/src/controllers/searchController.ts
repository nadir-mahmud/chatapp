import type { Request, Response } from "express";
import { User } from "../models/user.js";

// Helper to escape special regex characters to prevent ReDoS attacks
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function searchHandler(req: Request, res: Response) {
  try {
    // 1. Industry Standard: Use destructuring and defaults
    const { email, name } = req.body;

    // 2. Guard Clause: Ensure we actually have something to search for
    if (!email && !name) {
      return res.status(400).json({
        success: false,
        message: "Email or Name is required for search",
      });
    }

    // 3. Build a dynamic query object
    const queryTerm = email || name;
    const safeQuery = escapeRegExp(queryTerm);

    // Choose the field to search based on what was provided
    const searchFilter = email
      ? { email: { $regex: safeQuery, $options: "i" } }
      : { name: { $regex: safeQuery, $options: "i" } };

    // 4. Performance: Add .lean() for faster read-only queries
    // and limit results to prevent memory issues
    const users = await User.find(searchFilter)
      .sort({ name: 1 })
      .limit(20)
      .lean();

    // 5. Correct Status Code (200)
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    // 6. Professional Logging: Don't send the full error object to the client (Security)
    console.error("Search Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
