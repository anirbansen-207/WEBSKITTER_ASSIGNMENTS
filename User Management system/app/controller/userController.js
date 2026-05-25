import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


// Password Change for Re-Login
export const updatePassword = async(req, res) => {
    try{
        const {oldPassword,newPassword} = req.body;

        // check if password exists
        if(!oldPassword || !newPassword){
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Find loggedIn User
        const user = await User.findById(req.user._id);

        // check old passsword
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Incorrect old password" });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update password
        user.password = hashedPassword;

        // change isFirstLogin to false
        user.isFirstLogin = false;
        
        // save user
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

// Fetch user 
export const fetchUser = async(req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');

        // check if user exists
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        // return user
        return res.status(200).json({ user });
    }catch{
        return res.status(500).json({ message: error.message });
    }
}