import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";

import authRoutes from "./app/routes/authRoutes.js";
import blogRoutes from "./app/routes/blogRoutes.js";
import userRoutes from "./app/routes/userRoutes.js";

import connectDB from "./app/config/db.js";

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Folder
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Flash Message
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.session.user || null;

  next();
});

// Routes
app.use("/", authRoutes);
app.use("/", blogRoutes);
app.use("/", userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.redirect("/login");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});