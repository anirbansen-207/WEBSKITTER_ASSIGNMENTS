import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { createPayment } from "../../services/paymentService";
import { createTicket } from "../../services/ticketService";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Booking received from SeatSelection page.
  const booking = location.state?.booking;

  // Selected payment method.
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Controls the button while payment/ticket is being processed.
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <Box>
        <Typography variant="h5">
          Booking information not found.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/customer/trips")}
        >
          Back to Trips
        </Button>
      </Box>
    );
  }

const handlePayment = async () => {
  try {
    setLoading(true);

    const paymentData = {
      bookingId: booking._id,
      paymentMethod,
    };

    console.log("Payment data:", paymentData);

    try {
      // Try to create payment.
      const payment = await createPayment(paymentData);

      console.log("Payment successful:", payment);
    } catch (paymentError) {
      // If payment already exists,
      // we can continue to ticket generation.
      const message = paymentError.response?.data?.message;

      if (message !== "Payment already exists") {
        throw paymentError;
      }

      console.log(
        "Payment already exists. Proceeding to ticket generation.",
      );
    }

    // Payment either:
    // 1. was just created successfully
    // OR
    // 2. already existed successfully.
    //
    // So now generate the ticket.
    const ticket = await createTicket(booking._id);

    console.log("Ticket generated successfully:", ticket);

    navigate("/customer/ticket", {
      state: {
        ticket,
      },
    });
  } catch (error) {
    console.error("Payment/Ticket failed:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">
            Booking Summary
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Booking ID: {booking._id}
          </Typography>

          <Typography>
            Seats: {booking.seatNumbers?.join(", ")}
          </Typography>

          <Typography>
            Amount: ₹{booking.totalAmount}
          </Typography>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>Payment Method</InputLabel>

            <Select
              value={paymentMethod}
              label="Payment Method"
              onChange={(event) =>
                setPaymentMethod(event.target.value)
              }
            >
              <MenuItem value="UPI">UPI</MenuItem>

              <MenuItem value="CARD">Card</MenuItem>

              <MenuItem value="NET_BANKING">
                Net Banking
              </MenuItem>

              <MenuItem value="CASH">Cash</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : `Pay ₹${booking.totalAmount}`}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payment;