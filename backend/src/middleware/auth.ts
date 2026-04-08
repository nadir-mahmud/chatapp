import type { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { string } from "zod";

interface JwtUserPayload {
  userId: string;
  name: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let token: string | undefined;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    //console.log(req.headers.cookie, "I am cookie header from middleware");

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
