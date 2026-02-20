import { z } from "zod";

export const createUserRegisterSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(50),
    username: z.string().trim().min(3).max(20).toLowerCase(),
    email: z.string().email("Invalid email format").toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

export const createUserLoginSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(8),
  }),
});
