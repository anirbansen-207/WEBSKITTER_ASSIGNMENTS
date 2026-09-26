import {
  registerService,
  verifyOTPService,
  loginService,
  resendOTPService,
  refreshTokenService,
  logoutService,
} from "../services/authService.js";

import { successResponse } from "../utils/response.js";

// ================= COOKIE CONFIGURATION =================

const isProduction =
  process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,

  // HTTPS in production
  secure: isProduction,

  // Localhost uses lax.
  // Cross-site production frontend/backend
  // uses none.
  sameSite: isProduction
    ? "none"
    : "lax",
};

// ================= REGISTER =================

export const registerController = async (
  req,
  res,
  next,
) => {
  try {
    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    const user = await registerService({
      name,
      email,
      password,
      phone,
    });

    return successResponse(
      res,
      201,
      "User registered successfully. Please verify your account using the OTP sent to your email.",
      user,
    );
  } catch (error) {
    next(error);
  }
};

// ================= VERIFY OTP =================

export const verifyOTPController = async (
  req,
  res,
  next,
) => {
  try {
    const { email, otp } = req.body;

    const user = await verifyOTPService(
      email,
      otp,
    );

    return successResponse(
      res,
      200,
      "OTP verified successfully",
      user,
    );
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN =================

export const loginController = async (
  req,
  res,
  next,
) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    const {
      user,
      accessToken,
      refreshToken,
    } = await loginService(
      email,
      password,
      role,
    );

    // Access token
    res.cookie(
      "accessToken",
      accessToken,
      {
        ...cookieOptions,
        maxAge:
          15 * 60 * 1000,
      },
    );

    // Refresh token
    res.cookie(
      "refreshToken",
      refreshToken,
      {
        ...cookieOptions,
        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      },
    );

    return successResponse(
      res,
      200,
      "User logged in successfully",
      user,
    );
  } catch (error) {
    next(error);
  }
};

// ================= RESEND OTP =================

export const resendOTPController = async (
  req,
  res,
  next,
) => {
  try {
    const { email } = req.body;

    await resendOTPService(email);

    return successResponse(
      res,
      200,
      "New OTP resent successfully",
    );
  } catch (error) {
    next(error);
  }
};

// ================= REFRESH TOKEN =================

export const refreshTokenController = async (
  req,
  res,
  next,
) => {
  try {
    // Get refresh token from HTTP-only cookie
    const refreshToken =
      req.cookies?.refreshToken;

    const {
      newAccessToken,
      user,
    } = await refreshTokenService(
      refreshToken,
    );

    // Store new access token
    res.cookie(
      "accessToken",
      newAccessToken,
      {
        ...cookieOptions,
        maxAge:
          15 * 60 * 1000,
      },
    );

    return successResponse(
      res,
      200,
      "Access token refreshed successfully",
      {
        user,
      },
    );
  } catch (error) {
    next(error);
  }
};

// ================= LOGOUT =================

export const logoutController = async (
  req,
  res,
  next,
) => {
  try {
    /*
     * authMiddleware has already verified
     * the Access Token and created req.user.
     */

    const {
      userId,
      role,
    } = req.user;

    const logout =
      await logoutService(
        userId,
        role,
      );

    // Clear access token
    res.clearCookie(
      "accessToken",
      cookieOptions,
    );

    // Clear refresh token
    res.clearCookie(
      "refreshToken",
      cookieOptions,
    );

    return successResponse(
      res,
      200,
      "User logged out successfully",
      logout,
    );
  } catch (error) {
    next(error);
  }
};