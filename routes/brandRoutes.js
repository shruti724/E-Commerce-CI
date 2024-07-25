const express = require("express")
const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  softDeleteById
} = require("../controller/brandController");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/brand", authMiddleware, addBrand);
router.get("/brands", authMiddleware, checkAdmin, getBrands);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", authMiddleware, checkAdmin, deleteBrand);
router.put("/brand_soft_delete/:id", authMiddleware, softDeleteById);

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

module.exports = router
