const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true,
  },
  carrier: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"],
    default: "Pending",
  },
  estimatedDeliveryDate: {
    type: Date,
  },
  actualDeliveryDate: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

shipmentSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Shipment", shipmentSchema);
