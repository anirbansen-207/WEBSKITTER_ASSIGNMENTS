import React from "react";
import ReactDOM from "react-dom/client";

// React Query
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Authentication Context
import { AuthProvider } from "./context/AuthContext";

// Main App component
import App from "./App";

// Global CSS
import "./index.css";

// Create one React Query client for the whole application.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry a failed API request only once.
      retry: 1,

      // Don't automatically refetch when
      // the browser window gets focus.
      refetchOnWindowFocus: false,
    },
  },
});

// Start the React application.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 
      Makes React Query available
      to all components inside the application.
    */}
    <QueryClientProvider client={queryClient}>

      {/* 
        Makes authentication information
        available to all components inside App.
      */}
      <AuthProvider>

        {/* Our actual application */}
        <App />

      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);