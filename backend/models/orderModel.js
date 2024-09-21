const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  invoice_id: {
    type: String,
    unique: true,
  },
  tax: {
    type: Number,
  },
  discount_price: {
    type: Number,
  },
  coupon_applied: {
    type: Number,
  },
  delivery_charge: {
    type: Number,
  },
  total_Amount: {
    type: Number,
    required: true,
  },
  grand_total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  shipment: {
    type: Schema.Types.ObjectId,
    ref: "Shipment",
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
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

// Middleware to generate a unique invoice_id
orderSchema.pre("save", async function (next) {
  const order = this;

  if (order.isNew) {
    let isUnique = false;
    let invoiceId;

    while (!isUnique) {
      invoiceId = "ECOM"+crypto.randomBytes(6).toString("hex").toUpperCase();
      const existingOrder = await mongoose.models.Order.findOne({
        invoice_id: invoiceId,
      });
      if (!existingOrder) {
        isUnique = true;
      }
    }

    order.invoice_id = invoiceId;
  }

  order.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
