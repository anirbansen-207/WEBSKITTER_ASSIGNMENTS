export const adminMiddleware = (req, res, next) => {
  if (req.session.user.role !== "admin") {
    req.flash("error", "Unauthorized");

    return res.redirect("/dashboard");
  }

  next();
};