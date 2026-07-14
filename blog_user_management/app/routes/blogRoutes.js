import express from "express";

import {
  createBlog,
  getBlogs,
  
  deleteBlog,
} from "../controllers/blogController.js";

import upload from "../middlewares/uploadMiddleware.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();



router.get(
  "/create-blog",
  authMiddleware,
  (req, res) =>
    res.render("createBlog")
);

router.post(
  "/blogs",
  authMiddleware,
  upload.single("image"),
  createBlog
);



router.get(
  "/blogs/delete/:id",
  authMiddleware,
  deleteBlog
);

export default router;