const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  coupon_detail: {
    type: String,
  },
  coupon_min_checkout: {
    type: Number,
  },
  coupon_min_checkout: {
    type: Number,
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  discount: { type: Number, required: true },
  // category_id: {
  //   type: String
  // },
  // product_id:{
  //   type: String
  // },
  type: {
    type: String,
    enum: ["flat", "percentage"],
  },
  expirationDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

couponSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Coupon", couponSchema);
