import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  getOwnBookings,
  cancelBooking,
  getTicket,
} from "../../services/customerService";

const MyBookings = () => {
  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  // =========================================================
  // FETCH CUSTOMER BOOKINGS
  // =========================================================

  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-bookings"],

    queryFn: getOwnBookings,
  });

  // =========================================================
  // CANCEL BOOKING
  // =========================================================

  const cancelMutation =
    useMutation({
      mutationFn: cancelBooking,

      onSuccess: () => {
        // Fetch bookings again
        // after cancellation.
        queryClient.invalidateQueries(
          {
            queryKey: [
              "my-bookings",
            ],
          },
        );
      },

      onError: (error) => {
        console.error(
          "Cancellation failed:",
          error,
        );
      },
    });

  // =========================================================
  // VIEW TICKET
  // =========================================================

  const ticketMutation =
    useMutation({
      mutationFn: getTicket,

      onSuccess: (
        ticket,
        bookingId,
      ) => {
        console.log(
          "Ticket fetched successfully:",
          ticket,
        );

        // IMPORTANT:
        //
        // Include bookingId in URL so
        // Ticket.jsx can recover the ticket
        // after a browser refresh.
        navigate(
          `/customer/ticket?bookingId=${bookingId}`,
          {
            state: {
              ticket,
            },
          },
        );
      },

      onError: (error) => {
        console.error(
          "Failed to fetch ticket:",
          error,
        );
      },
    });

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <p>
        Loading your bookings...
      </p>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (isError) {
    return (
      <p>
        Failed to load bookings:{" "}
        {error.message}
      </p>
    );
  }

  // =========================================================
  // EMPTY
  // =========================================================

  if (
    !bookings ||
    bookings.length === 0
  ) {
    return (
      <Box>
        <Typography variant="h4">
          My Bookings
        </Typography>

        <Typography sx={{ mt: 2 }}>
          You don't have any
          bookings yet.
        </Typography>
      </Box>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
      >
        My Bookings
      </Typography>

      {bookings.map((booking) => (
        <Card
          key={booking._id}
          sx={{ mb: 3 }}
        >
          <CardContent>
            {/* Route */}

            <Typography variant="h6">
              {
                booking.tripId
                  ?.routeId
                  ?.sourceCity
              }

              {" → "}

              {
                booking.tripId
                  ?.routeId
                  ?.destinationCity
              }
            </Typography>

            {/* Bus */}

            <Typography
              sx={{ mt: 2 }}
            >
              <strong>
                Bus:
              </strong>{" "}
              {
                booking.tripId
                  ?.busId
                  ?.busName
              }
            </Typography>

            {/* Bus Number */}

            <Typography>
              <strong>
                Bus Number:
              </strong>{" "}
              {
                booking.tripId
                  ?.busId
                  ?.busNumber
              }
            </Typography>

            {/* Seats */}

            <Typography>
              <strong>
                Seat(s):
              </strong>{" "}
              {booking.seatNumbers?.join(
                ", ",
              )}
            </Typography>

            {/* Travel Date */}

            <Typography>
              <strong>
                Travel Date:
              </strong>{" "}
              {
                booking.tripId
                  ?.travelDate
              }
            </Typography>

            {/* Departure */}

            <Typography>
              <strong>
                Departure:
              </strong>{" "}
              {
                booking.tripId
                  ?.departureTime
              }
            </Typography>

            {/* Amount */}

            <Typography>
              <strong>
                Amount:
              </strong>{" "}
              ₹
              {booking.totalAmount}
            </Typography>

            {/* Status */}

            <Typography sx={{ mt: 1 }}>
              <strong>
                Status:
              </strong>{" "}
              {booking.status}
            </Typography>

            {/* ================= VIEW TICKET ================= */}

            <Button
              variant="contained"
              sx={{
                mt: 2,
                mr: 2,
              }}
              onClick={() =>
                ticketMutation.mutate(
                  booking._id,
                )
              }
              disabled={
                ticketMutation.isPending
              }
            >
              {ticketMutation.isPending
                ? "Loading Ticket..."
                : "View Ticket"}
            </Button>

            {/* ================= CANCEL ================= */}

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() =>
                cancelMutation.mutate(
                  booking._id,
                )
              }
              disabled={
                cancelMutation.isPending ||
                booking.status ===
                  "CANCELLED"
              }
            >
              {booking.status ===
              "CANCELLED"
                ? "Booking Cancelled"
                : cancelMutation.isPending
                  ? "Cancelling..."
                  : "Cancel Booking"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyBookings;