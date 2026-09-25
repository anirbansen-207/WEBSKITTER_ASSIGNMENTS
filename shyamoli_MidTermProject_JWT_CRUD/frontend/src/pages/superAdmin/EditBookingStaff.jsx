import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  getSingleBookingStaff,
  updateBookingStaff,
} from "../../services/bookingStaffService";

const EditBookingStaff = () => {
  const { bookingStaffId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Get existing staff details
  const { data: staff, isLoading, isError } = useQuery({
    queryKey: ["bookingStaff", bookingStaffId],
    queryFn: () => getSingleBookingStaff(bookingStaffId),
  });

  // Put existing data into form
  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        password: "",
      });
    }
  }, [staff]);

  const mutation = useMutation({
    mutationFn: updateBookingStaff,

    onSuccess: () => {
      toast.success("Booking staff updated successfully");
      navigate("/super-admin/booking-staff");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update booking staff"
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

    const staffData = {
      name: formData.name,
      phone: formData.phone,
    };

    // Only send password if user entered a new one
    if (formData.password.trim()) {
      staffData.password = formData.password;
    }

    mutation.mutate({
      bookingStaffId,
      staffData,
    });
  };

  if (isLoading) {
    return <Typography>Loading booking staff...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load booking staff.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>
        Edit Booking Staff
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
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          disabled
        />

        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <TextField
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          helperText="Leave empty to keep the current password"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Updating..." : "Update Staff"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditBookingStaff;