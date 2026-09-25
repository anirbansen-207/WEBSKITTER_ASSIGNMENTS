import axiosInstance from "./axios";

// Get all customers
export const getAllCustomers = async () => {
  const response = await axiosInstance.get(
    "/api/super_admin/view_customers"
  );

  return response.data.data;
};

// Get single customer
export const getSingleCustomer = async (customerId) => {
  const response = await axiosInstance.get(
    `/api/super_admin/view_customer/${customerId}`
  );

  return response.data.data;
};