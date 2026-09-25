import axiosInstance from "./axios";

// Get all bookings
export const getAllBookings = async () => {
  const response = await axiosInstance.get(
    "/api/booking/all_bookings"
  );

  return response.data.data;
};

// Get single booking
export const getSingleBooking = async (bookingId) => {
  const response = await axiosInstance.get(
    `/api/booking/single_booking/${bookingId}`
  );

  return response.data.data;
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  const response = await axiosInstance.patch(
    `/api/booking/cancel_booking/${bookingId}`
  );

  return response.data.data;
};