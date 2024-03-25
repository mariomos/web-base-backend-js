const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProductRating,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

// GET all products
router.get("/", getProducts);

// GET product by ID
router.get("/:id", getProductById);

// GET product by name
router.get("/search/:name", getProductByName);

// POST create a new product
router.post("/", createProduct);

// PUT update product rating by ID
router.patch("/updateRating/:id", updateProductRating);

// PUT update product by ID
router.put("/:id", updateProduct);

// DELETE product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
