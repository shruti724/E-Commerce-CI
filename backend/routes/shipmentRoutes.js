const express = require("express");
const router = express.Router();
const shipmentController = require("../controller/shipmentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new shipment
router.post(
  "/shipment",
  authMiddleware,
  shipmentController.createShipment
);

// Get a list of shipments
router.get("/shipments", authMiddleware, shipmentController.getShipments);

// Get shipment by ID
router.get(
  "/shipment/:id",
  authMiddleware,
  shipmentController.getShipmentById
);

// Update shipment status
router.put(
  "/shipment/:id",
  authMiddleware,
  shipmentController.updateShipmentStatus
);

// Delete a shipment
router.delete(
  "/shipment/:id",
  authMiddleware,
  shipmentController.deleteShipment
);

module.exports = router;
