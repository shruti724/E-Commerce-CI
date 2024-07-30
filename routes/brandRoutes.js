const express = require("express")
const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  softDeleteById,
  media
} = require("../controller/brandController");
const authMiddleware = require("../middlewares/authMiddleware")
const checkAdmin = require("../middlewares/isAdmin");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

// Define the upload route
router.post("/upload/:id", upload.array("brand_front_image", 10), media);


// Use the reusable middleware for brand images



router.post("/brand", authMiddleware, addBrand);
router.get("/brands", authMiddleware, getBrands);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", authMiddleware, checkAdmin, deleteBrand);
router.put("/brand/softdelete/:id", authMiddleware, softDeleteById);



module.exports = router
