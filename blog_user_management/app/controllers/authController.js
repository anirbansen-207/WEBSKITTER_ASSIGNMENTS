import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// Register controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    req.flash("success", "Registration Success");

    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
  }
};

// Login controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User Not Found");
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.send("Invalid Credentials");
    }

    req.session.user = {
      id: user._id,
      role: user.role,
      name: user.name,
    };

    req.flash("success", "Login Success");

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

// Logout controller
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};