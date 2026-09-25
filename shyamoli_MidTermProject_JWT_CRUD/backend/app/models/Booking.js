import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    seatNumbers: {
      type: [String],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "CONFIRMED",
        "CANCELLED",
      ],
      default: "CONFIRMED",
    },

    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent the same seat from being
// confirmed twice for the same trip.
bookingSchema.index(
  {
    tripId: 1,
    seatNumbers: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: "CONFIRMED",
    },
  },
);

const Booking =
  mongoose.model(
    "Booking",
    bookingSchema,
  );

export default Booking;