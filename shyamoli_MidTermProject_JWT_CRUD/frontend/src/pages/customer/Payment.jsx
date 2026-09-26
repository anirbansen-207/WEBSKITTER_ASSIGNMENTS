import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Alert,
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
  const booking =
    location.state?.booking;

  // Selected payment method.
  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("UPI");

  // Controls the button while
  // payment/ticket is being processed.
  const [loading, setLoading] =
    useState(false);

  // Payment/ticket error
  const [error, setError] =
    useState("");

  // =========================================================
  // NO BOOKING
  // =========================================================

  if (!booking) {
    return (
      <Box>
        <Typography variant="h5">
          Booking information not found.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() =>
            navigate(
              "/customer/trips",
            )
          }
        >
          Back to Trips
        </Button>
      </Box>
    );
  }

  // =========================================================
  // HANDLE PAYMENT
  // =========================================================

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const paymentData = {
        bookingId: booking._id,
        paymentMethod,
      };

      console.log(
        "Payment data:",
        paymentData,
      );

      try {
        // Internal payment workflow
        const payment =
          await createPayment(
            paymentData,
          );

        console.log(
          "Payment successful:",
          payment,
        );
      } catch (paymentError) {
        // If payment already exists,
        // continue to ticket generation.
        const message =
          paymentError?.response
            ?.data?.message;

        if (
          message !==
          "Payment already exists"
        ) {
          throw paymentError;
        }

        console.log(
          "Payment already exists. Proceeding to ticket generation.",
        );
      }

      // Payment either:
      //
      // 1. was just created successfully
      //
      // OR
      //
      // 2. already existed successfully.
      //
      // Now generate the ticket.

      const ticket =
        await createTicket(
          booking._id,
        );

      console.log(
        "Ticket generated successfully:",
        ticket,
      );

      // IMPORTANT:
      // bookingId is included in the URL.
      //
      // If the customer refreshes the ticket page,
      // Ticket.jsx can fetch the ticket again.
      navigate(
        `/customer/ticket?bookingId=${booking._id}`,
        {
          state: {
            ticket,
          },
        },
      );
    } catch (error) {
      console.error(
        "Payment/Ticket failed:",
        error,
      );

      setError(
        error?.response?.data?.message ||
          "Payment failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <Box
      sx={{
        maxWidth: 600,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Payment
      </Typography>

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="h6">
            Booking Summary
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Booking ID:{" "}
            {booking._id}
          </Typography>

          <Typography>
            Seats:{" "}
            {booking.seatNumbers?.join(
              ", ",
            )}
          </Typography>

          <Typography>
            Amount: ₹
            {booking.totalAmount}
          </Typography>

          {/* Payment Method */}
          <FormControl
            fullWidth
            sx={{ mt: 3 }}
          >
            <InputLabel>
              Payment Method
            </InputLabel>

            <Select
              value={paymentMethod}
              label="Payment Method"
              onChange={(event) =>
                setPaymentMethod(
                  event.target.value,
                )
              }
            >
              <MenuItem value="UPI">
                UPI
              </MenuItem>

              <MenuItem value="CARD">
                Card
              </MenuItem>

              <MenuItem value="NET_BANKING">
                Net Banking
              </MenuItem>

              <MenuItem value="CASH">
                Cash
              </MenuItem>
            </Select>
          </FormControl>

          {/* Pay */}
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