export const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "Please Login");

    return res.redirect("/login");
  }

  next();
};