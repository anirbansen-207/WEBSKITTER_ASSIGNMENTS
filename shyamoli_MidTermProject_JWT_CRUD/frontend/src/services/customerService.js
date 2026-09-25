import axiosInstance from "./axios";

// Get all bookings of the logged-in customer
export const getOwnBookings = async () => {
  const response = await axiosInstance.get(
    "/api/customer/own_bookings",
  );

  return response.data.data;
};

// Cancel a customer's booking
export const cancelBooking = async (bookingId) => {
  const response = await axiosInstance.delete(
    `/api/customer/cancel_booking/${bookingId}`,
  );

  return response.data.data;
};

// Get ticket for a particular booking
export const getTicket = async (bookingId) => {
  const response = await axiosInstance.get(
    `/api/customer/view_ticket/${bookingId}`,
  );

  return response.data.data;
};