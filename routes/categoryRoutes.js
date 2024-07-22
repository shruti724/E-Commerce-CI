const express = require("express");

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

const router = express.Router();

router.get("/categories", getCategories);
router.post("/category", addCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;

