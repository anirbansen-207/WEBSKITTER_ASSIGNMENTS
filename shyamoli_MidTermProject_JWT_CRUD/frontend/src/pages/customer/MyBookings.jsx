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
  const queryClient = useQueryClient();

  // Fetch all bookings of the logged-in customer
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getOwnBookings,
  });

  // Cancel booking mutation
  const cancelMutation = useMutation({
    mutationFn: cancelBooking,

    onSuccess: () => {
      // Fetch bookings again after cancellation
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });
    },

    onError: (error) => {
      console.error("Cancellation failed:", error);
    },
  });

  // View ticket mutation
  const ticketMutation = useMutation({
    mutationFn: getTicket,

    onSuccess: (ticket) => {
      console.log("Ticket fetched successfully:", ticket);

      // Send ticket data to Ticket page
      navigate("/customer/ticket", {
        state: {
          ticket,
        },
      });
    },

    onError: (error) => {
      console.error("Failed to fetch ticket:", error);
    },
  });

  if (isLoading) {
    return <p>Loading your bookings...</p>;
  }

  if (isError) {
    return (
      <p>
        Failed to load bookings: {error.message}
      </p>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Box>
        <Typography variant="h4">
          My Bookings
        </Typography>

        <Typography sx={{ mt: 2 }}>
          You don't have any bookings yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      {bookings.map((booking) => (
        <Card key={booking._id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">
              {booking.tripId?.routeId?.sourceCity}
              {" → "}
              {booking.tripId?.routeId?.destinationCity}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>Bus:</strong>{" "}
              {booking.tripId?.busId?.busName}
            </Typography>

            <Typography>
              <strong>Bus Number:</strong>{" "}
              {booking.tripId?.busId?.busNumber}
            </Typography>

            <Typography>
              <strong>Seat(s):</strong>{" "}
              {booking.seatNumbers?.join(", ")}
            </Typography>

            <Typography>
              <strong>Travel Date:</strong>{" "}
              {booking.tripId?.travelDate}
            </Typography>

            <Typography>
              <strong>Departure:</strong>{" "}
              {booking.tripId?.departureTime}
            </Typography>

            <Typography>
              <strong>Amount:</strong>{" "}
              ₹{booking.totalAmount}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Status:</strong>{" "}
              {booking.status}
            </Typography>

            {/* View Ticket button */}
            <Button
              variant="contained"
              sx={{ mt: 2, mr: 2 }}
              onClick={() => ticketMutation.mutate(booking._id)}
              disabled={ticketMutation.isPending}
            >
              {ticketMutation.isPending
                ? "Loading Ticket..."
                : "View Ticket"}
            </Button>

            {/* Cancel Booking button */}
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => cancelMutation.mutate(booking._id)}
              disabled={
                cancelMutation.isPending ||
                booking.status === "CANCELLED"
              }
            >
              {booking.status === "CANCELLED"
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