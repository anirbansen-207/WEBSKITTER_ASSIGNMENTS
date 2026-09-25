import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getAllRoutes } from "../../services/routeService";
import { getAllBuses } from "../../services/busService";
import { getAllDrivers } from "../../services/driverService";
import {
  getSingleTrip,
  updateTrip,
} from "../../services/tripService";

const EditTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    routeId: "",
    busId: "",
    driverId: "",
    travelDate: "",
    departureTime: "",
    arrivalTime: "",
    estimatedTravelTime: "",
  });

  // Get single trip
  const {
    data: trip,
    isLoading: tripLoading,
    isError: tripError,
  } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getSingleTrip(tripId),
  });

  // Get routes
  const { data: routes } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });

  // Get buses
  const { data: buses } = useQuery({
    queryKey: ["buses"],
    queryFn: getAllBuses,
  });

  // Get drivers
  const { data: drivers } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
  });

  // Put existing trip data into form
  useEffect(() => {
    if (!trip) return;

    setFormData({
      routeId: trip.routeId?._id || trip.routeId || "",
      busId: trip.busId?._id || trip.busId || "",
      driverId: trip.driverId?._id || trip.driverId || "",

      travelDate: trip.travelDate
        ? new Date(trip.travelDate)
            .toISOString()
            .split("T")[0]
        : "",

      departureTime: trip.departureTime
        ? formatDateTimeLocal(trip.departureTime)
        : "",

      arrivalTime: trip.arrivalTime
        ? formatDateTimeLocal(trip.arrivalTime)
        : "",

      estimatedTravelTime:
        trip.estimatedTravelTime || "",
    });
  }, [trip]);

  // Update trip
  const updateMutation = useMutation({
    mutationFn: updateTrip,

    onSuccess: () => {
      toast.success("Trip updated successfully");

      navigate("/super-admin/trips");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update trip",
      );
    },
  });

  // Handle input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    updateMutation.mutate({
      tripId,
      tripData: formData,
    });
  };

  if (tripLoading) {
    return <Typography>Loading trip...</Typography>;
  }

  if (tripError) {
    return (
      <Typography color="error">
        Failed to load trip.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Edit Trip
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Route */}
        <TextField
          select
          label="Route"
          name="routeId"
          value={formData.routeId}
          onChange={handleChange}
          required
        >
          {routes?.map((route) => (
            <MenuItem
              key={route._id}
              value={route._id}
            >
              {route.sourceCity} →{" "}
              {route.destinationCity}
            </MenuItem>
          ))}
        </TextField>

        {/* Bus */}
        <TextField
          select
          label="Bus"
          name="busId"
          value={formData.busId}
          onChange={handleChange}
          required
        >
          {buses?.map((bus) => (
            <MenuItem
              key={bus._id}
              value={bus._id}
            >
              {bus.busName} - {bus.busNumber}
            </MenuItem>
          ))}
        </TextField>

        {/* Driver */}
        <TextField
          select
          label="Driver"
          name="driverId"
          value={formData.driverId}
          onChange={handleChange}
          required
        >
          {drivers?.map((driver) => (
            <MenuItem
              key={driver._id}
              value={driver._id}
            >
              {driver.name} - {driver.phone}
            </MenuItem>
          ))}
        </TextField>

        {/* Travel Date */}
        <TextField
          label="Travel Date"
          name="travelDate"
          type="date"
          value={formData.travelDate}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          required
        />

        {/* Departure Time */}
        <TextField
          label="Departure Time"
          name="departureTime"
          type="datetime-local"
          value={formData.departureTime}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          required
        />

        {/* Arrival Time */}
        <TextField
          label="Arrival Time"
          name="arrivalTime"
          type="datetime-local"
          value={formData.arrivalTime}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          required
        />

        {/* Estimated Travel Time */}
        <TextField
          label="Estimated Travel Time"
          name="estimatedTravelTime"
          value={formData.estimatedTravelTime}
          onChange={handleChange}
          required
        />

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending
              ? "Updating..."
              : "Update Trip"}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={() =>
              navigate("/super-admin/trips")
            }
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditTrip;


// Convert backend ISO date into
// datetime-local input format.
const formatDateTimeLocal = (date) => {
  const value = new Date(date);

  const year = value.getFullYear();
  const month = String(
    value.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(
    value.getDate(),
  ).padStart(2, "0");
  const hours = String(
    value.getHours(),
  ).padStart(2, "0");
  const minutes = String(
    value.getMinutes(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};