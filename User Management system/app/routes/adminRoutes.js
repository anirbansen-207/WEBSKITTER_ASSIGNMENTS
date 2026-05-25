import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createUser } from "../controller/adminController.js";

const router = express.Router();
router.post("/create-user", authMiddleware,roleMiddleware('admin'),createUser);

export default router;