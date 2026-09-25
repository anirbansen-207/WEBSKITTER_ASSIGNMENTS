import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  getAllBuses,
  deleteBus,
} from "../../services/busService";

const Buses = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Fetch all buses
  const {
    data: buses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["buses"],
    queryFn: getAllBuses,
  });

  // Delete bus
  const deleteMutation = useMutation({
    mutationFn: deleteBus,

    onSuccess: () => {
      // Fetch buses again after deletion
      queryClient.invalidateQueries({
        queryKey: ["buses"],
      });
    },

    onError: (error) => {
      console.error(
        "Failed to delete bus:",
        error,
      );
    },
  });

  // Loading
  if (isLoading) {
    return <p>Loading buses...</p>;
  }

  // Error
  if (isError) {
    return (
      <p>
        Failed to load buses: {error.message}
      </p>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bus Management
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() =>
          navigate("/super-admin/buses/add")
        }
      >
        Add Bus
      </Button>

      {buses?.length === 0 ? (
        <Typography>
          No buses found.
        </Typography>
      ) : (
        buses?.map((bus) => (
          <Card
            key={bus._id}
            sx={{ mb: 2 }}
          >
            <CardContent>

              <Typography variant="h6">
                {bus.busName}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Bus Number:</strong>{" "}
                {bus.busNumber}
              </Typography>

              <Typography>
                <strong>Bus Type:</strong>{" "}
                {bus.busType}
              </Typography>

              <Typography>
                <strong>Total Seats:</strong>{" "}
                {bus.totalSeats}
              </Typography>

              <Typography>
                <strong>Ticket Price:</strong>{" "}
                ₹{bus.ticketPrice}
              </Typography>

              <Typography>
                <strong>Status:</strong>{" "}
                {bus.isActive
                  ? "ACTIVE"
                  : "INACTIVE"}
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 2, mr: 2 }}
                onClick={() =>
                  navigate(
                    `/super-admin/buses/edit/${bus._id}`,
                  )
                }
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() =>
                  deleteMutation.mutate(bus._id)
                }
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete"}
              </Button>

            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Buses;