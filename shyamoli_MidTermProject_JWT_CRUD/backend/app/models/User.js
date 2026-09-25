import mongoose from "mongoose";
import { ROLES } from "../utils/roles.js";
// user schema contains:-
// name
// email
// password
// phone
// role
// profileImage
// isActive
// isVerified
// otp
// otpExpiry
// refreshToken
// tokenVersion
// createdBy
// timestamps

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: [ROLES.CUSTOMER],
      default: ROLES.CUSTOMER,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
