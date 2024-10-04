const express = require("express")
const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  softDeleteById,
  getBrandById,
  media
} = require("../controller/brandController");
const authMiddleware = require("../middlewares/authMiddleware")
const checkAdmin = require("../middlewares/isAdmin");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

// Define the upload route
router.post("/upload/:id", upload.array("brand_front_image", 10), media);


// Use the reusable middleware for brand images



router.post("/brand", addBrand);
router.get("/brands", getBrands);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", deleteBrand);
router.get("/brand/:id", getBrandById)
router.put("/brand/softdelete/:id", softDeleteById);

module.exports = router
