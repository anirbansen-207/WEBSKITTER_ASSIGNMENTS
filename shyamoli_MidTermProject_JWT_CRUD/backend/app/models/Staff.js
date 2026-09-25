import mongoose from "mongoose";

import { ROLES } from "../utils/roles.js";


// ============================================================
// BOOKING STAFF SCHEMA
// ============================================================
//
// MongoDB collection:
// staffs
// ============================================================

const staffSchema = new mongoose.Schema(
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
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },


    // ----------------------------------------------------------
    // Booking Staff role
    // ----------------------------------------------------------

    role: {
      type: String,
      enum: [ROLES.BOOKING_STAFF],
      default: ROLES.BOOKING_STAFF,
      required: true,
    },


    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },


    refreshToken: {
      type: String,
      default: null,
    },

    tokenVersion: {
      type: Number,
      default: 0,
    },


    // ----------------------------------------------------------
    // Who created this staff account?
    // ----------------------------------------------------------

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },

  {
    timestamps: true,
  }
);


const Staff = mongoose.model("Staff", staffSchema);

export default Staff;