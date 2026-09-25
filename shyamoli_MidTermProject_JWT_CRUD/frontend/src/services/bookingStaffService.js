import axiosInstance from "./axios";

// Get all booking staff
export const getAllBookingStaff = async () => {
  const response = await axiosInstance.get(
    "/api/super_admin/view_booking_staff"
  );

  return response.data.data;
};

// Get single booking staff
export const getSingleBookingStaff = async (bookingStaffId) => {
  const response = await axiosInstance.get(
    `/api/super_admin/view_booking_staff/${bookingStaffId}`
  );

  return response.data.data;
};

// Create booking staff
export const createBookingStaff = async (staffData) => {
  const response = await axiosInstance.post(
    "/api/super_admin/create_bookingStaff",
    staffData
  );

  return response.data.data;
};

// Update booking staff
export const updateBookingStaff = async ({
  bookingStaffId,
  staffData,
}) => {
  const response = await axiosInstance.put(
    `/api/super_admin/update_booking_staff/${bookingStaffId}`,
    staffData
  );

  return response.data.data;
};

// Delete booking staff
export const deleteBookingStaff = async (bookingStaffId) => {
  const response = await axiosInstance.delete(
    `/api/super_admin/delete_booking_staff/${bookingStaffId}`
  );

  return response.data.data;
};