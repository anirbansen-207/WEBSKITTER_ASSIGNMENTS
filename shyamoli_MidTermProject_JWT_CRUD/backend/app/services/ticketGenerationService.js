import Ticket from "../models/TicketGeneration.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

const generateTicketNumber = () => {
  return `TKT-${Date.now()}-${Math.floor(
    100000 + Math.random() * 900000,
  )}`;
};

// CREATE TICKET
export const createTicketService = async ({
  bookingId,
  customerId,
}) => {
  try {
    const booking =
      await Booking.findOne({
        _id: bookingId,
        customerId,
      })
        .populate(
          "customerId",
          "name email phone",
        )
        .populate({
          path: "tripId",
          populate: [
            {
              path: "routeId",
              select:
                "sourceCity destinationCity",
            },
            {
              path: "busId",
              select:
                "busNumber busName",
            },
          ],
        });

    if (!booking) {
      const error = new Error(
        "Booking not found",
      );

      error.statusCode = 404;
      throw error;
    }

    if (booking.status === "CANCELLED") {
      const error = new Error(
        "Ticket cannot be generated for a cancelled booking",
      );

      error.statusCode = 400;
      throw error;
    }

    // Payment must be successful
    const payment =
      await Payment.findOne({
        bookingId,
        customerId,
        paymentStatus: "SUCCESS",
      });

    if (!payment) {
      const error = new Error(
        "Successful payment is required before generating ticket",
      );

      error.statusCode = 400;
      throw error;
    }

    // Check existing ticket
    const existingTicket =
      await Ticket.findOne({
        bookingId,
      });

    if (existingTicket) {
      return existingTicket;
    }

    let ticket;

    try {
      ticket = await Ticket.create({
        ticketNumber:
          generateTicketNumber(),

        bookingId,
        customerId,

        customerName:
          booking.customerId.name,

        sourceCity:
          booking.tripId.routeId
            .sourceCity,

        destinationCity:
          booking.tripId.routeId
            .destinationCity,

        busNumber:
          booking.tripId.busId
            .busNumber,

        busName:
          booking.tripId.busId
            .busName,

        seatNumbers:
          booking.seatNumbers,

        travelDate:
          booking.tripId.travelDate,

        departureTime:
          booking.tripId.departureTime,

        arrivalTime:
          booking.tripId.arrivalTime,

        amount:
          booking.totalAmount,

        ticketStatus: "ACTIVE",
      });
    } catch (error) {
      // Another request may have generated
      // the ticket at the same time.
      if (error.code === 11000) {
        const existingTicket =
          await Ticket.findOne({
            bookingId,
          });

        if (existingTicket) {
          return existingTicket;
        }
      }

      throw error;
    }

    return ticket;
  } catch (error) {
    throw error;
  }
};


// CREATE TICKET FOR BOOKING STAFF
export const createStaffTicketService = async ({
  bookingId,
}) => {
  try {
    // Find the booking
    const booking = await Booking.findById(bookingId)
      .populate("customerId", "name email phone")
      .populate({
        path: "tripId",
        populate: [
          {
            path: "routeId",
            select: "sourceCity destinationCity",
          },
          {
            path: "busId",
            select: "busNumber busName",
          },
        ],
      });

    // If booking does not exist
    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    // Cannot generate ticket for cancelled booking
    if (booking.status === "CANCELLED") {
      const error = new Error(
        "Ticket cannot be generated for a cancelled booking"
      );

      error.statusCode = 400;
      throw error;
    }

    // Ticket can only be generated for confirmed booking
    if (booking.status !== "CONFIRMED") {
      const error = new Error(
        "Ticket can only be generated for a confirmed booking"
      );

      error.statusCode = 400;
      throw error;
    }

    // Check whether ticket already exists
    const existingTicket = await Ticket.findOne({
      bookingId,
    });

    if (existingTicket) {
      return existingTicket;
    }

    // Create ticket
    const ticket = await Ticket.create({
      ticketNumber: generateTicketNumber(),

      bookingId,

      customerId: booking.customerId._id,

      customerName: booking.customerId.name,

      sourceCity:
        booking.tripId.routeId.sourceCity,

      destinationCity:
        booking.tripId.routeId.destinationCity,

      busNumber:
        booking.tripId.busId.busNumber,

      busName:
        booking.tripId.busId.busName,

      seatNumbers: booking.seatNumbers,

      travelDate:
        booking.tripId.travelDate,

      departureTime:
        booking.tripId.departureTime,

      arrivalTime:
        booking.tripId.arrivalTime,

      amount: booking.totalAmount,

      ticketStatus: "ACTIVE",
    });

    return ticket;
  } catch (error) {
    throw error;
  }
};