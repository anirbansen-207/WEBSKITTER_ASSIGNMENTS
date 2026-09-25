import { useEffect, useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getSingleRoute,
  updateRoute,
} from "../../services/routeService";

const EditRoute = () => {
  const { routeId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sourceCity: "",
    destinationCity: "",
    intermediateStops: "",
    boardingPoints: "",
    droppingPoints: "",
    routeDistance: "",
    routeStatus: "ACTIVE",
  });

  // Fetch existing route
  const {
    data: route,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["route", routeId],
    queryFn: () => getSingleRoute(routeId),
    enabled: !!routeId,
  });

  // Put existing route data into the form
  useEffect(() => {
    if (!route) return;

    setFormData({
      sourceCity: route.sourceCity || "",
      destinationCity: route.destinationCity || "",

      intermediateStops:
        route.intermediateStops?.join(", ") || "",

      boardingPoints:
        route.boardingPoints?.join(", ") || "",

      droppingPoints:
        route.droppingPoints?.join(", ") || "",

      routeDistance:
        route.routeDistance || "",

      routeStatus:
        route.routeStatus || "ACTIVE",
    });
  }, [route]);

  // Update route
  const updateMutation = useMutation({
    mutationFn: updateRoute,

    onSuccess: () => {
      console.log("Route updated successfully");

      navigate("/super-admin/routes");
    },

    onError: (error) => {
      console.error(
        "Failed to update route:",
        error,
      );
    },
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Convert comma-separated text to array
  const convertToArray = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  // Submit update
  const handleSubmit = (event) => {
    event.preventDefault();

    const routeData = {
      sourceCity: formData.sourceCity,
      destinationCity: formData.destinationCity,

      intermediateStops: convertToArray(
        formData.intermediateStops,
      ),

      boardingPoints: convertToArray(
        formData.boardingPoints,
      ),

      droppingPoints: convertToArray(
        formData.droppingPoints,
      ),

      routeDistance: Number(
        formData.routeDistance,
      ),

      routeStatus: formData.routeStatus,
    };

    console.log("Updated route data:", routeData);

    updateMutation.mutate({
      routeId,
      routeData,
    });
  };

  if (isLoading) {
    return <p>Loading route...</p>;
  }

  if (isError) {
    return (
      <p>
        Failed to load route: {error.message}
      </p>
    );
  }

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h4" gutterBottom>
        Edit Route
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
        <TextField
          label="Source City"
          name="sourceCity"
          value={formData.sourceCity}
          onChange={handleChange}
          required
        />

        <TextField
          label="Destination City"
          name="destinationCity"
          value={formData.destinationCity}
          onChange={handleChange}
          required
        />

        <TextField
          label="Intermediate Stops"
          name="intermediateStops"
          value={formData.intermediateStops}
          onChange={handleChange}
          helperText="Enter multiple stops separated by commas"
        />

        <TextField
          label="Boarding Points"
          name="boardingPoints"
          value={formData.boardingPoints}
          onChange={handleChange}
          helperText="Enter multiple points separated by commas"
        />

        <TextField
          label="Dropping Points"
          name="droppingPoints"
          value={formData.droppingPoints}
          onChange={handleChange}
          helperText="Enter multiple points separated by commas"
        />

        <TextField
          label="Route Distance (KM)"
          name="routeDistance"
          type="number"
          value={formData.routeDistance}
          onChange={handleChange}
          required
          inputProps={{ min: 0 }}
        />

        <TextField
          select
          label="Route Status"
          name="routeStatus"
          value={formData.routeStatus}
          onChange={handleChange}
        >
          <MenuItem value="ACTIVE">
            ACTIVE
          </MenuItem>

          <MenuItem value="INACTIVE">
            INACTIVE
          </MenuItem>
        </TextField>

        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending
              ? "Updating..."
              : "Update Route"}
          </Button>

          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() =>
              navigate("/super-admin/routes")
            }
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditRoute;