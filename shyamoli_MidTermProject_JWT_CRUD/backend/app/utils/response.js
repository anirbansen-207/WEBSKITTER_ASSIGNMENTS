// Standard Success Response

export const successResponse = (
    res,
    statusCode,
    message,
    data
)=>{
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

// Standard Error Response
export const errorResponse = (
    res,
    statusCode,
    message,
    data = null
)=>{
    return res.status(statusCode).json({
        success: false,
        message,
        data
    });
};