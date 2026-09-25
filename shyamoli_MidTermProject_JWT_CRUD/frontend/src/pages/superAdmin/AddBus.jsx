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

import { createBus } from "../../services/busService";

const AddBus = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    busNumber: "",
    busName: "",
    busType: "",
    totalSeats: "",
    ticketPrice: "",
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Create bus mutation
  const createMutation = useMutation({
    mutationFn: createBus,

    onSuccess: () => {
      console.log("Bus created successfully");

      navigate("/super-admin/buses");
    },

    onError: (error) => {
      console.error(
        "Failed to create bus:",
        error,
      );
    },
  });

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const busData = {
      busNumber: formData.busNumber,
      busName: formData.busName,
      busType: formData.busType,
      totalSeats: Number(formData.totalSeats),
      ticketPrice: Number(formData.ticketPrice),
    };

    console.log("Bus data:", busData);

    createMutation.mutate(busData);
  };

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h4" gutterBottom>
        Add Bus
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
        {/* Bus Number */}
        <TextField
          label="Bus Number"
          name="busNumber"
          value={formData.busNumber}
          onChange={handleChange}
          required
        />

        {/* Bus Name */}
        <TextField
          label="Bus Name"
          name="busName"
          value={formData.busName}
          onChange={handleChange}
          required
        />

        {/* Bus Type */}
        <TextField
          select
          label="Bus Type"
          name="busType"
          value={formData.busType}
          onChange={handleChange}
          required
        >
          <MenuItem value="AC">
            AC
          </MenuItem>

          <MenuItem value="NON_AC">
            NON AC
          </MenuItem>

          <MenuItem value="SLEEPER">
            SLEEPER
          </MenuItem>
        </TextField>

        {/* Total Seats */}
        <TextField
          label="Total Seats"
          name="totalSeats"
          type="number"
          value={formData.totalSeats}
          onChange={handleChange}
          required
          inputProps={{ min: 1 }}
        />

        {/* Ticket Price */}
        <TextField
          label="Ticket Price"
          name="ticketPrice"
          type="number"
          value={formData.ticketPrice}
          onChange={handleChange}
          required
          inputProps={{ min: 0 }}
        />

        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending
              ? "Creating..."
              : "Create Bus"}
          </Button>

          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() =>
              navigate("/super-admin/buses")
            }
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBus;