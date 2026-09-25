import { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import {
  getSingleBus,
  updateBus,
} from "../../services/busService";

const EditBus = () => {
  const navigate = useNavigate();
  const { busId } = useParams();

  const [formData, setFormData] = useState({
    busName: "",
    busType: "",
    ticketPrice: "",
  });

  // Fetch existing bus
  const {
    data: bus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bus", busId],
    queryFn: () => getSingleBus(busId),
  });

  // Put existing bus data into form
  useEffect(() => {
    if (bus) {
      setFormData({
        busName: bus.busName || "",
        busType: bus.busType || "",
        ticketPrice: bus.ticketPrice || "",
      });
    }
  }, [bus]);

  // Update bus
  const updateMutation = useMutation({
    mutationFn: updateBus,

    onSuccess: () => {
      console.log("Bus updated successfully");
      navigate("/super-admin/buses");
    },

    onError: (error) => {
      console.error("Failed to update bus:", error);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const busData = {
      busName: formData.busName,
      busType: formData.busType,
      ticketPrice: Number(formData.ticketPrice),
    };

    updateMutation.mutate({
      busId,
      busData,
    });
  };

  if (isLoading) {
    return <p>Loading bus...</p>;
  }

  if (isError) {
    return <p>Failed to load bus: {error.message}</p>;
  }

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h4" gutterBottom>
        Edit Bus
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
        {/* Bus Number - Read Only */}
        <TextField
          label="Bus Number"
          value={bus?.busNumber || ""}
          disabled
        />

        <TextField
          label="Bus Name"
          name="busName"
          value={formData.busName}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Bus Type"
          name="busType"
          value={formData.busType}
          onChange={handleChange}
          required
        >
          <MenuItem value="AC">AC</MenuItem>
          <MenuItem value="NON_AC">NON AC</MenuItem>
          <MenuItem value="SLEEPER">SLEEPER</MenuItem>
        </TextField>

        <TextField
          label="Ticket Price"
          name="ticketPrice"
          type="number"
          value={formData.ticketPrice}
          onChange={handleChange}
          required
          inputProps={{ min: 0 }}
        />

        {/* Total seats are not updated here */}
        <TextField
          label="Total Seats"
          value={bus?.totalSeats || ""}
          disabled
        />

        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Bus"}
          </Button>

          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => navigate("/super-admin/buses")}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditBus;