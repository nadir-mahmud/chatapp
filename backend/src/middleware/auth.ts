import type { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

interface JwtUserPayload {
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    ) as JwtUserPayload;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
