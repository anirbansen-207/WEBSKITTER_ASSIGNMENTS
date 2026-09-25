import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { getAllRoutes, deleteRoute } from "../../services/routeService";

const Routes = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Fetch all routes
  const {
    data: routes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });

  // Delete route
  const deleteMutation = useMutation({
    mutationFn: deleteRoute,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
    },

    onError: (error) => {
      console.error("Failed to delete route:", error);
    },
  });

  if (isLoading) {
    return <p>Loading routes...</p>;
  }

  if (isError) {
    return <p>Failed to load routes: {error.message}</p>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Route Management
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => navigate("/super-admin/routes/add")}
      >
        Add Route
      </Button>

      {routes?.length === 0 ? (
        <Typography>No routes found.</Typography>
      ) : (
        routes?.map((route) => (
          <Card key={route._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {route.sourceCity}
                {" → "}
                {route.destinationCity}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Distance:</strong> {route.routeDistance} km
              </Typography>

              <Typography>
                <strong>Status:</strong> {route.routeStatus}
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 2, mr: 2 }}
                onClick={() =>
                  navigate(`/super-admin/routes/edit/${route._id}`)
                }
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => deleteMutation.mutate(route._id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Routes;
