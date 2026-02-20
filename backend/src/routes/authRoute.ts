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

const router = Router();

router.post(
  "/register",
  validate(createUserRegisterSchema),
  registerUserHandler,
);
router.post("/login", validate(createUserLoginSchema), loginUserHandler);

export default router;
