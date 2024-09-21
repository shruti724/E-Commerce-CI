const express = require("express");
const router = express.Router();
const {
  getAllSettings,
  getSettingByKey,
  upsertSetting,
  deleteSetting,
} = require("../controller/settingController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/isAdmin")


router.get("/settings", authMiddleware, checkAdmin, getAllSettings);
router.get("/settings/:key", authMiddleware, checkAdmin, getSettingByKey);
router.put("/settings/:key", authMiddleware, checkAdmin, upsertSetting);
router.delete("/settings/:key", authMiddleware, checkAdmin, deleteSetting);

module.exports = router;
