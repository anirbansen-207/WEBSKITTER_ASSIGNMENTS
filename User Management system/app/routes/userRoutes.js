import express from "express";
import { fetchUser, updatePassword } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/fetch-profile", authMiddleware, fetchUser);
router.put("/update-password", authMiddleware, updatePassword);

export default router;