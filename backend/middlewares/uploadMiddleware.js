const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Helper function to ensure the directory exists
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;

    // Check for route parameters and set the upload directory accordingly
    const { id, productId, categoryId } = req.params;
    if (id) {
      uploadDir = path.join(__dirname, "../public/images/brands", id);
    } else if (productId) {
      uploadDir = path.join(__dirname, "../public/images/products", productId);
    } else if (categoryId) {
      uploadDir = path.join(
        __dirname,
        "../public/images/categories",
        categoryId
      );
    } else {
      return cb(new Error("Invalid upload route"), false);
    }

    // Ensure the directory exists
    ensureDirExists(uploadDir);

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 }, 
});

module.exports = upload;
