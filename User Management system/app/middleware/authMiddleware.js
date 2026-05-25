import User from '../models/userModel.js';

import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];

        // check if token exists
        if(!token){
            return res.status(401).json({ message: 'token missing' });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // fetch user from DB 
        const userData = await User.findById(decoded.id).select('-password');

        // Check if user exists
        if(!userData){
            return res.status(401).json({ message: 'No data found' });
        }

        // attach userData to req.user
        req.user = userData;
        next();
        
        
    }catch(error){
        console.error('Authentication Error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
export default authMiddleware;