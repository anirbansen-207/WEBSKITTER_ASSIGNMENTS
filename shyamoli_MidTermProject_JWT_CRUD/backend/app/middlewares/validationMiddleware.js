export const validateMiddleware = (schema) => {
  return (req, res, next) => {
    // Validate the request body against the Joi schema.
    /*when user sent something from frontend it will be in req.body and then joi creates a new object which will look like -> 
    {
    error: undefined,
    value: {
    name: "Anirban",
    email: "anirban@gmail.com",
    password: "12345678"
  }
}
  and then error and value are destructured from joi object 
  */

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    // If validation fails
    if (error) {
      // Send the error response
      const message = error.details.map((detail) => detail.message).join(", ");

      const validationError = new Error(message);
      validationError.status = 400;
      return next(validationError);
    } else {
      req.body = value;
      next();
    }
  };
};


