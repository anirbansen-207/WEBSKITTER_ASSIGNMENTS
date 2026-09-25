import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { ROLES } from "../utils/roles.js";
import dotenv from "dotenv";

// .env config
dotenv.config();

const superAdmin = async () => {
  try {
    // connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for Super Admin seed");

    // checking if super admin already exists
    const existingSuperAdmin = await Admin.findOne({
      role: ROLES.SUPER_ADMIN,
    });

    if (existingSuperAdmin) {
      console.log("Super admin already exists");
      return;
    }

    // super admin credentials
    const name = "Super Admin";
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create super admin
    const superAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: ROLES.SUPER_ADMIN,
      isActive: true,
      isVerified: true,
      phone: null,
      otp: null,
      otpExpiry: null,
      refreshToken: null,
      tokenVersion: 0,
      createdBy: null,
    });

    console.log("Super Admin created", superAdmin);
  } catch (error) {
    console.error("Error seeding super admin:", error);
  } finally {
    // disconnect from database
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

superAdmin();
