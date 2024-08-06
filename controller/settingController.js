const Setting = require("../models/settingModel");

// Get all settings
const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    res.status(200).json({
      success: true,
      data: settings,
      message: "Settings fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching settings",
      error: error.message,
    });
  }
};

// Get a single setting by key
const getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      data: setting,
      message: "Setting fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching setting",
      error: error.message,
    });
  }
};

// Update or create a setting
const upsertSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;

    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, description },
      // Create if not exists
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: setting,
      message: "Setting updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating setting",
      error: error.message,
    });
  }
};

// Delete a setting
const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOneAndDelete({ key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Setting deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting setting",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSettings,
  getSettingByKey,
  upsertSetting,
  deleteSetting,
};
