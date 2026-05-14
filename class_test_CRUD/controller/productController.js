import Product from "../models/productModel.js";

// Create Product
export const createProduct = (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    if (!name || !description || !price || !category || !inStock) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const product = Product.create({
      name,
      description,
      price,
      category,
      inStock,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      },
    );

    return res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    if(!products){
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
