import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleCustomer } from "../../services/adminCustomerService";

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getSingleCustomer(customerId),
  });

  if (isLoading) {
    return <Typography>Loading customer...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load customer.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {customer.name}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Email:</strong> {customer.email}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Phone:</strong> {customer.phone}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Role:</strong> {customer.role}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Verified:</strong>{" "}
            {customer.isVerified ? "Yes" : "No"}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            <strong>Status:</strong>{" "}
            {customer.isActive ? "Active" : "Inactive"}
          </Typography>

          <Button
            variant="outlined"
            onClick={() => navigate("/super-admin/customers")}
          >
            Back to Customers
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomerDetails;