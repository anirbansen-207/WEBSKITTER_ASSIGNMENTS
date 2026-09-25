import bcrypt from "bcryptjs";
import Staff from "../models/Staff.js";
import { ROLES } from "../utils/roles.js";
import Driver from "../models/Driver.js";
import User from "../models/User.js";

// create booking Staff service
export const createBookingStaffService = async ({
  name,
  email,
  password,
  phone,
  createdBy,
}) => {
  try {
    // checking if booking Staff already exists
    const existingBookingStaff = await Staff.findOne({
      email,
    });

    if (existingBookingStaff) {
      const error = new Error("Booking Staff Email is already registered");
      error.statusCode = 409;
      throw error;
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create booking Staff
    const bookingStaff = await Staff.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: ROLES.BOOKING_STAFF,
      isActive: true,
      isVerified: true,
      refreshToken: null,
      tokenVersion: 0,
      createdBy,
    });

    // return booking Staff
    return {
      id: bookingStaff._id,
      name: bookingStaff.name,
      email: bookingStaff.email,
      phone: bookingStaff.phone,
      role: bookingStaff.role,
      isActive: bookingStaff.isActive,
      isVerified: bookingStaff.isVerified,
    };
  } catch (error) {
    console.error("Error creating booking bookingStaff:", error);
    throw error;
  }
};

// create Driver service
export const createDriverService = async ({
  name,
  email,
  password,
  phone,
  createdBy,
}) => {
  try {
    // checking if Driver already exists
    const existingDriver = await Driver.findOne({
      email,
    });

    if (existingDriver) {
      const error = new Error("Driver Email is already registered");
      error.statusCode = 409;
      throw error;
    }

    // hashing Password
    const hashedpassword = await bcrypt.hash(password, 12);

    // create Driver
    const driver = await Driver.create({
      name,
      email,
      password: hashedpassword,
      phone,
      role: ROLES.DRIVER,
      isActive: true,
      isVerified: true,
      refreshToken: null,
      tokenVersion: 0,
      createdBy,
    });

    // return driver
    return {
      id: driver._id,
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      role: driver.role,
      isActive: driver.isActive,
      isVerified: driver.isVerified,
    };
  } catch (error) {
    console.error("Error creating Driver:", error);
    throw error;
  }
};

// view driver service
export const viewAllDriversService = async () => {
  try {
    const drivers = await Driver.find({
      role: ROLES.DRIVER,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

    return drivers;
  } catch (error) {
    console.error("Error viewing all drivers:", error);
    throw error;
  }
};

// view driver by ID
export const viewSingleDriverService = async (driverId) => {
  try {
    const driver = await Driver.findOne({
      _id: driverId,
      role: ROLES.DRIVER,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

    // check is driver with specific id exists
    if (!driver) {
      const error = new Error("Driver not found");
      error.statusCode = 404;
      throw error;
    }
    return driver;
  } catch (error) {
    throw error;
  }
};

// view all customers
export const viewAllCustomersService = async () => {
  try {
    const customers = await User.find({ role: ROLES.CUSTOMER }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );
    return customers;
  } catch (error) {
    console.error("Error viewing all customers:", error);
    throw error;
  }
};

// view customer by ID
export const viewSingleCustomerService = async (customerId) => {
  try {
    const customer = await User.findOne({
      _id: customerId,
      role: ROLES.CUSTOMER,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

    // check is customer with specific id exists
    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }
    return customer;
  } catch (error) {
    throw error;
  }
};

// view all booking_staff
export const viewAllBookingStaffService = async () => {
  try {
    const bookingStaff = await Staff.find({
      role: ROLES.BOOKING_STAFF,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );
    return bookingStaff;
  } catch (error) {
    throw error;
  }
};

// view booking_staff by ID
export const viewSingleBookingStaffService = async (bookingStaffId) => {
  try {
    const bookingStaff = await Staff.findOne({
      _id: bookingStaffId,
      role: ROLES.BOOKING_STAFF,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

    // check is booking_staff with specific id exists
    if (!bookingStaff) {
      const error = new Error("Booking Staff not found");
      error.statusCode = 404;
      throw error;
    }
    return bookingStaff;
  } catch (error) {
    throw error;
  }
};

// update booking staff service
export const updateBookingStaffService = async (bookingStaffId, data) => {
  try {
    const updateData = {};

    // update allowed fields
    if (data.name !== undefined) {
      updateData.name = data.name;
    }
    if (data.phone !== undefined) {
      updateData.phone = data.phone;
    }
    // if password changed hash that
    if (data.password !== undefined) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }
    const bookingStaff = await Staff.findOneAndUpdate(
      {
        _id: bookingStaffId,
        role: ROLES.BOOKING_STAFF,
      },
      updateData,
      { new: true, runValidators: true },
    ).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

    // check is booking_staff with specific id exists
    if (!bookingStaff) {
      const error = new Error("Booking Staff not found");
      error.statusCode = 404;
      throw error;
    }
    return bookingStaff;
  } catch (error) {
    throw error;
  }
};

// update driver service
export const updateDriverService = async (driverId, data) => {
  try {
    const updateData = {};

    // update allowed fields
    if (data.name !== undefined) {
      updateData.name = data.name;
    }
    if (data.phone !== undefined) {
      updateData.phone = data.phone;
    }
    if (data.email !== undefined) {
      updateData.email = data.email;
    }
    // if password changed hash that
    if (data.password !== undefined) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }
    const driver = await Driver.findOneAndUpdate(
      {
        _id: driverId,
        role: ROLES.DRIVER,
      },
      updateData,
      { new: true, runValidators: true },
    ).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

    // check is driver with specific id exists
    if (!driver) {
      const error = new Error("Driver not found");
      error.statusCode = 404;
      throw error;
    }
    return driver;
  } catch (error) {
    throw error;
  }
};

// delete booking staff service
export const deleteBookingStaffService = async (bookingStaffId) => {
  try {
    const deleteBookingStaff = await Staff.findOneAndDelete({
      _id: bookingStaffId,
      role: ROLES.BOOKING_STAFF,
    });

    if (!deleteBookingStaff) {
      const error = new Error("Booking Staff not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      _id: deleteBookingStaff._id,
      name: deleteBookingStaff.name,
      email: deleteBookingStaff.email,
      phone: deleteBookingStaff.phone,
      role: deleteBookingStaff.role,
    };
  } catch (error) {
    throw error;
  }
};

// delete driver service
export const deleteDriverService = async (driverId) => {
  try {
    const deleteDriver = await Driver.findOneAndDelete({
      _id: driverId,
      role: ROLES.DRIVER,
    });

    if (!deleteDriver) {
      const error = new Error("Driver not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      _id: deleteDriver._id,
      name: deleteDriver.name,
      email: deleteDriver.email,
      phone: deleteDriver.phone,
      role: deleteDriver.role,
    };
  } catch (error) {
    throw error;
  }
};
