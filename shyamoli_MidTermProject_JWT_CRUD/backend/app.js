import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./app/config/db.js";
import errorMiddleware from "./app/middlewares/errorMiddleware.js";
import authRoutes from "./app/routes/authRoutes.js";
import superAdminRoutes from "./app/routes/superAdminRoutes.js";
import customerRoutes from "./app/routes/customerRoutes.js";
import busRoutes from "./app/routes/busRoutes.js";
import bookingStaffRoutes from "./app/routes/bookingStaffRoutes.js"
import bookingRoutes from "./app/routes/bookingRoutes.js"
import routeRoutes from "./app/routes/routeRoutes.js"
import tripRoutes from "./app/routes/tripRoutes.js"
import driverRoutes from "./app/routes/driverRoutes.js"
import seatLayoutRoutes from "./app/routes/seatLayoutRoutes.js"
import paymentRoutes from "./app/routes/paymentRoutes.js"
import ticketGenerationRoutes from "./app/routes/ticketGenerationRoutes.js"



// .env config
dotenv.config();

const app = express();

// Global Middleware
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// cors for frontend connection
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// URL-encoded
app.use(express.urlencoded({
    extended: true
}));

// Authentication Routes
app.use("/api/auth", authRoutes);
// Super Admin routes
app.use("/api/super_admin", superAdminRoutes);
// cutomer routes
app.use("/api/customer", customerRoutes);
// bus routes
app.use("/api/bus",busRoutes);
// booking staff routes
app.use("/api/booking_staff",bookingStaffRoutes)
// booking routes
app.use("/api/booking",bookingRoutes)
// route Routes
app.use("/api/routes", routeRoutes);
// trip routes
app.use("/api/trip", tripRoutes);
// driver routes
app.use("/api/driver", driverRoutes);
// Seat layout routes
app.use("/api/seat-layout", seatLayoutRoutes);
// payment routes
app.use("/api/payment", paymentRoutes);
// ticket generation routes
app.use("/api/ticket", ticketGenerationRoutes);

// error middleware
app.use(errorMiddleware);

// Health check
app.get("/health",(req,res)=>{
    res.status(200).json({
        success: true,
        message: "App is running...."
    })
});



// Server Startup
const PORT = process.env.PORT || 8001;

// Startup function to start server and connect to MongoDB
const startServer = async()=>{
    try {
        
        // MongoDB connection
        await connectDB();

        // Server connection
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server Startup failed:", error.message);
        
    }
};

startServer();