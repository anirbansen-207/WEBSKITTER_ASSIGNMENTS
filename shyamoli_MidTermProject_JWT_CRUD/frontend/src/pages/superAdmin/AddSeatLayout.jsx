import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleBus } from "../../services/busService";
import { createSeatLayout } from "../../services/seatLayoutService";
import { toast } from "sonner";

const AddSeatLayout = () => {
  const { busId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);

  // Get bus details
  const {
    data: bus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bus", busId],
    queryFn: () => getSingleBus(busId),
    enabled: !!busId,
  });

  // Create seat layout
  const mutation = useMutation({
    mutationFn: createSeatLayout,

    onSuccess: () => {
      toast.success("Seat layout created successfully");
      navigate("/super-admin/seat-layout");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create seat layout"
      );
    },
  });

  // Generate seats according to bus total seats
  useEffect(() => {
    if (bus) {
      const generatedSeats = Array.from(
        { length: bus.totalSeats },
        (_, index) => ({
          seatNumber: String(index + 1),
          seatType: "regular",
        })
      );

      setSeats(generatedSeats);
    }
  }, [bus]);

  // Change seat type
  const handleSeatTypeChange = (index, seatType) => {
    setSeats((previousSeats) =>
      previousSeats.map((seat, seatIndex) =>
        seatIndex === index
          ? { ...seat, seatType }
          : seat
      )
    );
  };

  // Submit seat layout
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      busId,
      seats,
    });
  };

  if (isLoading) {
    return <Typography>Loading bus details...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load bus: {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Seat Layout
      </Typography>

      {/* Bus Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">
            {bus.busName}
          </Typography>

          <Typography>
            <strong>Bus Number:</strong> {bus.busNumber}
          </Typography>

          <Typography>
            <strong>Total Seats:</strong> {bus.totalSeats}
          </Typography>

          <Typography>
            <strong>Ticket Price:</strong> ₹{bus.ticketPrice}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Seat Configuration
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {seats.map((seat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={seat.seatNumber}>
              <Card>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>
                    <strong>Seat {seat.seatNumber}</strong>
                  </Typography>

                  <FormControl fullWidth>
                    <InputLabel>Seat Type</InputLabel>

                    <Select
                      value={seat.seatType}
                      label="Seat Type"
                      onChange={(e) =>
                        handleSeatTypeChange(
                          index,
                          e.target.value
                        )
                      }
                    >
                      <MenuItem value="regular">
                        Regular
                      </MenuItem>

                      <MenuItem value="vip">
                        VIP
                      </MenuItem>

                      <MenuItem value="ladies">
                        Ladies
                      </MenuItem>

                      <MenuItem value="reserved">
                        Reserved
                      </MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Creating..."
            : "Create Seat Layout"}
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 3, ml: 2 }}
          onClick={() =>
            navigate("/super-admin/seat-layout")
          }
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddSeatLayout;