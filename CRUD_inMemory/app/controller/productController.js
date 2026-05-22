import products from "../data/products.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    // Validate input
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new product
    const newProduct = {
      id: Date.now().toString(), // Generate a unique ID (for demonstration purposes)
      name,
      description,
      price,
      category,
      inStock,
    };

    // Save product to product Array
    products.push(newProduct);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    // Destructuring id from request parameters
    const { id } = req.params;

    // Finding product by ID in the products array
    const product = products.find((product) => product.id === id);

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If product found, return it
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    // Destructuring id from request parameters
    const { id } = req.params;
    // Finding product by ID in the products array
    const productIndex = products.findIndex((product) => product.id === id);

    // If product not found, return 404
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product details
    const updatedProduct = {
      ...products[productIndex], // Keep existing product details
      ...req.body, // Update with new details from request body
    };

    // Save the updated product back to the products array
    products[productIndex] = updatedProduct;

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    //Destructuring id from request parameters
    const {id} = req.params;

    //Finding product by ID in the products array
    const productIndex = products.findIndex((product) => product.id === id);

    //If product not found, return 404
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Remove product from the products array
    const deletedProduct = products.splice(productIndex, 1);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
