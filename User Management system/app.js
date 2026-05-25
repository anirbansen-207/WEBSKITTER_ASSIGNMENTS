import express from "express";
import dotenv from "dotenv";
import connectDB from "./app/config/db.js";
import authRoutes from "./app/routes/authRoutes.js";
import userRoutes from "./app/routes/userRoutes.js";
import adminRoutes from "./app/routes/adminRoutes.js";

// .env config
dotenv.config();

// connect database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
