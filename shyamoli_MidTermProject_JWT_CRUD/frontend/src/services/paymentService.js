import axiosInstance from "./axios";

// Create payment for a booking
export const createPayment = async (paymentData) => {
  const response = await axiosInstance.post(
    "/api/payment/create_payment",
    paymentData,
  );

  // Return the actual payment object
  // from the backend response.
  return response.data.data;
};