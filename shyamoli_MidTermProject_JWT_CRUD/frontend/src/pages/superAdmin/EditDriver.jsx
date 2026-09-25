import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  getSingleDriver,
  updateDriver,
} from "../../services/driverService";

const EditDriver = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Get single driver
  const {
    data: driver,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["driver", driverId],
    queryFn: () => getSingleDriver(driverId),
    enabled: !!driverId,
  });

  // Put driver data into form
  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || "",
        email: driver.email || "",
        phone: driver.phone || "",
        password: "",
      });
    }
  }, [driver]);

  // Update driver
  const mutation = useMutation({
    mutationFn: updateDriver,

    onSuccess: () => {
      toast.success("Driver updated successfully");

      navigate("/super-admin/drivers");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update driver"
      );
    },
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    const driverData = {
      name: formData.name,
      phone: formData.phone,
    };

    // Only send password if admin entered a new one
    if (formData.password.trim() !== "") {
      driverData.password = formData.password;
    }

    mutation.mutate({
      driverId,
      driverData,
    });
  };

  if (isLoading) {
    return <Typography>Loading driver...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load driver: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Edit Driver
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

        {/* Email - cannot be changed */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          margin="normal"
          disabled
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

        {/* New Password */}
        <TextField
          fullWidth
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          helperText="Leave blank if you do not want to change the password"
        />

        {/* Update */}
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mr: 2 }}
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Updating..."
            : "Update Driver"}
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

export default EditDriver;