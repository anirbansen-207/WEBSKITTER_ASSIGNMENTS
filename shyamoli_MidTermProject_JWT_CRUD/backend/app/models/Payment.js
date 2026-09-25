import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: [
        "CARD",
        "UPI",
        "NET_BANKING",
        "CASH",
      ],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "PENDING",
        "SUCCESS",
        "FAILED",
      ],
      default: "PENDING",
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

// One successful payment per booking
paymentSchema.index(
  { bookingId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      paymentStatus: "SUCCESS",
    },
  },
);

const Payment =
  mongoose.model(
    "Payment",
    paymentSchema,
  );

export default Payment;