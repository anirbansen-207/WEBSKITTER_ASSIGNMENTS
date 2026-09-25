import jwt from "jsonwebtoken";

// create access token
export const createAccessToken=(user)=>{
    return jwt.sign({
        // payload
        userId:user._id.toString(),
        role:user.role
    },
    // secret key
    process.env.JWT_ACCESS_SECRET,{
        
        // options
        expiresIn:"15m"
    })
}

// create refresh token
export const createRefreshToken=(user)=>{
    return jwt.sign({
        // pass user id in payload
        userId:user._id.toString(),
        role:user.role,
        tokenVersion: user.tokenVersion,
    },
    // secret key
    process.env.JWT_REFRESH_SECRET,
    {
    //    options
        expiresIn:"7d"
    })
}

// verify access token 
export const verifyAccessToken=(token)=>{
    return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
    )
};

// verify refresh token
export const verifyRefreshToken=(token)=>{
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
    )
}