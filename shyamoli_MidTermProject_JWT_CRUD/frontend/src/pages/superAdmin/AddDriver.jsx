import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createDriver } from "../../services/driverService";

const AddDriver = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // Create driver
  const mutation = useMutation({
    mutationFn: createDriver,

    onSuccess: () => {
      toast.success("Driver created successfully");

      navigate("/super-admin/drivers");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create driver"
      );
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(formData);
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Add Driver
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        {/* Driver Name */}
        <TextField
          fullWidth
          label="Driver Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        {/* Phone */}
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          required
        />

        {/* Create */}
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mr: 2 }}
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Creating..."
            : "Create Driver"}
        </Button>

        {/* Cancel */}
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() =>
            navigate("/super-admin/drivers")
          }
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddDriver;