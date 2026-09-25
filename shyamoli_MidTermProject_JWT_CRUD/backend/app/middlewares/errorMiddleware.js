const errorMiddleware = (err, req, res, next) => {
  console.log("Error:", err);

  //Show the exact status code of the error or else 500
  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
  });
};

export default errorMiddleware;
