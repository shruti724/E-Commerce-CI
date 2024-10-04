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
router.get("/categories",  getCategories);
router.post("/category", addCategory); 
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);
router.post("/addProduct", addProductToCategory); 
router.get("/:id/products", getCategoryWithProducts);
router.post(
  "/upload/:id",

  upload.array("category_front_image", 10),
  media
); 

module.exports = router;
