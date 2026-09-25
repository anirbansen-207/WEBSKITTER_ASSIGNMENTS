import { RouterProvider } from "react-router-dom";

// Our application's router configuration
import router from "./routes/router";

const App = () => {
  return (
    // RouterProvider connects React Router
    // with our entire application.
    <RouterProvider router={router} />
  );
};

export default App;