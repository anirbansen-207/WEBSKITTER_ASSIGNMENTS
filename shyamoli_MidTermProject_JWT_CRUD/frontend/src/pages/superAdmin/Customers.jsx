import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getAllCustomers } from "../../services/adminCustomerService";

const Customers = () => {
  const navigate = useNavigate();

  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  if (isLoading) {
    return <Typography>Loading customers...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load customers: {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      {customers?.length === 0 ? (
        <Typography>No customers found.</Typography>
      ) : (
        customers?.map((customer) => (
          <Card key={customer._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {customer.name}
              </Typography>

              <Typography>
                <strong>Email:</strong> {customer.email}
              </Typography>

              <Typography>
                <strong>Phone:</strong> {customer.phone}
              </Typography>

              <Typography>
                <strong>Verified:</strong>{" "}
                {customer.isVerified ? "Yes" : "No"}
              </Typography>

              <Typography>
                <strong>Status:</strong>{" "}
                {customer.isActive ? "Active" : "Inactive"}
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() =>
                  navigate(
                    `/super-admin/customers/${customer._id}`
                  )
                }
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Customers;