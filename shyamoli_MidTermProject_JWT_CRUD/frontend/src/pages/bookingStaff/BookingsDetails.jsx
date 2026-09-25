import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { toast } from "sonner";

import axiosInstance from "../../services/axios";
import { createStaffTicket } from "../../services/offlineBookingService";

// Get all bookings
const getAllBookingsForStaff = async () => {
  const response = await axiosInstance.get("/api/booking/all_bookings");

  return response.data.data;
};

// Cancel booking
const cancelBookingForStaff = async (bookingId) => {
  const response = await axiosInstance.patch(
    `/api/booking/cancel_booking/${bookingId}`,
  );

  return response.data.data;
};

const BookingsDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch bookings
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking-staff-bookings"],
    queryFn: getAllBookingsForStaff,
  });

  // Cancel booking mutation
  const cancelMutation = useMutation({
    mutationFn: cancelBookingForStaff,

    onSuccess: () => {
      toast.success("Booking cancelled successfully");

      queryClient.invalidateQueries({
        queryKey: ["booking-staff-bookings"],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to cancel booking");
    },
  });

  // Generate ticket mutation
  const ticketMutation = useMutation({
    mutationFn: createStaffTicket,

    onSuccess: (ticket) => {
      toast.success("Ticket generated successfully");

      navigate("/booking-staff/print-ticket", {
        state: {
          ticket,
        },
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to generate ticket",
      );
    },
  });

  // Handle cancellation
  const handleCancelBooking = (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    cancelMutation.mutate(bookingId);
  };

  // Handle ticket generation
  const handlePrintTicket = (bookingId) => {
    ticketMutation.mutate(bookingId);
  };

  // Loading
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error
  if (isError) {
    return <Typography color="error">Failed to load bookings.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Bookings
      </Typography>

      <Card>
        <CardContent>
          {bookings.length === 0 ? (
            <Typography color="text.secondary">No bookings found.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell>Route</TableCell>
                    <TableCell>Travel Date</TableCell>
                    <TableCell>Trip Status</TableCell>
                    <TableCell>Seats</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Booking Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      {/* Customer */}
                      <TableCell>{booking.customerId?.name || "-"}</TableCell>

                      {/* Route */}
                      <TableCell>
                        {booking.tripId?.routeId?.sourceCity || "-"} →{" "}
                        {booking.tripId?.routeId?.destinationCity || "-"}
                      </TableCell>

                      {/* Travel Date */}
                      <TableCell>
                        {booking.tripId?.travelDate
                          ? new Date(
                              booking.tripId.travelDate,
                            ).toLocaleDateString()
                          : "-"}
                      </TableCell>

                      {/* Trip Status */}
                      <TableCell>
                        <Chip
                          label={booking.tripId?.tripStatus || "-"}
                          size="small"
                        />
                      </TableCell>

                      {/* Seats */}
                      <TableCell>
                        {booking.seatNumbers?.join(", ") || "-"}
                      </TableCell>

                      {/* Amount */}
                      <TableCell>₹{booking.totalAmount}</TableCell>

                      {/* Booking Status */}
                      <TableCell>
                        <Chip label={booking.status || "-"} size="small" />
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        {booking.status === "CONFIRMED" &&
                        booking.tripId?.tripStatus === "SCHEDULED" ? (
                          <>
                            {/* Print Ticket */}
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handlePrintTicket(booking._id)}
                              disabled={ticketMutation.isPending}
                              sx={{ mr: 1 }}
                            >
                              Print Ticket
                            </Button>

                            {/* Cancel */}
                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              onClick={() => handleCancelBooking(booking._id)}
                              disabled={cancelMutation.isPending}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingsDetails;
