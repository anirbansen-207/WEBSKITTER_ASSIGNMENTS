import Staff from "../models/Staff.js";
import bcrypt from "bcryptjs";
import { ROLES } from "../utils/roles.js";




// view all booking staff
export const getAllBookingStaffService = async () => {
  try {
    const staff = await Staff.find({
      role: ROLES.BOOKING_STAFF,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion"
    );

    return staff;
  } catch (error) {
    throw error;
  }
};


// view single booking staff
export const getSingleBookingStaffService = async (staffId) => {
  try {
    const staff = await Staff.findOne({
      _id: staffId,
      role: ROLES.BOOKING_STAFF,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion"
    );

    if (!staff) {
      const error = new Error("Booking staff not found");
      error.statusCode = 404;
      throw error;
    }

    return staff;
  } catch (error) {
    throw error;
  }
};


// update booking staff
export const updateBookingStaffService = async (staffId, data) => {
  try {
    const updateData = {};

    // allowed fields
    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.phone !== undefined) {
      updateData.phone = data.phone;
    }

    if (data.email !== undefined) {
      updateData.email = data.email;
    }

    // update password if provided
    if (data.password !== undefined) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const staff = await Staff.findOneAndUpdate(
      {
        _id: staffId,
        role: ROLES.BOOKING_STAFF,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion"
    );

    if (!staff) {
      const error = new Error("Booking staff not found");
      error.statusCode = 404;
      throw error;
    }

    return staff;
  } catch (error) {
    throw error;
  }
};


// delete booking staff
export const deleteBookingStaffService = async (staffId) => {
  try {
    const staff = await Staff.findOneAndDelete({
      _id: staffId,
      role: ROLES.BOOKING_STAFF,
    });

    if (!staff) {
      const error = new Error("Booking staff not found");
      error.statusCode = 404;
      throw error;
    }

    staff.password = undefined;
    staff.refreshToken = undefined;

    return staff;
  } catch (error) {
    throw error;
  }
};