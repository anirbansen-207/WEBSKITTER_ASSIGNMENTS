import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/mail.js";
import { generateOTP } from "../utils/otp.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtToken.js";

import { ROLES } from "../utils/roles.js";
import Admin from "../models/Admin.js";
import Staff from "../models/Staff.js";
import Driver from "../models/Driver.js";
import User from "../models/User.js";

// Register Service
export const registerService = async ({ name, email, password, phone }) => {
  try {
    // checking if user already exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      const error = new Error("Email is already registered");
      error.statusCode = 409;
      throw error;
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 12);

    // generate otp
    const otp = generateOTP();

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      otp,
      otpExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      role: ROLES.CUSTOMER,
      isActive: false,
      isVerified: false,
      refreshToken: null,
      tokenVersion: 0,
      createdBy: null,
    });

    await sendEmail(
      email,
      "Shamolly Account Verification OTP",
      `Hello ${name},

      Your OTP for account verification is: ${otp}

      This OTP will expire in 15 minutes.

      If you did not create this account, please ignore this email.`,
    );
    return {
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        isVerified: user.isVerified,
      },
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Verify OTP Service
export const verifyOTPService = async (email, otp) => {
  try {
    // Find the user using email
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // If user is already verified
    if (user.isVerified) {
      const error = new Error("User is already verified");
      error.statusCode = 400;
      throw error;
    }

    // Check whether an active OTP exists
    if (!user.otp || !user.otpExpiry) {
      const error = new Error("OTP not found. Please request a new OTP.");

      error.statusCode = 400;
      throw error;
    }

    // Check whether OTP has expired
    if (Date.now() > user.otpExpiry.getTime()) {
      const error = new Error("OTP has expired");
      error.statusCode = 400;
      throw error;
    }

    // Compare the OTP provided by the user
    // with the OTP stored in MongoDB
    if (user.otp !== otp) {
      const error = new Error("Invalid OTP");
      error.statusCode = 400;
      throw error;
    }

    // OTP is correct, so verify the account
    user.isVerified = true;

    // Account becomes active after successful verification
    user.isActive = true;

    // OTP has now been consumed
    user.otp = null;
    user.otpExpiry = null;

    // Save updated user
    await user.save();

    // Send success response
    return {
      id: user._id,
      email: user.email,
      isVerified: user.isVerified,
      isActive: user.isActive,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

// login service
/*
 * The service handles:
 *
 * - Finding user
 * - Checking if user exists
 * - Checking if user is active
 * - Checking if user is verified
 * - Checking if password is correct
 * - Recieve email and password and role
 * - Checking account status
 * - Checking verification
 * - Comparing password
 * - Generating access token
 * - Generating refresh token
 * - Saving refresh token
 *
 * Returns:
 * - User
 * - Access token
 * - Refresh token
 *
 * collection mapping
 * super_admin -> admins
 * users -> customers
 * booking_staff -> staff
 * driver -> drivers
 */
export const loginService = async (email, password, role) => {
  try {
    // Decide models based on role
    let Model;

    if (role === ROLES.SUPER_ADMIN) {
      // Super Admin is stored in admins collection
      Model = Admin;
    } else if (role === ROLES.CUSTOMER) {
      // Customer is stored in users collection
      Model = User;
    } else if (role === ROLES.BOOKING_STAFF) {
      // Booking Staff is stored in staffs collection
      Model = Staff;
    } else if (role === ROLES.DRIVER) {
      // Driver is stored in drivers collection
      Model = Driver;
    } else {
      const error = new Error("Invalid role");
      error.statusCode = 400;
      throw error;
    }
    // find the model using email
    const user = await Model.findOne({ email });

    // if user does not exist
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // check role
    if (user.role !== role) {
      const error = new Error("Invalid role");
      error.statusCode = 401;
      throw error;
    }

    // check if user is active
    if (!user.isActive) {
      const error = new Error("User is not active");
      error.statusCode = 403;
      throw error;
    }

    // otp verification only for customer account
    if (user.role === ROLES.CUSTOMER && !user.isVerified) {
      const error = new Error("User is not verified");
      error.statusCode = 400;
      throw error;
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // if password is incorrect
    if (!isPasswordCorrect) {
      const error = new Error("Incorrect password");
      error.statusCode = 400;
      throw error;
    }

    // create jwt token
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // store refresh token in DB
    user.refreshToken = refreshToken;

    await user.save();

    // return data to controller
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Error logging in User", error);
    throw error;
  }
};

// resend otp service
export const resendOTPService = async (email) => {
  try {
    // find the user using email
    const user = await User.findOne({ email });

    // if user does not exist
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // check is account is verified
    if (user.isVerified) {
      const error = new Error("User is already verified");
      error.statusCode = 400;
      throw error;
    }

    // generate otp
    const newOTP = generateOTP();
    const newOTPExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // update user
    user.otp = newOTP;
    user.otpExpiry = newOTPExpiry;

    // save user
    await user.save();

    // send otp
    await sendEmail(
      email,
      "Shamolly - New Verification OTP",
      `Hello ${user.name},

      Your new OTP for account verification is: ${newOTP}

      This OTP will expire in 15 minutes.

      If you did not request a new OTP, please ignore this email.`,
    );

    // return data to controller
    // nothing is required to return to controller so return true
    return true;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};

// refresh token service
export const refreshTokenService = async (refreshToken) => {
  try {
    // check whether refresh token exists
    if (!refreshToken) {
      const error = new Error("Refresh token not found");
      error.statusCode = 404;
      throw error;
    }

    // verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    /*
    Now decoded will contain something like:
     *
     * {
     *   userId: "...",
     *   tokenVersion: 0,
     *   iat: ...,
     *   exp: ...
     * }
    */

    // find model according to role
    let Model;

    if (decoded.role === ROLES.SUPER_ADMIN) {
      Model = Admin;
    } else if (decoded.role === ROLES.CUSTOMER) {
      Model = User;
    } else if (decoded.role === ROLES.BOOKING_STAFF) {
      Model = Staff;
    } else if (decoded.role === ROLES.DRIVER) {
      Model = Driver;
    } else {
      const error = new Error("Invalid user role");

      error.statusCode = 401;

      throw error;
    }

    const user = await Model.findById(decoded.userId);

    // if user does not exist
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // check if user is active
    if (!user.isActive) {
      const error = new Error("Your account has been deactivated");
      error.statusCode = 403;
      throw error;
    }

    // check token version
    if (decoded.tokenVersion !== user.tokenVersion) {
      const error = new Error("Invalid refresh token");
      error.statusCode = 400;
      throw error;
    }

    // check the refresh token expiry
    if (decoded.exp < Date.now() / 1000) {
      const error = new Error("Refresh token has expired");
      error.statusCode = 400;
      throw error;
    }

    // check the refresh token from browser matches the refresh token in DB
    if (refreshToken !== user.refreshToken) {
      const error = new Error("Invalid refresh token");
      error.statusCode = 400;
      throw error;
    }

    // create new access token
    const newAccessToken = createAccessToken(user);

    // return data to controller
    return {
      newAccessToken,

      /* The frontend needs the user information
      to restore AuthContext after browser refresh.*/
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// logout service
export const logoutService = async (userId, role) => {
  try {
    // find model according to role
    let Model;
    if (role === ROLES.SUPER_ADMIN) {
      Model = Admin;
    } else if (role === ROLES.CUSTOMER) {
      Model = User;
    } else if (role === ROLES.BOOKING_STAFF) {
      Model = Staff;
    } else if (role === ROLES.DRIVER) {
      Model = Driver;
    } else {
      const error = new Error("Invalid user role");

      error.statusCode = 401;

      throw error;
    }
    // find user
    const user = await Model.findById(userId);

    // if user does not exist
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // update user:-

    // Remove refresh token
    user.refreshToken = null;
    // Invalidate previously issued refresh tokens
    user.tokenVersion += 1;

    // save user
    await user.save();

    // return data to controller
    return true;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};
