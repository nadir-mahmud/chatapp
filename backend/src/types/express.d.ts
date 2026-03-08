import "express";
interface JwtUserPayload {
  userId: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: jwtUserPayload;
    }
  }
}
