const axios = require("axios");
const Address = require("../models/addressModel");
const User = require("../models/userModel");

// Create or Update Address (for primary address)
const createAddress = async (req, res) => {
  try {
    const { id, street, city, postalCode, country, state, district, type } =
      req.body;
    const user_id = req.user.id;

    if (!postalCode || !country || !state || !district) {
      return res.status(400).json({
        success: false,
        message: "Postal code, country, state, and district are required",
      });
    }

    let address;

    if (id) {
      // Update existing address
      address = await Address.findById(id);
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }
      // Update fields
      address.street = street || address.street;
      address.city = city || address.city;
      address.postalCode = postalCode || address.postalCode;
      address.country = country || address.country;
      address.state = state || address.state;
      address.district = district || address.district;
      address.type = type || address.type;
      address.isPrimary = true; 
    } else {
      // Create new address
      address = new Address({
        user: user_id,
        street,
        city,
        postalCode,
        country,
        state,
        district,
        type,
        isPrimary: true, 
      });
    }

    await address.save();

    // Handle primary address logic (if creating a new primary address)
    if (!id) {
      // Mark existing primary address as secondary
      await Address.updateMany(
        { user: user_id, isPrimary: true },
        { isPrimary: false }
      );
    }

    res.status(201).json({
      success: true,
      data: address,
      message: "Address created or updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating or updating address",
      error: error.message,
    });
  }
};

// Add or Update Address (for non-primary address)
const addANewAddress = async (req, res) => {
  try {
    const { id, street, city, postalCode, country, state, district, type } =
      req.body;
    const user_id = req.user.id;

    if (!postalCode || !country || !state || !district) {
      return res.status(400).json({
        success: false,
        message: "Postal code, country, state, and district are required",
      });
    }

    let address;

    if (id) {
      // Update existing address
      address = await Address.findById(id);
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }
      
      address.street = street || address.street;
      address.city = city || address.city;
      address.postalCode = postalCode || address.postalCode;
      address.country = country || address.country;
      address.state = state || address.state;
      address.district = district || address.district;
      address.type = type || address.type;
      address.isPrimary = false; 
    } else {
      // Creating new address
      address = new Address({
        user: user_id,
        street,
        city,
        postalCode,
        country,
        state,
        district,
        type,
        isPrimary: false, 
      });
    }

    await address.save();

    res.status(201).json({
      success: true,
      data: address,
      message: "Address added or updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding or updating address",
      error: error.message,
    });
  }
};

// Fetching user and their addresses
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

    const primaryAddress = addresses.find((address) => address.isPrimary);
    const otherAddresses = addresses.filter((address) => !address.isPrimary);

    res.status(200).json({
      success: true,
      user: user_id,
      addresses: {
        primaryAddress: primaryAddress || null, 
        otherAddresses: otherAddresses,
      },
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

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // To handle primary address case
    if (address.isPrimary) {
      // Set another address as primary if available
      const newPrimaryAddress = await Address.findOne({
        user: address.user,
        isPrimary: false,
      }).sort({ created_at: 1 });
      if (newPrimaryAddress) {
        newPrimaryAddress.isPrimary = true;
        await newPrimaryAddress.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting address",
      error: error.message,
    });
  }
};

module.exports = {
  createAddress,
  addANewAddress,
  getUserWithAddresses,
  deleteAddress,
};
