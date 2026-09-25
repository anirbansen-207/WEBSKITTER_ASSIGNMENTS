import { useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { createRoute } from "../../services/routeService";

const AddRoute = () => {
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

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Create route mutation
  const createMutation = useMutation({
    mutationFn: createRoute,

    onSuccess: () => {
      console.log("Route created successfully");

      // Go back to Routes page
      navigate("/super-admin/routes");
    },

    onError: (error) => {
      console.error("Failed to create route:", error);
    },
  });

  // Convert comma-separated text into an array
  const convertToArray = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  // Submit form
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

      routeDistance: Number(formData.routeDistance),

      routeStatus: formData.routeStatus,
    };

    console.log("Route data:", routeData);

    createMutation.mutate(routeData);
  };

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h4" gutterBottom>
        Add Route
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
        {/* Source city */}
        <TextField
          label="Source City"
          name="sourceCity"
          value={formData.sourceCity}
          onChange={handleChange}
          required
        />

        {/* Destination city */}
        <TextField
          label="Destination City"
          name="destinationCity"
          value={formData.destinationCity}
          onChange={handleChange}
          required
        />

        {/* Intermediate stops */}
        <TextField
          label="Intermediate Stops"
          name="intermediateStops"
          value={formData.intermediateStops}
          onChange={handleChange}
          placeholder="Bardhaman, Burdwan"
          helperText="Enter multiple stops separated by commas"
        />

        {/* Boarding points */}
        <TextField
          label="Boarding Points"
          name="boardingPoints"
          value={formData.boardingPoints}
          onChange={handleChange}
          placeholder="Durgapur Bus Stand, City Centre"
          helperText="Enter multiple points separated by commas"
        />

        {/* Dropping points */}
        <TextField
          label="Dropping Points"
          name="droppingPoints"
          value={formData.droppingPoints}
          onChange={handleChange}
          placeholder="Esplanade, Howrah"
          helperText="Enter multiple points separated by commas"
        />

        {/* Route distance */}
        <TextField
          label="Route Distance (KM)"
          name="routeDistance"
          type="number"
          value={formData.routeDistance}
          onChange={handleChange}
          required
          inputProps={{ min: 0 }}
        />

        {/* Route status */}
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
            disabled={createMutation.isPending}
          >
            {createMutation.isPending
              ? "Creating..."
              : "Create Route"}
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

export default AddRoute;