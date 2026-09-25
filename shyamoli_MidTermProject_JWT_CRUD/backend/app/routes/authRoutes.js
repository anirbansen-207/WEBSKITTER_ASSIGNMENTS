import express from "express";
import {
  registerController,
  verifyOTPController,
  loginController,
  resendOTPController,
  refreshTokenController,
  logoutController
} from "../controllers/authController.js";
import { validateMiddleware } from "../middlewares/validationMiddleware.js";
import {
  registerSchema,
  verifyOTPSchema,
  loginSchema,
  resendOTPSchema,
} from "../validations/authValidation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// register route
router.post(
  "/register",
  validateMiddleware(registerSchema),
  registerController,
);

// verify otp route
router.post(
  "/verify-otp",
  validateMiddleware(verifyOTPSchema),
  verifyOTPController,
);

// login route
router.post("/login", validateMiddleware(loginSchema), loginController);

// resend otp route
router.post(
  "/resend-otp",
  validateMiddleware(resendOTPSchema),
  resendOTPController,
);

// refresh token route
router.post("/refresh-token", refreshTokenController);

// logout route
router.post("/logout",
  authMiddleware,
  logoutController
)

export default router;
