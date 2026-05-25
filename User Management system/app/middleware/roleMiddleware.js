const roleMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      // Check if user's role exists in allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({
          success: false,

          message: "Unauthorized",
        });
      }

      next();
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message: "Role check failed",

        error: error.message,
      });
    }
  };
};

export default roleMiddleware;
