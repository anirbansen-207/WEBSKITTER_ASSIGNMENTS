import {
  registerService,
  verifyOTPService,
  loginService,
  resendOTPService,
  refreshTokenService,
  logoutService,
} from "../services/authService.js";
import { successResponse } from "../utils/response.js";

// register controller
export const registerController = async (req, res, next) => {
  try {
    // extract data from req.body
    const { name, email, password, phone } = req.body;

    // pass this data to service layer
    const user = await registerService({
      name,
      email,
      password,
      phone,
    });

    // send response
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

// verify otp controller
export const verifyOTPController = async (req, res, next) => {
  try {
    // extract data from req.body
    const { email, otp } = req.body;

    // pass this data to service layer
    const user = await verifyOTPService(email, otp);

    // send response
    return successResponse(res, 200, "OTP verified successfully", user);
  } catch (error) {
    next(error);
  }
};

// login controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // call loginService
    const { user, accessToken, refreshToken } = await loginService(
      email,
      password,
      role,
    );

    // access token cookie
    res.cookie("accessToken", accessToken, {
      // keep access token inaccessibale to the browser
      httpOnly: true,
      // Development env
      secure: false,
      // cookie policy
      sameSite: "lax",
      // access token expires in 15 minutes
      maxAge: 15 * 60 * 1000,
    });

    // refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      // keep refresh token inaccessibale to the browser
      httpOnly: true,
      // Development env
      secure: false,
      // cookie policy
      sameSite: "lax",
      // refresh token expires in 7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // send response
    return successResponse(res, 200, "User logged in successfully", user);
  } catch (error) {
    next(error);
  }
};

// resnd otp controller
export const resendOTPController = async (req, res, next) => {
  try {
    const { email } = req.body;

    // call resendOTPService
    await resendOTPService(email);

    // send response
    return successResponse(res, 200, "New OTP resent successfully");
  } catch (error) {
    next(error);
  }
};

// refresh token controller
export const refreshTokenController = async (req, res, next) => {
  try {
    // get refresh token from cookies
    const refreshToken = req.cookies?.refreshToken;

    // call refreshTokenService
    const { newAccessToken, user } = await refreshTokenService(refreshToken);

    // store new access token in cookies
    res.cookie("accessToken", newAccessToken, {
      // keep access token inaccessibale to the browser
      httpOnly: true,
      // Development env
      secure: false,
      // cookie policy
      sameSite: "lax",
      // access token expires in 15 minutes
      maxAge: 15 * 60 * 1000,
    });

    // send response
    return successResponse(
      res,
      200,
      "Access token refreshed successfully",
      {user,},
    );
  } catch (error) {
    next(error);
  }
};

// logout controller
export const logoutController = async (req, res, next) => {
  try {
    /*
     * authMiddleware has already verified the Access Token
     * and created req.user.
     */
    // get userId from req.user from middleware
    const { userId, role } = req.user; //userId = req.user.userId;

    // call logoutService
    const logout = await logoutService(userId, role);

    // clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // send response
    return successResponse(res, 200, "User logged out successfully", logout);
  } catch (error) {
    next(error);
  }
};
