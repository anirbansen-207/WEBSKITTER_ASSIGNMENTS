import axiosInstance from "./axios";


// Register customer 
export const registerCustomer = async (data) => {
  const response = await axiosInstance.post(
    "/api/auth/register",
    data,
  );

  return response.data;
};

// Verify OTP
export const verifyOtp = async (data) => {
  const response = await axiosInstance.post(
    "/api/auth/verify-otp",
    data,
  );

  return response.data;
};

// Resend OTP
export const resendOtp = async (data) => {
  const response = await axiosInstance.post(
    "/api/auth/resend-otp",
    data,
  );

  return response.data;
};

// login user
export const loginUser = async (data) => {
  const response = await axiosInstance.post(
    "/api/auth/login",
    data,
  );

  return response.data;
};

// Refresh token
export const refreshToken = async () => {
  const response = await axiosInstance.post(
    "/api/auth/refresh-token",
  );

  return response.data;
};


// Logout user
export const logoutUser = async () => {
  const response = await axiosInstance.post(
    "/api/auth/logout",
  );

  return response.data;
};