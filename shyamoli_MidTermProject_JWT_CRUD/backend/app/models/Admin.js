import mongoose from "mongoose";
import { ROLES } from "../utils/roles.js";

// ADMIN SCHEMA

// This collection stores Super Admin accounts.
//
// MongoDB collection:
//     admins
//
// The Super Admin is created through a seed script,
// NOT through public registration.

const adminSchema = new mongoose.Schema(
  {
    // Admin's name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Admin's email
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Hashed password
    password: {
      type: String,
      required: true,
    },

    // Phone number
    phone: {
      type: String,
      default: null,
    },

    // Role
    //
    // Since this collection is specifically for admins,
    // the role is fixed as super_admin.
    role: {
      type: String,
      enum: [ROLES.SUPER_ADMIN],
      default: ROLES.SUPER_ADMIN,
      required: true,
    },

    // Super Admin is considered verified when seeded.
    isVerified: {
      type: Boolean,
      default: true,
    },

    // Whether the admin is currently logged in.
    isActive: {
      type: Boolean,
      default: true,
    },

    // OTP fields
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    // Current refresh token
    refreshToken: {
      type: String,
      default: null,
    },

    // Used to invalidate old refresh tokens
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);



// EXPORT MODEL
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;