import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  getAllDrivers,
  deleteDriver,
} from "../../services/driverService";

const Drivers = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all drivers
  const {
    data: drivers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
  });

  // Delete driver
  const deleteMutation = useMutation({
    mutationFn: deleteDriver,

    onSuccess: () => {
      toast.success("Driver deleted successfully");

      // Fetch updated driver list
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete driver"
      );
    },
  });

  // Handle delete
  const handleDelete = (driverId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );

    if (!confirmDelete) {
      return;
    }

    deleteMutation.mutate(driverId);
  };

  // Loading
  if (isLoading) {
    return <Typography>Loading drivers...</Typography>;
  }

  // Error
  if (isError) {
    return (
      <Typography color="error">
        Failed to load drivers: {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Driver Management
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/super-admin/drivers/add")
          }
        >
          Add Driver
        </Button>
      </Box>

      {/* No drivers */}
      {drivers?.length === 0 ? (
        <Typography>
          No drivers found.
        </Typography>
      ) : (
        drivers?.map((driver) => (
          <Card
            key={driver._id}
            sx={{ mb: 2 }}
          >
            <CardContent>
              <Typography variant="h6">
                {driver.name}
              </Typography>

              <Typography>
                <strong>Email:</strong> {driver.email}
              </Typography>

              <Typography>
                <strong>Phone:</strong> {driver.phone}
              </Typography>

              <Typography>
                <strong>Role:</strong> {driver.role}
              </Typography>

              <Typography>
                <strong>Status:</strong>{" "}
                {driver.isActive ? "Active" : "Inactive"}
              </Typography>

              {/* Edit */}
              <Button
                variant="outlined"
                sx={{ mt: 2, mr: 1 }}
                onClick={() =>
                  navigate(
                    `/super-admin/drivers/edit/${driver._id}`
                  )
                }
              >
                Edit
              </Button>

              {/* Delete */}
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={() =>
                  handleDelete(driver._id)
                }
                disabled={deleteMutation.isPending}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Drivers;