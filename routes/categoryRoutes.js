const express = require("express");

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addProductToCategory,
  getCategoryWithProducts
} = require("../controller/categoryController");

const authMiddleware = require("../middlewares/authMiddleware")
const checkAdmin = require("../middlewares/isAdmin")
const router = express.Router();

router.get("/categories", authMiddleware, checkAdmin, getCategories);
router.post("/category", authMiddleware, addCategory);
router.put("/category/:id", authMiddleware, updateCategory);
router.delete("/category/:id", authMiddleware, checkAdmin, deleteCategory);
router.post("/add-product", addProductToCategory);
router.get("/:id/products", getCategoryWithProducts);


module.exports = router;

