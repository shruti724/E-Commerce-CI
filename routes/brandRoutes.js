const express = require("express")
const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require("../controller/brandController");

const router = express.Router();

router.post("/brand", addBrand);
router.get("/brands", getBrands);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", deleteBrand);

module.exports = router
