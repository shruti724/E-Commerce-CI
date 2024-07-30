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
  destination: (req, file, cb)=> {
    let uploadDir;
//  console.log(req.params);
 brandId = req.params.id
    // Determine the appropriate directory based on the route parameter
    if (brandId) {
       
      uploadDir = path.join(
        __dirname,
        "../public/images/brands",
        brandId
      );
    } else if (req.params.categoryId) {
      uploadDir = path.join(
        __dirname,
        "../public/images/categories",
        req.params.categoryId
      );
    } else {
      return cb(new Error("Invalid upload route"), false);
    }

    // Ensure the directory exists
    ensureDirExists(uploadDir);

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB size limit
});

module.exports = upload;
