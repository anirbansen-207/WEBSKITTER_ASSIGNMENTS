import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleBooking } from "../../services/adminBookingService";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getSingleBooking(bookingId),
  });

  if (isLoading) {
    return <Typography>Loading booking...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load booking: {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>

      <Card sx={{ maxWidth: 700 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Booking ID: {booking._id}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Customer:</strong>{" "}
            {booking.customerId?.name || "N/A"}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Email:</strong>{" "}
            {booking.customerId?.email || "N/A"}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Trip:</strong>{" "}
            {booking.tripId?.routeId?.sourceCity || "N/A"} →{" "}
            {booking.tripId?.routeId?.destinationCity || "N/A"}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Seats:</strong>{" "}
            {booking.seatNumbers?.join(", ") || "N/A"}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Ticket Price:</strong>{" "}
            ₹{booking.ticketPrice ?? "N/A"}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            <strong>Status:</strong>{" "}
            {booking.status || "N/A"}
          </Typography>

          <Button
            variant="outlined"
            onClick={() => navigate("/super-admin/bookings")}
          >
            Back to Bookings
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingDetails;