import axiosInstance from "./axios";

// Get all drivers
export const getAllDrivers = async () => {
  const response = await axiosInstance.get(
    "/api/super_admin/view_drivers"
  );

  return response.data.data;
};

// Get single driver
export const getSingleDriver = async (driverId) => {
  const response = await axiosInstance.get(
    `/api/super_admin/view_driver/${driverId}`
  );

  return response.data.data;
};

// Create driver
export const createDriver = async (driverData) => {
  const response = await axiosInstance.post(
    "/api/super_admin/create_driver",
    driverData
  );

  return response.data.data;
};

// Update driver
export const updateDriver = async ({ driverId, driverData }) => {
  const response = await axiosInstance.put(
    `/api/super_admin/update_driver/${driverId}`,
    driverData
  );

  return response.data.data;
};

// Delete driver
export const deleteDriver = async (driverId) => {
  const response = await axiosInstance.delete(
    `/api/super_admin/delete_driver/${driverId}`
  );

  return response.data.data;
};

// Get logged-in driver's profile
export const getMyDriverProfile = async () => {
  const response = await axiosInstance.get(
    "/api/driver/my_profile"
  );

  return response.data.data;
};

// Get trips assigned to logged-in driver
export const getMyAssignedTrips = async () => {
  const response = await axiosInstance.get(
    "/api/driver/assigned_trips"
  );

  return response.data.data;
};

// Get passengers of an assigned trip
export const getTripPassengers = async (tripId) => {
  const response = await axiosInstance.get(
    `/api/driver/trip/${tripId}/passengers`
  );

  return response.data.data;
};