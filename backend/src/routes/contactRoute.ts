import { Router } from "express";

import {
  createContactHandler,
  getContactsHandler,
} from "../controllers/contactController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.put(
  "/create_contact",

  createContactHandler,
);

router.get("/get_contacts", authMiddleware, getContactsHandler);

export default router;
