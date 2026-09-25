import Bus from "../models/Bus.js";
import SeatLayout from "../models/SeatLayout.js";

// CREATE SEAT LAYOUT
export const createSeatLayoutService = async ({
  busId,
  seats,
}) => {
  try {
    // Check whether bus exists
    const bus = await Bus.findOne({
      _id: busId,
      isActive: true,
    });

    if (!bus) {
      const error = new Error(
        "Bus not found",
      );

      error.statusCode = 404;
      throw error;
    }

    // Check whether seat layout already exists
    const existingSeatLayout =
      await SeatLayout.findOne({
        bus: busId,
      });

    if (existingSeatLayout) {
      const error = new Error(
        "Seat layout already exists for this bus",
      );

      error.statusCode = 409;
      throw error;
    }

    // Check seats
    if (
      !seats ||
      !Array.isArray(seats) ||
      seats.length === 0
    ) {
      const error = new Error(
        "Seats are required",
      );

      error.statusCode = 400;
      throw error;
    }

    // Seat count must match bus capacity
    if (seats.length !== bus.totalSeats) {
      const error = new Error(
        `Seat layout must contain exactly ${bus.totalSeats} seats`,
      );

      error.statusCode = 400;
      throw error;
    }

    // Check duplicate seat numbers
    const seatNumbers = seats.map(
      (seat) => seat.seatNumber,
    );

    const uniqueSeatNumbers =
      new Set(seatNumbers);

    if (
      uniqueSeatNumbers.size !==
      seatNumbers.length
    ) {
      const error = new Error(
        "Duplicate seat numbers are not allowed",
      );

      error.statusCode = 400;
      throw error;
    }

    // Add ticket price to every seat
    const updatedSeats = seats.map(
      (seat) => ({
        seatNumber: seat.seatNumber,
        seatType:
          seat.seatType || "regular",
        ticketPrice:
          bus.ticketPrice,
      }),
    );

    // Create seat layout
    const seatLayout =
      await SeatLayout.create({
        bus: busId,
        seats: updatedSeats,
        totalSeats:
          updatedSeats.length,
      });

    return seatLayout;
  } catch (error) {
    throw error;
  }
};

// GET SEAT LAYOUT BY BUS ID
export const getSeatLayoutService =
  async (busId) => {
    try {
      const seatLayout =
        await SeatLayout.findOne({
          bus: busId,
        }).populate("bus");

      if (!seatLayout) {
        const error = new Error(
          "Seat layout not found",
        );

        error.statusCode = 404;
        throw error;
      }

      return seatLayout;
    } catch (error) {
      throw error;
    }
  };