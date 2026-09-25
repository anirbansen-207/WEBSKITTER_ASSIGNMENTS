import axios from "axios";

// Main Axios instance.
// All normal API requests use this instance.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});





// Separate Axios instance for refreshing the token.
//
// We keep this separate so that if refresh itself fails
// with 401, it does not trigger the refresh interceptor again.
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Response interceptor
axiosInstance.interceptors.response.use(
  // If request succeeds, simply return the response.
  (response) => {
    return response;
  },

  // If request fails
  async (error) => {
    const originalRequest = error.config;

    // Check whether the backend returned 401.
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Prevent infinite retry loops.
      originalRequest._retry = true;

      try {
        // Ask backend to create a new access token.
        //
        // The refreshToken cookie is automatically
        // sent because withCredentials is true.
        await refreshClient.post("/api/auth/refresh-token");

        // Backend has now created/set a new
        // accessToken HTTP-only cookie.

        // Retry the original request.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token is also invalid/expired.
        // Let the request fail.
        return Promise.reject(refreshError);
      }
    }

    // Any other error goes normally to the component.
    return Promise.reject(error);
  },
);

export default axiosInstance;