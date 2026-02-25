import { Router } from "express";

import {
  registerUserHandler,
  loginUserHandler,
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import {
  createUserRegisterSchema,
  createUserLoginSchema,
} from "../zodSchemas/user.schema.js";

import { sendMessageHandler } from "../controllers/messageController.js";

const router = Router();

router.post(
  "/send_message",

  sendMessageHandler,
);

export default router;
