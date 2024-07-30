const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController")
const checkAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/authMiddleware");

// Routes for Products
router.get("/products",  getProducts);
router.get("/product/:id", getProductById);
router.post("/product", auth, checkAdmin, addProduct);
router.put("/product/:id", auth, checkAdmin, updateProduct);
router.delete("/product/:id", auth, checkAdmin, deleteProduct);

module.exports = router;
