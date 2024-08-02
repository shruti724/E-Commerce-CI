const express = require("express");
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addProductToCategory,
  getCategoryWithProducts,
  media,
} = require("../controller/categoryController"); // Ensure correct path

const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/uploadMiddleware"); // Ensure correct path

const router = express.Router();

// Route definitions
router.get("/categories", authMiddleware, checkAdmin, getCategories);
router.post("/category", authMiddleware, checkAdmin, addCategory); 
router.put("/category/:id", authMiddleware, checkAdmin, updateCategory);
router.delete("/category/:id", authMiddleware, checkAdmin, deleteCategory);
router.post("/addProduct", addProductToCategory); 
router.get("/:id/products", authMiddleware, getCategoryWithProducts);
router.post(
  "/upload/:id",
  authMiddleware,
  upload.array("category_front_image", 10),
  media
); 

module.exports = router;
