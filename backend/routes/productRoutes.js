const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  media,
  bulkDeleteProducts
} = require("../controller/productController")
const checkAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Routes for Products
router.get("/products",  getProducts);
router.get("/product/:id", getProductById);
router.post("/product", addProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.post("/product/bulkdelete", bulkDeleteProducts)
router.post("/upload/:id", upload.array("product_front_image", 10), media);

module.exports = router;
