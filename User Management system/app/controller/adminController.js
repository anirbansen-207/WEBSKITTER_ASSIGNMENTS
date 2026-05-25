import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generatePassword from "../utils/generatePassword.js";
import sendEmail from "../utils/sendEmail.js";


// Admin creates User
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, department, role }= req.body;

    // Validation
    if (!name || !email || !phone || !role || !department) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create temporary password
    const tempPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // create User
    const user = await User.create({
      name,
      email,
      phone,
      department,
      role,
      password: hashedPassword,
    });

    // send email
    await sendEmail(
        user.email,
        `Hello ${user.name}`,
        `Your account has been created successfully. \n,
        Your temporary password is: ${tempPassword}\n,
        Please login with temporary password and update it after login.`
    )

    // send response
    return res.status(201).json({
      message: "User created successfully",
      user,
    })
  
} catch {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
