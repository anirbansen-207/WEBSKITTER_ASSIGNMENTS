import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  getMyDriverProfile,
  getMyAssignedTrips,
  getTripPassengers,
} from "../../services/driverService";

const DriverDashboard = () => {
  const [selectedTripId, setSelectedTripId] =
    useState(null);

  // Driver profile
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["driver-profile"],
    queryFn: getMyDriverProfile,
  });

  // Assigned trips
  const {
    data: trips = [],
    isLoading: tripsLoading,
    isError: tripsError,
  } = useQuery({
    queryKey: ["driver-assigned-trips"],
    queryFn: getMyAssignedTrips,
  });

  // Passengers
  const {
    data: passengers = [],
    isLoading: passengersLoading,
    isError: passengersError,
  } = useQuery({
    queryKey: [
      "driver-trip-passengers",
      selectedTripId,
    ],
    queryFn: () =>
      getTripPassengers(selectedTripId),
    enabled: Boolean(selectedTripId),
  });

  if (profileLoading || tripsLoading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (profileError || tripsError) {
    return (
      <Typography color="error">
        Failed to load driver dashboard.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      {/* ================= HERO ================= */}

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
          color: "white",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, md: 5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 2,
                backgroundColor:
                  "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DirectionsBusIcon
                sx={{ fontSize: 36 }}
              />
            </Box>

            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                Driver Dashboard
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  opacity: 0.85,
                }}
              >
                Welcome back,{" "}
                {profile?.name || "Driver"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ================= DRIVER INFORMATION ================= */}

      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Driver Information
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              height: "100%",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonIcon />
                </Box>

                <Box>
                  <Typography
                    color="text.secondary"
                    fontSize={14}
                  >
                    Driver Name
                  </Typography>

                  <Typography
                    fontWeight={700}
                    fontSize={18}
                  >
                    {profile?.name || "-"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                color="text.secondary"
                fontSize={14}
              >
                Email
              </Typography>

              <Typography
                fontWeight={700}
                sx={{ mt: 1 }}
              >
                {profile?.email || "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                color="text.secondary"
                fontSize={14}
              >
                Phone
              </Typography>

              <Typography
                fontWeight={700}
                sx={{ mt: 1 }}
              >
                {profile?.phone || "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= ASSIGNED TRIPS ================= */}

      {!selectedTripId ? (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Assigned Trips
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Trips assigned to you by the
              administrator.
            </Typography>
          </Box>

          {trips.length === 0 ? (
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  py: 6,
                }}
              >
                <DirectionsBusIcon
                  sx={{
                    fontSize: 55,
                    color: "text.secondary",
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{ mt: 1 }}
                >
                  No trips assigned
                </Typography>
              </CardContent>
            </Card>
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
                    onClick={() =>
                      setSelectedTripId(
                        trip._id
                      )
                    }
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border:
                        "1px solid #e5e7eb",
                      cursor: "pointer",
                      transition:
                        "all 0.25s ease",

                      "&:hover": {
                        transform:
                          "translateY(-5px)",
                        boxShadow: 5,
                        borderColor:
                          "#1976d2",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                      >
                        {trip.routeId
                          ?.sourceCity || "-"}{" "}
                        →{" "}
                        {trip.routeId
                          ?.destinationCity ||
                          "-"}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <DirectionsBusIcon
                          color="primary"
                        />

                        <Typography
                          fontWeight={600}
                        >
                          {trip.busId?.busName ||
                            "-"}
                        </Typography>
                      </Box>

                      <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Bus Number:{" "}
                        {trip.busId?.busNumber ||
                          "-"}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography
                          color="text.secondary"
                          fontSize={14}
                        >
                          Travel Date
                        </Typography>

                        <Typography
                          fontWeight={600}
                        >
                          {trip.travelDate
                            ? new Date(
                                trip.travelDate
                              ).toLocaleDateString()
                            : "-"}
                        </Typography>
                      </Box>

                      <Grid
                        container
                        spacing={2}
                        sx={{ mt: 1 }}
                      >
                        <Grid item xs={6}>
                          <Typography
                            color="text.secondary"
                            fontSize={14}
                          >
                            Departure
                          </Typography>

                          <Typography
                            fontWeight={600}
                          >
                            {trip.departureTime
                              ? new Date(
                                  trip.departureTime
                                ).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute:
                                      "2-digit",
                                  }
                                )
                              : "-"}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography
                            color="text.secondary"
                            fontSize={14}
                          >
                            Arrival
                          </Typography>

                          <Typography
                            fontWeight={600}
                          >
                            {trip.arrivalTime
                              ? new Date(
                                  trip.arrivalTime
                                ).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute:
                                      "2-digit",
                                  }
                                )
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 2 }}>
                        <Chip
                          label={
                            trip.tripStatus ||
                            "-"
                          }
                          size="small"
                          color="primary"
                        />
                      </Box>

                      <Typography
                        sx={{
                          mt: 2,
                          color: "#1976d2",
                          fontWeight: 600,
                        }}
                      >
                        View Passengers →
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <>
          {/* ================= PASSENGERS ================= */}

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                onClick={() =>
                  setSelectedTripId(null)
                }
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  border:
                    "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",

                  "&:hover": {
                    backgroundColor:
                      "#f1f5f9",
                  },
                }}
              >
                <ArrowBackIcon />
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  Passenger List
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Passengers booked for this
                  trip.
                </Typography>
              </Box>
            </Box>
          </Box>

          {passengersLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          ) : passengersError ? (
            <Typography color="error">
              Failed to load passengers.
            </Typography>
          ) : passengers.length === 0 ? (
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  py: 6,
                }}
              >
                <PeopleIcon
                  sx={{
                    fontSize: 55,
                    color: "text.secondary",
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{ mt: 1 }}
                >
                  No passengers
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  No confirmed passengers have
                  booked this trip yet.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            >
              <TableContainer
                component={Paper}
                elevation={0}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>
                          Passenger
                        </strong>
                      </TableCell>

                      <TableCell>
                        <strong>
                          Phone
                        </strong>
                      </TableCell>

                      <TableCell>
                        <strong>
                          Email
                        </strong>
                      </TableCell>

                      <TableCell>
                        <strong>
                          Seat
                        </strong>
                      </TableCell>

                      <TableCell>
                        <strong>
                          Status
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {passengers.map(
                      (booking) => (
                        <TableRow
                          key={booking._id}
                        >
                          <TableCell>
                            {booking.customerId
                              ?.name || "-"}
                          </TableCell>

                          <TableCell>
                            {booking.customerId
                              ?.phone || "-"}
                          </TableCell>

                          <TableCell>
                            {booking.customerId
                              ?.email || "-"}
                          </TableCell>

                          <TableCell>
                            {booking.seatNumbers?.join(
                              ", "
                            ) || "-"}
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={
                                booking.status ||
                                "-"
                              }
                              size="small"
                              color="success"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default DriverDashboard;