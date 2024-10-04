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


router.get("/settings", getAllSettings);
router.get("/settings/:key", getSettingByKey);
router.put("/settings/:key", upsertSetting);
router.delete("/settings/:key", deleteSetting);

module.exports = router;
