const Product = require("../models/product.model.js");

// Get all products, with optional sorting and ordering
const getProducts = async (req, res) => {
  try {
    let sortBy = req.query.sortBy || "createdAt"; // Default sorting by creation date
    let order = req.query.order || "asc"; // Default order is ascending

    // Validate sorting criteria and order
    const validSortFields = ["name", "type", "rating", "createdAt"];
    const validOrders = ["asc", "desc"];

    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({ message: "Invalid sortBy parameter" });
    }

    if (!validOrders.includes(order)) {
      return res.status(400).json({ message: "Invalid order parameter" });
    }

    // Fetch products from the database and apply sorting
    const products = await Product.find({}).sort({ [sortBy]: order });

    res.status(200).json(products);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a product by its ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error);
  }
};

// Get products by name (case-insensitive)
const getProductByName = async (req, res) => {
  try {
    let { name } = req.params;
    // Remove leading and trailing whitespace from the name
    name = name.replace(/\s+/g, " ").trim();

    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });
    if (products.length === 0) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    let { name, type, rating } = req.body;
    // Trim whitespace from name and type
    name = name.replace(/\s+/g, " ").trim();
    type = type.replace(/\s+/g, " ").trim();

    // Validate input data
    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required" });
    }

    if (rating === undefined) {
      rating = null;
    }

    const product = new Product({
      name,
      type,
      rating: rating || 0,
      totalRatings: rating ? 1 : 0,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    handleError(res, error);
  }
};

// Update the rating of a product
const updateProductRating = async (req, res) => {
  try {
    const { id } = req.params;
    let { rating } = req.body;

    rating = parseFloat(rating); // Convert rating to a float

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ensure rating is within valid range (1 to 5) or null
    if (rating !== null && (isNaN(rating) || rating < 1 || rating > 5)) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5" });
    }

    // If rating is provided, update the product's rating
    if (rating !== null) {
      // Update the product's rating
      const currentRating = product.rating;
      const currentTotalRatings = product.totalRatings;

      // Calculate the new totalRatings and average rating
      const newTotalRatings = currentTotalRatings + 1;
      const newAverageRating =
        (currentRating * currentTotalRatings + rating) / newTotalRatings;

      // Update the product with the new rating values
      product.rating = newAverageRating;
      product.totalRatings = newTotalRatings;
    }

    // Save the updated product
    await product.save();

    res.status(200).json({
      message: "Product rating updated successfully",
      product,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Update a product's name or type
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body; // Extract only name and type from req.body

    // Create an object with the fields to be updated
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (type) updatedFields.type = type;

    // Find the product by ID and update only the specified fields
    const product = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a product by its ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Handle errors
const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Internal server error" });
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProductRating,
  updateProduct,
  deleteProduct,
};
