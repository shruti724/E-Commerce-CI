const axios = require("axios");
const Address = require("../models/addressModel");
const User = require("../models/userModel");



// Create a new address
const createAddress = async (req, res) => {
  try {
    const { street, city, postalCode, country, state, district, type } =
      req.body;
    const user_id = req.user.id; 

    if (!postalCode || !country || !state || !district) {
      return res.status(400).json({
        success: false,
        message: "Postal code, country, state, and district are required",
      });
    }

    const address = new Address({
      user: user_id,
      street,
      city,
      postalCode,
      country,
      state,
      district,
      type,
    });

    await address.save();

    res.status(201).json({
      success: true,
      data: address,
      message: "Address created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating address",
      error: error.message,
    });
  }
};


// Fetch user and their addresses
const getUserWithAddresses = async (req, res) => {
  try {
    const user_id = req.user.id; 

    const user = await User.findById(user_id);
    const addresses = await Address.find({ user: user_id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user,
      addresses: addresses,
      message: "User and addresses fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching user and addresses",
      error: error.message,
    });
  }
};

module.exports = {
  createAddress,
  getUserWithAddresses,
};
