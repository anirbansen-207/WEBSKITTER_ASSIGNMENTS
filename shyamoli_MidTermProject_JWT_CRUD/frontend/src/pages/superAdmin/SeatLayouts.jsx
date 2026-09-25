import { useQuery } from "@tanstack/react-query";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getAllBuses } from "../../services/busService";

const SeatLayouts = () => {
  const navigate = useNavigate();

  // Fetch all buses
  const {
    data: buses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["buses"],
    queryFn: getAllBuses,
  });

  if (isLoading) {
    return <p>Loading buses...</p>;
  }

  if (isError) {
    return <p>Failed to load buses: {error.message}</p>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Seat Layout Management
      </Typography>

      <Typography sx={{ mb: 3 }}>
        Select a bus to create its seat layout.
      </Typography>

      {buses?.length === 0 ? (
        <Typography>
          No buses found. Create a bus first.
        </Typography>
      ) : (
        buses?.map((bus) => (
          <Card key={bus._id} sx={{ mb: 2 }}>
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

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() =>
                  navigate(`/super-admin/seat-layout/add/${bus._id}`)
                }
              >
                Create Seat Layout
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default SeatLayouts;