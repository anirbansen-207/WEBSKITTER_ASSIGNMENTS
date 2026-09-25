import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createBookingStaff } from "../../services/bookingStaffService";

const AddBookingStaff = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const mutation = useMutation({
    mutationFn: createBookingStaff,

    onSuccess: () => {
      toast.success("Booking staff created successfully");
      navigate("/super-admin/booking-staff");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create booking staff"
      );
    },
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate(formData);
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>
        Add Booking Staff
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Staff"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddBookingStaff;