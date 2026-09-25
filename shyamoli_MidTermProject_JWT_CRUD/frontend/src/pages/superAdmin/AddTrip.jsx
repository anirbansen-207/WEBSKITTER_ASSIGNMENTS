import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getAllRoutes } from "../../services/routeService";
import { getAllBuses } from "../../services/busService";
import { getAllDrivers } from "../../services/driverService";
import { createTrip } from "../../services/tripService";

const AddTrip = () => {
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

  // Get all routes
  const {
    data: routes,
    isLoading: routesLoading,
    isError: routesError,
  } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });

  // Get all buses
  const {
    data: buses,
    isLoading: busesLoading,
    isError: busesError,
  } = useQuery({
    queryKey: ["buses"],
    queryFn: getAllBuses,
  });

  // Get all drivers
  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
  });

  // Create trip
  const createMutation = useMutation({
    mutationFn: createTrip,

    onSuccess: () => {
      toast.success("Trip created successfully");

      navigate("/super-admin/trips");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create trip",
      );
    },
  });

  // Handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    createMutation.mutate(formData);
  };

  // Loading
  if (
    routesLoading ||
    busesLoading ||
    driversLoading
  ) {
    return <Typography>Loading...</Typography>;
  }

  // Error
  if (routesError || busesError || driversError) {
    return (
      <Typography color="error">
        Failed to load routes, buses, or drivers.
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
        Add Trip
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
          placeholder="Example: 5 hours"
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
            disabled={createMutation.isPending}
          >
            {createMutation.isPending
              ? "Creating..."
              : "Create Trip"}
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

export default AddTrip;