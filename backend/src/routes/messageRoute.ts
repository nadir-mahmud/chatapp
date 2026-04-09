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

import {
  getMessagessHandler,
  sendMessageHandler,
} from "../controllers/messageController.js";

const router = Router();

router.post("/send_message", sendMessageHandler);

router.get("/get_messages/:contactId", getMessagessHandler);

export default router;
