import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import {
  getAvailableSeats,
  createBooking,
} from "../../services/bookingService";

const SeatSelection = () => {
  const navigate = useNavigate();

  const { tripId } = useParams();

  // Stores selected seat numbers.
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Get available seats.
  const {
    data: seats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["available-seats", tripId],
    queryFn: () => getAvailableSeats(tripId),
    enabled: !!tripId,
  });

  // Create booking mutation.
  const bookingMutation = useMutation({
    mutationFn: createBooking,

    onSuccess: (data) => {
      console.log("Booking created successfully:", data);

      navigate("/customer/payment", {
        state: {
          booking: data,
        },
      });
    },

    onError: (error) => {
      console.error("Booking failed:", error);
    },
  });

  if (isLoading) {
    return <p>Loading available seats...</p>;
  }

  if (isError) {
    return <p>Failed to load available seats: {error.message}</p>;
  }

  // Select / unselect a seat.
  const handleSeatClick = (seat) => {
    // Do not allow already booked seats.
    if (seat.isBooked) {
      return;
    }

    setSelectedSeats((previousSeats) => {
      if (previousSeats.includes(seat.seatNumber)) {
        return previousSeats.filter(
          (seatNumber) => seatNumber !== seat.seatNumber,
        );
      }

      return [...previousSeats, seat.seatNumber];
    });
  };

  // Create booking.
  const handleContinue = () => {
    const bookingData = {
      tripId,
      seatNumbers: selectedSeats,
    };

    console.log("Booking data:", bookingData);

    bookingMutation.mutate(bookingData);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Select Your Seats
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Select one or more seats for your journey.
      </Typography>

      <Grid container spacing={2}>
        {seats?.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatNumber);

          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={seat.seatNumber}>
              <Card
                onClick={() => handleSeatClick(seat)}
                sx={{
                  cursor: seat.isBooked ? "not-allowed" : "pointer",

                  border: isSelected ? "2px solid green" : "1px solid #ccc",

                  backgroundColor: seat.isBooked
                    ? "#eeeeee"
                    : isSelected
                      ? "#e8f5e9"
                      : "#fff",

                  opacity: seat.isBooked ? 0.6 : 1,
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center">
                    {seat.seatNumber}
                  </Typography>

                  <Typography variant="body2" align="center">
                    {seat.seatType}
                  </Typography>

                  <Typography variant="body2" align="center">
                    ₹{seat.ticketPrice}
                  </Typography>

                  {seat.isBooked && (
                    <Typography variant="body2" align="center">
                      Booked
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Selected Seats</Typography>

        <Typography sx={{ mt: 1 }}>
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "No seats selected"}
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        disabled={selectedSeats.length === 0 || bookingMutation.isPending}
        onClick={handleContinue}
      >
        {bookingMutation.isPending ? "Creating Booking..." : "Continue"}
      </Button>
    </Box>
  );
};

export default SeatSelection;
