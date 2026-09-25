export const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next)=>{
        try {
            // check whether req.user exists
            if (!req.user) {
                const error = new Error("User not found");
                error.statusCode = 401;
                throw error;
            }

            // check whether user role is allowed
            if (!allowedRoles.includes(req.user.role)) {
                const error = new Error("Unauthorized");
                error.statusCode = 403;
                throw error;
            }

            next();
        } catch (error) {
            next (error);
        }
    }
}