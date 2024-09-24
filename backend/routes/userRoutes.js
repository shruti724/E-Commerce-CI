const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
  softDeleteById,
  logoutUser,
  media,
  getUserProfile,
} = require("../controller/userController");

const router = express.Router();


router.post("/register", createUser);
router.get("/users", authMiddleware, checkAdmin, getUsers);
router.get("/user/:id", authMiddleware, getUserById);
router.post("/login", loginUser);
router.put("/user/:id", authMiddleware, updateUser); 
router.delete("/user/:id", authMiddleware, checkAdmin, deleteUser);
router.delete("/user/soft/:id", softDeleteById)
router.post("/logout", logoutUser);
router.post("/users/profile_image", authMiddleware, media);
router.get("/profile", authMiddleware, getUserProfile);


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