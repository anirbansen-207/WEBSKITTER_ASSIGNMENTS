import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.post("/", getAllProducts);
router.post("/:id", getProductById);
router.post("/:id/updateProduct", updateProduct);
router.post("/:id/deleteProduct", deleteProduct);

export default router;
