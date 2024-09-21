const Shipment = require("../models/shipmentModel");
const Order = require("../models/orderModel");

// Create a new shipment
const createShipment = async (req, res) => {
  try {
    const { order, trackingNumber, carrier, estimatedDeliveryDate } = req.body;

    const orderData = await Order.findById(order);
    if (!orderData) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const shipment = new Shipment({
      order,
      trackingNumber,
      carrier,
      estimatedDeliveryDate,
    });

    await shipment.save();

    res.status(201).json({
      success: true,
      data: shipment,
      message: "Shipment created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating shipment",
      error: error.message,
    });
  }
};

// Get a list of shipments
const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate("order");

    res.status(200).json({
      success: true,
      data: shipments,
      message: "Shipments fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching shipments",
      error: error.message,
    });
  }
};

// Get shipment by ID
const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findById(id).populate("order");

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shipment,
      message: "Shipment fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching shipment",
      error: error.message,
    });
  }
};

// Update shipment status
const updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, actualDeliveryDate } = req.body;

    const shipment = await Shipment.findById(id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    shipment.status = status || shipment.status;
    shipment.actualDeliveryDate =
      actualDeliveryDate || shipment.actualDeliveryDate;

    await shipment.save();

    res.status(200).json({
      success: true,
      data: shipment,
      message: "Shipment status updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating shipment status",
      error: error.message,
    });
  }
};

// Delete a shipment
const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findByIdAndDelete(id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipment deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting shipment",
      error: error.message,
    });
  }
};

module.exports = {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipmentStatus,
  deleteShipment,
};
