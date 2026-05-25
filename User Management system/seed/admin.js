import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../app/config/db.js";

import User from "../app/models/userModel.js";

dotenv.config();

connectDB();

const admin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");

      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",

      email: "admin@gmail.com",

      role: "admin",

      password: hashedPassword,

      isFirstLogin: false,
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

admin();

export default admin;