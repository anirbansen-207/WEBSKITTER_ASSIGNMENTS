import express from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

// Create product
router.post("/create_product", createProduct);

// Get all products
router.get("get_all_products", getAllProducts);

// get Single Product
router.get("/get_single_product/:id", getSingleProduct);

// Update Product
router.put("/update_product/:id", updateProduct);

// Delete Product
router.delete("/delete_product/:id", deleteProduct);

export default router;
