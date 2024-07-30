const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

cartItemSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("CartItem", cartItemSchema);
