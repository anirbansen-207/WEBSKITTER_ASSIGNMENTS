import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  getAllBookingStaff,
  deleteBookingStaff,
} from "../../services/bookingStaffService";

const BookingStaff = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get all booking staff
  const {
    data: staff,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookingStaff"],
    queryFn: getAllBookingStaff,
  });

  // Delete booking staff
  const deleteMutation = useMutation({
    mutationFn: deleteBookingStaff,

    onSuccess: () => {
      toast.success("Booking staff deleted successfully");

      // Refresh staff list
      queryClient.invalidateQueries({
        queryKey: ["bookingStaff"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete booking staff"
      );
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking staff?"
    );

    if (!confirmDelete) return;

    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <Typography>Loading booking staff...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load booking staff: {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Booking Staff Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/super-admin/booking-staff/add")}
        >
          Add Booking Staff
        </Button>
      </Box>

      {staff?.length === 0 ? (
        <Typography>No booking staff found.</Typography>
      ) : (
        staff?.map((member) => (
          <Box
            key={member._id}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <Typography>
              <strong>Name:</strong> {member.name}
            </Typography>

            <Typography>
              <strong>Email:</strong> {member.email}
            </Typography>

            <Typography>
              <strong>Phone:</strong> {member.phone}
            </Typography>

            <Typography>
              <strong>Role:</strong> {member.role}
            </Typography>

            <Typography>
              <strong>Status:</strong>{" "}
              {member.isActive ? "Active" : "Inactive"}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() =>
                  navigate(
                    `/super-admin/booking-staff/edit/${member._id}`
                  )
                }
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(member._id)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default BookingStaff;