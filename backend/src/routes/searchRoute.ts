import { Router } from "express";

import { searchHandler } from "../controllers/searchController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/search", searchHandler);

export default router;
