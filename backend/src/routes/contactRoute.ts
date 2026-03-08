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
  createContactHandler,
  getContactsHandler,
} from "../controllers/contactController.js";

const router = Router();

router.put(
  "/create_contact",

  createContactHandler,
);

router.get("/get_contacts", getContactsHandler);

export default router;
