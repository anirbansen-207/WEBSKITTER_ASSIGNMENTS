import Blog from "../models/blogModel.js";

// Create Blog
export const createBlog = async (req, res) => {
  try {
    await Blog.create({
      title: req.body.title,
      content: req.body.content,

      image: req.file
        ? req.file.filename
        : null,

      createdBy: req.session.user.id,
    });

    req.flash("success", "Blog Created");

    res.redirect("/blogs");
  } catch (error) {
    console.log(error.message);
  }
};

// Get Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      isDeleted: false,
    }).populate("createdBy");

    res.render("blog/blogs", {
      blogs,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Delete Blog 
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.send("Blog Not Found");
    }

    const isOwner =
      blog.createdBy.toString() ===
      req.session.user.id;

    const isAdmin =
      req.session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.send("Unauthorized");
    }

    blog.isDeleted = true;

    await blog.save();

    res.redirect("/blogs");
  } catch (error) {
    console.log(error.message);
  }
};