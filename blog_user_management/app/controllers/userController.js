import User from "../models/userModel.js";

export const dashboard = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.session.user.id
      );

    res.render(
      "dashboard",
      { user }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers =
  async (req, res) => {
    try {
      const users =
        await User.find().select(
          "-password"
        );

      res.render(
        "users",
        { users }
      );
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUser = async (
  req,
  res
) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
};