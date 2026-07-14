import dotenv from "dotenv";
import bcrypt from "bcrypt";

import connectDB from "../config/db.js";
import User from "../models/userModel.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin =
      await User.findOne({
        email: "admin@gmail.com",
      });

    if (existingAdmin) {
      console.log(
        "Admin Already Exists"
      );

      process.exit();
    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await User.create({
      name: "Super Admin",

      email: "admin@gmail.com",

      password: hashedPassword,

      role: "admin",
    });

    console.log(
      "Super Admin Created"
    );

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

createSuperAdmin();