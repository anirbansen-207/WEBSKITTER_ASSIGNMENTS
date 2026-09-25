import { verifyAccessToken } from "../utils/jwtToken.js";
import { ROLES } from "../utils/roles.js";

import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Staff from "../models/Staff.js";
import Driver from "../models/Driver.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // get access token from HTTP-only cookie
    const token = req.cookies.accessToken;

    // check is token exists
    if (!token) {
      const error = new Error("Authentication required. Please login.");
      error.statusCode = 401;
      throw error;
    }

    // verify access token
    const decoded = verifyAccessToken(token);

    // find user according to role
    let user;
    if (decoded.role === ROLES.SUPER_ADMIN) {
      // Super_Admin stays in admin collection in DB
      user = await Admin.findById(decoded.userId);
    } else if (decoded.role === ROLES.CUSTOMER) {
      // Customer stays in user collection in DB
      user = await User.findById(decoded.userId);
    } else if (decoded.role === ROLES.BOOKING_STAFF) {
      // Booking_Staff stays in staff collection in DB
      user = await Staff.findById(decoded.userId);
    } else if (decoded.role === ROLES.DRIVER) {
      // Driver stays in driver collection in DB
      user = await Driver.findById(decoded.userId);
    } else {
      const error = new Error("Invalid role");
      error.statusCode = 401;
      throw error;
    }

    // if user does not exist
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    // check otp verification for customer role only
    if (decoded.role === ROLES.CUSTOMER && !user.isVerified) {
      const error = new Error("User is not verified");
      error.statusCode = 403;
      throw error;
    }

    // check if user is active
    if (!user.isActive) {
      const error = new Error("Your account has been deactivated");
      error.statusCode = 403;
      throw error;
    }

    // add decoded in req object
    req.user = {
      userId: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
