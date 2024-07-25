const express = require("express");

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/categories", authMiddleware, checkAdmin, getCategories);
router.post("/category", authMiddleware, addCategory);
router.put("/category/:id", authMiddleware, updateCategory);
router.delete("/category/:id", authMiddleware, checkAdmin, deleteCategory);

function checkAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
      status: 403,
    });
  }
  next();
}

module.exports = router;

