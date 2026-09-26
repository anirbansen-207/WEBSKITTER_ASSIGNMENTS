import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";

import { getAllTrips } from "../../services/tripService";

const CustomerTrips = () => {
  const navigate = useNavigate();

  const {
    data: trips = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips,
  });

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

  if (isError) {
    return (
      <Typography color="error">
        Failed to load trips: {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      {/* ================= HEADER ================= */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        Book Your Ticket
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >
        Select a trip and choose your seats.
      </Typography>

      {/* ================= TRIPS ================= */}

      {trips.length === 0 ? (
        <Typography color="text.secondary">
          No trips available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={trip._id}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Bus */}
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                  >
                    {trip.busId?.busName || "Bus"}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Bus Number:{" "}
                    {trip.busId?.busNumber || "-"}
                  </Typography>

                  {/* Route */}
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                    }}
                  >
                    {trip.routeId?.sourceCity || "-"}{" "}
                    →{" "}
                    {trip.routeId?.destinationCity || "-"}
                  </Typography>

                  {/* Travel Date */}
                  <Typography sx={{ mb: 1 }}>
                    <strong>Travel Date:</strong>{" "}
                    {trip.travelDate
                      ? new Date(
                          trip.travelDate
                        ).toLocaleDateString()
                      : "-"}
                  </Typography>

                  {/* Departure */}
                  <Typography sx={{ mb: 1 }}>
                    <strong>Departure:</strong>{" "}
                    {trip.departureTime
                      ? new Date(
                          trip.departureTime
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </Typography>

                  {/* Arrival */}
                  <Typography sx={{ mb: 2 }}>
                    <strong>Arrival:</strong>{" "}
                    {trip.arrivalTime
                      ? new Date(
                          trip.arrivalTime
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </Typography>

                  {/* Status */}
                  <Chip
                    label={
                      trip.tripStatus || "SCHEDULED"
                    }
                    size="small"
                    sx={{
                      mb: 3,
                    }}
                  />

                  {/* View Trip / Book */}
                  <Box>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        navigate(
                          `/customer/trips/${trip._id}`
                        )
                      }
                    >
                      VIEW & BOOK
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CustomerTrips;