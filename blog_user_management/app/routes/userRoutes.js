import express from "express";

import {
  dashboard,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  dashboard
);

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.get(
  "/users/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

export default router;