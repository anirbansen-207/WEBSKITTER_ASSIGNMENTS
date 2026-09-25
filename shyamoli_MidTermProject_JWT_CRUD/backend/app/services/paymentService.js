import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

// CREATE PAYMENT
export const createPaymentService = async ({
  bookingId,
  customerId,
  paymentMethod,
}) => {
  try {
    // Find booking belonging to customer
    const booking = await Booking.findOne({
      _id: bookingId,
      customerId,
    });

    if (!booking) {
      const error = new Error(
        "Booking not found",
      );

      error.statusCode = 404;
      throw error;
    }

    // Check booking status
    if (booking.status === "CANCELLED") {
      const error = new Error(
        "Payment cannot be made for a cancelled booking",
      );

      error.statusCode = 400;
      throw error;
    }

    // Check existing successful payment
    const existingPayment =
      await Payment.findOne({
        bookingId,
        paymentStatus: "SUCCESS",
      });

    if (existingPayment) {
      const error = new Error(
        "Payment already exists",
      );

      error.statusCode = 409;
      throw error;
    }

    // Create payment
    let payment;

    try {
      payment = await Payment.create({
        bookingId,
        customerId,
        amount: booking.totalAmount,
        paymentMethod,
        paymentStatus: "SUCCESS",
        transactionId: `TXN-${Date.now()}-${Math.floor(
          Math.random() * 100000,
        )}`,
      });
    } catch (error) {
      // Handles simultaneous payment requests
      if (error.code === 11000) {
        const duplicateError =
          new Error(
            "Payment already exists for this booking",
          );

        duplicateError.statusCode = 409;

        throw duplicateError;
      }

      throw error;
    }

    return payment;
  } catch (error) {
    throw error;
  }
};