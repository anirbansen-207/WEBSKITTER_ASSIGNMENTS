import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import SeatLayout from "../models/SeatLayout.js";
import Ticket from "../models/TicketGeneration.js";

// CREATE BOOKING
export const createBookingService = async ({
  customerId,
  tripId,
  seatNumbers,
}) => {
  try {
    // Validate input
    if (
      !customerId ||
      !tripId ||
      !seatNumbers ||
      !Array.isArray(seatNumbers) ||
      seatNumbers.length === 0
    ) {
      const error = new Error(
        "Customer, trip and seat numbers are required",
      );

      error.statusCode = 400;
      throw error;
    }

    // Check duplicate seats in same request
    const uniqueSeats = new Set(seatNumbers);

    if (uniqueSeats.size !== seatNumbers.length) {
      const error = new Error(
        "Duplicate seat numbers are not allowed",
      );

      error.statusCode = 400;
      throw error;
    }

    // Find trip
    const trip = await Trip.findById(tripId);

    if (!trip) {
      const error = new Error("Trip not found");

      error.statusCode = 404;
      throw error;
    }

    // Booking only allowed for scheduled trip
    if (trip.tripStatus !== "SCHEDULED") {
      const error = new Error(
        "Booking is only allowed for scheduled trips",
      );

      error.statusCode = 400;
      throw error;
    }

    // Get bus from trip
    const busId = trip.busId;

    // Find seat layout
    // IMPORTANT:
    // SeatLayout model uses field "bus", not "busId"
    const seatLayout = await SeatLayout.findOne({
      bus: busId,
    });

    if (!seatLayout) {
      const error = new Error(
        "Seat layout not found for this bus",
      );

      error.statusCode = 404;
      throw error;
    }

    // Find requested seats
    const selectedSeats = seatLayout.seats.filter((seat) =>
      seatNumbers.includes(seat.seatNumber),
    );

    // Check all requested seats exist
    if (selectedSeats.length !== seatNumbers.length) {
      const foundSeatNumbers = selectedSeats.map(
        (seat) => seat.seatNumber,
      );

      const invalidSeats = seatNumbers.filter(
        (seatNumber) =>
          !foundSeatNumbers.includes(seatNumber),
      );

      const error = new Error(
        `Invalid seat(s): ${invalidSeats.join(", ")}`,
      );

      error.statusCode = 400;
      throw error;
    }

    // Check already booked seats
    const existingBookings = await Booking.find({
      tripId,
      status: "CONFIRMED",
      seatNumbers: {
        $in: seatNumbers,
      },
    });

    if (existingBookings.length > 0) {
      const bookedSeats = existingBookings.flatMap(
        (booking) => booking.seatNumbers,
      );

      const conflictingSeats = seatNumbers.filter(
        (seatNumber) =>
          bookedSeats.includes(seatNumber),
      );

      const error = new Error(
        `Seat(s) already booked: ${conflictingSeats.join(", ")}`,
      );

      error.statusCode = 400;
      throw error;
    }

    // Calculate ticket price
    const ticketPrice = selectedSeats[0].ticketPrice;

    // Calculate total amount
    const totalAmount = selectedSeats.reduce(
      (total, seat) => total + seat.ticketPrice,
      0,
    );

    // Create booking
    let createdBooking;

    try {
      createdBooking = await Booking.create({
        customerId,
        tripId,
        seatNumbers,
        ticketPrice,
        status: "CONFIRMED",
        totalAmount,
      });
    } catch (error) {
      // Handles concurrent booking
      if (error.code === 11000) {
        const duplicateError = new Error(
          "One or more selected seats were just booked by another customer",
        );

        duplicateError.statusCode = 409;

        throw duplicateError;
      }

      throw error;
    }

    return createdBooking;
  } catch (error) {
    throw error;
  }
};


// GET ALL BOOKINGS
export const getAllBookingService = async () => {
  try {
    const allBookings = await Booking.find({
      status: "CONFIRMED",
    })
      .populate(
        "customerId",
        "name phone email",
      )
      .populate({
        path: "tripId",
        populate: [
          {
            path: "routeId",
            select:
              "sourceCity destinationCity routeDistance routeStatus",
          },
          {
            path: "busId",
            select:
              "busNumber busName busType totalSeats availableSeats",
          },
          {
            path: "driverId",
            select: "name email phone",
          },
        ],
      });

    return allBookings;
  } catch (error) {
    throw error;
  }
};


// GET SINGLE BOOKING
export const getSingleBookingService = async (
  bookingId,
  customerId,
) => {
  try {
    const query = {
      _id: bookingId,
    };

    if (customerId) {
      query.customerId = customerId;
    }

    const singleBooking = await Booking.findOne(query)
      .populate(
        "customerId",
        "name phone email",
      )
      .populate({
        path: "tripId",
        populate: [
          {
            path: "routeId",
            select:
              "sourceCity destinationCity routeDistance routeStatus",
          },
          {
            path: "busId",
            select:
              "busNumber busName busType totalSeats availableSeats",
          },
          {
            path: "driverId",
            select: "name email phone",
          },
        ],
      });

    if (!singleBooking) {
      const error = new Error("Booking not found");

      error.statusCode = 404;
      throw error;
    }

    return singleBooking;
  } catch (error) {
    throw error;
  }
};


// CANCEL BOOKING
// Cancel booking service
export const cancelBookingService = async ({
  bookingId,
  customerId,
}) => {
  try {
    // Build the booking search condition
    const bookingQuery = {
      _id: bookingId,
    };

    // If customerId is provided,
    // it means a customer is cancelling their own booking.
    //
    // If customerId is undefined,
    // it means Booking Staff is cancelling
    // the booking on behalf of the customer.
    if (customerId) {
      bookingQuery.customerId = customerId;
    }

    // Find the booking
    const booking = await Booking.findOne(
      bookingQuery,
    );

    // Booking not found
    if (!booking) {
      const error = new Error(
        "Booking not found",
      );

      error.statusCode = 404;

      throw error;
    }

    // Check whether booking is already cancelled
    if (booking.status === "CANCELLED") {
      const error = new Error(
        "Booking is already cancelled",
      );

      error.statusCode = 400;

      throw error;
    }

    // Check whether booking is confirmed
    if (booking.status !== "CONFIRMED") {
      const error = new Error(
        "Only confirmed bookings can be cancelled",
      );

      error.statusCode = 400;

      throw error;
    }

    // Update booking status
    booking.status = "CANCELLED";

    // Save booking
    await booking.save();

    // Return updated booking
    return booking;
  } catch (error) {
    console.error(
      "Error cancelling booking:",
      error,
    );

    throw error;
  }
};


// GET AVAILABLE SEATS
export const getAvailableSeatsService = async (
  tripId,
) => {
  try {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      const error = new Error("Trip not found");

      error.statusCode = 404;
      throw error;
    }

    // IMPORTANT:
    // SeatLayout uses "bus"
    // Trip uses "busId"
    const seatLayout = await SeatLayout.findOne({
      bus: trip.busId,
    });

    if (!seatLayout) {
      const error = new Error(
        "Seat layout not found for this bus",
      );

      error.statusCode = 404;
      throw error;
    }

    const bookings = await Booking.find({
      tripId,
      status: "CONFIRMED",
    }).select("seatNumbers");

    const bookedSeats = bookings.flatMap(
      (booking) => booking.seatNumbers,
    );

    const seats = seatLayout.seats.map((seat) => ({
      seatNumber: seat.seatNumber,
      seatType: seat.seatType,
      ticketPrice: seat.ticketPrice,
      isBooked: bookedSeats.includes(
        seat.seatNumber,
      ),
    }));

    return seats;
  } catch (error) {
    throw error;
  }
};