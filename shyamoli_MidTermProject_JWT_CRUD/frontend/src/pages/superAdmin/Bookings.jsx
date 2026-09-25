import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  getAllBookings,
  cancelBooking,
} from "../../services/adminBookingService";

const Bookings = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch all bookings
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  // Cancel booking
  const cancelMutation = useMutation({
    mutationFn: cancelBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  const handleCancel = (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) {
      return;
    }

    cancelMutation.mutate(bookingId);
  };

  if (isLoading) {
    return <Typography>Loading bookings...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load bookings: {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Booking Management
      </Typography>

      {bookings?.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        bookings?.map((booking) => (
          <Card key={booking._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Booking ID: {booking._id}</Typography>

              <Typography>
                <strong>Trip:</strong> {booking.tripId?.routeId?.sourceCity} →{" "}
                {booking.tripId?.routeId?.destinationCity}
              </Typography>

              <Typography>
                <strong>Customer:</strong> {booking.customerId?.name || "N/A"}
              </Typography>

              <Typography>
                <strong>Seats:</strong>{" "}
                {booking.seatNumbers?.join(", ") || "N/A"}
              </Typography>

              <Typography>
                <strong>Status:</strong> {booking.status || "N/A"}
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 2, mr: 2 }}
                onClick={() => navigate(`/super-admin/bookings/${booking._id}`)}
              >
                View Details
              </Button>

              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                disabled={
                  cancelMutation.isPending ||
                  booking.bookingStatus === "CANCELLED"
                }
                onClick={() => handleCancel(booking._id)}
              >
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Bookings;
