import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { toast } from "sonner";

import {
  getAllCustomersForBooking,
  getAllTripsForBooking,
  getAvailableSeatsForBooking,
  createOfflineBooking,
} from "../../services/offlineBookingService";

const CreateOfflineBooking = () => {
  const queryClient = useQueryClient();

  // Selected customer
  const [customerId, setCustomerId] = useState("");

  // Selected trip
  const [tripId, setTripId] = useState("");

  // Selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Get all customers

  const { data: customers = [], isLoading: customersLoading } = useQuery({
    queryKey: ["booking-staff-customers"],
    queryFn: getAllCustomersForBooking,
  });

  // Get all trips

  const { data: trips = [], isLoading: tripsLoading } = useQuery({
    queryKey: ["booking-staff-trips"],
    queryFn: getAllTripsForBooking,
  });

  // Get available seats

  const {
    data: seats = [],
    isLoading: seatsLoading,
    isError: seatsError,
  } = useQuery({
    queryKey: ["booking-staff-seats", tripId],

    queryFn: () => getAvailableSeatsForBooking(tripId),

    // Don't call API until a trip is selected
    enabled: Boolean(tripId),
  });

  // Create offline booking

  const bookingMutation = useMutation({
    mutationFn: createOfflineBooking,

    onSuccess: () => {
      toast.success("Offline booking created successfully");

      // Refresh available seats
      queryClient.invalidateQueries({
        queryKey: ["booking-staff-seats", tripId],
      });

      // Reset form
      setCustomerId("");
      setTripId("");
      setSelectedSeats([]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create booking");
    },
  });

  // Select / deselect seat

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((previousSeats) => {
      // If already selected → remove it
      if (previousSeats.includes(seatNumber)) {
        return previousSeats.filter((seat) => seat !== seatNumber);
      }

      // Otherwise → select it
      return [...previousSeats, seatNumber];
    });
  };

  // Trip change

  const handleTripChange = (event) => {
    const newTripId = event.target.value;

    setTripId(newTripId);

    // Clear previously selected seats
    setSelectedSeats([]);
  };

  // Create booking

  const handleCreateBooking = () => {
    // Customer validation
    if (!customerId) {
      toast.error("Please select a customer");
      return;
    }

    // Trip validation
    if (!tripId) {
      toast.error("Please select a trip");
      return;
    }

    // Seat validation
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    // Send booking request
    bookingMutation.mutate({
      customerId,
      tripId,
      seatNumbers: selectedSeats,
    });
  };

  return (
    <Box>
      {/* Page heading */}

      <Typography variant="h5" fontWeight={600} mb={3}>
        Create Offline Booking
      </Typography>

      <Card>
        <CardContent>
          {/*
              CUSTOMER
          */}

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Customer</InputLabel>

            <Select
              value={customerId}
              label="Select Customer"
              onChange={(event) => setCustomerId(event.target.value)}
              disabled={customersLoading}
            >
              {customers.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name} — {customer.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 
              TRIP
         */}

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Trip</InputLabel>

            <Select
              value={tripId}
              label="Select Trip"
              onChange={handleTripChange}
              disabled={tripsLoading}
            >
              {trips
                .filter((trip) => trip.tripStatus === "SCHEDULED")
                .map((trip) => (
                  <MenuItem key={trip._id} value={trip._id}>
                    {/* ID is NOT displayed */}
                    {new Date(trip.travelDate).toLocaleDateString()}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/*
              SEATS
          */}

          {tripId && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" mb={2}>
                Select Seats
              </Typography>

              {seatsLoading ? (
                <CircularProgress size={28} />
              ) : seatsError ? (
                <Typography color="error">
                  Unable to load seats for this trip.
                </Typography>
              ) : seats.length === 0 ? (
                <Typography color="text.secondary">
                  No seats available.
                </Typography>
              ) : (
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {seats.map((seat) => (
                    <Chip
                      key={seat.seatNumber}
                      label={seat.seatNumber}
                      disabled={seat.isBooked}
                      clickable={!seat.isBooked}
                      color={
                        selectedSeats.includes(seat.seatNumber)
                          ? "primary"
                          : "default"
                      }
                      onClick={() => handleSeatClick(seat.seatNumber)}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          )}

          {/* 
              SELECTED SEATS
          */}

          {selectedSeats.length > 0 && (
            <Typography mb={3}>
              Selected seats: <strong>{selectedSeats.join(", ")}</strong>
            </Typography>
          )}

          {/*
              CREATE BOOKING BUTTON
         */}

          <Button
            variant="contained"
            onClick={handleCreateBooking}
            disabled={bookingMutation.isPending || seatsLoading || seatsError}
          >
            {bookingMutation.isPending
              ? "Creating Booking..."
              : "Create Booking"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateOfflineBooking;
