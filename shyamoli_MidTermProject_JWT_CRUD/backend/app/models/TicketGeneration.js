import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    sourceCity: {
      type: String,
      required: true,
    },

    destinationCity: {
      type: String,
      required: true,
    },

    busNumber: {
      type: String,
      required: true,
    },

    busName: {
      type: String,
      required: true,
    },

    seatNumbers: {
      type: [String],
      required: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    departureTime: {
      type: Date,
      required: true,
    },

    arrivalTime: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    ticketStatus: {
      type: String,
      enum: [
        "ACTIVE",
        "CANCELLED",
      ],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

const Ticket =
  mongoose.model(
    "Ticket",
    ticketSchema,
  );

export default Ticket;