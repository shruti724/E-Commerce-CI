const express = require("express");
const {
  createUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser
} = require("../controller/userController");

const router = express.Router();

router.post("/register", createUser);
router.get("/users", getUsers);
router.post("/login", loginUser);
router.put("/update/:id", updateUser); 
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
