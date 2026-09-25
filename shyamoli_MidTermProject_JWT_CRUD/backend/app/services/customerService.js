import { ROLES } from "../utils/roles.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import Ticket from "../models/TicketGeneration.js";


// VIEW OWN PROFILE
export const viewOwnProfileService = async (customerId) => {
  try {
    const customer = await User.findOne({
      _id: customerId,
      role: ROLES.CUSTOMER,
    }).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

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


// UPDATE OWN PROFILE
export const updateOwnProfileService = async (customerId, data) => {
  try {
    const updateData = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.phone !== undefined) {
      updateData.phone = data.phone;
    }

    if (data.password !== undefined) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const customer = await User.findOneAndUpdate(
      {
        _id: customerId,
        role: ROLES.CUSTOMER,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

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


// GET OWN BOOKINGS
export const getOwnBookingsService = async (customerId) => {
  try {
    const bookings = await Booking.find({
      customerId,
    })
      .populate({
        path: "tripId",
        populate: [
          {
            path: "routeId",
            select: "sourceCity destinationCity routeDistance routeStatus",
          },
          {
            path: "busId",
            select: "busNumber busName busType",
          },
          {
            path: "driverId",
            select: "name phone",
          },
        ],
      })
      .sort({ createdAt: -1 });

    return bookings;
  } catch (error) {
    throw error;
  }
};


// CANCEL OWN BOOKING
export const cancelBookingService = async (
  customerId,
  bookingId,
) => {
  try {
    const booking = await Booking.findOne({
      _id: bookingId,
      customerId,
    });

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    if (booking.status === "CANCELLED") {
      const error = new Error("Booking is already cancelled");
      error.statusCode = 400;
      throw error;
    }

    const trip = await Trip.findById(booking.tripId);

    if (!trip) {
      const error = new Error("Trip not found");
      error.statusCode = 404;
      throw error;
    }

    if (
      trip.tripStatus === "ONGOING" ||
      trip.tripStatus === "COMPLETED" ||
      trip.tripStatus === "CANCELLED"
    ) {
      const error = new Error(
        "Booking cannot be cancelled at this stage",
      );
      error.statusCode = 400;
      throw error;
    }

    booking.status = "CANCELLED";
    await booking.save();

    // Cancel ticket if already generated
    await Ticket.findOneAndUpdate(
      {
        bookingId: booking._id,
        ticketStatus: "ACTIVE",
      },
      {
        ticketStatus: "CANCELLED",
      },
    );

    return booking;
  } catch (error) {
    throw error;
  }
};


// VIEW TICKET
export const viewTicketService = async (
  customerId,
  bookingId,
) => {
  try {
    const ticket = await Ticket.findOne({
      bookingId,
      customerId,
    });

    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }

    return ticket;
  } catch (error) {
    throw error;
  }
};