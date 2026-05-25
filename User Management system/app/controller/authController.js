import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


// Login user
export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // check is password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Generate token
        const token = generateToken(user);

        // check first login
        if(user.isFirstLogin){
            
            return res.status(200).json({
                success: false,
                message: "Please change your password",
                token,
                isFirstLogin: true
            })
        }

        // For Normal Login
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            isFirstLogin: false
        })
    }catch{
        return res.status(500).json({
            success: false,
            message: "Login failed",
        })
    }
};