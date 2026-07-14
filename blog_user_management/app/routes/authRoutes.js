import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/register", (req, res) =>
  res.render("register")
);

router.post(
  "/register",
  upload.single("profileImage"),
  registerUser
);

router.get("/login", (req, res) =>
  res.render("login")
);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

export default router;